"use client";

import {
  SITE,
  CONTACT,
  ROUTES,
  BREAKPOINTS,
  LAYOUT,
  Z_INDEX,
  EASING,
  SPRING,
  MOTION,
  MARQUEE,
  THEME,
  ANALYTICS,
  PATHS,
  SEO_DEFAULTS,
} from "@/lib/constants";
import { absoluteUrl } from "@/lib/seo";
import { NAV_PRIMARY, NAV_SECONDARY, NAV_LEGAL, SOCIALS, BRAND, isActivePath } from "@/data/navigation";

export type SiteConfig = {
  brand: typeof BRAND & { logo?: string; logoDark?: string; favicon?: string };
  site: typeof SITE;
  contact: typeof CONTACT;
  routes: typeof ROUTES;
  nav: {
    primary: typeof NAV_PRIMARY;
    secondary: typeof NAV_SECONDARY;
    legal: typeof NAV_LEGAL;
  };
  socials: typeof SOCIALS;
  theme: typeof THEME;
  layout: typeof LAYOUT & { z: typeof Z_INDEX; breakpoints: typeof BREAKPOINTS };
  motion: { easing: typeof EASING; spring: typeof SPRING; tokens: typeof MOTION; marquee: typeof MARQUEE };
  analytics: typeof ANALYTICS;
  assets: { paths: typeof PATHS; og: string };
  seo: typeof SEO_DEFAULTS;
  sections: {
    order: string[];
    enabled: Record<string, boolean>;
  };
  helpers: {
    url: (path?: string) => string;
    isActive: (pathname: string) => (href: string) => boolean;
    socialByLabel: (label: string) => (typeof SOCIALS)[number] | undefined;
  };
};

export const siteConfig: SiteConfig = {
  brand: {
    ...BRAND,
    logo: "/logo.svg",
    logoDark: "/logo-dark.svg",
    favicon: "/favicon.ico",
  },
  site: SITE,
  contact: CONTACT,
  routes: ROUTES,
  nav: {
    primary: NAV_PRIMARY,
    secondary: NAV_SECONDARY,
    legal: NAV_LEGAL,
  },
  socials: SOCIALS,
  theme: THEME,
  layout: {
    ...LAYOUT,
    z: Z_INDEX,
    breakpoints: BREAKPOINTS,
  },
  motion: {
    easing: EASING,
    spring: SPRING,
    tokens: MOTION,
    marquee: MARQUEE,
  },
  analytics: ANALYTICS,
  assets: {
    paths: PATHS,
    og: absoluteUrl(SITE.ogImage),
  },
  seo: SEO_DEFAULTS,
  sections: {
    order: ["hero", "logos", "features", "use-cases", "process", "faq", "cta"],
    enabled: {
      hero: true,
      logos: true,
      features: true,
      "use-cases": true,
      process: true,
      faq: true,
      cta: true,
    },
  },
  helpers: {
    url: (path?: string) => absoluteUrl(path),
    isActive: (pathname: string) => isActivePath(pathname),
    socialByLabel: (label: string) => SOCIALS.find((s) => s.label.toLowerCase() === label.toLowerCase()),
  },
};

export default siteConfig;
