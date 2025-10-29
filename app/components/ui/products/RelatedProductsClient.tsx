"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand?: string;
}

interface RelatedProductsClientProps {
  relatedProducts: Product[];
}

export default function RelatedProductsClient({
  relatedProducts,
}: RelatedProductsClientProps) {
  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8 text-black">
          You May Also Like
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/men/${product.slug}`}
              className="group flex flex-col"
            >
              <div className="relative w-full max-w-[300px] mx-auto aspect-[4/5] bg-gray-100 overflow-hidden mb-3">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 200px"
                />
              </div>

              <div className="space-y-1 w-full">
                {product.brand && (
                  <p className="text-sm font-medium text-gray-700">
                    {product.brand}
                  </p>
                )}
                <h3 className="text-sm text-black line-clamp-2 group-hover:underline">
                  {product.name}
                </h3>
                <p className="text-base font-semibold text-black">
                  £{product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
