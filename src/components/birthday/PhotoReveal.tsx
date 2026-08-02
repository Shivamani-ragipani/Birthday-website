import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { photoIntro, photos, photoWhispers } from "@/content/birthday";
import { Eyebrow, Reveal, Section } from "./primitives";

function Frame({ src, index }: { src: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.16, 1.02, 1.12]);
  const leak = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.5, 0]);

  const tilt = index % 2 === 0 ? -1.4 : 1.4;

  return (
    <div ref={ref} className="relative flex min-h-[84svh] flex-col justify-center py-6">
      <motion.div
        className="grain relative overflow-hidden rounded-[2rem] border border-hairline"
        style={{ boxShadow: "var(--shadow-lift)" }}
        initial={{ opacity: 0, filter: "blur(20px)", scale: 0.95, rotate: tilt }}
        whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="aspect-[3/4] w-full overflow-hidden">
          <motion.img
            src={src}
            alt=""
            width={828}
            height={1104}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            style={{ y, scale }}
          />
        </div>

        {/* warm light leak sweeping across as it scrolls */}
        <motion.div
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{
            opacity: leak,
            background:
              "linear-gradient(120deg, transparent 30%, oklch(0.92 0.09 60 / 0.55) 52%, transparent 72%)",
          }}
        />

        {/* glass caption shelf */}
        {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
          <motion.div
            className="glass-strong flex items-center justify-between rounded-full px-5 py-2.5"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, delay: 0.35 }}
          >
            <span className="font-hand text-lg text-plum">{photoWhispers[index] ?? ""}</span>
            <span className="eyebrow">{String(index + 1).padStart(2, "0")}</span>
          </motion.div>
        </div> */}
      </motion.div>
    </div>
  );
}

export function PhotoReveal() {
  return (
    <Section id="photos" full={false} className="py-16">
      <div className="mb-2">
        <Eyebrow>{photoIntro.eyebrow}</Eyebrow>
        <Reveal delay={0.1}>
          <h2 className="mt-4 font-display text-5xl font-light text-plum">{photoIntro.title}</h2>
        </Reveal>
      </div>

      {photos.map((src, i) => (
        <Frame key={src} src={src} index={i} />
      ))}
    </Section>
  );
}
