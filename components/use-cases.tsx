"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Rocket, Target } from "lucide-react";
import { Parallax } from "@/components/parallax";
import { motion } from "framer-motion";

const useCases = [
  {
    icon: Sparkles,
    tag: "Landing Pages",
    title: "Make your homepage unforgettable",
    description:
      "Replace long paragraphs with a 10-second video that instantly shows what your product does.",
    example: '"Project management tool that auto-prioritizes tasks"',
  },
  {
    icon: Rocket,
    tag: "Social & Pitch Decks",
    title: "Stand out on demo day",
    description:
      "Drop a cinematic video in your deck or social posts that makes investors and users stop scrolling.",
    example: '"AI writing assistant that matches your brand voice"',
  },
  {
    icon: Target,
    tag: "Speed & Clarity",
    title: "Ship product videos in minutes",
    description:
      "Describe your product in one line and get a polished video. No editing skills, no back-and-forth.",
    example: '"Scheduling app that eliminates timezone confusion"',
  },
];

export function UseCases() {
  return (
    <section
      id="product"
      className="relative w-full py-24 md:py-32 px-2 md:px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />

      {/* Layered parallax graphics */}
      <Parallax speed={0.5} className="absolute top-20 left-10 opacity-20">
        <div className="w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />
      </Parallax>
      <Parallax speed={0.3} className="absolute bottom-20 right-10 opacity-20">
        <div className="w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />
      </Parallax>

      <div className="container max-w-7xl 3xl:max-w-[1600px] mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl 3xl:text-6xl font-display font-bold mb-4">
              Built for modern <span className="italic">startups</span>
            </h2>
            <p className="text-lg 3xl:text-xl text-muted-foreground max-w-2xl 3xl:max-w-3xl mx-auto">
              Whether you're building for developers, businesses, or end users
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <ScrollReveal key={useCase.title} delay={index * 100}>
              <motion.div
                className="group relative"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl p-8 h-full transition-all duration-300 group-hover:border-border/60">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="bg-primary/10 border border-border/40 rounded-xl p-3">
                        <useCase.icon className="h-6 w-6" />
                      </div>
                      <Badge variant="outline">{useCase.tag}</Badge>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-display font-semibold">
                        {useCase.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {useCase.description}
                      </p>
                    </div>

                    <div className="pt-4">
                      <div className="bg-background/50 border border-border/40 rounded-lg p-4">
                        <div className="text-xs text-muted-foreground mb-2">
                          Example:
                        </div>
                        <div className="font-mono text-sm">
                          {useCase.example}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
