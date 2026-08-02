import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { person, prelude } from "@/content/birthday";

const PETALS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: (i * 31) % 96,
  delay: i * 0.9,
  duration: 11 + ((i * 3) % 7),
  size: 7 + (i % 4) * 3,
}));

/**
 * Act zero — a quiet, mysterious threshold. Nothing is revealed until tapped.
 */
export function Prelude({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(true);

  const enter = () => {
    setOpen(false);
    window.setTimeout(onOpen, 700);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] overflow-hidden"
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0" style={{ background: "var(--cream)" }} />
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(110% 70% at 50% 15%, var(--blush), transparent 62%), radial-gradient(90% 60% at 15% 95%, var(--lavender), transparent 60%)",
            }}
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          {PETALS.map((p) => (
            <motion.span
              key={p.id}
              aria-hidden
              className="absolute -top-8 rounded-full"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size * 0.7,
                background: "var(--dusty)",
                borderRadius: "60% 40% 55% 45% / 55% 60% 40% 45%",
                opacity: 0.5,
              }}
              animate={{ y: ["0vh", "110vh"], x: [0, 28, -18, 10], rotate: [0, 220] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
            />
          ))}

          <button
            type="button"
            onClick={enter}
            aria-label={prelude.cta}
            className="relative z-10 flex h-full w-full flex-col items-center justify-center px-8 text-center"
          >
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.1 }}
            >
              {prelude.whisper}
            </motion.p>

            <motion.div
              className="glass-strong relative mt-10 grid h-24 w-24 place-items-center rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: "var(--rose)" }}
                animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="font-display text-3xl font-light text-gradient-gold">
                {person.initial}
              </span>
            </motion.div>

            <motion.h2
              className="mt-9 font-display text-[2.9rem] leading-none font-light text-gradient-rose"
              initial={{ opacity: 0, y: 16, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.8, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {prelude.title}
            </motion.h2>

            <motion.p
              className="mt-3 max-w-[26ch] text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 1 }}
            >
              {prelude.sub}
            </motion.p>

            <motion.span
              className="eyebrow mt-16"
              animate={{ opacity: [0.35, 1, 0.35], y: [0, -4, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              {prelude.cta}
            </motion.span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
