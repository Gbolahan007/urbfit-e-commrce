import { getProductsByBrand } from "@/app/_lib/data-service";
import ProductBrandGrid from "@/app/components/ui/ProductBrandGrid";

import { unstable_noStore } from "next/cache";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
interface BrandPageProps {
  params: {
    id: string;
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  unstable_noStore();

  const { brand, products, count } = await getProductsByBrand(params.id);
  console.log(params);
  const productsWithBrand = products.map((product) => ({
    ...product,
    brand: { ...brand },
  }));
  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black pt-28">
      {/* Brand Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{brand.name}</h1>
        <p className="text-gray-600">{count}+ products</p>
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="toggle" />
          <span>Next Day Delivery</span>
        </label>

        <select className="px-4 py-2 border rounded">
          <option>Category</option>
        </select>

        <select className="px-4 py-2 border rounded">
          <option>Style</option>
        </select>

        <select className="px-4 py-2 border rounded">
          <option>Size</option>
        </select>

        <select className="px-4 py-2 border rounded">
          <option>Colour</option>
        </select>

        <select className="ml-auto px-4 py-2 border rounded">
          <option>Sort: Relevance</option>
        </select>
      </div>

      <button className="text-blue-600 mb-6">Show more filters</button>

      {/* Product Grid */}
      {products.length > 0 ? (
        <ProductBrandGrid products={productsWithBrand} />
      ) : (
        <p className="text-center text-gray-500 py-12">
          No products found for this brand
        </p>
      )}
    </div>
  );
}
