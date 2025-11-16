"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { CountUp } from "@/components/count-up";

const stats = [
  {
    value: 12,
    suffix: "s",
    label: "Video Duration",
    description: "Perfect length for attention spans",
  },
  {
    value: 10,
    suffix: " min",
    label: "Generation Time",
    description: "From idea to ready-to-ship video",
  },
  {
    value: 100,
    suffix: "%",
    label: "AI-Powered",
    description: "No video editing skills required",
  },
  {
    value: 4,
    suffix: "K",
    label: "Video Quality",
    description: "Crystal clear, production-ready",
  },
];

export function StatsSection() {
  return (
    <section className="relative w-full py-24 md:py-32 px-2 md:px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50" />

      <div className="container max-w-7xl 3xl:max-w-[1600px] mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl 3xl:text-6xl font-display font-bold mb-4">
              <span className="text-primary">Powerfully Fast</span>. <span className="text-primary">Effortlessly High-Quality</span>
            </h2>
            <p className="text-lg 3xl:text-xl text-muted-foreground max-w-2xl 3xl:max-w-3xl mx-auto">
              Turn imagination into cinematic reality — instantly.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 100}>
              <div className="relative group">
                <div className="relative bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl p-8 text-center h-full transition-all duration-300 hover:border-border/60 hover:shadow-lg">
                  <div className="space-y-3">
                    <div className="text-5xl md:text-6xl font-bold font-display bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                      <CountUp
                        value={stat.value}
                        suffix={stat.suffix}
                        duration={2.5}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-2">
                        {stat.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
