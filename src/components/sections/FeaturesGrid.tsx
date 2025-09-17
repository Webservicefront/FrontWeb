"use client";

import { motion } from "framer-motion";
import { Sparkles, Rocket, Shield, Zap, Gauge, Cog, Globe2, LayoutDashboard, Cpu } from "lucide-react";
import Container from "../primitives/Container";
import MaxWidthWrapper from "../primitives/MaxWidthWrapper";
import Icon from "../primitives/Icon";
import { fadeUp, staggerContainer, hoverLift } from "../animations/variants";

type Feature = {
  icon: React.ComponentType<{ className?: string }>;
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
  { icon: Rocket, title: "Performance-first", desc: "Lighthouse-friendly builds with lean assets, responsive images, and instant navigation." },
  { icon: Shield, title: "Accessible by design", desc: "WCAG-minded components, focus states, and motion preferences respected." },
  { icon: Zap, title: "Meaningful motion", desc: "Subtle interactions and scroll choreography powered by Framer Motion." },
  { icon: Gauge, title: "Scalable system", desc: "Design tokens, variants, and composable primitives for growth." },
  { icon: Cog, title: "Maintainable stack", desc: "Typed components, predictable state, and clean project structure." },
  { icon: Globe2, title: "SEO ready", desc: "Structured data, metadata, sitemap, and social previews." },
  { icon: LayoutDashboard, title: "Polished UI", desc: "Crisp layouts, refined spacing, and crafted micro-interactions." },
  { icon: Cpu, title: "Modern tooling", desc: "Next.js, Tailwind, and MDX content pipelines tuned for speed." },
];

export default function FeatureGrid({
  eyebrow = "Capabilities",
  title = "Everything you need to ship a modern site",
  subtitle = "A focused toolkit that blends aesthetics, speed, and clarity.",
  features = defaults,
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
