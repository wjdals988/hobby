import { AnimatedPage } from "@/components/animated-page";
import { NavButton } from "@/components/nav-button";

export default function IntroPage() {
  return (
    <div className="app-shell flex min-h-screen items-center justify-center px-4 py-10">
      <AnimatedPage className="w-full max-w-4xl">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-12 text-center shadow-glow backdrop-blur md:px-12 md:py-16">
          <p className="text-xs uppercase tracking-[0.45em] text-sky/70">reflex challenge</p>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-7xl">
            극한의 반응속도 테스트
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-mist/75 md:text-lg">
            당신의 반사신경을 한계까지 테스트해보세요.
          </p>

          <div className="mt-10 flex justify-center">
            <NavButton href="/menu" testId="btn-start">
              시작하기
            </NavButton>
          </div>
        </section>
      </AnimatedPage>
    </div>
  );
}
