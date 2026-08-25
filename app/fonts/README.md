# Fonts

The design target (see `DESIGN.md`) is **Satoshi**. It is **not** on Google Fonts, so it must be self-hosted. The site currently ships with **Geist** as a placeholder so the build works without the font files.

## Add Satoshi

1. Get Satoshi from [Fontshare](https://www.fontshare.com/fonts/satoshi) (free).
2. Drop these three `.woff2` files into this folder (`app/fonts/`):

   | File | Weight |
   |------|--------|
   | `Satoshi-Regular.woff2` | 400 |
   | `Satoshi-Medium.woff2` | 500 |
   | `Satoshi-Bold.woff2` | 600 |

   (Or a single `Satoshi-Variable.woff2` — then use one `src` entry with `weight: "400 600"`.)

## Activate

Two edits:

**`app/layout.tsx`** — uncomment the `localFont` block, then apply it on `<html>`:

```tsx
className={`${satoshi.variable} h-full antialiased`}
```

**`app/globals.css`** — point the sans stack at Satoshi:

```css
--font-sans: var(--font-satoshi), ui-sans-serif, system-ui, -apple-system,
  "Segoe UI", sans-serif;
```

That's it — everything reads `--font-sans`, so no component changes are needed.
