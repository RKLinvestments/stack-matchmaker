"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

const UNLOCK_KEY = "stackmatchmaker_unlocked";

export function Gate({
  stackId,
  preview,
  children,
}: {
  stackId: string;
  preview: string;
  children: React.ReactNode;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(UNLOCK_KEY) === "true") {
        setUnlocked(true);
      }
    } catch {}
    setChecked(true);
  }, []);

  if (!checked) return null;
  if (unlocked) return <>{children}</>;

  return (
    <GateForm
      stackId={stackId}
      preview={preview}
      onUnlock={() => {
        try {
          window.localStorage.setItem(UNLOCK_KEY, "true");
        } catch {}
        setUnlocked(true);
      }}
    />
  );
}

function GateForm({
  stackId,
  preview,
  onUnlock,
}: {
  stackId: string;
  preview: string;
  onUnlock: () => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "err">("idle");
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
        body: JSON.stringify({ email, stackId, source: "stack_gate" }),
      });
      if (!res.ok) throw new Error("bad");
      track("gate_unlocked", { stackId });
      onUnlock();
    } catch {
      setStatus("err");
      setMsg("Something went wrong. Try again.");
    }
  }

  return (
    <div className="card relative overflow-hidden bg-ink-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-40 bg-gradient-to-b from-brand-500/30 to-transparent blur-3xl" />
      <div className="relative">
        <div className="text-xs font-semibold uppercase tracking-widest text-brand-300">
          Unlock your full plan
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          See the full stack, the rollout order, and your 7-day setup plan.
        </h2>
        <p className="mt-3 max-w-xl text-ink-200">{preview}</p>
        <form onSubmit={submit} className="mt-6 flex w-full flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            placeholder="you@work.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-full bg-white/10 px-5 py-3 text-white placeholder:text-ink-300 focus:bg-white/15 focus:outline-none sm:max-w-xs"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600 disabled:opacity-50"
          >
            {status === "loading" ? "Unlocking…" : "Unlock my plan →"}
          </button>
        </form>
        {msg && <div className="mt-3 text-sm text-red-300">{msg}</div>}
        <p className="mt-4 text-xs text-ink-300">
          One email. No spam. Unsubscribe any time.
        </p>
      </div>
    </div>
  );
}
