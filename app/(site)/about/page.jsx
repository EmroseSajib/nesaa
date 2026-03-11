"use client";

import {
  Globe2,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#e9e2d8] overflow-hidden">
      {/* Premium glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 left-1/5 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />
      <div className="absolute top-[35%] right-0 translate-x-1/3 w-[500px] h-[500px] bg-orange-300/20 blur-3xl rounded-full" />

      <div className="relative container mx-auto px-6 py-16 lg:py-24">
        {/* Hero */}
        <section className="grid lg:grid-cols-2 gap-10 items-center mb-20">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 border border-white/40 text-[#7a5a3d] text-sm tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
              About NESAA
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-[#3b2e24] mb-6">
              A story of natural beauty, craftsmanship, and meaningful impact
            </h1>

            <p className="text-[#6e5a4b] text-lg leading-8 max-w-2xl mb-8">
              NESAA is a modern brand rooted in heritage, sustainability, and
              purpose. We believe natural materials and true craftsmanship can
              create products that feel beautiful, timeless, and deeply human.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-lg p-5 shadow-lg">
                <p className="text-2xl font-semibold text-[#3b2e24]">2024</p>
                <p className="text-[#6e5a4b] mt-1">
                  Founded with a vision for conscious design
                </p>
              </div>

              <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-lg p-5 shadow-lg">
                <p className="text-2xl font-semibold text-[#3b2e24]">
                  Bangladesh × Netherlands
                </p>
                <p className="text-[#6e5a4b] mt-1">
                  A bridge between heritage, craft, and modern elegance
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem]  blur-2xl" />
            <div className="relative rounded-[2rem] overflow-hidden ">
              <Image
                src="/handmade-bag.png"
                alt="Handmade natural bag"
                width={900}
                height={900}
                className="w-full h-[500px] lg:h-[650px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="mb-20">
          <div className="rounded-[2rem] border border-white/40 bg-white/65 backdrop-blur-xl shadow-xl p-8 md:p-12">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-[0.2em] text-[#8b6a4a] mb-4">
                Our Story
              </p>

              <h2 className="text-3xl md:text-4xl font-semibold text-[#3b2e24] mb-6">
                A combination of natural materials and craftsmanship
              </h2>

              <div className="space-y-5 text-[#6e5a4b] leading-8 text-lg">
                <p>
                  NESAA was founded in 2024 by{" "}
                  <span className="font-semibold text-[#3b2e24]">
                    Nusrat Manik
                  </span>
                  , a young entrepreneur with a passion for rediscovering
                  natural products and showcasing true craftsmanship.
                </p>

                <p>
                  Born and raised in the Netherlands, with deep roots in
                  Bangladesh, she brings together heritage, design, and a vision
                  for sustainability and fairness. This connection between
                  cultures shapes the soul of NESAA.
                </p>

                <p>
                  The name{" "}
                  <span className="font-semibold text-[#3b2e24]">NESAA</span>,
                  meaning <span className="italic">wonder</span> and{" "}
                  <span className="italic">butterfly</span>, reflects
                  transformation — the transformation of natural materials into
                  beautiful, sustainable products, and the transformation of
                  lives through dignified work and opportunity.
                </p>

                <p>
                  Every piece is created to feel refined and lasting, while
                  carrying a story of care, authenticity, and positive social
                  impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder + Image */}
        <section className="grid lg:grid-cols-2 gap-10 items-center mb-20">
          <div className="relative order-2 lg:order-1">
            <div className="rounded-[2rem] overflow-hidden border border-white/40 bg-white/50 backdrop-blur-lg shadow-2xl">
              <Image
                src="/founder.jpg"
                alt="Founder and brand story"
                width={900}
                height={1000}
                className="w-full h-[450px] md:h-[540px] object-cover"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm uppercase tracking-[0.2em] text-[#8b6a4a] mb-4">
              Founder Vision
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold text-[#3b2e24] mb-6">
              Creating beauty with purpose
            </h2>

            <p className="text-[#6e5a4b] leading-8 text-lg mb-6">
              At NESAA, design is not only about aesthetics. It is about
              honoring materials, respecting the people behind every product,
              and creating something that feels both elegant and responsible.
            </p>

            <p className="text-[#6e5a4b] leading-8 text-lg mb-8">
              The brand stands for thoughtful production, timeless pieces, and a
              future where luxury is defined not only by beauty, but also by
              integrity, sustainability, and human dignity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/60 border border-white/40 backdrop-blur-md p-5">
                <Leaf className="w-6 h-6 text-[#8b6a4a] mb-3" />
                <h3 className="font-semibold text-[#3b2e24] mb-2">
                  Natural Materials
                </h3>
                <p className="text-sm text-[#6e5a4b] leading-7">
                  Carefully chosen materials that feel authentic, warm, and
                  timeless.
                </p>
              </div>

              <div className="rounded-2xl bg-white/60 border border-white/40 backdrop-blur-md p-5">
                <Sparkles className="w-6 h-6 text-[#8b6a4a] mb-3" />
                <h3 className="font-semibold text-[#3b2e24] mb-2">
                  True Craftsmanship
                </h3>
                <p className="text-sm text-[#6e5a4b] leading-7">
                  Pieces shaped with skill, patience, and deep respect for the
                  craft.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bangladesh Collaboration */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center rounded-[2rem] border border-white/40 bg-[#3b2e24] text-white shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              <p className="text-sm uppercase tracking-[0.2em] text-[#d7b386] mb-4">
                Collaboration with Bangladesh
              </p>

              <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                Fair labor and livable conditions
              </h2>

              <div className="space-y-5 text-white/80 leading-8 text-lg">
                <p>
                  NESAA partners with a manufacturer in Bangladesh that is
                  committed to fair and sustainable working conditions.
                </p>

                <p>
                  This manufacturer provides opportunities for women who are
                  single, widowed, or without other forms of support. Through
                  this work, they are empowered to build dignified lives,
                  support their families, and move toward greater economic
                  independence.
                </p>

                <p>
                  NESAA also collaborates closely with{" "}
                  <span className="text-white font-semibold">Baba Aid</span>, an
                  organization focused on improving the living conditions of
                  vulnerable communities in Bangladesh, including men, women,
                  and families in need.
                </p>

                <p>
                  Together, these partnerships help create opportunity,
                  stability, and a brighter future for the communities involved.
                </p>
              </div>
            </div>

            <div className="h-full min-h-[380px] lg:min-h-[100%]">
              <Image
                src="/bangladesh-craft.webp"
                alt="Craftsmanship and garment work in Bangladesh"
                width={1000}
                height={1200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.2em] text-[#8b6a4a] mb-4">
              What We Stand For
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#3b2e24]">
              Built on values that matter
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="rounded-[1.75rem] border border-white/40 bg-white/60 backdrop-blur-xl p-6 shadow-lg">
              <Leaf className="w-7 h-7 text-[#8b6a4a] mb-4" />
              <h3 className="text-xl font-semibold text-[#3b2e24] mb-3">
                Sustainability
              </h3>
              <p className="text-[#6e5a4b] leading-7">
                Choosing natural materials and mindful processes with long-term
                impact in mind.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/40 bg-white/60 backdrop-blur-xl p-6 shadow-lg">
              <HeartHandshake className="w-7 h-7 text-[#8b6a4a] mb-4" />
              <h3 className="text-xl font-semibold text-[#3b2e24] mb-3">
                Fairness
              </h3>
              <p className="text-[#6e5a4b] leading-7">
                Supporting working conditions rooted in dignity, respect, and
                real opportunity.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/40 bg-white/60 backdrop-blur-xl p-6 shadow-lg">
              <Globe2 className="w-7 h-7 text-[#8b6a4a] mb-4" />
              <h3 className="text-xl font-semibold text-[#3b2e24] mb-3">
                Heritage
              </h3>
              <p className="text-[#6e5a4b] leading-7">
                Bringing together Dutch perspective and Bangladeshi roots in one
                refined brand story.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/40 bg-white/60 backdrop-blur-xl p-6 shadow-lg">
              <ShieldCheck className="w-7 h-7 text-[#8b6a4a] mb-4" />
              <h3 className="text-xl font-semibold text-[#3b2e24] mb-3">
                Integrity
              </h3>
              <p className="text-[#6e5a4b] leading-7">
                Creating products with honesty, care, and a commitment to
                lasting quality.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Banner */}
        <section>
          <div className="rounded-[2rem] border border-white/40 bg-white/65 backdrop-blur-xl shadow-xl p-8 md:p-12 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-[#8b6a4a] mb-4">
              The NESAA Promise
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold text-[#3b2e24] mb-5">
              Elegant products, natural materials, and meaningful change
            </h2>

            <p className="max-w-3xl mx-auto text-[#6e5a4b] text-lg leading-8">
              NESAA exists to create more than beautiful pieces. We aim to tell
              a story of transformation — where craftsmanship, sustainability,
              and social impact come together in every product we make.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
