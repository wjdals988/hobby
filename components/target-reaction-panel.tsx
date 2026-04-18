"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useTargetReactionRound } from "@/hooks/useTargetReactionRound";

export function TargetReactionPanel({
  onComplete,
}: {
  onComplete: (reactionMs: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { handleTargetPress, isVisible, position, targetSize } =
    useTargetReactionRound(containerRef, onComplete);

  return (
    <div
      ref={containerRef}
      data-testid="game-zone"
      className="touch-zone relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,28,50,0.98),rgba(5,12,22,0.98))] shadow-glow"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(89,195,255,0.15),transparent_45%)]" />
      <div className="absolute inset-x-0 top-0 z-10 p-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-sky/70">precision mode</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
          {isVisible ? "타겟을 정확히 터치하세요" : "타겟 생성 대기 중"}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-mist/75">
          빈 공간을 눌러도 라운드는 계속됩니다. 원형 타겟만 정확히 터치하세요.
        </p>
      </div>

      {isVisible ? (
        <motion.button
          type="button"
          onPointerDown={handleTargetPress}
          data-testid="target-shape"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="focus-ring absolute rounded-full border-4 border-white/90 bg-[radial-gradient(circle_at_30%_30%,#ffffff,#59c3ff_28%,#0f5ac8_100%)] shadow-[0_0_40px_rgba(89,195,255,0.65)]"
          style={{
            left: position.x,
            top: position.y,
            width: targetSize,
            height: targetSize,
          }}
        />
      ) : (
        <div
          data-testid="target-placeholder"
          className="absolute inset-0 flex items-center justify-center text-sm text-mist/45"
        >
          랜덤 타겟 생성 중...
        </div>
      )}
    </div>
  );
}
