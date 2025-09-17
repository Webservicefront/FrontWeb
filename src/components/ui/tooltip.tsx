"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { motion, type HTMLMotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { scaleIn } from "@/components/animations/variants";
import { useViewportParallax } from "@/components/animations/parallax";

type Placement = "top" | "bottom" | "left" | "right";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  id: string;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  placement: Placement;
  offset: number;
  glow: boolean;
  delay: number;
};

const TooltipCtx = createContext<Ctx | null>(null);

type RootProps = {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (v: boolean) => void;
  delay?: number;
  placement?: Placement;
  offset?: number;
  glow?: boolean;
} & HTMLMotionProps<"div">;

export function Tooltip({
  children,
  open,
  defaultOpen,
  onOpenChange,
  delay = 100,
  placement = "top",
  offset = 10,
  glow = false,
  ...rest
}: RootProps) {
  const id = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [internal, setInternal] = useState<boolean>(!!defaultOpen);
  const isControlled = open !== undefined;
  const current = isControlled ? !!open : internal;

  const setOpen = useCallback(
    (v: boolean) => {
      if (!isControlled) setInternal(v);
      onOpenChange?.(v);
    },
    [isControlled, onOpenChange]
  );

  return (
    <TooltipCtx.Provider
      value={{ open: current, setOpen, id, triggerRef, contentRef, placement, offset, glow, delay }}
    >
      <motion.div {...rest}>{children}</motion.div>
    </TooltipCtx.Provider>
  );
}

type TriggerProps = {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
} & HTMLMotionProps<"button">;

export function TooltipTrigger({ asChild, children, className, ...rest }: TriggerProps) {
  const ctx = useTooltipCtx();
  const timer = useRef<number | null>(null);

  const show = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => ctx.setOpen(true), ctx.delay);
  };

  const hide = () => {
    if (timer.current) window.clearTimeout(timer.current);
    ctx.setOpen(false);
  };

  const baseProps = {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Escape") ctx.setOpen(false);
    },
    "aria-describedby": ctx.open ? ctx.id : undefined,
    "data-state": ctx.open ? "open" : "closed",
  };

  if (asChild) {
    return (
      <span
        ref={ctx.triggerRef as unknown as React.Ref<HTMLSpanElement>}
        className={className}
        {...baseProps}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.button
      type="button"
      ref={ctx.triggerRef as unknown as React.Ref<HTMLButtonElement>}
      className={twMerge("inline-flex items-center", className)}
      {...baseProps}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

type ContentProps = {
  children: ReactNode;
  className?: string;
  side?: Placement;
  sideOffset?: number;
  asPortal?: boolean;
} & HTMLMotionProps<"div">;

export function TooltipContent({
  children,
  className,
  side,
  sideOffset,
  asPortal = true,
  ...rest
}: ContentProps) {
  const ctx = useTooltipCtx();
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; origin: string }>({
    top: -9999,
    left: -9999,
    origin: "center",
  });

  const placement = side ?? ctx.placement;
  const offset = sideOffset ?? ctx.offset;

  const updatePosition = useCallback(() => {
    const t = ctx.triggerRef.current;
    const c = ctx.contentRef.current;
    if (!t || !c) return;
    const tr = t.getBoundingClientRect();
    const cw = c.offsetWidth;
    const ch = c.offsetHeight;
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = 0;
    let left = 0;
    let origin = "center";

    if (placement === "top") {
      top = tr.top + scrollY - ch - offset;
      left = tr.left + scrollX + tr.width / 2 - cw / 2;
      origin = "bottom";
    } else if (placement === "bottom") {
      top = tr.bottom + scrollY + offset;
      left = tr.left + scrollX + tr.width / 2 - cw / 2;
      origin = "top";
    } else if (placement === "left") {
      top = tr.top + scrollY + tr.height / 2 - ch / 2;
      left = tr.left + scrollX - cw - offset;
      origin = "right";
    } else {
      top = tr.top + scrollY + tr.height / 2 - ch / 2;
      left = tr.right + scrollX + offset;
      origin = "left";
    }

    setCoords({ top, left, origin });
  }, [ctx.triggerRef, ctx.contentRef, placement, offset]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!ctx.open) return;
    updatePosition();
    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [ctx.open, updatePosition]);

  const par = useViewportParallax(
    ctx.glow ? { translate: { y: [6, -6] }, opacity: [0.9, 1], scale: [1, 1.02] } : {}
  );

  const content = (
    <motion.div
      ref={ctx.contentRef}
      id={ctx.id}
      role="tooltip"
      initial="hidden"
      animate={ctx.open ? "show" : "hidden"}
      variants={scaleIn(0.96)}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
        position: "absolute",
        top: coords.top,
        left: coords.left,
        transformOrigin: coords.origin,
      }}
      className={twMerge(
        "z-[60] max-w-xs rounded-lg border border-white/10 bg-neutral-900/95 px-3 py-1.5 text-xs text-neutral-100 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-neutral-900/80",
        className
      )}
      {...rest}
    >
      {ctx.glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          style={{ opacity: par.style.opacity as unknown as number }}
        >
          <motion.div
            style={{ y: par.style.y, scale: par.style.scale }}
            className="absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/25 via-sky-500/15 to-cyan-400/15 blur-2xl"
          />
        </div>
      )}
      {children}
    </motion.div>
  );

  if (!mounted) return null;
  if (!asPortal) return content;
  return createPortal(content, document.body);
}

function useTooltipCtx() {
  const ctx = useContext(TooltipCtx);
  if (!ctx) throw new Error("Tooltip components must be used within <Tooltip>");
  return ctx;
}

export default Tooltip;
