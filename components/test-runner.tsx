"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ColorReactionPanel } from "@/components/color-reaction-panel";
import { TargetReactionPanel } from "@/components/target-reaction-panel";
import { TEST_META } from "@/lib/constants";
import { saveSummary } from "@/lib/session-result";
import { formatMs } from "@/lib/reaction";
import { ReactionTestType } from "@/lib/types";
import { useReactionGame } from "@/hooks/useReactionGame";

export function TestRunner({ type }: { type: ReactionTestType }) {
  const router = useRouter();
  const { currentRound, isComplete, recordResult, results, summary, totalRounds } =
    useReactionGame(type);
  const meta = TEST_META[type];

  useEffect(() => {
    if (!isComplete || !summary) {
      return;
    }

    saveSummary(summary);
    router.replace("/result");
  }, [isComplete, router, summary]);

  const lastResult = results.at(-1);

  return (
    <section className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-sky/65">live challenge</p>
            <h1 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
              {meta.title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-mist/75">{meta.description}</p>
          </div>
          <div className="flex gap-3">
            <div className="stat-card min-w-28 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/50">round</p>
              <p className="mt-2 text-2xl font-bold text-white" data-testid="round-indicator">
                {Math.min(currentRound, totalRounds)}/{totalRounds}
              </p>
            </div>
            <div className="stat-card min-w-28 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-mist/50">last</p>
              <p className="mt-2 text-2xl font-bold text-white" data-testid="last-result">
                {lastResult ? formatMs(lastResult.reactionMs) : "-"}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div key={`${type}-${currentRound}`} className="flex-1">
        {type === "color" ? (
          <ColorReactionPanel onComplete={recordResult} />
        ) : (
          <TargetReactionPanel onComplete={recordResult} />
        )}
      </div>
    </section>
  );
}
