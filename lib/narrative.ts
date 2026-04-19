import type { Stack } from "./types";

export interface Narrative {
  situation: string;
  rollout: { window: string; goal: string; actions: string[] }[];
  watchOuts: string[];
  source: "ai" | "template";
}

export function templateNarrative(stack: Stack): Narrative {
  const top = stack.picks[0]?.tool.name ?? "your top pick";
  const second = stack.picks[1]?.tool.name ?? "the next tool";
  const third = stack.picks[2]?.tool.name ?? "the last tool";
  return {
    situation: `You picked a stack of ${stack.picks.length} tools, est. $${stack.estMonthly.low}–${stack.estMonthly.high}/mo. Start small — get one tool working before stacking the next.`,
    rollout: [
      {
        window: "Days 1–7",
        goal: "Get your daily AI brain working",
        actions: [
          `Set up ${top} and use it for one real task today.`,
          `Move 3 recurring questions you'd Google into ${top} this week.`,
          `Decide what NOT to use it for so you don't get scattered.`,
        ],
      },
      {
        window: "Days 8–30",
        goal: "Add the next tool — only when the first is sticky",
        actions: [
          `Add ${second}. Connect it to ${top} where it makes sense.`,
          `Block 2 hours to actually learn it. Don't wing it.`,
          `Track the time saved — if it's not 30+ min/week, drop it.`,
        ],
      },
      {
        window: "Days 31–90",
        goal: "Layer in automation and remove what's redundant",
        actions: [
          `Add ${third} as the third leg of the stack.`,
          `Audit any tool you stopped opening — cancel the subscription.`,
          `Document one workflow that uses 2+ of your tools end to end.`,
        ],
      },
    ],
    watchOuts: [
      "Stacking too fast. One sticky tool beats four half-used ones.",
      "Paying for premium tiers before you've hit the free tier's limits.",
      "Confusing 'I tried it' with 'I made it part of my workflow.'",
    ],
    source: "template",
  };
}
