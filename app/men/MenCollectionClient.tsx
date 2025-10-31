"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FilterPage from "@/app/components/ui/FilterPage";
import { ProductGrid } from "@/app/components/ui/products/ProductGrid";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  gender: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  gender: string;
}

interface MenCollectionClientProps {
  products: Product[];
  homeCategory: Category[];
  allProducts: Product[];
  womenProducts: Product[];
}

export default function MenCollectionClient({
  products,
  homeCategory,
  allProducts,
  womenProducts,
}: MenCollectionClientProps) {
  const pathname = usePathname();

  return (
    <div className="bg-white border-2 pt-28">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-center py-7 mb-8">
          <h1 className="text-black text-4xl mb-4">Men&apos;s Collection</h1>
          <Link href="/collection" className="hover:underline text-gray-600">
            Collection
          </Link>
          <span className="text-black">{pathname}</span>
        </div>

        {/* Category Horizontal Slider */}
        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-4 relative">
            {homeCategory?.length === 0
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-64 h-80 bg-gray-200 animate-pulse"
                  />
                ))
              : homeCategory.map((category) => (
                  <Link
                    key={category.id}
                    href={`/collection/${category.gender}/${category.slug}`}
                    className="flex-none"
                  >
                    <div className="relative w-64 h-80">
                      <Image
                        fill
                        src={category.image || "/fallback.jpg"}
                        alt={category.name}
                        className="object-cover"
                      />
                    </div>
                    <p className="text-center text-black mt-2 text-lg">
                      {category.name}
                    </p>
                  </Link>
                ))}
          </div>
        </div>

        <FilterPage
          allProducts={allProducts}
          products={products}
          womenProducts={womenProducts}
        />

        {/* Products */}
        <div className="mt-8 mb-16">
          <ProductGrid products={products} isLoading={false} />
        </div>
      </div>
    </div>
  );
}
