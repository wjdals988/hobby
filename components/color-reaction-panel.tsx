"use client";

import { motion } from "framer-motion";
import { useColorReactionRound } from "@/hooks/useColorReactionRound";

export function ColorReactionPanel({
  onComplete,
}: {
  onComplete: (reactionMs: number) => void;
}) {
  const { handlePress, status } = useColorReactionRound(onComplete);

  const isReady = status === "ready";
  const isTooFast = status === "too-fast";

  return (
    <motion.button
      type="button"
      onPointerDown={handlePress}
      data-testid="game-zone"
      whileTap={{ scale: 0.99 }}
      className={`touch-zone focus-ring relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 px-6 text-center transition duration-300 ${
        isReady ? "bg-emerald-500" : "bg-rose-500"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_48%)]" />
      <div className="relative z-10 space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-white/70">tap zone</p>
        <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
          {isReady ? "지금 눌러보세요!" : "기다리세요..."}
        </h2>
        <p className="mx-auto max-w-md text-sm leading-6 text-white/85 md:text-base">
          {isTooFast
            ? "너무 빠릅니다! 잠시 후 같은 라운드가 다시 시작됩니다."
            : isReady
              ? "초록색이 보이는 순간 바로 터치하면 됩니다."
              : "빨간 화면일 때 누르면 라운드가 무효 처리됩니다."}
        </p>
      </div>
    </motion.button>
  );
}
