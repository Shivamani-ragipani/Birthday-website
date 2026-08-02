import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.95, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  id,
  children,
  className,
  full = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  full?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex w-full flex-col justify-center px-6 py-24",
        full && "min-h-[100svh]",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <p className="eyebrow flex items-center gap-3">
        <span className="h-px w-7 bg-gradient-to-r from-transparent via-gold/60 to-gold" />
        {children}
      </p>
    </Reveal>
  );
}

/** Soft floating glass card. */
export function GlassCard({
  children,
  className,
  float = true,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  float?: boolean;
  delay?: number;
}) {
  return (
    <div
      className={cn("glass relative overflow-hidden rounded-[1.75rem]", className)}
      style={
        float
          ? { animation: `float-soft 7s ease-in-out ${delay}s infinite`, willChange: "transform" }
          : undefined
      }
    >
      {children}
    </div>
  );
}

/** Elastic, glowing primary action. */
export function SoftButton({
  children,
  className,
  glow = false,
  ...rest
}: HTMLMotionProps<"button"> & { glow?: boolean }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 420, damping: 20 }}
      className={cn(
        "glass-strong relative rounded-full px-9 py-4 font-ui text-sm font-medium tracking-[0.14em]",
        className,
      )}
      style={glow ? { boxShadow: "var(--shadow-glow), var(--shadow-soft)" } : undefined}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
