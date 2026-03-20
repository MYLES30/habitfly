"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/components/cart-context";
import { products } from "@/data/products";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { quantity, items, removedItems, addToCart, setItemQuantity, removeItem, restoreItem, clearRemovedItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");

  const isTrialFlow = searchParams.get("trial") === "7day";

  const trialProduct = useMemo(
    () => products.find((product) => product.billingPeriod === "monthly") ?? null,
    []
  );

  const hasTrialProductInCart = useMemo(
    () => (trialProduct ? items.some((item) => item.productId === trialProduct.id) : false),
    [items, trialProduct]
  );

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
            unitPrice: product.price,
            quantity: item.quantity,
            total: product.price * item.quantity
          };
        })
        .filter((row): row is NonNullable<typeof row> => row !== null),
    [items]
  );

  const removedRows = useMemo(
    () =>
      removedItems
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          if (!product) {
            return null;
          }

          return {
            productId: item.productId,
            name: product.name,
            quantity: item.quantity
          };
        })
        .filter((row): row is NonNullable<typeof row> => row !== null),
    [removedItems]
  );

  const checkoutSubtotal = useMemo(() => cartRows.reduce((sum, row) => sum + row.total, 0), [cartRows]);
  const hstRate = 0.13;
  const hstAmount = useMemo(() => checkoutSubtotal * hstRate, [checkoutSubtotal]);
  const checkoutTotal = useMemo(() => checkoutSubtotal + hstAmount, [checkoutSubtotal, hstAmount]);
  const formattedSubtotal = useMemo(() => `$${checkoutSubtotal.toFixed(2)}`, [checkoutSubtotal]);
  const formattedHST = useMemo(() => `$${hstAmount.toFixed(2)}`, [hstAmount]);
  const formattedTotal = useMemo(() => `$${checkoutTotal.toFixed(2)}`, [checkoutTotal]);
  const shouldShowRemovedOrders = removedRows.length > 0 && cartRows.length > 0;

  function handlePayNow() {
    if (cartRows.length === 0) {
      return;
    }

    router.push(`/checkout/payment?method=${paymentMethod}`);
  }

  function handleClearCart() {
    clearCart();
    setPaymentMethod("card");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Checkout</h1>
        <p className="text-lg text-slate-700 font-medium">Review your order, choose your payment method, and finish securely in one step.</p>
      </div>

      {isTrialFlow ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <p>
            You are starting a <span className="font-semibold">7-day free trial</span>. After the trial ends, you will be charged the
            selected <span className="font-semibold">monthly plan</span> unless canceled.
          </p>
          {trialProduct ? (
            <button
              type="button"
              onClick={() => addToCart(trialProduct.id, 1)}
              disabled={hasTrialProductInCart}
              className="mt-3 rounded-md border border-emerald-400 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {hasTrialProductInCart ? "Trial monthly product added" : `Add ${trialProduct.name} for trial`}
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-8 shadow-md">
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-6 py-4">
            <p className="text-xl font-semibold text-slate-800">Items in cart</p>
            <p className="text-2xl font-black text-slate-900">{quantity}</p>
          </div>

          <div className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold uppercase tracking-wide text-emerald-800">Current Orders</h2>
              <span className="rounded-full border border-emerald-300 bg-white px-3 py-1 text-sm font-bold text-emerald-800">
                {cartRows.length} active
              </span>
            </div>
            {cartRows.length === 0 ? (
              <p className="rounded-md border border-dashed border-emerald-300 bg-white p-3 text-sm text-emerald-700">No active orders in cart.</p>
            ) : (
              cartRows.map((row) => (
                <div key={row.productId} className="flex items-center justify-between rounded-lg border border-emerald-200 bg-white p-4">
                  <div>
                    <p className="text-xl font-bold text-slate-900">{row.name}</p>
                    <p className="text-base text-slate-700">
                      ${row.unitPrice} each • Total ${row.total}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-md border border-slate-300">
                      <button
                        type="button"
                        onClick={() => setItemQuantity(row.productId, Math.max(1, row.quantity - 1))}
                        className="px-2 py-1 text-base font-bold text-slate-700 hover:bg-slate-100"
                        aria-label={`Decrease quantity for ${row.name}`}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={row.quantity}
                        onChange={(event) => {
                          const nextValue = Number(event.target.value);
                          if (Number.isFinite(nextValue) && nextValue >= 1) {
                            setItemQuantity(row.productId, nextValue);
                          }
                        }}
                        className="w-14 border-x border-slate-300 px-2 py-1 text-center text-base outline-none"
                        aria-label={`Quantity for ${row.name}`}
                      />
                      <button
                        type="button"
                        onClick={() => setItemQuantity(row.productId, Math.min(100, row.quantity + 1))}
                        className="px-2 py-1 text-base font-bold text-slate-700 hover:bg-slate-100"
                        aria-label={`Increase quantity for ${row.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(row.productId)}
                      className="rounded-md border border-slate-300 px-4 py-2 text-base font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {shouldShowRemovedOrders ? (
            <div className="space-y-3 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-900">Removed Orders</h2>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={clearRemovedItems}
                    className="rounded-md border border-amber-300 bg-white px-3 py-1 text-xs font-semibold text-amber-900 hover:bg-amber-100"
                  >
                    Remove Item
                  </button>
                  <span className="rounded-full border border-amber-300 bg-white px-2.5 py-1 text-xs font-semibold text-amber-900">
                    {removedRows.length} removed
                  </span>
                </div>
              </div>
              {removedRows.map((row) => (
                <div key={row.productId} className="flex items-center justify-between rounded-lg border border-amber-200 bg-white p-4">
                  <div>
                    <p className="font-medium text-slate-900">{row.name}</p>
                    <p className="text-sm text-amber-900">Removed • Qty {row.quantity}</p>
                  </div>
                  <button
                    onClick={() => restoreItem(row.productId)}
                    className="rounded-md border border-amber-300 bg-white px-3 py-1.5 text-sm font-medium text-amber-900 hover:bg-amber-100"
                  >
                    Put back
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <div className="pt-1">
            <button
              onClick={handleClearCart}
              className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Clear cart
            </button>
          </div>
        </div>

        <aside className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-md">
          <div className="space-y-1">
            <p className="text-xl font-bold text-slate-800">Order Summary</p>
            <div className="flex items-center justify-between">
              <span className="text-lg text-slate-700">Subtotal</span>
              <span className="text-xl font-bold text-slate-900">{formattedSubtotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg text-slate-700">HST (13%)</span>
              <span className="text-xl font-bold text-slate-900">{formattedHST}</span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-2xl font-black text-slate-900">Total</span>
              <span className="text-4xl font-extrabold text-blue-700">{formattedTotal}</span>
            </div>
            <p className="text-sm text-slate-500 mt-2">Tax calculated based on your province selection (HST 13%).</p>
          </div>

          <div>
            <p className="text-lg font-bold text-slate-800">Choose payment method</p>
            <div className="mt-2 grid gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`rounded-lg border px-4 py-3 text-left text-lg font-bold ${
                  paymentMethod === "card" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("paypal")}
                className={`rounded-lg border px-4 py-3 text-left text-lg font-bold ${
                  paymentMethod === "paypal" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Image src="/images/paypal-mark.svg" alt="PayPal" width={18} height={12} className="h-3 w-auto" />
                  PayPal
                </span>
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={handlePayNow}
              disabled={cartRows.length === 0}
              className="w-full rounded-lg bg-blue-700 px-6 py-3 text-lg font-bold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400 transition"
            >
              Continue with {paymentMethod === "paypal" ? "PayPal" : "Credit Card"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
