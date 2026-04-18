"use client";

import { useMemo, useState } from "react";
import { TOTAL_ROUNDS } from "@/lib/constants";
import { summarizeResults } from "@/lib/reaction";
import { ReactionRoundResult, ReactionSummary, ReactionTestType } from "@/lib/types";

export function useReactionGame(testType: ReactionTestType) {
  const [results, setResults] = useState<ReactionRoundResult[]>([]);

  const currentRound = results.length + 1;
  const isComplete = results.length >= TOTAL_ROUNDS;

  const summary = useMemo<ReactionSummary | null>(() => {
    if (!isComplete) {
      return null;
    }

    return summarizeResults(results, testType);
  }, [isComplete, results, testType]);

  function recordResult(reactionMs: number) {
    setResults((current) => [
      ...current,
      {
        round: current.length + 1,
        reactionMs,
      },
    ]);
  }

  return {
    currentRound,
    results,
    isComplete,
    summary,
    totalRounds: TOTAL_ROUNDS,
    recordResult,
  };
}
