// src/components/sections/FAQ.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import Container from "@/components/primitives/Container";
import MaxWidthWrapper from "@/components/primitives/MaxWidthWrapper";
import Icon from "@/components/primitives/Icon";
import { fadeUp, staggerContainer, hoverLift, tapPress } from "@/components/animations/variants";
import useIsMobile from "@/hooks/useIsMobile";

type Item = { q: string; a: string };
type Props = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: Item[];
  allowMultiple?: boolean;
};

export default function FAQ({
  eyebrow = "Questions",
  title = "Frequently asked questions",
  subtitle = "Short, precise answers about the process, timelines, and deliverables.",
  items = [
    { q: "What is the typical timeline?", a: "A standard marketing site takes 2–4 weeks from kickoff to launch, depending on scope and content readiness." },
    { q: "Do you handle copy and visuals?", a: "Yes. We provide content strategy, UX copy support, and visual direction. You can bring your assets or I’ll curate them." },
    { q: "Is SEO included?", a: "Technical SEO fundamentals are included: metadata, sitemaps, semantic structure, performance, and accessibility." },
    { q: "How do we start?", a: "Share your goals and references. I’ll propose a scope, timeline, and fixed budget. Once approved, we begin immediately." },
  ],
  allowMultiple = false,
}: Props) {
  const [open, setOpen] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => setMounted(true), []);

  const toggle = (i: number) => {
    if (allowMultiple) setOpen((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
    else setOpen((s) => (s.includes(i) ? [] : [i]));
  };

  return (
    <section className="relative">
      <Container reveal={!isMobile} bgGlow py="lg">
        <MaxWidthWrapper reveal={!isMobile} size="lg" px="md" align="center">
          {isMobile ? (
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                <Icon icon={HelpCircle} variant="soft" tone="primary" size="xs" rounded="full" />
                <span>{eyebrow}</span>
              </div>
              <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                {title}
              </h2>
              <p className="mt-3 text-pretty text-sm text-neutral-300/90 md:text-base">{subtitle}</p>
            </div>
          ) : (
            <motion.div
              variants={fadeUp(12)}
              initial={mounted ? "hidden" : false}
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mx-auto max-w-3xl"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                <Icon icon={HelpCircle} variant="soft" tone="primary" size="xs" rounded="full" />
                <span>{eyebrow}</span>
              </div>
              <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                {title}
              </h2>
              <p className="mt-3 text-pretty text-sm text-neutral-300/90 md:text-base">{subtitle}</p>
            </motion.div>
          )}

          {isMobile ? (
            <ul className="mx-auto mt-10 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-neutral-950/60 backdrop-blur">
              {items.map((item, i) => {
                const isOpen = open.includes(i);
                return (
                  <li key={i} className="p-0">
                    <button
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left"
                    >
                      <span className="text-sm font-medium text-white md:text-base">{item.q}</span>
                      <span
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5"
                        style={{ transform: `rotate(${isOpen ? 180 : 0}deg)`, transition: "transform 0s" }}
                      >
                        <ChevronDown className="size-4 text-neutral-200" />
                      </span>
                    </button>

                    <div
                      style={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                        transition: "none",
                        overflow: "hidden",
                      }}
                      className="px-5"
                    >
                      <p className="pb-4 text-sm text-neutral-300/90 md:text-[15px]">{item.a}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <motion.ul
              variants={staggerContainer(0.08, 0.1)}
              initial={mounted ? "hidden" : false}
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="mx-auto mt-10 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-neutral-950/60 backdrop-blur"
            >
              {items.map((item, i) => {
                const isOpen = open.includes(i);
                return (
                  <li key={i} className="p-0">
                    <motion.button
                      variants={hoverLift}
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left"
                    >
                      <span className="text-sm font-medium text-white md:text-base">{item.q}</span>
                      <motion.span
                        variants={tapPress}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5"
                      >
                        <ChevronDown className="size-4 text-neutral-200" />
                      </motion.span>
                    </motion.button>

                    <motion.div
                      initial={false}
                      animate={isOpen ? "open" : "closed"}
                      variants={{
                        open: { height: "auto", opacity: 1 },
                        closed: { height: 0, opacity: 0 },
                      }}
                      transition={{ duration: 0.28, ease: [0.2, 0.6, 0.2, 1] }}
                      className="overflow-hidden px-5"
                    >
                      <motion.p variants={fadeUp(10)} className="pb-4 text-sm text-neutral-300/90 md:text-[15px]">
                        {item.a}
                      </motion.p>
                    </motion.div>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </MaxWidthWrapper>
      </Container>
    </section>
  );
}
