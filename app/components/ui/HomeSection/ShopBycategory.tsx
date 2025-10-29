import { getCategory } from "@/app/_lib/data-service";
import ShopByCategoryClient from "./ShopByCategoryClient";

export const revalidate = 300;

export default async function ShopByCategory() {
  const homeCategory = await getCategory();

  return <ShopByCategoryClient homeCategory={homeCategory} />;
}
