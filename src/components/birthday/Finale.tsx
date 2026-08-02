import { motion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { finale, person, photos } from "@/content/birthday";
import { celebrate } from "@/lib/celebrate";
import { Section, SoftButton } from "./primitives";

const SPARKS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: (i * 43) % 100,
  top: (i * 29) % 100,
  delay: (i % 11) * 0.7,
  duration: 8 + ((i * 3) % 10),
}));

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: (i * 29) % 96,
  delay: i * 0.7,
  duration: 10 + ((i * 3) % 8),
  size: 8 + (i % 4) * 3,
}));

export function Finale() {
  const ref = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          setFired(true);
          void celebrate("finale");
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [fired]);

  const floaters = useMemo(() => photos.slice(0, 5), []);

  const replay = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    window.location.reload();
  };

  return (
    <Section id="finale" className="items-center justify-center overflow-hidden text-center">
      <div ref={ref} className="absolute inset-0" aria-hidden />

      {/* brighter aurora bloom for the ending */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 70% at 50% 30%, var(--blush), transparent 62%), radial-gradient(90% 60% at 20% 90%, var(--lavender), transparent 60%)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {SPARKS.map((f) => (
        <motion.span
          key={f.id}
          aria-hidden
          className="pointer-events-none absolute h-1 w-1 rounded-full"
          style={{ left: `${f.left}%`, top: `${f.top}%`, background: "var(--gold)", boxShadow: "0 0 10px var(--gold)" }}
          animate={{ opacity: [0, 0.95, 0], y: [0, -40, -80], x: [0, 14, -8] }}
          transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {PETALS.map((p) => (
        <motion.span
          key={`p-${p.id}`}
          aria-hidden
          className="pointer-events-none absolute -top-10"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.7,
            background: "var(--dusty)",
            borderRadius: "60% 40% 55% 45% / 55% 60% 40% 45%",
            opacity: 0.45,
          }}
          animate={{ y: ["0vh", "110vh"], x: [0, 26, -20, 8], rotate: [0, 260] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <div className="relative flex w-full items-end justify-center gap-3">
        {floaters.map((photo, i) => (
          <motion.img
            key={photo}
            src={photo}
            alt=""
            width={828}
            height={1104}
            loading="lazy"
            decoding="async"
            className="h-[68px] w-[52px] rounded-xl border border-hairline object-cover"
            style={{ boxShadow: "var(--shadow-soft)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.92, y: 0 }}
            viewport={{ once: true }}
            animate={{ y: [0, -8, 0], rotate: [(i - 2) * 3, (i - 2) * 3 + 2, (i - 2) * 3] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}
      </div>

      <motion.h2
        className="relative mt-12 font-display text-[3.4rem] leading-[1.02] font-light text-gradient-gold"
        initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {finale.title}
      </motion.h2>

      <motion.p
        className="eyebrow relative mt-4 text-[0.8rem]"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        {person.name}
      </motion.p>

      {/* <motion.div
        className="relative mt-9"
        animate={{ scale: [1, 1.16, 1, 1.1, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="h-6 w-6" style={{ color: "var(--rose)", fill: "var(--rose)" }} />
      </motion.div> */}

      <motion.p
        className="relative mt-9 max-w-[24ch] font-hand text-2xl text-plum/90"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.8 }}
      >
        {finale.quote}
      </motion.p>

      {/* <motion.div
        className="relative mt-12"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <SoftButton onClick={replay} className="flex items-center gap-2 px-7 py-3.5">
          <RotateCcw className="h-3.5 w-3.5" style={{ color: "var(--rose)" }} />
          <span className="text-plum">{finale.replay}</span>
        </SoftButton>
      </motion.div> */}

      <p className="eyebrow relative mt-14">{finale.outro}</p>
    </Section>
  );
}
