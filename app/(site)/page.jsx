"use client";

import { testimonials } from "@/lib/mockData";
import { useState } from "react";
import Banner from "../../components/Banner";
import CategoriesSection from "../../components/Categories";
import Feature from "../../components/Feature";
import { useLanguage } from "../LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="w-full">
      <Banner />
      <CategoriesSection />
      {/* Featured Products Section */}
      <Feature />

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-8 rounded-2xl bg-amber-400/20 border border-border "
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-accent rounded-full" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Wholesale Opportunities</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Looking to stock NESAA products? Inquire about our wholesale pricing
            and bulk orders.
          </p>
          <button
            onClick={() => setQuoteOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-foreground text-accent rounded-lg font-semibold hover:bg-accent-foreground/90 transition-all"
          >
            Request Quote
          </button>
        </div>
      </section>
    </div>
  );
}
