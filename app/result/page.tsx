"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatedPage } from "@/components/animated-page";
import { RankingBoard } from "@/components/ranking-board";
import { TEST_META } from "@/lib/constants";
import { submitRanking } from "@/lib/ranking-client";
import { loadSummary } from "@/lib/session-result";
import { formatMs } from "@/lib/reaction";
import { RankingEntry, ReactionSummary } from "@/lib/types";

export default function ResultPage() {
  const [summary, setSummary] = useState<ReactionSummary | null>(null);
  const [nickname, setNickname] = useState("");
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSummary(loadSummary());
  }, []);

  async function handleSubmit() {
    if (!summary) {
      setMessage("먼저 테스트를 완료한 뒤 결과를 확인해 주세요.");
      return;
    }

    if (!nickname.trim()) {
      setMessage("닉네임을 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const nextRankings = await submitRanking({
        nickname: nickname.trim(),
        averageMs: summary.averageMs,
        testType: summary.testType,
      });

      setRankings(nextRankings);
      setMessage("랭킹 등록이 완료되었습니다.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "랭킹 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!summary) {
    return (
      <div className="app-shell px-4 py-10">
        <AnimatedPage className="mx-auto max-w-3xl">
          <section className="stat-card p-8 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-sky/70">missing result</p>
            <h1 className="mt-4 font-display text-3xl font-bold text-white">
              저장된 결과가 없습니다
            </h1>
            <p className="mt-4 text-sm leading-6 text-mist/75">
              테스트를 먼저 진행한 뒤 결과 페이지로 이동해 주세요.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/tests"
                data-testid="btn-go-tests"
                className="focus-ring inline-flex min-h-14 items-center justify-center rounded-full bg-pulse px-6 py-4 font-semibold text-slate-950"
              >
                테스트 목록 보기
              </Link>
              <Link
                href="/menu"
                data-testid="btn-go-home"
                className="focus-ring inline-flex min-h-14 items-center justify-center rounded-full bg-white/8 px-6 py-4 font-semibold text-white"
              >
                메인으로 돌아가기
              </Link>
            </div>
          </section>
        </AnimatedPage>
      </div>
    );
  }

  const meta = TEST_META[summary.testType];

  return (
    <div className="app-shell px-4 py-10">
      <AnimatedPage className="mx-auto max-w-5xl">
        <section className="space-y-6">
          <div className="stat-card p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.4em] text-sky/70">result summary</p>
            <h1 className="mt-4 font-display text-4xl font-bold text-white">기록 분석 완료</h1>
            <p className="mt-3 text-sm leading-6 text-mist/75">{meta.title} 기준 결과입니다.</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/30 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-mist/50">최고 속도</p>
                <strong className="mt-3 block text-3xl text-pulse">
                  {formatMs(summary.bestMs)}
                </strong>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/30 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-mist/50">최저 속도</p>
                <strong className="mt-3 block text-3xl text-white">
                  {formatMs(summary.worstMs)}
                </strong>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/30 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-mist/50">평균 속도</p>
                <strong className="mt-3 block text-3xl text-sky">
                  {formatMs(summary.averageMs)}
                </strong>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="stat-card p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-sky/70">join ranking</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">랭킹 등록</h2>
              <p className="mt-3 text-sm leading-6 text-mist/75">
                닉네임과 평균 속도를 함께 글로벌 랭킹에 기록합니다.
              </p>

              <div className="mt-6 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm text-mist/75">닉네임</span>
                  <input
                    value={nickname}
                    onChange={(event) => setNickname(event.target.value)}
                    placeholder="예: lightning_cat"
                    maxLength={20}
                    data-testid="result-nickname-input"
                    className="focus-ring h-14 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 text-white placeholder:text-mist/35"
                  />
                </label>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  data-testid="btn-submit-ranking"
                  className="focus-ring inline-flex min-h-14 w-full items-center justify-center rounded-full bg-pulse px-6 py-4 font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "등록 중..." : "랭킹 등록"}
                </button>

                {message ? (
                  <p
                    data-testid="result-message"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-mist/80"
                  >
                    {message}
                  </p>
                ) : null}
              </div>
            </section>

            <RankingBoard
              entries={rankings}
              testType={summary.testType}
              emptyMessage="랭킹 등록 후 Top 10이 여기에 표시됩니다."
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/test/${summary.testType}`}
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
