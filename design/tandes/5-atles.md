# Batch 5 — `/atles`: the primary sector, comarca by comarca

Read `design/README.md` first, then `design/atles/README.md` (fields, sources and caveats). The live reference is the Atles tool Oriol uses on claude.ai; this batch brings its reading part to the site, in the site's own components and style. No 3D on the site: the 3D reels stay in the tool.

## Data

- Copy `design/atles/comarques.json` to `src/data/atles.json` and import it statically (it is about 10 kB).
- Indicators, in this order, each with `{ id, nom, etiqueta, unitat, periode, rampa, talls, decimals, nota? }`:
  1. `c65_20` Envelliment — "Caps d'explotació de 65 anys o més", %, 2020, terracota ramp, breaks `[30, 35, 40, 45]`, 1 decimal.
  2. `m35_20` Joves — "Caps d'explotació de menys de 35 anys", %, 2020, green ramp, `[3, 4, 5, 6.5]`, 1 decimal.
  3. `var0920` Canvi 2009-2020 — "Canvi en el nombre d'explotacions", %, diverging ramp, `[-20, -5, 5, 20]`, 1 decimal, sign shown (`+5,2 %`), `nota`: the census threshold caveat from `design/atles/README.md`.
  4. `dens` Densitat — "Explotacions agràries per cada 100 km²", 2020, green ramp, `[60, 100, 160, 300]`, 0 decimals.
  5. `ecol_pct` Ecològic — "Explotacions amb agricultura ecològica", %, 2020, green ramp, `[4, 8, 10, 15]`, 1 decimal.
  6. `ur_ha` Ramaderia — "Unitats ramaderes per hectàrea de SAU", 2020, terracota ramp, `[1, 2, 3, 4]`, 2 decimals.
  7. `sau_pct` Superfície agrícola — "Superfície agrícola utilitzada, en % del territori", 2020, green ramp, `[20, 27, 35, 45]`, 1 decimal.
- Ramps (5 classes, validated for colour-blind separation on `--paper`; do not change them by eye):
  green `#8DB48D #6D996E #517F52 #3C633D #2A482B`, terracota `#DB997B #C67854 #B05E36 #96461D #753515`, diverging `#96461D #C57E5E #C1BDB7 #6D996E #3C633D` (grey is the "no change" class).
- Numbers in Catalan format (`40,9 %`, `33.721 ha`): use `Intl.NumberFormat('ca-ES')`.

## Page

`src/pages/Atles.jsx` at `/atles`, with `Seo` (title "Atles del camp català — Arrela't", description about the census figures by comarca). Add "L'atles" to the main nav after "El mapa" and to the footer.

1. **Header** in the style of the other pages: label "L'atles", title "El camp català, comarca a comarca", intro: "Les xifres oficials del sector primari de cada comarca, i les visites d'Arrela't. Tria què vols veure i toca una comarca."
2. **Indicator chips** (one row, wraps on mobile; `aria-pressed`) and a two-button switch "Mapa" / "Rànquing".
3. **Map** — reuse the geography and projection of `MapaCatalunya.jsx` (same `public/data/catalunya-comarques.min.json`, same `geoMercator` settings) in a new component `MapaAtles.jsx`; do not touch the home and `/productors` map. Fill each comarca with its class colour, 1.2px `--paper` borders, the selected comarca drawn last with a 2.6px `--terra` border. Hover/focus tooltip: comarca, value, "Catalunya: x". Comarques are keyboard-focusable and selectable (Enter/Space), plus a `<select>` of comarques under the map for mobile. On the map, a small numbered circle per comarca with Arrela't visits (count of `publicat` producers in `productors.js` by `comarca`).
4. **Ranking** — the 43 comarques sorted by value as horizontal bars (4px rounded data end, bar colour = class colour), the Catalonia row at the end in `--terra-suau`, the selected comarca highlighted. Diverging indicator: bars grow left or right from a zero axis.
5. **Legend** under the map: the five class swatches with their ranges ("menys de 30 %", "30 a 35 %", ..., "45 % o més"), and the indicator's `nota` when it has one.
6. **Comarca card** (sticky on desktop, under the map on mobile): name, population and area, the big value in Fraunces, "Catalunya: x · posició n de 43", for `c65_20` also "El 2009: x"; then a definition list with holdings 1999 / 2009 / 2020, managers 65+ (2009, 2020), under 35, organic, livestock units per ha and SAU; then "Les visites d'Arrela't" at that comarca (links to `/productors/:slug`) or "Encara no hi hem fet cap visita."
7. **Sources** paragraph at the bottom with the links and caveats from `design/atles/README.md`.

State (indicator, comarca, view) in the URL query (`?indicador=c65_20&comarca=Berguedà&vista=mapa`) so a link opens the same view; default `c65_20` and Berguedà.

## Accessibility and motion

The map `<svg>` has `role="group"` and an `aria-label` naming the indicator; each comarca path has an accessible name with its value. The ranking is the accessible alternative to the map and must be reachable by keyboard. Colour is never the only carrier: the value is always written in the tooltip, the card and the ranking. Respect `prefers-reduced-motion` for any transition.

## Done when

- `/atles` works on desktop and on a 390px phone with no horizontal scroll.
- Switching indicator recolours the map without re-mounting it; the selected comarca survives the switch.
- `npm run lint` and `npm run build` pass, and `/atles` appears in `public/sitemap.xml`.
