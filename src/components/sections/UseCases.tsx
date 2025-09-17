"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, BarChart3, Users2, Shield, ShoppingCart, Globe2, ChevronRight, Sparkles } from "lucide-react";
import Container from "@/components/primitives/Container";
import MaxWidthWrapper from "@/components/primitives/MaxWidthWrapper";
import Icon from "@/components/primitives/Icon";
import { fadeUp, staggerContainer, hoverLift, tapPress } from "@/components/animations/variants";

type CaseItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  metric: { label: string; value: string };
  href: string;
  tag?: string;
};

type Props = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: CaseItem[];
  ctaHref?: string;
  ctaLabel?: string;
};

const defaults: CaseItem[] = [
  {
    icon: Briefcase,
    title: "B2B lead-gen",
    desc: "High-clarity value prop, authority cues, and frictionless contact flow.",
    metric: { label: "Leads increase", value: "+38%" },
    href: "/use-cases/b2b",
    tag: "Enterprise",
  },
  {
    icon: ShoppingCart,
    title: "Product landing",
    desc: "Conversion-focused hero, proof, and crisp feature storytelling.",
    metric: { label: "CTR uplift", value: "+24%" },
    href: "/use-cases/landing",
    tag: "SaaS",
  },
  {
    icon: Users2,
    title: "Hiring page",
    desc: "Team narrative, values, and benefits with credible signals.",
    metric: { label: "Applicants", value: "2.1×" },
    href: "/use-cases/careers",
    tag: "Talent",
  },
  {
    icon: Globe2,
    title: "Docs hub",
    desc: "Structured navigation, MDX content, and searchable references.",
    metric: { label: "Support tickets", value: "−31%" },
    href: "/use-cases/docs",
    tag: "DevEx",
  },
  {
    icon: BarChart3,
    title: "Campaign microsite",
    desc: "Fast storytelling, snackable sections, and shareable anchors.",
    metric: { label: "Time on page", value: "+19%" },
    href: "/use-cases/microsite",
    tag: "Marketing",
  },
  {
    icon: Shield,
    title: "Trust & security",
    desc: "Compliance surfaces, audit-ready pages, and transparent policies.",
    metric: { label: "Sales velocity", value: "+12%" },
    href: "/use-cases/security",
    tag: "Compliance",
  },
];

export default function UseCases({
  eyebrow = "Use cases",
  title = "Real outcomes across scenarios",
  subtitle = "Targeted pages that convert better, explain faster, and feel more polished.",
  items = defaults,
  ctaHref = "/use-cases",
  ctaLabel = "Explore all use cases",
}: Props) {
  return (
    <section className="relative">
      <Container reveal bgGlow py="lg">
        <MaxWidthWrapper reveal size="lg" px="md" align="center">
          <motion.div variants={fadeUp(12)} className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <Icon icon={Sparkles} variant="soft" tone="primary" size="xs" rounded="full" reveal />
              <span>{eyebrow}</span>
            </div>
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-pretty text-sm text-neutral-300/90 md:text-base">
              {subtitle}
            </p>
          </motion.div>

          <motion.ul
            variants={staggerContainer(0.08, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto mt-10 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((item) => (
              <motion.li key={item.title} variants={fadeUp(10)} className="group relative">
                <motion.div
                  variants={hoverLift}
                  initial="rest"
                  whileHover="hover"
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-neutral-950/60 p-5 backdrop-blur"
                >
                  <div className="flex items-start gap-3">
                    <Icon icon={item.icon} variant="soft" tone="primary" size="sm" rounded="lg" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[15px] font-semibold text-white">{item.title}</h3>
                        {item.tag ? (
                          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-neutral-300">
                            {item.tag}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm text-neutral-300/90">{item.desc}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2 py-1">
                      <span className="text-[11px] text-neutral-300">{item.metric.label}</span>
                      <span className="text-[12px] font-semibold text-white">{item.metric.value}</span>
                    </div>
                    <Link href={item.href}>
                      <motion.span
                        variants={tapPress}
                        whileTap="tap"
                        className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs font-semibold text-white hover:bg-white/10"
                      >
                        Learn more
                        <ChevronRight className="size-3.5" />
                      </motion.span>
                    </Link>
                  </div>

                  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute -top-24 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-sky-400/10 to-cyan-400/10 blur-3xl" />
                  </div>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp(12)} className="mt-10">
            <Link href={ctaHref}>
              <motion.span
                variants={tapPress}
                whileTap="tap"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                {ctaLabel}
                <ChevronRight className="size-4" />
              </motion.span>
            </Link>
          </motion.div>
        </MaxWidthWrapper>
      </Container>
    </section>
  );
}
