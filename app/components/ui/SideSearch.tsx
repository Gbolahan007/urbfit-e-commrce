"use client";

import { motion } from "framer-motion";
import Input from "./Input";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface SideSearchProps {
  setOnClickSearch: (value: boolean) => void;
}

function SideSearch({ setOnClickSearch }: SideSearchProps) {
  const router = useRouter();
  const items = ["Sneakers", "Jersey", "Pants", "Hoodie", "Sweatshirt"];

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="fixed top-0 left-0 z-[1000] h-screen w-full max-w-lg bg-white font-oswald text-black shadow-lg"
    >
      {/* Search Input with Back Icon */}
      <div className="border-b">
        <Input
          onClick={() => setOnClickSearch(false)}
          type="box"
          icon={ArrowLeft}
          width="72"
        />
      </div>

      {/* Suggested Searches */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
        className="p-2"
      >
        <h2 className="text-lg font-semibold mb-4">Popular Searches</h2>
        <div className="flex flex-wrap gap-3">
          {items.map((item) => (
            <button
              key={item}
              onClick={() => router.push(`/collection/${item.toLowerCase()}`)}
              className="cursor-pointer border border-black px-3 py-1 text-gray-700 hover:text-black transition duration-200 rounded-md"
            >
              {item}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SideSearch;
