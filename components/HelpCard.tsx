"use client";

import { track } from "@/lib/analytics";

/**
 * Captures consulting / DFY-setup intent from users who've just seen their
 * stack. Monetization Layer 4 in MONETIZATION-PLAN.md.
 *
 * Replace the mailto with a Calendly or typeform link when the services
 * offering is ready.
 */
const CONTACT_EMAIL = "aaron@gatorcapitalpartners.com";

export function HelpCard() {
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
          href={`mailto:${CONTACT_EMAIL}?subject=Stack%20Matchmaker%20setup%20help&body=Hi%20%E2%80%94%20I%20just%20finished%20the%20quiz%20and%20I'd%20like%20help%20setting%20up%20my%20stack.%0A%0AMy%20situation%3A%0A`}
          onClick={() => track("help_card_clicked")}
          className="btn-brand whitespace-nowrap"
        >
          Get a quote →
        </a>
      </div>
    </div>
  );
}
