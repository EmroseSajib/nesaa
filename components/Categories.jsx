import { categories } from "@/lib/mockData";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../app/LanguageContext";
const CategoriesSection = () => {
  const { t } = useLanguage();
  return (
    <div>
      <section className="py-16 sm:py-24 relative">
        {/* <div className="absolute top-0 left-0 translate-x-12/10 w-[400px] h-[400px] bg-amber-400/20 blur-3xl rounded-full" /> */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
            {t.shop.allCategories}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="group relative h-72 rounded-3xl overflow-hidden transition-all duration-500 "
              >
                {/* Background Image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  width={200}
                  height={200}
                  className=" transition-transform duration-700 group-hover:scale-110"
                />

                {/* Bottom Text */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-all duration-500 group-hover:bg-black/60 rounded-l-full  ">
                  <h3 className="text-xl font-bold text-[#e9b83e]">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80  p-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesSection;
