"use client";

import { track } from "@/lib/analytics";

const CONTACT_EMAIL = "support@stackmatchmaker.app";
const SUBJECT = "Stack Matchmaker setup help";

export function HelpCard({ quoteBody }: { quoteBody: string }) {
  const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    SUBJECT,
  )}&body=${encodeURIComponent(quoteBody)}`;

  return (
    <div className="no-print card border-ink-200 bg-gradient-to-br from-white to-brand-50/40">
      <div className="grid gap-5 md:grid-cols-[1.3fr,auto] md:items-center">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Want help setting this up?
          </div>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink-950">
            Get your stack wired up for you.
          </h3>
          <p className="mt-2 text-ink-700">
            We'll set up each tool, connect them to your existing workflow, and
            hand you a documented system. You save a week. Paid add-on — tell us
            what you need and we'll send a quick quote.
          </p>
        </div>
        <a
          href={href}
          onClick={() => track("help_card_clicked")}
          className="btn-brand whitespace-nowrap"
        >
          Get a quote →
        </a>
      </div>
    </div>
  );
}
