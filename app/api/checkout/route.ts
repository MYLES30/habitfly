import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { getStripeClient } from "@/lib/stripe";
import { corsPreflightResponse, createCorsHeaders } from "@/lib/cors";

export const runtime = "nodejs";

const corsHeaders = createCorsHeaders({ methods: "POST, OPTIONS" });

type CheckoutRequestBody = {
  productId?: string;
  quantity?: number;
  paymentMethod?: "card" | "paypal";
  customerDetails?: {
    name?: string;
    email?: string;
    billingAddress?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      country?: string;
    };
  };
  items?: Array<{
    productId: string;
    quantity?: number;
  }>;
};

function getAppUrl(request: Request) {
  return process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
}

export async function OPTIONS() {
  return corsPreflightResponse(corsHeaders);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequestBody;
    const paymentMethod = body.paymentMethod ?? "card";
    const lineItemInputs =
      body.items && body.items.length > 0
        ? body.items
        : body.productId
          ? [{ productId: body.productId, quantity: body.quantity ?? 1 }]
          : [];

    if (lineItemInputs.length === 0) {
      return NextResponse.json({ error: "Missing checkout items" }, { status: 400, headers: corsHeaders });
    }

    const lineItems = lineItemInputs
      .map((entry) => {
        const product = products.find((item) => item.id === entry.productId);
        if (!product) {
          return null;
        }

        const quantity = Math.max(1, Math.min(100, entry.quantity ?? 1));
        return {
          quantity,
          price_data: {
            currency: "usd",
            unit_amount: product.price * 100,
            product_data: {
              name: product.name,
              description: product.description
            }
          }
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

    if (lineItems.length === 0) {
      return NextResponse.json({ error: "Invalid checkout items" }, { status: 400, headers: corsHeaders });
    }

    const appUrl = getAppUrl(request);
    const customerName = body.customerDetails?.name?.trim();
    const customerEmail = body.customerDetails?.email?.trim();
    const billingAddress = body.customerDetails?.billingAddress;

    if (paymentMethod === "paypal") {
      const paypalBusinessEmail = process.env.PAYPAL_BUSINESS_EMAIL;
      const paypalBaseUrl = process.env.PAYPAL_BASE_URL ?? "https://www.paypal.com";

      if (!paypalBusinessEmail) {
        return NextResponse.json(
          { error: "Missing PAYPAL_BUSINESS_EMAIL environment variable" },
          { status: 500, headers: corsHeaders }
        );
      }

      const total = lineItems.reduce(
        (sum, entry) => sum + ((entry.price_data.unit_amount ?? 0) / 100) * entry.quantity,
        0
      );

      const paypalUrl = new URL("/cgi-bin/webscr", paypalBaseUrl);
      paypalUrl.searchParams.set("cmd", "_xclick");
      paypalUrl.searchParams.set("business", paypalBusinessEmail);
      paypalUrl.searchParams.set("item_name", "Digital Habit Tracker Order");
      paypalUrl.searchParams.set("currency_code", "USD");
      paypalUrl.searchParams.set("amount", total.toFixed(2));
      paypalUrl.searchParams.set("return", `${appUrl}/checkout/success`);
      paypalUrl.searchParams.set("cancel_return", `${appUrl}/checkout/cancel`);

      return NextResponse.json({ url: paypalUrl.toString() }, { headers: corsHeaders });
    }

    const stripe = getStripeClient();

    const metadata: Record<string, string> = {
      productId: lineItemInputs[0]?.productId ?? "multiple"
    };

    if (customerName) {
      metadata.customerName = customerName;
    }

    if (billingAddress?.line1) {
      metadata.billingLine1 = billingAddress.line1;
    }

    if (billingAddress?.city) {
      metadata.billingCity = billingAddress.city;
    }

    if (billingAddress?.state) {
      metadata.billingState = billingAddress.state;
    }

    if (billingAddress?.postalCode) {
      metadata.billingPostalCode = billingAddress.postalCode;
    }

    if (billingAddress?.country) {
      metadata.billingCountry = billingAddress.country;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: customerEmail || undefined,
      billing_address_collection: "required",
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
      metadata
    });

    if (!session.url) {
      return NextResponse.json({ error: "Unable to create checkout URL" }, { status: 500, headers: corsHeaders });
    }

    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout initialization failed";
    return NextResponse.json({ error: message }, { status: 500, headers: corsHeaders });
  }
}
