// src/components/sections/CTA.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/primitives/Container";
import MaxWidthWrapper from "@/components/primitives/MaxWidthWrapper";
import { fadeUp, hoverLift, tapPress } from "@/components/animations/variants";

type Props = {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  note?: string;
};

export default function CTA({
  title = "Build with AI and modern web technology",
  subtitle = "From prototypes to production: AI features, AI automations with n8n, web apps, and APIs built for speed, accessibility, and scale.",
  primaryHref = "https://wa.me/51989147467?text=Hello,%20I%20am%20interested%20in%20automating%20processes%20with%20n8n%20and%20AI.%20Could%20you%20share%20next%20steps%20and%20your%20availability%20for%20a%20brief%20call%3F",
  primaryLabel = "Automate processes",
  secondaryHref = "/#services",
  secondaryLabel = "See services",
  note = "Now accepting new AI automation and Web projects",
}: Props) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className="relative">
      <Container reveal bgGlow py="lg" center>
        <MaxWidthWrapper reveal size="lg" px="md" align="center">
          <motion.div
            variants={fadeUp(14)}
            initial={isMobile ? false : "hidden"}
            whileInView={isMobile ? undefined : "show"}
            viewport={{ once: true, margin: "-40px" }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/60 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur md:p-12"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/15 via-sky-400/10 to-cyan-400/10 blur-3xl" />
            </div>

            <div className="flex flex-col items-center gap-6">
              <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                {title}
              </h2>

              <p className="max-w-2xl text-pretty text-sm text-neutral-300/90 md:text-base">
                {subtitle}
              </p>

              <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
                <a href={primaryHref} target="_blank" rel="noreferrer">
                  <motion.span
                    variants={hoverLift}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm"
                  >
                    {primaryLabel}
                    <ArrowRight className="size-4" />
                  </motion.span>
                </a>

                <Link href={secondaryHref}>
                  <motion.span
                    variants={tapPress}
                    whileTap="tap"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    {secondaryLabel}
                  </motion.span>
                </Link>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-neutral-300/80">
                {note}
              </div>
            </div>
          </motion.div>
        </MaxWidthWrapper>
      </Container>
    </section>
  );
}
