import type { QuizAnswers } from "./types";

export function encodeAnswers(a: QuizAnswers): string {
  const json = JSON.stringify(a);
  if (typeof window === "undefined") {
    return Buffer.from(json, "utf-8").toString("base64url");
  }
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeAnswers(s: string): QuizAnswers | null {
  try {
    const padded = s.replace(/-/g, "+").replace(/_/g, "/");
    const json =
      typeof window === "undefined"
        ? Buffer.from(padded, "base64").toString("utf-8")
        : decodeURIComponent(escape(atob(padded)));
    const obj = JSON.parse(json);
    if (!obj || typeof obj !== "object") return null;
    return obj as QuizAnswers;
  } catch {
    return null;
  }
}
