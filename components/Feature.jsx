import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/mockData";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Feature = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      <section className="py-16 sm:py-24 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-foreground">
              Featured Products
            </h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => console.log("Quick view:", p)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feature;
