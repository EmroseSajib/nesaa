"use client";

import { useLanguage } from "@/app/LanguageContext";
import { CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { t } = useLanguage();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "USA",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const steps = [
    { number: 1, label: t.checkout.step1 },
    { number: 2, label: t.checkout.step2 },
    { number: 3, label: t.checkout.step3 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-2xl border border-[#e3d7c8] bg-white/80 text-[#3b2e24] placeholder:text-[#8a786a] outline-none transition focus:border-[#b99063] focus:ring-4 focus:ring-amber-200/40";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#e9e2d8] pt-10">
      {/* Premium glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 left-1/5 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.22em] text-[#8a6a4a] mb-3">
            Secure Checkout
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#3b2e24] mb-3">
            {t.checkout.title}
          </h1>
          <p className="text-[#6e5a4b] text-base sm:text-lg leading-8">
            Complete your order with a smooth and secure checkout experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-10 rounded-[30px] border border-white/40 bg-white/60 backdrop-blur-xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(59,46,36,0.08)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center flex-1">
                    <button
                      onClick={() =>
                        currentStep >= step.number &&
                        setCurrentStep(step.number)
                      }
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-semibold transition-all ${
                        currentStep === step.number
                          ? "bg-[#3b2e24] text-white"
                          : currentStep > step.number
                            ? "bg-amber-500/15 text-[#8a6a4a]"
                            : "bg-[#f3ece3] text-[#8a786a]"
                      }`}
                    >
                      {currentStep > step.number ? "✓" : step.number}
                    </button>

                    <div className="ml-4 min-w-0">
                      <p
                        className={`text-sm font-medium ${
                          currentStep >= step.number
                            ? "text-[#3b2e24]"
                            : "text-[#8a786a]"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>

                    {index < steps.length - 1 && (
                      <ChevronRight className="hidden sm:block w-5 h-5 text-[#cbb9a5] ml-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="rounded-[32px] border border-white/40 bg-white/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(59,46,36,0.08)]">
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#3b2e24] mb-6">
                  {t.checkout.shipping}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>

                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputClass}
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={inputClass}
                  />

                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={formData.street}
                    onChange={handleInputChange}
                    className={inputClass}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP Code"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className={inputClass}
                    />
                  </div>

                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={inputClass}
                  >
                    <option>USA</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="rounded-[32px] border border-white/40 bg-white/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(59,46,36,0.08)]">
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#3b2e24] mb-6">
                  {t.checkout.payment}
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={`${inputClass} font-mono`}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className={inputClass}
                    />
                    <input
                      type="text"
                      name="cardCVC"
                      placeholder="CVC"
                      value={formData.cardCVC}
                      onChange={handleInputChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-[#f5eee5] border border-[#eadfce] p-4 text-sm text-[#6e5a4b] leading-7">
                  Your payment information is secure and encrypted.
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="rounded-[32px] border border-white/40 bg-white/60 backdrop-blur-xl p-8 sm:p-10 text-center shadow-[0_10px_30px_rgba(59,46,36,0.08)]">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>

                <h2 className="text-3xl font-semibold text-[#3b2e24] mb-3">
                  {t.checkout.orderConfirmed}
                </h2>

                <p className="text-[#6e5a4b] mb-3">
                  {t.checkout.orderNumber}:{" "}
                  <span className="font-mono text-[#3b2e24]">ORDER-12345</span>
                </p>

                <p className="text-[#6e5a4b] leading-8 mb-8 max-w-xl mx-auto">
                  Thank you for your order. We’ll send a confirmation email
                  shortly with all the details of your purchase.
                </p>

                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-full bg-[#3b2e24] px-7 py-3.5 text-white font-medium hover:bg-[#2d221a] transition"
                >
                  Continue Shopping
                </Link>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="rounded-full border border-[#d8c7b5] bg-white/70 px-6 py-3 font-medium text-[#3b2e24] transition hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <button
                onClick={handleNextStep}
                disabled={currentStep === 3}
                className="ml-auto rounded-full bg-[#3b2e24] px-7 py-3 text-white font-medium transition hover:bg-[#2d221a] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === 2 ? t.checkout.placeOrder : "Next"}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-24 rounded-[32px] border border-white/40 bg-white/65 backdrop-blur-xl p-6 sm:p-7 shadow-[0_10px_30px_rgba(59,46,36,0.08)]">
              <h2 className="text-2xl font-semibold text-[#3b2e24] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-[#eadfce]">
                <div className="flex justify-between">
                  <span className="text-[#6e5a4b]">2 Items</span>
                  <span className="font-medium text-[#3b2e24]">$535.00</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#6e5a4b]">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#6e5a4b]">Tax</span>
                  <span className="font-medium text-[#3b2e24]">$42.80</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-[#3b2e24]">
                  Total
                </span>
                <span className="text-3xl font-semibold text-[#8a6a4a]">
                  $577.80
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-[#6e5a4b]">Single Leather Tote</span>
                  <span className="font-medium text-[#3b2e24]">$285</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#6e5a4b]">Minimalist Wallet (x2)</span>
                  <span className="font-medium text-[#3b2e24]">$250</span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-[#f5eee5] border border-[#eadfce] p-4 text-sm text-[#6e5a4b] leading-7">
                Free shipping is applied to this order.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
