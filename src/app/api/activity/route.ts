import { NextResponse } from "next/server";
import { mockActivities } from "@/lib/mock-data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  await delay(200);
  return NextResponse.json({ success: true, data: mockActivities });
}
