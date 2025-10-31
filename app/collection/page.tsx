import { getProducts } from "../_lib/data-service";
import ProductCollection from "./ProductCollection";

export default async function Page() {
  const products = await getProducts();

  return <ProductCollection products={products} />;
}
