// src/components/sections/Hero.tsx
"use client";

import Link from "next/link";
import { useEffect, useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Shield, Gauge, Zap } from "lucide-react";
import Container from "@/components/primitives/Container";
import MaxWidthWrapper from "@/components/primitives/MaxWidthWrapper";
import Icon from "@/components/primitives/Icon";
import { useViewportParallax } from "@/components/animations/parallax";
import { fadeUp, hoverLift, tapPress, staggerContainer } from "@/components/animations/variants";
import useIsMobile from "@/hooks/useIsMobile";

type Chip = { icon: ComponentType<{ className?: string }>; label: string };

type Props = {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  chips?: Chip[];
};

export default function Hero({
  title = "Software, AI, and Web development that drives outcomes",
  subtitle = "We ship high-performance products: AI features, AI automations with n8n, modern web apps, and robust APIs with accessibility and SEO built in.",
  primaryHref = "https://wa.me/51989147467?text=Hello,%20I%20am%20interested%20in%20starting%20a%20project%20with%20Tylvra.%20Could%20you%20share%20next%20steps%20and%20your%20availability%20for%20a%20brief%20call%3F",
  primaryLabel = "Start a project",
  secondaryHref = "/#services",
  secondaryLabel = "See services",
  chips = [
    { icon: Zap, label: "AI automations " },
    { icon: Gauge, label: "Performance-first" },
    { icon: Shield, label: "Security & privacy" },
  ],
}: Props) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => setMounted(true), []);

  const bg = useViewportParallax({ translate: { y: [24, -16] }, opacity: [0.25, 0.6], scale: [1, 1.04] });

  return (
    <section className="relative overflow-hidden">
      <Container reveal={!isMobile} bgGlow py="lg" center>
        {mounted && !isMobile && (
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <motion.div
              style={{ y: bg.style.y, opacity: bg.style.opacity, scale: bg.style.scale }}
              className="absolute -top-40 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-500/10 to-cyan-400/10 blur-3xl"
            />
          </div>
        )}

        <MaxWidthWrapper reveal={!isMobile} size="lg" px="md" align="center">
          <motion.div
            variants={fadeUp(14)}
            initial={mounted && !isMobile ? "hidden" : false}
            whileInView={mounted && !isMobile ? "show" : undefined}
            viewport={{ once: true, margin: "-40px" }}
            className="mx-auto max-w-4xl"
          >
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              {title}
            </h1>

            <p className="mt-4 text-pretty text-sm text-neutral-300/90 md:text-lg">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={primaryHref} target="_blank" rel="noreferrer">
                <motion.span
                  variants={hoverLift}
                  initial={isMobile ? false : "rest"}
                  whileHover={isMobile ? undefined : "hover"}
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
                  <Play className="size-4" />
                </motion.span>
              </Link>
            </div>

            {isMobile ? (
              <ul className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-2">
                {chips.map((c, i) => (
                  <li key={i}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
                      <Icon icon={c.icon} size="xs" variant="ghost" tone="primary" rounded="full" />
                      {c.label}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <motion.ul
                variants={staggerContainer(0.04, 0.08)}
                initial={mounted ? "hidden" : false}
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-2"
              >
                {chips.map((c, i) => (
                  <motion.li key={i} variants={fadeUp(10)}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
                      <Icon icon={c.icon} size="xs" variant="ghost" tone="primary" rounded="full" />
                      {c.label}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        </MaxWidthWrapper>
      </Container>
    </section>
  );
}
