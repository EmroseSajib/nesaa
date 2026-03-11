"use client";

import { useLanguage } from "@/app/LanguageContext";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/mockData";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

function ShopContent() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = products;

    if (selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === selectedCategory,
      );
    }

    filteredProducts = filteredProducts.filter(
      (p) => p.single.price >= priceRange[0] && p.single.price <= priceRange[1],
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.single.price - b.single.price;
        case "price-high":
          return b.single.price - a.single.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return sortedProducts;
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <div className="relative min-h-screen bg-[#e9e2d8] overflow-hidden">
      {/* Premium Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 left-1/5 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />

      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <div className="sticky top-24 rounded-[28px] border border-white/40 bg-white/60 backdrop-blur-xl p-6 shadow-[0_10px_30px_rgba(59,46,36,0.08)]">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="w-4 h-4 text-[#8a6a4a]" />
                  <h2 className="text-lg font-semibold text-[#3b2e24]">
                    Filters
                  </h2>
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h3 className="font-medium text-[#3b2e24] mb-4">
                    {t.shop.allCategories}
                  </h3>

                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`block w-full text-left px-4 py-3 rounded-2xl transition-all ${
                        selectedCategory === "all"
                          ? "bg-[#3b2e24] text-white shadow-md"
                          : "bg-white/70 text-[#6e5a4b] hover:bg-white"
                      }`}
                    >
                      All Products
                    </button>

                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`block w-full text-left px-4 py-3 rounded-2xl transition-all ${
                          selectedCategory === cat.slug
                            ? "bg-[#3b2e24] text-white shadow-md"
                            : "bg-white/70 text-[#6e5a4b] hover:bg-white"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="pt-6 border-t border-[#e7dbcd] mb-8">
                  <h3 className="font-medium text-[#3b2e24] mb-4">
                    Price Range
                  </h3>

                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([0, parseInt(e.target.value)])
                      }
                      className="w-full accent-[#8a6a4a]"
                    />

                    <div className="flex items-center justify-between text-sm text-[#6e5a4b]">
                      <span className="rounded-full bg-white/70 px-3 py-1">
                        ${priceRange[0]}
                      </span>
                      <span className="rounded-full bg-white/70 px-3 py-1">
                        ${priceRange[1]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sort */}
                <div className="pt-6 border-t border-[#e7dbcd]">
                  <h3 className="font-medium text-[#3b2e24] mb-4">
                    {t.shop.sort}
                  </h3>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-2xl border border-[#e5d8c8] bg-white/80 px-4 py-3 text-[#3b2e24] outline-none focus:ring-2 focus:ring-[#8a6a4a]/30"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">{t.shop.rating}</option>
                    <option value="newest">{t.shop.newest}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Area */}
            <div className="lg:col-span-3 lg:pt-12">
              {/* Products */}
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAndSortedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="rounded-[26px] border border-white/30 bg-white/40 backdrop-blur-sm p-3 shadow-[0_8px_24px_rgba(59,46,36,0.05)]"
                    >
                      <ProductCard
                        product={product}
                        onQuickView={(p) => console.log("Quick view:", p)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[30px] border border-white/40 bg-white/60 backdrop-blur-xl py-24 px-6 text-center shadow-[0_8px_25px_rgba(59,46,36,0.06)]">
                  <p className="text-xl font-semibold text-[#3b2e24] mb-2">
                    No products found
                  </p>
                  <p className="text-[#6e5a4b]">
                    Try changing your category, price range, or sorting option.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#e9e2d8] text-[#3b2e24]">
          Loading...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
