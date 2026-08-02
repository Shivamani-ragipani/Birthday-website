## Concept

A single-page, mobile-first (390px) cinematic birthday experience — dark "Midnight Aurora" aesthetic: near-black charcoal base, deep indigo/violet aurora glows, soft gold accent, glass layers. Ten acts that unlock as you scroll, each with its own reveal. All static, no backend.

## Visual system

- Palette: `#08080B` base, `#101018` surfaces, deep violet `#6D5DF6` + royal blue glow, gold accent `#E8C87E`, soft white text. Glass cards with blur + hairline borders.
- Type: Outfit (display) + Plus Jakarta Sans (body), loaded via `<link>` in the root route head; a handwriting face (Caveat) only for the letter.
- Motion: Framer Motion springs, scroll-linked parallax, blur-to-focus reveals, canvas-confetti for celebration. Respects `prefers-reduced-motion`.
- All colors as tokens in `src/styles.css` (dark by default) — no hardcoded color classes.

## The ten acts

1. **Loader** — animated glowing monogram ring, progress sweep, "Preparing something special…", curtain wipe out.
2. **Welcome** — staggered word-by-word headline over aurora background, floating dust particles, glass "Continue" button that scrolls onward.
3. **Envelope** — tappable wax-sealed envelope; flap opens in 3D, letter slides out, message types in.
4. **Photo reveal** — full-bleed sequential frames (not a carousel): each photo scales slowly, unblurs, caption floats in as it enters the viewport.
5. **Timeline** — vertical glass cards alternating with a drawn-in gradient line, icon nodes lighting up on scroll.
6. **Mini game — "Catch the Stars"** — 30s: tap floating stars before they fade; score ring, then confetti + unlock message. (Chosen because it's touch-native, fast, and visually fits the aurora theme.)
7. **Funny question** — "Are you enjoying this surprise?" YES stays; NO teleports/rotates/shrinks on tap and hover, shrinking each time until it dissolves. YES → full-screen confetti burst.
8. **Cake** — layered CSS/SVG cake with flickering candle flame; tap to blow: flame snuffs, smoke particles rise, glow fades, wish text appears.
9. **Letter** — large glass card, handwriting-effect emotional message revealed line by line, signed off.
10. **Finale** — fireflies + floating photo thumbnails, giant "Happy Birthday" with shimmering gold, heartbeat animation, closing quote, confetti loop.

Persistent: a small glass music toggle (muted, never autoplays) and a subtle progress indicator.

## Technical notes

- Stays on the project's TanStack Start + React + TS + Tailwind v4 stack (Vite-based, builds to static output; deploys fine to Vercel/GitHub Pages). No backend touched.
- Rewrite `src/routes/index.tsx` as the experience shell with its own SEO head(); sections as components under `src/components/birthday/`.
- Add deps: `framer-motion`, `canvas-confetti`, `lucide-react` (if absent).
- 5 generated placeholder photos in `src/assets/` named `photo1…photo5` — swap-in documented in README.
- Content (name, messages, timeline entries, captions) centralized in one `src/content/birthday.ts` file so text is edited in one place.
- Performance: lazy-loaded images, transform/opacity-only animations, canvas effects paused off-screen, cheap particle counts.
- README with content-editing and GitHub Pages / Vercel deployment steps.
