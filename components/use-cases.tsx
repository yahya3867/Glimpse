"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Rocket, Target, CheckCircle2 } from "lucide-react";
import { Parallax } from "@/components/parallax";
import { motion } from "framer-motion";

const useCases = [
  {
    icon: Sparkles,
    tag: "Landing Pages",
    title: "Make your homepage unforgettable",
    description:
      "Replace long paragraphs with a 12-second video that instantly shows what your product does.",
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

const keyApplications = [
  {
    title: "Product Demos",
    description: "Create engaging product demonstrations that capture attention and drive conversions.",
  },
  {
    title: "Sales Presentations",
    description: "Enhance your pitch decks with professional video content that makes your product memorable.",
  },
  {
    title: "Social Media Content",
    description: "Generate scroll-stopping videos optimized for Instagram, Twitter, LinkedIn, and TikTok.",
  },
  {
    title: "Email Campaigns",
    description: "Boost email engagement by embedding eye-catching product videos that explain your value proposition.",
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
              Built for the modern <span className="italic">era</span>
            </h2>
            <p className="text-lg 3xl:text-xl text-muted-foreground max-w-2xl 3xl:max-w-3xl mx-auto">
              Whether you're a startup, business, or developer - versatile video solutions for every stage of your customer journey
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
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

        {/* Key Applications */}
        <ScrollReveal delay={300}>
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-center mb-8">
              Perfect for every scenario
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {keyApplications.map((app, index) => (
                <ScrollReveal key={app.title} delay={index * 75}>
                  <motion.div
                    className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-5 h-full hover:border-border/50 transition-all duration-200"
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1.5">{app.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {app.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
