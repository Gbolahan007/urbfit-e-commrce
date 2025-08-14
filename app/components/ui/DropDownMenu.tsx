"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownMenuProps {
  category: "Men" | "Women" | "Kids";
}

const menuItems = {
  Men: {
    Shoes: [
      "Running Shoes",
      "Sport Shoes",
      "Slides",
      "Sneakers",
      "Gym & Training",
    ],
    Clothing: ["T-Shirts", "Joggers", "Sweatshirts", "Shorts", "Swimwear"],
    Accessories: ["Caps", "Bags", "Socks"],
    Sport: ["Basketball", "Football", "Tennis"],
    Brands: ["Nike", "Adidas", "Puma", "Reebok"],
  },
  Women: {
    Shoes: ["Running Shoes", "Heels", "Flats", "Sneakers", "Gym & Training"],
    Clothing: ["T-Shirts", "Leggings", "Dresses", "Sweatshirts"],
    Accessories: ["Bags", "Scarves", "Jewelry"],
    Sport: ["Yoga", "Tennis", "Running"],
    Brands: ["Nike", "Adidas", "Under Armour"],
  },
  Kids: {
    Shoes: ["Sneakers", "Sandals", "Boots"],
    "Boys Clothing": ["T-Shirts", "Shorts", "Hoodies"],
    "Girls Clothing": ["Dresses", "Leggings", "Jackets"],
    "Back to School": ["Backpacks", "Lunch Boxes", "School Shoes"],
  },
};

function DropdownMenu({ category }: DropdownMenuProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed left-0 top-[4.7rem] w-full bg-white shadow-lg p-6 max-h-screen overflow-auto"
      >
        <div className="flex items-start justify-around gap-12 mt-4 flex-wrap">
          {Object.entries(menuItems[category] || {}).map(([heading, items]) => (
            <div key={heading} className="min-w-[150px]">
              <h4 className="bold mb-2 uppercase whitespace-nowrap">
                {heading}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/products/${item
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                      className="hover:underline text-xs text-black"
                      legacyBehavior={false}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DropdownMenu;
