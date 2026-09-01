# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Not the Next.js you know

Next.js **16.3.2** + React **19.2.8**, App Router only. This is a bleeding-edge version — APIs and conventions may differ from training data. Before writing route/layout/page code, check `node_modules/next/dist/docs/01-app/` (esp. `01-getting-started` and `03-api-reference`) for current conventions. Example already in this repo: `app/layout.tsx` types its root layout props as `LayoutProps<"/">` (a globally-available generated typed-route helper — no import), not a hand-written `{ children: React.ReactNode }` prop.

## Commands

- `npm run dev` — dev server (localhost:3000)
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — bare `eslint` (flat config in `eslint.config.mjs`: `eslint-config-next` core-web-vitals + typescript)

No test runner is configured in this repo.

## Architecture

Personal portfolio site (owner: Alvin Aloya) — a single static page, no routes beyond `/`, no data layer, no client components yet. Everything is a Server Component; add `"use client"` explicitly if a component ever needs interactivity.

- **`app/page.tsx`** composes the whole site: one `<Column>` wrapping the content components. Adding a section means writing a component in `app/components/` and dropping it in here.
- **Layout primitives** (`app/components/`): `Column` (the single centered `max-w-lg` = 512px column everything lives in), `SectionBlock` (lowercase section label + optional "view all" link + spaced children), `ListItem` (title / optional link / muted description / dim meta). Content sections should be built *from* these, not from bespoke markup — the design has no cards, borders, or shadows, so these three cover nearly everything.
- **Path alias `@/*` maps to the repo root** (`tsconfig.json`), **not** `app/`. Components live in `app/components/`, so imports must read `@/app/components/Column`.

### Design tokens (the part that bites)

`app/globals.css` is the single source of truth. Tailwind v4 has no JS config — tokens are declared in the `@theme` block, and Tailwind derives utility names from them:

| `@theme` var | utility | role |
|---|---|---|
| `--color-bg` | `bg-bg` | page background `#0F1011` |
| `--color-fg` | `text-fg` | primary/emphasized text `#F4F2ED` |
| `--color-muted` | `text-muted` | body copy `#AAA7A1` |
| `--color-dim` | `text-dim` | tertiary meta `#716F6A` |

Note the name is **`fg`**, not `text` — `plan.md` predates the code and says `--color-text`; the code wins. The same four hexes are also mirrored as plain `:root` vars (`--bg`, `--text`, `--text-muted`, `--text-dim`) for non-utility CSS; keep both in sync if a value ever changes.

Fonts: Satoshi is self-hosted from `app/fonts/*.woff2`, loaded with `next/font/local` in `app/layout.tsx` (weights 400/500/600), exposed as `--font-satoshi` and consumed via `--font-sans` in the `@theme`. Components never name a font — they inherit from `body`. (`app/fonts/README.md` is stale: it describes the pre-Satoshi Geist placeholder setup that has since been removed.)

## Design & build plan

- **`DESIGN.md`** — the target visual spec, derived from edwarddiesta.com: warm near-black palette (never pure `#000`/`#FFF`), single 512px column, small type close to 16px base, only weights 400/500/600, lowercase section labels, no accent color. Emphasis is created *only* by promoting text from `muted` to `fg`. Read this before styling anything.
- **`plan.md`** — component-by-component build plan (Header, Intro, then Notes/Projects/Experience/Testimonials/Hackathons/Certifications/Misc/Contact, plus optional CornerLabels/FloatingDock). Build order: Foundation → Primitives → Content components → Page composition. Foundation, primitives, Header, and Intro are done; the content sections are not.
- Header and Intro currently render **lorem ipsum placeholder copy** — that is intentional scaffolding awaiting real content, not a bug to "fix" incidentally.

## Branch layout

Work happens on `portfolio-build` (with a git worktree at `.claude/worktrees/portfolio-build`); narrow feature branches like `content/header-intro` merge into it, and it merges to `master`. Check which branch you're on before committing.
