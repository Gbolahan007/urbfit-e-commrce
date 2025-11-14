"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Initial play
    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Autoplay prevented:", error);
        setIsPlaying(false);
      }
    };

    playVideo();

    // Handle when video actually starts playing
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Small delay to ensure browser is ready
        setTimeout(() => {
          if (video.paused) {
            playVideo();
          }
        }, 100);
      }
    };

    // Handle page focus
    const handleFocus = () => {
      setTimeout(() => {
        if (video.paused) {
          playVideo();
        }
      }, 100);
    };

    // Handle when page becomes visible (iOS specific)
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted && video.paused) {
        playVideo();
      }
    };

    // Add event listeners
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("pageshow", handlePageShow);

    // Cleanup
    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  // User interaction fallback for mobile
  const handleUserInteraction = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(console.error);
    }
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      onClick={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        webkit-playsinline="true"
        x5-playsinline="true"
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

      {/* Overlay gradient for better button visibility */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Play indicator (optional - shows if video isn't playing) */}
      {!isPlaying && (
        <div className="absolute top-4 right-4 z-30 bg-black/50 text-white px-3 py-1 rounded text-sm">
          Tap to play video
        </div>
      )}

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
