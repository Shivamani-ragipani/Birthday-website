# Birthday Website

A polished, interactive birthday experience built as a mobile-first web app. It combines cinematic animations, and small playful interactions to create a personal surprise for one person.

## What this project is

This project is a single-page experience designed to feel like a digital birthday gift. It includes:

- an animated opening sequence
- interactive question prompts
- a photo memory section
- a candle-and-wish moment
- a heartfelt letter and finale scene

The app is fully front-end based, with no backend or database required.

## Tech stack

This project is built with modern web technologies:

- React 19 for the UI
- TypeScript for type safety
- Vite for fast development and builds
- TanStack Router and TanStack Start for routing and app structure
- TanStack Query for client-side data state
- Tailwind CSS for styling
- Framer Motion for smooth animations
- Radix UI and shadcn-style UI primitives for accessible components
- canvas-confetti, lucide-react, and sonner for interactive polish

## Project structure

- src/components/birthday: the main animated experience sections
- src/content/birthday.ts: the customizable text, messages, and content
- src/assets: the images used in the experience
- src/routes: route definitions for the app
- public: static files such as optional music

## Getting started

### Prerequisites

- Node.js
- Bun

### Install and run

```bash
bun install
bun run dev
```

Then open the local URL shown in the terminal.

### Build for production

```bash
bun run build
```

## Customization

You can personalize the experience by editing the content in [src/content/birthday.ts](src/content/birthday.ts), including:

- the recipient name
- the opening questions
- the letter message
- the closing quote

You can also replace the image assets in [src/assets](src/assets) and add optional background music in [public](public).

## Deployment

The app can be deployed to platforms such as Vercel or any static hosting service that supports Vite-based projects.

## Notes

- The experience is designed primarily for mobile screens.
- It uses a dark, cinematic visual style.
- Motion and accessibility considerations are included throughout the experience.
