import Link from "next/link";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrackedLink } from "@/components/TrackedLink";
import { BackLink } from "@/components/BackLink";
import { getTool } from "@/lib/tools";
import type { Tool } from "@/lib/types";

export const dynamic = "force-dynamic";

const CATEGORY_LABEL: Record<string, string> = {
  chat_assistant: "Chat assistant",
  research: "Research",
  writing: "Writing",
  image: "Image",
  video: "Video",
  audio: "Audio",
  productivity: "Productivity",
  meeting_notes: "Meeting notes",
  automation: "Automation",
  agents: "Agents",
  crm_sales: "CRM / sales",
  lead_gen: "Lead gen",
  website_build: "Website / app",
  analytics_seo: "Analytics / SEO",
  code: "Code",
};

const BUDGET_LABEL: Record<string, string> = {
  free: "Free",
  lt100: "< $100/mo",
  lt300: "< $300/mo",
  premium: "Premium",
};

const SKILL_LABEL: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function ComparePage({
  searchParams,
}: {
  searchParams: { ids?: string };
}) {
  const idsParam = searchParams.ids;
  if (!idsParam) redirect("/");

  const ids = idsParam.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 4);
  const tools = ids
    .map((id) => getTool(id))
    .filter((t): t is Tool => Boolean(t));

  if (tools.length === 0) redirect("/");

  return (
    <>
      <Header />
      <main>
        <section className="bg-mesh">
          <div className="mx-auto max-w-6xl px-6 pt-12 pb-8">
            <BackLink />
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink-950 md:text-4xl">
              Compare {tools.length} tools side by side
            </h1>
            <p className="mt-2 text-ink-600">
              Same category. Different tradeoffs. Pick the one that fits.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <div className="overflow-x-auto rounded-2xl border border-ink-100 bg-white shadow-card">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink-100">
                  <th className="w-44 p-5 text-xs font-semibold uppercase tracking-wider text-ink-500">
                    Tool
                  </th>
                  {tools.map((t) => (
                    <th key={t.id} className="p-5 align-top">
                      <div className="text-lg font-semibold text-ink-950">
                        {t.name}
                      </div>
                      <div className="mt-1 text-xs text-ink-500">
                        {CATEGORY_LABEL[t.category] ?? t.category}
                      </div>
                      <TrackedLink
                        href={t.affiliateUrl || t.url}
                        external
                        event="tool_clicked"
                        eventProps={{
                          id: t.id,
                          name: t.name,
                          source: "compare",
                        }}
                        className="btn-primary !py-1.5 !px-3 mt-3 text-xs"
                      >
                        Try {t.name} →
                      </TrackedLink>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                <Row label="Best for">
                  {tools.map((t) => (
                    <td key={t.id} className="p-5 align-top text-ink-800">
                      {t.killerUseCase}
                    </td>
                  ))}
                </Row>
                <Row label="Tagline">
                  {tools.map((t) => (
                    <td key={t.id} className="p-5 align-top text-ink-700">
                      {t.tagline}
                    </td>
                  ))}
                </Row>
                <Row label="Budget tier">
                  {tools.map((t) => (
                    <td key={t.id} className="p-5 align-top">
                      <div className="flex flex-wrap gap-1">
                        {t.budgets.map((b) => (
                          <span key={b} className="chip !text-[11px]">
                            {BUDGET_LABEL[b] ?? b}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </Row>
                <Row label="Setup">
                  {tools.map((t) => (
                    <td key={t.id} className="p-5 align-top text-ink-800">
                      {SKILL_LABEL[t.setup] ?? t.setup}
                    </td>
                  ))}
                </Row>
                <Row label="Trust score">
                  {tools.map((t) => (
                    <ScoreCell key={t.id} value={t.trust} />
                  ))}
                </Row>
                <Row label="ROI score">
                  {tools.map((t) => (
                    <ScoreCell key={t.id} value={t.roi} />
                  ))}
                </Row>
                <Row label="Retention">
                  {tools.map((t) => (
                    <ScoreCell key={t.id} value={t.retention} />
                  ))}
                </Row>
                <Row label="Built for">
                  {tools.map((t) => (
                    <td key={t.id} className="p-5 align-top text-xs text-ink-700">
                      {t.audiences.slice(0, 4).join(", ")}
                      {t.audiences.length > 4 ? "…" : ""}
                    </td>
                  ))}
                </Row>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center text-sm text-ink-500">
            <Link href="/quiz" className="text-ink-700 underline">
              Take the quiz
            </Link>{" "}
            for a stack tuned to your situation.
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <tr className="border-b border-ink-100 last:border-0">
      <th className="bg-ink-50/50 p-5 align-top text-xs font-semibold uppercase tracking-wider text-ink-500">
        {label}
      </th>
      {children}
    </tr>
  );
}

function ScoreCell({ value }: { value: number }) {
  const pct = Math.min(100, Math.max(0, (value / 10) * 100));
  return (
    <td className="p-5 align-top">
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-ink-100">
          <div
            className="h-full rounded-full bg-ink-950"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-sm font-semibold tabular-nums text-ink-900">
          {value.toFixed(1)}
        </span>
      </div>
    </td>
  );
}
