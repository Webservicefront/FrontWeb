// src/config/site.ts

export const SITE = {
  name: "Tylvra",
  tagline: "AI, Web, and Software Development.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tylvra.com",
  locale: "en",
  twitter: "@tylvra",
  ogImage: "/og.jpg",
} as const;

export const CONTACT = {
  email: "jorge.arellano@utec.edu.pe",
  phone: "+51 989 147 467",
  location: "Lima, Peru",
} as const;

export const ROUTES = {
  home: "/",
  features: "/features",
  useCases: "/use-cases",
  process: "/process",
  pricing: "/pricing",
  about: "/about",
  blog: "/blog",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  status: "/status",
} as const;

export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const;

export const LAYOUT = {
  headerHeight: 72,
  headerHeightMobile: 64,
  container: {
    sm: 672,
    md: 896,
    lg: 1152,
    xl: 1408,
    full: Infinity,
  },
  gridGap: 16,
} as const;

export const Z_INDEX = {
  base: 0,
  header: 40,
  dropdown: 30,
  modal: 50,
  toast: 55,
  tooltip: 60,
} as const;

export const EASING = {
  standard: [0.2, 0.8, 0.2, 1] as const,
  entrance: [0.16, 1, 0.3, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
} as const;

export const SPRING = {
  soft: { stiffness: 160, damping: 22, mass: 1 },
  medium: { stiffness: 220, damping: 24, mass: 1 },
  firm: { stiffness: 400, damping: 28, mass: 1 },
} as const;

export const MOTION = {
  durations: {
    xs: 120,
    sm: 180,
    md: 240,
    lg: 320,
  },
  stagger: {
    sm: 0.06,
    md: 0.08,
    lg: 0.12,
  },
} as const;

export const MARQUEE = {
  duration: 18,
  gap: 40,
} as const;

export const THEME = {
  colors: {
    bg: "#0a0a0a",
    fg: "#ffffff",
    primary: "#6366f1",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#f43f5e",
  },
} as const;

export const ANALYTICS = {
  provider: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "console",
  debug: (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG || "false") === "true",
} as const;

export const PATHS = {
  logos: "/logos/partners",
  avatars: "/images/avatars",
  icons: "/icons",
} as const;

export const SEO_DEFAULTS = {
  titleTemplate: "%s • Tylvra",
  description:
    "Tylvra delivers high-performance software: AI solutions, modern web apps, robust APIs, and scalable systems with accessibility and SEO built in.",
  twitterCard: "summary_large_image",
} as const;
