"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
  id?: string;
}

export function SectionWrapper({
  children,
  className,
  backgroundColor = "transparent",
  id,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundColor: isInView ? backgroundColor : "transparent",
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {children}
    </motion.section>
  );
}
