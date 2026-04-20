# Design System — WCT Systems

> **LOGIC:** When building a specific page, first check `design-system/wct-systems/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** WCT Systems
**Category:** B2B agency / SaaS for French SMEs (PME)
**Positioning:** Only French partner covering software (Digital Workplace + AI + RPA + websites) AND hardware (Nixie Pulse KPI) — premium, trustworthy, not a generic AI startup.
**Pattern:** Social Proof-Focused + Bento Grid
**Style base:** Soft UI Evolution + editorial serif accents

---

## 1. Color Palette

### Brand (violet — used parcimoniously, accent only)

| Role | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| brand-50 | `#f5f3ff` | `violet-50` | Ambient wash, soft backgrounds |
| brand-100 | `#ede9fe` | `violet-100` | Badge bg, chip bg |
| brand-500 | `#8b5cf6` | `violet-500` | Hover, dark mode accent |
| brand-600 | `#7c3aed` | `violet-600` | **Primary brand** — CTAs, emphasis, active |
| brand-700 | `#6d28d9` | `violet-700` | Hover on primary |
| brand-ink | `#2e1065` | `violet-950` | Deep text on brand surfaces |

### Surfaces (warm neutral base — Apple-like)

| Role | Light | Dark | CSS var |
|------|-------|------|---------|
| Background | `#fafaf9` | `#0a0a0a` | `--background` |
| Foreground | `#0c0a09` | `#fafaf9` | `--foreground` |
| Muted | `#f5f5f4` | `#171717` | `--muted` |
| Muted-fg | `#57534e` | `#a8a29e` | `--muted-foreground` |
| Surface | `#ffffff` | `#141414` | `--surface` |
| Surface elevated | `#ffffff` | `#1c1c1c` | `--surface-elevated` |
| Border soft | `rgba(12,10,9,0.08)` | `rgba(250,250,249,0.06)` | `--border-soft` |
| Border strong | `rgba(12,10,9,0.14)` | `rgba(250,250,249,0.12)` | `--border-strong` |

### Service accents (used parcimoniously — bento gradients only)

| Service | Tailwind palette | Usage |
|---------|------------------|-------|
| Digital Workplace | `cyan` | Primary hero / big bento |
| Intégration IA | `fuchsia` | Badge "Populaire" |
| Site Web | `sky` | Small bento |
| Automatisation RPA | `amber` | Small bento |
| Nixie Pulse | `orange` | Hardware highlight |
| AIViz | `violet` | Small bento + brand-aligned |

**Rule:** never mix more than 2 service accents side by side. Always on neutral surface (`--surface`), gradient at `/10` opacity max.

### Anti-patterns (interdit)
- ❌ Gradient purple→pink full-width (cliché AI startup)
- ❌ Néon / cyberpunk couleurs
- ❌ Brand violet sur >20 % de la surface

---

## 2. Typography

### Stack

| Token | Font | Weight | Usage |
|-------|------|--------|-------|
| `--font-display` | Sora | 400–700 | Headings (`<h2>–<h6>`), data labels, nav |
| `--font-body` | DM Sans | 400–600 | Body text, paragraphs |
| `--font-mono` | JetBrains Mono | 400–600 | Numbers, tabular data, step numbers |
| `--font-serif` | **Instrument Serif** | 400 italic | **Editorial accents on H1/H2 only** |

### H1 rule (hero)
```tsx
<h1 className="text-[clamp(2.2rem,6.4vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
  Base sentence in Sora{" "}
  <span className="font-serif-display text-violet-600">editorial accent</span>{" "}
  rest of sentence.
</h1>
```

### Scale
| Element | Size | Class |
|---------|------|-------|
| H1 hero | clamp(2.2rem, 6.4vw, 4.25rem) | custom |
| H2 section | 3xl → sm:text-[2.5rem] | `text-3xl sm:text-[2.5rem]` |
| H3 card | xl → 2xl | `text-xl sm:text-2xl` |
| Section eyebrow | 11px, uppercase, 0.2em tracking | `text-[11px] uppercase tracking-[0.2em] text-violet-600` |
| Body | base → lg | `text-base sm:text-lg` |
| Caption | xs | `text-xs text-muted-foreground` |

