import { useQuery } from "@tanstack/react-query";
import { getMenProducts } from "../_lib/data-service";

export function useMenProducts() {
  const { data: products, isLoading: isLoadingproducts } = useQuery({
    queryKey: ["products", "men"],
    queryFn: () => getMenProducts(),
  });
  return { products, isLoadingproducts };
}
