// src/lib/seo.ts
import type { Metadata } from "next";
import { SITE, SEO_DEFAULTS } from "@/config/site";

type OgImage = string | { url: string; width?: number; height?: number; alt?: string };
type RobotsLike = boolean | Metadata["robots"];

export type SEOInput = {
  title?: string;
  description?: string;
  path?: string;
  canonical?: string;
  images?: OgImage[];
  type?: "website" | "article" | "profile" | "book" | "music.song" | "music.album" | "video.movie" | "video.episode";
  locale?: string;
  siteName?: string;
  noIndex?: boolean;
  robots?: RobotsLike;
  keywords?: string[];
  authors?: { name: string; url?: string }[];
  publishedTime?: string;
  modifiedTime?: string;
};

const PROTO_RE = /^https?:\/\//i;

function baseUrl() {
  const env =
    SITE?.url ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "http://localhost:3000";
  const withProto = PROTO_RE.test(env) ? env : `https://${env}`;
  return withProto.replace(/\/+$/, "");
}

export function absoluteUrl(path?: string) {
  const base = baseUrl();
  if (!path) return base + "/";
  if (PROTO_RE.test(path)) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

function ensureArray<T>(v?: T | T[]): T[] {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

function normalizeImages(list?: OgImage[]) {
  return ensureArray(list).map((img) =>
    typeof img === "string" ? { url: absoluteUrl(img) } : { ...img, url: absoluteUrl(img.url) }
  );
}

function resolveTitle(title?: string) {
  const tpl = SEO_DEFAULTS?.titleTemplate ?? "%s";
  const siteName = SITE?.name ?? "";
  if (!title) return tpl.replace("%s", siteName);
  if (title.includes("%s")) return title.replace("%s", siteName);
  return tpl.replace("%s", title);
}

function resolveDescription(desc?: string) {
  return desc || SEO_DEFAULTS?.description || "";
}

function resolveCanonical(path?: string, canonical?: string) {
  if (canonical) return absoluteUrl(canonical);
  if (!path) return undefined;
  return absoluteUrl(path);
}

type RobotsValue = Exclude<Metadata["robots"], null | undefined>;
type RobotsObject = Exclude<RobotsValue, string>;
type GoogleBotObject = Exclude<RobotsObject["googleBot"], string | undefined>;

function resolveRobots(noIndex?: boolean, robots?: RobotsLike): Metadata["robots"] {
  if (typeof robots === "string") return robots;
  if (robots === false || noIndex) {
    return { index: false, follow: false, googleBot: { index: false, follow: false } };
  }
  const baseGoogle: GoogleBotObject = {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-video-preview": -1,
    "max-snippet": -1,
  } as any;
  const r = (robots && robots !== true ? (robots as RobotsObject) : {}) as RobotsObject;
  const googleMerged =
    typeof r.googleBot === "string" ? r.googleBot : { ...baseGoogle, ...(r.googleBot ?? {}) };
  return { index: r.index ?? true, follow: r.follow ?? true, nocache: r.nocache, googleBot: googleMerged };
}

export function buildMetadata(input: SEOInput = {}): Metadata {
  const title = resolveTitle(input.title);
  const description = resolveDescription(input.description);
  const canonical = resolveCanonical(input.path, input.canonical);
  const images = normalizeImages(input.images?.length ? input.images : [SITE?.ogImage ?? "/og.jpg"]);
  const locale = input.locale || SITE.locale || "en";
  const siteName = input.siteName || SITE.name;

  const ogUrl = canonical || absoluteUrl(input.path || "/"); // <-- siempre string

  const og: NonNullable<Metadata["openGraph"]> = {
    title,
    description,
    url: ogUrl,
    siteName,
    type: input.type || "website",
    locale,
    images: images.map((i) => ({ url: i.url, width: i.width, height: i.height, alt: i.alt })),
    ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
    ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
  };

  return {
    title,
    description,
    applicationName: siteName,
    metadataBase: new URL(baseUrl()),
    keywords: input.keywords,
    authors: input.authors,
    alternates: canonical ? { canonical } : undefined,
    openGraph: og,
    twitter: {
      card: (SEO_DEFAULTS?.twitterCard as "summary" | "summary_large_image") || "summary_large_image",
      site: SITE.twitter,
      title,
      description,
      images: images.map((i) => i.url),
    },
    robots: resolveRobots(input.noIndex, input.robots),
    icons: {
      icon: [
        { url: "/favicon.ico?v=2" },
        { url: "/icon-192.png?v=2", type: "image/png", sizes: "192x192" }
      ],
      apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180" }],
      shortcut: [{ url: "/favicon.ico?v=2" }]
    },
    manifest: "/site.webmanifest",    other: { "og:url": ogUrl }, 
    referrer: "strict-origin-when-cross-origin",
    formatDetection: { email: false, address: false, telephone: false },
  };
}

export function websiteJsonLd(init?: { name?: string; url?: string; searchUrlTemplate?: string }) {
  const data: any = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: init?.name || SITE.name,
    url: init?.url || baseUrl(),
  };
  if (init?.searchUrlTemplate) {
    data.potentialAction = {
      "@type": "SearchAction",
      target: `${absoluteUrl(init.searchUrlTemplate)}{search_term_string}`,
      "query-input": "required name=search_term_string",
    };
  }
  return JSON.stringify(data);
}

export function organizationJsonLd(init: { name: string; url?: string; logo?: string; sameAs?: string[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: init.name,
    url: init.url || baseUrl(),
    logo: init.logo ? absoluteUrl(init.logo) : undefined,
    sameAs: ensureArray(init.sameAs),
  };
  return JSON.stringify(data);
}

export function breadcrumbJsonLd(items: Array<{ name: string; item: string }>) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((x, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: x.name,
      item: absoluteUrl(x.item),
    })),
  };
  return JSON.stringify(data);
}

export function articleJsonLd(init: {
  headline: string;
  description?: string;
  image?: string[];
  author: { name: string }[];
  datePublished: string;
  dateModified?: string;
  url?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: init.headline,
    description: init.description,
    image: ensureArray(init.image).map((u) => absoluteUrl(u)),
    author: init.author.map((a) => ({ "@type": "Person", name: a.name })),
    datePublished: init.datePublished,
    dateModified: init.dateModified || init.datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": init.url || absoluteUrl("/") },
  };
  return JSON.stringify(data);
}

export function canonicalFor(path?: string) {
  return resolveCanonical(path);
}

export function ogImages(images?: OgImage[]) {
  return normalizeImages(images);
}

export function titleFor(v?: string) {
  return resolveTitle(v);
}

export default {
  buildMetadata,
  absoluteUrl,
  canonicalFor,
  ogImages,
  titleFor,
  websiteJsonLd,
  organizationJsonLd,
  breadcrumbJsonLd,
  articleJsonLd,
};
