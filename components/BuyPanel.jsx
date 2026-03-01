'use client'

import { useState } from 'react'
import { ShoppingCart, Minus, Plus } from 'lucide-react'
import { useLanguage } from '@/app/LanguageContext'

export function BuySinglePanel({ product }) {
  const [quantity, setQuantity] = useState(1)
  const { t } = useLanguage()

  const increaseQuantity = () => setQuantity(q => q + 1)
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1))

  return (
    <div className="p-6 border border-border rounded-2xl bg-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t.product.singlePrice}
        </h3>
        <div className="flex items-baseline gap-3">
          <p className="text-4xl font-bold text-accent">
            ${product.single.price}
          </p>
          <span className="text-sm text-muted-foreground">
            {t.product.moq} {product.single.moq}
          </span>
        </div>
      </div>

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            Color
          </label>
          <div className="flex gap-2 flex-wrap">
            {product.colors.map(color => (
              <button
                key={color}
                className="px-4 py-2 rounded-lg border-2 border-border hover:border-accent transition-colors"
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          {t.product.quantity}
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={decreaseQuantity}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Minus className="w-5 h-5" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-center px-2 py-2 border border-border rounded-lg bg-background"
          />
          <button
            onClick={increaseQuantity}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mb-3">
        <ShoppingCart className="w-5 h-5" />
        {t.product.addToCart}
      </button>

      {/* Stock Status */}
      <div className={`text-center text-sm py-2 rounded-lg ${
        product.inStock
          ? 'bg-green-50 text-green-700'
          : 'bg-red-50 text-red-700'
      }`}>
        {product.inStock ? t.product.inStock : t.product.outOfStock}
      </div>
    </div>
  )
}

export function BuyWholesalePanel({ product }) {
  const [quantity, setQuantity] = useState(product.wholesale.moq)
  const { t } = useLanguage()

  const increaseQuantity = () => setQuantity(q => q + 1)
  const decreaseQuantity = () => 
    setQuantity(q => (q > product.wholesale.moq ? q - 1 : product.wholesale.moq))

  const totalPrice = quantity * product.wholesale.price

  return (
    <div className="p-6 border border-accent/30 rounded-2xl bg-accent/5">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t.product.wholesalePrice}
        </h3>
        <div className="flex items-baseline gap-3 mb-2">
          <p className="text-4xl font-bold text-accent">
            ${product.wholesale.price}
          </p>
          <span className="text-sm text-muted-foreground">per unit</span>
        </div>
        <p className="text-sm text-accent font-medium">
          {t.product.moq} {product.wholesale.moq} {quantity > product.wholesale.moq ? `(+${quantity - product.wholesale.moq})` : ''}
        </p>
      </div>

      {/* Quantity */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          {t.product.quantity}
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={decreaseQuantity}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Minus className="w-5 h-5" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const val = Math.max(product.wholesale.moq, parseInt(e.target.value) || product.wholesale.moq)
              setQuantity(val)
            }}
            className="w-16 text-center px-2 py-2 border border-border rounded-lg bg-background"
          />
          <button
            onClick={increaseQuantity}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Total Price */}
      <div className="mb-6 p-4 bg-background rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total:</span>
          <span className="text-2xl font-bold text-accent">${totalPrice}</span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 mb-3">
        <ShoppingCart className="w-5 h-5" />
        {t.product.addToCart}
      </button>

      {/* Stock Status */}
      <div className={`text-center text-sm py-2 rounded-lg ${
        product.inStock
          ? 'bg-green-50 text-green-700'
          : 'bg-red-50 text-red-700'
      }`}>
        {product.inStock ? t.product.inStock : t.product.outOfStock}
      </div>
    </div>
  )
}
