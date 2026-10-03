# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page marketing landing page for **JStudio_IA** — a Spanish-language site showcasing software development, AI integration, automation, and chatbot services. Built with **React + Vite + Tailwind CSS v4** and deployed to Hostinger as a static site.

## Running the Project

```bash
npm run dev      # Start dev server on http://localhost:4321
npm run build    # Build static site to dist/
npm run preview  # Preview the built site locally
```

## Architecture

- `index.html` — Vite entry: head, meta, Google Fonts, `#root`
- `src/main.jsx` — Mounts `<App />`
- `src/App.jsx` — Composes all sections and the background light orbs
- `src/index.css` — Tailwind import, `@theme` design tokens, `shell`/`core`/`glass-input` utilities, reveal animation, marquee keyframes
- `src/components/`:
  - `ui.jsx` — Shared pieces: `Reveal` (IntersectionObserver), `Eyebrow`, `SectionHeader`, `Accent`, `Button`, `ArrowIcon`
  - `Navbar.jsx` — Floating glass pill nav + fullscreen mobile menu
  - `Hero.jsx` — Headline, code card, stats
  - `Servicios.jsx` — 5 service cards in an asymmetric bento grid
  - `Proyectos.jsx` — Project list with external links
  - `Stack.jsx` — 4 tech categories + marquee
  - `Contacto.jsx` — Founder card + contact form (FormSubmit.co)
  - `Footer.jsx` — Links grid + giant brand text + copyright
- `public/assets/` — Static assets (logo)
- `vite.config.js` — React + Tailwind plugins, dev port 4321

## Design: Glassmorphism ("Glass-Bento Premium")

- Dark base (`--color-base` `#07080C`) with blurred light orbs behind the content.
- Double-bezel cards: `.shell` (translucent outer frame) wrapping `.core` (frosted glass, inner highlight).
- Tokens in `@theme`: `base`, `ink`, `accent` (`#9EA0FF`), `accent-2`, `cyan`, `violet`, `--ease-spring`.
- Fonts: Bricolage Grotesque (body/headings), Instrument Serif italic (accent words), JetBrains Mono (labels/code).
- Buttons are pills with the arrow nested in its own circle (`Button` in `ui.jsx`).
- Motion uses `cubic-bezier(0.32, 0.72, 0, 1)`; animate only `transform`/`opacity`; respect `prefers-reduced-motion`.

## Key Conventions

- All content is in **Spanish**.
- Style with **Tailwind utility classes**; shared patterns live in `src/index.css` utilities, not inline styles.
- Components are plain function components in `.jsx`; section data lives in arrays at the top of each file.
- Responsive: mobile-first, Tailwind breakpoints `sm` (640), `md` (768), `lg` (1024).
- Contact form posts to FormSubmit.co (`johan.samudiotrabajo@gmail.com`).
- Backdrop blur is used on glass cards and the nav; avoid adding it to large scrolling containers.
