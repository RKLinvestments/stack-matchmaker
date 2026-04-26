"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Landing-page newsletter signup — separate from EmailCapture which is tied
 * to a completed stack on the results page. Posts to the same /api/lead
 * endpoint but tags the lead source so we can measure each funnel.
 */
export function NewsletterCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );
  const [msg, setMsg] = useState<string>("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("err");
      setMsg("Enter a valid email.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter_landing" }),
      });
      if (!res.ok) throw new Error("bad");
      setStatus("ok");
      setMsg("You're in. Check your inbox for a welcome note.");
      track("newsletter_subscribed", { source: "landing" });
    } catch {
      setStatus("err");
      setMsg("Something went wrong. Try again.");
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-card md:p-12">
        <div className="grid gap-6 md:grid-cols-[1.3fr,1fr] md:items-center md:gap-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Not ready for the quiz?
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              Get 1 curated AI tool recommendation a week.
            </h2>
            <p className="mt-3 text-muted-foreground">
              One tool, one workflow, one way it'll save you time. No spam,
              unsubscribe anytime.
            </p>
          </div>
          <form onSubmit={submit} className="flex flex-col gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@work.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full border border-border bg-input px-5 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-brand"
            >
              {status === "loading" ? "Subscribing…" : "Subscribe →"}
            </button>
            {msg && (
              <p
                className={`text-sm ${
                  status === "ok" ? "text-muted-foreground" : "text-red-400"
                }`}
                role={status === "err" ? "alert" : undefined}
              >
                {msg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
