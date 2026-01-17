import { NextRequest, NextResponse } from "next/server";
import { mockProjects, Project } from "@/lib/mock-data";

// In-memory storage (simulating database)
let projects: Project[] = [...mockProjects];

// Simulate delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  await delay(300);
  return NextResponse.json({ success: true, data: projects });
}

export async function POST(request: NextRequest) {
  await delay(500);
  
  const body = await request.json();
  const newProject: Project = {
    ...body,
    id: `proj-${Math.random().toString(36).substring(2, 9)}`,
    createdAt: new Date().toISOString().split("T")[0],
  };
  
  projects.push(newProject);
  
  return NextResponse.json({ success: true, data: newProject }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  await delay(400);
  
  const body = await request.json();
  const { id, ...updates } = body;
  
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: "Project not found" },
      { status: 404 }
    );
  }
  
  projects[index] = { ...projects[index], ...updates };
  
  return NextResponse.json({ success: true, data: projects[index] });
}

export async function DELETE(request: NextRequest) {
  await delay(400);
  
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  
  if (!id) {
    return NextResponse.json(
      { success: false, error: "Project ID required" },
      { status: 400 }
    );
  }
  
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: "Project not found" },
      { status: 404 }
    );
  }
  
  projects = projects.filter((p) => p.id !== id);
  
  return NextResponse.json({ success: true, message: "Project deleted" });
}
