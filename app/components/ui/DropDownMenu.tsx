"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownMenuProps {
  category: "Men" | "Women" | "Kids" | "Brands";
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
  },
  Women: {
    Shoes: ["Running Shoes", "Heels", "Flats", "Sneakers", "Gym & Training"],
    Clothing: ["T-Shirts", "Leggings", "Dresses", "Sweatshirts"],
    Accessories: ["Bags", "Scarves", "Jewelry"],
    Sport: ["Yoga", "Tennis", "Running"],
  },
  Kids: {
    Shoes: ["Sneakers", "Sandals", "Boots"],
    "Boys Clothing": ["T-Shirts", "Shorts", "Hoodies"],
    "Girls Clothing": ["Dresses", "Leggings", "Jackets"],
    "Back to School": ["Backpacks", "Lunch Boxes", "School Shoes"],
  },
  Brands: {
    "Fashion Brands": [
      "Gap",
      "FatFace",
      "Joules",
      "Boden",
      "Next",
      "H&M",
      "Zara",
      "Boohoo",
      "ASOS",
    ],
    "Top Designer Brands": [
      "Calvin Klein",
      "Tommy Hilfiger",
      "Lacoste",
      "Phase Eight",
      "Fred Perry",
      "Skopes",
      "Ralph Lauren",
      "Superdry",
      "Off-White",
      "Burberry",
    ],
    "Sport Brands": [
      "Nike",
      "Adidas",
      "Puma",
      "Under Armour",
      "New Balance",
      "Vans",
    ],
    "Top Beauty Brands": [
      "Tom Ford",
      "The Ordinary",
      "Clinique",
      "Dior",
      "Charlotte Tilbury",
      "Fenty Beauty",
    ],
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
        className="fixed left-0 top-[4.7rem] w-full bg-white shadow-lg p-6 mt-7 max-h-screen overflow-auto z-[999]"
      >
        <div className="flex justify-around gap-12 items-start mt-4 flex-wrap">
          {Object.entries(menuItems[category] || {}).map(([heading, items]) => (
            <div key={heading} className="min-w-[150px]">
              <h4 className="text-black mb-2 uppercase whitespace-nowrap">
                {heading}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${
                        category === "Brands" ? "brands" : "collection"
                      }/${item.toLowerCase().replace(/\s/g, "-")}`}
                      className="hover:underline text-xs text-black"
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
