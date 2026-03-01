'use client'

import { useLanguage } from '@/app/LanguageContext'
import { donationTiers } from '@/lib/mockData'
import { Heart, TreePine, Users, Globe } from 'lucide-react'

export default function DonationsPage() {
  const { t } = useLanguage()

  const impacts = [
    { icon: TreePine, label: 'Trees Planted', value: '5,234' },
    { icon: Users, label: 'Lives Supported', value: '892' },
    { icon: Globe, label: 'Carbon Offset (tons)', value: '1,245' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-accent text-accent-foreground py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.donations.title}</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {t.donations.description}
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 sm:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            {t.donations.impact}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impacts.map((impact, index) => {
              const Icon = impact.icon
              return (
                <div key={index} className="text-center">
                  <Icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <p className="text-4xl font-bold text-foreground mb-2">{impact.value}</p>
                  <p className="text-muted-foreground">{impact.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Choose Your Impact Level
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {donationTiers.map(tier => (
              <div
                key={tier.id}
                className="rounded-2xl border-2 border-border p-8 text-center hover:border-accent hover:shadow-lg transition-all"
              >
                <div className={`inline-block w-12 h-12 rounded-full mb-4 opacity-80`}
                  style={{ backgroundColor: `hsl(${tier.color === 'green' ? '162, 45%' : tier.color === 'emerald' ? '142, 72%' : '167, 69%'}, 60%)` }}
                />
                <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
                <p className="text-4xl font-bold text-accent mb-2">${tier.amount}</p>
                <p className="text-muted-foreground mb-6">{tier.description}</p>
                <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Donate ${tier.amount}
                </button>
              </div>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="mt-12 max-w-md mx-auto">
            <div className="bg-card rounded-2xl border border-border p-8">
              <p className="text-center font-semibold text-foreground mb-4">Or enter a custom amount</p>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-3 text-foreground">$</span>
                  <input
                    type="number"
                    placeholder="250"
                    className="w-full pl-7 pr-4 py-3 border border-border rounded-lg bg-background"
                  />
                </div>
                <button className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors">
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Our Donations */}
      <section className="py-16 sm:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">How Your Donation Helps</h2>
            
            <div className="space-y-6 text-muted-foreground">
              <p>
                Every donation to NESAA goes directly to our environmental and community initiatives. 
                We partner with verified organizations to ensure maximum impact.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-background rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Environmental Programs</h3>
                  <p className="text-sm">Reforestation, ocean cleanup, and carbon offset initiatives in partnership with verified environmental organizations.</p>
                </div>
                
                <div className="p-4 bg-background rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Community Support</h3>
                  <p className="text-sm">Supporting artisan communities and fair-trade leather production practices across the globe.</p>
                </div>
              </div>

              <p>
                100% transparency: You'll receive quarterly reports on how your donations are being used. 
                NESAA is registered as a B-Corp and maintains the highest environmental standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
