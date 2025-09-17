"use client";

import { RefObject, useMemo } from "react";
import {
  MotionValue,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

type UseScrollOpts = Parameters<typeof useScroll>[0];
export type Offset = UseScrollOpts extends { offset?: infer T } ? T : never;
export type Pair = [number, number];

export type ParallaxConfig = {
  offset?: Offset;
  translate?: { x?: Pair; y?: Pair };
  rotate?: Pair;
  scale?: Pair;
  opacity?: Pair;
  clamp?: boolean;
  ease?: ((t: number) => number) | Array<(t: number) => number>;
  spring?: { stiffness?: number; damping?: number; mass?: number };
};

export type ParallaxResult = {
  progress: MotionValue<number>;
  style: {
    x?: MotionValue<number>;
    y?: MotionValue<number>;
    rotate?: MotionValue<number>;
    scale?: MotionValue<number>;
    opacity?: MotionValue<number>;
  };
};

function buildOptions(config?: ParallaxConfig) {
  return { clamp: config?.clamp ?? true, ease: config?.ease };
}

function scaleRange([a, b]: Pair, factor: number, baseline = 0) {
  const sa = baseline + (a - baseline) * factor;
  const sb = baseline + (b - baseline) * factor;
  return [sa, sb] as Pair;
}

function maybeSpring(v: MotionValue<number>, cfg?: ParallaxConfig) {
  if (!cfg?.spring) return v;
  const { stiffness = 220, damping = 26, mass = 1 } = cfg.spring;
  return useSpring(v, { stiffness, damping, mass });
}

export function useParallaxElement(ref: RefObject<HTMLElement>, config: ParallaxConfig = {}): ParallaxResult {
  const prefersReduced = useReducedMotion();
  const factor = prefersReduced ? 0.3 : 1;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: (config.offset ?? (["start end", "end start"] as const)) as Offset,
  });
  const opts = useMemo(() => buildOptions(config), [config.clamp, config.ease]);

  const x = config.translate?.x
    ? maybeSpring(useTransform(scrollYProgress, [0, 1], scaleRange(config.translate.x, factor), opts), config)
    : undefined;

  const y = config.translate?.y
    ? maybeSpring(useTransform(scrollYProgress, [0, 1], scaleRange(config.translate.y, factor), opts), config)
    : undefined;

  const rotate = config.rotate
    ? maybeSpring(useTransform(scrollYProgress, [0, 1], scaleRange(config.rotate, factor), opts), config)
    : undefined;

  const scale = config.scale
    ? maybeSpring(useTransform(scrollYProgress, [0, 1], scaleRange(config.scale, factor, 1), opts), config)
    : undefined;

  const opacity = config.opacity
    ? maybeSpring(useTransform(scrollYProgress, [0, 1], config.opacity, opts), config)
    : undefined;

  return { progress: scrollYProgress, style: { x, y, rotate, scale, opacity } };
}

export function useParallaxViewport(config: ParallaxConfig = {}): ParallaxResult {
  const prefersReduced = useReducedMotion();
  const factor = prefersReduced ? 0.3 : 1;
  const { scrollYProgress } = useScroll();
  const opts = useMemo(() => buildOptions(config), [config.clamp, config.ease]);

  const x = config.translate?.x
    ? maybeSpring(useTransform(scrollYProgress, [0, 1], scaleRange(config.translate.x, factor), opts), config)
    : undefined;

  const y = config.translate?.y
    ? maybeSpring(useTransform(scrollYProgress, [0, 1], scaleRange(config.translate.y, factor), opts), config)
    : undefined;

  const rotate = config.rotate
    ? maybeSpring(useTransform(scrollYProgress, [0, 1], scaleRange(config.rotate, factor), opts), config)
    : undefined;

  const scale = config.scale
    ? maybeSpring(useTransform(scrollYProgress, [0, 1], scaleRange(config.scale, factor, 1), opts), config)
    : undefined;

  const opacity = config.opacity
    ? maybeSpring(useTransform(scrollYProgress, [0, 1], config.opacity, opts), config)
    : undefined;

  return { progress: scrollYProgress, style: { x, y, rotate, scale, opacity } };
}

export function useParallax(ref?: RefObject<HTMLElement>, config: ParallaxConfig = {}): ParallaxResult {
  return ref ? useParallaxElement(ref, config) : useParallaxViewport(config);
}

export function useParallaxValue(
  progress: MotionValue<number>,
  range: Pair,
  config: Omit<ParallaxConfig, "translate" | "rotate" | "scale" | "opacity" | "offset"> = {}
) {
  const prefersReduced = useReducedMotion();
  const factor = prefersReduced ? 0.3 : 1;
  const opts = useMemo(() => buildOptions(config), [config.clamp, config.ease]);
  return maybeSpring(useTransform(progress, [0, 1], scaleRange(range, factor), opts), config);
}

export function useMouseParallax(
  strength: { x?: number; y?: number } = { x: 12, y: 12 },
  spring: { stiffness?: number; damping?: number; mass?: number } = {}
) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: spring.stiffness ?? 180, damping: spring.damping ?? 22, mass: spring.mass ?? 1 });
  const sy = useSpring(py, { stiffness: spring.stiffness ?? 180, damping: spring.damping ?? 22, mass: spring.mass ?? 1 });

  function onMove(e: React.MouseEvent | MouseEvent) {
    const t = e.currentTarget as HTMLElement;
    const r = t.getBoundingClientRect();
    const mx = (e as MouseEvent).clientX - r.left;
    const my = (e as MouseEvent).clientY - r.top;
    const nx = (mx / r.width) * 2 - 1;
    const ny = (my / r.height) * 2 - 1;
    px.set(-nx * (strength.x ?? 0));
    py.set(-ny * (strength.y ?? 0));
  }

  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return { x: sx as MotionValue<number>, y: sy as MotionValue<number>, onMouseMove: onMove, onMouseLeave: onLeave };
}

export default useParallax;
