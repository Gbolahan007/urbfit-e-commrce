// app/product/[id]/page.tsx
import { getProductDetail } from "@/app/_lib/data-service";
import ProductDetailClient from "./ProductDetailClient";

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProductDetail(params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Product not found</p>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
