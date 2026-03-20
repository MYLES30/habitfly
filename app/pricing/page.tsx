"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/components/cart-context";

export default function PricingPage() {
  const router = useRouter();
  const { addToCart } = useCart();

  const periodLabelMap: Record<(typeof products)[number]["billingPeriod"], string> = {
    monthly: "month",
    "semi-annual": "6 months",
    annual: "year"
  };

  const imageByPlan: Record<string, string> = {
    "dht-pro": "/images/category-focus.jpg",
    "dht-pro-semi": "/images/category-ai.jpg",
    "dht-pro-annual": "/images/hero-real.jpg",
    "dht-team-monthly": "/images/category-sync.jpg",
    "dht-team-semi": "/images/team-semi-real.jpg",
    "dht-team-annual": "/images/team-annual-real.jpg"
  };

  function handleChoosePlan(productId: string) {
    addToCart(productId, 1);
    router.push("/checkout");
  }

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Image
          src="/images/hero-real.jpg"
          alt="People planning habits"
          width={1800}
          height={900}
          className="h-52 w-full object-cover md:h-64"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/50 to-slate-900/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white md:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">Pricing Plans</p>
          <h1 className="mt-1 text-3xl font-black md:text-4xl">Choose a plan that matches your habit goals</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-100 md:text-base">
            Flexible monthly, semi-annual, and annual options for individuals and teams.
          </p>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        {products.map((product) => {
          const planImage = imageByPlan[product.id] ?? "/images/category-focus.jpg";
          const periodLabel = periodLabelMap[product.billingPeriod];

          return (
            <article key={product.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <Image src={planImage} alt={`${product.name} visual`} width={800} height={420} className="h-36 w-full object-cover" />
              <div className="space-y-4 p-5">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900">{product.name}</h2>
                  <p className="text-slate-600">{product.description}</p>
                </div>

                <div className="flex items-end justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-3xl font-black text-slate-900">
                    ${product.price}
                    <span className="ml-1 text-sm font-medium text-slate-500">/ {periodLabel}</span>
                  </p>
                  <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    {product.billingPeriod}
                  </span>
                </div>

                <ul className="space-y-1.5 text-sm text-slate-700">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-700" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handleChoosePlan(product.id)}
                  className="inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Choose plan
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
