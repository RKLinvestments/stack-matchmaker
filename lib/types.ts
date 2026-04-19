export type Role =
  | "creator"
  | "founder"
  | "small_business"
  | "marketer"
  | "freelancer"
  | "operator"
  | "agency"
  | "sales"
  | "support";

export type Goal =
  | "more_content"
  | "save_time"
  | "automate"
  | "leads"
  | "sales"
  | "support"
  | "build_stack"
  | "research";

export type Pain =
  | "too_many_tools"
  | "where_to_start"
  | "content_slow"
  | "manual_work"
  | "no_workflow"
  | "wasted_money"
  | "scattered_data";

export type Budget = "free" | "lt100" | "lt300" | "premium";
export type Skill = "beginner" | "intermediate" | "advanced";
export type TeamSize = "solo" | "2_5" | "6_20" | "20_plus";

export type Category =
  | "writing"
  | "chat_assistant"
  | "automation"
  | "video"
  | "audio"
  | "image"
  | "productivity"
  | "crm_sales"
  | "lead_gen"
  | "website_build"
  | "analytics_seo"
  | "research"
  | "meeting_notes"
  | "agents"
  | "code";

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  category: Category;
  url: string;
  affiliateUrl?: string;
  audiences: Role[];
  goals: Goal[];
  pains: Pain[];
  budgets: Budget[];
  setup: Skill;
  trust: number;
  roi: number;
  demo: number;
  retention: number;
  alternatives: string[];
  notes?: string;
  killerUseCase: string;
}

export interface QuizAnswers {
  role: Role;
  goal: Goal;
  pain: Pain;
  budget: Budget;
  skill: Skill;
  team: TeamSize;
  currentTools: string[];
}

export interface ScoredTool {
  tool: Tool;
  score: number;
  reasons: string[];
  isReplacement?: { replaces: string; why: string };
}

export interface Stack {
  answers: QuizAnswers;
  picks: ScoredTool[];
  workflow: { step: number; toolId: string; action: string }[];
  removeFromCurrent: { toolId: string; why: string }[];
  estMonthly: { low: number; high: number };
  generatedAt: string;
}
