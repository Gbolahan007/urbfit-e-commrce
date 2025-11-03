import {
  getCategory,
  getMenProducts,
  getProducts,
  getWomenProducts,
} from "../_lib/data-service";
import MenCollectionClient from "./MenCollectionClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Page() {
  const [menProducts, homeCategory, allProducts, womenProducts] =
    await Promise.all([
      getMenProducts(),
      getCategory(),
      getProducts(),
      getWomenProducts(),
    ]);

  return (
    <MenCollectionClient
      products={menProducts}
      homeCategory={homeCategory}
      allProducts={allProducts}
      womenProducts={womenProducts}
    />
  );
}
