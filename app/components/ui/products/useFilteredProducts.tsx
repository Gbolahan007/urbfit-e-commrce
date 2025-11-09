/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";

export function useFilteredProducts(
  category: string,
  selectedColor: string | undefined,
  initialProducts: any[]
) {
  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];

    // Filter by category (gender)
    if (category && category !== "collection") {
      filtered = filtered.filter(
        (product) => product.gender?.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by color
    if (selectedColor) {
      filtered = filtered.filter(
        (product) =>
          product.colour?.toLowerCase() === selectedColor.toLowerCase()
      );
    }

    return filtered;
  }, [initialProducts, category, selectedColor]);

  return {
    filteredProducts,
    isLoading: false,
  };
}
