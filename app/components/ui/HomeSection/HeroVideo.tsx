"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const router = useRouter();

  return (
    <div className="relative h-screen w-full overflow-hidden overflow-x-hidden">
      <video
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
          videoLoaded && !videoError ? "opacity-100" : ""
        }`}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        onError={() => setVideoError(true)}
      >
        <source src="/heroVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center z-20 top-36"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <button
          onClick={() => router.push("/collection")}
          className="group bg-white text-black px-8 py-4 font-semibold text-lg hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          SHOP NOW
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </motion.div>
    </div>
  );
}
