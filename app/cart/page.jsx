'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/app/LanguageContext'
import { products } from '@/lib/mockData'
import { X, Minus, Plus, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { t } = useLanguage()
  
  // Mock cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productId: 1,
      name: 'Classic Leather Tote',
      price: 285,
      quantity: 1,
      pricing: 'single',
      color: 'Natural',
      image: products[0].images[0],
    },
    {
      id: 2,
      productId: 4,
      name: 'Minimalist Leather Wallet',
      price: 125,
      quantity: 2,
      pricing: 'single',
      color: 'Black',
      image: products[3].images[0],
    },
  ])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id)
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 15
  const tax = Math.round(subtotal * 0.08 * 100) / 100
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">{t.cart.title}</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-muted-foreground text-lg mb-6">{t.cart.empty}</div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              {t.cart.continueShopping}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-6 flex gap-6 items-start sm:items-center ${
                      index !== cartItems.length - 1 ? 'border-b border-border' : ''
                    }`}
                  >
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg bg-secondary"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23e5e5e5" width="100" height="100"/%3E%3C/svg%3E'
                      }}
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-2">{item.name}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground mb-3">
                        <p>Color: {item.color}</p>
                        <p className="inline-block px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium">
                          {item.pricing === 'single' ? 'Single Purchase' : 'Wholesale'}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-accent mb-3">${item.price}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))
                          }
                          className="w-12 text-center px-2 py-1 border border-border rounded bg-background text-sm"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground mb-2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
              >
                ← {t.cart.continueShopping}
              </Link>
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-2xl border border-border p-6 h-fit sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span>{t.cart.subtotal}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{t.cart.shipping}</span>
                  <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{t.cart.tax}</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold text-foreground">{t.cart.total}</span>
                <span className="text-2xl font-bold text-accent">${total.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="w-full block text-center bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-3"
              >
                {t.cart.checkout}
              </Link>

              <div className="text-xs text-muted-foreground text-center">
                Free shipping on orders over $100
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
