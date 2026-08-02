import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { game } from "@/content/birthday";
import { celebrate } from "@/lib/celebrate";
import { Eyebrow, Reveal, Section, SoftButton } from "./primitives";

type Falling = { id: number; left: number; duration: number; size: number; drift: number };

/** ~20 second premium mini-game: tap the falling stars. */
export function StarGame({ onWin }: { onWin?: () => void }) {
  const [state, setState] = useState<"idle" | "playing" | "won">("idle");
  const [caught, setCaught] = useState(0);
  const [stars, setStars] = useState<Falling[]>([]);
  const seed = useRef(0);

  const spawn = useCallback(() => {
    seed.current += 1;
    const id = seed.current;
    setStars((prev) => [
      ...prev.slice(-7),
      {
        id,
        left: 8 + Math.random() * 78,
        duration: 3.4 + Math.random() * 1.8,
        size: 22 + Math.random() * 16,
        drift: (Math.random() - 0.5) * 50,
      },
    ]);
  }, []);

  useEffect(() => {
    if (state !== "playing") return;
    spawn();
    const timer = window.setInterval(spawn, 720);
    return () => window.clearInterval(timer);
  }, [state, spawn]);

  const remove = (id: number) => setStars((prev) => prev.filter((s) => s.id !== id));

  const catchStar = (id: number) => {
    remove(id);
    setCaught((c) => {
      const next = c + 1;
      if (next >= game.goal) {
        setState("won");
        setStars([]);
        void celebrate("rain");
        onWin?.();
      }
      return next;
    });
  };

  const start = () => {
    setCaught(0);
    setState("playing");
  };

  const pct = Math.min(1, caught / game.goal);

  return (
    <Section id="game" className="items-center justify-center overflow-hidden text-center">
      <Eyebrow>{game.eyebrow}</Eyebrow>
      <Reveal delay={0.1}>
        <h2 className="mt-4 max-w-[16ch] font-display text-[2.6rem] leading-[1.08] font-light text-plum">
          {game.title}
        </h2>
      </Reveal>
      <Reveal delay={0.18}>
        <p className="mt-3 max-w-[28ch] text-sm text-muted-foreground">{game.sub}</p>
      </Reveal>

      <Reveal delay={0.24} className="w-full">
        <div
          className="glass relative mx-auto mt-9 h-[380px] w-full max-w-[350px] overflow-hidden rounded-[2rem]"
          style={{ touchAction: "manipulation" }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full blur-3xl"
            style={{ background: "var(--lavender)", opacity: 0.55 }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full blur-3xl"
            style={{ background: "var(--blush)", opacity: 0.65 }}
          />

          {/* progress */}
          <div className="absolute inset-x-6 top-5 z-20 flex items-center gap-3">
            <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/60">
              <motion.div
                className="h-full origin-left rounded-full"
                style={{ background: "linear-gradient(90deg, var(--rose), var(--gold))" }}
                animate={{ scaleX: pct }}
                initial={{ scaleX: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              />
            </div>
            <span className="eyebrow tracking-[0.2em]">
              {caught}/{game.goal}
            </span>
          </div>

          <AnimatePresence>
            {stars.map((s) => (
              <motion.button
                key={s.id}
                type="button"
                aria-label="Catch star"
                onPointerDown={() => catchStar(s.id)}
                className="absolute grid place-items-center rounded-full"
                style={{ left: `${s.left}%`, width: s.size, height: s.size, top: -40 }}
                initial={{ y: 0, opacity: 0, scale: 0.6 }}
                animate={{ y: 430, x: s.drift, opacity: [0, 1, 1, 0.9], rotate: 240 }}
                exit={{ scale: 1.9, opacity: 0, transition: { duration: 0.35 } }}
                transition={{ duration: s.duration, ease: "linear" }}
                onAnimationComplete={() => remove(s.id)}
              >
                <Star
                  className="h-full w-full"
                  style={{
                    color: "var(--gold)",
                    fill: "var(--gold-soft)",
                    filter: "drop-shadow(0 0 10px var(--gold))",
                  }}
                />
              </motion.button>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {state === "idle" && (
              <motion.div
                className="absolute inset-0 z-30 grid place-items-center"
                exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
                transition={{ duration: 0.6 }}
              >
                <SoftButton onClick={start} glow>
                  <span className="text-gradient-gold">{game.cta}</span>
                </SoftButton>
              </motion.div>
            )}

            {state === "won" && (
              <motion.div
                className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 px-8"
                initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 8, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="h-7 w-7" style={{ color: "var(--rose)" }} />
                </motion.div>
                <p className="font-hand text-2xl text-rose-deep">{game.win}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}
