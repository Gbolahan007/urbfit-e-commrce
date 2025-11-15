"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Brand {
  id: string;
  name: string;
  slug: string;
}

export default function BrandLinksSection({ brands }: { brands: Brand[] }) {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!brands?.length) return;

      // Animate horizontal brand links with bounce
      gsap.set(linkRefs.current, { y: -50, opacity: 0 });

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
    },
    { dependencies: [brands], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative z-30 bg-[#f7f6f3]">
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
        <div className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {brands?.slice(0, 10).map((brand, idx) => (
            <Link
              key={brand?.id}
              href={`/brands/${brand?.slug}`}
              ref={(el) => {
                linkRefs.current[idx] = el;
              }}
              className="flex-shrink-0 border border-black flex items-center justify-center uppercase font-medium text-center px-6 py-2 hover:bg-black hover:text-white transition-colors whitespace-nowrap min-w-fit"
            >
              {brand?.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
