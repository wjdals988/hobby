"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatedPage } from "@/components/animated-page";
import { RankingBoard } from "@/components/ranking-board";
import { fetchRankings, RankingClientResult } from "@/lib/ranking-client";
import { RankingEntry, RankingStorageMode, ReactionTestType } from "@/lib/types";

const tabs: { label: string; type: ReactionTestType }[] = [
  { label: "색상 변경", type: "color" },
  { label: "타겟 터치", type: "target" },
];

export default function RankingPage() {
  const [selectedType, setSelectedType] = useState<ReactionTestType>("color");
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [message, setMessage] = useState("랭킹을 불러오는 중입니다...");
  const [storageMode, setStorageMode] = useState<RankingStorageMode | null>(null);

  useEffect(() => {
    let active = true;

    setMessage("랭킹을 불러오는 중입니다...");

    fetchRankings(selectedType)
      .then((result: RankingClientResult) => {
        if (!active) {
          return;
        }

        setEntries(result.rankings);
        setStorageMode(result.storageMode);
        setMessage(
          result.rankings.length === 0
            ? "아직 등록된 기록이 없습니다."
            : `${result.rankings.length}개의 기록을 불러왔습니다.`,
        );
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setEntries([]);
        setStorageMode(null);
        setMessage(error instanceof Error ? error.message : "랭킹을 불러오지 못했습니다.");
      });

    return () => {
      active = false;
    };
  }, [selectedType]);

  return (
    <div className="app-shell px-4 py-10">
      <AnimatedPage className="mx-auto max-w-5xl">
        <section className="space-y-6">
          <div className="stat-card p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.4em] text-sky/70">global ranking</p>
            <h1 className="mt-4 font-display text-4xl font-bold text-white">글로벌 랭킹</h1>
            <p className="mt-3 text-sm leading-6 text-mist/75">
              테스트별 Top 10 기록을 확인하고 다음 플레이 전략을 세워보세요.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {tabs.map((tab) => {
                const isActive = tab.type === selectedType;

                return (
                  <button
                    key={tab.type}
                    type="button"
                    onClick={() => setSelectedType(tab.type)}
                    data-testid={`ranking-tab-${tab.type}`}
                    className={`focus-ring inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-pulse text-slate-950"
                        : "bg-white/8 text-white hover:bg-white/14"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {storageMode === "memory" ? (
              <p className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                현재 Redis 환경변수가 없어 이 브라우저의 임시 랭킹만 표시되고 있습니다.
              </p>
            ) : null}

            <p className="mt-4 text-sm text-mist/70" data-testid="ranking-status">
              {message}
            </p>
          </div>

          <RankingBoard entries={entries} testType={selectedType} />

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tests"
              data-testid="btn-retry"
              className="focus-ring inline-flex min-h-14 flex-1 items-center justify-center rounded-full bg-pulse px-6 py-4 font-semibold text-slate-950"
            >
              다시 시도
            </Link>
            <Link
              href="/menu"
              data-testid="btn-go-home"
              className="focus-ring inline-flex min-h-14 flex-1 items-center justify-center rounded-full bg-white/8 px-6 py-4 font-semibold text-white"
            >
              메인으로 돌아가기
            </Link>
          </div>
        </section>
      </AnimatedPage>
    </div>
  );
}
