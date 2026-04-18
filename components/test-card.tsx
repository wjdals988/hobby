import Link from "next/link";
import { TEST_META } from "@/lib/constants";
import { ReactionTestType } from "@/lib/types";

export function TestCard({ type }: { type: ReactionTestType }) {
  const meta = TEST_META[type];

  return (
    <Link
      href={`/test/${type}`}
      data-testid={`test-card-${type}`}
      className="group stat-card flex min-h-64 flex-col justify-between overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      <div>
        <span
          className={`inline-flex rounded-full bg-gradient-to-r ${meta.accent} px-3 py-1 text-xs font-bold text-slate-950`}
        >
          {type === "color" ? "Mode 01" : "Mode 02"}
        </span>
        <h2 className="mt-5 font-display text-3xl font-bold text-white">{meta.title}</h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-mist/75">{meta.description}</p>
      </div>

      <div className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <span className="text-sm text-mist/70">바로 시작하기</span>
        <span className="text-lg text-pulse transition duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
