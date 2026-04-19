import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { decodeAnswers } from "@/lib/encode";
import { recommend } from "@/lib/recommend";
import { getAnthropic, NARRATIVE_MODEL } from "@/lib/anthropic";
import { templateNarrative, type Narrative } from "@/lib/narrative";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are a senior AI tools advisor writing a personalized rollout plan for a single user. Your job is to translate their picked stack into a clear, opinionated 30/60/90-day plan they will actually follow.

Voice: direct, specific, opinionated. No hedging. No "you might want to consider." No emojis. Active verbs. Short sentences.

You will receive:
- The user's profile (role, goal, pain, budget, skill, team size, tools they already use)
- A picked stack of 3-6 tools with names, categories, and why each was chosen
- A list of tools they should drop or replace

You must return a JSON object with this exact shape:

{
  "situation": "2-3 sentence summary of where they are and the smartest first move. Reference their role, goal, and one specific pick by name.",
  "rollout": [
    {
      "window": "Days 1-7",
      "goal": "One sentence — what they should achieve in this window",
      "actions": ["3 specific actions, each 1 sentence, each naming a real tool from their stack"]
    },
    {
      "window": "Days 8-30",
      "goal": "...",
      "actions": ["...", "...", "..."]
    },
    {
      "window": "Days 31-90",
      "goal": "...",
      "actions": ["...", "...", "..."]
    }
  ],
  "watchOuts": ["3 specific traps for THIS user, not generic AI-tool advice. Each 1 sentence."]
}

Rules:
- Reference real tool names from the stack. Never invent a tool.
- If the user already uses a tool that was picked (marked "kept"), say "keep using X" — don't tell them to "set up" something they already have.
- If a pick replaces a current tool, say "switch from <current> to <new>" with one sentence on why.
- Total response under 350 words.
- Return ONLY the JSON object. No prose before or after.`;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const encoded: string | undefined = body?.a;
  if (!encoded) {
    return NextResponse.json({ ok: false, error: "missing_a" }, { status: 400 });
  }

  const answers = decodeAnswers(encoded);
  if (!answers) {
    return NextResponse.json({ ok: false, error: "bad_a" }, { status: 400 });
  }

  const stack = recommend(answers);

  const client = getAnthropic();
  if (!client) {
    return NextResponse.json({
      ok: true,
      narrative: templateNarrative(stack),
    });
  }

  const userPayload = {
    profile: {
      role: answers.role,
      goal: answers.goal,
      pain: answers.pain,
      budget: answers.budget,
      skill: answers.skill,
      team: answers.team,
      currentTools: answers.currentTools,
    },
    picked: stack.picks.map((p) => ({
      name: p.tool.name,
      category: p.tool.category,
      kept: answers.currentTools.includes(p.tool.id),
      replaces: p.isReplacement?.replaces,
      reasons: p.reasons,
      useFor: p.tool.killerUseCase,
    })),
    drop: stack.removeFromCurrent.map((d) => ({
      tool: d.toolId,
      why: d.why,
    })),
  };

  try {
    const response = await client.messages.create({
      model: NARRATIVE_MODEL,
      max_tokens: 1500,
      thinking: { type: "adaptive" },
      output_config: { effort: "medium" },
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [
        {
          role: "user",
          content: `Here is the user and their picked stack. Return the JSON.\n\n${JSON.stringify(userPayload, null, 2)}`,
        },
      ],
    });

    let text = "";
    for (const block of response.content) {
      if (block.type === "text") text += block.text;
    }

    const parsed = parseNarrative(text);
    if (!parsed) {
      return NextResponse.json({
        ok: true,
        narrative: templateNarrative(stack),
        note: "fallback_parse",
      });
    }

    return NextResponse.json({ ok: true, narrative: parsed });
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      console.error("[narrative] anthropic error", err.status, err.message);
    } else {
      console.error("[narrative] error", err);
    }
    return NextResponse.json({
      ok: true,
      narrative: templateNarrative(stack),
      note: "fallback_error",
    });
  }
}

function parseNarrative(text: string): Narrative | null {
  const trimmed = text.trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start < 0 || end < 0) return null;
  try {
    const obj = JSON.parse(trimmed.slice(start, end + 1));
    if (
      !obj ||
      typeof obj.situation !== "string" ||
      !Array.isArray(obj.rollout) ||
      !Array.isArray(obj.watchOuts)
    ) {
      return null;
    }
    return { ...obj, source: "ai" } as Narrative;
  } catch {
    return null;
  }
}
