// src/app/about/page.tsx
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "About", path: "/about" });

export default function Page() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-semibold text-white">About</h1>
        <p className="mt-3 text-neutral-300/90">Studio and approach overview.</p>
      </div>
    </section>
  );
}
