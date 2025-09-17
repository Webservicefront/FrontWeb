"use client";

import { forwardRef, ElementType, ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { fadeUp, hoverLift, tapPress } from "@/components/animations/variants";
import { useViewportParallax } from "@/components/animations/parallax";

const cardStyles = cva(
  "relative h-full w-full border backdrop-blur transition-colors",
  {
    variants: {
      variant: {
        soft: "border-white/10 bg-white/5",
        solid: "border-white/10 bg-white text-neutral-900",
        ghost: "border-transparent bg-transparent",
      },
      tone: {
        neutral: "",
        primary: "",
        success: "",
        warning: "",
        danger: "",
      },
      rounded: {
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        xl: "rounded-2xl",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
      },
      elevated: {
        true: "shadow-sm",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "solid", tone: "primary", class: "bg-indigo-500 text-white" },
      { variant: "solid", tone: "success", class: "bg-emerald-500 text-white" },
      { variant: "solid", tone: "warning", class: "bg-amber-500 text-neutral-900" },
      { variant: "solid", tone: "danger", class: "bg-rose-500 text-white" },

      { variant: "soft", tone: "primary", class: "hover:bg-indigo-500/10" },
      { variant: "soft", tone: "success", class: "hover:bg-emerald-500/10" },
      { variant: "soft", tone: "warning", class: "hover:bg-amber-500/10" },
      { variant: "soft", tone: "danger", class: "hover:bg-rose-500/10" },

      { variant: "ghost", tone: "primary", class: "hover:bg-indigo-500/5" },
      { variant: "ghost", tone: "success", class: "hover:bg-emerald-500/5" },
      { variant: "ghost", tone: "warning", class: "hover:bg-amber-500/5" },
      { variant: "ghost", tone: "danger", class: "hover:bg-rose-500/5" },
    ],
    defaultVariants: {
      variant: "soft",
      tone: "neutral",
      rounded: "xl",
      padding: "md",
      elevated: false,
    },
  }
);

const headerStyles = cva("flex flex-col gap-1", {
  variants: {
    padded: { true: "px-0 pt-0", false: "" },
  },
  defaultVariants: { padded: true },
});

const footerStyles = cva("flex items-center justify-between gap-3", {
  variants: {
    padded: { true: "px-0 pb-0", false: "" },
  },
  defaultVariants: { padded: true },
});

function cn(...i: Array<string | undefined | null | false>) {
  return twMerge(i.filter(Boolean).join(" "));
}

type BaseProps = {
  as?: ElementType;
  children?: ReactNode;
  reveal?: boolean;
  hoverable?: boolean;
  pressable?: boolean;
  glow?: boolean;
  className?: string;
};

type CardProps = HTMLMotionProps<"div"> &
  VariantProps<typeof cardStyles> &
  BaseProps;

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { as: As = "div", children, className, variant, tone, rounded, padding, elevated, reveal, hoverable = true, pressable = true, glow, ...rest },
  ref
) {
  const par = useViewportParallax(glow ? { translate: { y: [12, -8] }, opacity: [0.25, 0.55], scale: [1, 1.03] } : {});

  return (
    <motion.div
      ref={ref}
      variants={reveal ? fadeUp(12) : undefined}
      initial={reveal ? "hidden" : false}
      whileInView={reveal ? "show" : undefined}
      viewport={reveal ? { once: true, margin: "-80px" } : undefined}
      className="relative"
    >
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          style={{ opacity: par.style.opacity as unknown as number, transform: "translateZ(0)" }}
        >
          <motion.div
            style={{ y: par.style.y, scale: par.style.scale }}
            className="absolute -top-28 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/15 via-sky-500/10 to-cyan-400/10 blur-3xl"
          />
        </div>
      )}

      <motion.div
        variants={hoverable ? hoverLift : undefined}
        initial="rest"
        whileHover={hoverable ? "hover" : undefined}
        className={cn(cardStyles({ variant, tone, rounded, padding, elevated }), className)}
        {...rest}
      >
        <As className="contents">{children}</As>
      </motion.div>
    </motion.div>
  );
});

type SectionProps = HTMLMotionProps<"div"> & { children?: ReactNode; className?: string };
type TitleProps = HTMLMotionProps<"h3"> & { children?: ReactNode; className?: string };
type DescProps = HTMLMotionProps<"p"> & { children?: ReactNode; className?: string };

const CardHeader = ({ children, className, ...rest }: SectionProps) => (
  <motion.div className={cn(headerStyles({ padded: true }), className)} {...rest}>
    {children}
  </motion.div>
);

const CardTitle = ({ children, className, ...rest }: TitleProps) => (
  <motion.h3 className={cn("text-[15px] font-semibold tracking-tight", className)} {...rest}>
    {children}
  </motion.h3>
);

const CardDescription = ({ children, className, ...rest }: DescProps) => (
  <motion.p className={cn("text-sm text-neutral-300/90", className)} {...rest}>
    {children}
  </motion.p>
);

const CardContent = ({ children, className, ...rest }: SectionProps) => (
  <motion.div className={cn("mt-4", className)} {...rest}>
    {children}
  </motion.div>
);

const CardFooter = ({ children, className, ...rest }: SectionProps) => (
  <motion.div className={cn(footerStyles({ padded: true }), className)} {...rest}>
    {children}
  </motion.div>
);

export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export default Card;
