"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { useCartStore } from "../cart/store";
import { useCartModal } from "../context/CartModalcontext";
import { usePathname } from "next/navigation";
import FilterPage from "../components/ui/FilterPage";
import { useFilteredProducts } from "../components/ui/products/useFilteredProducts";

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  image2?: string | null;
  category: string;
  category_id?: number;
  gender: "men" | "women" | "kids" | "sale";
  brands?: string;
  colour?: string | null;
  is_top_picks?: boolean | null;
  is_trending?: boolean | null;
  created_at?: string;
}

export default function ProductCollection({
  products: initialProducts,
}: {
  products: Product[];
}) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const addItem = useCartStore((state) => state.addItem);
  const { openModal, selectedColor, setSelectedColor } = useCartModal();
  const pathname = usePathname();

  const getCurrentCategory = () => {
    if (pathname?.toLowerCase().includes("/women")) return "women";
    if (pathname?.toLowerCase().includes("/men")) return "men";
    if (pathname?.toLowerCase().includes("/kids")) return "kids";
    if (pathname?.toLowerCase().includes("/sale")) return "sale";
    return "collection";
  };

  const category = getCurrentCategory();

  //  Use client-side filtering hook
  const { filteredProducts, isLoading } = useFilteredProducts(
    category,
    selectedColor,
    initialProducts
  );

  //  Always use filteredProducts (it handles the logic internally)
  const displayProducts = filteredProducts;

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) newFavorites.delete(productId);
      else newFavorites.add(productId);
      return newFavorites;
    });
  };

  const handleAdd = (product: Product) => {
    addItem({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      selectedSize: "M",
    });
    openModal();
  };

  const handleColorFilter = (color: string | undefined) => {
    setSelectedColor(color);
  };

  if (!displayProducts || displayProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">
          {selectedColor
            ? `No products found with color: ${selectedColor}`
            : "No products found."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-28">
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

      <FilterPage
        allProducts={initialProducts.map((p) => ({
          ...p,
          id: String(p.id),
        }))}
        products={[]}
        womenProducts={[]}
        onColorFilter={handleColorFilter}
        selectedColor={selectedColor}
        isLoading={isLoading}
      />

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white hover:border border-black hover:-translate-y-2 transition-all duration-300"
            >
              {/* Clickable image area */}
              <Link
                href={`/${product.gender}/${product.slug}`}
                className="block relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4 cursor-pointer"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
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

                {/* Quick Add Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAdd(product);
                  }}
                  className="absolute bottom-3 left-3 right-3 py-3 bg-black text-white font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base"
                >
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

      <div className="mt-12 text-center">
        <a
          href="#"
          className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Back to Top
        </a>
      </div>
    </div>
  );
}
