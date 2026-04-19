import { tools, toolsById } from "./tools";
import type {
  Budget,
  Category,
  QuizAnswers,
  ScoredTool,
  Skill,
  Stack,
  Tool,
} from "./types";

const BUDGET_RANK: Record<Budget, number> = {
  free: 0,
  lt100: 1,
  lt300: 2,
  premium: 3,
};

const SKILL_RANK: Record<Skill, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
};

const BUDGET_EST: Record<Budget, [number, number]> = {
  free: [0, 0],
  lt100: [10, 30],
  lt300: [40, 100],
  premium: [120, 300],
};

const ROLE_CORE_CATEGORIES: Record<string, Category[]> = {
  creator: ["chat_assistant", "video", "image", "audio", "productivity"],
  founder: ["chat_assistant", "automation", "code", "productivity", "meeting_notes"],
  small_business: ["chat_assistant", "automation", "crm_sales", "meeting_notes", "productivity"],
  marketer: ["chat_assistant", "analytics_seo", "image", "video", "productivity"],
  freelancer: ["chat_assistant", "productivity", "image", "automation"],
  operator: ["automation", "agents", "chat_assistant", "meeting_notes", "productivity"],
  agency: ["automation", "chat_assistant", "video", "lead_gen", "productivity"],
  sales: ["lead_gen", "crm_sales", "meeting_notes", "agents", "chat_assistant"],
  support: ["crm_sales", "chat_assistant", "automation", "productivity"],
};

const GOAL_CATEGORIES: Record<string, Category[]> = {
  more_content: ["video", "image", "audio", "chat_assistant", "analytics_seo"],
  save_time: ["automation", "productivity", "meeting_notes", "chat_assistant"],
  automate: ["automation", "agents"],
  leads: ["lead_gen", "crm_sales", "agents"],
  sales: ["crm_sales", "lead_gen", "meeting_notes", "agents"],
  support: ["crm_sales", "automation", "chat_assistant"],
  build_stack: ["automation", "code", "website_build", "productivity", "chat_assistant"],
  research: ["research", "chat_assistant", "productivity"],
};

const WORKFLOW_TEMPLATES: Record<string, Category[]> = {
  more_content: ["chat_assistant", "image", "video", "audio", "analytics_seo", "productivity"],
  save_time: ["meeting_notes", "automation", "productivity", "chat_assistant"],
  automate: ["chat_assistant", "automation", "agents", "productivity"],
  leads: ["research", "lead_gen", "crm_sales", "automation", "agents"],
  sales: ["lead_gen", "crm_sales", "meeting_notes", "agents", "chat_assistant"],
  support: ["chat_assistant", "crm_sales", "automation"],
  build_stack: ["chat_assistant", "code", "website_build", "automation", "productivity"],
  research: ["research", "chat_assistant", "productivity"],
};

const CATEGORY_ACTIONS: Record<Category, string> = {
  chat_assistant: "Your daily AI brain — drafting, thinking, asking",
  research: "Find and verify what's true before you spend cycles on it",
  writing: "Long-form drafts and editing",
  image: "Visuals for posts, decks, and landing pages",
  video: "Capture, edit, and repurpose video into clips",
  audio: "Voiceovers, music, and audio production",
  productivity: "Notes, knowledge base, and team docs",
  meeting_notes: "Capture every call so nothing falls through the cracks",
  automation: "Glue your tools together and remove manual steps",
  agents: "Hand off whole tasks to an AI that runs them end to end",
  crm_sales: "Source of truth for contacts, deals, and conversations",
  lead_gen: "Find and reach out to the right prospects",
  website_build: "Ship your site or app without a long engineering cycle",
  analytics_seo: "Optimize so your content actually gets found",
  code: "Build and ship software faster",
};

function budgetFits(toolBudgets: Budget[], userBudget: Budget): boolean {
  const userMax = BUDGET_RANK[userBudget];
  return toolBudgets.some((b) => BUDGET_RANK[b] <= userMax);
}

function skillFits(toolSetup: Skill, userSkill: Skill): boolean {
  return SKILL_RANK[toolSetup] <= SKILL_RANK[userSkill] + 1;
}

function scoreOne(tool: Tool, a: QuizAnswers): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  if (tool.audiences.includes(a.role)) {
    score += 25;
    reasons.push(`Built for ${humanRole(a.role)}s`);
  }
  if (tool.goals.includes(a.goal)) {
    score += 25;
    reasons.push(`Directly helps you ${humanGoal(a.goal)}`);
  }
  if (tool.pains.includes(a.pain)) {
    score += 12;
    reasons.push(`Targets your pain: ${humanPain(a.pain)}`);
  }
  if (budgetFits(tool.budgets, a.budget)) {
    score += 10;
  } else {
    score -= 30;
  }
  if (skillFits(tool.setup, a.skill)) {
    score += 6;
  } else {
    score -= 15;
    reasons.push(`Heads up: setup is ${tool.setup}, you said ${a.skill}`);
  }

  score += tool.trust * 1.5;
  score += tool.roi * 2;
  score += tool.retention * 1;

  return { score, reasons };
}

