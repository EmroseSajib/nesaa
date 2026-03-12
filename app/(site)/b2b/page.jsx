"use client";

import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  Package,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function B2BPage() {
  const bulkProducts = [
    {
      id: 1,
      name: "Handmade Jute Bag",
      image: "/category-bags.png",
      moq: "100 pcs",
      material: "Natural Jute",
      use: "Retail / Events / Gifts",
    },
    {
      id: 2,
      name: "Cotton Carry Bag",
      image: "/leatherTote.png",
      moq: "150 pcs",
      material: "Premium Cotton",
      use: "Brand Promotion / Daily Retail",
    },
    {
      id: 3,
      name: "Natural Storage Basket",
      image: "/category-accessories.png",
      moq: "80 pcs",
      material: "Woven Natural Fiber",
      use: "Home & Lifestyle Stores",
    },
    {
      id: 4,
      name: "Custom Gift Bag",
      image: "/crossbody.webp",
      moq: "120 pcs",
      material: "Mixed Natural Materials",
      use: "Corporate / Seasonal Orders",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#e9e2d8] overflow-hidden">
      {/* Premium Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 left-1/5 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />

      <div className="relative container mx-auto px-6 py-20">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-block rounded-full border border-white/40 bg-white/60 backdrop-blur-lg px-5 py-2 text-sm tracking-[0.18em] uppercase text-[#8a6a4a] mb-6">
            NESAA B2B
          </span>

          <h1 className="text-5xl lg:text-6xl font-semibold text-[#3b2e24] leading-tight mb-6">
            Bulk Orders
            <br />
            For Business Partners
          </h1>

          <p className="max-w-2xl mx-auto text-[#6e5a4b] text-lg leading-8">
            Discover NESAA bulk products for retail stores, events, corporate
            gifting, and large custom orders — crafted with natural materials
            and premium quality.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          <div className="rounded-[28px] border border-white/40 bg-white/65 backdrop-blur-xl p-6 shadow-[0_10px_30px_rgba(59,46,36,0.08)]">
            <Package className="w-8 h-8 text-[#8a6a4a] mb-4" />
            <h3 className="text-xl font-semibold text-[#3b2e24] mb-2">
              Bulk Supply
            </h3>
            <p className="text-[#6e5a4b] leading-7">
              Reliable production capacity for wholesale and large quantity
              orders.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/40 bg-white/65 backdrop-blur-xl p-6 shadow-[0_10px_30px_rgba(59,46,36,0.08)]">
            <BadgeDollarSign className="w-8 h-8 text-[#8a6a4a] mb-4" />
            <h3 className="text-xl font-semibold text-[#3b2e24] mb-2">
              Better Pricing
            </h3>
            <p className="text-[#6e5a4b] leading-7">
              Competitive wholesale pricing designed for growing businesses and
              retailers.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/40 bg-white/65 backdrop-blur-xl p-6 shadow-[0_10px_30px_rgba(59,46,36,0.08)]">
            <Truck className="w-8 h-8 text-[#8a6a4a] mb-4" />
            <h3 className="text-xl font-semibold text-[#3b2e24] mb-2">
              Flexible Delivery
            </h3>
            <p className="text-[#6e5a4b] leading-7">
              Smooth order handling and delivery support for local and
              international partners.
            </p>
          </div>
        </div>

        {/* Bulk Products */}
        <div className="mb-16">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#8a6a4a] mb-2">
                Bulk Sell Products
              </p>
              <h2 className="text-3xl lg:text-4xl font-semibold text-[#3b2e24]">
                Available for Wholesale
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {bulkProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-[28px] border border-white/40 bg-white/65 backdrop-blur-xl overflow-hidden shadow-[0_10px_30px_rgba(59,46,36,0.08)]"
              >
                <div className="relative h-[280px] item-center flex justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={280}
                    height={180}
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#3b2e24] mb-4">
                    {product.name}
                  </h3>

                  <div className="space-y-3 text-sm text-[#6e5a4b]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8a6a4a]" />
                      <span>
                        <b className="text-[#3b2e24]">MOQ:</b> {product.moq}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8a6a4a]" />
                      <span>
                        <b className="text-[#3b2e24]">Material:</b>{" "}
                        {product.material}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8a6a4a]" />
                      <span>
                        <b className="text-[#3b2e24]">Use:</b> {product.use}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#3b2e24] px-5 py-3 text-white font-medium hover:bg-[#2d221a] transition"
                  >
                    Request Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-[32px] border border-white/40 bg-[#3b2e24] p-8 lg:p-12 text-center shadow-[0_10px_40px_rgba(59,46,36,0.12)]">
          <p className="text-sm uppercase tracking-[0.18em] text-[#d5b28b] mb-3">
            Business Inquiry
          </p>

          <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
            Looking for Custom Bulk Orders?
          </h2>

          <p className="max-w-2xl mx-auto text-white/80 text-lg leading-8 mb-8">
            We work with retailers, boutiques, event companies, and corporate
            buyers who need premium handcrafted products in larger quantities.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[#3b2e24] font-medium hover:bg-[#f5efe7] transition"
          >
            Contact for B2B Orders
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
