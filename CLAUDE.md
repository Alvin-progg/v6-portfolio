# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Not the Next.js you know

Next.js **16.3.2** + React **19.2.8**, App Router only. This is a bleeding-edge version — APIs and conventions may differ from training data. Before writing route/layout/page code, check `node_modules/next/dist/docs/01-app/` (esp. `01-getting-started` and `03-api-reference`) for current conventions. Example already in this repo: `app/layout.tsx` types its root layout props as `LayoutProps<"/">` (a generated typed-route helper), not a hand-written `{ children: React.ReactNode }` prop.

## Commands

- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- `npm start` — run production build
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`, uses `eslint-config-next` core-web-vitals + typescript configs)

No test runner is configured in this repo.

## Architecture

- App Router project, all routes/layouts live under `app/`. `app/layout.tsx` is the root layout (Geist Sans/Mono via `next/font/google`, exposed as CSS vars `--font-geist-sans`/`--font-geist-mono`).
- Styling is Tailwind CSS v4 via `@tailwindcss/postcss` (`postcss.config.mjs`), applied through `app/globals.css`.
- Path alias `@/*` maps to repo root (`tsconfig.json`), **not** `app/`. Components physically live in `app/components/`, so working imports must say `@/app/components/Nav`, not `@/components/Nav`.
- Components go under `app/components/` (e.g. `app/components/Nav.tsx`, `Hero.tsx`, `Blog.tsx`, `Experience.tsx`, `Hackathon.tsx`); mark client components with `"use client"` explicitly — the default is Server Components.
- This is a personal portfolio site (owner: Alvin Aloya), currently minimal/scaffold stage — most existing components aren't wired into `page.tsx` yet.

## Design & build plan

- `DESIGN.md` — the target visual spec (modeled on edwarddiesta.com): warm near-black palette (`#0F1011` bg / `#F4F2ED` text / `#AAA7A1` muted / `#716F6A` dim), single centered `max-width: 512px` column, Satoshi typeface (self-hosted, not yet added — repo currently loads Geist instead), lowercase section labels, no cards/borders/shadows. Read this before styling anything.
- `plan.md` — component-by-component build plan derived from `DESIGN.md` (Header, Intro, SectionBlock/ListItem primitives, Notes/Projects/Experience/Testimonials/Hackathons/Certifications/Misc/Contact sections, optional CornerLabels/FloatingDock). Follow its build order (Foundation → Primitives → Content components → Page composition) and its note that `Nav.tsx` should be deleted or repurposed as `FloatingDock` since the target design has no top nav.
