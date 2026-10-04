// Ajudes per escriure mesos en català: noms, articles correctes i intervals.
// Mesos amb número d'1 (gener) a 12 (desembre).

export const NOMS_MESOS = [
  'gener', 'febrer', 'març', 'abril', 'maig', 'juny',
  'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre',
]

// Mesos que comencen per vocal: abril, agost, octubre (elisió de l'article i de "de").
const COMENCA_VOCAL = new Set([4, 8, 10])

const nom = (m) => NOMS_MESOS[m - 1]

export function nomMes(m) {
  return nom(m)
}

/** "Octubre" */
export function nomMesCapital(m) {
  const n = nom(m)
  return n.charAt(0).toUpperCase() + n.slice(1)
}

/** "al gener", "a l'abril", "a l'octubre" */
export function alMes(m) {
  return COMENCA_VOCAL.has(m) ? `a l'${nom(m)}` : `al ${nom(m)}`
}

/** "el gener", "l'abril", "l'octubre" */
export function elMes(m) {
  return COMENCA_VOCAL.has(m) ? `l'${nom(m)}` : `el ${nom(m)}`
}

/** "de març", "d'abril" */
export function deMes(m) {
  return COMENCA_VOCAL.has(m) ? `d'${nom(m)}` : `de ${nom(m)}`
}

/** Uneix amb comes i "i" final: ["a", "b", "c"] -> "a, b i c" */
export function uneix(elements) {
  if (elements.length <= 1) return elements.join('')
  return `${elements.slice(0, -1).join(', ')} i ${elements[elements.length - 1]}`
}

/**
 * Descompon una llista de mesos en intervals consecutius (el desembre enllaça
 * amb el gener): [11, 12, 1] -> [{ inici: 11, longitud: 3 }].
 * Si hi són els 12 mesos, retorna un sol interval de 12 que comença a l'1.
 */
export function intervals(mesos) {
  const conjunt = new Set(mesos)
  if (conjunt.size === 12) return [{ inici: 1, longitud: 12 }]

  const anterior = (m) => (m === 1 ? 12 : m - 1)
  const seguent = (m) => (m === 12 ? 1 : m + 1)

  return [...conjunt]
    .filter((m) => !conjunt.has(anterior(m)))
    .sort((a, b) => a - b)
    .map((inici) => {
      let longitud = 1
      let m = inici
      while (conjunt.has(seguent(m))) {
        m = seguent(m)
        longitud += 1
      }
      return { inici, longitud }
    })
}

/** Últim mes d'un interval: { inici: 11, longitud: 3 } -> 1 */
const fi = ({ inici, longitud }) => ((inici - 1 + longitud - 1) % 12) + 1

/**
 * Interval de mesos escrit en català, per a la llegenda:
 * [9, 10] -> "setembre i octubre"; [11, 12, 1] -> "de novembre a gener";
 * [3] -> "març"; tots els mesos -> "tot l'any".
 * Si els mesos no són consecutius, els enumera.
 */
export function textMesos(mesos) {
  const trams = intervals(mesos)
  if (trams.length === 1) {
    const t = trams[0]
    if (t.longitud === 12) return "tot l'any"
    if (t.longitud === 1) return nom(t.inici)
    if (t.longitud === 2) return `${nom(t.inici)} i ${nom(fi(t))}`
    return `${deMes(t.inici)} a ${nom(fi(t))}`
  }
  return uneix(
    trams.flatMap((t) => Array.from({ length: t.longitud }, (_, i) => nom(((t.inici - 1 + i) % 12) + 1)))
  )
}

/**
 * El mateix interval, escrit per a una frase (etiqueta d'accessibilitat):
 * [9, 10] -> "al setembre i l'octubre"; la resta, com textMesos.
 */
export function fraseMesos(mesos) {
  const trams = intervals(mesos)
  if (trams.length === 1) {
    const t = trams[0]
    if (t.longitud === 1) return alMes(t.inici)
    if (t.longitud === 2) return `${alMes(t.inici)} i ${elMes(fi(t))}`
  }
  return textMesos(mesos)
}
