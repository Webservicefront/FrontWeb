// src/components/sections/ProcessSteps.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, Lightbulb, Layout, Code2, Beaker, Rocket } from "lucide-react";
import Container from "@/components/primitives/Container";
import MaxWidthWrapper from "@/components/primitives/MaxWidthWrapper";
import Icon from "@/components/primitives/Icon";
import { fadeUp, staggerContainer, hoverLift, tapPress } from "@/components/animations/variants";

type Step = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  caption?: string;
};

type Props = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: Step[];
  ctaHref?: string;
  ctaLabel?: string;
};

const defaults: Step[] = [
  { icon: Target, title: "Discovery", desc: "Goals, users, constraints, and success metrics to align scope and priorities.", caption: "60–90 min" },
  { icon: Lightbulb, title: "Technical scoping", desc: "Requirements, stack choices, and a delivery plan with clear milestones.", caption: "1–2 days" },
  { icon: Layout, title: "UX & wireframes", desc: "Key flows and information architecture for web and mobile experiences.", caption: "1–2 days" },
  { icon: Code2, title: "Architecture & AI", desc: "APIs, data models, and AI integration (LLMs, RAG, evals, guardrails).", caption: "2–3 days" },
  { icon: Beaker, title: "Build & QA", desc: "Implementation, tests, accessibility checks, and performance budgets.", caption: "3–5 days" },
  { icon: Rocket, title: "Launch & handoff", desc: "Deployment, observability, docs, and a roadmap for iteration.", caption: "Same day" },
];

export default function ProcessSteps({
  title = "A clear, fast path from idea to production",
  subtitle = "Focused collaboration and reliable delivery—covering discovery, UX, architecture, AI integration, build, and launch.",
  steps = defaults,
  ctaHref = "/process",
}: Props) {
  return (
    <section className="relative">
      <Container reveal bgGlow py="lg">
        <MaxWidthWrapper reveal size="lg" px="md" align="center">
          <motion.div variants={fadeUp(12)} className="mx-auto max-w-3xl">
            
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-pretty text-sm text-neutral-300/90 md:text-base">
              {subtitle}
            </p>
          </motion.div>

          <motion.ol
            variants={staggerContainer(0.08, 0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto mt-10 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {steps.map((s, i) => (
              <motion.li key={s.title} variants={fadeUp(10)} className="group relative">
                <motion.div
                  variants={hoverLift}
                  initial="rest"
                  whileHover="hover"
                  className="relative h-full rounded-2xl border border-white/10 bg-neutral-950/60 p-5 backdrop-blur"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Icon icon={s.icon} variant="soft" tone="primary" size="sm" rounded="lg" />
                      <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-white/10 bg-white px-1.5 text-[11px] font-semibold text-neutral-900">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[15px] font-semibold text-white">{s.title}</h3>
                      <p className="mt-2 text-sm text-neutral-300/90">{s.desc}</p>
                      {s.caption ? (
                        <div className="mt-3 inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-neutral-300">
                          {s.caption}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -top-24 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-sky-400/10 to-cyan-400/10 blur-3xl" />
                  </div>
                </motion.div>
              </motion.li>
            ))}
          </motion.ol>

          <motion.div variants={fadeUp(12)} className="mt-10">
            <Link href={ctaHref}>
              <motion.span
               
              >
              </motion.span>
            </Link>
          </motion.div>
        </MaxWidthWrapper>
      </Container>
    </section>
  );
}
