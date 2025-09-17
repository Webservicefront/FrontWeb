"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useReducedMotion as useFramerReduced } from "framer-motion";

export type MotionSetting = "system" | "reduced" | "full";

const KEY = "ui.motion";

export function useReduceMotion(defaultSetting: MotionSetting = "system") {
  const systemReduced = useFramerReduced();
  const [setting, setSetting] = useState<MotionSetting>(() => {
    if (typeof window === "undefined") return defaultSetting;
    const stored = window.localStorage.getItem(KEY) as MotionSetting | null;
    return stored ?? defaultSetting;
  });

  const reduced = useMemo(() => {
    if (setting === "system") return systemReduced;
    return setting === "reduced";
  }, [setting, systemReduced]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.dataset.motion = reduced ? "reduced" : "full";
  }, [reduced]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(KEY, setting);
  }, [setting]);

  const setSystem = useCallback(() => setSetting("system"), []);
  const setReduced = useCallback(() => setSetting("reduced"), []);
  const setFull = useCallback(() => setSetting("full"), []);

  const duration = useCallback((ms: number) => (reduced ? 0 : ms), [reduced]);
  const delay = useCallback((ms: number) => (reduced ? 0 : ms), [reduced]);
  const scale = useMemo(() => (reduced ? 0.5 : 1), [reduced]);

  function withMotion<T extends Record<string, any>>(transition?: T): T | { duration: number; delay?: number } | undefined {
    if (!transition) return reduced ? { duration: 0 } : undefined;
    if (!reduced) return transition;
    const { delay: d, ...rest } = transition;
    return { ...rest, duration: 0, delay: 0 };
  }

  return {
    setting,
    setSetting,
    setSystem,
    setReduced,
    setFull,
    reduced,
    systemReduced,
    duration,
    delay,
    scale,
    withMotion,
  };
}

export default useReduceMotion;
