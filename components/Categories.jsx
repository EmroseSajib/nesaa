import { categories } from "@/lib/mockData";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../app/LanguageContext";

const CategoriesSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden ">
      {/* Premium glow background */}
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" /> */}
      <div className="absolute bottom-0 left-1/5 -translate-x-1/2 w-[700px] h-[700px] bg-amber-400/20 blur-3xl rounded-full" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm uppercase tracking-[0.22em] text-[#8a6a4a] mb-3">
            NESAA Collection
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold text-[#3b2e24] mb-4">
            {t.shop.allCategories}
          </h2>
          <p className="text-[#6e5a4b] text-base sm:text-lg leading-8">
            Explore our refined categories, crafted with natural beauty,
            timeless design, and everyday elegance.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative h-[380px] rounded-[30px] overflow-hidden border border-white/30 bg-white/20 backdrop-blur-sm shadow-[0_10px_30px_rgba(59,46,36,0.08)] flex justify-center items-center"
            >
              {/* Image */}
              <Image
                src={category.image}
                alt={category.name}
                width={280}
                height={180}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="translate-y-3 transition-all duration-500 group-hover:translate-y-0">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-2xl font-semibold text-white">
                      {category.name}
                    </h3>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-white/80 opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover:opacity-100 group-hover:max-h-24">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
