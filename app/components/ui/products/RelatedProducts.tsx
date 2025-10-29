import { getRelatedProducts } from "@/app/_lib/data-service";
import RelatedProductsClient from "./RelatedProductsClient";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  slug: string;
  image2?: string;
  category: string;
  gender: string;
}

export const revalidate = 300;

export default async function RelatedProducts({
  products,
}: {
  products: Product;
}) {
  const relatedProducts = await getRelatedProducts(
    products?.category,
    products?.slug
  );

  if (!relatedProducts || relatedProducts.length === 0) return null;

  return <RelatedProductsClient relatedProducts={relatedProducts} />;
}