### Letter spacing
- Headings: `tracking-[-0.02em]` (default), `tracking-[-0.03em]` (H1)
- Eyebrows: `tracking-[0.2em]`
- Body: normal

---

## 3. Layout & Spacing

- **Container:** `max-w-6xl mx-auto px-5 sm:px-6`
- **Section vertical rhythm:** `mt-20 sm:mt-28` between sections
- **Section inner padding:** `py-14 sm:py-20 lg:py-28` on top-level

### Bento grid rules
- Mobile: 1 col
- md+: 4 cols, rows `auto-rows-[minmax(180px,auto)]`
- Gap: `gap-4`
- Card spans: `md:col-span-2 md:row-span-2` (primary), `md:col-span-2` (medium), `md:col-span-1` (small)
- Flagship card always `row-span-2` + primary accent

---

## 4. Shape, Elevation, Motion

### Border radius
| Token | Value | Usage |
|-------|-------|-------|
| sm | 0.5rem | Chips, mini badges |
| md | 0.75rem | Inputs, small buttons |
| xl | 1rem | Step icons |
| 2xl | 1rem (`16px`) | Buttons, nav items |
| 3xl | 1.5rem (`24px`) | Bento cards (default), sections |
| pill | 9999px | Badges, eyebrow chips |

### Shadows (soft UI evolution)
| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-xs` | `0 1px 2px rgba(12,10,9,0.04)` | subtle |
| `--shadow-sm` | `0 1px 3px rgba(12,10,9,0.06), 0 1px 2px rgba(12,10,9,0.03)` | default card |
| `--shadow-md` | `0 4px 12px rgba(12,10,9,0.06), 0 2px 4px rgba(12,10,9,0.04)` | hover, elevated |
| `--shadow-lg` | `0 12px 32px rgba(12,10,9,0.08), 0 4px 8px rgba(12,10,9,0.04)` | final CTA, modals |
| `--shadow-brand` | `0 10px 30px rgba(124,58,237,0.18)` | primary buttons glow |

### Motion
- Default transition: `200ms cubic-bezier(0.4, 0, 0.2, 1)`
- Hover scale: `translateY(-2px)` on cards (not scale — avoids blur)
- CTA icon arrow: `transition-transform group-hover:translate-x-0.5`
- Reduced motion: **all animations disabled** via `prefers-reduced-motion: reduce`

---

## 5. Core Components

### `.bento-card` (base surface)
```css
background: var(--surface);
border: 1px solid var(--border-soft);
border-radius: 1.5rem;
box-shadow: var(--shadow-sm);
transition: transform 200ms, box-shadow 200ms, border-color 200ms;
```
Hover: `translateY(-2px)` + `--shadow-md` + `--border-strong`.

### `.surface-noise` (premium texture)
SVG fractal noise at 4 % opacity, `position: absolute; inset: 0; z-index: -1`.
Use on large surfaces only (hero bento, ROI card, final CTA).

### Primary Button
```tsx
className="inline-flex items-center justify-center gap-2 rounded-2xl
           bg-violet-600 px-6 py-3.5 text-sm font-medium text-white
           shadow-[0_10px_30px_rgba(124,58,237,0.28)] ring-1 ring-violet-500/20
           transition-all duration-200
           hover:bg-violet-700 hover:shadow-[0_14px_36px_rgba(124,58,237,0.34)]
           focus:outline-none focus:ring-2 focus:ring-violet-500/50
           focus:ring-offset-2 focus:ring-offset-background"
