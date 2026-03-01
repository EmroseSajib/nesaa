"use client";

import { ProductCard } from "@/components/ProductCard";
import { categories, products, testimonials } from "@/lib/mockData";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "./LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#f8f5f0] via-[#f1ece5] to-[#e9e2d8] text-gray-900">
        {/* Soft Glow Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />

        <div className="relative container mx-auto px-6 grid lg:grid-cols-2 items-center gap-16">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            {/* Limited Offer Badge */}
            <span className="inline-block px-5 py-2 text-sm font-semibold bg-red-600 text-white rounded-full tracking-wide animate-pulse">
              🔥 Limited Black Friday Deal
            </span>

            {/* Heading */}
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Black Friday
              <br />
              <span className="text-gray-900">Super Sale</span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-700 text-lg max-w-xl">
              Premium wholesale & single piece bags at exclusive seasonal
              pricing. Stock is limited — shop now before it’s gone.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/shop"
                className="px-8 py-4 bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-lg font-semibold shadow-lg hover:shadow-red-600/40 hover:scale-105"
              >
                Order Now
              </a>

              <a
                href="/shop"
                className="px-8 py-4 border border-gray-300 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-lg font-semibold"
              >
                View Collection
              </a>
            </div>
          </div>

          {/* RIGHT SIDE BAG IMAGE */}
          <div className="relative flex justify-center items-center">
            {/* SALE CIRCLE BADGE */}
            <div className="absolute -top-6 -right-6 z-20">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute w-full h-full bg-red-600 rounded-full animate-ping opacity-30" />

                <div className="relative w-28 h-28 flex items-center justify-center bg-red-600 rounded-full shadow-2xl border-4 border-white/20">
                  <span className="text-white text-xl font-bold text-center">
                    50% <br /> OFF
                  </span>
                </div>
              </div>
            </div>

            {/* BAG IMAGE */}
            <img
              src="/hero.png"
              alt="Premium Bag"
              className="w-[700px] animate-bagRise drop-shadow-[0_40px_60px_rgba(255,165,0,0.25)]"
            />
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
            {t.shop.allCategories}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group relative rounded-2xl overflow-hidden h-64"
              >
                <div className="absolute inset-0 bg-secondary group-hover:bg-secondary/80 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 sm:py-24 bg-card">
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

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-8 rounded-2xl bg-card border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-accent rounded-full" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Wholesale Opportunities</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Looking to stock NESAA products? Inquire about our wholesale pricing
            and bulk orders.
          </p>
          <button
            onClick={() => setQuoteOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-foreground text-accent rounded-lg font-semibold hover:bg-accent-foreground/90 transition-all"
          >
            Request Quote
          </button>
        </div>
      </section>
    </div>
  );
}
