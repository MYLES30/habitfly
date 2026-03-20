import { products } from "@/data/products";
import { ProductCard } from "@/components/product-card";

export default function ProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Product</h1>
      <p className="text-slate-600">Choose a Digital Habit Tracker package that fits your workflow.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
