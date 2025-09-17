// src/components/layout/Header.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { fadeDown, hoverLift, tapPress } from "@/components/animations/variants";

type NavItem = { label: string; href: string; disabled?: boolean };

const primary: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Use cases", href: "/#use-cases" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "#", disabled: true },
  { label: "About", href: "#", disabled: true },
  { label: "Blog", href: "#", disabled: true },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [elevated, setElevated] = useState(false);
  const { scrollY } = useScroll();
  const last = useRef(0);

  useMotionValueEvent(scrollY, "change", (v) => {
    const d = v - last.current;
    setHidden(v > 120 && d > 0);
    setElevated(v > 2);
    last.current = v;
  });

  useEffect(() => {
    if (open) document.documentElement.classList.add("overflow-hidden");
    else document.documentElement.classList.remove("overflow-hidden");
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  const isActive = useMemo(
    () => (href: string) => {
      const base = href.split("#")[0] || href;
      if (base === "#") return false;
      return pathname === base || pathname.startsWith(base + "/");
    },
    [pathname]
  );

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.28, ease: [0.2, 0.6, 0.2, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={[
          "mx-auto w-full max-w-7xl px-6",
          "transition-[padding] duration-300",
          elevated ? "py-3" : "py-4",
        ].join(" ")}
      >
        <motion.div
          variants={fadeDown(12, 0.28)}
          initial="hidden"
          animate="show"
          className={[
            "relative flex items-center justify-between gap-4 px-4 py-2",
            "backdrop-blur bg-transparent",
          ].join(" ")}
        >
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid size-9 place-content-center rounded-xl bg-white text-sm font-semibold text-neutral-900">
                JB
              </span>
              <span className="hidden text-[15px] font-medium tracking-tight text-white sm:inline">
                Apolo´s
              </span>
            </Link>
          </div>

          {/* Desktop nav (no changes) */}
          <nav className="hidden items-center gap-1 md:flex">
            {primary.map((item) =>
              item.disabled ? (
                <span
                  key={item.label}
                  aria-disabled="true"
                  title="Coming soon"
                  className="cursor-not-allowed rounded-lg px-3 py-2 text-sm text-neutral-500/60"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "rounded-lg px-3 py-2 text-sm transition",
                    isActive(item.href) ? "text-white" : "text-neutral-300/90 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/#contact" className="hidden md:inline-flex">
              <motion.span
                variants={hoverLift}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm"
              >
                Let’s talk
                <ArrowRight className="size-4" />
              </motion.span>
            </Link>

            <button
              aria-label="Menu"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 text-white md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile aside */}
      <motion.aside
        initial={false}
        animate={open ? "show" : "hidden"}
        variants={{ hidden: { pointerEvents: "none" }, show: { pointerEvents: "auto" } }}
        className="fixed inset-0 z-50 md:hidden"
      >
        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
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
                JM
              </span>
              <span className="text-[15px] font-medium tracking-tight text-white">Your Brand</span>
            </div>
            <motion.button
              variants={tapPress}
              whileTap="tap"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 text-white"
            >
              <X className="size-5" />
            </motion.button>
          </div>

          <div className="mt-8">
            <ul className="space-y-2">
              {primary.map((item) =>
                item.disabled ? (
                  <li key={item.label}>
                    <span
                      aria-disabled="true"
                      title="Coming soon"
                      className="block cursor-not-allowed rounded-lg px-3 py-2 text-base text-neutral-500/60"
                    >
                      {item.label}
                    </span>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={[
                        "block rounded-lg px-3 py-2 text-base transition",
                        "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                        // Igualar estilos al resto del sitio (oscuro, sin pills blancas)
                        isActive(item.href)
                          ? "border-white/20 bg-white/10 text-white"
                          : "border-white/10 bg-transparent text-neutral-300/90 hover:bg-white/5 hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            <Link href="/#contact" onClick={() => setOpen(false)} className="mt-6 block">
              {/* Mantengo el CTA blanco como en desktop; si lo quieres oscuro también, dime y lo cambio */}
              <motion.span
                variants={hoverLift}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm"
              >
                Let’s talk
                <ArrowRight className="size-4" />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </motion.aside>
    </motion.header>
  );
}
