import { mescla } from '../utils/color'

// Colors de text i de fons de la pàgina de la visita que es deriven del color de
// la família i que no són a families.js. Tots passen WCAG AA (4,5:1) sobre el
// farciment de la família (comprovat amb utils/color.js):
// - accent:    text petit destacat sobre el farciment (línia de meta, signe de cometes)
// - secundari: text de lectura sobre el farciment (entradeta de l'hero)
// - enllac:    enllaç "Totes les visites" sobre el farciment
// - panell:    fons del panell de la il·lustració de l'hero (una mica diferent del farciment)
// Vi: els colors de la maqueta visita.html. Horta: sobre #6E7B2F només passa el
// blanc (4,63:1), així que tots tres són blancs i la jerarquia la dóna el pes i
// el versaleta. Formatge: text fosc sobre el blat.

const EXPLICITES = {
  vi: { accent: '#F3B48A', secundari: '#E7CFDB', enllac: '#F3D8E4', panell: '#7A3354' },
  horta: { accent: '#FFFFFF', secundari: '#FFFFFF', enllac: '#FFFFFF', panell: '#7C8A3A' },
  formatge: { accent: '#4A3410', secundari: '#3A2A0E', enllac: '#2A2017', panell: '#EFD28A' },
}

/** Paleta de la visita per a una família (de families.js). Les famílies sense
 * valors propis usen el color de text sobre el farciment, que sempre passa AA. */
export function paletaVisita(familia) {
  const propia = EXPLICITES[familia.id]
  if (propia) return propia
  return {
    accent: familia.colorSobre,
    secundari: familia.colorSobre,
    enllac: familia.colorSobre,
    panell: mescla(familia.color, familia.colorSobre, 0.14),
  }
}
