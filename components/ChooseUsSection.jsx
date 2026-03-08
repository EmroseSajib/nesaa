"use client";

import {
  BriefcaseBusiness,
  Crown,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

const features = [
  {
    title: "Premium Craftsmanship",
    description:
      "Each bag is made with refined materials, elegant detailing, and a finish that feels timeless and premium.",
    icon: Crown,
  },
  {
    title: "Loved by Retail & B2B Buyers",
    description:
      "Our collections are designed to serve both individual customers and wholesale buyers with equal value.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Reliable Delivery",
    description:
      "Fast processing and dependable shipping help customers and business partners order with confidence.",
    icon: Truck,
  },
  {
    title: "Careful Packaging",
    description:
      "Every order is packed with attention to detail to protect the product and enhance presentation.",
    icon: PackageCheck,
  },
  {
    title: "Trusted Service",
    description:
      "Clear communication, responsive support, and smooth order handling build lasting buyer trust.",
    icon: ShieldCheck,
  },
  {
    title: "Elegant Market Appeal",
    description:
      "Our bags combine style and function, making them attractive for both direct customers and resellers.",
    icon: Sparkles,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className=" px-6 py-16 md:px-10 lg:px-28">
      <div className="relative z-10">
        {/* heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-[#ded3c2] bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6a43]">
            Why buyers choose us
          </span>

          <h2 className="mt-5 text-3xl font-semibold leading-tight text-[#2f2419] sm:text-4xl lg:text-5xl">
            Crafted for
            <span className="text-[#9a6b3f]"> modern retail </span>
            and trusted by
            <span className="text-[#6e4b2f]"> B2B buyers</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#6b5b4d] sm:text-base">
            We blend premium style, dependable quality, and business-friendly
            service to create a buying experience that feels elevated for every
            customer.
          </p>
        </div>

        {/* small highlights */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["Refined Design", "Elegant bags with lasting appeal"],
            ["Retail Ready", "Perfect for direct customers"],
            ["Bulk Friendly", "Suitable for wholesale orders"],
            ["Smooth Support", "Fast and reliable communication"],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-[#e7dfd2] bg-white/70 p-4 shadow-[0_10px_30px_rgba(80,60,30,0.04)]"
            >
              <h3 className="text-sm font-semibold text-[#2f2419]">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-[#7a6a5c]">{text}</p>
            </div>
          ))}
        </div>

        {/* feature cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative rounded-3xl border border-[#e7dfd2] bg-white/80 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(90,65,35,0.08)]"
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#f0e3d2] opacity-0 blur-2xl transition duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#eadfce] bg-[#fcfaf7] text-[#9a6b3f]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <span className="text-xs font-medium text-[#9a6b3f]">
                      0{index + 1}
                    </span>
                    <div className="h-px flex-1 bg-[#eadfce]" />
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-[#2f2419]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#6b5b4d]">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
