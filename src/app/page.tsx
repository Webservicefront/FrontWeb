// src/app/page.tsx
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/components/sections/Hero";

const LogosMarquee = dynamic(() => import("@/components/sections/LogosMarquee"));
const FeatureGrid = dynamic(() => import("@/components/sections/FeaturesGrid"));
const UseCases = dynamic(() => import("@/components/sections/UseCases"));
const ProcessSteps = dynamic(() => import("@/components/sections/ProcessSteps"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const CTA = dynamic(() => import("@/components/sections/CTA"));

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
        <FeatureGrid />
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
