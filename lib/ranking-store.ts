import { RankingEntry, ReactionTestType } from "@/lib/types";

type RankingRepository = {
  listByType: (testType: ReactionTestType) => Promise<RankingEntry[]>;
  create: (entry: Omit<RankingEntry, "id" | "createdAt">) => Promise<RankingEntry>;
};

const inMemoryStore: RankingEntry[] = [];

function sortEntries(entries: RankingEntry[]) {
  return [...entries].sort((left, right) => {
    if (left.averageMs !== right.averageMs) {
      return left.averageMs - right.averageMs;
    }

    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
}

export const rankingRepository: RankingRepository = {
  async listByType(testType) {
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

    inMemoryStore.push(newEntry);
    return newEntry;
  },
};
