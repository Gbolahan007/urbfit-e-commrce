"use client";

import { useCartModal } from "@/app/context/CartModalcontext";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useProductsSearch } from "@/app/queries/useProductsSearch";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface SideSearchProps {
  setOnClickSearch: (value: boolean) => void;
}

const popularSearches = [
  { name: "Sneakers", route: "/shop/sneakers" },
  { name: "Jersey", route: "/shop/jersey" },
  { name: "Pants", route: "/shop/pants" },
  { name: "Hoodie", route: "/shop/hoodie" },
  { name: "Sweatshirt", route: "/shop/sweatshirt" },
];

function SideSearch({ setOnClickSearch }: SideSearchProps) {
  const router = useRouter();
  const { search, setSearch } = useCartModal();
  const debouncedSearch = useDebounce(search, 500);
  const { productsSearch, isLoading } = useProductsSearch(debouncedSearch);

  const handleResultClick = (gender: string, slug: string) => {
    router.push(`/${gender}/${slug}`);
    setOnClickSearch(false);
    setSearch("");
  };

  const handlePopularSearchClick = (route: string) => {
    router.push(route);
    setOnClickSearch(false);
    setSearch("");
  };

  const handleBackClick = () => {
    setOnClickSearch(false);
    setSearch("");
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="fixed left-0 top-0 z-[1000] h-screen w-full max-w-lg overflow-y-auto bg-white font-oswald text-black shadow-lg"
    >
      {/* Search Input with Back Icon */}
      <div className="border-b">
        <div className="relative flex items-center">
          <ArrowLeft
            onClick={handleBackClick}
            size={24}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black transition-colors"
          />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="w-full bg-slate-100 py-3 pl-14 pr-4 text-xl font-oswald text-black transition-all duration-300 placeholder:text-custom-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Search Results Section */}
      {search.trim() ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4"
        >
          <h2 className="mb-4 text-lg font-semibold">Search Results</h2>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
            </div>
          )}

          {/* Results */}
          {!isLoading && productsSearch && productsSearch.length > 0 && (
            <div className="space-y-3">
              {productsSearch.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleResultClick(item.gender, item.slug)}
                  className="cursor-pointer rounded-lg border border-gray-200 p-4 transition duration-200 hover:bg-gray-50 hover:border-black"
                >
                  <p className="font-semibold text-gray-900">{item.name}</p>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && productsSearch && productsSearch.length === 0 && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
              <p className="text-gray-600">
                No matching products found for{" "}
                <span className="font-semibold">&quot;{search}&quot;</span>
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Try searching with different keywords
              </p>
            </div>
          )}
        </motion.div>
      ) : (
        /* Popular Searches - Show when not searching */
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
          className="p-4"
        >
          <h2 className="mb-4 text-lg font-semibold">Popular Searches</h2>
          <div className="flex flex-wrap gap-3">
            {popularSearches.map((item) => (
              <button
                key={item.name}
                onClick={() => handlePopularSearchClick(item.route)}
                className="cursor-pointer rounded-md border border-black px-4 py-2 text-gray-700 transition duration-200 hover:bg-black hover:text-white"
              >
                {item.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default SideSearch;
