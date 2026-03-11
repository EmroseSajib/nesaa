import { HandHeart, Leaf, ShieldCheck, Sparkles } from "lucide-react";

export default function WhyBuyersChooseUs() {
  const features = [
    {
      icon: Leaf,
      title: "Natural Materials",
      description:
        "We use carefully selected natural materials that feel authentic, timeless, and refined.",
    },
    {
      icon: Sparkles,
      title: "Handcrafted Quality",
      description:
        "Each piece reflects true craftsmanship, with attention to detail in every finish and texture.",
    },
    {
      icon: HandHeart,
      title: "Ethical Production",
      description:
        "Our products support fair working conditions and help create dignified opportunities for makers.",
    },
    {
      icon: ShieldCheck,
      title: "Made to Last",
      description:
        "NESAA products are designed for everyday elegance with quality that stays beautiful over time.",
    },
  ];

  return (
    <section className="relative ">
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" /> */}
      <div className="absolute bottom-10 left-1/5 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />

      <div className="relative container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm uppercase tracking-[0.22em] text-[#8a6a4a] mb-3">
            Why NESAA
          </p>
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#3b2e24] mb-5">
            Why Buyers Choose Us
          </h2>
          <p className="text-[#6e5a4b] text-lg leading-8">
            We combine natural beauty, thoughtful craftsmanship, and meaningful
            impact to create products buyers feel proud to carry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-[28px] border border-white/40 bg-white/65 backdrop-blur-xl p-7 shadow-[0_10px_30px_rgba(59,46,36,0.08)] hover:-translate-y-1 transition-all duration-300"
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
      </div>
    </section>
  );
}
