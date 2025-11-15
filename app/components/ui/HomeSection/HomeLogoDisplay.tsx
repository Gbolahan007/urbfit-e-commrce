"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CreditCard, Package, Gift, Truck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HomeLogoDisplay() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [email, setEmail] = useState("");

  const brands = [
    { id: 1, name: "Fatface", slug: "fatface" },
    { id: 2, name: "Fred Perry", slug: "fred-perry" },
    { id: 3, name: "Gap", slug: "gap" },
    { id: 4, name: "Lacoste", slug: "lacoste" },
    { id: 5, name: "New Balance", slug: "new-balance" },
    { id: 6, name: "Nike", slug: "nike" },
    { id: 7, name: "Puma", slug: "puma" },
    { id: 8, name: "Tommy Hilfiger", slug: "tommy-hilfiger" },
    { id: 9, name: "Under Armour", slug: "under-armour" },
    { id: 10, name: "Phase Eight", slug: "phase-eight" },
    { id: 11, name: "Skopes", slug: "skopes" },
  ];

  const duplicatedBrands = [...brands, ...brands];

  // 🔥 GSAP Animations (Logo scroll + Footer reveal)
  useGSAP(
    () => {
      const slider = sliderRef.current;
      if (!slider) return;

      // Infinite horizontal scroll
      const totalWidth = slider.scrollWidth / 2;

      const tween = gsap.to(slider, {
        x: `-${totalWidth}px`,
        duration: 20,
        ease: "linear",
        repeat: -1,
      });

      tweenRef.current = tween;

      // Footer reveal scroll effect
      gsap.to(containerRef.current, {
        y: "-100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  // Pause and play infinite scroll on hover
  useGSAP(() => {
    if (isPaused) tweenRef.current?.pause();
    else tweenRef.current?.resume();
  }, [isPaused]);

  const handleSubmit = () => {
    if (email) {
      console.log("Email submitted:", email);
      setEmail("");
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full relative z-20 bg-[#f7f6f3] border-t border-neutral-200"
    >
      {/* Delivery Details */}
      <div className="border-b border-neutral-300">
        <div className="container mx-auto px-6 py-6 sm:py-7">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <CreditCard
                className="w-12 h-12 mb-4 text-neutral-800"
                strokeWidth={1.5}
              />
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">
                PAYMENT
              </h3>
              <p className="text-sm text-neutral-600">Credit card & PayPal</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Package
                className="w-12 h-12 mb-4 text-neutral-800"
                strokeWidth={1.5}
              />
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">
                DELIVERY
              </h3>
              <p className="text-sm text-neutral-600">24h Green delivery</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Gift
                className="w-12 h-12 mb-4 text-neutral-800"
                strokeWidth={1.5}
              />
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">
                WONDER CARD
              </h3>
              <p className="text-sm text-neutral-600">
                Special discount club card
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Truck
                className="w-12 h-12 mb-4 text-neutral-800"
                strokeWidth={1.5}
              />
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">
                SHIPPING
              </h3>
              <p className="text-sm text-neutral-600">Free standard shipping</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Slider */}
      <div className="w-full overflow-hidden py-16 border-b border-neutral-300">
        <div
          ref={sliderRef}
          className="flex gap-8 items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicatedBrands.map((brand, i) => (
            <Link
              key={`${brand.id}-${i}`}
              href={`/brands/${brand.slug}`}
              className="relative flex-shrink-0 w-32 h-32 flex items-center justify-center hover:scale-110 transition-all duration-300"
            >
              <Image
                src={`/${brand.id}.png`}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4 tracking-wide">
            JOIN OUR NEWSLETTER
          </h2>
          <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
            Be the first to know about new collections and exclusive offers.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-8 py-5 bg-transparent border border-black rounded-full text-black placeholder:text-white/50 focus:outline-none focus:border-black/60 transition-colors"
            />

            <button
              onClick={handleSubmit}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors group"
              aria-label="Subscribe"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-black group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
