"use client";

import { Kaushan_Script, Tektur } from "@next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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

const categories = ["Men", "Kids", "Women", "Collection", "Brands"] as const;
type Category = (typeof categories)[number];

const off = [
  "up to 20% off menswear!",
  "40% off jacktes & boots!",
  "20% off everything!",
];

const THRESHOLD = 50;
const DELTA = 10;

function useHideOnScroll() {
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const [showNav, setShowNav] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(() => {
          const delta = current - lastScrollY.current;

          setIsScrolled(current > THRESHOLD);

          if (Math.abs(delta) > DELTA) {
            if (delta > 0 && current > THRESHOLD) {
              setShowNav(false);
            } else if (delta < 0) {
              setShowNav(true);
            }
            lastScrollY.current = current;
          } else {
            lastScrollY.current = current;
          }

          ticking.current = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { showNav, isScrolled };
}

function Header() {
  const [hoveredItem, setHoveredItem] = useState<Category | null>(null);
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [currentOffIndex, setCurrentOffIndex] = useState(0);

  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const { showNav, isScrolled } = useHideOnScroll();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffIndex((prevIndex) => (prevIndex + 1) % off.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const isTransparent = isHomePage && !isScrolled;
  const textColor = isTransparent ? "text-white" : "text-black";
  const borderColor = isTransparent ? "border-white" : "border-black";
  const bgColor = isTransparent ? "bg-transparent" : "bg-white shadow-md";

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNav ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className={`${tek.className} fixed top-0 left-0 z-50 w-full  transition-all duration-300 ${bgColor}`}
    >
      {/* 🔥 Promo bar at the top */}
      <div className="bg-black text-white text-center py-2 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentOffIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-sm md:text-base uppercase tracking-wide"
          >
            {off[currentOffIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <Link href="/" passHref legacyBehavior>
          <a
            className={`${kau.className} text-2xl font-bold cursor-pointer ${textColor}`}
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
            className={`flex relative mx-auto bg-transparent p-1 w-fit shadow-2xl rounded-full font-semibold border ${borderColor}`}
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
            <HomeCursor position={position} />
          </ul>
        </div>

        <motion.div>
          <AnimatePresence>
            <HomeMenuDetails scrolled={isScrolled} isHomePage={isHomePage} />
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Header;
