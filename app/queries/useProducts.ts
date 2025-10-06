import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../_lib/data-service";

export function useProducts() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  return { products };
}
