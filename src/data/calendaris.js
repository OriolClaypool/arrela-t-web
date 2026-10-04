// Calendari de feines de la pàgina de la visita (secció "L'any a la vinya / a
// l'obrador / a l'hort"), per família.
// - lloc: com es diu el lloc de feina (títol de la secció i aria-label)
// - feines: { id, nom, mesos, color, text, punt? }
//   · mesos: números de mes (1 = gener ... 12 = desembre); pot travessar el
//     desembre (p. ex. [12, 1, 2] és de desembre a febrer)
//   · color / text: color de la barra i del text de la barra (el text passa AA)
//   · punt: color de la bolla de la columna d'etiquetes (per defecte, color)
// Un productor pot substituir el calendari de la seva família amb el camp
// `calendari` (una llista de feines amb el mateix format).

// TODO: validar amb el productor durant la visita
const CALENDARIS = {
  vi: {
    lloc: 'la vinya',
    etiqueta: "L'any a la vinya",
    titol: 'Què passa a la vinya, mes a mes',
    feines: [
      { id: 'poda', nom: 'Poda', mesos: [12, 1, 2], color: '#5E5040', text: '#F5F0E4' },
      { id: 'brotada', nom: 'Brotada', mesos: [3, 4], color: '#A3B565', text: '#2A2017' },
      { id: 'floracio', nom: 'Floració', mesos: [5, 6], color: '#E4BE5C', text: '#2A2017' },
      { id: 'maduracio', nom: 'Maduració', mesos: [7, 8], color: '#6E7B2F', text: '#FFFFFF' },
      { id: 'verema', nom: 'Verema', mesos: [9, 10], color: '#6A2A47', text: '#F5F0E4' },
      { id: 'vinificacio', nom: 'Vinificació', mesos: [9, 10, 11], color: '#B5562F', text: '#FFF8EE' },
      {
        id: 'crianca',
        nom: 'Criança',
        mesos: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        color: '#DCD1B9',
        text: '#2A2017',
        punt: '#CDBFA2',
      },
    ],
  },
  // TODO: validar amb el productor durant la visita
  formatge: {
    lloc: "l'obrador",
    etiqueta: "L'any a l'obrador",
    titol: "Què passa a l'obrador, mes a mes",
    feines: [
      { id: 'parts', nom: 'Parts i cabrits', mesos: [1, 2, 3], color: '#B5562F', text: '#FFF8EE' },
      { id: 'pastura', nom: 'Pastura', mesos: [4, 5, 6, 7, 8, 9, 10], color: '#6E7B2F', text: '#FFFFFF' },
      { id: 'llet', nom: 'Llet de temporada', mesos: [3, 4, 5, 6], color: '#E4BE5C', text: '#2A2017' },
      { id: 'fresc', nom: 'Formatge fresc', mesos: [3, 4, 5, 6], color: '#8A6416', text: '#F5F0E4' },
      {
        id: 'curacio',
        nom: 'Curació',
        mesos: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        color: '#DCD1B9',
        text: '#2A2017',
        punt: '#CDBFA2',
      },
    ],
  },
  // TODO: validar amb el productor durant la visita
  horta: {
    lloc: "l'hort",
    etiqueta: "L'any a l'hort",
    titol: "Què passa a l'hort, mes a mes",
    feines: [
      { id: 'sembra', nom: 'Sembra i planter', mesos: [1, 2, 3, 4], color: '#8A6416', text: '#F5F0E4' },
      { id: 'primavera', nom: 'Collita de primavera', mesos: [4, 5, 6], color: '#A3B565', text: '#2A2017' },
      { id: 'estiu', nom: "Collita d'estiu", mesos: [6, 7, 8, 9], color: '#E4BE5C', text: '#2A2017' },
      { id: 'tardor', nom: 'Collita de tardor', mesos: [9, 10, 11], color: '#B5562F', text: '#FFF8EE' },
      { id: 'llegums', nom: 'Llegums i cereals', mesos: [6, 7], color: '#6E7B2F', text: '#FFFFFF' },
    ],
  },
}

/** Calendari d'un productor: el seu `calendari` si en té, o la plantilla de la família. */
export function getCalendari(productor) {
  const plantilla = CALENDARIS[productor.familia]
  if (!plantilla) return null
  const propi = Array.isArray(productor.calendari) && productor.calendari.length > 0
  return propi ? { ...plantilla, feines: productor.calendari } : plantilla
}

export default CALENDARIS
