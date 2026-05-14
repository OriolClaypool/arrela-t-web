#!/usr/bin/env node
/* Genera /public/rss.xml amb les entrades del diari i els números de newsletter */
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

/* Import de les dades (ESM) */
const { diari } = await import('../src/data/diari.js');
const { newsletters } = await import('../src/data/newsletter.js');

const SITE = 'https://arrelat.cat';
const LANG = 'ca';

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function rfcDate(iso) {
  return new Date(iso + 'T00:00:00Z').toUTCString();
}

const items = [
  ...diari.map((d) => ({
    titol: d.titol,
    link: `${SITE}/diari/${d.slug}`,
    descripcio: d.extracte,
    data: d.data,
    categoria: 'Diari de visita',
  })),
  ...newsletters.map((n) => ({
    titol: `#${n.numero} ${n.titol}`,
    link: `${SITE}/newsletter/${n.slug}`,
    descripcio: n.extracte,
    data: n.data,
    categoria: 'Newsletter',
  })),
].sort((a, b) => new Date(b.data) - new Date(a.data));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Arrela’t — Diari i Entrevistes</title>
    <link>${SITE}</link>
    <description>Posem en valor el sector primari català. Diari de visites i newsletter mensual.</description>
    <language>${LANG}</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.titol)}</title>
      <link>${item.link}</link>
      <description>${escapeXml(item.descripcio)}</description>
      <pubDate>${rfcDate(item.data)}</pubDate>
      <category>${escapeXml(item.categoria)}</category>
      <guid isPermaLink="true">${item.link}</guid>
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>`;

const publicDir = join(root, 'public');
mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, 'rss.xml'), xml, 'utf8');
console.log(`RSS generat amb ${items.length} entrades → public/rss.xml`);
