"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

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
  return (
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
  );
}
