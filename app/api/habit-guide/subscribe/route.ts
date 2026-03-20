import { NextRequest, NextResponse } from "next/server";
import { addHabitGuideSubscriber } from "@/lib/habit-guide-store";
import { corsPreflightResponse, createCorsHeaders } from "@/lib/cors";

export const runtime = "nodejs";

const corsHeaders = createCorsHeaders({ methods: "POST, OPTIONS" });

type SubscribeRequestBody = {
  email?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function OPTIONS() {
  return corsPreflightResponse(corsHeaders);
}

export async function POST(request: NextRequest) {
  let body: SubscribeRequestBody;

  try {
    body = (await request.json()) as SubscribeRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400, headers: corsHeaders });
  }

  const email = body.email?.trim();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400, headers: corsHeaders });
  }

  const result = await addHabitGuideSubscriber(email);

  return NextResponse.json(
    {
      success: true,
      alreadySubscribed: result.alreadyExists,
      message: result.alreadyExists
        ? "You are already subscribed. We will keep sending habit tips to your inbox."
        : "Thanks! Your free habit guide is on its way."
    },
    { headers: corsHeaders }
  );
}
