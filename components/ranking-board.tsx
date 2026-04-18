import { RankingEntry, ReactionTestType } from "@/lib/types";

const TYPE_LABELS: Record<ReactionTestType, string> = {
  color: "색상 변경",
  target: "타겟 터치",
};

export function RankingBoard({
  entries,
  testType,
  emptyMessage = "아직 등록된 기록이 없습니다.",
}: {
  entries: RankingEntry[];
  testType: ReactionTestType;
  emptyMessage?: string;
}) {
  return (
    <section className="stat-card space-y-4" data-testid="ranking-board">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-sky/70">Top 10</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">
            {TYPE_LABELS[testType]} 랭킹
          </h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-mist/80">
          기준: 평균 속도
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-slate-950/20 px-4 py-10 text-center text-sm text-mist/70">
          {emptyMessage}
        </div>
      ) : (
        <ol className="space-y-3">
          {entries.map((entry, index) => (
            <li
              key={entry.id}
              data-testid={`ranking-item-${index + 1}`}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-pulse">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-white">{entry.nickname}</p>
                  <p className="text-xs text-mist/65">
                    {new Date(entry.createdAt).toLocaleString("ko-KR")}
                  </p>
                </div>
              </div>
              <strong className="text-lg text-white">{entry.averageMs} ms</strong>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
