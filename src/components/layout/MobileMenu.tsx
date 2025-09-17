// src/components/layout/MobileMenu.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { hoverLift, tapPress, staggerContainer, fadeRight } from "@/components/animations/variants";

type NavItem = { label: string; href: string };
type Brand = { initials: string; name: string };
type CTA = { label: string; href: string };

type Props = {
  open: boolean;
  items: NavItem[];
  onClose: () => void;
  brand?: Brand;
  cta?: CTA;
  activeHref?: string;
};

export default function MobileMenu({ open, items, onClose, brand, cta, activeHref }: Props) {
  const isActive = (href: string) => {
    if (!activeHref) return false;
    const baseActive = activeHref.split("#")[0];
    const baseHref = href.split("#")[0];
    return baseActive === baseHref || baseActive.startsWith(baseHref + "/");
  };

  return (
    <motion.aside
      initial={false}
      animate={open ? "show" : "hidden"}
      variants={{ hidden: { pointerEvents: "none" }, show: { pointerEvents: "auto" } }}
      className="fixed inset-0 z-50 md:hidden"
    >
      <motion.div
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        variants={{ hidden: { x: "100%" }, show: { x: 0 } }}
        transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute right-0 top-0 h-full w-[84%] max-w-sm border-l border-white/10 bg-neutral-950 p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-content-center rounded-xl bg-white text-sm font-semibold text-neutral-900">
              {brand?.initials ?? "JB"}
            </span>
            <span className="text-[15px] font-medium tracking-tight text-white">
              {brand?.name ?? "Your Brand"}
            </span>
          </div>
          <motion.button
            variants={tapPress}
            whileTap="tap"
            aria-label="Close"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 text-white"
          >
            <X className="size-5" />
          </motion.button>
        </div>

        <motion.ul
          variants={staggerContainer(0.06, 0.02)}
          initial="hidden"
          animate="show"
          className="mt-8 space-y-2"
        >
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <motion.li key={item.href} variants={fadeRight(12, 0.24)}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={[
                    "block rounded-lg px-3 py-2 text-base transition",
                    "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                    // colores consistentes con el resto del sitio (oscuro, sin “pill” blanca)
                    active
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-white/10 bg-transparent text-neutral-300/90 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>

        {cta && (
          <Link href={cta.href} onClick={onClose} className="mt-6 block">
            <motion.span
              variants={hoverLift}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm"
            >
              {cta.label}
              <ArrowRight className="size-4" />
            </motion.span>
          </Link>
        )}

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs uppercase tracking-wide text-neutral-300">Availability</div>
          <div className="mt-1 text-sm text-white">Q4 slots open</div>
        </div>
      </motion.div>
    </motion.aside>
  );
}
