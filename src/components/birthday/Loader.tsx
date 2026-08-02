import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { loader, person } from "@/content/birthday";

const SPARKS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: 10 + ((i * 27) % 80),
  top: 12 + ((i * 41) % 76),
  size: 2 + (i % 3),
  delay: (i % 7) * 0.45,
  duration: 3.2 + ((i * 3) % 5),
}));

const TOTAL = 3400;

export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / TOTAL);
      // ease-out so it feels like it is settling, not loading
      setProgress(1 - Math.pow(1 - t, 2.2));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        window.setTimeout(() => setOpen(false), 460);
        window.setTimeout(onDone, 1200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const pct = Math.round(progress * 100);
  const message = useMemo(() => {
    const i = Math.min(loader.messages.length - 1, Math.floor(progress * loader.messages.length));
    return loader.messages[i];
  }, [progress]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center overflow-hidden px-8"
          style={{ background: "var(--cream)" }}
          exit={{ opacity: 0, filter: "blur(18px)", scale: 1.03 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* breathing gradient wash */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 20%, var(--blush), transparent 60%), radial-gradient(100% 70% at 20% 90%, var(--lavender), transparent 62%), radial-gradient(90% 60% at 90% 70%, var(--peach), transparent 60%)",
            }}
            animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {SPARKS.map((s) => (
            <motion.span
              key={s.id}
              aria-hidden
              className="pointer-events-none absolute rounded-full"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                background: "var(--gold)",
                boxShadow: "0 0 8px var(--gold)",
              }}
              animate={{ opacity: [0, 1, 0], y: [0, -26, -48], scale: [0.6, 1.2, 0.6] }}
              transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          <motion.div
            className="glass relative grid h-32 w-32 place-items-center rounded-full"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--edge)" strokeWidth="1" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--rose)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 45}
                strokeDashoffset={2 * Math.PI * 45 * (1 - progress)}
                style={{ filter: "drop-shadow(0 0 6px var(--rose))" }}
              />
            </svg>
            <motion.span
              className="font-display text-4xl font-light text-gradient-gold"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              {person.initial}
            </motion.span>
          </motion.div>

          <div className="relative mt-11 h-6 w-full max-w-[300px] text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={message}
                className="absolute inset-0 font-ui text-[0.72rem] font-medium tracking-[0.2em] text-foreground/70 uppercase"
                initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                transition={{ duration: 0.6 }}
              >
                {message}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            className="relative mt-4 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.9 }}
          >
            {loader.hint}
          </motion.p>

          <p className="relative mt-8 font-ui text-[0.65rem] tracking-[0.4em] text-muted-foreground/70">
            {String(pct).padStart(3, "0")}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
