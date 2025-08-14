"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface DropDownSearchProps {
  setDropSearch: (value: boolean) => void;
}

const popularSearches = [
  { name: "Sneakers", route: "/products/sneakers" },
  { name: "Jersey", route: "/products/jersey" },
  { name: "Pants", route: "/products/pants" },
  { name: "Hoodie", route: "/products/hoodie" },
  { name: "Sweatshirt", route: "/products/sweatshirt" },
];

function DropDownSearch({ setDropSearch }: DropDownSearchProps) {
  const router = useRouter();

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setDropSearch(false)}
      ></div>

      {/* DropDown Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute left-[-180%] top-10 w-[280%] h-[550px] bg-white shadow-lg p-6 max-h-screen overflow-auto z-50"
      >
        {/* Close Button */}
        <button
          onClick={() => setDropSearch(false)}
          className="absolute right-4 top-4 flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200"
          aria-label="Close search dropdown"
        >
          <X className="text-gray-700 w-6 h-6" />
        </button>

        {/* Modal Content */}
        <h1 className="text-xl font-bold mb-4">What are you buying?</h1>

        {/* Popular Searches */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Popular Searches</h2>
          <div className="grid grid-cols-2 gap-3">
            {popularSearches.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  router.push(item.route);
                  setDropSearch(false); // Close modal after navigating
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition duration-200 rounded-md text-sm font-medium text-gray-800"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default DropDownSearch;
