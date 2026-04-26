"use client";

import { track } from "@/lib/analytics";

const CONTACT_EMAIL = "support@stackmatchmaker.app";
const SUBJECT = "Stack Matchmaker setup help";

export function buildHelpMailto(body: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    SUBJECT,
  )}&body=${encodeURIComponent(body)}`;
}

export function HelpCard({ quoteBody }: { quoteBody: string }) {
  const href = buildHelpMailto(quoteBody);

  return (
    <div className="no-print card relative overflow-hidden border-primary/30">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
      />
      <div className="relative grid gap-5 md:grid-cols-[1.3fr,auto] md:items-center">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            Want help setting this up?
          </div>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            Get your stack wired up for you.
          </h3>
          <p className="mt-2 text-muted-foreground">
            We'll set up each tool, connect them to your existing workflow, and
            hand you a documented system. You save a week. Paid add-on — tell us
            what you need and we'll send a quick quote.
          </p>
        </div>
        <a
          href={href}
          onClick={() => track("help_card_clicked")}
          className="btn-brand group whitespace-nowrap px-8 py-4 text-lg"
        >
          Get my stack set up{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </div>
  );
}
