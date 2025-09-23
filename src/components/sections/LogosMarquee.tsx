// src/components/sections/LogosMarquee.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/primitives/Container";
import MaxWidthWrapper from "@/components/primitives/MaxWidthWrapper";
import { fadeUp, staggerContainer } from "@/components/animations/variants";

type Logo = { src: string; alt: string; width?: number; height?: number };

type Props = {
  title?: string;
  logos?: Logo[];
  durationMs?: number;
  grayscale?: boolean;
  gap?: string;
};

const defaults: Logo[] = [
  { src: "/icons/react.svg", alt: "React", width: 120, height: 40 },
  { src: "/icons/nextjs.svg", alt: "Next.js", width: 120, height: 40 },
  { src: "/icons/typescript.svg", alt: "TypeScript", width: 120, height: 40 },
  { src: "/icons/tailwind.svg", alt: "Tailwind CSS", width: 120, height: 40 },
  { src: "/icons/nodejs.svg", alt: "Node.js", width: 120, height: 40 },
  { src: "/icons/supabase.svg", alt: "Supabase", width: 120, height: 40 },
  { src: "/icons/appwrite.svg", alt: "Appwrite", width: 120, height: 40 },
  { src: "/icons/postgres.svg", alt: "PostgreSQL", width: 120, height: 40 },
  { src: "/icons/aws.svg", alt: "AWS", width: 120, height: 40 },
  { src: "/icons/vercel.svg", alt: "Vercel", width: 120, height: 40 },
];

function dup<T>(arr: T[]) {
  return [...arr, ...arr];
}

export default function LogosMarquee({
  title = "Technologies we use",
  logos = defaults,
  durationMs = 20000,
  grayscale = true,
  gap = "gap-8",
}: Props) {
  const row = dup(logos);
  const rowAlt = dup([...logos].reverse());
  const imgClass = [
    "opacity-80 transition will-change-transform",
    grayscale ? "grayscale hover:grayscale-0 hover:opacity-100" : "hover:opacity-100",
  ].join(" ");

  return (
    <section className="relative">
      <Container reveal bgGlow py="lg">
        <MaxWidthWrapper reveal size="lg" px="md" align="center">
          <motion.div variants={fadeUp(12)} className="mx-auto max-w-3xl">
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
              {title}
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.06, 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="relative mt-8 overflow-hidden"
          >
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-neutral-950 to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-neutral-950 to-transparent" />

            <motion.div variants={fadeUp(10)} className="relative">
              <div
                className={`flex ${gap} w-max items-center [animation:marquee_linear_infinite]`}
                style={{
                  animationDuration: `${durationMs}ms`,
                }}
              >
                {row.map((l, i) => (
                  <div
                    key={`r1-${i}-${l.src}`}
                    className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 will-change-transform"
                  >
                    <Image
                      src={l.src}
                      alt={l.alt}
                      width={l.width ?? 120}
                      height={l.height ?? 40}
                      className={imgClass}
                      priority={i < 2}
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      sizes="(max-width: 640px) 96px, 120px"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp(10)} className="relative mt-4">
              <div
                className={`flex ${gap} w-max items-center [animation:marqueeAlt_linear_infinite]`}
                style={{
                  animationDuration: `${durationMs}ms`,
                }}
              >
                {rowAlt.map((l, i) => (
                  <div
                    key={`r2-${i}-${l.src}`}
                    className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 will-change-transform"
                  >
                    <Image
                      src={l.src}
                      alt={l.alt}
                      width={l.width ?? 120}
                      height={l.height ?? 40}
                      className={imgClass}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 640px) 96px, 120px"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </MaxWidthWrapper>
      </Container>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes marqueeAlt {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        :global(.\[animation\:marquee_linear_infinite\]) {
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        :global(.\[animation\:marqueeAlt_linear_infinite\]) {
          animation-name: marqueeAlt;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.\[animation\:marquee_linear_infinite\]),
          :global(.\[animation\:marqueeAlt_linear_infinite\]) {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
