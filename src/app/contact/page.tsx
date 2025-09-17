import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = buildMetadata({ title: "Contact", path: "/contact" });

export default function Page() {
  return <CTA />;
}
