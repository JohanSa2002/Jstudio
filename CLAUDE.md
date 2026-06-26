# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page marketing landing page for **JStudio_IA** — a Spanish-language site showcasing software development, AI integration, automation, and chatbot services. Built with **Astro** and deployed to Hostinger as a static site.

## Running the Project

```bash
npm run dev      # Start dev server on http://localhost:4321
npm run build    # Build static site to dist/
npm run preview  # Preview the built site locally
```

## Architecture

Built with **Astro** (static output). The project is structured as:

- `src/pages/index.astro` — Single page that composes all section components
- `src/layouts/Layout.astro` — Base HTML layout with head, fonts, and global styles
- `src/components/` — One component per section:
  - `Navbar.astro` — Sticky nav with logo, links, CTA
  - `Hero.astro` — Value prop headline, code card, stats band
  - `Servicios.astro` — 5 service cards in grid
  - `Proyectos.astro` — Project list with external links
  - `Stack.astro` — 4-column tech stack + marquee
  - `Contacto.astro` — Founder card + contact form
  - `Footer.astro` — Links grid + brand text + copyright
  - `ScrollReveal.astro` — IntersectionObserver scroll animations
- `src/styles/global.css` — CSS reset, keyframes, and CSS custom properties
- `public/assets/` — Static assets (logo, images)
- `astro.config.mjs` — Astro configuration (static output)

## Design Tokens (CSS custom properties in `src/styles/global.css`)

| Token | Value | Usage |
|-------|-------|-------|
| `--paper` | `#F4F5F7` | Main light background |
| `--surface` | `#FFFFFF` | Card/section background |
| `--ink` | `#14161D` | Primary text color |
| `--ink-2` | `#3A3F4C` | Secondary text color |
| `--muted` | `#767C8A` | Muted/label text |
| `--line` | `rgba(20,22,29,0.10)` | Light borders |
| `--line-2` | `rgba(20,22,29,0.17)` | Stronger borders |
| `--accent` | `#4F46E5` | Primary accent (indigo) |
| `--accent-2` | `#3730A3` | Darker accent |
| `--dark` | `#101218` | Dark section background |

## Page Sections (in order)

1. Navbar — sticky, logo + nav links + CTA button (links hidden on mobile)
2. Hero — value prop headline + code snippet card + stats band (24+, 5, <24h, 100%)
3. Servicios — 5 service cards in a grid (software, IA, web, automation, chatbots)
4. Proyectos — list of recent projects with external links
5. Stack — 4-column tech stack (Frontend, Backend, IA & ML, Infra & Cloud) + marquee
6. Contacto — founder info card + contact form (FormSubmit.co)
7. Footer — links grid + large brand text + copyright

## Key Conventions

- All content is in **Spanish**.
- Each component uses **Astro scoped `<style>`** — no inline styles.
- JS is vanilla, placed in `<script>` tags inside Astro components.
- Responsive breakpoints: 1024px, 768px, 480px.
- Google Fonts: Schibsted Grotesk (body), Newsreader (serif accents), JetBrains Mono (code/labels).
- Contact form submits to FormSubmit.co (`johan.samudiotrabajo@gmail.com`).
- Logo references `/assets/logo-mark.png` with `onerror` fallback.
- The old `index.html` is kept as reference; the Astro build outputs to `dist/`.
