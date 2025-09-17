"use client";

type Provider = "plausible" | "gtag" | "umami" | "posthog" | "console" | "none";

type Props = Record<string, unknown>;

declare global {
  interface Window {
    doNotTrack?: string;
    gtag?: (...args: any[]) => void;
    plausible?: (event: string, opts?: { props?: Props; u?: string }) => void;
    umami?: any;
    posthog?: {
      capture: (name: string, props?: Props) => void;
      identify?: (id: string, props?: Props) => void;
      setPersonProperties?: (props: Props) => void;
      reset?: () => void;
    };
  }
}

const PROVIDER = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER as Provider) || "console";
const DNT_KEYS = ["1", "yes"];
const DISABLE_KEY = "ui.analytics.disabled";

function isBrowser() {
  return typeof window !== "undefined";
}

function dntEnabled() {
  if (!isBrowser()) return false;
  const n = navigator as any;
  const v = n.doNotTrack || n.msDoNotTrack || window.doNotTrack;
  return DNT_KEYS.includes(String(v));
}

function disabledByUser() {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(DISABLE_KEY) === "1";
}

function enabled() {
  return isBrowser() && !dntEnabled() && !disabledByUser() && PROVIDER !== "none";
}

let debug = (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG || "false") === "true";

function log(name: string, props?: Props) {
  if (debug || PROVIDER === "console") {
    console.log(`[analytics:${PROVIDER}]`, name, props || {});
  }
}

function sendToPlausible(name: string, props?: Props) {
  if (!window.plausible) return;
  if (name === "page_view") {
    const url = String(props?.url || window.location.href);
    const title = String(props?.title || document.title);
    window.plausible("pageview", { props: { url, title } });
  } else {
    window.plausible(name, { props });
  }
}

function sendToGtag(name: string, props?: Props) {
  if (!window.gtag) return;
  if (name === "page_view") {
    window.gtag("event", "page_view", {
      page_location: props?.url || window.location.href,
      page_title: props?.title || document.title,
      ...props,
    });
  } else {
    window.gtag("event", name, props || {});
  }
}

function sendToUmami(name: string, props?: Props) {
  const u = window.umami;
  if (!u) return;
  if (typeof u.track === "function") u.track(name === "page_view" ? "pageview" : name, props || {});
  else if (typeof u === "function") u(name === "page_view" ? "pageview" : name, props || {});
}

function sendToPosthog(name: string, props?: Props) {
  if (!window.posthog) return;
  const n = name === "page_view" ? "$pageview" : name;
  window.posthog.capture(n, props || {});
}

function dispatch(name: string, props?: Props) {
  if (!enabled()) return;
  log(name, props);
  if (PROVIDER === "plausible") sendToPlausible(name, props);
  else if (PROVIDER === "gtag") sendToGtag(name, props);
  else if (PROVIDER === "umami") sendToUmami(name, props);
  else if (PROVIDER === "posthog") sendToPosthog(name, props);
}

export function pageview(url?: string, title?: string, extra?: Props) {
  const u = url || (isBrowser() ? window.location.href : "");
  const t = title || (isBrowser() ? document.title : "");
  dispatch("page_view", { url: u, title: t, ...extra });
}

export function track(name: string, props?: Props) {
  dispatch(name, props);
}

export function identify(id: string, props?: Props) {
  if (!enabled()) return;
  log("identify", { id, ...(props || {}) });
  if (PROVIDER === "posthog" && window.posthog?.identify) window.posthog.identify(id, props);
  if (PROVIDER === "gtag" && window.gtag) window.gtag("set", { user_id: id, ...props });
}

export function setUserProperties(props: Props) {
  if (!enabled()) return;
  log("user_properties", props);
  if (PROVIDER === "posthog" && window.posthog?.setPersonProperties) window.posthog.setPersonProperties(props);
}

export function setDebug(v: boolean) {
  debug = v;
}

export function optOut() {
  if (!isBrowser()) return;
  window.localStorage.setItem(DISABLE_KEY, "1");
}

export function optIn() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(DISABLE_KEY);
}

export function setupRouteTracking(cb?: (url: string) => void) {
  if (!isBrowser()) return;
  const handler = () => {
    const url = window.location.href;
    pageview(url, document.title);
    cb?.(url);
  };
  return { onRouteChangeComplete: handler };
}

const analytics = {
  provider: PROVIDER,
  enabled,
  pageview,
  track,
  identify,
  setUserProperties,
  setDebug,
  optOut,
  optIn,
  setupRouteTracking,
};

export default analytics;
