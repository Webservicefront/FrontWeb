"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play, Shield, Gauge, Zap } from "lucide-react";
import Container from "@/components/primitives/Container";
import MaxWidthWrapper from "@/components/primitives/MaxWidthWrapper";
import Icon from "@/components/primitives/Icon";
import { useViewportParallax } from "@/components/animations/parallax";
import { fadeUp, hoverLift, tapPress, staggerContainer } from "@/components/animations/variants";

type Chip = { icon: React.ComponentType<{ className?: string }>; label: string };
type Props = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  chips?: Chip[];
};

export default function Hero({
  title = "Build a refined, modern website that feels effortless",
  subtitle = "We craft fast, minimal experiences with meaningful motion, robust accessibility, and a design system you can grow.",
  primaryHref = "/contact",
  primaryLabel = "Start a project",
  secondaryHref = "/features",
  secondaryLabel = "See features",
  chips = [
    { icon: Shield, label: "Accessible" },
    { icon: Gauge, label: "Performance-first" },
    { icon: Zap, label: "Meaningful motion" },
  ],
}: Props) {
  const bg = useViewportParallax({ translate: { y: [24, -16] }, opacity: [0.25, 0.6], scale: [1, 1.04] });

  return (
    <section className="relative overflow-hidden">
      <Container reveal bgGlow py="lg" center>
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <motion.div
            style={{ y: bg.style.y, opacity: bg.style.opacity, scale: bg.style.scale }}
            className="absolute -top-40 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-500/10 to-cyan-400/10 blur-3xl"
          />
        </div>

        <MaxWidthWrapper reveal size="lg" px="md" align="center">
          <motion.div variants={fadeUp(14)} className="mx-auto max-w-4xl">
           
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              {title}
            </h1>

            <p className="mt-4 text-pretty text-sm text-neutral-300/90 md:text-lg">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={primaryHref}>
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
              </Link>

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

            <motion.ul
              variants={staggerContainer(0.08, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
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
          </motion.div>
        </MaxWidthWrapper>
      </Container>
    </section>
  );
}
