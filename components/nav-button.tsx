import Link from "next/link";

export function NavButton({
  href,
  children,
  testId,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  testId: string;
  variant?: "primary" | "secondary";
}) {
  const styles =
    variant === "primary"
      ? "bg-pulse text-slate-950 hover:scale-[1.01]"
      : "bg-white/8 text-white hover:bg-white/14";

  return (
    <Link
      href={href}
      data-testid={testId}
      className={`focus-ring inline-flex min-h-14 items-center justify-center rounded-full px-6 py-4 text-base font-semibold transition duration-200 ${styles}`}
    >
      {children}
    </Link>
  );
}
