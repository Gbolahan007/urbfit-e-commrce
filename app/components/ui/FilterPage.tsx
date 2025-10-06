"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useMenProducts } from "@/app/queries/useMenProducts";

export default function FilterPage() {
  const [showAllFilters, setShowAllFilters] = useState(false);
  const { products } = useMenProducts();

  return (
    <div className="text-black flex items-center justify-center py-12 bg-white">
      <div className="mx-auto max-w-7xl w-full">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
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
                New In ({products?.length})
              </label>
            </div>

            {/* Buttons */}
            <button className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 bg-transparent hover:bg-gray-100">
              Colour
              <ChevronDown className="h-4 w-4" />
            </button>

            <button className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 bg-transparent hover:bg-gray-100">
              Size
              <ChevronDown className="h-4 w-4" />
            </button>

            <button className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 bg-transparent hover:bg-gray-100">
              Length
              <ChevronDown className="h-4 w-4" />
            </button>

            <button className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 bg-transparent hover:bg-gray-100">
              Fit
              <ChevronDown className="h-4 w-4" />
            </button>

            <button className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 bg-transparent hover:bg-gray-100">
              Style
              <ChevronDown className="h-4 w-4" />
            </button>

            <button
              onClick={() => setShowAllFilters(!showAllFilters)}
              className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 bg-transparent font-semibold hover:bg-gray-100"
            >
              {showAllFilters ? "LESS" : "MORE"}
              <SlidersHorizontal className="h-4 w-4" />
            </button>

            <button className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 bg-transparent hover:bg-gray-100">
              Sort
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Additional Rows - Collapsible */}
          {showAllFilters && (
            <>
              {/* Second Row */}
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

              {/* Third Row */}
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

          {/* Clear All Filters */}
          <div className="flex justify-center">
            <button className="text-sm text-black underline hover:text-gray-700">
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
