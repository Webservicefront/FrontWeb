"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Container from "@/components/primitives/Container";
import MaxWidthWrapper from "@/components/primitives/MaxWidthWrapper";
import Icon from "@/components/primitives/Icon";
import { fadeUp, hoverLift, tapPress } from "@/components/animations/variants";

type Props = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  note?: string;
};

export default function CTA({
  eyebrow = "Ready to build",
  title = "Launch a refined, fast, and modern website",
  subtitle = "We craft minimal, high-performance sites with meaningful motion and world-class UX.",
  primaryHref = "/contact",
  primaryLabel = "Start a project",
  secondaryHref = "/features",
  secondaryLabel = "See features",
  note = "Q4 production slots available",
}: Props) {
  return (
    <section className="relative">
      <Container reveal bgGlow py="lg" center>
        <MaxWidthWrapper reveal size="lg" px="md" align="center">
          <motion.div
            variants={fadeUp(14)}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/60 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur md:p-12"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -top-20 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/15 via-sky-400/10 to-cyan-400/10 blur-3xl" />
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                <Icon icon={Sparkles} variant="soft" tone="primary" size="xs" rounded="full" reveal />
                <span>{eyebrow}</span>
              </div>

              <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                {title}
              </h2>

              <p className="max-w-2xl text-pretty text-sm text-neutral-300/90 md:text-base">
                {subtitle}
              </p>

              <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
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
