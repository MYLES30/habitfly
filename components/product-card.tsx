"use client";

import Image from "next/image";
import type { Product } from "@/data/products";
import { useCart } from "@/components/cart-context";
import { useRouter } from "next/navigation";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const periodLabel =
    product.billingPeriod === "monthly"
      ? "month"
      : product.billingPeriod === "semi-annual"
        ? "6 months"
        : "year";

  function handleBuyNow() {
    addToCart(product.id, 1);
    router.push("/checkout");
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <Image src={product.image} alt={`${product.name} preview`} width={800} height={420} className="h-36 w-full object-cover" />
      <div className="p-5">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="mt-2 text-sm text-slate-600">{product.description}</p>
      <p className="mt-4 text-2xl font-bold">
        ${product.price}
        <span className="ml-1 text-sm font-medium text-slate-500">/ {periodLabel}</span>
      </p>
      <ul className="mt-3 list-inside list-disc text-sm text-slate-700">
        {product.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <button
        onClick={() => addToCart(product.id, 1)}
        className="mt-5 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Add to cart
      </button>
      <button
        onClick={handleBuyNow}
        className="ml-2 mt-5 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
      >
        Buy now
      </button>
      </div>
    </div>
  );
}
