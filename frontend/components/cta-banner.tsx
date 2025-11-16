"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlowBackground } from "@/components/glow-background";

export function CtaBanner() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/submit-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="access"
      className="relative w-full py-24 px-2 md:px-4 overflow-hidden"
    >
      <GlowBackground intensity="strong" position="center" />

      <div className="container max-w-4xl 3xl:max-w-5xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-3xl p-12 md:p-16 text-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl 3xl:text-6xl font-serif font-bold">
                  Make your product
                  <br />
                  <motion.span
                    className="italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    instantly
                  </motion.span>{" "}
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    understandable
                  </motion.span>
                </h2>
                <motion.p
                  className="text-lg 3xl:text-xl text-muted-foreground max-w-2xl 3xl:max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  Join the waitlist to be among the first to transform your
                  product story into cinematic 12-second videos.
                </motion.p>
              </div>

              <motion.form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="flex-1 h-12 rounded-full bg-background/50"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="rounded-full px-8 whitespace-nowrap"
                >
                  {isSubmitting ? "Submitting..." : "Request access"}
                </Button>
              </motion.form>

              {submitStatus === "success" && (
                <p className="text-sm text-green-500 mt-2">
                  Thank you! We'll be in touch soon.
                </p>
              )}

              {submitStatus === "error" && (
                <p className="text-sm text-red-500 mt-2">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
