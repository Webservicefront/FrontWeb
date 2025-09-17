"use client";

import { forwardRef, ElementType } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { hoverLift, tapPress, fadeUp } from "@/components/animations/variants";
import { useViewportParallax } from "@/components/animations/parallax";

const wrapper = cva(
  "inline-flex items-center justify-center select-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
  {
    variants: {
      size: { xs: "h-7 w-7", sm: "h-8 w-8", md: "h-9 w-9", lg: "h-10 w-10", xl: "h-11 w-11" },
      rounded: { none: "rounded-none", sm: "rounded-md", md: "rounded-lg", lg: "rounded-xl", full: "rounded-full" },
      variant: { ghost: "bg-transparent", soft: "border border-white/10 bg-white/5 backdrop-blur", solid: "border border-white/10 bg-white text-neutral-900" },
      tone: { neutral: "", primary: "", success: "", warning: "", danger: "" },
      elevated: { true: "shadow-sm", false: "" },
    },
    compoundVariants: [
      { variant: "soft", tone: "neutral", class: "hover:bg-white/10" },
      { variant: "soft", tone: "primary", class: "hover:bg-indigo-500/15" },
      { variant: "soft", tone: "success", class: "hover:bg-emerald-500/15" },
      { variant: "soft", tone: "warning", class: "hover:bg-amber-500/15" },
      { variant: "soft", tone: "danger", class: "hover:bg-rose-500/15" },
      { variant: "ghost", tone: "neutral", class: "hover:bg-white/5" },
      { variant: "ghost", tone: "primary", class: "hover:bg-indigo-500/10" },
      { variant: "ghost", tone: "success", class: "hover:bg-emerald-500/10" },
      { variant: "ghost", tone: "warning", class: "hover:bg-amber-500/10" },
      { variant: "ghost", tone: "danger", class: "hover:bg-rose-500/10" },
      { variant: "solid", tone: "neutral", class: "bg-white text-neutral-900 hover:bg-neutral-200" },
      { variant: "solid", tone: "primary", class: "bg-indigo-500 text-white hover:bg-indigo-400" },
      { variant: "solid", tone: "success", class: "bg-emerald-500 text-white hover:bg-emerald-400" },
      { variant: "solid", tone: "warning", class: "bg-amber-500 text-neutral-900 hover:bg-amber-400" },
      { variant: "solid", tone: "danger", class: "bg-rose-500 text-white hover:bg-rose-400" },
    ],
    defaultVariants: { size: "md", rounded: "lg", variant: "soft", tone: "neutral", elevated: false },
  }
);

const glyph = cva("shrink-0", {
  variants: {
    size: { xs: "size-3.5", sm: "size-4", md: "size-5", lg: "size-5.5", xl: "size-6" },
    tone: { neutral: "text-neutral-200", primary: "text-indigo-300", success: "text-emerald-300", warning: "text-amber-900", danger: "text-rose-300" },
    variant: { ghost: "", soft: "", solid: "" },
  },
  compoundVariants: [
    { variant: "solid", tone: "neutral", class: "text-neutral-900" },
    { variant: "solid", tone: "primary", class: "text-white" },
    { variant: "solid", tone: "success", class: "text-white" },
    { variant: "solid", tone: "warning", class: "text-neutral-900" },
    { variant: "solid", tone: "danger", class: "text-white" },
  ],
  defaultVariants: { size: "md", tone: "neutral", variant: "soft" },
});

type BaseProps = {
  icon: React.ComponentType<{ className?: string }>;
  label?: string;
  as?: ElementType;
  parallax?: boolean;
  reveal?: boolean;
  className?: string;
};

type IconProps = HTMLMotionProps<"span"> & VariantProps<typeof wrapper> & VariantProps<typeof glyph> & BaseProps;

function cn(...i: Array<string | false | null | undefined>) {
  return twMerge(i.filter(Boolean).join(" "));
}

const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { icon: IconCmp, label, as: As = "span", size, rounded, variant, tone, elevated, parallax, reveal, className, ...rest },
  ref
) {
  const par = useViewportParallax(parallax ? { translate: { y: [8, -6] }, opacity: [0.85, 1], scale: [1, 1.04] } : {});

  return (
    <motion.span
      ref={ref}
      variants={reveal ? fadeUp(10) : undefined}
      initial={reveal ? "hidden" : false}
      whileInView={reveal ? "show" : undefined}
      viewport={reveal ? { once: true, margin: "-60px" } : undefined}
      className={cn(wrapper({ size, rounded, variant, tone, elevated }), className)}
      {...rest}
    >
      <motion.span
        variants={hoverLift}
        initial="rest"
        whileHover="hover"
        className="inline-flex items-center justify-center"
      >
        <motion.span
          variants={tapPress}
          whileTap="tap"
          style={parallax ? { opacity: par.style.opacity as unknown as number, y: par.style.y, scale: par.style.scale } : undefined}
          className={glyph({ size, tone, variant })}
          aria-hidden={label ? undefined : true}
          role={label ? "img" : undefined}
          aria-label={label}
        >
          <IconCmp className={glyph({ size, tone, variant })} />
        </motion.span>
        {label ? <As className="sr-only">{label}</As> : null}
      </motion.span>
    </motion.span>
  );
});

export default Icon;
