// src/components/sections/UseCases.tsx
"use client";

import Link from "next/link";
import { useEffect, useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import { Rocket, BarChart3, Bot, Workflow, ShoppingCart, FileText, ChevronRight, Sparkles } from "lucide-react";
import Container from "@/components/primitives/Container";
import MaxWidthWrapper from "@/components/primitives/MaxWidthWrapper";
import Icon from "@/components/primitives/Icon";
import { fadeUp, staggerContainer, hoverLift, tapPress } from "@/components/animations/variants";

type CaseItem = {
  icon: ComponentType<{ className?: string }>;
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
    icon: Workflow,
    title: "Workflows with n8n + AI agents",
    desc: "Automate lead routing, data enrichment, summarization, and human-in-the-loop approvals with orchestrated AI steps.",
    metric: { label: "Manual work", value: "−50%" },
    href: "/use-cases/n8n-ai-workflows",
    tag: "AI Ops",
  },
  {
    icon: Rocket,
    title: "SaaS landing",
    desc: "Clear value prop, proof, and focused conversion paths for product-led growth.",
    metric: { label: "Signups", value: "+28%" },
    href: "/use-cases/saas-landing",
    tag: "SaaS",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    desc: "Optimized product pages, checkout, and analytics with SEO baked in.",
    metric: { label: "AOV", value: "+14%" },
    href: "/use-cases/ecommerce",
    tag: "Retail",
  },
  {
    icon: BarChart3,
    title: "Dashboards & BI",
    desc: "Data visualizations and admin panels for operational clarity and speed.",
    metric: { label: "Decision speed", value: "2.0×" },
    href: "/use-cases/bi",
    tag: "Data",
  },
  {
    icon: Bot,
    title: "AI chatbots",
    desc: "LLM assistants with RAG, evals, and guardrails for support and onboarding.",
    metric: { label: "Self-serve rate", value: "+35%" },
    href: "/use-cases/ai-chatbots",
    tag: "AI",
  },
  {
    icon: FileText,
    title: "Technical docs",
    desc: "Searchable docs hubs with MDX, versioning, and structured navigation.",
    metric: { label: "Ticket deflection", value: "+30%" },
    href: "/use-cases/docs",
    tag: "DevEx",
  },
];

export default function UseCases({
  title = "Outcomes across common scenarios",
  subtitle = "Pages and apps that convert better, explain faster, and scale with your roadmap.",
  items = defaults,
  ctaHref = "/use-cases",
  ctaLabel = "Explore all use cases",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setMounted(true);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className="relative">
      <Container reveal bgGlow py="lg">
        <MaxWidthWrapper reveal size="lg" px="md" align="center">
          <motion.div
            variants={fadeUp(12)}
            initial={mounted && !isMobile ? "hidden" : false}
            whileInView={mounted && !isMobile ? "show" : undefined}
            viewport={{ once: true, margin: "-40px" }}
            className="mx-auto max-w-3xl"
          >
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-pretty text-sm text-neutral-300/90 md:text-base">
              {subtitle}
            </p>
          </motion.div>

          <motion.ul
            variants={staggerContainer(0.04, 0.08)}
            initial={mounted && !isMobile ? "hidden" : false}
            whileInView={mounted && !isMobile ? "show" : undefined}
            viewport={{ once: true, margin: "-40px" }}
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

          <motion.div
            variants={fadeUp(12)}
            initial={mounted && !isMobile ? "hidden" : false}
            whileInView={mounted && !isMobile ? "show" : undefined}
            viewport={{ once: true, margin: "-40px" }}
            className="mt-10"
          >
            <Link href={ctaHref}>
              <motion.span
                variants={tapPress}
                whileTap="tap"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                <Sparkles className="size-4" />
                {ctaLabel}
              </motion.span>
            </Link>
          </motion.div>
        </MaxWidthWrapper>
      </Container>
    </section>
  );
}
