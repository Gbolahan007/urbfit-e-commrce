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

  const products = await getProductsByBrand(params.id);
  console.log(products);

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black pt-28">
      {/* Brand Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 capitalize">{params.id}</h1>
        <p className="text-gray-600">{products.length}+ products</p>
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap gap-4 mb-6">
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

      {/* Product Grid */}
      {products.length > 0 ? (
        <ProductBrandGrid products={products} />
      ) : (
        <p className="text-center text-gray-500 py-12">
          No products found for this brand
        </p>
      )}
    </div>
  );
}
