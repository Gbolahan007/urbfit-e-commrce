"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Brand {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export default function HomeDiscoverBrandClient({
  brands,
}: {
  brands: Brand[];
}) {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!brands?.length) return;

    // Set initial state
    gsap.set(linkRefs.current, { y: -50, opacity: 0 });

    // Animate bounce from top
    gsap.to(linkRefs.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "bounce.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: linkRefs.current[0],
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, [brands]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mx-auto max-w-6xl px-4 py-6">
        <h1 className="uppercase font-semibold text-lg">Discover Brands</h1>
        <Link
          href="/brands"
          className="border border-black px-4 py-2 uppercase text-sm hover:bg-black hover:text-white transition-colors"
        >
          Shop all brands
        </Link>
      </div>

      {/* Horizontal scroll brand links */}
      <div className="mx-auto max-w-6xl px-4 pb-8">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {brands?.slice(0, 10).map((brand, idx) => (
            <Link
              key={brand?.id}
              href={`/brands/${brand?.slug}`}
              ref={(el) => {
                linkRefs.current[idx] = el;
              }}
              className="flex-shrink-0 border border-black flex items-center justify-center uppercase font-medium text-center px-4 py-2 hover:bg-black hover:text-white transition-colors"
            >
              {brand?.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Brand grid with images */}
      <div className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {brands?.slice(0, 6).map((brand) => (
            <div key={`brand-${brand.id}`}>
              <Link
                href={`/brands/${brand?.slug}`}
                className="group block overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={brand?.image || "/placeholder.png"}
                    alt={brand?.name || "Brand"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw,
                          (max-width: 1280px) 50vw,
                          33vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white font-bold text-xl lg:text-2xl leading-tight drop-shadow-2xl transform group-hover:translate-y-[-4px] transition-transform duration-300">
                      {brand?.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
