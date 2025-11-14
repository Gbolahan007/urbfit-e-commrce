"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { useCartStore } from "../cart/store";
import { useCartModal } from "../context/CartModalcontext";
import { usePathname } from "next/navigation";
import FilterPage from "../components/ui/FilterPage";
import { useFilteredProducts } from "../components/ui/products/useFilteredProducts";
import { toast } from "sonner";

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

const PRODUCTS_PER_PAGE = 12;

export default function ProductCollection({
  products: initialProducts,
}: {
  products: Product[];
}) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [displayCount, setDisplayCount] = useState(PRODUCTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);
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

  const { filteredProducts, isLoading } = useFilteredProducts(
    category,
    selectedColor,
    initialProducts
  );

  const displayProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          // Simulate loading delay for smooth UX
          setTimeout(() => {
            setDisplayCount((prev) =>
              Math.min(prev + PRODUCTS_PER_PAGE, filteredProducts.length)
            );
            setIsLoadingMore(false);
          }, 300);
        }
      },
      {
        rootMargin: "400px", // Start loading before reaching the bottom
        threshold: 0.1,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, filteredProducts.length]);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(PRODUCTS_PER_PAGE);
  }, [selectedColor, category]);

  const toggleFavorite = useCallback((productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  }, []);

  const handleAdd = useCallback(
    (product: Product) => {
      addItem({
        id: String(product.id),
        name: product.name,
        price: product.price,
        image: product.image,
        selectedSize: "M",
      });

      toast.success(`Added ${product.name} to your cart!`, {
        duration: 2000,
      });

      openModal();
    },
    [addItem, openModal]
  );

  const handleColorFilter = (color: string | undefined) => {
    setSelectedColor(color);
  };

  if (!filteredProducts || filteredProducts.length === 0) {
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
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              hoveredProduct={hoveredProduct}
              setHoveredProduct={setHoveredProduct}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              handleAdd={handleAdd}
            />
          ))}
        </div>

        {/* Loading indicator and observer trigger */}
        {hasMore && (
          <div
            ref={loadMoreRef}
            className="flex justify-center items-center py-8 mt-8"
          >
            {isLoadingMore && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                <span className="text-gray-600">Loading more products...</span>
              </div>
            )}
          </div>
        )}

        {!hasMore && displayProducts.length > PRODUCTS_PER_PAGE && (
          <div className="text-center py-8 mt-8">
            <p className="text-gray-600">
              You&rsquo;ve reached the end! Showing all{" "}
              {filteredProducts.length} products.
            </p>
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Back to Top
        </button>
      </div>
    </div>
  );
}

const ProductCard = React.memo(
  ({
    product,
    index,
    hoveredProduct,
    setHoveredProduct,
    favorites,
    toggleFavorite,
    handleAdd,
  }: {
    product: Product;
    index: number;
    hoveredProduct: number | null;
    setHoveredProduct: (id: number | null) => void;
    favorites: Set<number>;
    toggleFavorite: (id: number) => void;
    handleAdd: (product: Product) => void;
  }) => {
    return (
      <div className="group bg-white hover:border border-black hover:-translate-y-2 transition-all duration-300">
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
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading={index < 8 ? "eager" : "lazy"}
              priority={index < 4}
            />
          </div>

          {product.image2 && (
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                hoveredProduct === product.id ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={product.image2}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
              />
            </div>
          )}

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
    );
  }
);

ProductCard.displayName = "ProductCard";
