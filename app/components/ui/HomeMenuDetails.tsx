"use client";

import { User, Menu } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { Search } from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Input from "./Input";
import DropDownSearch from "./DropDownSearch";
import SideSearch from "./SideSearch";
import HamburgerMenu from "./HamburgerMenu";

interface HomeMenuDetailsProps {
  scrolled: boolean;
}

function HomeMenuDetails({ scrolled }: HomeMenuDetailsProps) {
  const router = useRouter();
  const [dropSearch, setDropSearch] = useState(false);
  const [onClickSearch, setOnClickSearch] = useState(false);
  const [hamburgerMenuModal, setHamburgerMenuModal] = useState(false);

  function handleDropDownSearch() {
    setDropSearch(true);
  }
  function handleSideSearch() {
    setOnClickSearch(true);
  }
  function handleHamburgerMenu() {
    setHamburgerMenuModal(true);
  }

  const iconColor = scrolled ? "text-black" : "text-white";

  return (
    <div className="flex items-center p-1 justify-center">
      <ul className="flex items-center justify-center gap-3">
        <li className="relative">
          <motion.div className="hidden sm:block">
            <div onClick={handleDropDownSearch}>
              <Input />
            </div>

            <AnimatePresence>
              {dropSearch && <DropDownSearch setDropSearch={setDropSearch} />}
            </AnimatePresence>
          </motion.div>

          <motion.div className={`sm:hidden cursor-pointer ${iconColor}`}>
            <div onClick={handleSideSearch}>
              <Search size={28} />
            </div>

            <AnimatePresence>
              {onClickSearch && (
                <SideSearch setOnClickSearch={setOnClickSearch} />
              )}
            </AnimatePresence>
          </motion.div>
        </li>

        <li>
          <button onClick={() => router.push("/login")} className={iconColor}>
            <User size={30} />
          </button>
        </li>

        <li>
          <button
            onClick={() => router.push("/cart")}
            className="relative cursor-pointer"
          >
            {/* Cart Icon */}
            <ShoppingBag size={28} className={iconColor} />

            {/* Cart Count Badge */}
            <div className="absolute -right-1.5 -top-2 flex h-6 w-6 items-center justify-center rounded-full border bg-black text-xs font-bold text-white shadow-md">
              20
            </div>
          </button>
        </li>

        <li className="sm:hidden">
          <button
            className={`rounded-full p-2 transition-all duration-200 ${iconColor}`}
            onClick={handleHamburgerMenu}
          >
            <Menu size={30} />

            <AnimatePresence>
              {hamburgerMenuModal && (
                <HamburgerMenu setHamburgerMenuModal={setHamburgerMenuModal} />
              )}
            </AnimatePresence>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default HomeMenuDetails;
