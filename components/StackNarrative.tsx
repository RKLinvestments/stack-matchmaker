"use client";

import { useEffect, useState } from "react";
import type { Narrative } from "@/lib/narrative";

export function StackNarrative({ encoded }: { encoded: string }) {
  const [narrative, setNarrative] = useState<Narrative | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/narrative", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ a: encoded }),
        });
        const json = await res.json();
        if (cancelled) return;
        if (json.ok && json.narrative) setNarrative(json.narrative);
        else setError("Couldn't generate your plan.");
      } catch {
        if (!cancelled) setError("Network error.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [encoded]);

  if (!narrative && !error) {
    return (
      <div className="card animate-pulse">
        <div className="h-4 w-40 rounded bg-muted" />
        <div className="mt-4 space-y-2">
          <div className="h-3 w-full rounded bg-muted" />
          <div className="h-3 w-5/6 rounded bg-muted" />
          <div className="h-3 w-4/6 rounded bg-muted" />
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="h-24 rounded-xl bg-muted" />
          <div className="h-24 rounded-xl bg-muted" />
          <div className="h-24 rounded-xl bg-muted" />
        </div>
      </div>
    );
  }
  if (error) return null;
  if (!narrative) return null;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Your rollout plan
        </div>
        {narrative.source === "ai" && (
          <span className="chip !text-[11px]">Personalized for you</span>
        )}
      </div>
      <p className="mt-3 text-lg leading-relaxed text-foreground">
        {narrative.situation}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {narrative.rollout.map((r) => (
          <div
            key={r.window}
            className="rounded-2xl border border-border p-5"
          >
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              {r.window}
            </div>
            <div className="mt-2 font-semibold text-foreground">{r.goal}</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {r.actions.map((a, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-muted/60 p-4">
        <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Watch out for
        </div>
        <ul className="mt-2 space-y-1.5 text-sm text-foreground">
          {narrative.watchOuts.map((w, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
              {w}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
