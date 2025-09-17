// src/app/process/page.tsx
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Process from "@/components/sections/ProcessSteps";

export const metadata: Metadata = buildMetadata({ title: "Process", path: "/process" });

export default function Page() {
  return <Process />;
}
