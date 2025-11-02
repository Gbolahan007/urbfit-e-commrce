"use client";

import Image from "next/image";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductBrandGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative group bg-white text-black rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-3"
        >
          {/* Image Container */}
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Heart Button */}
            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
              <svg
                className="w-5 h-5 text-black"
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

          {/* Product Info */}
          <div className="mt-3">
            <p className="text-sm text-gray-600">{product.category}</p>
            <h3 className="font-semibold leading-tight line-clamp-1">
              {product.name}
            </h3>
            <p className="text-lg font-bold mt-1">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
