"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function initScrollSmoother() {
  // Only initialize once (client-side only)
  if (typeof window !== "undefined" && !ScrollSmoother.get()) {
    ScrollSmoother.create({
      smooth: 1.2, // scroll smoothing strength
      effects: true, // enables parallax
    });
  }
}
