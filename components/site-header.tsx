"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl 3xl:max-w-[1600px] items-center justify-between px-2 md:px-8">
        <div className="flex items-center gap-8">
          <Link href="/#" onClick={handleScrollToTop} className="flex items-center gap-2 font-semibold text-lg">
            <Image src="/logo.png" alt="Glimpse" width={32} height={32} className="w-8 h-8" />
            <span>Glimpse</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/#how-it-works"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/#product"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Product
            </Link>
            <Link
              href="/#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="rounded-full" asChild>
            <Link href="/#access">Get access</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
