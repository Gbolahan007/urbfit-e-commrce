import { getCategory, getMenProducts } from "../_lib/data-service";
import MenCollectionClient from "./MenCollectionClient";

export const revalidate = 600; // Revalidate every 10 mins (ISR)

export default async function Page() {
  const [products, homeCategory] = await Promise.all([
    getMenProducts(),
    getCategory(),
  ]);

  return (
    <MenCollectionClient products={products} homeCategory={homeCategory} />
  );
}
