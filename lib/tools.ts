import toolsJson from "@/data/tools.json";
import type { Tool } from "./types";

export const tools = toolsJson as Tool[];

export const toolsById: Record<string, Tool> = Object.fromEntries(
  tools.map((t) => [t.id, t]),
);

export function getTool(id: string): Tool | undefined {
  return toolsById[id];
}
