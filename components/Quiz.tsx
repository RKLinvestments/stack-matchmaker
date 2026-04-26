"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { encodeAnswers } from "@/lib/encode";
import { track } from "@/lib/analytics";
import { tools } from "@/lib/tools";
import type {
  Budget,
  Goal,
  Pain,
  QuizAnswers,
  Role,
  Skill,
  TeamSize,
} from "@/lib/types";

type Option<T extends string> = { value: T; label: string; sub?: string };

const ROLES: Option<Role>[] = [
  { value: "creator", label: "Creator", sub: "Posting content, building an audience" },
  { value: "founder", label: "Founder", sub: "Building a startup or new product" },
  { value: "small_business", label: "Small business owner", sub: "Running an existing business" },
  { value: "marketer", label: "Marketer", sub: "In-house marketing or growth" },
  { value: "freelancer", label: "Freelancer", sub: "Solo, working with clients" },
  { value: "operator", label: "Operator", sub: "Ops, internal tooling, workflows" },
  { value: "agency", label: "Agency owner", sub: "Selling services to clients" },
  { value: "sales", label: "Sales", sub: "Outbound, closing, pipeline" },
  { value: "support", label: "Customer support", sub: "Service, success, retention" },
];

const GOALS: Option<Goal>[] = [
  { value: "more_content", label: "Create more content" },
  { value: "save_time", label: "Save time on repetitive work" },
  { value: "automate", label: "Automate workflows" },
  { value: "leads", label: "Generate more leads" },
  { value: "sales", label: "Improve sales" },
  { value: "support", label: "Improve customer support" },
  { value: "build_stack", label: "Build an AI-native stack" },
  { value: "research", label: "Do better research" },
];

const PAINS: Option<Pain>[] = [
  { value: "where_to_start", label: "I don't know where to start" },
  { value: "too_many_tools", label: "Too many tools — overwhelmed" },
  { value: "wasted_money", label: "Wasted money on tools that didn't stick" },
  { value: "content_slow", label: "Content takes too long" },
  { value: "manual_work", label: "Too much manual, repetitive work" },
  { value: "no_workflow", label: "No consistent workflow" },
  { value: "scattered_data", label: "Information is scattered everywhere" },
];

const BUDGETS: Option<Budget>[] = [
  { value: "free", label: "Free / very low cost", sub: "$0 if possible" },
  { value: "lt100", label: "Under $100/mo", sub: "Indie / starter budget" },
  { value: "lt300", label: "Under $300/mo", sub: "Serious but careful" },
  { value: "premium", label: "Premium / ROI-first", sub: "Spend whatever pays back" },
];

const SKILLS: Option<Skill>[] = [
  { value: "beginner", label: "Beginner", sub: "New to AI tools" },
  { value: "intermediate", label: "Intermediate", sub: "Used a few, comfortable" },
  { value: "advanced", label: "Advanced", sub: "Power user, want depth" },
];

const TEAMS: Option<TeamSize>[] = [
  { value: "solo", label: "Just me" },
  { value: "2_5", label: "2–5 people" },
  { value: "6_20", label: "6–20 people" },
  { value: "20_plus", label: "20+ people" },
];

// Derived from the full tool catalog so the quiz stays in sync when we add tools.
// Sorted alphabetically for a predictable scan.
const COMMON_TOOLS: { id: string; label: string }[] = tools
  .map((t) => ({ id: t.id, label: t.name }))
  .sort((a, b) => a.label.localeCompare(b.label));

const STEPS = [
  "role",
  "goal",
  "pain",
  "budget",
  "skill",
  "team",
  "current",
] as const;
type StepKey = (typeof STEPS)[number];

const STEP_TITLES: Record<StepKey, { title: string; sub?: string }> = {
  role: { title: "Who are you?", sub: "We tune the stack to your role." },
  goal: { title: "What do you want most right now?", sub: "Pick the one that matters most this quarter." },
  pain: { title: "What's the biggest pain?", sub: "We'll target this first." },
  budget: { title: "What's your monthly tools budget?" },
  skill: { title: "How comfortable are you with AI tools?" },
  team: { title: "How big is your team?" },
  current: {
    title: "Which of these do you already use?",
    sub: "Pick any. We'll tell you what to keep, replace, or drop.",
  },
};

