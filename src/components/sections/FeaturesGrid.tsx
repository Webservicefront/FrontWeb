// src/components/sections/FeatureGrid.tsx
"use client";

import { useEffect, useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import { Sparkles, Rocket, Shield, Zap, Gauge, Cog, Globe2, LayoutDashboard, Cpu } from "lucide-react";
import Container from "../primitives/Container";
import MaxWidthWrapper from "../primitives/MaxWidthWrapper";
import Icon from "../primitives/Icon";
import { fadeUp, staggerContainer, hoverLift } from "../animations/variants";

type Feature = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
};

type Props = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  features?: Feature[];
};

const defaults: Feature[] = [
  { icon: Sparkles, title: "AI Automations with n8n", desc: "Design, orchestrate, and monitor workflows that connect apps, APIs, and AI agents to eliminate manual work." },
  { icon: Rocket, title: "Web & Mobile Apps", desc: "Cross-platform apps and modern web experiences built for speed, reliability, and scale." },
  { icon: Cpu, title: "AI Integration (LLMs, RAG)", desc: "Chatbots, embeddings, vector search, and retrieval-augmented generation with evals and guardrails." },
  { icon: Cog, title: "APIs & Backends", desc: "Typed services, REST/GraphQL, authentication, rate limiting, and background jobs." },
  { icon: Globe2, title: "E-commerce", desc: "Product catalogs, Stripe payments, checkout flows, and analytics with SEO built in." },
  { icon: Gauge, title: "SEO & Performance", desc: "Core Web Vitals, image pipelines, code splitting, caching, and CDN optimization." },
  { icon: LayoutDashboard, title: "Dashboards & BI", desc: "Interactive dashboards, admin panels, and data visualizations for clear decision making." },
  { icon: Shield, title: "Security & Compliance", desc: "RBAC, audit logs, secrets management, privacy controls, and best-practice hardening." },
  { icon: Zap, title: "Automation & Integrations", desc: "Webhook-driven flows, third-party APIs, and data sync across your stack." },
];

export default function FeatureGrid({
  title = "Capabilities for AI and modern web",
  subtitle = "From idea to production: we deliver apps, AI features, and platforms that are fast, accessible, and maintainable.",
  features = defaults,
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
            {features.map((f, i) => (
              <motion.li
                key={i}
                variants={fadeUp(10)}
                whileHover="hover"
                className="group relative rounded-2xl border border-white/10 bg-neutral-950/60 p-5 backdrop-blur"
              >
                <motion.div
                  variants={hoverLift}
                  className="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                >
                  <Icon icon={f.icon} variant="ghost" tone="primary" size="sm" rounded="md" />
                </motion.div>
                <h3 className="mt-4 text-[15px] font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-neutral-300/90">{f.desc}</p>
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -top-24 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 via-sky-400/10 to-cyan-400/10 blur-3xl" />
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </MaxWidthWrapper>
      </Container>
    </section>
  );
}
