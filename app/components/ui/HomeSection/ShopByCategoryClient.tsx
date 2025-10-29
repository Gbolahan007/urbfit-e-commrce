"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Category = {
  name: string;
  image_url: string;
  slug: string;
};

export default function ShopByCategoryClient({
  homeCategory,
}: {
  homeCategory: Category[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-[#f7f6f3] py-10 px-4 overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-black tracking-wide">
            SHOP BY CATEGORY
          </h1>
        </div>

        <div
          className="overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="flex items-center gap-4 min-w-max pb-4">
            {homeCategory.map((category, index) => (
              <Link
                key={index}
                href={`/men/${category.slug}`}
                className="group cursor-pointer flex-shrink-0 block"
              >
                <div className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 mb-4">
                  <div className="w-20 h-20 mx-auto overflow-hidden rounded-lg relative">
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 50px) 40vw, 56px"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="text-lg font-semibold text-black uppercase tracking-wider group-hover:text-gray-700 transition-colors duration-300 whitespace-nowrap">
                    {category.name}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
