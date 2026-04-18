import { NextRequest, NextResponse } from "next/server";
import { rankingRepository } from "@/lib/ranking-store";
import { ReactionTestType } from "@/lib/types";

function isTestType(value: string | null): value is ReactionTestType {
  return value === "color" || value === "target";
}

export async function GET(request: NextRequest) {
  const testType = request.nextUrl.searchParams.get("testType");

  if (!isTestType(testType)) {
    return NextResponse.json(
      { message: "유효한 testType이 필요합니다." },
      { status: 400 },
    );
  }

  const rankings = await rankingRepository.listByType(testType);

  return NextResponse.json({ rankings });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { nickname?: string; averageMs?: number; testType?: string }
    | null;

  if (!body) {
    return NextResponse.json({ message: "잘못된 요청입니다." }, { status: 400 });
  }

  const nickname = body.nickname?.trim();
  const averageMs = Number(body.averageMs);

  if (!nickname) {
    return NextResponse.json({ message: "닉네임을 입력해 주세요." }, { status: 400 });
  }

  if (!Number.isFinite(averageMs) || averageMs <= 0) {
    return NextResponse.json(
      { message: "유효한 평균 속도가 필요합니다." },
      { status: 400 },
    );
  }

  if (!isTestType(body.testType ?? null)) {
    return NextResponse.json({ message: "유효한 테스트 타입이 필요합니다." }, { status: 400 });
  }

  await rankingRepository.create({
    nickname,
    averageMs: Math.round(averageMs),
    testType: body.testType,
  });

  const rankings = await rankingRepository.listByType(body.testType);

  return NextResponse.json({ rankings }, { status: 201 });
}
