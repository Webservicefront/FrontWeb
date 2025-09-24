// src/components/primitives/MaxWidthWrapper.tsx
"use client";

import { forwardRef, ElementType, ReactNode, HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { useViewportParallax } from "@/components/animations/parallax";
import { fadeUp, staggerContainer } from "@/components/animations/variants";

const wrapperStyles = cva("mx-auto w-full", {
  variants: {
    size: { sm: "max-w-3xl", md: "max-w-5xl", lg: "max-w-7xl", xl: "max-w-[88rem]", full: "max-w-none" },
    px: { none: "", sm: "px-4", md: "px-6", lg: "px-8" },
    align: { start: "text-left", center: "text-center", end: "text-right" },
  },
  defaultVariants: { size: "lg", px: "md", align: "start" },
});

type ExtraProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  reveal?: boolean;
  stagger?: number;
  delay?: number;
  bgGlow?: boolean;
  bleed?: boolean;
};

type Props = HTMLAttributes<HTMLDivElement> & VariantProps<typeof wrapperStyles> & ExtraProps;

function cn(...i: Array<string | undefined | null | false>) {
  return twMerge(i.filter(Boolean).join(" "));
}

const MaxWidthWrapper = forwardRef<HTMLDivElement, Props>(function MaxWidthWrapper(
  { as: As = "div", children, className, size, px, align, reveal, stagger = 0.06, delay = 0, bgGlow, bleed, ...rest },
  ref
) {
  const par = useViewportParallax({ translate: { y: [16, -8] }, opacity: [0.25, 0.55], scale: [1, 1.03] });

  const bleedClasses = bleed ? "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen max-w-none px-0" : "";

  if (!reveal) {
    return (
      <div ref={ref} className={cn("relative", className)}>
        {bgGlow && (
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-28 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-500/10 to-cyan-400/10 blur-3xl" />
          </div>
        )}
        <As {...rest} className={cn(wrapperStyles({ size, px, align }), bleedClasses)}>
          {children}
        </As>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer(stagger, delay)}
      initial={false}                 // << evita mismatch
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("relative", className)}
    >
      {bgGlow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          style={{ opacity: par.style.opacity as unknown as number, transform: "translateZ(0)" }}
        >
          <motion.div
            style={{ y: par.style.y, scale: par.style.scale }}
            className="absolute -top-28 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-500/10 to-cyan-400/10 blur-3xl"
          />
        </div>
      )}
      <motion.div variants={fadeUp(14)} initial={false}>
        <As className={cn(wrapperStyles({ size, px, align }), bleedClasses)}>{children}</As>
      </motion.div>
    </motion.div>
  );
});

export default MaxWidthWrapper;
