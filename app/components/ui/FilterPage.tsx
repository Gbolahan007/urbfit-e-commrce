"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Product {
  id: string | number;
  name: string;
  image: string;
  price: number;
  category: string;
  gender: string;
  colour?: string | null;
}

interface FilterPageProps {
  allProducts: Product[];
  products: Product[];
  womenProducts: Product[];
  onColorFilter: (color: string | undefined) => void;
  selectedColor: string | undefined;

  isLoading?: boolean;
}

export default function FilterPage({
  allProducts,
  products: menProducts,
  womenProducts,
  onColorFilter,
  selectedColor,
  isLoading = false,
}: FilterPageProps) {
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const pathname = usePathname();

  const isWomenPage = pathname?.toLowerCase().includes("/women");
  const isMenPage = pathname?.toLowerCase().includes("/men");
  const isCollectionPage = pathname?.toLowerCase().includes("/collection");

  const count = isMenPage
    ? menProducts?.length
    : isWomenPage
    ? womenProducts?.length
    : isCollectionPage
    ? allProducts?.length
    : menProducts?.length;

  // Extract unique colors from products
  const availableColors = Array.from(
    new Set(
      allProducts
        .map((p) => p.colour)
        .filter((colour): colour is string => !!colour)
    )
  );

  const handleColorSelect = (color: string | undefined) => {
    if (selectedColor === color) {
      onColorFilter(undefined);
    } else {
      onColorFilter(color);
    }
    setShowColorDropdown(false);
  };

  const clearAllFilters = () => {
    onColorFilter(undefined);
  };

  return (
    <div className="text-black flex items-center justify-center py-10 bg-white relative z-20">
      <div className="mx-auto max-w-7xl w-full px-4">
        <div className="space-y-4">
          {/* --- Top Row --- */}
          <div className="flex flex-wrap items-center justify-center gap-3 relative">
            {/* Checkbox */}
            <div className="flex items-center gap-2">
              <input
                id="new-in"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-400 text-black focus:ring-2 focus:ring-black"
              />
              <label
                htmlFor="new-in"
                className="text-sm font-medium leading-none"
              >
                New In ({count})
              </label>
            </div>

            {/* Color Filter */}
            <div className="relative z-50">
              <button
                onClick={() => setShowColorDropdown((prev) => !prev)}
                className={`flex items-center gap-2 border rounded px-3 py-1 bg-transparent hover:bg-gray-100 transition ${
                  selectedColor
                    ? "border-black bg-gray-100 font-semibold"
                    : "border-gray-300"
                }`}
                disabled={isLoading}
              >
                {selectedColor || "Colour"}
                <ChevronDown className="h-4 w-4" />
              </button>

              {showColorDropdown && (
                <div
                  className="absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded-md shadow-xl z-[9999] 
                  min-w-[200px] max-h-[300px] overflow-y-auto"
                >
                  {availableColors.length > 0 ? (
                    availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition ${
                          selectedColor === color
                            ? "bg-gray-100 font-semibold"
                            : ""
                        }`}
                      >
                        {color}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 px-4 py-2">
                      No colors available
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Other Filters */}
            {["Size", "Fit", "Style", "Sort"].map((item) => (
              <button
                key={item}
                className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 bg-transparent hover:bg-gray-100"
              >
                {item}
                <ChevronDown className="h-4 w-4" />
              </button>
            ))}

            {isWomenPage && (
              <button className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 bg-transparent hover:bg-gray-100">
                Dress Length
                <ChevronDown className="h-4 w-4" />
              </button>
            )}

            {/* Show More / Less */}
            <button
              onClick={() => setShowAllFilters(!showAllFilters)}
              className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 bg-transparent font-semibold hover:bg-gray-100"
            >
              {showAllFilters ? "LESS" : "MORE"}
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>

          {/* --- Additional Filters --- */}
          {showAllFilters && (
            <>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  "Brand",
                  "Material",
                  "Use",
                  "Plus Size & Tall",
                  "Category",
                  "Range",
                  "Offer",
                  "Waitlisting",
                ].map((item) => (
                  <button
                    key={item}
                    className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 bg-transparent hover:bg-gray-100"
                  >
                    {item}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {["Benefit", "Price"].map((item) => (
                  <button
                    key={item}
                    className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 bg-transparent hover:bg-gray-100"
                  >
                    {item}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Clear Filters */}
          <div className="flex justify-center">
            <button
              onClick={clearAllFilters}
              className="text-sm text-black underline hover:text-gray-700 disabled:opacity-50"
              disabled={!selectedColor || isLoading}
            >
              Clear All Filters
            </button>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-center">
              <p className="text-sm text-gray-500">Filtering products...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
