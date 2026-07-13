import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import productors from '../src/data/productors.js'

const SITE_URL = 'https://arrelat.cat'

const STATIC_ROUTES = [
  '/',
  '/productors',
  '/entrevistes',
  '/qui-som',
  '/agenda',
  '/contacte',
  '/professional',
]

const publicats = productors.filter((p) => p.publicat)

const routes = [
  ...STATIC_ROUTES,
  ...publicats.map((p) => `/productors/${p.slug}`),
  ...publicats.filter((p) => p.reportatge).map((p) => `/entrevistes/${p.slug}`),
]

const urlset = routes
  .map((route) => `  <url>\n    <loc>${SITE_URL}${route}</loc>\n  </url>`)
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`

const __dirname = dirname(fileURLToPath(import.meta.url))
const outPath = resolve(__dirname, '../public/sitemap.xml')

writeFileSync(outPath, xml)
console.log(`sitemap.xml generat amb ${routes.length} rutes`)
