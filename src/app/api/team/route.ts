import { NextRequest, NextResponse } from "next/server";
import { mockTeamMembers, TeamMember } from "@/lib/mock-data";

// In-memory storage
let teamMembers: TeamMember[] = [...mockTeamMembers];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  await delay(300);
  return NextResponse.json({ success: true, data: teamMembers });
}

export async function POST(request: NextRequest) {
  await delay(500);
  
  const body = await request.json();
  const newMember: TeamMember = {
    ...body,
    id: `tm-${Math.random().toString(36).substring(2, 9)}`,
    joinedAt: new Date().toISOString().split("T")[0],
  };
  
  teamMembers.push(newMember);
  
  return NextResponse.json({ success: true, data: newMember }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  await delay(400);
  
  const body = await request.json();
  const { id, ...updates } = body;
  
  const index = teamMembers.findIndex((m) => m.id === id);
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: "Team member not found" },
      { status: 404 }
    );
  }
  
  teamMembers[index] = { ...teamMembers[index], ...updates };
  
  return NextResponse.json({ success: true, data: teamMembers[index] });
}

export async function DELETE(request: NextRequest) {
  await delay(400);
  
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  
  if (!id) {
    return NextResponse.json(
      { success: false, error: "Team member ID required" },
      { status: 400 }
    );
  }
  
  const index = teamMembers.findIndex((m) => m.id === id);
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: "Team member not found" },
      { status: 404 }
    );
  }
  
  teamMembers = teamMembers.filter((m) => m.id !== id);
  
  return NextResponse.json({ success: true, message: "Team member removed" });
}
