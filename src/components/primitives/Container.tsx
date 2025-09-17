"use client";

import { forwardRef, ElementType, ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { useViewportParallax } from "@/components/animations/parallax";
import { fadeUp, staggerContainer } from "@/components/animations/variants";

const containerStyles = cva("mx-auto w-full", {
  variants: {
    width: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
      xl: "max-w-[88rem]",
      full: "max-w-none",
    },
    px: {
      none: "",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
    },
    py: {
      none: "",
      sm: "py-6",
      md: "py-10",
      lg: "py-16",
    },
    center: {
      true: "text-center",
      false: "",
    },
    borderTop: {
      true: "border-t border-white/10",
      false: "",
    },
    borderBottom: {
      true: "border-b border-white/10",
      false: "",
    },
  },
  defaultVariants: {
    width: "lg",
    px: "md",
    py: "none",
    center: false,
    borderTop: false,
    borderBottom: false,
  },
});

type ExtraProps = {
  as?: ElementType;
  reveal?: boolean;
  stagger?: number;
  delay?: number;
  bgGlow?: boolean;
  children?: ReactNode;
  className?: string;
};

type Props = HTMLMotionProps<"div"> & VariantProps<typeof containerStyles> & ExtraProps;

function cn(...i: Array<string | undefined | null | false>) {
  return twMerge(i.filter(Boolean).join(" "));
}

const Container = forwardRef<HTMLDivElement, Props>(function Container(
  { as: As = "div", className, width, px, py, center, borderTop, borderBottom, children, reveal, stagger = 0.06, delay = 0, bgGlow, ...rest },
  ref
) {
  const par = useViewportParallax({
    translate: { y: [20, -10] },
    opacity: [0.2, 0.5],
    scale: [1, 1.02],
  });

  return (
    <motion.div
      ref={ref}
      variants={reveal ? staggerContainer(stagger, delay) : undefined}
      initial={reveal ? "hidden" : false}
      whileInView={reveal ? "show" : undefined}
      viewport={reveal ? { once: true, margin: "-80px" } : undefined}
      className={cn("relative", className)}
      {...rest}
    >
      {bgGlow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          style={{ opacity: par.style.opacity as unknown as number, transform: "translateZ(0)" }}
        >
          <motion.div
            style={{ y: par.style.y, scale: par.style.scale }}
            className="absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-500/10 to-cyan-400/10 blur-3xl"
          />
        </div>
      )}
      <motion.div variants={reveal ? fadeUp(16) : undefined}>
        <As className={containerStyles({ width, px, py, center, borderTop, borderBottom })}>{children}</As>
      </motion.div>
    </motion.div>
  );
});

export default Container;
