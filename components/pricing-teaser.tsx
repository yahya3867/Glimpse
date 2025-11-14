"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Parallax } from "@/components/parallax";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Starter",
    subtitle: "Free",
    description: "",
    price: "$0",
    period: "/ month",
    features: [
      "5 video generations per month",
      "Up to 720p resolution (portrait or landscape)",
      "Max 8-second clips",
      "Watermark included",
    ],
  },
  {
    name: "Growth",
    subtitle: "",
    description: "For early-stage founders and small teams",
    price: "$20",
    period: "/ month",
    badge: "Popular",
    features: [
      "40 video generations per month",
      "Up to 1080p resolution",
      "Max 10-second clips",
      "No watermark",
      "Priority support",
    ],
  },
  {
    name: "Studio",
    subtitle: "",
    description: "For agencies and high-volume creators",
    price: "$200",
    period: "/ month",
    features: [
      "500 video generations per month",
      "Up to 4K resolution",
      "Max 12-second clips",
      "Custom concept requests",
      "Dedicated account manager",
    ],
  },
];

export function PricingTeaser() {
  return (
    <section
      id="pricing"
      className="relative w-full py-24 md:py-32 px-2 md:px-4 bg-gradient-to-b from-background/50 to-background overflow-hidden"
    >
      {/* Layered parallax graphics */}
      <Parallax speed={0.4} className="absolute top-40 right-20 opacity-20">
        <div className="w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl" />
      </Parallax>

      <div className="container max-w-7xl 3xl:max-w-[1600px] mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl 3xl:text-6xl font-display font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg 3xl:text-xl text-muted-foreground max-w-2xl 3xl:max-w-3xl mx-auto">
              Choose the plan that fits your growth stage
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <ScrollReveal key={tier.name} delay={index * 100}>
              <motion.div
                className={`relative group ${
                  tier.badge ? "md:-mt-4" : ""
                }`}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-primary text-primary-foreground">
                      {tier.badge}
                    </Badge>
                  </div>
                )}
                <div
                  className={`relative bg-card/50 backdrop-blur-sm border rounded-2xl p-8 h-full transition-all duration-300 ${
                    tier.badge
                      ? "border-primary/50 group-hover:border-primary"
                      : "border-border/40 group-hover:border-border/60"
                  }`}
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-display font-bold mb-6">
                        {tier.name}
                      </h3>

                      <div className="mb-4 flex items-start gap-2">
                        <div>
                          <span className="text-lg text-muted-foreground align-top">$</span>
                          <span className="text-5xl font-bold">{tier.price.replace('$', '')}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          <div>USD /</div>
                          <div>month</div>
                        </div>
                      </div>

                      {tier.description && (
                        <p className="text-base font-medium mb-6">
                          {tier.description}
                        </p>
                      )}
                      {tier.subtitle && (
                        <p className="text-base font-medium mb-6">
                          {tier.subtitle}
                        </p>
                      )}
                    </div>

                    <Button
                      className="w-full rounded-lg h-12 font-medium"
                      variant={tier.badge ? "default" : "outline"}
                      asChild
                    >
                      <a href="#access">Request access</a>
                    </Button>

                    <div className="space-y-4 pt-4">
                      {tier.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-3"
                        >
                          <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">
                            {feature}
                          </span>
                        </div>
                      ))}
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
