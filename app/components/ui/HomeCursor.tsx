"use client";

import { motion } from "framer-motion";

interface Position {
  left: number;
  width: number;
  opacity: number;
}

interface HomeCursorProps {
  position: Position;
}

function HomeCursor({ position }: HomeCursorProps) {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
}

export default HomeCursor;
