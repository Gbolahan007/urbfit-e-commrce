import {
  getMenProducts,
  getProducts,
  getWomenCategory,
  getWomenProducts,
} from "@/app/_lib/data-service";
import WomenCollectionClient from "./WomenCollectionClient";

export const revalidate = 600;

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