```

### Secondary Button
```tsx
className="inline-flex items-center justify-center rounded-2xl
           border border-[var(--border-strong)] bg-surface
           px-6 py-3.5 text-sm font-medium text-foreground
           transition-colors hover:bg-muted
           focus:outline-none focus:ring-2 focus:ring-violet-500/30
           focus:ring-offset-2 focus:ring-offset-background"
```

### Section eyebrow
```tsx
<p className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
  Section label
</p>
```

### Section H2 with editorial accent
```tsx
<h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1]">
  Base sentence{" "}
  <span className="font-serif-display italic text-violet-600 dark:text-violet-400">
    accent words
  </span>
</h2>
```

### FAQ item
Rounded bento-card with `<details>`/`<summary>`. Plus icon rotates 45° on open. `data-speakable` attr for voice SEO.

---

## 6. SEO / AEO / GEO contract

Every page MUST:
1. Export `generateMetadata` with `alternates.canonical` + `languages.fr|pt-PT|x-default`
2. Include JSON-LD with at minimum: `WebPage`, `BreadcrumbList`
3. H1 + key Q&A elements tagged `data-speakable` → picked up by `WebPage.speakable`
4. FAQ sections → `FAQPage` schema with `mainEntity`
5. Service/product pages → `Service` or `SoftwareApplication` schema with `offers`
6. Images → `next/image` with explicit width/height, `alt` descriptive
7. No layout shift (CLS < 0.1) — reserve space for async content

---

## 7. Pre-delivery checklist (mandatory)

- [ ] No emojis as icons (inline SVG 24×24, stroke-width 2, `aria-hidden`)
- [ ] `cursor-pointer` on all clickable elements (buttons have it natively)
- [ ] Hover states with 150–300 ms transitions on all CTAs and cards
- [ ] Focus states visible: `focus:ring-2 focus:ring-violet-500/30` on every interactive element
- [ ] Light mode contrast 4.5:1 minimum on body text, 3:1 on large text/UI
- [ ] `prefers-reduced-motion: reduce` respected (see globals.css)
- [ ] Responsive checked at 375 px / 640 px / 768 px / 1024 px / 1440 px
- [ ] Dark mode verified (all custom colors have dark variants)
- [ ] Keyboard nav works: Tab order logical, no focus trap except modals
- [ ] `aria-label` on icon-only buttons, `aria-current="page"` on active links
- [ ] Skip-link `#content` at top of body (already in navbar)
- [ ] No horizontal scroll on mobile (inspect at 375 px)
- [ ] Lighthouse: LCP < 2.0 s, CLS < 0.1, TBT < 200 ms

---

## 8. Anti-patterns (reject if you see these)

- ❌ Emoji as functional icon (🚀, 💡, ⚡ as nav/button icons)
- ❌ Generic AI-startup gradient backgrounds (purple→pink full-bleed hero)
- ❌ `text-gray-400` on white bg (fails WCAG — use `text-muted-foreground` token)
- ❌ `transition-all duration-500+` (feels slow on interactions)
- ❌ Box-shadow `0 20px 50px rgba(0,0,0,0.3)` (too heavy)
- ❌ `backdrop-blur-3xl` stacked on multiple elements (perf killer)
- ❌ Serif on body text (Instrument Serif is ONLY for italic accents ≤ 6 words)
- ❌ Icons without `aria-hidden` when decorative
- ❌ `<div>` with `onClick` → use `<button>` or `<Link>`
- ❌ New colors not in this palette (ask first)

---

## 9. Files & conventions

- Pages: `app/[locale]/[route]/page.tsx`
- Server components by default, `"use client"` only when needed
- Shared UI atoms: `components/ui/`
- Shared site molecules: `components/site/`
- Tailwind v4 via `@import "tailwindcss"` + `@theme inline` tokens in `app/globals.css`
- Fonts: loaded in `app/layout.tsx` via `next/font/google` with `display: "swap"` + `variable: "--font-*"`

---

_Generated from UI/UX Pro Max skill output + manual refinements from the `/` homepage rebuild on 2026-04-20._
