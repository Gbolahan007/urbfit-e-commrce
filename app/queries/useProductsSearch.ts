import { useQuery } from "@tanstack/react-query";
import { fetchProductsBySearch } from "../_lib/data-service";

export function useProductsSearch(search: string) {
  const { data: productsSearch, isLoading } = useQuery({
    queryKey: ["products", search],
    queryFn: () => fetchProductsBySearch(search),
    placeholderData: (prev) => prev,

    enabled: search.length >= 2,
    staleTime: 1000 * 60,
  });

  return { productsSearch, isLoading };
}
