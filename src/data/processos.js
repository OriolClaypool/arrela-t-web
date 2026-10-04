// Passos del procés de la pàgina de la visita (secció "El procés"), per família.
// Cada pas: { id, nom, text }. La icona de cada pas és a
// components/illustracions/IconaProces.jsx (clau: família + id del pas).
// Els textos descriuen el procés en general, sense dades d'un productor concret.

// TODO: validar amb el productor durant la visita
const PROCESSOS = {
  vi: {
    titol: "De la vinya a l'ampolla",
    passos: [
      { id: 'vinya', nom: 'Vinya', text: "Els ceps es cuiden tot l'any, de la poda a la brotada." },
      { id: 'verema', nom: 'Verema', text: 'El raïm es cull quan és al seu punt.' },
      { id: 'premsa', nom: 'Premsa', text: 'Es prem el raïm i en surt el most.' },
      { id: 'fermentacio', nom: 'Fermentació', text: 'El most es transforma en vi, a poc a poc.' },
      { id: 'ampolla', nom: 'Ampolla', text: 'Repòs, ampolla i cap a la taula.' },
    ],
  },
  formatge: {
    titol: 'De la pastura al formatge',
    passos: [
      { id: 'pastura', nom: 'Pastura', text: "Tot comença amb l'alimentació de les cabres a la pastura." },
      { id: 'munyida', nom: 'Munyida', text: 'La llet es recull a la mateixa explotació.' },
      { id: 'quallada', nom: 'Quallada', text: 'La llet quallada es converteix en la pasta del formatge.' },
      { id: 'emmotllat', nom: 'Emmotllat', text: 'La quallada es posa als motlles perquè agafi forma.' },
      { id: 'maduracio', nom: 'Maduració', text: 'El formatge reposa al celler fins que és al seu punt.' },
    ],
  },
  horta: {
    titol: 'De la llavor a la cistella',
    passos: [
      { id: 'llavor', nom: 'Llavor', text: 'Tot comença amb una bona llavor.' },
      { id: 'planter', nom: 'Planter', text: "La llavor germina i es fa planter abans de sortir a l'hort." },
      { id: 'cultiu', nom: 'Cultiu', text: "La terra, l'aigua i el temps fan créixer les plantes." },
      { id: 'collita', nom: 'Collita', text: 'Es cull quan cada producte és al seu punt.' },
      { id: 'cistella', nom: 'Cistella', text: "De l'hort a la cistella i cap a la taula." },
    ],
  },
}

export default PROCESSOS
