"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FilterPage from "@/app/components/ui/FilterPage";
import { ProductGrid } from "@/app/components/ui/products/ProductGrid";
import { useCartModal } from "../context/CartModalcontext";
import { useFilteredProducts } from "../components/ui/products/useFilteredProducts";

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
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

interface WomenCollectionClientProps {
  womenCategory: Category[];
  products: Product[];
  allProducts: Product[];
  menProducts: Product[];
}

export default function WomenCollectionClient({
  womenCategory,
  products,
  allProducts,
  menProducts,
}: WomenCollectionClientProps) {
  const pathname = usePathname();
  const { selectedColor, setSelectedColor } = useCartModal();

  // 🧠 Determine category based on path
  const getCurrentCategory = () => {
    if (pathname?.toLowerCase().includes("/women")) return "women";
    if (pathname?.toLowerCase().includes("/men")) return "men";
    if (pathname?.toLowerCase().includes("/kids")) return "kids";
    if (pathname?.toLowerCase().includes("/sale")) return "sale";
    return "collection";
  };

  const category = getCurrentCategory();

  // 🎨 Use filtered products (based on selectedColor + category)
  const { filteredProducts, isLoading } = useFilteredProducts(
    category,
    selectedColor,
    products
  );

  const displayProducts = filteredProducts;

  // 🎯 Handle color filter change
  const handleColorFilter = (color: string | undefined) => {
    setSelectedColor(color);
  };

  return (
    <div className="bg-white border-2 pt-28">
      <div className="container mx-auto px-4">
        {/* 🧭 Breadcrumb */}
        <div className="text-sm text-center py-7 mb-8">
          <h1 className="text-black text-4xl mb-4">Women&apos;s Collection</h1>
          <Link href="/collection" className="hover:underline text-gray-600">
            Collection
          </Link>
          <span className="text-black">{pathname}</span>
        </div>

        {/* 🖼️ Horizontal Category Slider */}
        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-4 relative">
            {womenCategory?.length === 0
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-64 h-80 bg-gray-200 animate-pulse"
                  />
                ))
              : womenCategory.map((category) => (
                  <Link
                    key={category.id}
                    href={`/collection/${category.gender}/${category.slug}`}
                    className="flex-none"
                  >
                    <div className="relative w-64 h-80">
                      <Image
                        fill
                        src={category.image_url || "/fallback.jpg"}
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

        {/* 🎛️ Filter Section */}
        <FilterPage
          allProducts={allProducts}
          products={menProducts}
          womenProducts={products}
          onColorFilter={handleColorFilter}
          selectedColor={selectedColor}
          isLoading={isLoading}
        />

        {/* 🛍️ Product Grid */}
        <div className="mt-8 mb-16">
          {isLoading ? (
            <div className="flex justify-center py-10 text-gray-500">
              Loading products...
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="flex justify-center py-10 text-gray-600">
              {selectedColor
                ? `No products found with color: ${selectedColor}`
                : "No products found."}
            </div>
          ) : (
            <ProductGrid products={displayProducts} isLoading={false} />
          )}
        </div>
      </div>
    </div>
  );
}
