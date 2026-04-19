"use client";

type Props = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    posthog?: { capture: (event: string, props?: Props) => void };
    plausible?: (event: string, opts?: { props?: Props }) => void;
  }
}

export function track(event: string, props?: Props) {
  if (typeof window === "undefined") return;
  try {
    if (window.posthog?.capture) {
      window.posthog.capture(event, props);
      return;
    }
    if (typeof window.plausible === "function") {
      window.plausible(event, props ? { props } : undefined);
      return;
    }
    if (process.env.NODE_ENV !== "production") {
      console.log("[track]", event, props ?? {});
    }
  } catch {
    /* never throw from analytics */
  }
}
