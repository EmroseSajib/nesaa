import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sophia Rahman",
      role: "Verified Buyer",
      text: "The quality feels truly premium. The bag is beautifully made, elegant, and even more stunning in real life.",
    },
    {
      id: 2,
      name: "Emma Jansen",
      role: "Verified Buyer",
      text: "I love that NESAA combines natural materials with such refined craftsmanship. It feels both stylish and meaningful.",
    },
    {
      id: 3,
      name: "Nadia Islam",
      role: "Verified Buyer",
      text: "From the design to the finishing, everything feels thoughtful and luxurious. I’ve already received so many compliments.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden ">
      {/* Premium glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />
      {/* <div className="absolute bottom-0 left-1/5 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" /> */}

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm uppercase tracking-[0.22em] text-[#8a6a4a] mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold text-[#3b2e24] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-[#6e5a4b] text-base sm:text-lg leading-8">
            Loved for our quality, elegance, and meaningful craftsmanship.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-[28px] border border-white/40 bg-white/65 backdrop-blur-xl p-7 shadow-[0_10px_30px_rgba(59,46,36,0.08)]"
            >
              <div className="flex items-center gap-1 mb-5">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="w-4 h-4 fill-[#d4a63f] text-[#d4a63f]"
                  />
                ))}
              </div>

              <p className="text-[#6e5a4b] leading-8 mb-6 text-base">
                “{item.text}”
              </p>

              <div>
                <h3 className="text-lg font-semibold text-[#3b2e24]">
                  {item.name}
                </h3>
                <p className="text-sm text-[#8a6a4a]">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
