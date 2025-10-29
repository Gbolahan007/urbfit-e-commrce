import { useQuery } from "@tanstack/react-query";
import { getWomenProducts } from "../_lib/data-service";

export function useWomenProducts() {
  const { data: products, isLoading: isLoadingwomenProduct } = useQuery({
    queryKey: ["products", "women"],
    queryFn: () => getWomenProducts(),
  });
  return { products, isLoadingwomenProduct };
}
