export async function celebrate(intensity: "burst" | "rain" | "finale" = "burst") {
  if (typeof window === "undefined") return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const confetti = (await import("canvas-confetti")).default;
  // blush, rose, dusty pink, champagne, lavender, cream
  const colors = ["#F4C2CE", "#E890A5", "#D97C8E", "#E8C87E", "#C9B6E4", "#FFF6EF"];

  if (intensity === "burst") {
    confetti({ particleCount: 90, spread: 78, origin: { y: 0.62 }, colors, scalar: 0.9 });
    window.setTimeout(
      () => confetti({ particleCount: 60, spread: 110, origin: { y: 0.5 }, colors, scalar: 0.7 }),
      180,
    );
    return;
  }

  if (intensity === "rain") {
    const end = Date.now() + 1600;
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 62, origin: { x: 0, y: 0.7 }, colors, scalar: 0.8 });
      confetti({ particleCount: 4, angle: 120, spread: 62, origin: { x: 1, y: 0.7 }, colors, scalar: 0.8 });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    return;
  }

  const end = Date.now() + 2800;
  confetti({ particleCount: 140, spread: 100, origin: { y: 0.55 }, colors, scalar: 1 });
  const frame = () => {
    confetti({
      particleCount: 3,
      startVelocity: 26,
      spread: 360,
      ticks: 220,
      gravity: 0.36,
      origin: { x: Math.random(), y: Math.random() * 0.5 },
      colors,
      scalar: 0.85,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
