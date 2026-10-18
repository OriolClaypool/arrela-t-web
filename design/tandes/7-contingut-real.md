# Batch 7 — Only real content on the live site

Read `design/contingut-real.md` first: it is Oriol's checklist of what is real in the three 2026 visits (Ça Liula, Soler de n'Hug, Formatges Lluçà). The texts in `src/data/productors.js` for those three were written as samples during the redesign and are live on arrelat.cat. The site must never show words a producer did not say or facts nobody checked.

## Data

For each of the three producers, apply the checklist:

- An item ticked: keep it (if Oriol wrote a correction next to it, use his text).
- An item not ticked: remove it from `productors.js`. Use `null`, an empty string or an empty array as each field already allows; delete the quote objects (`citacio`) and any paragraph in `cos` / `cosFinal` that contains an unticked name, figure or quote. Never rewrite a removed text into a new invented one.
- If, after this, a producer's reportage has no `intro` and no `cos` left, set `reportatge.estat = 'en-preparacio'` and keep only the fields that are still true (`titol` if ticked, `videos` with empty `youtubeId`).

## Components

- Every component that reads these fields must hide what is missing (most already do: check the visit page sections, `VisitaCard`, `LesVisites`, `SegellSeccio`, `MapaSeccio`, `/professional` and the infographics in `src/components/infografies/`). No empty headings, no "undefined", no "0 anys".
- `src/components/visita/VisitaPreparacio.jsx`: when `reportatge.estat === 'en-preparacio'`, the reportage section is replaced by a short block on `--rosa-terra`: label "El reportatge", title "L'estem escrivint", text "Vam visitar {nom} el {dataVisita, if ticked}. Aviat hi trobaràs la seva història, amb les seves paraules, i els tres vídeos." plus the Instagram link (same pattern as `VisitaArxiu.jsx`).
- The `/professional` cards and the "Consulta la fitxa comercial" band only appear for producers whose `comercial` data survived the checklist.

## Done when

- No name, quote, figure or contact from an unticked item appears anywhere on the built site (search the built `dist/` for each removed string).
- The three visit pages, the home page, `/entrevistes`, `/segell`, `/productors` and `/professional` still look finished with less data (check them at 1280px and 390px).
- `npm run lint` and `npm run build` pass.
