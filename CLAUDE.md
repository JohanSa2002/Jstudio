# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page marketing landing page for **JStudio_IA** — a Spanish-language site showcasing software development, AI integration, automation, and chatbot services. Deployed to Hostinger.

## Running the Project

No build step required. Open `index.html` directly in a browser or deploy the file to a static host. There is no `package.json`, bundler, or dev server.

## Architecture

The entire site lives in a single file: `index.html`. It is structured as:

- **CSS custom properties** — defined inline on `#root` for theming (no Tailwind)
- **Inline styles** — all styling is done via inline `style` attributes
- **Responsive media queries** — in a `<style>` block at the bottom (breakpoints: 1024px, 768px, 480px)
- **Google Fonts** — Schibsted Grotesk (headings/body), Newsreader (serif accents), JetBrains Mono (code/labels)
- **Vanilla JavaScript** — at the bottom of `<body>`, handles:
  - Scroll reveal via `IntersectionObserver`
  - Navbar shadow on scroll
  - Chip selector toggle (contact form service type)
  - Contact form submission via FormSubmit.co (fetch API)

## Design Tokens (CSS custom properties on `#root`)

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
- Styles are **inline** — avoid adding external CSS files. Keep responsive overrides in the `<style>` block.
- JS is written without any framework — keep it vanilla.
- No build pipeline — no bundler, no npm, no Tailwind. Pure HTML/CSS/JS.
- Contact form submits to FormSubmit.co (`johan.samudiotrabajo@gmail.com`).
- Logo references `assets/logo-mark.png` with `onerror` fallback — create the assets directory and add the logo to display it.
