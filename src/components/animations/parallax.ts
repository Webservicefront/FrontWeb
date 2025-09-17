import { RefObject, useMemo } from "react";
import { MotionValue, useScroll, useTransform } from "framer-motion";

type UseScrollOpts = Parameters<typeof useScroll>[0];
export type Offset = UseScrollOpts extends { offset?: infer T } ? T : never;
export type Range = [number, number];
export type Pair = [number, number];

export type ParallaxConfig = {
  offset?: Offset;
  translate?: { x?: Pair; y?: Pair };
  rotate?: Pair;
  scale?: Pair;
  opacity?: Pair;
  clamp?: boolean;
  ease?: ((t: number) => number) | Array<(t: number) => number>;
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

export function useElementParallax(
  ref: RefObject<HTMLElement>,
  config: ParallaxConfig = {}
): ParallaxResult {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: (config.offset ?? (["start end", "end start"] as const)) as Offset,
  });

  const opts = useMemo(() => buildOptions(config), [config.clamp, config.ease]);

  const x = config.translate?.x
    ? useTransform(scrollYProgress, [0, 1], config.translate.x, opts)
    : undefined;

  const y = config.translate?.y
    ? useTransform(scrollYProgress, [0, 1], config.translate.y, opts)
    : undefined;

  const rotate = config.rotate
    ? useTransform(scrollYProgress, [0, 1], config.rotate, opts)
    : undefined;

  const scale = config.scale
    ? useTransform(scrollYProgress, [0, 1], config.scale, opts)
    : undefined;

  const opacity = config.opacity
    ? useTransform(scrollYProgress, [0, 1], config.opacity, opts)
    : undefined;

  return { progress: scrollYProgress, style: { x, y, rotate, scale, opacity } };
}

export function useViewportParallax(config: ParallaxConfig = {}): ParallaxResult {
  const { scrollYProgress } = useScroll();
  const opts = useMemo(() => buildOptions(config), [config.clamp, config.ease]);

  const x = config.translate?.x
    ? useTransform(scrollYProgress, [0, 1], config.translate.x, opts)
    : undefined;

  const y = config.translate?.y
    ? useTransform(scrollYProgress, [0, 1], config.translate.y, opts)
    : undefined;

  const rotate = config.rotate
    ? useTransform(scrollYProgress, [0, 1], config.rotate, opts)
    : undefined;

  const scale = config.scale
    ? useTransform(scrollYProgress, [0, 1], config.scale, opts)
    : undefined;

  const opacity = config.opacity
    ? useTransform(scrollYProgress, [0, 1], config.opacity, opts)
    : undefined;

  return { progress: scrollYProgress, style: { x, y, rotate, scale, opacity } };
}
