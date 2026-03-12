import Image from "next/image";

const BrandStory = () => {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      {/* Premium glow background */}
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[500px] bg-amber-400/20 blur-3xl rounded-full" /> */}
      {/* <div className="absolute bottom-0 left-1/5 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" /> */}

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-[32px] overflow-hidden shadow-[0_10px_30px_rgba(59,46,36,0.08)] border border-white/30">
              <Image
                src="/brand-story.jpg"
                alt="NESAA craftsmanship"
                width={600}
                height={600}
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-[#8a6a4a] mb-3">
              Our Story
            </p>

            <h2 className="text-4xl sm:text-5xl font-semibold text-[#3b2e24] mb-6">
              A Combination of Natural Materials and Craftsmanship
            </h2>

            <p className="text-[#6e5a4b] text-base sm:text-lg leading-8 mb-5">
              NESAA was founded in 2024 by{" "}
              <span className="text-amber-800 font-bold">Nusrat Manik</span> , a
              young entrepreneur raised in the Netherlands with deep roots in
              Bangladesh. Her vision was to rediscover natural products and
              celebrate authentic craftsmanship.
            </p>

            <p className="text-[#6e5a4b] text-base sm:text-lg leading-8 mb-6">
              The name NESAA — meaning “wonder” and “butterfly” — represents
              transformation: turning natural materials into beautiful,
              sustainable products while positively impacting the lives of the
              people who create them.
            </p>

            <div className="flex items-center gap-4">
              <span className="text-[#3b2e24] font-semibold">
                Designed with Purpose
              </span>

              <span className="w-10 h-[1px] bg-[#c8b59f]" />

              <span className="text-[#8a6a4a]">Crafted with Care</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
