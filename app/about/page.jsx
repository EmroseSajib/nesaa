'use client'

import { CheckCircle, Award, Leaf } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We use only vegetable-tanned leather and sustainable practices in all our production processes.',
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Every piece is handcrafted by skilled artisans with years of experience in leather work.',
    },
    {
      icon: CheckCircle,
      title: 'Ethical',
      description: 'Fair wages and working conditions for all our partners and artisans across the globe.',
    },
  ]

  const milestones = [
    { year: '2018', event: 'Founded NESAA with a vision for sustainable luxury' },
    { year: '2019', event: 'Launched first wholesale program to support local artisans' },
    { year: '2021', event: 'Became certified B-Corp for our environmental and social commitments' },
    { year: '2023', event: 'Expanded to 15+ countries and donated $250k to environmental causes' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background to-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
            Crafting Luxury with Purpose
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            NESAA is dedicated to creating premium leather goods that are beautiful, ethical, and sustainable. 
            Every purchase supports artisans and environmental initiatives worldwide.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-8">Our Story</h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                NESAA was founded on a simple belief: luxury and sustainability don't have to be mutually exclusive. 
                We saw an opportunity to create premium leather goods that honor both the craftspeople who make them 
                and the planet we all share.
              </p>

              <p>
                Starting with a small team of passionate artisans, we began sourcing the finest vegetable-tanned leather 
                and developing relationships with leather workers who share our values. Today, NESAA works with partners 
                across Europe, South America, and Asia to bring you products that are truly world-class.
              </p>

              <p>
                Every bag, belt, and wallet tells a story of craftsmanship, sustainability, and purpose. When you 
                choose NESAA, you're not just buying a product—you're becoming part of a movement toward more ethical, 
                beautiful consumption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="text-center p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">Our Journey</h2>
          
          <div className="max-w-2xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-8 mb-8 last:mb-0 relative">
                {/* Timeline line */}
                {index !== milestones.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-px bg-border" />
                )}

                {/* Timeline dot */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                    {milestone.year.slice(-2)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <p className="text-lg font-bold text-accent mb-2">{milestone.year}</p>
                  <p className="text-muted-foreground">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">By The Numbers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '15+', label: 'Countries' },
              { number: '50+', label: 'Artisan Partners' },
              { number: '25K+', label: 'Happy Customers' },
              { number: '$500K+', label: 'Donated to Causes' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-card border border-border">
                <p className="text-4xl font-bold text-accent mb-2">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-foreground mb-8">Meet the Team</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our diverse team brings together expertise in leather craftsmanship, sustainable sourcing, 
            technology, and customer service. We're united by our passion for creating beautiful, 
            ethical products that make a positive impact on the world.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-accent text-accent-foreground text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Discover premium leather goods that support artisans and the environment.
          </p>
          <button className="inline-block px-8 py-4 bg-accent-foreground text-accent rounded-lg font-semibold hover:bg-accent-foreground/90 transition-colors">
            Shop Now
          </button>
        </div>
      </section>
    </div>
  )
}
