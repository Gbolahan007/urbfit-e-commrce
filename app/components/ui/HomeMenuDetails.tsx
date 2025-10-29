"use client";

import { User, Menu, ShoppingBag, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Input from "./Input";
import DropDownSearch from "./DropDownSearch";
import SideSearch from "./SideSearch";
import HamburgerMenu from "./HamburgerMenu";
import { useCartStore } from "@/app/cart/store";
import { useCartModal } from "@/app/context/CartModalcontext";
import CartModal from "@/app/cart/Cartmodal";

interface HomeMenuDetailsProps {
  scrolled: boolean;
  isHomePage: boolean;
}

function HomeMenuDetails({ scrolled, isHomePage }: HomeMenuDetailsProps) {
  const router = useRouter();
  const [dropSearch, setDropSearch] = useState(false);
  const [onClickSearch, setOnClickSearch] = useState(false);
  const [hamburgerMenuModal, setHamburgerMenuModal] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const getItemCount = useCartStore((state) => state.getItemCount);
  const count = hasMounted ? getItemCount() : 0;

  const { openModal } = useCartModal();

  function handleDropDownSearch() {
    setDropSearch(true);
  }
  function handleSideSearch() {
    setOnClickSearch(true);
  }
  function handleHamburgerMenu() {
    setHamburgerMenuModal(true);
  }

  // Icon color logic: white only on home page when not scrolled, black everywhere else
  const iconColor = isHomePage && !scrolled ? "text-white" : "text-black";

  return (
    <div className="flex items-center p-1 justify-center">
      <ul className="flex items-center justify-center gap-3">
        {/* Search */}
        <li className="relative">
          <motion.div className="hidden lg:block">
            <div onClick={handleDropDownSearch}>
              <Input />
            </div>

            <AnimatePresence>
              {dropSearch && <DropDownSearch setDropSearch={setDropSearch} />}
            </AnimatePresence>
          </motion.div>

          <motion.div className={`lg:hidden cursor-pointer ${iconColor}`}>
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

        {/* User Icon */}
        <li>
          <button onClick={() => router.push("/login")} className={iconColor}>
            <User size={30} />
          </button>
        </li>

        {/* Cart Icon */}
        <li className="relative" onMouseEnter={openModal}>
          <Link href="/cart" className="relative cursor-pointer block">
            <ShoppingBag size={28} className={iconColor} />

            {/* Cart Count Badge */}
            <div className="absolute -right-1.5 -top-2 flex h-6 w-6 items-center justify-center rounded-full border bg-black text-xs font-bold text-white shadow-md">
              {count}
            </div>
          </Link>

          <CartModal />
        </li>

        {/* Hamburger Menu (mobile only) */}
        <li className="sm:hidden relative">
          <button
            className={`rounded-full p-2 transition-all duration-200 ${iconColor}`}
            onClick={handleHamburgerMenu}
          >
            <Menu size={30} />
          </button>

          <AnimatePresence>
            {hamburgerMenuModal && (
              <HamburgerMenu setHamburgerMenuModal={setHamburgerMenuModal} />
            )}
          </AnimatePresence>
        </li>
      </ul>
    </div>
  );
}

export default HomeMenuDetails;
