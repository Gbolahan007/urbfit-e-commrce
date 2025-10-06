import { useQuery } from "@tanstack/react-query";
import { getWomenCategory } from "../_lib/data-service";

export function useWomenCategories() {
  const { data: womenCategory, isLoading: womenCategoryLoading } = useQuery({
    queryKey: ["subCategory", "women"],
    queryFn: () => getWomenCategory(),
  });
  return { womenCategory, womenCategoryLoading };
}
