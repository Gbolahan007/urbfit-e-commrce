"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeJoggers() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Set initial state - elements hidden above viewport
    gsap.set([titleRef.current, paragraphRef.current, buttonRef.current], {
      y: -100,
      opacity: 0,
    });

    // Create staggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none none",
      },
    });

    // Animate in order: title -> paragraph -> button
    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        paragraphRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4" // Start 0.4s before previous animation ends
      )
      .to(
        buttonRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-screen overflow-hidden">
        <Link
          href="/shop/trousers"
          className="block w-full h-full group cursor-pointer"
        >
          <div className="relative w-full h-full">
            <Image
              src="/desktop-next.webp"
              alt="Premium Joggers Collection"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="100vw"
            />

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

            {/* Hero Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 sm:px-8">
              <h1
                ref={titleRef}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
              >
                Premium Joggers
              </h1>
              <p
                ref={paragraphRef}
                className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-2xl opacity-90 drop-shadow-lg"
              >
                Comfort meets style in our exclusive collection
              </p>
              <button
                ref={buttonRef}
                className="bg-white text-black px-8 py-3 sm:px-10 sm:py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform group-hover:scale-110 transition-all duration-300 shadow-lg"
              >
                Shop Trousers
              </button>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex justify-center items-center py-3">
        <h1 className="text-xl sm:text-3xl">NEW SEASON, NEW STYLES. YOU IN</h1>
      </div>
    </div>
  );
}
