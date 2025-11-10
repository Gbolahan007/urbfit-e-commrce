import {
  getCategory,
  getKidsProducts,
  getProducts,
  getWomenProducts,
} from "../_lib/data-service";
import KidsCollectionClient from "./KidsCollectionClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Page() {
  const [kidsProducts, homeCategory, allProducts, womenProducts] =
    await Promise.all([
      getKidsProducts(),
      getCategory(),
      getProducts(),
      getWomenProducts(),
    ]);

  return (
    <KidsCollectionClient
      products={kidsProducts}
      homeCategory={homeCategory}
      allProducts={allProducts}
      womenProducts={womenProducts}
    />
  );
}
