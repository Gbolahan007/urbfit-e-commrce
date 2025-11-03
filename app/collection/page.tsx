import { getProducts } from "../_lib/data-service";
import ProductCollection from "./ProductCollection";
import { unstable_noStore } from "next/cache";

export const revalidate = 0;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Page() {
  unstable_noStore();

  const products = await getProducts();

  return <ProductCollection products={products} />;
}
