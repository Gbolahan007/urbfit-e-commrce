import { getWomenCategory, getWomenProducts } from "@/app/_lib/data-service";
import WomenCollectionClient from "./WomenCollectionClient";

export const revalidate = 600;

export default async function Page() {
  const [womenCategory, products] = await Promise.all([
    getWomenCategory(),
    getWomenProducts(),
  ]);

  return (
    <WomenCollectionClient womenCategory={womenCategory} products={products} />
  );
}
