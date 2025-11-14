"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { FileText, Sparkles, Video } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: FileText,
    title: "Drop your one-liner",
    description:
      "Describe your core feature in a single sentence. Our AI understands technical products.",
  },
  {
    icon: Sparkles,
    title: "AI Agents collaborate on your scene",
    description:
      "Multiple AI agents work together to craft the perfect visual concept, storyboard, and production-ready prompts for your video.",
  },
  {
    icon: Video,
    title: "You get a ready-to-ship video",
    description:
      "A sharp 10-second video optimized for landing pages, social media, and pitch decks.",
  },
];

export function HowItWorks() {
  return (
    <motion.section
      id="how-it-works"
      className="relative w-full py-24 md:py-32 px-2 md:px-4 bg-gradient-to-b from-background via-[#0a0a14] to-background overflow-hidden"
      initial={{ backgroundColor: "#0a0a0a" }}
      whileInView={{ backgroundColor: "#0a0a14" }}
      transition={{ duration: 1 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="container max-w-7xl 3xl:max-w-[1600px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl 3xl:text-6xl font-display font-bold mb-4">
              How Glimpse works
            </h2>
            <p className="text-lg 3xl:text-xl text-muted-foreground max-w-2xl 3xl:max-w-3xl mx-auto">
              From product description to cinematic video in three steps
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 100}>
              <div className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                    <div className="relative bg-primary/10 border border-border/40 rounded-2xl p-6">
                      <step.icon className="h-8 w-8" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
