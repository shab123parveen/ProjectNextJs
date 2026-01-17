import { NextRequest, NextResponse } from "next/server";
import { mockTasks, Task } from "@/lib/mock-data";

// In-memory storage
let tasks: Task[] = [...mockTasks];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  await delay(300);
  
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  
  let filteredTasks = tasks;
  if (projectId) {
    filteredTasks = tasks.filter((t) => t.projectId === projectId);
  }
  
  return NextResponse.json({ success: true, data: filteredTasks });
}

export async function POST(request: NextRequest) {
  await delay(500);
  
  const body = await request.json();
  const newTask: Task = {
    ...body,
    id: `task-${Math.random().toString(36).substring(2, 9)}`,
    createdAt: new Date().toISOString().split("T")[0],
  };
  
  tasks.push(newTask);
  
  return NextResponse.json({ success: true, data: newTask }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  await delay(400);
  
  const body = await request.json();
  const { id, ...updates } = body;
  
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: "Task not found" },
      { status: 404 }
    );
  }
  
  tasks[index] = { ...tasks[index], ...updates };
  
  return NextResponse.json({ success: true, data: tasks[index] });
}

export async function DELETE(request: NextRequest) {
  await delay(400);
  
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  
  if (!id) {
    return NextResponse.json(
      { success: false, error: "Task ID required" },
      { status: 400 }
    );
  }
  
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: "Task not found" },
      { status: 404 }
    );
  }
  
  tasks = tasks.filter((t) => t.id !== id);
  
  return NextResponse.json({ success: true, message: "Task deleted" });
}
