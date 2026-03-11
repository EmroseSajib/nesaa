"use client";

import { ArrowRight, HandHeart, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DonatePage() {
  return (
    <div className="relative min-h-screen bg-[#e9e2d8] overflow-hidden">
      {/* Premium glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 left-1/5 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />

      <div className="relative container mx-auto px-6 py-20">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 backdrop-blur-lg px-5 py-2 text-sm text-[#7b5d42] shadow-sm mb-6">
            <Sparkles className="w-4 h-4" />
            NESAA Donations
          </span>

          <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight text-[#3b2e24] mb-6">
            Giving with Purpose,
            <br />
            Creating Real Impact
          </h1>

          <p className="max-w-2xl mx-auto text-[#6e5a4b] text-lg leading-8">
            At NESAA, we believe in the power of collective action. Every
            purchase helps create high-quality products while supporting a more
            dignified future for the people behind them.
          </p>
        </div>

        {/* Main cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="rounded-[32px] border border-white/40 bg-white/65 backdrop-blur-xl p-8 lg:p-10 shadow-[0_10px_40px_rgba(59,46,36,0.08)]">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-amber-700" />
            </div>

            <h2 className="text-3xl font-semibold text-[#3b2e24] mb-4">
              Why We Donate
            </h2>

            <p className="text-[#6e5a4b] leading-8 mb-4">
              Our mission is simple: to ensure that everyone, from buyer to
              maker, can live with dignity.
            </p>

            <p className="text-[#6e5a4b] leading-8">
              Through NESAA, your support goes beyond products. It helps build
              stronger communities, improve living conditions, and create
              opportunities for a better future.
            </p>
          </div>

          <div className="rounded-[32px] border border-white/40 bg-[#3b2e24] p-8 lg:p-10 shadow-[0_10px_40px_rgba(59,46,36,0.12)]">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <HandHeart className="w-7 h-7 text-[#e8c79f]" />
            </div>

            <h2 className="text-3xl font-semibold text-white mb-4">
              Stronger Together: NESAA & Baba Aid
            </h2>

            <p className="text-white/80 leading-8 mb-4">
              NESAA partners with Baba Aid, a Dutch foundation dedicated to
              sustainable development and poverty alleviation in Bangladesh.
            </p>

            <p className="text-white/80 leading-8">
              Baba Aid supports projects in education, healthcare, and economic
              empowerment, helping create lasting positive change in communities
              across Bangladesh.
            </p>
          </div>
        </div>

        {/* Highlight section */}
        <div className="rounded-[32px] border border-white/40 bg-white/60 backdrop-blur-xl p-8 lg:p-12 shadow-[0_10px_40px_rgba(59,46,36,0.08)] mb-12">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-[#f7f1ea] p-6 border border-[#eadfce]">
              <h3 className="text-xl font-semibold text-[#3b2e24] mb-3">
                Education
              </h3>
              <p className="text-[#6e5a4b] leading-7">
                Supporting learning opportunities that help children and
                families build a stronger future.
              </p>
            </div>

            <div className="rounded-3xl bg-[#f7f1ea] p-6 border border-[#eadfce]">
              <h3 className="text-xl font-semibold text-[#3b2e24] mb-3">
                Healthcare
              </h3>
              <p className="text-[#6e5a4b] leading-7">
                Contributing to better access to care and healthier living
                conditions in vulnerable communities.
              </p>
            </div>

            <div className="rounded-3xl bg-[#f7f1ea] p-6 border border-[#eadfce]">
              <h3 className="text-xl font-semibold text-[#3b2e24] mb-3">
                Empowerment
              </h3>
              <p className="text-[#6e5a4b] leading-7">
                Encouraging economic independence through meaningful support and
                sustainable development.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto text-center rounded-[32px] border border-white/40 bg-white/65 backdrop-blur-xl p-8 lg:p-12 shadow-[0_10px_40px_rgba(59,46,36,0.08)]">
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#3b2e24] mb-4">
            Every Purchase Can Make a Difference
          </h2>

          <p className="text-[#6e5a4b] text-lg leading-8 mb-8">
            With NESAA, beauty and purpose come together. Your support helps us
            contribute directly to initiatives that uplift communities and
            create lasting impact.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3b2e24] px-7 py-3.5 text-white font-medium hover:bg-[#2d221a] transition"
            >
              Shop with Purpose
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://www.babaaid.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3b2e24]/15 bg-white/80 px-7 py-3.5 text-[#3b2e24] font-medium hover:bg-white transition"
            >
              Learn About Baba Aid
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
