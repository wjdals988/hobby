import { notFound } from "next/navigation";
import { TestRunner } from "@/components/test-runner";
import { ReactionTestType } from "@/lib/types";

const validTypes: ReactionTestType[] = ["color", "target"];

export default async function TestTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  if (!validTypes.includes(type as ReactionTestType)) {
    notFound();
  }

  return (
    <div className="app-shell">
      <TestRunner type={type as ReactionTestType} />
    </div>
  );
}
