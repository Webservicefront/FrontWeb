// src/components/animations/variants.ts
import { Variants, Transition } from "framer-motion";

export const easing = {
  standard: [0.2, 0.6, 0.2, 1] as const,
  emphasize: [0.2, 0.8, 0.2, 1] as const,
  decel: [0.05, 0.9, 0.1, 1] as const,
  accel: [0.4, 0, 1, 1] as const,
};

const isReduced =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const durations = {
  xs: 0.14,
  sm: 0.2,
  md: 0.28,
  lg: 0.4,
  xl: 0.56,
};

export const durationsMobile = {
  xs: 0.12,
  sm: 0.18,
  md: 0.24,
  lg: 0.32,
  xl: 0.44,
};

const tr = (duration = durations.md, ease: Transition["ease"] = easing.standard): Transition => ({
  duration: isReduced ? 0.01 : duration,
  ease: isReduced ? "linear" : ease,
});

const dist = (v: number) => (isReduced ? 0 : v);

export const staggerContainer = (staggerChildren = 0.04, delayChildren = 0): Variants => ({
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: isReduced ? 0 : staggerChildren,
      delayChildren: isReduced ? 0 : delayChildren,
    },
  },
});

export const fade = (duration = durations.md, ease: Transition["ease"] = easing.standard): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: tr(duration, ease) },
});

export const fadeUp = (
  distance = 18,
  duration = durations.md,
  ease: Transition["ease"] = easing.emphasize
): Variants => ({
  hidden: { opacity: 0, y: dist(distance) },
  show: { opacity: 1, y: 0, transition: tr(duration, ease) },
});

export const fadeUpMobile = (
  distance = 8,
  duration = durationsMobile.sm,
  ease: Transition["ease"] = easing.emphasize
): Variants => fadeUp(distance, duration, ease);

export const fadeDown = (
  distance = 18,
  duration = durations.md,
  ease: Transition["ease"] = easing.emphasize
): Variants => ({
  hidden: { opacity: 0, y: dist(-distance) },
  show: { opacity: 1, y: 0, transition: tr(duration, ease) },
});

export const fadeDownMobile = (
  distance = 8,
  duration = durationsMobile.sm,
  ease: Transition["ease"] = easing.emphasize
): Variants => fadeDown(distance, duration, ease);

export const fadeLeft = (
  distance = 18,
  duration = durations.md,
  ease: Transition["ease"] = easing.emphasize
): Variants => ({
  hidden: { opacity: 0, x: dist(distance) },
  show: { opacity: 1, x: 0, transition: tr(duration, ease) },
});

export const fadeRight = (
  distance = 18,
  duration = durations.md,
  ease: Transition["ease"] = easing.emphasize
): Variants => ({
  hidden: { opacity: 0, x: dist(-distance) },
  show: { opacity: 1, x: 0, transition: tr(duration, ease) },
});

export const slideUp = (
  distance = 28,
  duration = durations.lg,
  ease: Transition["ease"] = easing.decel
): Variants => ({
  hidden: { y: dist(distance) },
  show: { y: 0, transition: tr(duration, ease) },
});

export const slideDown = (
  distance = 28,
  duration = durations.lg,
  ease: Transition["ease"] = easing.decel
): Variants => ({
  hidden: { y: dist(-distance) },
  show: { y: 0, transition: tr(duration, ease) },
});

export const slideLeft = (
  distance = 28,
  duration = durations.lg,
  ease: Transition["ease"] = easing.decel
): Variants => ({
  hidden: { x: dist(distance) },
  show: { x: 0, transition: tr(duration, ease) },
});

export const slideRight = (
  distance = 28,
  duration = durations.lg,
  ease: Transition["ease"] = easing.decel
): Variants => ({
  hidden: { x: dist(-distance) },
  show: { x: 0, transition: tr(duration, ease) },
});

export const scaleIn = (
  from = 0.98,
  duration = durations.md,
  ease: Transition["ease"] = easing.standard
): Variants => ({
  hidden: { opacity: 0, scale: isReduced ? 1 : from },
  show: { opacity: 1, scale: 1, transition: tr(duration, ease) },
});

export const rotateIn = (
  deg = 4,
  duration = durations.md,
  ease: Transition["ease"] = easing.standard
): Variants => ({
  hidden: { opacity: 0, rotate: isReduced ? 0 : deg },
  show: { opacity: 1, rotate: 0, transition: tr(duration, ease) },
});

export const blurIn = (
  px = 8,
  duration = durations.md,
  ease: Transition["ease"] = easing.standard
): Variants => ({
  hidden: { opacity: 0, filter: isReduced ? "blur(0px)" : `blur(${px}px)` },
  show: { opacity: 1, filter: "blur(0px)", transition: tr(duration, ease) },
});

export const maskReveal = (
  duration = durations.lg,
  ease: Transition["ease"] = easing.emphasize
): Variants => ({
  hidden: { opacity: 0, clipPath: isReduced ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" },
  show: { opacity: 1, clipPath: "inset(0 0 0% 0)", transition: tr(duration, ease) },
});

export const textReveal = (
  distance = 14,
  duration = durations.sm,
  ease: Transition["ease"] = easing.emphasize
): Variants => ({
  hidden: { y: dist(distance), opacity: 0 },
  show: { y: 0, opacity: 1, transition: tr(duration, ease) },
});

export const staggeredText = (
  itemDelay = 0.03,
  initialDelay = 0
): { container: Variants; item: Variants } => ({
  container: staggerContainer(itemDelay, initialDelay),
  item: textReveal(10, durations.xs, easing.emphasize),
});

export const marqueeX = (distance = 50, duration = 12): Variants => ({
  animate: {
    x: ["0%", `-${distance}%`],
    transition: { duration, ease: "linear", repeat: Infinity },
  },
});

export const hoverLift: Variants = {
  rest: { y: 0, scale: 1, boxShadow: "0 0 0 0 rgba(0,0,0,0)" },
  hover: {
    y: dist(4),
    scale: isReduced ? 1 : 1.02,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    transition: tr(durations.sm, easing.decel),
  },
};

export const tapPress: Variants = {
  hover: {},
  tap: { scale: isReduced ? 1 : 0.98, transition: tr(durations.xs, easing.accel) },
};

export const overlay: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: tr(durations.sm, easing.standard) },
  exit: { opacity: 0, transition: tr(durations.sm, easing.accel) },
};
