"use client";

import { useCartModal } from "@/app/context/CartModalcontext";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useProductsSearch } from "@/app/queries/useProductsSearch";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface DropDownSearchProps {
  setDropSearch: (value: boolean) => void;
}

const popularSearches = [
  { name: "Sneakers", route: "/shop/sneakers" },
  { name: "Jersey", route: "/shop/jersey" },
  { name: "Pants", route: "/shop/shirts" },
  { name: "Hoodie", route: "/shop/trousers" },
  { name: "Sweatshirt", route: "/shop/sweatshirt" },
];

function DropDownSearch({ setDropSearch }: DropDownSearchProps) {
  const router = useRouter();
  const { search, setSearch } = useCartModal();
  const debouncedSearch = useDebounce(search, 500);
  const { productsSearch, isLoading } = useProductsSearch(debouncedSearch);

  const handleResultClick = (gender: string, slug: string) => {
    router.push(`/${gender}/${slug}`);
    setDropSearch(false);
    setSearch("");
  };

  const handlePopularSearchClick = (route: string) => {
    router.push(route);
    setDropSearch(false);
    setSearch("");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={() => {
          setDropSearch(false);
          setSearch("");
        }}
      ></div>

      {/* DropDown Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute left-[-180%] top-10 z-50 h-[550px] w-[280%] max-h-screen overflow-auto bg-white p-6 shadow-lg"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setDropSearch(false);
            setSearch("");
          }}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 transition duration-200 hover:bg-gray-300"
          aria-label="Close search dropdown"
        >
          <X className="h-6 w-6 text-gray-700" />
        </button>

        {/* Modal Content */}
        <h1 className="mb-4 text-xl font-bold text-gray-800">
          What are you buying?
        </h1>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 transition-all duration-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            autoFocus
          />
        </div>

        {/* Search Results Section */}
        {search.trim() && (
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-800">
              Search Results
            </h2>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
              </div>
            )}

            {/* Results */}
            {!isLoading && productsSearch && productsSearch.length > 0 && (
              <div className="space-y-2">
                {productsSearch.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleResultClick(item.gender, item.slug)}
                    className="cursor-pointer rounded-lg border border-gray-200 p-4 transition duration-200 hover:bg-gray-50"
                  >
                    <p className="font-medium text-gray-800">{item.name}</p>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && productsSearch && productsSearch.length === 0 && (
              <div className="rounded-lg border border-gray-200 p-6 text-center">
                <p className="text-sm text-gray-500">
                  No matching products found for &rdquo;{search}&rdquo;
                </p>
              </div>
            )}
          </div>
        )}

        {/* Popular Searches - Show only when not searching */}
        {!search.trim() && (
          <div className="mt-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-800">
              Popular Searches
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {popularSearches.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handlePopularSearchClick(item.route)}
                  className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition duration-200 hover:bg-gray-200"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default DropDownSearch;
