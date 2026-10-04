# Batch 1 — Visual system foundation

Read `design/README.md` first. Then open `design/maquetes/sistema.html` and `design/maquetes/inici.html` (header and footer) as the visual reference.

Goal of this batch: install the new visual system so the whole site shifts to it, and build the shared brand components. Do NOT rebuild page layouts yet (home, visit page and the rest come in later batches). Keep all routes and features working.

## 1. Housekeeping

- Add `.claude/settings.local.json` and `.DS_Store` to `.gitignore`.
- Create `design/auditories/` and move `audit-report.txt` (use `git mv`, it is tracked) and `audit-proposal.txt` into it.

## 2. Fonts and head

- In `index.html`, replace the Playfair Display / DM Sans stylesheet with the Fraunces + Instrument Sans URL from the README. Keep the preconnects.
- Set `theme-color` to `#1F4A34`.
- Replace `public/favicon.svg` with the logo mark from `design/icones/logo-arrel.svg` placed on a `#F5F0E4` rounded square (viewBox 40×40, radius 9).

## 3. Tokens

- In `src/index.css` `:root`, add every token from the README tables (brand, grounds, text, map colours) with the README names.
- Keep the old variable names working as aliases of the new tokens so existing pages shift immediately, e.g. `--paper: var(--lli)`, `--paper-deep: var(--lli-fosc)`, `--paper-warm: var(--lli-fosc)`, `--terracotta: var(--terracota)`, `--terracotta-soft: #D9825A`, `--terracotta-pale: #F3B48A`, `--clay: var(--terracota-fosc)`, `--forest: var(--bosc)`, `--moss: #6E7B2F`, `--ink: var(--terra)`, `--ink-soft: var(--terra-suau)`, `--ink-faint: var(--terra-suau)`. Mark the alias block with a comment saying it will be removed in batch 4.
- Search `src/` (CSS and JSX, including SVG fill/stroke values in `MapaCatalunya.jsx`) for hardcoded old palette hexes (`#c47a52`, `#d99873`, `#e0a986`, `#b5613a`, `#1d4d35`, `#177245`, `#5a6b3f`, `#2e2419`, `#6b5d4a`, `#8a7a64`, `#75664f`, `#f6efe1`, `#f0e4d0`, `#ece0c9`) and replace them with the new tokens (or, inside SVG attributes, with the new hex values).
- Typography: body in Instrument Sans; all headings (`h1`–`h3`, and any `font-family: 'Playfair Display'`) in Fraunces with `font-variation-settings: 'SOFT' 100`, weight 600. Remove every `font-style: italic` in the stylesheet and every inline italic; where italics were used for emphasis, use terracota colour instead. Pull quotes stay upright.
- Base styles for links, focus (`outline: 2px solid var(--terracota); outline-offset: 3px` on `:focus-visible`) and `::selection` (background `--blat`).

## 4. Product families

Create `src/data/families.js` exporting the 8 families from the README table: `{ id, nom, color, colorText, colorSobre }` (`colorSobre` = text colour on the fill; add `colorPin` for formatge `#C99A35`, others reuse `color`). Export a `getFamilia(id)` helper.

Add a `familia` field to every producer in `src/data/productors.js`: `ca-liula` → `vi`, `soler-de-nhug` → `horta`, `formatges-lluca` → `formatge`. Also add `numeroVisita`: Ça Liula 1, Soler de n'Hug 2, Formatges Lluçà 3. Leave the `proper` placeholder entry without them.

## 5. Brand components — `src/components/marca/`

- `Logo.jsx`: the mark from `logo-arrel.svg` plus the wordmark "Arrela't" in Fraunces 650. Prop `invers` for dark grounds (use the footer colours from `inici.html`: light leaf `#A3B565`, lli, roots `#EE9A63`). Prop `mida` for size.
- `IconaFamilia.jsx`: the 8 icons from `design/icones/familia-*.svg` as JSX, one component with props `familia` and `mida` (default 112). Decorative by default (`aria-hidden`); if a `titol` prop is passed, render `role="img"` with a `<title>`.
- `Segell.jsx`: from `design/icones/segell.svg`. Props `numero` (formatted as 3 digits: `Nº 001`), `nom` (optional, shown under the number), `mida`. Use `useId()` for the `textPath` id so several seals can live on one page. Accessible name: "Segell Arrela't número 001".
- `Pin.jsx`: teardrop map pin as in the map of `inici.html`, props `color`, `numero` (optional, drawn in a light circle inside), renders an SVG `<g>` meant to be placed inside a parent SVG.
- `Onada.jsx`: the wavy section divider (see the top of "La carta del camp" in `inici.html` and the bottom of the visit hero in `visita.html`), props `color` (fill) and `invertida`.

## 6. Shared CSS utilities in `src/index.css`

- Buttons: `.btn` (pill, min-height 52px, padding 0 24–26px, weight 600, 16px), `.btn--terracota` (fill terracota, text `#FFF8EE`), `.btn--bosc`, `.btn--contorn` (2px border bosc), `.btn--clar` (fill lli, for dark grounds). Arrow icon inside buttons as inline SVG.
- `.etiqueta` (pill: 6px 12px, 12px uppercase, weight 700, letter-spacing 0.08em), `.seccio-etiqueta` and `.seccio-titol` per the README.
- `.targeta` (paper card, border linia, radius 22px) and `.lift` with the hover lift.
- Keyframes `arrSpin`, `arrBob`, `arrDash` and the `prefers-reduced-motion` block from the mockups.

## 7. Nav and footer

Restyle `Nav.jsx` and `Footer.jsx` to match `inici.html` exactly (sticky top nav on lli with a 1px bottom line; footer on `--terra` with the 4 columns and the bottom line).

- Nav links: "Les visites" → `/entrevistes`, "Temporada" → `/#temporada`, "El mapa" → `/productors`, "El segell" → `/segell`, "Qui som" → `/qui-som`, and the pill "Espai professional" → `/professional` (bosc fill). Keep the mobile hamburger with `aria-expanded`; on mobile the menu stacks.
- Footer: use the real Instagram link `https://instagram.com/arrela_t_` with the handle `@arrela_t_`. YouTube stays without URL: render it as plain text (no `href="#"`) with a TODO comment.
- `/segell` does not exist yet (batch 2 creates it); that is expected.

## Done when

- `npm run build` and `npx eslint .` pass.
- Every page renders with the new palette and fonts, nothing italic, no old Playfair/DM Sans references left (`grep -ri "playfair\|dm sans" src index.html` returns nothing).
- Do not commit or push. I'll do it.
