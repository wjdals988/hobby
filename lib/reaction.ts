import { ReactionRoundResult, ReactionSummary, ReactionTestType } from "@/lib/types";

export function getRandomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function summarizeResults(
  results: ReactionRoundResult[],
  testType: ReactionTestType,
): ReactionSummary {
  const sorted = results.map((result) => result.reactionMs);
  const bestMs = Math.min(...sorted);
  const worstMs = Math.max(...sorted);
  const averageMs = Math.round(
    sorted.reduce((total, current) => total + current, 0) / sorted.length,
  );

  return {
    bestMs,
    worstMs,
    averageMs,
    results,
    testType,
  };
}

export function formatMs(value: number) {
  return `${Math.round(value)} ms`;
}
