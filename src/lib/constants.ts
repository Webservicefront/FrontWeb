// src/lib/constants.ts

export const SITE = {
  name: "Your Brand",
  tagline: "Design. Motion. Clarity.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourbrand.com",
  locale: "en",
  twitter: "@yourbrand",
  ogImage: "/og.jpg",
};

export const CONTACT = {
  email: "hello@yourbrand.com",
  phone: "+51 999 999 999",
  location: "Lima, Peru",
};

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
};

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
};

export const SPRING = {
  soft: { stiffness: 160, damping: 22, mass: 1 },
  medium: { stiffness: 220, damping: 24, mass: 1 },
  firm: { stiffness: 400, damping: 28, mass: 1 },
};

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
};

export const MARQUEE = {
  duration: 18,
  gap: 40,
};

export const THEME = {
  colors: {
    bg: "#0a0a0a",
    fg: "#ffffff",
    primary: "#6366f1",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#f43f5e",
  },
};

export const ANALYTICS = {
  provider: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || "console",
  debug: (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG || "false") === "true",
};

export const PATHS = {
  logos: "/logos/partners",
  avatars: "/images/avatars",
  icons: "/icons",
};

export const SEO_DEFAULTS = {
  titleTemplate: "%s • Your Brand",
  description:
    "Refined, fast websites with meaningful motion, accessibility by default, and a scalable design system.",
  twitterCard: "summary_large_image",
};
