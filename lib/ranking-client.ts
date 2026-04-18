"use client";

import { RankingEntry, ReactionTestType } from "@/lib/types";

type RankingPayload = {
  nickname: string;
  averageMs: number;
  testType: ReactionTestType;
};

export async function fetchRankings(testType: ReactionTestType) {
  const response = await fetch(`/api/ranking?testType=${testType}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("랭킹을 불러오지 못했습니다.");
  }

  const data = (await response.json()) as { rankings: RankingEntry[] };
  return data.rankings;
}

export async function submitRanking(payload: RankingPayload) {
  const response = await fetch("/api/ranking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;

    throw new Error(data?.message ?? "랭킹 등록에 실패했습니다.");
  }

  const data = (await response.json()) as { rankings: RankingEntry[] };
  return data.rankings;
}
