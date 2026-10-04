# Batch 4 — The rest of the pages and final cleanup

Read `design/README.md` first. There is no dedicated mockup for these pages: apply the system from `design/maquetes/sistema.html` and the patterns already built for the home (batch 2) and the visit page (batch 3). Same section labels and titles, cards on `--paper`, pill buttons, organic blobs, wave dividers, family colours, soft reveals. Keep every page's current content and features unless stated otherwise.

## 1. `/entrevistes` — "Les visites"

- Hero band on `--lli` with label "Les visites", title "Cada visita, una història del territori" and a short intro.
- Grid of `VisitaCard` for every published producer, sorted by `numeroVisita` descending, plus a final dashed card "La pròxima visita — Ens recomanes algú?" linking to `/contacte`.
- Update the `Seo` title and description.

## 2. `/productors` — the map and the directory

- Header: label "El mapa", title "On hem estat, visita a visita".
- Family filter as a row of chips (the small `IconaFamilia` + name), only families that have published producers, plus "Totes". Read and write the `?familia=` query param (the home "Temporada" callout links here with it). Chips are real buttons with `aria-pressed`.
- The restyled `MapaCatalunya` from batch 2 (keep the comarca select fallback for keyboard and mobile), then the filtered `VisitaCard` grid.
- Remove the old category/comarca dropdowns and the free-text search (`FilterBar.jsx`) unless the map still needs part of it.

## 3. `/professional` — the meeting point

- Remove the fake logged-in state completely ("El meu compte", "Botiga verificada" and any simulated session).
- Header on `--bosc` with the concentric arcs from the home professional band: label "Espai professional", title "El punt de trobada entre el camp i el comerç", and the line "No som un mercat en línia. Som dues persones que coneixen cada productor i fan de pont, a mà, entre qui produeix i qui ven o cuina."
- Two forms, side by side on desktop, stacked on mobile, reusing the two illustrations from the home band:
  - `id="proveidor"` "Busco proveïdor" (for shops and restaurants): business name, type (botiga, restaurant, obrador, altres), comarca, what they are looking for, approximate volume, frequency, email, phone (optional).
  - `id="distribucio"` "Busco on vendre" (for producers): name, project, family (select from `families.js`), comarca, what they make, capacity, zones where they can deliver, email.
  - Real `<label>`s, required fields, and on submit a confirmation state ("Gràcies. Et respondrem en 48 hores amb una proposta.") instead of clearing silently. No backend yet: add a `// TODO: connectar a Formspree` where the request would go.
- Below, the existing list of producer commercial sheets with the comarca filter, restyled as cards with the family colour and icon. Fix the data contradiction: keep a single source of truth, `comercial.zonesDistribucio`, remove the duplicated top-level `zonesDistribucio` from `productors.js` and update every usage.

## 4. `/qui-som`, `/agenda`, `/contacte`, NotFound

- `/qui-som`: hero with an organic blob composition, the two team cards (keep the current placeholders, but render them so real names and photos can drop in), the manifest as a reading column, and the 4 principles as illustrated cards.
- `/agenda`: events as cards with a date block in terracota (day big in Fraunces, month small), place, short text. Empty state: illustration plus "Aviat tindrem novetats. Segueix-nos a Instagram" linking to `https://instagram.com/arrela_t_`.
- `/contacte`: two-column layout (intro and channels on the left, form on the right), same confirmation pattern as the professional forms.
- NotFound: a small illustration (a lost map pin among hills), "Aquest camí no porta enlloc" and buttons back to home and to the visits.

## 5. Final cleanup

- Remove the alias block of old variable names from `src/index.css` (added in batch 1) and replace any remaining usage with the new tokens.
- Delete CSS that no component uses any more.
- `grep -rni "italic\|playfair\|dm sans\|#177245\|#c47a52\|#1d4d35" src index.html` returns nothing.
- Check every page at 375px, 768px and 1280px: no horizontal scroll, touch targets at least 44px, visible focus, text contrast AA (especially text on family colours).
- Update `scripts/generate-sitemap.js` so it lists exactly the existing routes.

## Done when

- The whole site reads as one system with the home and the visit pages.
- `npm run build` and `npx eslint .` pass. Do not commit or push.