function pickTop(scored: ScoredTool[], category: Category): ScoredTool | undefined {
  return scored
    .filter((s) => s.tool.category === category)
    .sort((a, b) => b.score - a.score)[0];
}

function categoriesForUser(a: QuizAnswers): Category[] {
  const fromGoal = WORKFLOW_TEMPLATES[a.goal] ?? [];
  const fromRole = ROLE_CORE_CATEGORIES[a.role] ?? [];
  const seen = new Set<Category>();
  const out: Category[] = [];
  for (const c of [...fromGoal, ...fromRole]) {
    if (!seen.has(c)) {
      seen.add(c);
      out.push(c);
    }
  }
  return out;
}

function humanRole(r: string): string {
  return r.replace("_", " ");
}
function humanGoal(g: string): string {
  return (
    {
      more_content: "create more content",
      save_time: "save time",
      automate: "automate workflows",
      leads: "generate leads",
      sales: "improve sales",
      support: "improve support",
      build_stack: "build your stack",
      research: "do better research",
    } as Record<string, string>
  )[g] ?? g;
}
function humanPain(p: string): string {
  return (
    {
      too_many_tools: "too many tools",
      where_to_start: "not knowing where to start",
      content_slow: "content takes too long",
      manual_work: "too much manual work",
      no_workflow: "no consistent workflow",
      wasted_money: "wasted money on tools",
      scattered_data: "scattered data",
    } as Record<string, string>
  )[p] ?? p;
}

export function recommend(answers: QuizAnswers): Stack {
  const scored: ScoredTool[] = tools.map((tool) => {
    const { score, reasons } = scoreOne(tool, answers);
    return { tool, score, reasons };
  });

  const orderedCats = categoriesForUser(answers);

  const picks: ScoredTool[] = [];
  const pickedIds = new Set<string>();
  const currentSet = new Set(answers.currentTools);

  for (const cat of orderedCats) {
    if (picks.length >= 5) break;
    const candidates = scored
      .filter((s) => s.tool.category === cat && !pickedIds.has(s.tool.id))
      .sort((a, b) => b.score - a.score);
    const top = candidates[0];
    if (!top) continue;
    if (top.score < 30) continue;

    if (currentSet.has(top.tool.id)) {
      picks.push({
        ...top,
        reasons: ["You already use this — keep it. It's the right pick.", ...top.reasons.slice(0, 2)],
      });
      pickedIds.add(top.tool.id);
      continue;
    }

    const overlap = top.tool.alternatives.find((alt) => currentSet.has(alt));
    if (overlap) {
      const replaced = toolsById[overlap];
      picks.push({
        ...top,
        isReplacement: {
          replaces: overlap,
          why: replaced
            ? `${replaced.name} works, but ${top.tool.name} is the stronger pick for your situation.`
            : `Recommended over what you currently use.`,
        },
        reasons: top.reasons.slice(0, 3),
      });
    } else {
      picks.push({ ...top, reasons: top.reasons.slice(0, 3) });
    }
    pickedIds.add(top.tool.id);
  }

  const removeFromCurrent: { toolId: string; why: string }[] = [];
  for (const currentId of answers.currentTools) {
    const current = toolsById[currentId];
    if (!current) continue;
    if (pickedIds.has(currentId)) continue;
    const replacement = picks.find((p) => p.tool.alternatives.includes(currentId));
    if (replacement) {
      removeFromCurrent.push({
        toolId: currentId,
        why: `${replacement.tool.name} covers this category for you.`,
      });
    } else if (!budgetFits(current.budgets, answers.budget)) {
      removeFromCurrent.push({
        toolId: currentId,
        why: `Likely above your stated budget.`,
      });
    }
  }

  const workflow = picks.map((p, i) => ({
    step: i + 1,
    toolId: p.tool.id,
    action: CATEGORY_ACTIONS[p.tool.category],
  }));

  let low = 0;
  let high = 0;
  for (const p of picks) {
    if (currentSet.has(p.tool.id)) continue;
    const cheapest = [...p.tool.budgets].sort(
      (a, b) => BUDGET_RANK[a] - BUDGET_RANK[b],
    )[0];
    const [l, h] = BUDGET_EST[cheapest];
    low += l;
    high += h;
  }

  return {
    answers,
    picks,
    workflow,
    removeFromCurrent,
    estMonthly: { low, high },
    generatedAt: new Date().toISOString(),
  };
}
