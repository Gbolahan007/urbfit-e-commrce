import { useQuery } from "@tanstack/react-query";
import { getTrendingNew } from "../_lib/data-service";

export function useTrendingNew() {
  const { data: useTrending } = useQuery({
    queryKey: ["products", "trending"],
    queryFn: () => getTrendingNew(),
  });
  return { useTrending };
}
