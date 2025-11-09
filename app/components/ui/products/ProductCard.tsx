"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string | number;
    name: string;
    brand?: string;
    image: string;
    image2?: string;
    price: number;
    slug?: string;
    gender: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="group relative flex flex-col">
      {/* Product Image Container */}
      <div
        className="relative aspect-[3/4] overflow-hidden bg-neutral-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/${product.gender}/${product.slug || product.id}`}>
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isHovered && product.image2 ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>

          {product.image2 && (
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={product.image2}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          )}
        </Link>

        {/* Wishlist Button */}
        <button
          className="absolute right-3 top-3 h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
          aria-label="Add to wishlist"
        >
          <Heart className="h-5 w-5 text-gray-800" />
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-3 flex flex-col gap-1">
        {/* Brand */}
        {product.brand && (
          <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            {product.brand}
          </p>
        )}

        {/* Product Name */}
        <Link
          href={`/${product.gender}/${product.slug || product.id}`}
          className="text-sm text-gray-800 hover:underline line-clamp-2"
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="mt-1">
          <span className="text-lg font-bold text-black">
            £{product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
