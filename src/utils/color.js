// Ajudes de color per a il·lustracions i paletes de família.
// Treballen amb colors hexadecimals de 6 xifres (#RRGGBB), perquè var(--...)
// no es resol als atributs SVG.

function canals(hex) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
}

/** Luminància relativa WCAG d'un color #RRGGBB */
export function llumRelativa(hex) {
  const [r, g, b] = canals(hex).map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Contrast WCAG entre dos colors #RRGGBB (de 1 a 21) */
export function contrast(a, b) {
  const [clar, fosc] = [llumRelativa(a), llumRelativa(b)].sort((x, y) => y - x)
  return (clar + 0.05) / (fosc + 0.05)
}

/** Mescla dos colors: t = 0 dóna `a`, t = 1 dóna `b` */
export function mescla(a, b, t) {
  const ca = canals(a)
  const cb = canals(b)
  return `#${ca
    .map((v, i) => Math.round(v + (cb[i] - v) * t).toString(16).padStart(2, '0'))
    .join('')}`
}

/**
 * Pastel d'un color: el mateix to i la mateixa saturació amb la lluminositat HSL
 * indicada (0 a 1). Serveix per als cercles de fons suaus de les il·lustracions.
 */
export function tinta(hex, lluminositat) {
  const [r, g, b] = canals(hex).map((v) => v / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min
  let h = 0
  let s = 0
  if (d > 0) {
    s = d / (1 - Math.abs(2 * l - 1))
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  const c = (1 - Math.abs(2 * lluminositat - 1)) * Math.min(s, 0.55)
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = lluminositat - c / 2
  const [r1, g1, b1] = [[c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x]][Math.floor(h / 60) % 6]
  return `#${[r1, g1, b1].map((v) => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('')}`
}
