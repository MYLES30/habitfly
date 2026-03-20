"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/cart-context";
import { products } from "@/data/products";

type PaymentMethod = "card" | "paypal";

type CardFormData = {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  email: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

function PaymentLandingPageContent() {
  const params = useSearchParams();
  const methodParam = params.get("method");
  const paymentMethod: PaymentMethod = methodParam === "paypal" ? "paypal" : "card";
  const isCardMethod = paymentMethod === "card";

  const { items } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardForm, setCardForm] = useState<CardFormData>({
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    email: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
  });

  const cartRows = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          if (!product) {
            return null;
          }

          return {
            productId: item.productId,
            name: product.name,
            quantity: item.quantity,
            total: product.price * item.quantity
          };
        })
        .filter((row): row is NonNullable<typeof row> => row !== null),
    [items]
  );

  const checkoutSubtotal = useMemo(() => cartRows.reduce((sum, row) => sum + row.total, 0), [cartRows]);
  // Province tax rates
  const provinceTaxRates: Record<string, { label: string; rate: number }> = {
    "ON": { label: "HST (13%)", rate: 0.13 },
    "BC": { label: "GST (5%) + PST (7%)", rate: 0.12 },
    "AB": { label: "GST (5%)", rate: 0.05 },
    "MB": { label: "GST (5%) + PST (7%)", rate: 0.12 },
    "NB": { label: "HST (15%)", rate: 0.15 },
    "NL": { label: "HST (15%)", rate: 0.15 },
    "NS": { label: "HST (15%)", rate: 0.15 },
    "PE": { label: "HST (15%)", rate: 0.15 },
    "QC": { label: "GST (5%) + QST (9.975%)", rate: 0.14975 },
    "SK": { label: "GST (5%) + PST (6%)", rate: 0.11 },
    "NT": { label: "GST (5%)", rate: 0.05 },
    "NU": { label: "GST (5%)", rate: 0.05 },
    "YT": { label: "GST (5%)", rate: 0.05 }
  };

  // Helper to normalize province input
  function getProvinceCode(input: string) {
    const normalized = input.trim().toUpperCase();
    // Accept full names or abbreviations
    const map: Record<string, string> = {
      "ONTARIO": "ON",
      "QUEBEC": "QC",
      "BRITISH COLUMBIA": "BC",
      "ALBERTA": "AB",
      "MANITOBA": "MB",
      "NEW BRUNSWICK": "NB",
      "NEWFOUNDLAND": "NL",
      "NEWFOUNDLAND AND LABRADOR": "NL",
      "NOVA SCOTIA": "NS",
      "PRINCE EDWARD ISLAND": "PE",
      "SASKATCHEWAN": "SK",
      "NORTHWEST TERRITORIES": "NT",
      "NUNAVUT": "NU",
      "YUKON": "YT"
    };
    if (provinceTaxRates[normalized]) return normalized;
    if (map[normalized]) return map[normalized];
    return "ON"; // Default to Ontario
  }

  const provinceCode = useMemo(() => getProvinceCode(cardForm.state), [cardForm.state]);
  const taxInfo = provinceTaxRates[provinceCode] || provinceTaxRates["ON"];
  const taxAmount = useMemo(() => checkoutSubtotal * taxInfo.rate, [checkoutSubtotal, taxInfo]);
  const checkoutTotal = useMemo(() => checkoutSubtotal + taxAmount, [checkoutSubtotal, taxAmount]);
  const formattedSubtotal = useMemo(() => `$${checkoutSubtotal.toFixed(2)}`, [checkoutSubtotal]);
  const formattedTax = useMemo(() => `$${taxAmount.toFixed(2)}`, [taxAmount]);
  const formattedTotal = useMemo(() => `$${checkoutTotal.toFixed(2)}`, [checkoutTotal]);

  const isCardFormComplete = useMemo(() => {
    if (!isCardMethod) {
      return true;
    }

    return [
      cardForm.cardholderName,
      cardForm.cardNumber,
      cardForm.expiry,
      cardForm.cvc,
      cardForm.email,
      cardForm.line1,
      cardForm.city,
      cardForm.state,
      cardForm.postalCode,
      cardForm.country
    ].every((value) => value.trim().length > 0);
  }, [cardForm, isCardMethod]);

  function setCardField(field: keyof CardFormData, value: string) {
    if (field === "cardNumber") {
      const normalized = value.replace(/\D/g, "").slice(0, 16);
      const grouped = normalized.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
      setCardForm((prev) => ({ ...prev, cardNumber: grouped }));
      return;
    }

    if (field === "expiry") {
      const normalized = value.replace(/\D/g, "").slice(0, 4);
      const formatted = normalized.length > 2 ? `${normalized.slice(0, 2)}/${normalized.slice(2)}` : normalized;
      setCardForm((prev) => ({ ...prev, expiry: formatted }));
      return;
    }

    if (field === "cvc") {
      const normalized = value.replace(/\D/g, "").slice(0, 4);
      setCardForm((prev) => ({ ...prev, cvc: normalized }));
      return;
    }

    setCardForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleProceed() {
    if (cartRows.length === 0) {
      setError("Your cart is empty. Add items before checkout.");
      return;
    }

    if (isCardMethod && !isCardFormComplete) {
      setError("Please complete all required card and billing fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          paymentMethod,
          customerDetails: isCardMethod
            ? {
                name: cardForm.cardholderName.trim(),
                email: cardForm.email.trim(),
                billingAddress: {
                  line1: cardForm.line1.trim(),
                  line2: cardForm.line2.trim(),
                  city: cardForm.city.trim(),
                  state: cardForm.state.trim(),
                  postalCode: cardForm.postalCode.trim(),
                  country: cardForm.country.trim()
                }
              }
            : undefined,
          items: cartRows.map((row) => ({
            productId: row.productId,
            quantity: row.quantity
          }))
        })
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Unable to start checkout");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Checkout failed");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Payment Landing</p>
        <h1 className="text-3xl font-bold text-slate-900">
          {paymentMethod === "paypal" ? "Pay with PayPal" : "Pay with Credit Card"}
        </h1>
        <p className="text-sm text-slate-600">
          Review your selected method and continue to secure checkout to complete your purchase.
        </p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-slate-700">Subtotal</span>
          <span className="text-xl font-bold text-slate-900">{formattedSubtotal}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-slate-700">{taxInfo.label}</span>
          <span className="text-xl font-bold text-slate-900">{formattedTax}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-2xl font-black text-slate-900">Total</span>
          <span className="text-3xl font-extrabold text-blue-700">{formattedTotal}</span>
        </div>
        <p className="text-xs text-slate-500 mt-2">Tax calculated based on your province selection ({taxInfo.label}).</p>
      </div>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-medium text-slate-700">Selected method</p>
        <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900">
          {paymentMethod === "paypal" ? (
            <>
              <Image src="/images/paypal-mark.svg" alt="PayPal" width={18} height={12} className="h-3 w-auto" />
              PayPal
            </>
          ) : (
            <>Credit Card</>
          )}
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <Link
            href="/checkout/payment?method=card"
            className={`rounded-md border px-3 py-2 text-sm font-medium ${
              paymentMethod === "card"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            Credit Card
          </Link>
          <Link
            href="/checkout/payment?method=paypal"
            className={`rounded-md border px-3 py-2 text-sm font-medium ${
              paymentMethod === "paypal"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <Image src="/images/paypal-mark.svg" alt="PayPal" width={18} height={12} className="h-3 w-auto" />
              PayPal
            </span>
          </Link>
        </div>
      </section>

      {isCardMethod ? (
        <section className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Card and Billing Details</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Cardholder name"
              value={cardForm.cardholderName}
              onChange={(event) => setCardField("cardholderName", event.target.value)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-700"
            />
            <input
              type="email"
              placeholder="Email"
              value={cardForm.email}
              onChange={(event) => setCardField("email", event.target.value)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-700"
            />
            <input
              type="text"
              placeholder="Card number"
              value={cardForm.cardNumber}
              onChange={(event) => setCardField("cardNumber", event.target.value)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-700"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                value={cardForm.expiry}
                onChange={(event) => setCardField("expiry", event.target.value)}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-700"
              />
              <input
                type="text"
                placeholder="CVC"
                value={cardForm.cvc}
                onChange={(event) => setCardField("cvc", event.target.value)}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-700"
              />
            </div>
            <input
              type="text"
              placeholder="Address line 1"
              value={cardForm.line1}
              onChange={(event) => setCardField("line1", event.target.value)}
              className="sm:col-span-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-700"
            />
            <input
              type="text"
              placeholder="Address line 2 (optional)"
              value={cardForm.line2}
              onChange={(event) => setCardField("line2", event.target.value)}
              className="sm:col-span-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-700"
            />
            <input
              type="text"
              placeholder="City"
              value={cardForm.city}
              onChange={(event) => setCardField("city", event.target.value)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-700"
            />
            <input
              type="text"
              placeholder="State / Province"
              value={cardForm.state}
              onChange={(event) => setCardField("state", event.target.value)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-700"
            />
            <input
              type="text"
              placeholder="Postal code"
              value={cardForm.postalCode}
              onChange={(event) => setCardField("postalCode", event.target.value)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-700"
            />
            <input
              type="text"
              placeholder="Country"
              value={cardForm.country}
              onChange={(event) => setCardField("country", event.target.value)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-700"
            />
          </div>
          <p className="text-xs text-slate-500">Card is completed securely in the next step.</p>
        </section>
      ) : null}

      <section className="space-y-2 rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">Items</p>
          <p className="text-sm font-semibold text-slate-900">{cartRows.length}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">Order total</p>
          <p className="text-xl font-black text-slate-900">${checkoutTotal}</p>
        </div>
      </section>

      {error ? <p className="rounded-md border border-rose-200 bg-rose-50 p-2 text-sm text-rose-700">{error}</p> : null}

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          onClick={handleProceed}
          disabled={isSubmitting || cartRows.length === 0 || (isCardMethod && !isCardFormComplete)}
          className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Redirecting..." : paymentMethod === "paypal" ? "Continue to PayPal" : "Continue to Card Checkout"}
        </button>
        <Link href="/checkout" className="rounded-md border border-slate-300 px-5 py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-100">
          Back to checkout
        </Link>
      </div>
    </div>
  );
}

export default function PaymentLandingPage() {
  return (
    <Suspense>
      <PaymentLandingPageContent />
    </Suspense>
  );
}
