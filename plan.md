# Portfolio Build Plan — Components

This document specifies every component needed to build the portfolio, modeled on [edwarddiesta.com](https://edwarddiesta.com/). It is the build companion to `DESIGN.md` — read `DESIGN.md` first for palette, type scale, and layout rules; this file breaks the site into concrete, buildable pieces.

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · self-hosted Satoshi.

**Design tokens (from `DESIGN.md`), referenced throughout:**

| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#0F1011` | page background |
| `--text` | `#F4F2ED` | primary / emphasized / links |
| `--text-muted` | `#AAA7A1` | body copy, descriptions |
| `--text-dim` | `#716F6A` | tertiary meta, corner labels |

**Global rules:** single centered column `max-width: 512px`; only weights 400/500/600; no cards, borders, shadows, or colored accents; whitespace separates sections; base font size 16px.

**Build order:** Foundation (1–3) → Primitives (5–6) → Content components (7–16) → Page composition (4) → Optional (17–19).

Each component below lists: **Purpose · File · Props/Data · Structure · Styling · Reference · Notes**.

---

## Foundation

### 1. Design tokens + globals

- **Purpose:** Define palette, base typography, and reset so every component can pull tokens.
- **File:** `app/globals.css`
- **Props/Data:** n/a.
- **Structure:**
  - `:root { --bg; --text; --text-muted; --text-dim; }`
  - Tailwind v4 `@theme` block mapping tokens to utilities, e.g. `--color-bg`, `--color-text`, `--color-muted`, `--color-dim`, so classes like `text-muted`/`bg-bg` work.
  - `body { background: var(--bg); color: var(--text); font-size: 16px; }`
  - `@media (prefers-reduced-motion: reduce)` — disable all transitions/reveals.
- **Styling:** the 4 tokens above. Never `#000`/`#FFF`.
- **Reference:** page background `rgb(15,16,17)`, body text `rgb(244,242,237)` measured on edwarddiesta.com.
- **Notes:** Tailwind v4 is configured via `@tailwindcss/postcss` (`postcss.config.mjs`); tokens belong in CSS `@theme`, not a JS config. Keep line-height ~1.5 for body.

### 2. Fonts — Satoshi (self-hosted)

- **Purpose:** Match the reference typeface exactly. Satoshi is **not** on Google Fonts, so self-host.
- **File:** `app/fonts/` (font files) + `app/layout.tsx` (loader).
- **Props/Data:** n/a.
- **Structure:**
  - Add Satoshi `.woff2` files for weights **400, 500, 600** to `app/fonts/`.
  - Load with `next/font/local`, expose CSS var `--font-satoshi`, apply on `<html>`.
  - Remove the existing Geist / `Geist_Mono` imports in `app/layout.tsx`.
- **Styling:** fallback stack `Satoshi, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`.
- **Reference:** `font-family: Satoshi …` measured on the site.
- **Notes:** ⚠️ Verify the `next/font/local` API against `node_modules/next/dist/docs/` before coding (this Next.js version may differ from training data). Source Satoshi from Fontshare. If font files can't be added now, fall back to the already-wired Geist and flag it — but the target is Satoshi.

### 3. Layout shell + Column wrapper

- **Purpose:** Root document + the centered content column that every section lives in.
- **File:** `app/layout.tsx` + `app/components/Column.tsx`
- **Props/Data:** `Column` takes `children`.
- **Structure:**
  - `layout.tsx`: `<html>` with Satoshi var + `antialiased`; `<body>` minimal; keep existing `metadata` (title "Alvin Aloya"). Keep the `LayoutProps<"/">` typing already present.
  - `Column`: `<div className="mx-auto max-w-[512px] px-6 py-20">{children}</div>`.
- **Styling:** `max-width: 512px`, centered, generous vertical padding (~5rem top/bottom).
- **Reference:** content column measured at ~512px, centered in viewport with large side margins.
- **Notes:** `Column` is a server component (no interactivity). All content sections nest inside one `Column` in `page.tsx`.

---

## Primitives (reusable)

### 5. SectionBlock

- **Purpose:** The repeating section wrapper — a lowercase label, optional `view all` link, and a spaced list of children.
- **File:** `app/components/SectionBlock.tsx`
- **Props/Data:** `{ label: string; viewAllHref?: string; children: React.ReactNode }`
- **Structure:**
  - Header row: `flex justify-between items-baseline` — label left, optional `view all` link right.
  - Body: vertical stack of children with ~`1.25rem` gaps.
- **Styling:** label 600 / `--text` / lowercase (do not uppercase); `view all` in `--text-muted`, no underline; large top margin (~4–5rem) between sections.
- **Reference:** the `notes` / `projects` / `experience` … blocks, each with a right-aligned `view all`.
- **Notes:** Server component. This is the backbone reused by items 9–16.

### 6. ListItem

- **Purpose:** A single titled entry with a muted description — the atom of most sections.
- **File:** `app/components/ListItem.tsx`
- **Props/Data:** `{ title: string; description?: string; href?: string; meta?: string }`
- **Structure:** title line (optionally a link) + description paragraph beneath; optional `meta` (e.g. dates) in `--text-dim`.
- **Styling:** title 600 / `--text`; description 400 / `--text-muted`; ~`0.35rem` gap title→description. No card/border/hover-background; if `href`, subtle hover (muted→bright, ~150ms).
- **Reference:** each project/experience/note row (bold title + one–two-line grey blurb).
- **Notes:** Server component unless a per-item hover needs client state (prefer CSS hover, keep it server).

---

## Content components

### 7. Header

- **Purpose:** Identity block at the top.
- **File:** `app/components/Header.tsx`
- **Props/Data:** `{ name; role; avatarSrc; resumeHref }` (or hardcode for a single-owner site).
- **Structure:** `flex justify-between` — left: ~40px circular avatar + name (h1) + role beneath; right: `resume ↗` link.
- **Styling:** name h1 ~19px/600 `--text`; role ~14.5px/400 `--text-dim`; `resume` in `--text-dim` with `↗` glyph.
- **Reference:** top of edwarddiesta.com (avatar + "Edward Diesta / Software Engineer", `resume ↗` top-right).
- **Notes:** Avatar via `next/image`. Owner name is "Alvin Aloya" (from layout metadata) — confirm content with user.

### 8. Intro

- **Purpose:** Short first-person positioning statement.
- **File:** `app/components/Intro.tsx`
- **Props/Data:** prose with a few inline links.
- **Structure:** 2–3 short `<p>` paragraphs.
- **Styling:** body ~15.5px/400 `--text-muted`, line-height ~1.5; promote key nouns/links to `--text` (the only emphasis mechanism).
- **Reference:** "I build software for … I care about how things work…" intro paragraphs.
- **Notes:** No headline above it — it sits directly under the header.

### 9. Notes

- **Purpose:** Short writing / thoughts list.
- **File:** `app/components/sections/Notes.tsx`
- **Props/Data:** `notes: { title; summary; href }[]`
- **Structure:** `SectionBlock label="notes" viewAllHref` → `ListItem` per note.
- **Styling:** inherits SectionBlock/ListItem.
- **Reference:** `notes` section ("Your Career Is a Team Game", etc.).
- **Notes:** —

### 10. Projects

- **File:** `app/components/sections/Projects.tsx`
- **Props/Data:** `projects: { title; description; href }[]`
- **Structure:** `SectionBlock label="projects" viewAllHref` → `ListItem` list.
- **Reference:** `projects` (Colorfall, Crystal, Prospect Brief…).

### 11. Experience

- **File:** `app/components/sections/Experience.tsx`
- **Props/Data:** `roles: { title; company; description; dates? }[]`
- **Structure:** `SectionBlock label="experience"` → `ListItem` with title as "Role @ Company", optional `meta` dates.
- **Styling:** dates in `--text-dim`.
- **Reference:** `experience` (Product Engineer @ Bytespace Labs…).

### 12. Testimonials

- **Purpose:** Quotes from colleagues.
- **File:** `app/components/sections/Testimonials.tsx`
- **Props/Data:** `quotes: { quote; name; role }[]`
- **Structure:** `SectionBlock label="testimonials"` → per item: bold **name** + muted `role`, then the quote line.
- **Styling:** name 600 `--text`; role `--text-muted`; quote `--text-muted` in quotation marks.
- **Reference:** `testimonials` (Kar Dhillon, Alexi Canamo).
- **Notes:** Custom item shape (not plain ListItem) — name/role on one line, quote below.

### 13. Hackathons

- **File:** `app/components/sections/Hackathons.tsx`
- **Props/Data:** `events: { title; description }[]`
- **Structure:** `SectionBlock label="hackathons"` → `ListItem` list.
- **Reference:** `hackathons` (eGovPH Hackathon 2026…).


### 14. Misc

- **File:** `app/components/sections/Misc.tsx`
- **Props/Data:** `items: { title; description; href }[]`
- **Structure:** `SectionBlock label="misc" viewAllHref` → `ListItem` list.
- **Reference:** `misc` (MISA Python Workshop…).

### 15. Contact ("say hi")

- **Purpose:** Closing contact block.
- **File:** `app/components/sections/Contact.tsx`
- **Props/Data:** `{ blurb; email; socials: { label; href }[] }`
- **Structure:** `SectionBlock label="say hi"` → short prose paragraph(s) + a key/value list: `email` row (value + copy-to-clipboard button) and `elsewhere` row (social links).
- **Styling:** keys `--text-dim`, values `--text`; copy button is a subtle icon.
- **Reference:** `say hi` section (email + copy icon, `elsewhere` socials).
- **Notes:** The copy button needs `onClick` → make **only** the copy control a small `"use client"` component; keep the rest server-rendered. Avoid triggering any browser dialog.

---

## Optional (nice-to-have — build last, only if wanted)

### 17. Playground corner label

- **Purpose:** Fixed corner label linking to the fun/experimental sub-pages. **Keep this** — it is part of the target design.
- **File:** `app/components/CornerLabels.tsx`
- **Structure:** a `position: fixed` group on the left vertical centerline — heading `playground` with sub-links beneath (`music · github · game`).
- **Styling:** `--text-dim`, tiny size; sub-links promote to `--text` on hover.
- **Reference:** the faint `playground` label + `music / github / game` links on the left edge of edwarddiesta.com.
- **Notes:** Hide below the breakpoint where the side margin disappears (it overlaps content on narrow screens). **Do NOT build the right-side `people` / presence label** — per user, exclude the live "who's viewing / how many are here" feature entirely.

### 18. FloatingDock

- **Purpose:** Small persistent bottom navigation pill.
- **File:** `app/components/FloatingDock.tsx`
- **Structure:** `position: fixed` bottom-center pill with icon buttons (home, code, archive, theme). **Omit** any broadcast/presence icon — no live-viewer count.
- **Styling:** `rounded-full`, semi-transparent bg, hairline border, `backdrop-filter: blur`.
- **Reference:** the centered bottom dock on edwarddiesta.com.
- **Notes:** `"use client"` if buttons act (theme toggle). Skip for a first pass; it's not core to the look.



---

## Data organization (applies to all content sections)

Keep content **data-driven**, not hardcoded in markup: put typed arrays in a single `app/data/` (or co-located `content.ts`) module, e.g.

```ts
export const projects: { title: string; description: string; href?: string }[] = [ /* … */ ];
```

Sections import their array and map it through `ListItem`. This keeps components pure and content editable in one place.

## Build verification

- `npm run dev` → column is centered at 512px, warm-dark palette, Satoshi rendering, sections separated by whitespace only.
- `npm run lint` passes.
- Cross-check against `DESIGN.md` checklist (colors, weights, no cards/borders, lowercase labels).
- Compare side-by-side with edwarddiesta.com for spacing rhythm and contrast.
