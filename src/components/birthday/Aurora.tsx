import { useMemo } from "react";

/**
 * Fixed, GPU-cheap ambience for the "Blush Atelier" palette:
 * warm cream base, drifting blush / lavender / champagne blooms,
 * whisper-soft twinkles, a light vignette and paper grain.
 */
export function Aurora() {
  const stars = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        top: (i * 61) % 100,
        size: 1.5 + ((i * 7) % 3),
        delay: (i % 9) * 0.9,
        duration: 4 + ((i * 5) % 7),
      })),
    [],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ contain: "strict" }}
    >
      <div className="absolute inset-0" style={{ background: "var(--cream)" }} />

      <div
        className="absolute -left-1/3 -top-1/4 h-[70vh] w-[95vw] rounded-full opacity-60 blur-[60px]"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--blush), transparent 68%)",
          animation: "drift 34s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        className="absolute -right-1/3 top-[24%] h-[62vh] w-[90vw] rounded-full opacity-45 blur-[64px]"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--lavender), transparent 70%)",
          animation: "drift 44s ease-in-out infinite reverse",
          willChange: "transform",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[15%] h-[50vh] w-[80vw] rounded-full opacity-45 blur-[70px]"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--peach), transparent 72%)",
          animation: "drift 52s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: "var(--rose)",
            boxShadow: "0 0 6px var(--gold)",
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* soft vignette keeps the centre bright and edges powdery */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 38%, transparent 34%, oklch(0.88 0.04 20 / 0.42) 100%)",
        }}
      />
      {/* paper grain */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.22'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );

}
