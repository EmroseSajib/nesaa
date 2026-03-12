import { ArrowRight, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DonationSection = () => {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden bg-[#e9e2d8]">
      {/* Premium glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-1/5 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-[32px] overflow-hidden border border-white/30 shadow-[0_10px_30px_rgba(59,46,36,0.08)]">
              <Image
                src="/baba-aid.jpg"
                alt="Baba Aid Bangladesh support"
                width={600}
                height={600}
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-[#8a6a4a] mb-3">
              Social Impact
            </p>

            <h2 className="text-4xl sm:text-5xl font-semibold text-[#3b2e24] mb-6">
              Supporting Communities
              <br /> Through Baba Aid
            </h2>

            <p className="text-[#6e5a4b] text-base sm:text-lg leading-8 mb-5">
              At NESAA, every purchase contributes to something bigger. We
              partner with Baba Aid, a Dutch foundation dedicated to improving
              lives in Bangladesh through sustainable development.
            </p>

            <p className="text-[#6e5a4b] text-base sm:text-lg leading-8 mb-8">
              Baba Aid supports education, healthcare, and economic empowerment
              for vulnerable communities. Together, we work toward creating
              lasting positive change and a brighter future for families in
              need.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-full bg-[#3b2e24] px-6 py-3 text-white font-medium hover:bg-[#2d221a] transition"
              >
                Support the Mission
                <HeartHandshake className="w-4 h-4" />
              </Link>

              <a
                href="https://www.babaaid.com"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-[#c8b59f] px-6 py-3 text-[#3b2e24] font-medium hover:bg-white/50 transition"
              >
                Learn About Baba Aid
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
