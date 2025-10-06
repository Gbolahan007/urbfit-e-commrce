"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface HamburgerMenuProps {
  setHamburgerMenuModal: (value: boolean) => void;
}

function HamburgerMenu({ setHamburgerMenuModal }: HamburgerMenuProps) {
  const router = useRouter();

  return (
    <div>
      {/* Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="fixed right-0 top-0 z-[1000] h-screen w-full max-w-lg bg-white p-4 font-oswald text-black shadow-lg"
      >
        {/* Close Button */}
        <button
          className="absolute right-3 top-3 flex items-center justify-center rounded-full bg-gray-200 p-2 transition-all hover:bg-gray-200 active:scale-90"
          onClick={(e) => {
            e.stopPropagation();
            setHamburgerMenuModal(false);
            console.log("clicked");
          }}
          aria-label="Close menu"
        >
          <X size={24} className="text-black" />
        </button>

        {/* Menu Items */}
        <motion.ul
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
          className="flex flex-col mt-16 gap-4 p-4"
        >
          <li>
            <button
              onClick={() => router.push("/men")}
              className="w-full text-left pb-2 uppercase hover:underline"
            >
              Men
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/kids")}
              className="w-full text-left pb-2 uppercase hover:underline"
            >
              Kids
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/women")}
              className="w-full text-left pb-2 uppercase hover:underline"
            >
              Women
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/collection")}
              className="w-full text-left pb-2 uppercase hover:underline"
            >
              Collection
            </button>
          </li>
        </motion.ul>

        {/* Login & Sign Up Buttons */}
        <div className="absolute bottom-6 left-0 w-full px-4">
          <button
            onClick={() => router.push("/login")}
            className="w-full py-2 mb-3 text-center uppercase border border-black transition-all hover:bg-black hover:text-white"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="w-full py-2 text-center uppercase bg-black text-white transition-all hover:opacity-90"
          >
            Sign Up
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default HamburgerMenu;
