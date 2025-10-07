"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "../_lib/data-service";

export default function useProductDetail(slug: string) {
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductDetail(slug),
    enabled: !!slug,
  });

  return { product, isLoading };
}
