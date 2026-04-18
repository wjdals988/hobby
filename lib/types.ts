export type ReactionTestType = "color" | "target";

export type RankingStorageMode = "redis" | "memory";

export type ReactionRoundResult = {
  round: number;
  reactionMs: number;
};

export type ReactionSummary = {
  bestMs: number;
  worstMs: number;
  averageMs: number;
  results: ReactionRoundResult[];
  testType: ReactionTestType;
};

export type RankingEntry = {
  id: string;
  nickname: string;
  averageMs: number;
  testType: ReactionTestType;
  createdAt: string;
};
