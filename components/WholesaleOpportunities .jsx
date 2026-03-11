import {
  ArrowRight,
  BadgeDollarSign,
  PackageCheck,
  Palette,
} from "lucide-react";
import Link from "next/link";

const WholesaleOpportunities = () => {
  const items = [
    {
      id: 1,
      icon: PackageCheck,
      title: "Bulk Orders",
      description:
        "Order in larger quantities for boutiques, retail stores, events, and corporate gifting needs.",
    },
    {
      id: 2,
      icon: BadgeDollarSign,
      title: "Competitive Pricing",
      description:
        "Benefit from wholesale pricing designed to support growing businesses and long-term partnerships.",
    },
    {
      id: 3,
      icon: Palette,
      title: "Custom Options",
      description:
        "Explore branding, packaging, and tailored product options for selected bulk order collections.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" /> */}
      <div className="absolute bottom-0 left-1/5 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm uppercase tracking-[0.22em] text-[#8a6a4a] mb-3">
            NESAA B2B
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold text-[#3b2e24] mb-4">
            Wholesale Opportunities
          </h2>
          <p className="text-[#6e5a4b] text-base sm:text-lg leading-8">
            Partner with NESAA for premium bulk products crafted with natural
            materials, thoughtful design, and reliable quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="rounded-[28px] border border-white/40 bg-white/65 backdrop-blur-xl p-7 shadow-[0_10px_30px_rgba(59,46,36,0.08)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#8a6a4a]" />
                </div>

                <h3 className="text-xl font-semibold text-[#3b2e24] mb-3">
                  {item.title}
                </h3>

                <p className="text-[#6e5a4b] leading-7">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/b2b"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3b2e24] px-7 py-3.5 text-white font-medium hover:bg-[#2d221a] transition"
          >
            Explore Wholesale
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WholesaleOpportunities;
