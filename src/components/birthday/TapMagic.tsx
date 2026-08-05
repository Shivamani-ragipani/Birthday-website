import { useEffect, useRef } from "react";

type Burst = {
  id: number;
  x: number;
  y: number;
  kind: "sparkle" | "heart" | "petal" | "popper";
};

const COLORS = ["#F4C2CE", "#E890A5", "#D97C8E", "#E8C87E", "#C9B6E4"];
const KINDS: Burst["kind"][] = ["sparkle", "heart", "petal", "popper"];

/**
 * Global tap delight: every tap anywhere blooms a tiny, cheap particle burst.
 * Pure DOM + WAAPI so it never re-renders React or drops frames.
 */
export function TapMagic() {
  const layer = useRef<HTMLDivElement>(null);
  const seq = useRef(0);
  const last = useRef(0);

  useEffect(() => {
    const host = layer.current;
    if (!host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onTap = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last.current < 180) return;
      last.current = now;

      const kind = KINDS[seq.current++ % KINDS.length];
      const count = kind === "popper" ? 10 : 7;

      // soft ring pulse
      const ring = document.createElement("span");
      ring.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:999px;border:1px solid ${COLORS[seq.current % COLORS.length]};pointer-events:none;`;
      host.appendChild(ring);
      ring
        .animate(
          [
            { transform: "scale(0.4)", opacity: 0.9 },
            { transform: "scale(4.2)", opacity: 0 },
          ],
          { duration: 620, easing: "cubic-bezier(0.16,1,0.3,1)" },
        )
        .addEventListener("finish", () => ring.remove());

      for (let i = 0; i < count; i++) {
        const el = document.createElement("span");
        const color = COLORS[(i + seq.current) % COLORS.length];
        const size = kind === "heart" ? 9 : kind === "petal" ? 8 : 5;
        const base = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;margin:${-size / 2}px 0 0 ${-size / 2}px;pointer-events:none;will-change:transform,opacity;`;

        if (kind === "heart") {
          el.style.cssText = `${base}background:${color};clip-path:path('M4.5 8.5C1.5 6.4 0 4.9 0 3.2 0 1.4 1.3 0 3 0c.9 0 1.2.4 1.5.9C4.8.4 5.1 0 6 0c1.7 0 3 1.4 3 3.2 0 1.7-1.5 3.2-4.5 5.3z');`;
        } else if (kind === "petal") {
          el.style.cssText = `${base}background:${color};border-radius:60% 40% 55% 45% / 55% 60% 40% 45%;opacity:.85;`;
        } else {
          el.style.cssText = `${base}background:${color};border-radius:999px;box-shadow:0 0 8px ${color};`;
        }

        host.appendChild(el);

        const angle =
          kind === "popper"
            ? -Math.PI / 2 + (Math.random() - 0.5) * 1.5
            : (i / count) * Math.PI * 2 + Math.random() * 0.4;
        const dist = 26 + Math.random() * (kind === "popper" ? 78 : 46);
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist + (kind === "heart" ? -22 : 14);

        el.animate(
          [
            { transform: "translate(0,0) scale(0.5) rotate(0deg)", opacity: 1 },
            {
              transform: `translate(${dx}px,${dy}px) scale(1) rotate(${(Math.random() - 0.5) * 240}deg)`,
              opacity: 0,
            },
          ],
          {
            duration: 700 + Math.random() * 500,
            easing: "cubic-bezier(0.22,0.61,0.36,1)",
          },
        ).addEventListener("finish", () => el.remove());
      }
    };

    window.addEventListener("pointerdown", onTap);
    return () => window.removeEventListener("pointerdown", onTap);
  }, []);

  return <div ref={layer} aria-hidden className="pointer-events-none fixed inset-0 z-[80]" />;
}
