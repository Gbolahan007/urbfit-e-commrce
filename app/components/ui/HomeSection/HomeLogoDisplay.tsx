"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomeLogoDisplay() {
  const brands = [
    { id: 1, name: "Fatface", slug: "fatface" },
    { id: 2, name: "Fred Perry", slug: "fred-perry" },
    { id: 3, name: "Gap", slug: "gap" },
    { id: 4, name: "Lacoste", slug: "lacoste" },
    { id: 5, name: "New Balance", slug: "new-balance" },
    { id: 6, name: "Nike", slug: "nike" },
    { id: 7, name: "Puma", slug: "puma" },
    { id: 8, name: "Tommy Hilfiger", slug: "tommy-hilfiger" },
    { id: 9, name: "Under Armour", slug: "under-armour" },
    { id: 10, name: "Phase Eight", slug: "phase-eight" },
    { id: 11, name: "Skopes", slug: "skopes" },
  ];

  const duplicatedBrands = [...brands, ...brands];

  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls]);

  return (
    <div className="w-full overflow-hidden py-12">
      <motion.div className="flex gap-16 items-center" animate={controls}>
        {duplicatedBrands.map((brand, i) => (
          <Link
            key={`${brand.id}-${i}`}
            href={`/brands/${brand.slug}`}
            className="relative flex-shrink-0 w-32 h-32 flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Image
              src={`/${brand.id}.png`}
              alt={brand.name}
              fill
              className="object-contain transition-all duration-300"
            />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
