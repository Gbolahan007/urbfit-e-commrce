import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../_lib/data-service";

export function useProducts() {
  const { data: products, isLoading: isLoadingCollection } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
  return { products, isLoadingCollection };
}
