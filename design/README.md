# Arrela't — design direction "orgànica"

This folder is the visual source of truth for the site redesign. Read this file before any redesign task, then open the mockups and match them closely.

## What is here

| Path | What it is |
|---|---|
| `maquetes/inici.html` | Home page mockup (full page, responsive). |
| `maquetes/visita.html` | "La visita" — the single page per producer (profile + reportage merged). Example: Ça Liula. |
| `maquetes/sistema.html` | The visual system sheet: palette, type, icons, shapes, infographic pieces, buttons. |
| `icones/familia-*.svg` | The 8 product-family icons (vi, formatge, horta, fruita, oli, ramaderia, mel, pesca). |
| `icones/logo-arrel.svg` | The logo mark (sprout + roots). |
| `icones/segell.svg` | The Arrela't seal ("Segell"), numbered. |
| `dades/mapa-extres.json` | Decorative map extras: simplified river lines and city points (lon, lat). |
| `tandes/*.md` | The implementation prompts, one per batch, to run in order. |

The mockups are plain HTML: open them in a browser to see them. Every illustration is inline SVG inside them, so you can copy SVG markup straight into React components (convert attributes to JSX: `stroke-width` → `strokeWidth`, `class` → `className`, etc.).

Text in square brackets in the mockups (`[nom]`, `[durada]`…) is a placeholder: never render brackets on the real site. If the data does not exist, hide that element.

## Principles

1. **Colour from the territory.** Terracota and forest green stay as the brand. Each product family has its own colour; a visit page, card, pin and calendar are painted with the producer's family colour.
2. **Illustration instead of emptiness.** Until real photos exist, every visual gap is a flat, layered illustration (landscape layers, rows of vines, furrows, a farmhouse, the sun). Illustrations stay as a brand layer when photos arrive.
3. **Own icons, filled and rounded.** Icons are chunky filled shapes on an irregular organic blob of the family colour. Never thin-line icons, never an icon library, never emoji.
4. **Data as infographics.** Numbers become pictograms, timelines, calendars and wheels. Every infographic is data-driven from `src/data/`.
5. **Soft motion.** Slow, organic, never bouncy. Always respect `prefers-reduced-motion`.
6. **No italics anywhere.** To emphasise a word use terracota colour or the wheat underline (see hero title). Headings are never italic, pull quotes are never italic.

## Tokens

### Brand and grounds

| Token | Hex | Use |
|---|---|---|
| `--bosc` | `#1F4A34` | Forest green: strong backgrounds, nav button, headings |
| `--bosc-fosc` | `#163826` | Deep shadows inside illustrations |
| `--terracota` | `#B5562F` | Primary actions, highlights |
| `--terracota-fosc` | `#8F3F1F` | Section labels and small terracota text on light grounds |
| `--blat` | `#E4BE5C` | Wheat: highlights on dark grounds, underline accent |
| `--lli` | `#F5F0E4` | Page background |
| `--lli-fosc` | `#EDE5D2` | Alternate section background |
| `--paper` | `#FFFBF2` | Cards |
| `--rosa-terra` | `#F6E2D3` | Warm section background (seal, callouts) |
| `--linia` | `#E6DCC6` | Card borders |
| `--linia-fosca` | `#DCD1B9` | Dividers on `--lli-fosc` |
| `--terra` | `#2A2017` | Body text, dark footer |
| `--terra-suau` | `#5E5040` | Secondary text |
| `--mar` | `#D3E3E6` | Sea / water |
| `--territori` | `#D6DDBA` | Land fill on maps |
| `--riu` | `#7FAAB7` | Rivers |

On dark green, secondary text is `#C9D6C4`; on `--terra`, secondary text is `#CBBFA9`.

### Product families

| id | Name | Fill | Text on light grounds | Text on the fill |
|---|---|---|---|---|
| `vi` | Vi | `#6A2A47` | `#6A2A47` | `#F5F0E4` |
| `formatge` | Formatge | `#E4BE5C` (pins `#C99A35`) | `#8A6416` | `#2A2017` |
| `horta` | Horta | `#6E7B2F` | `#5A6522` | `#FFFFFF` |
| `fruita` | Fruita | `#EE9A63` | `#9A4A1C` | `#2A2017` |
| `oli` | Oli | `#B9C49B` | `#4E5A1C` | `#2A2017` |
| `ramaderia` | Ramaderia | `#B5562F` | `#8F3F1F` | `#FFF8EE` |
| `mel` | Mel | `#C98A26` | `#8E5C10` | `#2A2017` |
| `pesca` | Pesca | `#8EB9C4` | `#2F5E6E` | `#2A2017` |

All text pairings above pass WCAG AA. Do not invent new pairings without checking contrast (4.5:1 for normal text).

### Type

- Display and numbers: **Fraunces**, weight 600, `font-variation-settings: 'SOFT' 100`, letter-spacing `-0.02em` on large sizes. Never italic.
- Text and UI: **Instrument Sans**, 400–700.
- Fonts are self-hosted with Fontsource (no Google Fonts request: faster first paint and no visitor IPs sent to Google): `@fontsource-variable/fraunces/full.css` (includes the `SOFT` axis) and `@fontsource-variable/instrument-sans`, imported in `src/main.jsx`. Family names: `'Fraunces Variable'` and `'Instrument Sans Variable'`.
- Section label: 13px, weight 600, uppercase, letter-spacing `0.14em`, colour `--terracota-fosc` (on dark grounds: `--blat`).
- Section title: `clamp(34px, 4vw, 54px)`, line-height 1.05, colour `--bosc`.

### Shape and spacing

- Cards: `--paper` background, 1px `--linia` border, radius 22px.
- Large panels: radius 26–32px. Buttons and pills: fully rounded (999px), minimum height 44px (primary 52–54px).
- Page container: `max-width: 1240px`, side padding `clamp(20px, 4vw, 64px)`, section vertical padding 88–104px.
- Organic blobs: the 4 base blob paths are in `maquetes/sistema.html` ("Formes i textures"). Never a perfect circle behind an icon.

### Motion

- `.lift`: on hover, `translateY(-6px)` plus a soft shadow, 0.5s `cubic-bezier(.2,.7,.2,1)`.
- Sun halo rotates (90s linear), the hero pin floats (3.4s ease-in-out), the map route dashes advance (7s linear).
- Reveal on scroll with the existing `useFadeIn` hook: opacity 0 → 1 and `translateY(16px)` → 0, 0.8s.
- Everything off under `prefers-reduced-motion: reduce`.

## Data rules

- Never invent facts about a producer. Infographics only render when their data exists.
- Placeholders in data (for example phone numbers with `···`) are hidden, not shown.
- Visit numbers follow the order in which the interviews were recorded: Ça Liula 001, Soler de n'Hug 002, Formatges Lluçà 003.
