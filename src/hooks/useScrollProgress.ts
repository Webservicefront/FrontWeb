"use client";

import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MotionValue, useScroll, useSpring, useVelocity } from "framer-motion";

export type Offset = NonNullable<NonNullable<Parameters<typeof useScroll>[0]> extends { offset?: infer T } ? T : never>;
export type SectionInput = { id: string; ref: RefObject<HTMLElement> };

export function usePageProgress(smooth = true) {
  const { scrollY, scrollYProgress } = useScroll();
  const velocity = useVelocity(scrollY);
  const progress = smooth ? useSpring(scrollYProgress, { stiffness: 160, damping: 22, mass: 1 }) : scrollYProgress;
  return { y: scrollY, progress, rawProgress: scrollYProgress, velocity };
}

export function useSectionProgress(ref: RefObject<HTMLElement>, rootMargin = "-40% 0px -60% 0px") {
  const { scrollY } = useScroll();
  const progress = useSpring(0, { stiffness: 160, damping: 22 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * 0.4;
      const end = vh * 0.6;
      const p =
        r.top > end ? 0 :
        r.bottom < start ? 1 :
        1 - Math.min(1, Math.max(0, (r.top - start) / (end - start)));
      progress.set(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, progress, rootMargin, scrollY]);
  return progress as MotionValue<number>;
}

export function useActiveSection(sections: SectionInput[], rootMargin = "-45% 0px -55% 0px") {
  const [active, setActive] = useState<string | null>(null);
  const ratios = useRef<Record<string, number>>({});
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id || sections.find((s) => s.ref.current === entry.target)?.id;
          if (!id) continue;
          ratios.current[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        }
        const next =
          Object.keys(ratios.current).length === 0
            ? null
            : Object.entries(ratios.current).sort((a, b) => b[1] - a[1])[0][0];
        setActive(next);
      },
      { root: null, rootMargin, threshold: buildThresholds() }
    );
    sections.forEach(({ ref, id }) => {
      const el = ref.current || (typeof document !== "undefined" ? document.getElementById(id) : null);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections, rootMargin]);
  return active;
}

export function useScrollProgress(sections: SectionInput[] = [], opts?: { smooth?: boolean; rootMargin?: string }) {
  const { y, progress, rawProgress, velocity } = usePageProgress(opts?.smooth ?? true);
  const active = useActiveSection(sections, opts?.rootMargin ?? "-45% 0px -55% 0px");
  const map = useMemo(() => new Map(sections.map((s) => [s.id, s.ref])), [sections]);
  const scrollTo = useCallback(
    (id: string, behavior: ScrollBehavior = "smooth", offset = 0) => {
      const el = map.get(id)?.current || document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior });
    },
    [map]
  );
  return { y, progress, rawProgress, velocity, active, scrollTo };
}

export default useScrollProgress;

function buildThresholds() {
  const t: number[] = [];
  for (let i = 0; i <= 1.0; i += 0.05) t.push(parseFloat(i.toFixed(2)));
  return t;
}
