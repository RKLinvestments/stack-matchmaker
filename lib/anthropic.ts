import Anthropic from "@anthropic-ai/sdk";

let cached: Anthropic | null = null;

export function getAnthropic(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  if (!cached) cached = new Anthropic();
  return cached;
}

// Pinned to a stable alias for production reliability.
// `claude-opus-4-7` was previously used but is too new/unstable for launch.
// Swap back to opus once we've confirmed the account has stable access.
export const NARRATIVE_MODEL = "claude-sonnet-4-6";
