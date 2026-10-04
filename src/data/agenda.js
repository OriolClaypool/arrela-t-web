// Esdeveniments de /agenda.
// - data: 'AAAA-MM-DD' (la targeta en treu el dia i el mes)
// - lloc: opcional
// - url: opcional; sense url (o amb '#') la targeta no mostra cap enllaç
const agenda = [
  {
    id: 1,
    data: '2026-06-14',
    lloc: 'Vic',
    titol: 'Mercat de productors a Vic',
    descripcio: 'Trobada de productors locals al mercat de Vic. Degustació de productes i presentació de nous projectes del territori.',
    cta: 'Més informació',
    url: '#',
  },
  {
    id: 2,
    data: '2026-07-05',
    lloc: "Soler de n'Hug, Berguedà",
    titol: "Visita guiada a Soler de n'Hug",
    descripcio: "Jornada de portes obertes a l'explotació familiar del Berguedà. Conèixer de primera mà com treballen i els seus productes.",
    cta: 'Reserva el teu lloc',
    url: '#',
  },
]

export default agenda
