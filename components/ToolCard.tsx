import Link from "next/link";
import type { ScoredTool } from "@/lib/types";
import { TrackedLink } from "./TrackedLink";

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

export function ToolCard({ pick, index }: { pick: ScoredTool; index: number }) {
  const t = pick.tool;
  const link = t.affiliateUrl || t.url;
  const compareIds = [t.id, ...t.alternatives].slice(0, 4).join(",");
  return (
    <div className="card relative overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-ink-950 text-sm font-bold text-white">
            {index + 1}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold text-ink-950">{t.name}</h3>
              <span className="chip !text-[11px]">
                {CATEGORY_LABEL[t.category] ?? t.category}
              </span>
              {pick.isReplacement && (
                <span className="chip border-brand-200 bg-brand-50 !text-[11px] text-brand-700">
                  Replaces what you have
                </span>
              )}
            </div>
            <p className="mt-1 text-ink-600">{t.tagline}</p>
          </div>
        </div>
        <TrackedLink
          href={link}
          external
          event="tool_clicked"
          eventProps={{ id: t.id, name: t.name, category: t.category }}
          className="btn-primary !py-2 !px-4 text-sm no-print"
        >
          Try {t.name} →
        </TrackedLink>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">
            Use it for
          </div>
          <p className="mt-1 text-ink-800">{t.killerUseCase}</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-500">
            Why we picked it
          </div>
          <ul className="mt-1 space-y-1 text-ink-800">
            {pick.reasons.slice(0, 3).map((r, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brand-500" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {pick.isReplacement && (
        <div className="mt-5 rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm text-brand-900">
          <strong>Replace your current tool:</strong> {pick.isReplacement.why}
        </div>
      )}

      {t.alternatives.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink-500 no-print">
          <span>Alternatives:</span>
          <span className="text-ink-700">{t.alternatives.join(", ")}</span>
          <Link
            href={`/compare?ids=${compareIds}`}
            className="ml-auto rounded-full border border-ink-200 px-3 py-1 font-medium text-ink-700 hover:border-ink-300 hover:bg-ink-50"
          >
            Compare side-by-side →
          </Link>
        </div>
      )}
    </div>
  );
}
