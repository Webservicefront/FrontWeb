"use client";

import { forwardRef, ReactNode } from "react";
import { motion, type HTMLMotionProps, type MotionValue } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { hoverLift, tapPress } from "@/components/animations/variants";

const buttonStyles = cva(
  "inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid: "border border-white/10 bg-white text-neutral-900 hover:bg-neutral-200",
        soft: "border border-white/10 bg-white/5 hover:bg-white/10",
        ghost: "bg-transparent hover:bg-white/5",
        link: "bg-transparent underline underline-offset-4 hover:opacity-90",
      },
      tone: {
        neutral: "",
        primary: "",
        success: "",
        warning: "",
        danger: "",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
      },
      rounded: {
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
      block: {
        true: "w-full",
        false: "",
      },
      elevated: {
        true: "shadow-sm",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "solid", tone: "primary", class: "bg-indigo-500 text-white hover:bg-indigo-400" },
      { variant: "solid", tone: "success", class: "bg-emerald-500 text-white hover:bg-emerald-400" },
      { variant: "solid", tone: "warning", class: "bg-amber-500 text-neutral-900 hover:bg-amber-400" },
      { variant: "solid", tone: "danger", class: "bg-rose-500 text-white hover:bg-rose-400" },
      { variant: "soft", tone: "primary", class: "hover:bg-indigo-500/15" },
      { variant: "soft", tone: "success", class: "hover:bg-emerald-500/15" },
      { variant: "soft", tone: "warning", class: "hover:bg-amber-500/15" },
      { variant: "soft", tone: "danger", class: "hover:bg-rose-500/15" },
      { variant: "ghost", tone: "primary", class: "hover:bg-indigo-500/10" },
      { variant: "ghost", tone: "success", class: "hover:bg-emerald-500/10" },
      { variant: "ghost", tone: "warning", class: "hover:bg-amber-500/10" },
      { variant: "ghost", tone: "danger", class: "hover:bg-rose-500/10" },
    ],
    defaultVariants: {
      variant: "solid",
      tone: "neutral",
      size: "md",
      rounded: "lg",
      block: false,
      elevated: false,
    },
  }
);

type ButtonProps = HTMLMotionProps<"button"> &
  VariantProps<typeof buttonStyles> & {
    leftIcon?: React.ComponentType<{ className?: string }>;
    rightIcon?: React.ComponentType<{ className?: string }>;
    loading?: boolean;
    children?: ReactNode | MotionValue<number> | MotionValue<string>;
  };

function cn(...i: Array<string | undefined | null | false>) {
  return twMerge(i.filter(Boolean).join(" "));
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, tone, size, rounded, block, elevated, leftIcon: Left, rightIcon: Right, loading, disabled, children, ...rest },
  ref
) {
  const content = children as unknown as ReactNode;

  return (
    <motion.button
      ref={ref}
      variants={hoverLift}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      disabled={disabled || loading}
      className={cn(buttonStyles({ variant, tone, size, rounded, block, elevated }), className)}
      {...rest}
    >
      {loading ? (
        <svg className="mr-2 size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" />
        </svg>
      ) : Left ? (
        <Left className="mr-2 size-4" />
      ) : null}
      <motion.span variants={tapPress} whileTap="tap" className="inline-flex items-center">
        <span>{content}</span>
      </motion.span>
      {Right ? <Right className="ml-2 size-4" /> : null}
    </motion.button>
  );
});

export default Button;
