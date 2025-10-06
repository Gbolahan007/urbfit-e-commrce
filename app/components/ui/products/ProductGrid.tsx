"use client";

import { ProductCard } from "./ProductCard";

interface Product {
  id: string | number;
  name: string;
  brand?: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  slug?: string;
  isOnSale?: boolean;
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-muted-foreground text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
