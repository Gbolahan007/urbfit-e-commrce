"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

interface HomePick {
  id: number;
  slug: string;
  image: string;
  title: string;
  gender: string;
}

interface HomeSectionPicksProps {
  homePicks: HomePick[];
}

export default function HomeSectionPicksClient({
  homePicks,
}: HomeSectionPicksProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for seamless infinite scroll
  const duplicatedPicks = [...homePicks, ...homePicks];

  // ✅ GSAP Infinite Scroll (same as HomeLogoDisplay)
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
  }, [homePicks]);

  //  Pause on hover like in HomeLogoDisplay
  useEffect(() => {
    if (isPaused) tweenRef.current?.pause();
    else tweenRef.current?.resume();
  }, [isPaused]);

  return (
    <div className="w-full overflow-hidden py-12 border-t border-neutral-200">
      <div
        ref={sliderRef}
        className="flex gap-4 items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedPicks.map((pick, i) => (
          <Link
            key={`${pick.id}-${i}`}
            href={`/${pick.gender}/${pick.slug}`}
            className="relative flex-shrink-0 w-72 h-80 flex items-center justify-center overflow-hidden"
          >
            <Image
              src={pick.image || "/placeholder.svg"}
              alt={pick.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
