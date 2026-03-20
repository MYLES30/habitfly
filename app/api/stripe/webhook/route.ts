import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import { upsertOrderByStripeSession } from "@/lib/order-store";
import { corsPreflightResponse, createCorsHeaders } from "@/lib/cors";

export const runtime = "nodejs";

const corsHeaders = createCorsHeaders({ methods: "POST, OPTIONS", allowStripeSignature: true });

export async function OPTIONS() {
  return corsPreflightResponse(corsHeaders);
}

export async function POST(request: Request) {
  const signature = headers().get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing Stripe webhook configuration" }, { status: 400, headers: corsHeaders });
  }

  try {
    const payload = await request.text();
    const stripe = getStripeClient();
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const paymentIntentId =
        typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null;

      await upsertOrderByStripeSession({
        stripeSessionId: session.id,
        stripePaymentIntentId: paymentIntentId,
        amountTotal: session.amount_total,
        currency: session.currency,
        customerEmail: session.customer_details?.email ?? null,
        productId: session.metadata?.productId ?? null,
        status: session.payment_status
      });

      console.log("Stripe checkout completed", session.id);
    }

    return NextResponse.json({ received: true }, { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook verification failed";
    return NextResponse.json({ error: message }, { status: 400, headers: corsHeaders });
  }
}
