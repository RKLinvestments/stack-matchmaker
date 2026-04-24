import Link from "next/link";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolCard } from "@/components/ToolCard";
import { Gate } from "@/components/Gate";
import { HelpCard } from "@/components/HelpCard";
import { ShareBar } from "@/components/ShareBar";
import { PrintButton } from "@/components/PrintButton";
import { StackNarrative } from "@/components/StackNarrative";
import { decodeAnswers } from "@/lib/encode";
import { recommend } from "@/lib/recommend";
import { getTool } from "@/lib/tools";

export const dynamic = "force-dynamic";

const ROLE_LABEL: Record<string, string> = {
  creator: "creators",
  founder: "founders",
  small_business: "small business owners",
  marketer: "marketers",
  freelancer: "freelancers",
  operator: "operators",
  agency: "agency owners",
  sales: "sales pros",
  support: "support teams",
};

const GOAL_LABEL: Record<string, string> = {
  more_content: "create more content",
  save_time: "save time",
  automate: "automate workflows",
  leads: "generate leads",
  sales: "improve sales",
  support: "improve support",
  build_stack: "build your AI stack",
  research: "do better research",
};

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { a?: string };
}) {
  const a = searchParams.a;
  if (!a) redirect("/quiz");

  const answers = decodeAnswers(a);
  if (!answers) redirect("/quiz");

  const stack = recommend(answers);

  const headline = `Your AI stack for ${GOAL_LABEL[answers.goal] ?? "your goals"}`;
  const subhead = `Tuned for ${ROLE_LABEL[answers.role] ?? "you"} on a ${budgetLabel(answers.budget)} budget.`;

  return (
    <>
      <Header />
      <main>
        <section className="bg-mesh">
          <div className="mx-auto max-w-5xl px-6 pt-14 pb-10">
            <div className="chip mb-4 !bg-white">Your stack is ready</div>
            <h1 className="text-4xl font-semibold tracking-tight text-ink-950 md:text-5xl">
              {headline}
            </h1>
            <p className="mt-3 text-lg text-ink-600">{subhead}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="chip !bg-white">
                {stack.picks.length} tools picked
              </span>
              <span className="chip !bg-white">
                Est. ${stack.estMonthly.low}–${stack.estMonthly.high}/mo
              </span>
              {stack.removeFromCurrent.length > 0 && (
                <span className="chip border-brand-200 !bg-brand-50 text-brand-700">
                  {stack.removeFromCurrent.length} to drop or replace
                </span>
              )}
              <div className="no-print flex gap-2">
                <ShareBar path={`/results?a=${a}`} />
                <PrintButton />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-10">
          {stack.picks[0] && (
            <div className="mb-8">
              <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-500">
                Your top pick
              </div>
              <ToolCard pick={stack.picks[0]} index={0} />
            </div>
          )}

          <Gate
            stackId={a}
            preview={`${stack.picks.length} tools picked for ${ROLE_LABEL[answers.role] ?? "you"}. Full stack, workflow order, drop list, and a personalized 7-day rollout plan — one email unlocks it all.`}
          >
            <div className="mb-8 rounded-2xl border border-ink-100 bg-white p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-ink-500">
                Your workflow, in order
              </div>
              <ol className="mt-4 grid gap-2 md:grid-cols-2">
                {stack.workflow.map((w) => {
                  const t = getTool(w.toolId);
                  if (!t) return null;
                  return (
                    <li key={w.toolId} className="flex items-start gap-3 rounded-xl border border-ink-100 px-4 py-3">
                      <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-ink-950 text-xs font-bold text-white">
                        {w.step}
                      </span>
                      <div className="min-w-0">
                        <div className="font-semibold text-ink-900">{t.name}</div>
                        <div className="text-sm text-ink-600">{w.action}</div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="mb-8">
              <StackNarrative encoded={a} />
            </div>

            <div className="space-y-5">
              {stack.picks.slice(1).map((p, i) => (
                <ToolCard key={p.tool.id} pick={p} index={i + 1} />
              ))}
            </div>

            {stack.removeFromCurrent.length > 0 && (
              <div className="mt-10 card">
                <div className="text-xs font-semibold uppercase tracking-widest text-ink-500">
                  What to drop or replace
                </div>
                <ul className="mt-3 space-y-2">
                  {stack.removeFromCurrent.map((r) => {
                    const t = getTool(r.toolId);
                    if (!t) return null;
                    return (
                      <li key={r.toolId} className="flex items-start justify-between gap-4 rounded-xl border border-ink-100 px-4 py-3">
                        <div>
                          <div className="font-semibold text-ink-900">{t.name}</div>
                          <div className="text-sm text-ink-600">{r.why}</div>
                        </div>
                        <span className="chip text-brand-700">Drop</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="mt-10">
              <HelpCard quoteBody={buildQuoteBody(stack, answers, a)} />
            </div>
          </Gate>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-ink-500">
            <Link href="/quiz" className="text-ink-700 underline">
              Retake the quiz
            </Link>
            <span>
              Generated {new Date(stack.generatedAt).toLocaleString()}
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function budgetLabel(b: string): string {
  return (
    {
      free: "free",
      lt100: "under $100/mo",
      lt300: "under $300/mo",
      premium: "premium",
    } as Record<string, string>
  )[b] ?? b;
}

function buildQuoteBody(
  stack: ReturnType<typeof recommend>,
  answers: ReturnType<typeof decodeAnswers> & {},
  stackId: string,
): string {
  const role = ROLE_LABEL[answers.role] ?? answers.role;
  const goal = GOAL_LABEL[answers.goal] ?? answers.goal;
  const budget = budgetLabel(answers.budget);
  const tools = stack.picks
    .map((p, i) => `  ${i + 1}. ${p.tool.name} — ${p.tool.tagline}`)
    .join("\n");
  const url = `https://stackmatchmaker.app/results?a=${stackId}`;
  return [
    "Hi — just finished the Stack Matchmaker quiz, need help setting this up.",
    "",
    "My situation:",
    `  Role: ${role}`,
    `  Goal: ${goal}`,
    `  Budget: ${budget}`,
    "",
    `My stack (${stack.picks.length} tools, est. $${stack.estMonthly.low}–$${stack.estMonthly.high}/mo):`,
    tools,
    "",
    `Full plan: ${url}`,
    "",
    "What I need:",
    "",
  ].join("\n");
}
