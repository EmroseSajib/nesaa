"use client";

import { useLanguage } from "@/app/LanguageContext";
import { products } from "@/lib/mockData";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { t } = useLanguage();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productId: 1,
      name: "Classic Leather Tote",
      price: 285,
      quantity: 1,
      pricing: "single",
      color: "Natural",
      image: products[0].images[0],
    },
    {
      id: 2,
      productId: 4,
      name: "Minimalist Leather Wallet",
      price: 125,
      quantity: 2,
      pricing: "single",
      color: "Black",
      image: products[3].images[0],
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      setCartItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#e9e2d8] pt-10">
      {/* Premium glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 left-1/5 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.22em] text-[#8a6a4a] mb-3">
            NESAA Cart
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#3b2e24] mb-3">
            {t.cart.title}
          </h1>
          <p className="text-[#6e5a4b] text-base sm:text-lg leading-8">
            Review your selected pieces before continuing to checkout.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-[32px] border border-white/40 bg-white/65 backdrop-blur-xl shadow-[0_10px_30px_rgba(59,46,36,0.08)] px-6 py-20 text-center">
            <p className="text-xl text-[#6e5a4b] mb-6">{t.cart.empty}</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#3b2e24] px-7 py-3.5 text-white font-medium hover:bg-[#2d221a] transition"
            >
              {t.cart.continueShopping}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="rounded-[32px] border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_10px_30px_rgba(59,46,36,0.08)] overflow-hidden">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-5 sm:p-6 ${
                      index !== cartItems.length - 1
                        ? "border-b border-[#eadfce]"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* Image */}
                      <div className="shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full sm:w-32 h-32 object-cover rounded-[22px] bg-white border border-white/30"
                          onError={(e) => {
                            e.target.src =
                              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23e5e5e5" width="100" height="100"/%3E%3C/svg%3E';
                          }}
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-[#3b2e24] mb-2">
                              {item.name}
                            </h3>

                            <div className="space-y-2 text-sm text-[#6e5a4b]">
                              <p>Color: {item.color}</p>
                              <span className="inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-[#8a6a4a]">
                                {item.pricing === "single"
                                  ? "Single Purchase"
                                  : "Wholesale"}
                              </span>
                            </div>
                          </div>

                          <div className="text-left sm:text-right">
                            <p className="text-lg font-semibold text-[#3b2e24]">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-[#8a6a4a]">
                              ${item.price} each
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-[#6e5a4b]">
                              Quantity
                            </span>

                            <div className="flex items-center rounded-full border border-[#e5d8c8] bg-white/80 p-1">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full text-[#3b2e24] hover:bg-[#f4ede5] transition"
                              >
                                <Minus className="w-4 h-4" />
                              </button>

                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(
                                    item.id,
                                    Math.max(1, parseInt(e.target.value) || 1),
                                  )
                                }
                                className="w-12 bg-transparent text-center text-sm font-medium text-[#3b2e24] outline-none"
                              />

                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full text-[#3b2e24] hover:bg-[#f4ede5] transition"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="inline-flex items-center gap-2 text-sm font-medium text-[#8f5d4a] hover:text-[#6f4333] transition"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/shop"
                className="mt-6 inline-flex items-center gap-2 text-[#3b2e24] font-medium hover:gap-3 transition-all"
              >
                ← {t.cart.continueShopping}
              </Link>
            </div>

            {/* Order Summary */}
            <div>
              <div className="sticky top-24 rounded-[32px] border border-white/40 bg-white/65 backdrop-blur-xl shadow-[0_10px_30px_rgba(59,46,36,0.08)] p-6 sm:p-7">
                <h2 className="text-2xl font-semibold text-[#3b2e24] mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 pb-6 mb-6 border-b border-[#eadfce]">
                  <div className="flex justify-between text-[#6e5a4b]">
                    <span>{t.cart.subtotal}</span>
                    <span className="font-medium text-[#3b2e24]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#6e5a4b]">
                    <span>{t.cart.shipping}</span>
                    <span
                      className={`font-medium ${
                        shipping === 0 ? "text-green-600" : "text-[#3b2e24]"
                      }`}
                    >
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#6e5a4b]">
                    <span>{t.cart.tax}</span>
                    <span className="font-medium text-[#3b2e24]">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-semibold text-[#3b2e24]">
                    {t.cart.total}
                  </span>
                  <span className="text-3xl font-semibold text-[#8a6a4a]">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full rounded-full bg-[#3b2e24] py-3.5 text-center font-medium text-white hover:bg-[#2d221a] transition mb-4"
                >
                  {t.cart.checkout}
                </Link>

                <p className="text-center text-sm text-[#6e5a4b] leading-6">
                  Free shipping on orders over $100
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
