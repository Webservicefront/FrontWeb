import { Variants, Transition } from "framer-motion";

export const easing = {
  standard: [0.2, 0.6, 0.2, 1] as const,
  emphasize: [0.2, 0.8, 0.2, 1] as const,
  decel: [0.05, 0.9, 0.1, 1] as const,
  accel: [0.4, 0, 1, 1] as const,
};

export const durations = {
  xs: 0.16,
  sm: 0.24,
  md: 0.32,
  lg: 0.48,
  xl: 0.64,
};

const tr = (duration = durations.md, ease: Transition["ease"] = easing.standard): Transition => ({
  duration,
  ease,
});

export const staggerContainer = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren, delayChildren } },
});

export const fade = (duration = durations.md, ease: Transition["ease"] = easing.standard): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: tr(duration, ease) },
});

export const fadeUp = (
  distance = 24,
  duration = durations.md,
  ease: Transition["ease"] = easing.emphasize
): Variants => ({
  hidden: { opacity: 0, y: distance },
  show: { opacity: 1, y: 0, transition: tr(duration, ease) },
});

export const fadeDown = (
  distance = 24,
  duration = durations.md,
  ease: Transition["ease"] = easing.emphasize
): Variants => ({
  hidden: { opacity: 0, y: -distance },
  show: { opacity: 1, y: 0, transition: tr(duration, ease) },
});

export const fadeLeft = (
  distance = 24,
  duration = durations.md,
  ease: Transition["ease"] = easing.emphasize
): Variants => ({
  hidden: { opacity: 0, x: distance },
  show: { opacity: 1, x: 0, transition: tr(duration, ease) },
});

export const fadeRight = (
  distance = 24,
  duration = durations.md,
  ease: Transition["ease"] = easing.emphasize
): Variants => ({
  hidden: { opacity: 0, x: -distance },
  show: { opacity: 1, x: 0, transition: tr(duration, ease) },
});

export const slideUp = (
  distance = 40,
  duration = durations.lg,
  ease: Transition["ease"] = easing.decel
): Variants => ({
  hidden: { y: distance },
  show: { y: 0, transition: tr(duration, ease) },
});

export const slideDown = (
  distance = 40,
  duration = durations.lg,
  ease: Transition["ease"] = easing.decel
): Variants => ({
  hidden: { y: -distance },
  show: { y: 0, transition: tr(duration, ease) },
});

export const slideLeft = (
  distance = 40,
  duration = durations.lg,
  ease: Transition["ease"] = easing.decel
): Variants => ({
  hidden: { x: distance },
  show: { x: 0, transition: tr(duration, ease) },
});

export const slideRight = (
  distance = 40,
  duration = durations.lg,
  ease: Transition["ease"] = easing.decel
): Variants => ({
  hidden: { x: -distance },
  show: { x: 0, transition: tr(duration, ease) },
});

export const scaleIn = (
  from = 0.96,
  duration = durations.md,
  ease: Transition["ease"] = easing.standard
): Variants => ({
  hidden: { opacity: 0, scale: from },
  show: { opacity: 1, scale: 1, transition: tr(duration, ease) },
});

export const rotateIn = (
  deg = 6,
  duration = durations.md,
  ease: Transition["ease"] = easing.standard
): Variants => ({
  hidden: { opacity: 0, rotate: deg },
  show: { opacity: 1, rotate: 0, transition: tr(duration, ease) },
});

export const blurIn = (
  px = 10,
  duration = durations.md,
  ease: Transition["ease"] = easing.standard
): Variants => ({
  hidden: { opacity: 0, filter: `blur(${px}px)` },
  show: { opacity: 1, filter: "blur(0px)", transition: tr(duration, ease) },
});

export const maskReveal = (
  duration = durations.lg,
  ease: Transition["ease"] = easing.emphasize
): Variants => ({
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  show: { opacity: 1, clipPath: "inset(0 0 0% 0)", transition: tr(duration, ease) },
});

export const textReveal = (
  distance = 20,
  duration = durations.sm,
  ease: Transition["ease"] = easing.emphasize
): Variants => ({
  hidden: { y: distance, opacity: 0 },
  show: { y: 0, opacity: 1, transition: tr(duration, ease) },
});

export const staggeredText = (
  itemDelay = 0.04,
  initialDelay = 0
): { container: Variants; item: Variants } => ({
  container: staggerContainer(itemDelay, initialDelay),
  item: textReveal(14, durations.xs, easing.emphasize),
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
    y: -6,
    scale: 1.02,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    transition: tr(durations.sm, easing.decel),
  },
};

export const tapPress: Variants = {
  hover: {},
  tap: { scale: 0.98, transition: tr(durations.xs, easing.accel) },
};

export const overlay: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: tr(durations.sm, easing.standard) },
  exit: { opacity: 0, transition: tr(durations.sm, easing.accel) },
};
