import { NextRequest, NextResponse } from "next/server";
import { getRankingStorageMode, rankingRepository } from "@/lib/ranking-store";
import { ReactionTestType } from "@/lib/types";

function isTestType(value: string | null): value is ReactionTestType {
  return value === "color" || value === "target";
}

export async function GET(request: NextRequest) {
  const testType = request.nextUrl.searchParams.get("testType");

  if (!isTestType(testType)) {
    return NextResponse.json({ message: "Valid testType is required." }, { status: 400 });
  }

  const rankings = await rankingRepository.listByType(testType);
  const storageMode = getRankingStorageMode();

  return NextResponse.json({ rankings, storageMode });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { nickname?: string; averageMs?: number; testType?: string }
    | null;

  if (!body) {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const nickname = body.nickname?.trim();
  const averageMs = Number(body.averageMs);
  const incomingTestType = body.testType ?? null;

  if (!nickname) {
    return NextResponse.json({ message: "Nickname is required." }, { status: 400 });
  }

  if (!Number.isFinite(averageMs) || averageMs <= 0) {
    return NextResponse.json({ message: "Valid averageMs is required." }, { status: 400 });
  }

  if (!isTestType(incomingTestType)) {
    return NextResponse.json({ message: "Valid test type is required." }, { status: 400 });
  }

  const testType: ReactionTestType = incomingTestType;

  await rankingRepository.create({
    nickname,
    averageMs: Math.round(averageMs),
    testType,
  });

  const rankings = await rankingRepository.listByType(testType);
  const storageMode = getRankingStorageMode();

  return NextResponse.json({ rankings, storageMode }, { status: 201 });
}
