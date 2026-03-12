import Image from "next/image";

const Banner = () => {
  return (
    <div>
      <section className="relative min-h-screen flex items-center overflow-hidden  text-gray-900">
        {/* Soft Glow Background */}
        <div className="absolute top-0 left-1/2 translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 left-1/5 translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />

        <div className="relative container mx-auto px-6 grid lg:grid-cols-2 items-center gap-16">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            {/* Limited Offer Badge */}
            {/* <span className="inline-block px-5 py-2 text-sm font-semibold bg-red-600 text-white rounded-full tracking-wide animate-pulse">
              🔥 Limited Black Friday Deal
            </span> */}

            {/* Heading */}
            <h1 className="relative leading-none">
              {/* small top text */}
              <span className="block text-sm tracking-[0.4em] text-gray-500 uppercase mb-3">
                Limited Offer
              </span>

              {/* main title */}
              <span className="block font-poster text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-black via-orange-500 to-red-700 bg-clip-text text-transparent drop-shadow-lg">
                BLACK FRIDAY
              </span>

              {/* subtitle */}
              <span className="block tracking-[0.4em]   text-4xl lg:text-6xl text-gray-900  mt-2">
                SUPER SALE
              </span>
            </h1>
            {/* Subtitle */}
            <p className="text-gray-700 text-lg max-w-xl">
              Premium wholesale & single piece bags at exclusive seasonal
              pricing. Stock is limited — shop now before it’s gone.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/shop"
                className="px-8 py-4 bg-[#F6E3B8] hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-lg font-semibold shadow-lg hover:shadow-amber-200/40 hover:scale-105"
              >
                Order Now
              </a>

              <a
                href="/b2b"
                className="px-8 py-4 border border-gray-300 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-lg font-semibold"
              >
                Wholesale Only
              </a>
            </div>
          </div>

          {/* RIGHT SIDE BAG IMAGE */}
          <div className="relative flex justify-center items-center">
            {/* SALE CIRCLE BADGE */}
            <div className="absolute -top-6 -right-6 z-20">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute w-full h-full bg-red-600 rounded-full animate-ping opacity-30" />

                <div className="relative w-28 h-28 flex items-center justify-center bg-red-600 rounded-full shadow-2xl border-4 border-white/20">
                  <span className="text-white text-xl font-bold text-center">
                    50% <br /> OFF
                  </span>
                </div>
              </div>
            </div>

            {/* BAG IMAGE */}

            <Image
              src="/hero.png"
              alt="Premium Bag"
              width={700}
              height={700}
              className=" animate-bagRise drop-shadow-[0_40px_60px_rgba(255,165,0,0.25)]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
