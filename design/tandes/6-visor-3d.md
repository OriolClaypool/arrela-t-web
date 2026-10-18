# Batch 6 — 3D objects and spaces on the visit page (only when a real capture exists)

Run this batch only when Oriol has a real 3D file of a producer's product or space. Do not add placeholder or sample models.

Read `design/README.md` first. Captures are made with the free Mac tools described in the "Visualització 3D" guide (Object Capture for objects; LuluSplat or 3D Splat App plus SuperSplat for spaces).

## Data

Two optional fields per producer in `src/data/productors.js`:

```js
objecte3d: {
  glb: '/3d/<slug>/<nom>.glb',      // required, at most 8 MB, Draco or Meshopt compressed
  usdz: '/3d/<slug>/<nom>.usdz',    // optional, for AR Quick Look on iPhone
  poster: '/3d/<slug>/<nom>.webp',  // required, what shows before loading
  alt: 'Un sac de blat de moro escairat de L\'Escairador',
  titol: 'El blat de moro escairat',
},
espai3d: {
  visor: '/3d/<slug>/espai/index.html', // the viewer exported by SuperSplat (File › Export › Viewer App)
  poster: '/3d/<slug>/espai.webp',
  titol: 'La sala del molí',
},
```

Files go in `public/3d/<slug>/`. They are plain static assets: nothing else needs configuring.

## Components

- `src/components/visita/VisitaObjecte3D.jsx`: renders only if `objecte3d` exists. Shows the poster with a button "Mira-ho en 3D". On click, load `@google/model-viewer` with a dynamic `import()` (add it to `package.json`; it must not enter the main bundle) and swap the poster for `<model-viewer src={glb} ios-src={usdz} poster={poster} alt={alt} camera-controls ar ar-modes="webxr scene-viewer quick-look" touch-action="pan-y" shadow-intensity="0.6">`. A second button inside, "Posa-ho a la taula", uses model-viewer's AR button slot; hide it when AR is not available.
- `src/components/visita/VisitaEspai3D.jsx`: renders only if `espai3d` exists. Poster plus button "Entra a l'espai"; on click, an `<iframe src={visor} title={titol} loading="lazy" allow="fullscreen; xr-spatial-tracking">` in a 16:9 box (4:5 on mobile). Before the click nothing heavy loads.
- Place both in `Visita.jsx` as a section "Mira-ho de prop" after "Els seus productes", in the family colours, with one line of text: "Gira-ho, apropa-t'hi i, des del mòbil, posa-ho sobre la taula de casa."

## Rules

- Nothing 3D autoloads: the visitor chooses. Show the file size next to the button ("6 MB").
- `prefers-reduced-motion`: no auto-rotate.
- Every 3D block has a text alternative (`alt` or a caption) and keyboard-reachable buttons.
- Test on an iPhone and an Android phone over mobile data before publishing; the page must stay fast for visitors who never press the button (Lighthouse performance not worse than before).
