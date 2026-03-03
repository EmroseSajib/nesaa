'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/app/LanguageContext'
import { ChevronRight, CheckCircle } from 'lucide-react'

export default function CheckoutPage() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  })

  const steps = [
    { number: 1, label: t.checkout.step1 },
    { number: 2, label: t.checkout.step2 },
    { number: 3, label: t.checkout.step3 },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">{t.checkout.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stepper */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center gap-4">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center flex-1">
                    <button
                      onClick={() => currentStep >= step.number && setCurrentStep(step.number)}
                      className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all ${
                        currentStep === step.number
                          ? 'bg-accent text-accent-foreground'
                          : currentStep > step.number
                          ? 'bg-accent/20 text-accent'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {currentStep > step.number ? '✓' : step.number}
                    </button>
                    <div className="flex-1 ml-4">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.number
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}>
                        {step.label}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <ChevronRight className="w-5 h-5 text-border ml-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">{t.checkout.shipping}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-border rounded-lg bg-background"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-border rounded-lg bg-background"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background mb-4"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background mb-4"
                />

                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background mb-4"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-border rounded-lg bg-background"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-border rounded-lg bg-background"
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="ZIP Code"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-border rounded-lg bg-background"
                  />
                </div>

                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background mb-6"
                >
                  <option>USA</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">{t.checkout.payment}</h2>
                
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background mb-4 font-mono"
                />

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-border rounded-lg bg-background"
                  />
                  <input
                    type="text"
                    name="cardCVC"
                    placeholder="CVC"
                    value={formData.cardCVC}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-border rounded-lg bg-background"
                  />
                </div>

                <p className="text-sm text-muted-foreground mt-4 p-4 bg-muted rounded-lg">
                  Your payment information is secure and encrypted.
                </p>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="bg-card rounded-2xl border border-border p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">{t.checkout.orderConfirmed}</h2>
                <p className="text-muted-foreground mb-6">
                  {t.checkout.orderNumber}: <span className="font-mono text-foreground">ORDER-12345</span>
                </p>
                <p className="text-muted-foreground mb-6">
                  Thank you for your order! We'll send a confirmation email shortly.
                </p>
                <Link
                  href="/shop"
                  className="inline-block px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
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
                className="px-6 py-3 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNextStep}
                disabled={currentStep === 3}
                className="ml-auto px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {currentStep === 2 ? t.checkout.placeOrder : 'Next'}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-2xl border border-border p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between">
                <span className="text-muted-foreground">2 Items</span>
                <span className="font-semibold">$535.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-semibold">$42.80</span>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <span className="text-lg font-semibold text-foreground">Total</span>
              <span className="text-2xl font-bold text-accent">$577.80</span>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Single Leather Tote</span>
                <span>$285</span>
              </div>
              <div className="flex justify-between">
                <span>Minimalist Wallet (x2)</span>
                <span>$250</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
