"use client";

import { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollWrapperProps {
  children: ReactNode;
}

export default function SmoothScrollWrapper({
  children,
}: SmoothScrollWrapperProps) {
  useGSAP(() => {
    // Check if it's a mobile device - if so, don't apply smooth scroll
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768;

    if (isMobile) {
      return;
    }

    // Smooth scroll variables
    let currentScroll = 0;
    let targetScroll = 0;
    const ease = 0.075;

    // Get max scroll height
    const getMaxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    // Handle wheel events
    const handleWheel = (e: WheelEvent) => {
      // Check if it's a horizontal scroll gesture (shift + wheel or trackpad horizontal)
      // Only allow native horizontal scrolling for these cases
      if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // This is an explicit horizontal scroll - let browser handle it
        return;
      }

      // For all vertical scrolling, apply smooth scroll
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

    // Cleanup function
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  });

  return <>{children}</>;
}
