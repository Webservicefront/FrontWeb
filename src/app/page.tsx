// src/app/page.tsx
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import LogosMarquee from "@/components/sections/LogosMarquee";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import UseCases from "@/components/sections/UseCases";
import ProcessSteps from "@/components/sections/ProcessSteps";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = buildMetadata({
  title: "%s",
  path: "/",
});

export default function Page() {
  return (
    <>
      <Hero />
      <LogosMarquee />

      <section id="features" className="scroll-mt-32">
        <FeaturesGrid />
      </section>

      <section id="use-cases" className="scroll-mt-32">
        <UseCases />
      </section>

      <section id="process" className="scroll-mt-32">
        <ProcessSteps />
      </section>

      <FAQ />

      <section id="contact" className="scroll-mt-32">
        <CTA />
      </section>
    </>
  );
}
