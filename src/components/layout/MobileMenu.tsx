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

      {/* Panel: claro/oscuro con buen contraste */}
      <motion.div
        variants={{ hidden: { x: "100%" }, show: { x: 0 } }}
        transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute right-0 top-0 h-full w-[84%] max-w-sm
                   border-l border-gray-200 bg-white text-gray-900
                   p-6 shadow-2xl
                   dark:border-white/10 dark:bg-neutral-950 dark:text-gray-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-content-center rounded-xl
                             bg-gray-900 text-white text-sm font-semibold
                             dark:bg-white dark:text-neutral-900">
              {brand?.initials ?? "JB"}
            </span>
            <span className="text-[15px] font-medium tracking-tight text-gray-900 dark:text-white">
              {brand?.name ?? "Your Brand"}
            </span>
          </div>

          <motion.button
            variants={tapPress}
            whileTap="tap"
            aria-label="Close"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg
                       border border-gray-300 bg-white p-2 text-gray-900 hover:bg-gray-50
                       dark:border-white/10 dark:bg-white/5 dark:text-white"
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
                    "block rounded-xl px-4 py-3 text-base transition",
                    "border focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-gray-400/50 dark:focus-visible:ring-white/30",
                    active
                      ? // Activo
                        "border-gray-300 bg-gray-100 text-gray-900 " +
                        "dark:border-white/20 dark:bg-white/10 dark:text-white"
                      : // Inactivo
                        "border-gray-200 bg-white text-gray-900 hover:bg-gray-50 " +
                        "dark:border-white/10 dark:bg-transparent dark:text-neutral-300/90 dark:hover:bg-white/5 dark:hover:text-white",
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl
                         border border-gray-300 bg-gray-900 px-4 py-3 text-sm font-semibold
                         text-white shadow-sm hover:bg-black
                         dark:border-white/10 dark:bg-white dark:text-neutral-900 dark:hover:bg-gray-100"
            >
              {cta.label}
              <ArrowRight className="size-4" />
            </motion.span>
          </Link>
        )}

        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4
                        dark:border-white/10 dark:bg-white/5">
          <div className="text-xs uppercase tracking-wide text-gray-600 dark:text-neutral-300">
            Availability
          </div>
          <div className="mt-1 text-sm text-gray-900 dark:text-white">Q4 slots open</div>
        </div>
      </motion.div>
    </motion.aside>
  );
}
