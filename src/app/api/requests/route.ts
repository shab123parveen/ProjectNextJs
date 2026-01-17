import { NextRequest, NextResponse } from "next/server";
import { mockClientRequests, ClientRequest } from "@/lib/mock-data";

// In-memory storage
let requests: ClientRequest[] = [...mockClientRequests];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET() {
  await delay(300);
  return NextResponse.json({ success: true, data: requests });
}

export async function PUT(request: NextRequest) {
  await delay(500);
  
  const body = await request.json();
  const { id, status } = body;
  
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: "Request not found" },
      { status: 404 }
    );
  }
  
  requests[index] = { ...requests[index], status };
  
  return NextResponse.json({ success: true, data: requests[index] });
}
