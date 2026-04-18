import { ReactionTestType } from "@/lib/types";

export const TOTAL_ROUNDS = 5;
export const RESULT_STORAGE_KEY = "reaction-summary";

export const TEST_META: Record<
  ReactionTestType,
  { title: string; description: string; accent: string }
> = {
  color: {
    title: "색상 변경 반응 테스트",
    description: "빨간 화면에서 초록 화면으로 바뀌는 순간을 잡아보세요.",
    accent: "from-ember/80 via-orange-500 to-pulse",
  },
  target: {
    title: "랜덤 타겟 터치 테스트",
    description: "등장하는 타겟을 최대한 빠르게 정확하게 터치하세요.",
    accent: "from-sky via-cyan-400 to-pulse",
  },
};
