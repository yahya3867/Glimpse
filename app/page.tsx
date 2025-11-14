import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { StatsSection } from "@/components/stats-section";
import { UseCases } from "@/components/use-cases";
import { CommonUseCases } from "@/components/common-use-cases";
import { PricingTeaser } from "@/components/pricing-teaser";
import { FAQ } from "@/components/faq";
import { CtaBanner } from "@/components/cta-banner";
import { BannerImage } from "@/components/banner-image";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <StatsSection />
        <UseCases />
        <CommonUseCases />
        <PricingTeaser />
        <FAQ />
        <CtaBanner />
        <BannerImage />
      </main>
    </div>
  );
}
