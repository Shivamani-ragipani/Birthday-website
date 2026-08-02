import { motion } from "framer-motion";
import { Cake, Heart, Sparkle, Sparkles, Star } from "lucide-react";
import { timeline } from "@/content/birthday";
import { Eyebrow, Reveal, Section } from "./primitives";

const ICONS = [Sparkle, Sparkles, Heart, Cake, Star];

/** Emotional vertical timeline — floating glass cards on a drawn gradient line. */
export function Timeline() {
  return (
    <Section id="timeline" full={false} className="py-24">
      <Eyebrow>{timeline.eyebrow}</Eyebrow>
      <Reveal delay={0.1}>
        <h2 className="mt-4 font-display text-5xl font-light text-plum">{timeline.title}</h2>
      </Reveal>

      <div className="relative mt-12 pl-9">
        <motion.span
          aria-hidden
          className="absolute left-[13px] top-2 w-px origin-top"
          style={{
            background: "linear-gradient(to bottom, var(--rose), var(--lavender), var(--gold))",
            bottom: "1rem",
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="space-y-6">
          {timeline.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const today = item.label.toLowerCase() === "today";
            return (
              <motion.div
                key={item.label}
                className="relative"
                initial={{ opacity: 0, x: 22, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.span
                  className="glass-strong absolute -left-9 top-4 grid h-[26px] w-[26px] place-items-center rounded-full"
                  animate={today ? { scale: [1, 1.14, 1] } : undefined}
                  transition={{ duration: 2.2, repeat: today ? Infinity : 0, ease: "easeInOut" }}
                >
                  <Icon className="h-3 w-3" style={{ color: today ? "var(--rose)" : "var(--gold)" }} />
                </motion.span>

                <div
                  className="glass relative overflow-hidden rounded-[1.5rem] px-6 py-5"
                  style={{
                    animation: `float-soft ${6.5 + i * 0.6}s ease-in-out ${i * 0.4}s infinite`,
                    willChange: "transform",
                  }}
                >
                  {today && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl"
                      style={{ background: "var(--blush)", opacity: 0.9 }}
                    />
                  )}
                  <p
                    className="relative font-display text-2xl font-light"
                    style={{ color: today ? "var(--rose-deep)" : "var(--plum)" }}
                  >
                    {item.label}
                  </p>
                  <p className="relative mt-1 text-xs text-muted-foreground">{item.note}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
