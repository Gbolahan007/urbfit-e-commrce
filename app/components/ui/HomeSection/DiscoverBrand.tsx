import { getBrands } from "@/app/_lib/data-service";
import HomeDiscoverBrandClient from "./HomeDiscoverBrandClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function DiscoverBrand() {
  const brands = await getBrands();

  return <HomeDiscoverBrandClient brands={brands} />;
}
