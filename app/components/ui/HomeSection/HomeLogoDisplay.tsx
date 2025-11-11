"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CreditCard, Package, Gift, Truck } from "lucide-react";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeLogoDisplay() {
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
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [email, setEmail] = useState("");

  // GSAP Infinite Logo Scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const totalWidth = slider.scrollWidth / 2;
    const tween = gsap.to(slider, {
      x: `-${totalWidth}px`,
      duration: 20,
      ease: "linear",
      repeat: -1,
    });

    tweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, []);

  // Parallax ScrollTrigger Effect - slides component UP to reveal footer underneath
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const parallaxAnimation = gsap.to(container, {
        y: () => -container.offsetHeight,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${container.offsetHeight * 0.2}`,
          scrub: 1,
          pin: false,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        parallaxAnimation.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  useEffect(() => {
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
      style={{ marginBottom: "-100vh" }}
    >
      {/* Delivery Details */}
      <div className="border-b border-neutral-300">
        <div className="container mx-auto px-6 py-6 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Payment */}
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

            {/* Delivery */}
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

            {/* Wonder Card */}
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

            {/* Shipping */}
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
              className="relative flex-shrink-0 w-32 h-32 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
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
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800 transition-colors"
            />
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
