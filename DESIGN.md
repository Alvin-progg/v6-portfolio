# Portfolio Design Guide

A design reference for building this portfolio, derived from studying [edwarddiesta.com](https://edwarddiesta.com/). The goal is the same feel: quiet, warm, editorial, text-first. No decoration for decoration's sake. Everything reads like a well-set document, not a marketing page.

---

## 1. Design Principles

1. **Text is the interface.** No hero images, no cards, no boxes, no shadows. Content is a single centered column of prose and lists. Hierarchy comes from type weight, size, and color — never from borders or backgrounds.
2. **Warm dark, low contrast.** The background is a near-black with a slight warm tint; text is a warm off-white, not pure white. Secondary text is a muted warm gray. The whole page sits in a narrow, comfortable contrast band.
3. **One accent: none.** There is no colored accent. Emphasis is created by *promoting* text to the brightest off-white and demoting everything else to gray. Links are the same color as body text (they reveal themselves on hover).
4. **Generous vertical rhythm.** Sections are separated by large empty gaps, not rules or dividers. Whitespace does the sectioning.
5. **Restraint over cleverness.** Small type, tight column, lots of air. Nothing shouts.

---

## 2. Color Palette

Warm, desaturated, dark. Copy these tokens directly.

| Token | Hex | RGB | Use |
|-------|-----|-----|-----|
| `--bg` | `#0F1011` | `15, 16, 17` | Page background (warm near-black) |
| `--text` | `#F4F2ED` | `244, 242, 237` | Primary text, headings, emphasized/linked words |
| `--text-muted` | `#AAA7A1` | `170, 167, 161` | Body copy, descriptions, "view all" links |
| `--text-dim` | `#716F6A` | `113, 111, 106` | Tertiary meta (e.g. "resume", corner labels, dates) |

Notes:
- **No pure black (`#000`) and no pure white (`#FFF`).** The warmth (bg leans slightly warm-neutral, text leans cream) is what makes it feel considered.
- Emphasis pattern: default paragraph text is `--text-muted`; important words (names, links, key nouns) get promoted to `--text`. This is the *only* emphasis mechanism.
- Corner labels ("playground", "people") sit in `--text-dim` at the far page edges.

### Suggested CSS variables

```css
:root {
  --bg: #0F1011;
  --text: #F4F2ED;
  --text-muted: #AAA7A1;
  --text-dim: #716F6A;
}
```

---

## 3. Typography

**Typeface:** [Satoshi](https://www.fontshare.com/fonts/satoshi) for everything (a geometric-humanist sans). Fallback stack:

```
Satoshi, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif
```

> Note: this project already loads Geist via `next/font/google` in `app/layout.tsx`. Satoshi is not on Google Fonts — either self-host it (add to `app/fonts/` and load via `next/font/local`) or substitute Geist Sans, which is close in spirit. Pick one and keep the whole site on it.

**Base size:** `16px`. Everything else is close to base — this is a small-type design.

| Role | Size | Weight | Color | Notes |
|------|------|--------|-------|-------|
| Name / page title (h1) | ~19px (`1.18rem`) | 600 | `--text` | The single largest element |
| Section labels (`notes`, `projects`, `experience`…) | ~16px (`1.02rem`) | 600 | `--text` | **lowercase**, plain — act as quiet headers |
| Item titles (note/project/job names) | ~15.5px (`0.98rem`) | 600 | `--text` | |
| Body / descriptions | ~15.5px (`0.98rem`) | 400 | `--text-muted` | Line height ~1.5 |
| Small meta (role, "resume", "view all", dates) | ~14.5px (`0.9rem`) | 400–500 | `--text-dim` / `--text-muted` | |

Weights in use: **400** (body), **500** (links/labels), **600** (titles & headings). Keep it to these three.

Rules:
- **Letter-spacing: normal** everywhere. No tracking tricks.
- **No uppercase, no all-caps.** Section labels are deliberately lowercase.
- Line-height ~1.5 for paragraphs; tight (~1.2) for headings.

---

## 4. Layout

**Single centered column.** This is the whole layout.

- **Content column width:** ~`512px` (use `max-width: 512px`), horizontally centered in the viewport.
- On a 1920px screen the column sits dead center with ~700px of empty margin on each side. That emptiness is intentional — do not fill it.
- **Corner labels** (optional flourish): tiny `--text-dim` labels pinned to the far left and right vertical centerline (`playground` / `music · github · game` on the left, `people` on the right). These are the only things outside the column.

```css
.column {
  max-width: 512px;
  margin-inline: auto;
  padding-block: 5rem; /* generous top/bottom breathing room */
}
```

**Vertical structure of a page (top to bottom):**

1. **Header** — avatar (small, circular ~40px) + name + role on the left; a small `resume ↗` link on the right.
2. **Intro** — 2–3 short prose paragraphs. Key nouns promoted to `--text` (and linked where relevant).
3. **Repeating sections**, each: a lowercase label + optional `view all` link on the right, then a list of items. Each item = bold title (`--text`) + one/two-line muted description.
   - Suggested sections for this portfolio: `notes`, `projects`, `experience`, `testimonials`, `hackathons`, `certifications`, `misc`, `say hi`.
4. **Contact ("say hi")** — short prose + a small key/value list (`email`, `elsewhere`).

**Spacing scale (vertical):**
- Between sections: large — ~`4–5rem`.
- Between label and its list: ~`1.5rem`.
- Between items in a list: ~`1.25rem`.
- Between an item title and its description: ~`0.35rem`.

No dividers, no background changes between sections — only whitespace.

---

## 5. Components

### Section block

```
projects                                   view all
                                            (dim, right-aligned)

Colorfall                                   ← title, 600, --text
An online party game I designed…            ← desc, 400, --text-muted

Crystal
An experiment in giving a company…
```

- Label row uses `display: flex; justify-content: space-between`. Label left, `view all` right (`--text-muted`, no underline).

### Item

- Title: weight 600, `--text`.
- Description: weight 400, `--text-muted`, one or two lines.
- No card, no border, no hover background. Whole item may be a link.

### Links

- Inline links (names, key nouns) are `--text` — **same color as surrounding emphasized text, no underline at rest.** Add a subtle underline or slight dim on `:hover` only.
- Utility links (`resume ↗`, `view all`) are `--text-dim` / `--text-muted`.
- `resume` carries a small `↗` glyph.

### Contact list

Two-column key/value, keys in `--text-dim`, values in `--text`:

```
email       edwarddiesta@example.com  ⧉ (copy)
elsewhere   x · instagram · …
```

### Optional: floating dock

The reference has a small centered pill dock fixed to the bottom (home / broadcast / code / archive / theme icons). Optional — only add if you want it. If used: keep it small, semi-transparent, rounded-full, with a subtle backdrop blur and hairline border, centered at the bottom of the viewport. Skip it for a first pass; it's a nice-to-have, not core to the look.

---

## 6. Motion

Minimal. The aesthetic is calm.
- Subtle fade/opacity transition on link hover (`--text-muted` → `--text`, ~150ms).
- Optional gentle fade-in-up on section reveal while scrolling. Keep it slow and small.
- Respect `prefers-reduced-motion` — disable reveals entirely under it.
- No parallax, no bounce, no attention-grabbing animation.

---

## 7. Quick Checklist

- [ ] Warm near-black bg `#0F1011`, warm off-white text `#F4F2ED` — never `#000`/`#FFF`
- [ ] One typeface (Satoshi or Geist), sizes clustered near 16px
- [ ] Only three weights: 400 / 500 / 600
- [ ] Single centered column, `max-width: 512px`
- [ ] Emphasis by promoting text to `--text`, demoting to `--text-muted` — no color accent
- [ ] Lowercase section labels, separated by whitespace not rules
- [ ] No cards, borders, shadows, or backgrounds behind content
- [ ] Generous vertical spacing between sections
