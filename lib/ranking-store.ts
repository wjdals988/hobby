import { redis } from "@/lib/redis";
import { RankingEntry, RankingStorageMode, ReactionTestType } from "@/lib/types";

type RankingRepository = {
  listByType: (testType: ReactionTestType) => Promise<RankingEntry[]>;
  create: (entry: Omit<RankingEntry, "id" | "createdAt">) => Promise<RankingEntry>;
};

const inMemoryStore: RankingEntry[] = [];
const RANKING_LIST_PREFIX = "reaction-ranking";

function sortEntries(entries: RankingEntry[]) {
  return [...entries].sort((left, right) => {
    if (left.averageMs !== right.averageMs) {
      return left.averageMs - right.averageMs;
    }

    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
}

function getRankingKey(testType: ReactionTestType) {
  return `${RANKING_LIST_PREFIX}:${testType}`;
}

function parseRankingEntries(entries: unknown[]) {
  return entries
    .map((entry) => {
      if (typeof entry === "string") {
        try {
          return JSON.parse(entry) as RankingEntry;
        } catch {
          return null;
        }
      }

      if (
        typeof entry !== "object" ||
        entry === null ||
        !("id" in entry) ||
        !("nickname" in entry) ||
        !("averageMs" in entry) ||
        !("testType" in entry) ||
        !("createdAt" in entry)
      ) {
        return null;
      }

      return entry as RankingEntry;
    })
    .filter((entry): entry is RankingEntry => entry !== null);
}

export function getRankingStorageMode(): RankingStorageMode {
  return redis ? "redis" : "memory";
}

export const rankingRepository: RankingRepository = {
  async listByType(testType) {
    if (redis) {
      const rawEntries = await redis.lrange(getRankingKey(testType), 0, -1);
      return sortEntries(parseRankingEntries(rawEntries)).slice(0, 10);
    }

    return sortEntries(
      inMemoryStore.filter((entry) => entry.testType === testType),
    ).slice(0, 10);
  },
  async create(entry) {
    const newEntry: RankingEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    if (redis) {
      await redis.lpush(getRankingKey(entry.testType), newEntry);
      return newEntry;
    }

    inMemoryStore.push(newEntry);
    return newEntry;
  },
};
