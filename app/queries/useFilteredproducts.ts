/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from "@tanstack/react-query";
import { getFilteredProducts } from "../_lib/data-service";

export function useFilteredProducts(
  category: string,
  selectedColor: string | undefined,
  initialProducts: any[]
) {
  const { data, isLoading } = useQuery({
    queryKey: ["filtered-products", category, selectedColor],
    queryFn: () => getFilteredProducts(category, selectedColor),
    enabled: !!selectedColor,
    staleTime: 0,
  });

  return {
    filteredProducts: data ?? initialProducts,
    isLoading,
  };
}
