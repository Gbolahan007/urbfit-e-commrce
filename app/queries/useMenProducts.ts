import { useQuery } from "@tanstack/react-query";
import { getMenProducts } from "../_lib/data-service";

export function useMenProducts() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => getMenProducts(),
  });
  return { products };
}
