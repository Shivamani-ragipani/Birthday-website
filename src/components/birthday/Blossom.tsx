import { useMemo } from "react";

/**
 * Real cherry-blossom ambience: five-petal sakura flowers + single petals,
 * light and airy. Everything is a single inline SVG sprite reused via <use>,
 * animated with compositor-only transforms (no blur, no per-frame JS),
 * so it holds 60–120fps while scrolling.
 */
const TINTS = [
  "oklch(0.94 0.035 15)",
  "oklch(0.91 0.05 18)",
  "oklch(0.88 0.06 8)",
  "oklch(0.93 0.04 330)",
];

type Item = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  sway: number;
  tint: string;
  flower: boolean;
  opacity: number;
  anim: string;
};

export function Blossom() {
  const items = useMemo<Item[]>(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: (i * 17.3) % 100,
        size: 16 + ((i * 5) % 14),
        delay: -((i * 2.3) % 22),
        duration: 20 + ((i * 3) % 14),
        sway: 14 + ((i * 9) % 26),
        tint: TINTS[i % TINTS.length],
        flower: i % 3 === 0,
        opacity: 0.45 + ((i % 4) * 0.1),
        anim: i % 2 === 0 ? "petal-fall" : "petal-fall-alt",
      })),

    [],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      style={{ contain: "strict" }}
    >
      <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
        <defs>
          {/* single sakura petal */}
          <path
            id="sakura-petal"
            d="M12 1.2c3.6 2 5.8 5.6 5.8 9.3 0 4.1-2.6 7.2-5.8 8.6-3.2-1.4-5.8-4.5-5.8-8.6 0-3.7 2.2-7.3 5.8-9.3z"
          />
          {/* five-petal blossom */}
          <g id="sakura-flower">
            <g>
              <ellipse cx="12" cy="5.4" rx="3.5" ry="4.6" />
              <ellipse cx="18.4" cy="10.1" rx="3.5" ry="4.6" transform="rotate(72 18.4 10.1)" />
              <ellipse cx="15.9" cy="17.7" rx="3.5" ry="4.6" transform="rotate(144 15.9 17.7)" />
              <ellipse cx="8.1" cy="17.7" rx="3.5" ry="4.6" transform="rotate(216 8.1 17.7)" />
              <ellipse cx="5.6" cy="10.1" rx="3.5" ry="4.6" transform="rotate(288 5.6 10.1)" />
            </g>
          </g>
        </defs>
      </svg>

      {items.map((p) => (
        <svg
          key={p.id}
          viewBox="0 0 24 24"
          width={p.size}
          height={p.size}
          className="absolute top-[-10%]"
          style={{
            left: `${p.left}%`,
            opacity: p.opacity,
            color: p.tint,
            animation: `${p.anim} ${p.duration}s linear ${p.delay}s infinite`,
            ["--sway" as string]: `${p.sway}px`,
            willChange: "transform",
          }}
        >
          <use href={p.flower ? "#sakura-flower" : "#sakura-petal"} fill="currentColor" />
          {p.flower && <circle cx="12" cy="11.6" r="1.5" fill="oklch(0.9 0.08 80)" opacity="0.8" />}
        </svg>
      ))}
    </div>
  );
}
