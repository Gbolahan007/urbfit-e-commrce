"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Tektur } from "next/font/google";

// Load Tektur font
const tek = Tektur({
  weight: "400",
  subsets: ["latin"],
});

export default function SplashScreen() {
  const [hidden, setHidden] = useState(false);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const splashRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state - letters start above viewport
      gsap.set(lettersRef.current, { y: -200, opacity: 0 });

      // Create timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Fade out splash screen after animation
          gsap.to(splashRef.current, {
            opacity: 0,
            duration: 0.6,
            delay: 1,
            onComplete: () => setHidden(true),
          });
        },
      });

      tl.to(lettersRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: "bounce.out", // Bounce effect when landing
      });
    }, splashRef);

    return () => ctx.revert();
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 bg-black flex items-center justify-center z-[9999]"
    >
      <div
        className={`flex gap-2 font-bold ${tek.className} text-[6rem] md:text-[14rem]`}
      >
        {["U", "R", "B", "F", "I", "T"].map((letter, i) => (
          <span
            key={i}
            ref={(el) => {
              lettersRef.current[i] = el;
            }}
            className="text-white tracking-tight inline-block"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
