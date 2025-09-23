// src/components/sections/LogosMarquee.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/primitives/Container";
import MaxWidthWrapper from "@/components/primitives/MaxWidthWrapper";
import { fadeUp, staggerContainer, hoverLift, marqueeX } from "@/components/animations/variants";

type Logo = { src: string; alt: string; width?: number; height?: number };

type Props = {
  title?: string;
  logos?: Logo[];
  duration?: number;
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
  duration = 18,
  grayscale = true,
  gap = "gap-10",
}: Props) {
  const row = dup(logos);
  const rowAlt = dup([...logos].reverse());
  const imgClass = [
    "opacity-80 transition",
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
            variants={staggerContainer(0.08, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="relative mt-10 overflow-hidden"
          >
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-950 to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-950 to-transparent" />

            <motion.div variants={fadeUp(10)} className="relative">
              <motion.div
                variants={marqueeX(50, duration)}
                animate="animate"
                className={`flex ${gap} w-max items-center`}
              >
                {row.map((l, i) => (
                  <motion.div
                    key={`r1-${i}-${l.src}`}
                    variants={hoverLift}
                    initial="rest"
                    whileHover="hover"
                    className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <Image
                      src={l.src}
                      alt={l.alt}
                      width={l.width ?? 120}
                      height={l.height ?? 40}
                      className={imgClass}
                      priority={i < 4}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp(10)} className="relative mt-4">
              <motion.div
                animate={{ x: ["-50%", "0%"] }}
                transition={{ duration, ease: "linear", repeat: Infinity }}
                className={`flex ${gap} w-max items-center`}
              >
                {rowAlt.map((l, i) => (
                  <motion.div
                    key={`r2-${i}-${l.src}`}
                    variants={hoverLift}
                    initial="rest"
                    whileHover="hover"
                    className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <Image
                      src={l.src}
                      alt={l.alt}
                      width={l.width ?? 120}
                      height={l.height ?? 40}
                      className={imgClass}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </MaxWidthWrapper>
      </Container>
    </section>
  );
}
