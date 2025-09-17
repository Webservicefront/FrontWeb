// src/app/use-cases/page.tsx
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import UseCases from "@/components/sections/UseCases";

export const metadata: Metadata = buildMetadata({ title: "Use cases", path: "/use-cases" });

export default function Page() {
  return <UseCases />;
}
