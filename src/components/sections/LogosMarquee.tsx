// src/components/sections/LogosMarquee.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/primitives/Container";
import MaxWidthWrapper from "@/components/primitives/MaxWidthWrapper";
import { fadeUp, staggerContainer } from "@/components/animations/variants";

type Logo = { src: string; alt: string };

type Props = {
  title?: string;
  logos?: Logo[];
  durationMs?: number;
  grayscale?: boolean;
  gap?: string;
};

const defaults: Logo[] = [
  { src: "/icons/react.svg", alt: "React" },
  { src: "/icons/nextjs.svg", alt: "Next.js" },
  { src: "/icons/typescript.svg", alt: "TypeScript" },
  { src: "/icons/tailwind.svg", alt: "Tailwind CSS" },
  { src: "/icons/nodejs.svg", alt: "Node.js" },
  { src: "/icons/supabase.svg", alt: "Supabase" },
  { src: "/icons/appwrite.svg", alt: "Appwrite" },
  { src: "/icons/postgres.svg", alt: "PostgreSQL" },
  { src: "/icons/aws.svg", alt: "AWS" },
  { src: "/icons/vercel.svg", alt: "Vercel" },
];

function dup<T>(arr: T[]) {
  return [...arr, ...arr];
}

export default function LogosMarquee({
  title = "Technologies we use",
  logos = defaults,
  durationMs = 20000,
  grayscale = true,
  gap = "gap-6 sm:gap-8",
}: Props) {
  const row = dup(logos);
  const rowAlt = dup([...logos].reverse());
  const imgClass = [
    "object-contain p-2 opacity-80 transition",
    grayscale ? "grayscale hover:grayscale-0 hover:opacity-100" : "hover:opacity-100",
  ].join(" ");

  const cardClass =
    "relative flex h-16 w-28 sm:h-20 sm:w-32 items-center justify-center rounded-xl border border-white/10 bg-white/5";

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
                style={{ animationDuration: `${durationMs}ms` }}
              >
                {row.map((l, i) => (
                  <div key={`r1-${i}-${l.src}`} className={cardClass}>
                    <Image
                      src={l.src}
                      alt={l.alt}
                      fill
                      className={imgClass}
                      priority={i < 2}
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      sizes="(max-width: 640px) 112px, 128px"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp(10)} className="relative mt-4">
              <div
                className={`flex ${gap} w-max items-center [animation:marqueeAlt_linear_infinite]`}
                style={{ animationDuration: `${durationMs}ms` }}
              >
                {rowAlt.map((l, i) => (
                  <div key={`r2-${i}-${l.src}`} className={cardClass}>
                    <Image
                      src={l.src}
                      alt={l.alt}
                      fill
                      className={imgClass}
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 640px) 112px, 128px"
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
