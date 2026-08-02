# A Birthday, In Five Acts

A private, mobile-first birthday experience. Fully static — no backend, no database, no accounts. Designed at 390px for phones.

## The acts

1. The opener — "Do you think I'm handsome?" (the NO button refuses to be caught). YES unlocks the rest.
2. Memories — five full-bleed photos with parallax and blur-to-focus. No captions, just images.
3. Are you enjoying this surprise? — the escaping button, one more time.
4. Chapter three — the cake: tap the candle, blow it out, make a wish.
5. Chapter four — the letter, revealed line by line, then the Happy Birthday finale with fireflies and confetti.

## Making it personal

Everything writeable lives in **`src/content/birthday.ts`**: the name, the two questions, the letter, and the closing quote.

### Photos

Replace these five files, keeping the filenames:

```
src/assets/photo1.jpg
src/assets/photo2.jpg
src/assets/photo3.jpg
src/assets/photo4.jpg
src/assets/photo5.jpg
```

Portrait images (roughly 3:4) look best.

### Music (optional)

Drop an mp3 at `public/music.mp3`. The toggle in the bottom-right stays muted until tapped — it never autoplays. With no file present the button simply does nothing.

## Running locally

```bash
bun install
bun run dev      # http://localhost:8080
bun run build    # production build
```

## Deploying

### Vercel

1. Push the repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Vite** (auto-detected). Build command `bun run build`.
4. Deploy — Vercel serves the built output directly.

### GitHub Pages

```bash
bun run build
npx gh-pages -d .output/public
```

Then in **Settings → Pages**, set the source to the `gh-pages` branch. If the site lives under a repo subpath (`user.github.io/repo`), set `base: "/repo/"` in `vite.config.ts` before building.

## Notes

- Dark by default; all colors are tokens in `src/styles.css`.
- Fonts: Outfit (display), Plus Jakarta Sans (body), Caveat (handwriting).
- Motion respects `prefers-reduced-motion`; images lazy-load; animations run on transform/opacity only.
- The page is marked `noindex` — it is meant for one person.
