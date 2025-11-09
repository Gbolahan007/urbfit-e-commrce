"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomeStyle() {
  return (
    <Link href="/collection">
      <div className="relative flex flex-col md:flex-row h-[700px] md:h-screen overflow-hidden bg-gray-100">
        {/* Left Image */}
        <div className="relative flex-1 h-[350px] md:h-auto">
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
        <div className="relative flex-1 h-[400px] md:h-auto">
          <Image
            src="/new-balance-product-2.webp"
            alt="Collection item 2"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </Link>
  );
}
