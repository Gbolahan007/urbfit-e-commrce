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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Duplicate items for seamless infinite scrolling
  const duplicatedPicks = [...homePicks, ...homePicks];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const startAnimation = () => {
      animationRef.current?.kill();

      animationRef.current = gsap.to(container, {
        x: -container.scrollWidth / 2, // scroll half width
        duration: 20,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(
            (x) => parseFloat(x) % (container.scrollWidth / 2)
          ),
        },
      });
    };

    if (!isPaused) {
      startAnimation();
    } else {
      animationRef.current?.pause();
    }

    // Cleanup on unmount
    return () => {
      animationRef.current?.kill();
    };
  }, [isPaused, homePicks]);

  return (
    <div className="w-full overflow-hidden py-12">
      <div
        ref={containerRef}
        className="flex gap-1 items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedPicks.map((pick, i) => (
          <Link
            key={`${pick.id}-${i}`}
            href={`/${pick.gender}/${pick.slug}`}
            className="relative flex-shrink-0 w-72 h-80 flex items-center justify-center"
          >
            <Image
              src={pick.image || "/placeholder.svg"}
              alt={pick.title}
              fill
              className="object-cover transition-all duration-300 hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
