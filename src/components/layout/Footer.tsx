"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Twitter, Github, Linkedin, ArrowRight } from "lucide-react";
import { useViewportParallax } from "@/components/animations/parallax";
import { fadeUp, staggerContainer, hoverLift, tapPress } from "@/components/animations/variants";

type LinkItem = { label: string; href: string };
type SocialItem = { label: string; href: string; Icon: React.ComponentType<{ className?: string }> };

const navPrimary: LinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Use cases", href: "/use-cases" },
  { label: "Process", href: "/process" },
];

const navSecondary: LinkItem[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const legal: LinkItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

const socials: SocialItem[] = [
  { label: "Twitter", href: "https://twitter.com", Icon: Twitter },
  { label: "GitHub", href: "https://github.com", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const bg = useViewportParallax({
    translate: { y: [30, -30] },
    opacity: [0.25, 0.6],
    scale: [1, 1.03],
  });

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-neutral-950 text-neutral-200">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        style={{ opacity: bg.style.opacity, transform: "translateZ(0)" }}
      >
        <motion.div
          style={{ y: bg.style.y, scale: bg.style.scale }}
          className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-500/10 to-cyan-400/10 blur-3xl"
        />
      </motion.div>

      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <motion.div
          variants={staggerContainer(0.08, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-12 md:grid-cols-4"
        >
          <motion.div variants={fadeUp()} className="col-span-1">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-white text-neutral-900 grid place-content-center font-semibold">JM</div>
              <span className="text-lg font-medium tracking-tight">Apolo´s</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-neutral-300/80">
              Modern web experiences with clarity, speed, and purpose.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm">
              <MapPin className="size-4" />
              <span>Lima, Peru</span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <Phone className="size-4" />
              <a className="hover:underline" href="tel:+51999999999">
                +51 999 999 999
              </a>
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <Mail className="size-4" />
              <a className="hover:underline" href="mailto:test@test.com">
                test@test.com
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  variants={hoverLift}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10"
                >
                  <Icon className="size-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp()} className="col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">Navigation</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {navPrimary.map((l) => (
                <li key={l.href}>
                  <a className="text-neutral-300/90 transition hover:text-white" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp()} className="col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {navSecondary.map((l) => (
                <li key={l.href}>
                  <a className="text-neutral-300/90 transition hover:text-white" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp()} className="col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">Get started</h4>
            <p className="mt-4 text-sm text-neutral-300/80">
              Start a project and craft a tailored, high-performance website.
            </p>
            <motion.a
              href="/contact"
              variants={hoverLift}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white text-neutral-900 px-4 py-2 text-sm font-semibold shadow-sm"
            >
              Let’s talk
              <ArrowRight className="size-4" />
            </motion.a>
            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-wide text-neutral-300">Availability</div>
              <div className="mt-1 text-sm">Q4 slots open</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row"
        >
          <p className="text-xs text-neutral-400">© {year} Your Brand. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
            {legal.map((l) => (
              <li key={l.href}>
                <a className="hover:text-white" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </footer>
  );
}
