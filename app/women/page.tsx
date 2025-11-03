import {
  getMenProducts,
  getProducts,
  getWomenCategory,
  getWomenProducts,
} from "@/app/_lib/data-service";
import WomenCollectionClient from "./WomenCollectionClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Page() {
  const [womenCategory, products, allProducts, menProducts] = await Promise.all(
    [getWomenCategory(), getWomenProducts(), getProducts(), getMenProducts()]
  );

  return (
    <WomenCollectionClient
      womenCategory={womenCategory}
      products={products}
      allProducts={allProducts}
      menProducts={menProducts}
    />
  );
}
