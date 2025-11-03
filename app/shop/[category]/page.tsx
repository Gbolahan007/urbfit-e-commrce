import { getProductsByBrandId } from "@/app/_lib/data-service";
import ProductBrandCollection from "./ProductBrandCollection";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface BrandPageProps {
  params: {
    category: string;
  };
}

export default async function ProductBrand({ params }: BrandPageProps) {
  const category = await getProductsByBrandId(params.category);
  return <ProductBrandCollection categoryData={category} />;
}
