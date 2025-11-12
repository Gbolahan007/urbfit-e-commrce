"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const categoryRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    // Set initial state - categories start above viewport
    gsap.set(categoryRefs.current, {
      y: -100,
      opacity: 0,
    });

    // Animate each category dropping down with stagger
    gsap.to(categoryRefs.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "bounce.in",
      stagger: 0.6,
      delay: 0.3,
      scrollTrigger: {
        trigger: categoryRefs.current[0],
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
  }, [homeCategory]);

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
                href={`/shop/${category.slug}`}
                ref={(el) => {
                  categoryRefs.current[index] = el;
                }}
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
