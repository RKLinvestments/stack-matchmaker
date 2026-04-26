"use client";

import { track } from "@/lib/analytics";
import { buildHelpMailto } from "./HelpCard";

export function HelpBanner({ quoteBody }: { quoteBody: string }) {
  const href = buildHelpMailto(quoteBody);

  return (
    <div className="no-print flex flex-col gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="text-sm font-semibold text-foreground">
          Don&apos;t want to set this up yourself?
        </div>
        <div className="mt-0.5 text-sm text-muted-foreground">
          We&apos;ll wire each tool into your workflow and hand you a documented
          system.
        </div>
      </div>
      <a
        href={href}
        onClick={() => track("help_card_clicked", { placement: "banner" })}
        className="btn-brand whitespace-nowrap"
      >
        Get a quote →
      </a>
    </div>
  );
}
