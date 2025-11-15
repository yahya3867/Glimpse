"use client";

import { Button } from "@/components/ui/button";
import { GlowBackground } from "@/components/glow-background";
import { Play } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-2 md:px-4"
    >
      <GlowBackground intensity="strong" position="top" className="top-20" parallax={true} parallaxSpeed={0.3} />

      <motion.div
        style={{ opacity, scale, y }}
        className="container max-w-7xl 3xl:max-w-[1600px] mx-auto text-center relative z-10"
      >
        <div className="space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl 3xl:text-8xl font-serif font-bold tracking-tight"
          >
            Your product deserves more than words
            <br />
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              — it deserves <span className="italic">Glimpse</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl 3xl:text-3xl text-muted-foreground max-w-2xl 3xl:max-w-4xl mx-auto leading-relaxed"
          >
            Turn your product description into a cinematic story
            <br />
            that makes its value obvious in seconds
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button size="lg" className="rounded-full px-8 text-base" asChild>
              <a href="#access">Request early access</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-12"
          >
            <div className="relative mx-auto max-w-4xl 3xl:max-w-6xl">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-3xl rounded-full" />
              <div className="relative bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm border border-border/40 rounded-2xl p-8 md:p-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Ready to generate</span>
                  </div>
                  <div className="text-left space-y-2">
                    <div className="text-sm text-muted-foreground font-mono">
                      Input:
                    </div>
                    <div className="bg-background/50 border border-border/40 rounded-lg p-4 font-mono text-sm">
                      "API analytics that shows you why users churn"
                    </div>
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>
                  <div className="text-left space-y-2">
                    <div className="text-sm text-muted-foreground font-mono">
                      Output:
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center border border-border/40">
                      <Play className="h-12 w-12 text-white/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
