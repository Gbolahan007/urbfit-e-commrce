import { useQuery } from "@tanstack/react-query";
import { getTopPicks } from "../_lib/data-service";

export function useTopPicks() {
  const { data: useTopPick } = useQuery({
    queryKey: ["products", "top-picks"],
    queryFn: () => getTopPicks(),
  });
  return { useTopPick };
}
