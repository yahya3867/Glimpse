"use client";

import { Button } from "@/components/ui/button";
import { GlowBackground } from "@/components/glow-background";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: videoScrollProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  const videoY = useTransform(videoScrollProgress, [0, 1], [50, -50]);

  // Add your video URLs and corresponding inputs here
  const videos = [
    {
      url: "https://www.youtube.com/embed/WX4XcIrTjzk",
      input: "Flywheel AI converts any existing excavators for contractors to enable remote ops to increase safety and productivity, and use robotics context dataset to train autonomous policies."
    },
    {
      url: "https://www.youtube.com/embed/2vEJnC9mAxI",
      input: "Relaw is an AI-powered legal operations platform that automates intake, drafting, notes, and document generation so attorneys save 10+ hours every week"
    },
    {
      url: "https://www.youtube.com/embed/OROm-M21xW8",
      input: "Automax.ai uses LiDAR and AI agents to generate fast, transparent real-estate appraisals in under 20 minutes"
    },
    {
      url: "https://www.youtube.com/embed/q5hLowOg8gM",
      input: "Wardstone is a space defense-tech company developing next-generation capabilities to protect the United States and its allies from missiles and other space-based threats."
    },
    {
      url: "https://www.youtube.com/embed/e3Wig1r50Sg",
      input: "FridgeChef turns whatever’s in your kitchen into ready-to-cook recipes with a quick point-and-scan."
    },
  ];

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
  };

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
              — it deserves <span className="italic bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Glimpse</span>
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
            ref={videoSectionRef}
            style={{ y: videoY }}
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
                      {videos[currentVideo].input}
                    </div>
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>
                  <div className="text-left space-y-2">
                    <div className="text-sm text-muted-foreground font-mono">
                      Output:
                    </div>
                    <div className="relative aspect-video bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-lg overflow-hidden border border-border/40 group">
                      {/* Overlay to prevent scroll freeze - click to enable video interaction */}
                      <div 
                        className="absolute inset-0 z-[5] cursor-pointer group-[.video-active]:pointer-events-none" 
                        onClick={(e) => {
                          e.currentTarget.parentElement?.classList.add('video-active');
                        }}
                      />
                      
                      {/* Video Iframe */}
                      <iframe
                        key={currentVideo}
                        src={videos[currentVideo].url}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />

                      {/* Navigation Controls */}
                      {videos.length > 1 && (
                        <>
                          {/* Previous Button */}
                          <button
                            onClick={prevVideo}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all z-10"
                            aria-label="Previous video"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </button>

                          {/* Next Button */}
                          <button
                            onClick={nextVideo}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all z-10"
                            aria-label="Next video"
                          >
                            <ChevronRight className="h-6 w-6" />
                          </button>

                          {/* Dot Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {videos.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentVideo(index)}
                                className={`h-2 rounded-full transition-all ${
                                  index === currentVideo
                                    ? "bg-white w-6"
                                    : "bg-white/50 hover:bg-white/70 w-2"
                                }`}
                                aria-label={`Go to video ${index + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
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