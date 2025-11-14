"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { Badge } from "@/components/ui/badge";

const examples = [
  {
    startup: "DataFlow",
    title: "Real-time pipeline monitoring",
    tag: "Data Infra",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    startup: "DevOps Studio",
    title: "Deploy with zero config",
    tag: "DevTools",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    startup: "ChurnGuard",
    title: "Predict user drop-off",
    tag: "Analytics",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    startup: "APIKit",
    title: "Auto-generate SDKs",
    tag: "Developer API",
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    startup: "FlowState",
    title: "Visual workflow builder",
    tag: "No-code",
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
];

export function ExamplesStrip() {
  return (
    <section className="w-full py-24 md:py-32 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Sample outputs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real videos we've created for startups
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
              {examples.map((example) => (
                <div
                  key={example.startup}
                  className="group flex-shrink-0 w-[320px] snap-start"
                >
                  <div className="relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 from-primary/10 to-transparent transition-opacity rounded-xl" />
                    <div className="relative bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden transition-all duration-300 group-hover:border-border/60 group-hover:scale-105">
                      <div
                        className={`aspect-video bg-gradient-to-br ${example.gradient} flex items-center justify-center`}
                      >
                        <div className="text-white/30 text-sm font-mono">
                          10s video
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold">
                            {example.startup}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {example.tag}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {example.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
