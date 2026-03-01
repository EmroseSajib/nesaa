'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/app/LanguageContext'
import { BuySinglePanel, BuyWholesalePanel } from '@/components/BuyPanel'
import { products } from '@/lib/mockData'
import { ChevronLeft, Share2, Heart } from 'lucide-react'

export default function ProductPage({ params }) {
  const { t } = useLanguage()
  const product = products.find(p => p.slug === params.slug)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('details')
  const [wishlisted, setWishlisted] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Product not found</h1>
          <Link href="/shop" className="text-accent hover:underline">
            Back to shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          {t.nav.shop}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-secondary rounded-2xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23e5e5e5" width="400" height="400"/%3E%3C/svg%3E'
                }}
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-accent'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23e5e5e5" width="100" height="100"/%3E%3C/svg%3E'
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-foreground mb-2">{product.name}</h1>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-accent">{product.rating}★</span>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Heart
                    className="w-6 h-6"
                    fill={wishlisted ? 'currentColor' : 'none'}
                    color={wishlisted ? '#a91834' : 'currentColor'}
                  />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="space-y-3 p-4 bg-card rounded-lg border border-border">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Materials:</span>
                <span className="font-medium text-foreground">{product.materials}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dimensions:</span>
                <span className="font-medium text-foreground">{product.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stock Status:</span>
                <span className={`font-medium ${
                  product.inStock ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.inStock ? t.product.inStock : t.product.outOfStock}
                </span>
              </div>
            </div>

            {/* Dual Purchase Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BuySinglePanel product={product} />
              <BuyWholesalePanel product={product} />
            </div>

            {/* Share */}
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors">
              <Share2 className="w-5 h-5" />
              Share Product
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="flex gap-8 border-b border-border mb-8">
            {['details', 'reviews', 'shipping'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-medium transition-colors border-b-2 -mb-[2px] ${
                  activeTab === tab
                    ? 'text-accent border-accent'
                    : 'text-muted-foreground border-transparent'
                }`}
              >
                {tab === 'details' ? t.product.details : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-2xl">
            {activeTab === 'details' && (
              <div className="space-y-4 text-muted-foreground">
                <p>
                  This premium leather product is crafted with meticulous attention to detail and quality. 
                  Each piece is handmade from the finest materials, ensuring durability and timeless elegance.
                </p>
                <p>
                  Our sustainable practices ensure that every purchase supports ethical leather production 
                  and environmental responsibility.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-muted-foreground">
                <p>Customer reviews coming soon...</p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Shipping:</strong> Free shipping on orders over $100
                </p>
                <p>
                  <strong className="text-foreground">Delivery:</strong> 5-7 business days within the US
                </p>
                <p>
                  <strong className="text-foreground">Returns:</strong> 30-day return policy on all products
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-foreground mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.filter(p => p.id !== product.id).slice(0, 3).map(relatedProduct => (
              <div key={relatedProduct.id} className="rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
                <Link href={`/product/${relatedProduct.slug}`}>
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">{relatedProduct.name}</h3>
                    <p className="text-accent font-bold">${relatedProduct.single.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
