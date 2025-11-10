"use client";

import FilterPage from "@/app/components/ui/FilterPage";
import { ProductGrid } from "@/app/components/ui/products/ProductGrid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFilteredProducts } from "../components/ui/products/useFilteredProducts";
import { useCartModal } from "../context/CartModalcontext";

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

interface KidsCollectionClientProps {
  products: Product[];
  homeCategory: Category[];
  allProducts: Product[];
  womenProducts: Product[];
}

export default function KidsCollectionClient({
  products,
  allProducts,
  womenProducts,
}: KidsCollectionClientProps) {
  const pathname = usePathname();
  const { selectedColor, setSelectedColor } = useCartModal();

  const getCurrentCategory = () => {
    if (pathname?.toLowerCase().includes("/women")) return "women";
    if (pathname?.toLowerCase().includes("/men")) return "men";
    if (pathname?.toLowerCase().includes("/kids")) return "kids";
    if (pathname?.toLowerCase().includes("/sale")) return "sale";
    return "collection";
  };

  const category = getCurrentCategory();

  // Filter products based on selectedColor + category
  const { filteredProducts, isLoading } = useFilteredProducts(
    category,
    selectedColor,
    products
  );

  // Use filtered products for display
  const displayProducts = filteredProducts;

  const handleColorFilter = (color: string | undefined) => {
    setSelectedColor(color);
  };

  return (
    <div className="bg-white border-2 pt-28">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-center py-7 mb-8">
          <h1 className="text-black text-4xl mb-4">Kids&apos; Collection</h1>
          <Link href="/collection" className="hover:underline text-gray-600">
            Collection
          </Link>
          <span className="text-black">{pathname}</span>
        </div>

        {/* Filters */}
        <FilterPage
          allProducts={allProducts}
          products={products}
          womenProducts={womenProducts}
          onColorFilter={handleColorFilter}
          selectedColor={selectedColor}
          isLoading={isLoading}
        />

        {/* Products */}
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
