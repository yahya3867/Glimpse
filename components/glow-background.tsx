"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface GlowBackgroundProps {
  className?: string;
  intensity?: "light" | "medium" | "strong";
  position?: "top" | "center" | "bottom";
  parallax?: boolean;
  parallaxSpeed?: number;
}

export function GlowBackground({
  className,
  intensity = "medium",
  position = "center",
  parallax = false,
  parallaxSpeed = 0.5,
}: GlowBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    parallax ? [-50 * parallaxSpeed, 50 * parallaxSpeed] : [0, 0]
  );

  const intensityClasses = {
    light: "opacity-20",
    medium: "opacity-30",
    strong: "opacity-40",
  };

  const positionClasses = {
    top: "top-0",
    center: "top-1/2 -translate-y-1/2",
    bottom: "bottom-0",
  };

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 pointer-events-none",
        positionClasses[position],
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "w-[800px] h-[800px] rounded-full blur-3xl",
          "bg-gradient-radial from-white/20 via-white/5 to-transparent",
          intensityClasses[intensity]
        )}
      />
    </motion.div>
  );
}
