import { NextRequest } from "next/server";
import { updatePhotoStatus } from "@/models/photo";

export async function POST(req: NextRequest) {
  const { uuid, status } = await req.json();
  if (!uuid || !["created", "online", "offline"].includes(status)) {
    return new Response(JSON.stringify({ error: "invalid params" }), { status: 400 });
  }
  await updatePhotoStatus(uuid, status);
  return new Response(JSON.stringify({ success: true }));
} 