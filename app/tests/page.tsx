import { AnimatedPage } from "@/components/animated-page";
import { TestCard } from "@/components/test-card";

export default function TestsPage() {
  return (
    <div className="app-shell px-4 py-10">
      <AnimatedPage className="mx-auto max-w-6xl">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur md:p-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.4em] text-sky/70">select mode</p>
            <h1 className="mt-4 font-display text-4xl font-bold text-white">
              테스트 목록
            </h1>
            <p className="mt-4 text-sm leading-6 text-mist/75 md:text-base">
              순간 반응과 정밀 타겟 터치, 두 가지 방식으로 반사신경을 측정해보세요.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <TestCard type="color" />
            <TestCard type="target" />
          </div>
        </section>
      </AnimatedPage>
    </div>
  );
}
