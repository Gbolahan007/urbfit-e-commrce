"use client";

import { Kaushan_Script, Tektur } from "@next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DropdownMenu from "./ui/DropDownMenu";
import HomeCursor from "./ui/HomeCursor";
import HomeMenuDetails from "./ui/HomeMenuDetails";

const tek = Tektur({
  weight: "400",
  subsets: ["latin"],
});

const kau = Kaushan_Script({
  weight: "400",
  subsets: ["latin"],
});

type Position = {
  left: number;
  width: number;
  opacity: number;
};

const categories = ["Men", "Kids", "Women", "Collection"] as const;
type Category = (typeof categories)[number];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<Category | null>(null);
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        tek.className
      } fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" passHref legacyBehavior>
          <a
            className={`${kau.className} text-2xl font-bold cursor-pointer ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            URB<span className="text-[#a4a4a4]">FIT</span>
          </a>
        </Link>

        {/* Navigation Menu */}
        <div className="hidden sm:block">
          <ul
            onMouseLeave={() => {
              setPosition((prev) => ({ ...prev, opacity: 0 }));
              setHoveredItem(null);
            }}
            className={`flex  space-x- relative mx-auto bg-transparent p-1 w-fit shadow-2xl rounded-full font-semibold border ${
              scrolled ? "border-black" : "border-white"
            }`}
          >
            {categories.map((item, index) => (
              <li
                key={item}
                ref={(el) => {
                  refs.current[index] = el;
                }}
                onMouseEnter={() => {
                  const element = refs.current[index];
                  if (!element) return;
                  const { width, left } = element.getBoundingClientRect();
                  setPosition({
                    width,
                    opacity: 1,
                    left:
                      left -
                      (element.parentElement?.getBoundingClientRect().left ||
                        0),
                  });
                  setHoveredItem(item);
                }}
              >
                {item === "Collection" ? (
                  <a
                    href="/collection"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/collection");
                    }}
                    className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase mix-blend-difference md:px-5 md:py-3 md:text-base"
                  >
                    {item}
                  </a>
                ) : (
                  <Link href={`/${item.toLowerCase()}`} passHref legacyBehavior>
                    <a className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase mix-blend-difference md:px-5 md:py-3 md:text-base">
                      {item}
                    </a>
                  </Link>
                )}

                <AnimatePresence>
                  {hoveredItem === item && item !== "Collection" && (
                    <DropdownMenu category={item} />
                  )}
                </AnimatePresence>
              </li>
            ))}

            {/* HomeCursor */}
            <HomeCursor position={position} />
          </ul>
        </div>

        {/* HomeMenuDetails */}
        <motion.div>
          <AnimatePresence>
            <HomeMenuDetails scrolled={scrolled} />
          </AnimatePresence>
        </motion.div>
      </div>
    </nav>
  );
}

export default Header;
