"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Initial play
    const playVideo = () => {
      video.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    };

    playVideo();

    // Handle visibility change (when user returns to tab/app)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && video.paused) {
        playVideo();
      }
    };

    // Handle page focus (additional fallback)
    const handleFocus = () => {
      if (video.paused) {
        playVideo();
      }
    };

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/heroo-video.mp4" type="video/mp4" />
        <source src="/heroo-video.webm" type="video/webm" />
      </video>

      {/* Fallback Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full -z-10"
        style={{
          backgroundImage: "url('/layer.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* CTA Button */}
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
