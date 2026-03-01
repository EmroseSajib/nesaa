'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import { useLanguage } from '@/app/LanguageContext'

export function ProductCard({ product, onQuickView }) {
  const [addedToCart, setAddedToCart] = useState(false)
  const { t } = useLanguage()

  const handleAddToCart = (e, pricing) => {
    e.preventDefault()
    e.stopPropagation()
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-secondary h-64 sm:h-72">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23e5e5e5" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-size="24"%3E{product.name}%3C/text%3E%3C/svg%3E'
            }}
          />
          
          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              onQuickView?.(product)
            }}
            className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300"
          >
            <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              {t.product.quickView}
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 sm:p-5">
          {/* Name */}
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Pricing Info */}
          <div className="flex-1 mb-4 space-y-2">
            {/* Single Purchase */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <span className="inline-block px-2 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-1">
                  {t.product.singlePrice}
                </span>
                <p className="text-lg font-bold text-accent">${product.single.price}</p>
              </div>
            </div>

            {/* Wholesale */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <span className="inline-block px-2 py-1 rounded-full bg-accent/10 text-xs font-medium text-accent mb-1">
                  {t.product.wholesalePrice}
                </span>
                <div className="flex items-baseline gap-2">
                  <p className="text-lg font-bold text-foreground">${product.wholesale.price}</p>
                  <span className="text-xs text-muted-foreground">
                    {t.product.moq} {product.wholesale.moq}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* In Stock Badge */}
          <div className="mb-4">
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              product.inStock
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}>
              {product.inStock ? t.product.inStock : t.product.outOfStock}
            </span>
          </div>

          {/* Add to Cart Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => handleAddToCart(e, 'single')}
              className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors"
              disabled={!product.inStock}
            >
              {addedToCart ? '✓' : 'Buy'}
            </button>
            <button
              onClick={(e) => handleAddToCart(e, 'wholesale')}
              className="px-3 py-2 bg-accent text-accent-foreground rounded-lg text-xs font-semibold hover:bg-accent/90 transition-colors"
              disabled={!product.inStock}
            >
              Bulk
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
