import { getBrands } from "@/app/_lib/data-service";
import HomeDiscoverBrandClient from "./HomeDiscoverBrandClient";

export const revalidate = 600;

export default async function DiscoverBrand() {
  const brands = await getBrands();

  return <HomeDiscoverBrandClient brands={brands} />;
}
