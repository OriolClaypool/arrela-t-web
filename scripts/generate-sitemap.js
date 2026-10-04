import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import productors from '../src/data/productors.js'
import { getFamilia } from '../src/data/families.js'

// Genera public/sitemap.xml amb exactament les rutes que existeixen a src/App.jsx:
// - rutes fixes: les <Route path="..."> sense paràmetres (ni el comodí *)
// - /productors/:slug: una per cada productor publicat amb família vàlida (les altres
//   mostren la pàgina 404)
// Les rutes amb paràmetre que només redirigeixen (/entrevistes/:slug) no hi surten.

const SITE_URL = 'https://arrelat.cat'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = readFileSync(resolve(__dirname, '../src/App.jsx'), 'utf8')
const camins = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1])

if (!camins.includes('/productors/:slug')) {
  throw new Error("No he trobat la ruta /productors/:slug a src/App.jsx: reviseu generate-sitemap.js")
}

const rutesFixes = camins.filter((cami) => !cami.includes(':') && cami !== '*')

const visites = productors
  .filter((p) => p.publicat && getFamilia(p.familia))
  .map((p) => `/productors/${p.slug}`)

const routes = [...rutesFixes, ...visites]

const urlset = routes
  .map((route) => `  <url>\n    <loc>${SITE_URL}${route}</loc>\n  </url>`)
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`

const outPath = resolve(__dirname, '../public/sitemap.xml')

writeFileSync(outPath, xml)
console.log(`sitemap.xml generat amb ${routes.length} rutes`)
