"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { fadeUp, hoverLift, tapPress } from "@/components/animations/variants";
import { useViewportParallax } from "@/components/animations/parallax";

type TabsContextValue = {
  value: string;
  setValue: (v: string) => void;
  baseId: string;
  orientation: "horizontal" | "vertical";
};

const TabsCtx = createContext<TabsContextValue | null>(null);

const listStyles = cva(
  "relative inline-flex w-full items-center justify-start overflow-x-auto rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur",
  {
    variants: {
      align: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
      },
      size: {
        sm: "gap-1",
        md: "gap-1.5",
        lg: "gap-2",
      },
    },
    defaultVariants: {
      align: "start",
      size: "md",
    },
  }
);

const triggerStyles = cva(
  "relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-lg px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
      },
      active: {
        true: "text-neutral-900",
        false: "text-neutral-300/90 hover:text-white",
      },
    },
    defaultVariants: {
      size: "md",
      active: false,
    },
  }
);

const panelStyles = cva("mt-6", {
  variants: {
    padded: { true: "", false: "" },
  },
  defaultVariants: { padded: true },
});

function cn(...i: Array<string | null | undefined | false>) {
  return twMerge(i.filter(Boolean).join(" "));
}

type TabsProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  orientation?: "horizontal" | "vertical";
  children?: ReactNode;
  className?: string;
  reveal?: boolean;
  glow?: boolean;
} & HTMLMotionProps<"div">;

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  children,
  className,
  reveal,
  glow,
  ...rest
}: TabsProps) {
  const baseId = useId();
  const [internal, setInternal] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const current = isControlled ? (value as string) : internal;

  const setValue = useCallback(
    (v: string) => {
      if (!isControlled) setInternal(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange]
  );

  const ctx = useMemo<TabsContextValue>(
    () => ({ value: current, setValue, baseId, orientation }),
    [current, setValue, baseId, orientation]
  );

  const par = useViewportParallax(
    glow ? { translate: { y: [10, -8] }, opacity: [0.2, 0.5], scale: [1, 1.02] } : {}
  );

  return (
    <TabsCtx.Provider value={ctx}>
      <motion.div
        variants={reveal ? fadeUp(12) : undefined}
        initial={reveal ? "hidden" : false}
        whileInView={reveal ? "show" : undefined}
        viewport={reveal ? { once: true, margin: "-80px" } : undefined}
        className={cn("relative", className)}
        {...rest}
      >
        {glow && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            style={{ opacity: par.style.opacity as unknown as number }}
          >
            <motion.div
              style={{ y: par.style.y, scale: par.style.scale }}
              className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-500/10 to-cyan-400/10 blur-3xl"
            />
          </div>
        )}
        {children}
      </motion.div>
    </TabsCtx.Provider>
  );
}

type TabsListProps = {
  align?: VariantProps<typeof listStyles>["align"];
  size?: VariantProps<typeof listStyles>["size"];
  children?: ReactNode;
  className?: string;
  reveal?: boolean;
} & HTMLMotionProps<"div">;

export function TabsList({ align, size, children, className, reveal, ...rest }: TabsListProps) {
  const ctx = useTabsCtx();
  const ref = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (ctx.orientation === "horizontal" && !["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    if (ctx.orientation === "vertical" && !["ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) return;

    const tabs = Array.from(ref.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? []);
    const idx = tabs.findIndex((el) => el === document.activeElement);
    if (tabs.length === 0) return;

    let next = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1 + tabs.length) % tabs.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;

    const target = tabs[next];
    const val = target?.getAttribute("data-value");
    if (val) {
      ctx.setValue(val);
      target.focus();
    }
    e.preventDefault();
  };

  return (
    <motion.div
      ref={ref}
      role="tablist"
      aria-orientation={ctx.orientation}
      variants={reveal ? fadeUp(10) : undefined}
      className={cn(listStyles({ align, size }), className)}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type TabsTriggerProps = {
  value: string;
  size?: VariantProps<typeof triggerStyles>["size"];
  children?: ReactNode;
  className?: string;
} & HTMLMotionProps<"button">;

export function TabsTrigger({ value, size, children, className, ...rest }: TabsTriggerProps) {
  const ctx = useTabsCtx();
  const isActive = ctx.value === value;
  const tabId = `${ctx.baseId}-tab-${slug(value)}`;
  const panelId = `${ctx.baseId}-panel-${slug(value)}`;

  const variants = useMemo(() => ({ ...hoverLift, ...tapPress }), []);

  return (
    <motion.button
      role="tab"
      id={tabId}
      data-value={value}
      aria-selected={isActive}
      aria-controls={panelId}
      onClick={() => ctx.setValue(value)}
      variants={variants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={cn(triggerStyles({ size, active: isActive }), className)}
      {...rest}
    >
      <span className="relative inline-flex items-center">
        <span className="relative z-10">{children}</span>
        {isActive && (
          <motion.span
            layoutId={`${ctx.baseId}-tabs-underline`}
            className="absolute inset-0 -z-10 rounded-md bg-white"
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          />
        )}
      </span>
    </motion.button>
  );
}

type TabsContentProps = {
  value: string;
  children?: ReactNode;
  className?: string;
  padded?: VariantProps<typeof panelStyles>["padded"];
} & HTMLMotionProps<"div">;

export function TabsContent({ value, children, className, padded, ...rest }: TabsContentProps) {
  const ctx = useTabsCtx();
  const isActive = ctx.value === value;
  const panelId = `${ctx.baseId}-panel-${slug(value)}`;
  const tabId = `${ctx.baseId}-tab-${slug(value)}`;

  return (
    <motion.div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      hidden={!isActive}
      variants={fadeUp(12)}
      initial={false}
      animate={isActive ? "show" : "hidden"}
      className={cn(panelStyles({ padded }), className)}
      {...rest}
    >
      {isActive ? children : null}
    </motion.div>
  );
}

function useTabsCtx() {
  const ctx = useContext(TabsCtx);
  if (!ctx) throw new Error("Tabs components must be used within <Tabs>");
  return ctx;
}

function slug(v: string) {
  return v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "");
}

export default Tabs;
