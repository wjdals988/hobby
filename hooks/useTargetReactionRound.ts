"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { getRandomBetween } from "@/lib/reaction";

const TARGET_SIZE = 88;

type Position = {
  x: number;
  y: number;
};

export function useTargetReactionRound(
  containerRef: RefObject<HTMLDivElement | null>,
  onComplete: (reactionMs: number) => void,
) {
  const timeoutRef = useRef<number | null>(null);
  const visibleAtRef = useRef<number | null>(null);
  const resolvedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 120, y: 120 });

  useEffect(() => {
    resolvedRef.current = false;

    timeoutRef.current = window.setTimeout(() => {
      const bounds = containerRef.current?.getBoundingClientRect();
      const width = bounds?.width ?? 320;
      const height = bounds?.height ?? 420;
      const maxX = Math.max(24, width - TARGET_SIZE - 24);
      const maxY = Math.max(24, height - TARGET_SIZE - 24);
      const x = getRandomBetween(24, Math.round(maxX));
      const y = getRandomBetween(24, Math.round(maxY));

      setPosition({ x, y });
      visibleAtRef.current = performance.now();
      setIsVisible(true);
    }, getRandomBetween(1000, 3000));

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [containerRef]);

  function handleTargetPress() {
    if (!isVisible || visibleAtRef.current === null || resolvedRef.current) {
      return;
    }

    resolvedRef.current = true;
    setIsVisible(false);
    onComplete(performance.now() - visibleAtRef.current);
  }

  return {
    isVisible,
    position,
    targetSize: TARGET_SIZE,
    handleTargetPress,
  };
}
