import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../_lib/data-service";

export function useHomeBrands() {
  const { data: homeBrands } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
  });
  return { homeBrands };
}
