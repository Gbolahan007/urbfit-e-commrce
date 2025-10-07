"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { useProducts } from "../queries/useproducts";
import FilterPage from "../components/ui/FilterPage";

// ✅ Define Product Type
type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  image2?: string;
  category: string;
  gender: "men" | "women" | "kids" | "sale";
  type?: string;
};

export default function ProductCollection() {
  const { products, isLoadingCollection } = useProducts();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) newFavorites.delete(productId);
      else newFavorites.add(productId);
      return newFavorites;
    });
  };

  // 🧱 Skeleton Loader
  if (isLoadingCollection) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-200 rounded-xl mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 🧭 Empty State
  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">No products found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-24">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-extrabold text-center tracking-tight mb-8 text-gray-900">
            URBFIT CLOTHING
          </h1>
          <div className="flex sm:justify-center gap-4 overflow-auto whitespace-nowrap text-black">
            {[
              { text: "SHOP MEN", path: "/men" },
              { text: "SHOP WOMEN", path: "/women" },
              { text: "SHOP KIDS", path: "/kids" },
              { text: "SHOP SALE", path: "/sale" },
            ].map(({ text, path }) => (
              <Link
                key={text}
                href={path}
                className="px-8 py-3 border-2 border-black font-semibold hover:bg-black hover:text-white transition-all duration-300 hover:shadow-lg"
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <FilterPage />

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product: Product, index: number) => (
            <div
              key={product.id}
              className="group bg-white hover:border border-black hover:-translate-y-2 transition-all duration-300"
            >
              <Link
                href={`/${product.gender}/${product.slug}`}
                className="block relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4 cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* First Image */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    hoveredProduct === product.id && product.image2
                      ? "opacity-0"
                      : "opacity-100"
                  }`}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={index < 4}
                  />
                </div>

                {/* Second Image */}
                {product.image2 && (
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      hoveredProduct === product.id
                        ? "opacity-100"
                        : "opacity-0"
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

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(product.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform z-10"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-700"
                    }`}
                  />
                </button>

                {/* Quick Add to Cart */}
                <button className="absolute bottom-3 left-3 right-3 py-3 bg-black text-white font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base">
                  <ShoppingCart className="w-4 h-4" />
                  Quick Add
                </button>
              </Link>

              {/* Product Info */}
              <div className="space-y-1 px-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {product.gender}&apos;s {product.category}
                </p>
                <Link
                  href={`/${product.gender}/${product.slug}`}
                  className="block font-semibold text-gray-900 group-hover:underline cursor-pointer text-sm sm:text-base"
                >
                  {product.name}
                </Link>
                <p className="font-bold text-gray-900">${product.price}.00</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
