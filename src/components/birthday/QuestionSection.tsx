import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { celebrate } from "@/lib/celebrate";
import { Reveal, Section, SoftButton } from "./primitives";

export type QuestionCopy = {
  eyebrow?: string;
  title: string;
  sub: string;
  yes: string;
  no: string;
  taunts: readonly string[];
  reward: string;
};

export function QuestionSection({
  id,
  copy,
  onYes,
  continueLabel,
}: {
  id: string;
  copy: QuestionCopy;
  onYes?: () => void;
  continueLabel?: string;
}) {
  const [dodges, setDodges] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0, rotate: 0 });
  const [answered, setAnswered] = useState(false);

  const gone = dodges >= 7;

  const dodge = () => {
    if (gone) return;
    setDodges((d) => d + 1);
    setPos({
      x: (Math.random() - 0.5) * 190,
      y: (Math.random() - 0.5) * 150,
      rotate: (Math.random() - 0.5) * 34,
    });
  };

  const sayYes = () => {
    if (answered) return;
    setAnswered(true);
    void celebrate("burst");
    onYes?.();
  };

  const scale = Math.max(0.36, 1 - dodges * 0.09);

  return (
    <Section id={id} className="items-center justify-center overflow-hidden text-center">
      {copy.eyebrow && (
        <Reveal>
          <p className="eyebrow">{copy.eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="mt-5 max-w-[16ch] font-display text-[2.6rem] leading-[1.08] font-light text-balance text-plum">
          {copy.title}
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-3 max-w-[28ch] text-sm text-muted-foreground">{copy.sub}</p>
      </Reveal>

      <div className="relative mt-14 flex h-40 w-full items-center justify-center gap-6">
        <div className="relative z-10">
          <motion.span
            aria-hidden
            className="absolute -inset-2 rounded-full"
            style={{ background: "var(--rose)", filter: "blur(22px)", opacity: 0.35 }}
            animate={{ opacity: gone ? [0.35, 0.6, 0.35] : [0.22, 0.4, 0.22], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <SoftButton onClick={sayYes} glow className="relative">
            <span className="text-gradient-gold">{copy.yes}</span>
          </SoftButton>
        </div>

        <AnimatePresence>
          {!gone && !answered && (
            <motion.button
              type="button"
              onClick={dodge}
              onPointerEnter={dodge}
              className="relative rounded-full border border-hairline bg-white/45 px-8 py-4 font-ui text-sm font-medium tracking-[0.14em] text-muted-foreground backdrop-blur-md"
              style={{ boxShadow: "var(--shadow-soft)" }}
              animate={{ x: pos.x, y: pos.y, rotate: pos.rotate, scale }}
              exit={{ opacity: 0, scale: 0, rotate: 160, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 380, damping: 16 }}
            >
              {dodges === 0 ? copy.no : copy.taunts[(dodges - 1) % copy.taunts.length]}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            className="mt-4 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9 }}
          >
            <p className="font-hand text-2xl text-rose-deep">{copy.reward}</p>
            {continueLabel && (
              <motion.span
                className="eyebrow"
                animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                {continueLabel}
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
