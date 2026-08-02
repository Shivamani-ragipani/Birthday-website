import { motion } from "framer-motion";
import { letter, person } from "@/content/birthday";
import { Eyebrow, Reveal, Section } from "./primitives";

export function LetterSection() {
  return (
    <Section id="letter" className="justify-center">
      <Eyebrow>{letter.eyebrow}</Eyebrow>

      <Reveal delay={0.1}>
        <motion.div
          className="relative mt-6"
          initial={{ rotateX: 14, y: 18 }}
          whileInView={{ rotateX: 0, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 900 }}
        >
          {/* glass slab underneath the paper */}
          <div className="glass absolute -inset-3 rounded-[2rem]" />

          <div
            className="grain relative overflow-hidden rounded-[1.65rem] px-7 py-9"
            style={{
              background:
                "linear-gradient(170deg, oklch(0.995 0.008 60), oklch(0.975 0.016 45) 60%, oklch(0.96 0.024 38))",
              boxShadow: "var(--shadow-lift), inset 0 1px 0 oklch(1 0 0 / 0.9)",
              border: "1px solid var(--hairline)",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl"
              style={{ background: "var(--blush)", opacity: 0.75 }}
            />

            <h2 className="relative font-display text-4xl font-light text-plum">{letter.title}</h2>
            <p className="eyebrow relative mt-1">{person.name}</p>
            <span
              aria-hidden
              className="relative mt-5 block h-px w-16"
              style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }}
            />

            <div className="relative mt-7 space-y-5">
              {letter.lines.map((line, i) => (
                <motion.p
                  key={line}
                  className="font-hand text-[1.5rem] leading-[1.5] text-plum/90"
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1, delay: 0.25 + i * 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.p
              className="relative mt-8 font-hand text-xl"
              style={{ color: "var(--rose-deep)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              {letter.signature}
            </motion.p>
          </div>
        </motion.div>
      </Reveal>
    </Section>
  );
}
