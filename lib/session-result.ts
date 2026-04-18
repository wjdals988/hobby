"use client";

import { RESULT_STORAGE_KEY } from "@/lib/constants";
import { ReactionSummary } from "@/lib/types";

export function saveSummary(summary: ReactionSummary) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(summary));
}

export function loadSummary() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(RESULT_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as ReactionSummary;
  } catch {
    return null;
  }
}
