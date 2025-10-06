import { useQuery } from "@tanstack/react-query";
import { getwomenProducts } from "../_lib/data-service";

export function useWomenProducts() {
  const { data: products, isLoading: isLoadingwomenProduct } = useQuery({
    queryKey: ["products", "women"],
    queryFn: () => getwomenProducts(),
  });
  return { products, isLoadingwomenProduct };
}
