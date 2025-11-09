"use client";

import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  gender: string;
  slug: string;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductBrandGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <div key={product.id} className="group relative">
          <Link href={`/${product.gender}/${product.slug}`}>
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden transition-all duration-300">
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {product.category}
                </p>
                <h3 className="font-semibold text-gray-900 leading-tight line-clamp-2 min-h-[2.5rem]">
                  {product.name}
                </h3>
                <p className="text-xl font-bold text-gray-900 pt-1">
                  ${product.price}
                </p>
              </div>
            </div>
          </Link>

          {/* Heart Button - Outside Link to prevent nested interaction */}
          <button
            className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 z-10"
            onClick={(e) => {
              e.preventDefault();
              // Add your favorite logic here
            }}
          >
            <svg
              className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
