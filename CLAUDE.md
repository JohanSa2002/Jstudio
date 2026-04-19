# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page marketing landing page for **Jstudio_AI** — a Spanish-language site showcasing serverless cloud architecture, AI agents, and automation services. Deployed to Hostinger.

## Running the Project

No build step required. Open `index.html` directly in a browser or deploy the file to a static host. There is no `package.json`, bundler, or dev server.

## Architecture

The entire site lives in a single file: `index.html` (~877 lines). It is structured as:

- **Tailwind CSS via CDN** — configured inline in `<head>` with a custom theme
- **Google Fonts** — Syne (display), DM Sans (body), DM Mono (mono)
- **Vanilla JavaScript** — at the bottom of `<body>`, handles:
  - Ticker/carousel cloning for seamless scroll
  - Scroll reveal via `IntersectionObserver`
  - Navbar opacity change on scroll
  - Reading progress bar
  - Counter animation with easing for stats numbers

## Design Tokens (Tailwind custom theme)

| Token | Value | Usage |
|-------|-------|-------|
| `ink` | `#08080F` | Main dark background |
| `surface` | `#0D0D16` | Secondary dark background |
| `jade` | `#1DB954` | Primary green accent |
| `mauve` | `#9B8FFF` | Purple accent |
| `snow` | `#EEF2FF` | Light text |

Font families: `font-display` (Syne), `font-body` (DM Sans), `font-mono` (DM Mono).

## Page Sections (in order)

1. Navbar — fixed, logo + CTA button
2. Hero — main value prop + animated stats counters
3. Ticker — auto-scrolling keyword carousel
4. Problem/Solution — two-column pain points vs. answers
5. Methodology — 3-step process (Audit → Integration → Deployment)
6. Evidence/Showcase — service cards grid
7. FAQ — expandable accordion
8. Contact — CTA + email (`johan.samudiotrabajo@gmail.com`)
9. Footer

## Key Conventions

- All content is in **Spanish**.
- Styles use Tailwind utility classes; avoid adding `<style>` blocks for things Tailwind handles.
- JS is written without any framework — keep it vanilla.
- The Tailwind CDN version is used for simplicity; do not introduce a build pipeline unless the project specifically migrates to one.
