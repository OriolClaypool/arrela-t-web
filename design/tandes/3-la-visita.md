# Batch 3 — "La visita": one page per producer

Read `design/README.md` first. The reference is `design/maquetes/visita.html` (example: Ça Liula). Match it closely, using the components from batches 1 and 2.

Today each producer has two pages: `/productors/:slug` (`ProducerProfile.jsx`) and `/entrevistes/:slug` (`ProducerReportage.jsx`). Merge them into a single page, `src/pages/Visita.jsx`, at `/productors/:slug`. The whole page is painted with the producer's family colour (`getFamilia(productor.familia)`), so the same component works for vi, horta, formatge and any future family.

## Routing

- `/productors/:slug` → `Visita`.
- `/entrevistes/:slug` → redirect to `/productors/:slug` (`<Navigate replace>` in React Router) and add a permanent redirect in `vercel.json` (`"redirects": [{ "source": "/entrevistes/:slug", "destination": "/productors/:slug", "permanent": true }]`, keeping the existing SPA rewrite).
- Update every internal link that points to `/entrevistes/:slug`. `/entrevistes` (the index) stays.
- Remove `/entrevistes/:slug` URLs from `scripts/generate-sitemap.js`.
- Unknown slug → the existing NotFound.

## Data changes in `src/data/productors.js`

Add only what the page needs, without inventing facts:
- `fitxa`: an array of infographic items (see section 2). Ça Liula: `[{ tipus: 'comarca' }, { tipus: 'trajectoria' }, { tipus: 'quadres', valor: 3, unitat: 'ha', etiqueta: 'de vinya vella', llegenda: '1 quadre = 1 hectàrea' }, { tipus: 'pictograma', valor: 8000, cadaUnitat: 1000, icona: 'ampolla', etiqueta: "ampolles l'any", llegenda: 'cada ampolla = 1.000' }]`. Formatges Lluçà: `[{ tipus: 'comarca' }, { tipus: 'trajectoria' }, { tipus: 'pictograma', valor: 200, cadaUnitat: 25, icona: 'formatge', etiqueta: 'kg de formatge a la setmana', llegenda: 'cada formatge = 25 kg' }]`. Soler de n'Hug: `[{ tipus: 'comarca' }, { tipus: 'trajectoria' }]`.
- `reportatge.videos[i].youtubeId: ''` (empty until the videos are published).
- `reportatge.autoriaText` and `reportatge.autoriaImatges`: empty strings.
- `onComprar: []` (list of `{ tipus: 'explotacio' | 'botiga' | 'mercat' | 'restaurant', nom, lloc }`), empty for now.

## Page sections, in order

1. **Hero** (family colour background, family `colorSobre` text). Back link "Totes les visites" → `/entrevistes`. Badge pill with the small seal mark: "Visita nº 001 · Productor verificat". Meta line "{nom} · {categoria} · {comarca}" (light accent `#F3B48A` on vi; pick an equivalent light tint for other families that passes AA). H1 = `reportatge.titol` (fallback `nom`). Lead = `descripcioCurta`. Buttons "Mira els 3 vídeos" → `#videos` and "Contacte i on comprar" → `#contacte`. Right column: the illustration panel. Create `illustracions/PaisatgeVisita.jsx` with a `familia` prop: the vi version is the one in the mockup (copy it verbatim). For horta and formatge, build versions in the same style and composition, using the matching home card header as the starting point (horta: mountains with snow, fields, masia, a tomato plant in the foreground; formatge: golden hills, masia, goats, a cheese wheel in the foreground). Wave divider (`Onada`) at the bottom.

2. **La fitxa** — "{nom} en un cop d'ull". One card per `fitxa` item, components in `src/components/infografies/`:
   - `comarca`: the mini Catalonia silhouette from the mockup (copy the path) with a pin in the family colour. Pin position from `coordenades` `[lon, lat]`: `x = (lon - 0.10) * cos(41.7°) * 46 + 4`, `y = (42.92 - lat) * 46 + 4` in the 120×120 viewBox. Big value = comarca, small = "Visita nº 001 del mapa".
   - `trajectoria`: a dot timeline from `anyInici` to the current year, last dot terracota; big value "{n} anys", small "fent {producte} des del {anyInici}" (use the category in lower case).
   - `quadres`: `valor` squares with furrow texture in `--territori`/horta green, the `llegenda` under it; big value "{valor} {unitat}", small `etiqueta`.
   - `pictograma`: `valor / cadaUnitat` icons (`ampolla` = the bottle from the mockup in the family colour, `formatge` = a cheese wheel in the same style, `caixa` = a produce crate), the `llegenda` under it; big value formatted with Catalan thousands (`8.000`), small `etiqueta`.
   Grid: 4 columns on desktop, wraps on smaller screens.

