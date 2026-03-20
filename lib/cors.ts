import { NextResponse } from "next/server";

type CorsConfig = {
  methods: string;
  allowStripeSignature?: boolean;
};

export function createCorsHeaders(config: CorsConfig) {
  const allowHeaders = ["Content-Type", "Authorization"];

  if (config.allowStripeSignature) {
    allowHeaders.push("stripe-signature");
  }

  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": config.methods,
    "Access-Control-Allow-Headers": allowHeaders.join(", ")
  };
}

export function corsPreflightResponse(headers: Record<string, string>) {
  return new NextResponse(null, {
    status: 204,
    headers
  });
}
