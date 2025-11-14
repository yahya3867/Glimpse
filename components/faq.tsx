"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How long does it take to generate a video?",
    answer:
      "Most videos are generated within 2-3 minutes. The AI analyzes your product description, creates a storyboard, and renders the final cinematic video automatically.",
  },
  {
    question: "What input do I need to provide?",
    answer:
      "Simply provide a brief description of your product or feature. Our AI takes care of the rest, transforming your text into a compelling visual story.",
  },
  {
    question: "Can I customize the video style?",
    answer:
      "Yes! You can choose from various visual styles, adjust pacing, select music, and customize colors to match your brand identity.",
  },
  {
    question: "What video formats do you support?",
    answer:
      "We export videos in multiple formats including MP4, WebM, and GIF. Videos are optimized for different platforms like social media, landing pages, and presentations.",
  },
  {
    question: "Do I need video editing skills?",
    answer:
      "No video editing skills required! Glimpse is designed to be completely automated. Just describe your product and let our AI handle the creative work.",
  },
  {
    question: "What's included in early access?",
    answer:
      "Early access users get unlimited video generations, priority support, lifetime discounts, and direct input into feature development.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-24 md:py-32 px-2 md:px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />

      <div className="container max-w-4xl 3xl:max-w-5xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl 3xl:text-6xl font-display font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg 3xl:text-xl text-muted-foreground max-w-2xl 3xl:max-w-3xl mx-auto">
              Everything you need to know about Glimpse
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 50}>
              <motion.div
                className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden transition-all duration-300 hover:border-border/60"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-muted/5"
                >
                  <span className="text-lg font-display font-semibold pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
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
