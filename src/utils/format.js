// Formatadors i validadors de text per a la pàgina de la visita.

/** 8000 -> "8.000" (milers amb punt, com en català; no depèn del locale del navegador) */
export function milers(n) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

/** 1 -> "001" */
export function codiVisita(n) {
  return String(n).padStart(3, '0')
}

/** "Maig 2026" -> "maig 2026" */
export function minuscula(text) {
  return text ? text.charAt(0).toLowerCase() + text.slice(1) : ''
}

/** Retalla un text a `max` caràcters (per a la meta descripció) */
export function retalla(text, max = 155) {
  if (!text || text.length <= max) return text ?? ''
  return `${text.slice(0, max - 1).trimEnd()}…`
}

const SENSE_PROTOCOL = /^[a-z][a-z0-9+.-]*:\/\//i

/** Un valor és un marcador de posició si conté "·" (p. ex. "+34 93 ··· ··· ··") */
export function esMarcador(valor) {
  return typeof valor === 'string' && valor.includes('·')
}

function net(valor) {
  if (typeof valor !== 'string') return ''
  const text = valor.trim()
  return text && !esMarcador(text) ? text : ''
}

/** "https://caliula.cat/" o "caliula.cat" -> { text: "caliula.cat", href: "https://caliula.cat" } */
export function enllacWeb(valor) {
  const text = net(valor)
  if (!text) return null
  const host = text.replace(SENSE_PROTOCOL, '').replace(/\/+$/, '')
  if (!/^[\w-]+(\.[\w-]+)+(:\d+)?([/?#]\S*)?$/.test(host)) return null
  return { text: host, href: `https://${host}` }
}

/** "@caliula.celler" o "https://instagram.com/caliula" -> { text: "@caliula", href } */
export function enllacInstagram(valor) {
  const text = net(valor)
  if (!text) return null
  const usuari = text
    .replace(SENSE_PROTOCOL, '')
    .replace(/^(www\.)?instagram\.com\//i, '')
    .replace(/^@/, '')
    .replace(/[/?#].*$/, '')
  if (!/^[\w.]{1,30}$/.test(usuari)) return null
  return { text: `@${usuari}`, href: `https://instagram.com/${usuari}` }
}

export function enllacCorreu(valor) {
  const text = net(valor)
  if (!text || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return null
  return { text, href: `mailto:${text}` }
}

export function enllacTelefon(valor) {
  const text = net(valor)
  if (!text || !/^\+?[\d\s().-]{6,24}$/.test(text)) return null
  const digits = text.replace(/[^\d+]/g, '')
  if (digits.replace(/\D/g, '').length < 6) return null
  return { text, href: `tel:${digits}` }
}
