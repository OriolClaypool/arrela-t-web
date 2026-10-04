# Batch 2 — Home page and the /segell page

Read `design/README.md` first. The reference is `design/maquetes/inici.html`: rebuild the home page to match it section by section, using the components and tokens from batch 1 (`src/components/marca/`, `src/data/families.js`).

Copy illustrations from the mockup's inline SVG into React components (convert attributes to JSX). Do not redraw them from scratch and do not simplify them. Put illustrations in `src/components/illustracions/`.

## Home structure (top to bottom)

1. **Hero** — replace `Hero.jsx`. Copy the label pill, the title with the wheat-underlined "ho hem vist", the subtitle, both buttons ("Descobreix les visites" → `/entrevistes`, "Tens botiga o restaurant?" → `/professional`) and the two check items. The layered landscape goes into `illustracions/PaisatgeHero.jsx`, verbatim, with its animations (rotating sun halo, floating pin, rows of vines, wheat furrows, ploughed field, masia). It must stay full-bleed and keep `preserveAspectRatio="xMidYMax slice"` so it crops gracefully on mobile.

2. **Figures and families** (forest green band) — replaces `ScrollNarrative`, which you can delete.
   - The 4 figures are computed from data, never hardcoded: published producers count, number of distinct comarques among them, total videos (sum of each producer's `reportatge.videos` length), and the fixed "0 €" with "el que paga un productor per sortir-hi".
   - The families grid shows all 8 families with `IconaFamilia`; under each name, the names of the published producers of that family, or "Pròximament".

3. **Les visites** — replaces `UltimesEntrevistes`. Up to 3 most recent published producers, sorted by `numeroVisita` descending. Create `VisitaCard.jsx` (reused in batches 3 and 4) exactly like the mockup card:
   - Illustrated header painted with the family colour. Create `illustracions/CapcaleraVisita.jsx` with a `familia` prop: copy the three headers from the mockup (vi = vineyard rows, horta = mountains + fields + masia, formatge = golden hills + masia + goats). For any other family, a generic layered-hills header in that family's colour.
   - Badge "Visita nº 001" (3 digits from `numeroVisita`), the round family icon overlapping the bottom edge, label "{categoria} · {comarca}" in the family text colour, title = `reportatge.titol` (fallback `nom`), one-line description (`descripcioCurta`), footer with "3 vídeos" and "Llegir la visita →".
   - The whole card links to `/productors/:slug` (one link, the card is not a nest of links).

4. **Temporada** (`id="temporada"`) — new `RodaAny.jsx` + `src/data/temporada.js`.
   - Data: `[{ id: 'verema', nom: 'Verema', mesos: [9, 10], color: '#6A2A47', familia: 'vi' }, { id: 'oli-nou', nom: 'Oli nou', mesos: [11, 12, 1], color: '#B7962A', familia: 'oli' }, { id: 'formatge-fresc', nom: 'Formatge fresc', mesos: [3, 4, 5, 6], color: '#E0AC45', familia: 'formatge' }, { id: 'horta-estiu', nom: "Horta d'estiu", mesos: [6, 7, 8, 9], color: '#6E7B2F', familia: 'horta' }, { id: 'fruita-dolca', nom: 'Fruita dolça', mesos: [5, 6, 7, 8], color: '#EE9A63', familia: 'fruita' }]`.
   - The wheel is computed, not copied: viewBox 540, centre 270. Month ring of 12 segments between radius 214 and 252, month `m` spanning angles `-90 + (m-1)*30` to `-90 + m*30` degrees (clockwise from the top), 1° gap each side; initials G F M A M J J A S O N D. The current month segment is terracota with a light letter.
   - One concentric track per item at radii 188, 162, 136, 110, 84 (stroke 16, track colour `#E1D6BD`), and the item arc from the start of its first month to the end of its last month, round caps, item colour. Handle ranges that wrap past December.
   - Needle from radius 64 to 200 pointing at the middle of the current month, dark dot at the tip; centre disc with "ARA" and the month name in Fraunces.
   - Left column: label, title, intro, the legend list (colour bar, name, month range written in Catalan, e.g. "setembre i octubre", "de novembre a gener") and the callout "Ara, a l'octubre: temps de verema." built from the items active this month. Use correct Catalan articles: "al gener", "al febrer", "al març", "a l'abril", "al maig", "al juny", "al juliol", "a l'agost", "al setembre", "a l'octubre", "al novembre", "al desembre". The callout button links to `/productors?familia={familia}` of the first active item. If nothing is active, hide the callout.
   - Give the SVG `role="img"` and an `aria-label` generated from the data.

5. **El mapa** (`id="mapa"`) — restyle `MapaCatalunya.jsx`, keeping the GeoJSON comarques, lazy loading and all the accessibility work already done (focusable markers, keyboard, select fallback).
   - Map panel `#EAE3D1`, radius 28px. Comarques filled `--territori` with a fine stroke `#C3CB9E`; comarques with a published producer slightly darker `#C8D3A6`.
   - Draw the rivers and city dots from `design/dades/mapa-extres.json` (copy it into `src/data/`) with `react-simple-maps` `<Line>` and `<Marker>`: rivers `--riu`, 2.4px, round caps; cities as small dark dots with labels in Instrument Sans 600.
   - Producer markers = `Pin` in the family colour (formatge uses `colorPin`) with the visit number inside. A dashed terracota route joins them in `numeroVisita` order, with the `arrDash` animation.
   - Next to the map, the numbered list exactly as the mockup (number circle in the family colour, name, comarca, category), plus the dashed "La pròxima visita — Ens recomanes algú? — Proposa'ns-el" row linking to `/contacte`. Each list item links to the producer page.
   - Layout: map and text side by side on desktop, stacked on mobile.

6. **El segell** (`id="segell"`) — section from the mockup with `Segell` (numero 1, nom of visit 001), the 4 steps (Hi anem, Escoltem, Filmem, Segellem) with their round icons, and a link "Com funciona el segell" → `/segell`.

7. **Espai professional** (`id="professional"`) — the forest band with the concentric arcs and the two cards (shop illustration + "Busco proveïdor" → `/professional#proveidor`; produce-crate illustration + "Busco on vendre" → `/professional#distribucio`). Copy both illustrations verbatim. Delete `ProTeaser` from `App.jsx`.

8. **La carta del camp** — restyle `Newsletter.jsx` as in the mockup (wave divider on top, envelope illustration, label input "El teu correu", button "Vull rebre-la"). Keep its current submit behaviour and confirmation.

9. **Footer** — from batch 1.

Every section uses `useFadeIn` for a soft reveal.

## New page `/segell`

Create `src/pages/Segell.jsx` and its route. Content, in Catalan, styled with the system:
- Hero on `--rosa-terra` with a large `Segell` and the title "Verificat vol dir que hi hem estat".
- The 4 steps of the method (same as the home section) explained in one or two sentences each.
- "Què és i què no és": it is the commitment of two people who visited in person, numbered and dated, with the videos as proof; it is not an official certification nor a quality label, and producers never pay for it.
- The list of all issued seals: for each published producer, a small `Segell` with its number, name, comarca and the visit date, linking to the producer page.
- `Seo` with a proper title and description; add `/segell` to `scripts/generate-sitemap.js`.

## Done when

- The home matches `inici.html` on desktop (1280–1440px) and works at 375px (no horizontal scroll, menus and grids stack).
- Unused components (`ScrollNarrative`, `UltimesEntrevistes`, the old `Hero` markup, `MapaHome`/`ProTeaser` in `App.jsx`) and their CSS are deleted.
- `npm run build` and `npx eslint .` pass. Do not commit or push.