export function Quiz() {
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({
    currentTools: [],
  });
  const [submitting, setSubmitting] = useState(false);

  const step = STEPS[stepIdx];
  const total = STEPS.length;
  const pct = useMemo(() => Math.round(((stepIdx + 1) / total) * 100), [stepIdx, total]);

  useEffect(() => {
    track("quiz_started");
  }, []);

  function pick<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
    track("quiz_step_completed", { step: String(key), value: String(value) });
    if (key !== "currentTools") {
      setTimeout(() => next(), 120);
    }
  }

  function toggleTool(id: string) {
    setAnswers((a) => {
      const cur = a.currentTools ?? [];
      return {
        ...a,
        currentTools: cur.includes(id) ? cur.filter((t) => t !== id) : [...cur, id],
      };
    });
  }

  function next() {
    setStepIdx((i) => Math.min(i + 1, total - 1));
  }
  function back() {
    setStepIdx((i) => Math.max(i - 1, 0));
  }

  function canSubmit() {
    return (
      answers.role &&
      answers.goal &&
      answers.pain &&
      answers.budget &&
      answers.skill &&
      answers.team &&
      Array.isArray(answers.currentTools)
    );
  }

  function submit() {
    if (!canSubmit()) return;
    setSubmitting(true);
    const final: QuizAnswers = {
      role: answers.role!,
      goal: answers.goal!,
      pain: answers.pain!,
      budget: answers.budget!,
      skill: answers.skill!,
      team: answers.team!,
      currentTools: answers.currentTools ?? [],
    };
    const enc = encodeAnswers(final);
    track("quiz_completed", {
      role: final.role,
      goal: final.goal,
      budget: final.budget,
      skill: final.skill,
      team: final.team,
      currentToolsCount: final.currentTools.length,
    });
    try {
      localStorage.setItem("stack:lastAnswers", JSON.stringify(final));
    } catch {}
    router.push(`/results?a=${enc}`);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Step {stepIdx + 1} of {total}
          </span>
          <span>{pct}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div key={step} className="animate-fadeUp">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          {STEP_TITLES[step].title}
        </h2>
        {STEP_TITLES[step].sub && (
          <p className="mt-2 text-muted-foreground">{STEP_TITLES[step].sub}</p>
        )}

        <div className="mt-8">
          {step === "role" && (
            <OptionGrid
              options={ROLES}
              value={answers.role}
              onChange={(v) => pick("role", v)}
              cols={3}
            />
          )}
          {step === "goal" && (
            <OptionGrid
              options={GOALS}
              value={answers.goal}
              onChange={(v) => pick("goal", v)}
              cols={2}
            />
          )}
          {step === "pain" && (
            <OptionGrid
              options={PAINS}
              value={answers.pain}
              onChange={(v) => pick("pain", v)}
              cols={2}
            />
          )}
          {step === "budget" && (
            <OptionGrid
              options={BUDGETS}
              value={answers.budget}
              onChange={(v) => pick("budget", v)}
              cols={2}
            />
          )}
          {step === "skill" && (
            <OptionGrid
              options={SKILLS}
              value={answers.skill}
              onChange={(v) => pick("skill", v)}
              cols={3}
            />
          )}
          {step === "team" && (
            <OptionGrid
              options={TEAMS}
              value={answers.team}
              onChange={(v) => pick("team", v)}
              cols={2}
            />
          )}
          {step === "current" && (
            <div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {COMMON_TOOLS.map((t) => {
                  const on = answers.currentTools?.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTool(t.id)}
                      className={`rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition ${
                        on
                          ? "border-primary bg-primary text-white"
                          : "border-border bg-card text-foreground hover:border-primary/50"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                None of these? Skip — we'll start from scratch.
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={back}
            disabled={stepIdx === 0}
            className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30"
          >
            ← Back
          </button>
          {step === "current" ? (
            <button
              onClick={submit}
              disabled={!canSubmit() || submitting}
              className="btn-brand"
            >
              {submitting ? "Building your stack…" : "Get my stack →"}
            </button>
          ) : (
            <span className="text-sm text-muted-foreground">Pick one to continue</span>
          )}
        </div>
      </div>
    </div>
  );
}

function OptionGrid<T extends string>({
  options,
  value,
  onChange,
  cols,
}: {
  options: Option<T>[];
  value: T | undefined;
  onChange: (v: T) => void;
  cols: 2 | 3;
}) {
  const grid = cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={`grid grid-cols-1 gap-3 ${grid}`}>
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`group rounded-2xl border p-4 text-left transition ${
              on
                ? "border-primary bg-primary text-white shadow-pop"
                : "border-border bg-card text-foreground hover:border-primary/50 hover:shadow-card"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{o.label}</span>
              <span
                className={`grid h-5 w-5 place-items-center rounded-full border ${
                  on ? "border-white bg-white" : "border-border bg-background"
                }`}
              >
                {on && (
                  <span className="block h-2 w-2 rounded-full bg-primary" />
                )}
              </span>
            </div>
            {o.sub && (
              <div
                className={`mt-1 text-sm ${
                  on ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                {o.sub}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
