import { NextResponse } from "next/server";
import { listOrders } from "@/lib/order-store";
import { corsPreflightResponse, createCorsHeaders } from "@/lib/cors";

export const runtime = "nodejs";

const corsHeaders = createCorsHeaders({ methods: "GET, OPTIONS" });

export async function OPTIONS() {
  return corsPreflightResponse(corsHeaders);
}

export async function GET() {
  const orders = await listOrders();
  return NextResponse.json({ orders }, { headers: corsHeaders });
}
