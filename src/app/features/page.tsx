// src/app/features/page.tsx
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import FeaturesGrid from "@/components/sections/FeaturesGrid";

export const metadata: Metadata = buildMetadata({ title: "Features", path: "/features" });

export default function Page() {
  return <FeaturesGrid />;
}
