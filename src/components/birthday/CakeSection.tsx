import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cake } from "@/content/birthday";
import { celebrate } from "@/lib/celebrate";
import { Eyebrow, Reveal, Section } from "./primitives";

const SMOKE = [0, 1, 2, 3];
const DRIPS = [14, 38, 62, 86];

export function CakeSection({ onCandleBlown }: { onCandleBlown?: () => void }) {
  const [blown, setBlown] = useState(false);

  const blow = () => {
    if (blown) return;
    setBlown(true);
    void celebrate("finale");
    onCandleBlown?.();
  };

  return (
    <Section id="cake" className="items-center justify-center text-center">
      <Eyebrow>{cake.eyebrow}</Eyebrow>
      <Reveal delay={0.1}>
        <h2 className="mt-4 font-display text-5xl font-light text-plum">{cake.title}</h2>
      </Reveal>
      <Reveal delay={0.18}>
        <p className="mt-2 text-sm text-muted-foreground">{cake.sub}</p>
      </Reveal>

      <Reveal delay={0.24}>
        <motion.button
          type="button"
          onClick={blow}
          aria-label="Blow out the candle"
          className="relative mt-14 block h-[250px] w-[270px] cursor-pointer"
          whileTap={{ scale: 0.98 }}
        >
          {/* warm halo */}
          <motion.div
            className="absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "var(--gold)" }}
            animate={{ opacity: blown ? 0 : [0.3, 0.52, 0.3] }}
            transition={{ duration: 3, repeat: blown ? 0 : Infinity, ease: "easeInOut" }}
          />

          {/* flame */}
          <AnimatePresence>
            {!blown && (
              <motion.div
                className="absolute left-1/2 top-[22px] z-20 h-9 w-4 -translate-x-1/2"
                exit={{ opacity: 0, scaleY: 0.2, y: -6 }}
                transition={{ duration: 0.35 }}
              >
                <div
                  className="h-full w-full"
                  style={{
                    borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%",
                    background:
                      "radial-gradient(circle at 50% 72%, #fff 0%, var(--gold-soft) 32%, var(--gold) 60%, oklch(0.68 0.16 40) 100%)",
                    filter: "drop-shadow(0 0 16px var(--gold))",
                    animation: "flicker 1.4s ease-in-out infinite",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* smoke */}
          <AnimatePresence>
            {blown &&
              SMOKE.map((i) => (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-[26px] h-2 w-2 rounded-full bg-white/70 blur-[3px]"
                  initial={{ opacity: 0.8, y: 0, x: 0, scale: 0.6 }}
                  animate={{
                    opacity: 0,
                    y: -95 - i * 14,
                    x: (i % 2 ? 1 : -1) * (10 + i * 6),
                    scale: 2.6,
                  }}
                  transition={{ duration: 2.4, delay: i * 0.16, ease: "easeOut" }}
                />
              ))}
          </AnimatePresence>

          {/* candle */}
          <div
            className="absolute left-1/2 top-[56px] z-10 h-14 w-[10px] -translate-x-1/2 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.84 0.07 20), oklch(0.97 0.03 25) 42%, oklch(0.78 0.08 18))",
              boxShadow: "0 2px 6px -2px oklch(0.5 0.08 350 / 0.4)",
            }}
          />

          {/* tiers */}
          <div className="absolute inset-x-0 bottom-0">
            {/* top tier */}
            <div
              className="relative mx-auto h-[42px] w-[126px] rounded-t-[10px] rounded-b-2xl border border-hairline"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.98 0.02 30), oklch(0.93 0.045 22) 55%, oklch(0.89 0.055 18))",
                boxShadow: "inset 0 2px 6px oklch(1 0 0 / 0.7), var(--shadow-soft)",
              }}
            >
              <div
                className="absolute inset-x-0 -bottom-1 h-4"
                style={{
                  background: "oklch(0.86 0.075 16)",
                  borderRadius: "0 0 40% 40% / 0 0 100% 100%",
                }}
              />
              {DRIPS.map((l) => (
                <span
                  key={l}
                  className="absolute top-[26px] h-3 w-3 rounded-full"
                  style={{ left: `${l}%`, background: "oklch(0.86 0.075 16)" }}
                />
              ))}
            </div>

            {/* middle tier */}
            <div
              className="relative mx-auto mt-1 h-[54px] w-[192px] rounded-t-[10px] rounded-b-[1.4rem] border border-hairline"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.985 0.015 40), oklch(0.94 0.04 30) 50%, oklch(0.9 0.05 24))",
                boxShadow: "inset 0 2px 6px oklch(1 0 0 / 0.7), var(--shadow-soft)",
              }}
            >
              <div
                className="absolute inset-x-0 -bottom-1 h-5"
                style={{
                  background: "oklch(0.88 0.06 22)",
                  borderRadius: "0 0 40% 40% / 0 0 100% 100%",
                }}
              />
              <div className="absolute inset-x-4 top-4 flex justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--gold)", opacity: 0.8 }}
                  />
                ))}
              </div>
            </div>

            {/* bottom tier */}
            <div
              className="relative mx-auto mt-1 h-[64px] w-[246px] rounded-t-[10px] rounded-b-[1.8rem] border border-hairline"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.99 0.012 50), oklch(0.95 0.035 34) 48%, oklch(0.91 0.048 26))",
                boxShadow: "inset 0 2px 8px oklch(1 0 0 / 0.7), var(--shadow-lift)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-5"
                style={{
                  background: "oklch(0.9 0.05 24)",
                  borderRadius: "0 0 40% 40% / 0 0 100% 100%",
                }}
              />
            </div>

            {/* plate + shadow */}
            <div
              className="mx-auto mt-1.5 h-2 w-[272px] rounded-full"
              style={{ background: "oklch(0.96 0.02 40)", boxShadow: "var(--shadow-soft)" }}
            />
            <div
              className="mx-auto mt-1 h-3 w-[250px] rounded-full blur-md"
              style={{ background: "oklch(0.6 0.06 350 / 0.28)" }}
            />
          </div>
        </motion.button>
      </Reveal>

      <div className="mt-10 h-8">
        <AnimatePresence>
          {blown && (
            <motion.p
              className="font-hand text-2xl text-rose-deep"
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {cake.wish}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
