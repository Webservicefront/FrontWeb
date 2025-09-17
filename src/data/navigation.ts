import type { ComponentType } from "react";
import { Twitter, Github, Linkedin } from "lucide-react";

export type NavLink = { label: string; href: string; external?: boolean };
export type SocialLink = { label: string; href: string; Icon: ComponentType<{ className?: string }>; rel?: string };

export const BRAND = {
  initials: "JB",
  name: "Your Brand",
  location: "Lima, Peru",
  email: "hello@yourbrand.com",
  phone: "+51 999 999 999",
};

export const NAV_PRIMARY: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Use cases", href: "/use-cases" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const NAV_SECONDARY: NavLink[] = [
  { label: "Changelog", href: "/changelog" },
  { label: "Guides", href: "/guides" },
  { label: "Resources", href: "/resources" },
  { label: "Status", href: "/status" },
];

export const NAV_LEGAL: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

export const SOCIALS: SocialLink[] = [
  { label: "Twitter", href: "https://twitter.com", Icon: Twitter, rel: "me" },
  { label: "GitHub", href: "https://github.com", Icon: Github, rel: "me" },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin, rel: "me" },
];

export function isActivePath(pathname: string) {
  return (href: string) => pathname === href || pathname.startsWith(href + "/");
}

export default {
  BRAND,
  NAV_PRIMARY,
  NAV_SECONDARY,
  NAV_LEGAL,
  SOCIALS,
  isActivePath,
};
