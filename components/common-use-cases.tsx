"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const commonUseCases = [
  {
    title: "Product Demos",
    description: "Create engaging product demonstrations that capture attention and drive conversions on your landing page.",
  },
  {
    title: "Social Media Content",
    description: "Generate scroll-stopping videos perfectly sized and optimized for Instagram, Twitter, LinkedIn, and TikTok.",
  },
  {
    title: "Sales Presentations",
    description: "Enhance your pitch decks with professional video content that makes your product memorable.",
  },
  {
    title: "Email Campaigns",
    description: "Boost email engagement by embedding eye-catching product videos that explain your value proposition.",
  },
  {
    title: "Customer Onboarding",
    description: "Help new users understand your product quickly with concise, visual walkthrough videos.",
  },
  {
    title: "Investor Pitches",
    description: "Make your demo day presentation stand out with polished, professional product showcase videos.",
  },
];

export function CommonUseCases() {
  return (
    <section className="relative w-full py-24 md:py-32 px-2 md:px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50" />

      <div className="container max-w-6xl 3xl:max-w-[1600px] mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl 3xl:text-6xl font-display font-bold mb-4">
              Common Use Cases
            </h2>
            <p className="text-lg 3xl:text-xl text-muted-foreground max-w-2xl 3xl:max-w-3xl mx-auto">
              Versatile video solutions for every stage of your customer journey
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commonUseCases.map((useCase, index) => (
            <ScrollReveal key={useCase.title} delay={index * 50}>
              <motion.div
                className="group relative"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl p-6 h-full transition-all duration-300 hover:border-border/60 hover:shadow-lg">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-display font-semibold mb-2">
                          {useCase.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {useCase.description}
                        </p>
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
