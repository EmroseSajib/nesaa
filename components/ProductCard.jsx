"use client";

import { useLanguage } from "@/app/LanguageContext";
import { Eye, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ProductCard({ product, onQuickView }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const { t } = useLanguage();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden bg-secondary sm:h-72">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23e5e5e5" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-size="24"%3EProduct%3C/text%3E%3C/svg%3E';
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80" />

          {/* Top Badges */}
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black shadow">
              Featured
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold shadow ${
                product.inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.inStock ? t.product.inStock : t.product.outOfStock}
            </span>
          </div>

          {/* Quick View */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView?.(product);
            }}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition hover:scale-110"
          >
            <Eye className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mb-4 flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-foreground">
                {product.rating}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.product.singlePrice}
            </p>
            <p className="mt-1 text-2xl font-extrabold text-primary">
              ${product.single.price}
            </p>
          </div>

          {/* Action */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`mt-auto flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
              product.inStock
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "cursor-not-allowed bg-muted text-muted-foreground"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            {addedToCart ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}
