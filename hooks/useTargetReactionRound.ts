"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { getRandomBetween } from "@/lib/reaction";

const TARGET_SIZE = 88;
const TARGET_HORIZONTAL_PADDING = 24;
const TARGET_BOTTOM_PADDING = 24;
const TARGET_TOP_SAFE_INSET = 160;

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
  const [position, setPosition] = useState<Position>({ x: 120, y: 180 });

  useEffect(() => {
    resolvedRef.current = false;

    timeoutRef.current = window.setTimeout(() => {
      const bounds = containerRef.current?.getBoundingClientRect();
      const width = bounds?.width ?? 320;
      const height = bounds?.height ?? 420;
      const minX = TARGET_HORIZONTAL_PADDING;
      const minY = Math.min(
        Math.max(TARGET_TOP_SAFE_INSET, TARGET_HORIZONTAL_PADDING),
        Math.max(TARGET_HORIZONTAL_PADDING, height - TARGET_SIZE - TARGET_BOTTOM_PADDING),
      );
      const maxX = Math.max(minX, width - TARGET_SIZE - TARGET_HORIZONTAL_PADDING);
      const maxY = Math.max(minY, height - TARGET_SIZE - TARGET_BOTTOM_PADDING);
      const x = getRandomBetween(Math.round(minX), Math.round(maxX));
      const y = getRandomBetween(Math.round(minY), Math.round(maxY));

      setPosition({ x, y });
      setIsVisible(true);
    }, getRandomBetween(1000, 3000));

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [containerRef]);

  useEffect(() => {
    if (isVisible) {
      visibleAtRef.current = performance.now();
      return;
    }

    visibleAtRef.current = null;
  }, [isVisible, position.x, position.y]);

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
