"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const UNLOCK_KEY = "stackmatchmaker_unlocked";

export function UnlockHandler() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("unlock") === "1") {
        window.localStorage.setItem(UNLOCK_KEY, "true");
        const src = params.get("src") ?? "unknown";
        track("unlocked_via_url", { src });
        params.delete("unlock");
        const qs = params.toString();
        const clean =
          window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash;
        window.history.replaceState({}, "", clean);
      }
    } catch {}
  }, []);

  return null;
}
