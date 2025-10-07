import { useQuery } from "@tanstack/react-query";
import { getRelatedProducts } from "../_lib/data-service";

export function useRelatedProducts(category: string, slug: string) {
  const {
    isLoading: isLoadingRelatedProduct,
    data: relatedProducts = [],
    error,
  } = useQuery({
    queryKey: ["relatedProducts", category, slug],
    queryFn: () => getRelatedProducts(category, slug),
  });

  return { isLoadingRelatedProduct, relatedProducts, error };
}
