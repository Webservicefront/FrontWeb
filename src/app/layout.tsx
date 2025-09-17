// src/app/layout.tsx
import "./globals.css";
import "../styles/animations.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={SITE.locale || "en"} suppressHydrationWarning>
      <body className="bg-neutral-950 text-neutral-100 antialiased selection:bg-indigo-500/30">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_70%_-10%,rgba(99,102,241,0.12),transparent),radial-gradient(800px_400px_at_20%_10%,rgba(14,165,233,0.08),transparent)]" />
          <div className="bg-grid-muted absolute inset-0 opacity-[0.15]" />
        </div>
        <div className="relative flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1 pt-28 md:pt-32">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
