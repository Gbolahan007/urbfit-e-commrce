"use client";

import { useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollWrapperProps {
  children: ReactNode;
}

export default function SmoothScrollWrapper({
  children,
}: SmoothScrollWrapperProps) {
  useEffect(() => {
    // Check if it's a mobile device - if so, don't apply smooth scroll
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768;

    // Exit early on mobile - use native scrolling
    if (isMobile) {
      return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Smooth scroll variables
    let currentScroll = 0;
    let targetScroll = 0;
    const ease = 0.075; // Lower = smoother (0.05 - 0.15 recommended)

    // Get max scroll height
    const getMaxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    // Handle wheel events
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScroll += e.deltaY;
      targetScroll = Math.max(0, Math.min(targetScroll, getMaxScroll()));
    };

    // Smooth scroll animation loop
    const smoothScroll = () => {
      currentScroll += (targetScroll - currentScroll) * ease;

      // Round to avoid sub-pixel rendering issues
      currentScroll = Math.round(currentScroll * 100) / 100;

      window.scrollTo(0, currentScroll);

      // Update ScrollTrigger
      ScrollTrigger.update();

      requestAnimationFrame(smoothScroll);
    };

    // Initialize
    targetScroll = window.scrollY;
    currentScroll = window.scrollY;

    // Start animation loop
    const rafId = requestAnimationFrame(smoothScroll);

    // Add wheel listener
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Handle resize
    const handleResize = () => {
      targetScroll = Math.min(targetScroll, getMaxScroll());
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{children}</>;
}
