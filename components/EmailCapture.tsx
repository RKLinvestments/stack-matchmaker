"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

export function EmailCapture({ stackId }: { stackId: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
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
        body: JSON.stringify({ email, stackId }),
      });
      if (!res.ok) throw new Error("bad");
      setStatus("ok");
      setMsg("Sent. Check your inbox.");
      track("email_captured", { stackId });
    } catch {
      setStatus("err");
      setMsg("Something went wrong. Try again.");
    }
  }

  return (
    <div className="card bg-secondary text-foreground">
      <div className="grid gap-6 md:grid-cols-[1fr,auto] md:items-center">
        <div>
          <div className="text-xl font-semibold">Email me my full plan</div>
          <p className="mt-1 text-muted-foreground">
            Your stack + a 7-day setup checklist for each tool. One email, no spam.
          </p>
        </div>
        <form onSubmit={submit} className="flex w-full gap-2 md:w-auto">
          <input
            type="email"
            placeholder="you@work.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-full border border-border bg-input px-5 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring md:w-72"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-primary px-5 py-3 font-medium text-white hover:bg-primary/90 disabled:opacity-50"
          >
            {status === "loading" ? "Sending…" : "Email my plan →"}
          </button>
        </form>
      </div>
      {msg && (
        <div
          className={`mt-3 text-sm ${
            status === "ok" ? "text-primary" : "text-red-300"
          }`}
        >
          {msg}
        </div>
      )}
    </div>
  );
}