3. **L'any a la vinya / a l'obrador / a l'hort** — `CalendariFeines.jsx` + `src/data/calendaris.js`.
   - Per-family templates, overridable by a producer `calendari` field. Vi (from the mockup): Poda des–febr, Brotada març–abr, Floració maig–juny, Maduració jul–ag, Verema set–oct, Vinificació set–nov, Criança tot l'any. Also write templates for `formatge` (Parts i cabrits gen–març, Pastura abr–oct, Llet de temporada març–juny, Formatge fresc març–juny, Curació tot l'any) and `horta` (Sembra i planter gen–abr, Collita de primavera abr–juny, Collita d'estiu juny–set, Collita de tardor set–nov, Llegums i cereals juny–jul). Mark both with `// TODO: validar amb el productor durant la visita`.
   - Grid of 12 months with a bar per task in its colour (text on bars must pass AA), ranges that wrap past December are split into two bars, the current month column highlighted in `--rosa-terra` with a terracota outline, and the chip "Ara: {mes}, {tasques actives}" at the top right. Section title uses the family place: vi → "Què passa a la vinya, mes a mes", formatge → "Què passa a l'obrador, mes a mes", horta → "Què passa a l'hort, mes a mes". On mobile the grid scrolls horizontally inside its box. `role="img"` with an `aria-label` that reads the whole calendar.

4. **El procés** — `ProcesPassos.jsx`, data per family in `src/data/processos.js`. Vi: Vinya, Verema, Premsa, Fermentació, Ampolla (copy the 5 round icons from the mockup verbatim). Formatge: Pastura, Munyida, Quallada, Emmotllat, Maduració. Horta: Llavor, Planter, Cultiu, Collita, Cistella. Draw the formatge and horta icons in exactly the same style (filled circle in a palette colour, chunky filled shapes, no thin lines). Dashed connecting line on desktop only.

5. **El reportatge** — narrow reading column (max 760px) on `--paper`: label, title "La història de la visita", byline built only from the fields that exist (`autoriaText`, `autoriaImatges`, `dataVisita`), the intro in Fraunces 25px, `cos` paragraphs, the pull quote block in the family colour (upright, never italic), then `cosFinal`. Use the existing `reportatge` texts.

6. **Els vídeos** (`id="videos"`, forest band) — three lite-embed cards (`VideoLite.jsx`). Posters are the three illustrations from the mockup (person/hat, cellar barrels, two speech bubbles), tinted with the family colour where it makes sense. If `youtubeId` exists, the play button (real `<button>`, 72px, with an aria-label) swaps the poster for a `youtube-nocookie.com` iframe with autoplay. If it is empty, no play button: show a small pill "Aviat" instead. Remove the `[durada]` placeholder unless a `durada` field exists.

7. **Els seus productes** — product cards with `ProducteIllustracio.jsx`: `ampolla` (vi, colour from `colorPlaceholder`, label and seal mark as in the mockup), `formatge` (fresh or cured wheel), `cistella` (horta produce). Name and `detall` under each.

8. **On trobar-los** (`id="contacte"`) — three cards: the mini map with the comarca and `ubicacio`; "On comprar-ho" from `onComprar` (if empty: "Encara no hi ha punts de venda publicats." in secondary text); "Contacte" with web, email, Instagram and phone. Build URLs safely (strip any protocol before adding `https://`), hide any value containing `·` (placeholder), and the button "Escriu-los" → `mailto:` if there is an email.

9. **Segell** band (`--rosa-terra`): `Segell` with the producer number, "Visita nº 001, verificada", "Visita feta: {dataVisita}. Els tres vídeos i aquest reportatge en són la prova.", link "Com funciona el segell" → `/segell`.

10. **Espai professional** band (terracota): "Consulta la fitxa comercial de {nom}" → `/professional`.

## Cleanup and SEO

- Delete `ProducerProfile.jsx`, `ProducerReportage.jsx` and their CSS.
- `Seo` on the page: title "{reportatge.titol} — {nom} · Arrela't", description from `reportatge.intro` (about 155 characters), canonical `/productors/:slug`.

## Done when

- `/productors/ca-liula` matches `visita.html`; `/productors/soler-de-nhug` and `/productors/formatges-lluca` look equally finished in their own family colours.
- `/entrevistes/ca-liula` lands on `/productors/ca-liula`.
- Works at 375px. `npm run build` and `npx eslint .` pass. Do not commit or push.
