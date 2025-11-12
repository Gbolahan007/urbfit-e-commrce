"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeStyle() {
  const leftImageRef = useRef<HTMLDivElement | null>(null);
  const rightImageRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(leftImageRef.current, { x: "-100%", opacity: 0 });
      gsap.set(rightImageRef.current, { x: "100%", opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
      });

      tl.to(leftImageRef.current, {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
      }).to(
        rightImageRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
        },
        "<"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <a href="/collection">
      <div
        ref={containerRef}
        className="relative flex flex-col md:flex-row h-[700px] md:h-screen overflow-hidden bg-[#f7f6f3]"
      >
        {/* Left Image */}
        <div ref={leftImageRef} className="relative flex-1 h-[350px] md:h-auto">
          <Image
            src="/leftImage.webp"
            alt="Collection item 1"
            fill
            className="object-cover"
            priority
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-6 md:p-12 bg-black/30 md:bg-black/40">
            <div className="text-white drop-shadow-lg">
              <p className="text-sm md:text-base font-medium mb-2">
                Exclusive Drop
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                Luxury Streetwear
              </h1>
              <p className="text-sm md:text-base underline">Shop Now</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div
          ref={rightImageRef}
          className="relative flex-1 h-[400px] md:h-auto"
        >
          <Image
            src="/new-balance-product-2.webp"
            alt="Collection item 2"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </a>
  );
}
