import { AnimatedPage } from "@/components/animated-page";
import { NavButton } from "@/components/nav-button";

export default function MenuPage() {
  return (
    <div className="app-shell px-4 py-10">
      <AnimatedPage className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl items-center">
        <section className="grid w-full gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur md:grid-cols-2 md:p-8">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/25 p-6">
            <p className="text-xs uppercase tracking-[0.4em] text-sky/70">play</p>
            <h1 className="mt-4 font-display text-3xl font-bold text-white">
              원하는 테스트를 선택해 기록을 남겨보세요.
            </h1>
            <p className="mt-4 text-sm leading-6 text-mist/75">
              두 가지 모드 모두 5라운드 구성으로 진행되며, 평균 기록을 글로벌 랭킹에 올릴 수 있습니다.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <NavButton href="/tests" testId="btn-view-tests">
              테스트 목록 보기
            </NavButton>
            <NavButton href="/ranking" testId="btn-view-ranking" variant="secondary">
              글로벌 랭킹 보기
            </NavButton>
          </div>
        </section>
      </AnimatedPage>
    </div>
  );
}
