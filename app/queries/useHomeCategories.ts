import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../_lib/data-service";

export function useHomeCategories() {
  const { data: homeCategory } = useQuery({
    queryKey: ["subCategory"],
    queryFn: () => getCategory(),
  });
  return { homeCategory };
}
