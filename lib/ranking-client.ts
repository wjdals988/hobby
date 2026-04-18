"use client";

import { RankingEntry, RankingStorageMode, ReactionTestType } from "@/lib/types";

type RankingPayload = {
  nickname: string;
  averageMs: number;
  testType: ReactionTestType;
};

type RankingResponse = {
  rankings: RankingEntry[];
  storageMode: RankingStorageMode;
};

const LOCAL_RANKING_STORAGE_KEY = "reaction-local-rankings";

function sortRankings(entries: RankingEntry[]) {
  return [...entries].sort((left, right) => {
    if (left.averageMs !== right.averageMs) {
      return left.averageMs - right.averageMs;
    }

    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
}

function loadLocalRankings() {
  if (typeof window === "undefined") {
    return [] as RankingEntry[];
  }

  const raw = window.localStorage.getItem(LOCAL_RANKING_STORAGE_KEY);

  if (!raw) {
    return [] as RankingEntry[];
  }

  try {
    return JSON.parse(raw) as RankingEntry[];
  } catch {
    return [] as RankingEntry[];
  }
}

function saveLocalRankings(entries: RankingEntry[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCAL_RANKING_STORAGE_KEY, JSON.stringify(entries));
}

function listLocalRankings(testType: ReactionTestType) {
  return sortRankings(
    loadLocalRankings().filter((entry) => entry.testType === testType),
  ).slice(0, 10);
}

function appendLocalRanking(payload: RankingPayload) {
  const nextEntry: RankingEntry = {
    id: crypto.randomUUID(),
    nickname: payload.nickname,
    averageMs: payload.averageMs,
    testType: payload.testType,
    createdAt: new Date().toISOString(),
  };

  const nextEntries = [...loadLocalRankings(), nextEntry];
  saveLocalRankings(nextEntries);

  return listLocalRankings(payload.testType);
}

export async function fetchRankings(testType: ReactionTestType) {
  const response = await fetch(`/api/ranking?testType=${testType}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load rankings.");
  }

  const data = (await response.json()) as RankingResponse;

  if (data.storageMode === "memory") {
    return listLocalRankings(testType);
  }

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

    throw new Error(data?.message ?? "Failed to submit ranking.");
  }

  const data = (await response.json()) as RankingResponse;

  if (data.storageMode === "memory") {
    return appendLocalRanking(payload);
  }

  return data.rankings;
}
