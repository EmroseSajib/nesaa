import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/mockData";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Feature = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden ">
      {/* Premium glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-1/5 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.22em] text-[#8a6a4a] mb-3">
              NESAA Collection
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#3b2e24] mb-4">
              Featured Products
            </h2>
            <p className="text-[#6e5a4b] text-base sm:text-lg leading-8">
              Discover our selected pieces, crafted with natural materials,
              refined details, and timeless elegance.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/70 px-6 py-3 text-[#3b2e24] font-medium shadow-sm backdrop-blur-md transition hover:bg-white hover:gap-3"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-[28px] border border-white/30 bg-white/45 p-3 backdrop-blur-sm shadow-[0_10px_30px_rgba(59,46,36,0.08)]"
            >
              <ProductCard
                product={product}
                onQuickView={(p) => console.log("Quick view:", p)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
