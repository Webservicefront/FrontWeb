// src/components/layout/Footer.tsx
"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Twitter, Github, Linkedin, ArrowRight } from "lucide-react";
import { useViewportParallax } from "@/components/animations/parallax";
import { fadeUp, staggerContainer, hoverLift } from "@/components/animations/variants";
import Image from "next/image";

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



const socials: SocialItem[] = [
  { label: "GitHub", href: "https://github.com/Jorgearellano1", Icon: Github },
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
  <Image
    src="/brand/tylvra-mark-soft.svg"
    alt="Tylvra"
    width={160}
    height={36}
    priority
  />
            
            </div>
            <p className="mt-4 max-w-xs text-sm text-neutral-300/80">
              Modern software experiences—AI, web, and scalable systems—crafted for clarity, speed, and impact.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm">
              <MapPin className="size-4" />
              <span>Lima, Peru</span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <Phone className="size-4" />
              <a className="hover:underline" href="tel:+51989147467">
                +51 989 147 467
              </a>
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm">
              <Mail className="size-4" />
              <a className="hover:underline" href="mailto:jorge.arellano@utec.edu.pe">
                jorge.arellano@utec.edu.pe
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
              Start a project and build a high-performance product with AI and modern web tech.
            </p>
            <motion.a
  href="/#contact"
  variants={hoverLift}
  initial="rest"
  whileHover="hover"
  whileTap="tap"
  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white hover:bg-white/12"
>
  Let’s talk
  <ArrowRight className="size-4" />
</motion.a>

     
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row"
        >
          <p className="text-xs text-neutral-400">© {year} Tylvra. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
           
             
          </ul>
        </motion.div>
      </div>
    </footer>
  );
}
