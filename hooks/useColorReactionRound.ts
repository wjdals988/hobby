"use client";

import { useEffect, useRef, useState } from "react";
import { getRandomBetween } from "@/lib/reaction";

type ColorRoundState = "waiting" | "ready" | "too-fast";

export function useColorReactionRound(onComplete: (reactionMs: number) => void) {
  const timeoutRef = useRef<number | null>(null);
  const penaltyTimeoutRef = useRef<number | null>(null);
  const readyAtRef = useRef<number | null>(null);
  const resolvedRef = useRef(false);
  const [status, setStatus] = useState<ColorRoundState>("waiting");

  const scheduleRound = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    if (penaltyTimeoutRef.current) {
      window.clearTimeout(penaltyTimeoutRef.current);
    }

    resolvedRef.current = false;
    readyAtRef.current = null;
    setStatus("waiting");

    timeoutRef.current = window.setTimeout(() => {
      setStatus("ready");
    }, getRandomBetween(2000, 5000));
  };

  useEffect(() => {
    scheduleRound();

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      if (penaltyTimeoutRef.current) {
        window.clearTimeout(penaltyTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (status === "ready") {
      readyAtRef.current = performance.now();
      return;
    }

    readyAtRef.current = null;
  }, [status]);

  function handlePress() {
    if (resolvedRef.current) {
      return;
    }

    if (status === "waiting") {
      setStatus("too-fast");
      penaltyTimeoutRef.current = window.setTimeout(() => {
        scheduleRound();
      }, 1100);
      return;
    }

    if (status !== "ready" || readyAtRef.current === null) {
      return;
    }

    resolvedRef.current = true;
    onComplete(performance.now() - readyAtRef.current);
  }

  return {
    handlePress,
    status,
  };
}
