"use client";

import { useEffect, useState } from "react";

export function LayoutIndicator() {
  const [layoutState, setLayoutState] = useState<"mobile" | "desktop" | "loading">("loading");
  const [viewportWidth, setViewportWidth] = useState<number>(0);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      // Tailwind's default md breakpoint is 768px
      setLayoutState(width >= 768 ? "desktop" : "mobile");
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  if (layoutState === "loading") return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black/90 text-white px-4 py-2 rounded-lg shadow-lg border border-white/20 font-mono text-sm">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              layoutState === "mobile" ? "bg-orange-500" : "bg-green-500"
            }`}
          />
          <span className="font-bold">
            {layoutState === "mobile" ? "MOBILE" : "DESKTOP"} LAYOUT
          </span>
        </div>
        <div className="text-xs text-white/60">
          Viewport: {viewportWidth}px (md: 768px)
        </div>
      </div>
    </div>
  );
}
