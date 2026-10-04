// Calendari de temporada de la portada (roda de l'any, secció "Temporada").
// - mesos: números de mes (1 = gener ... 12 = desembre); pot travessar el desembre
//   (p. ex. [11, 12, 1] és de novembre a gener).
// - color: color de l'arc a la roda i de la barra de la llegenda.
// - familia: id de la família (families.js); el botó del destacat porta a
//   /productors?familia={familia}.
// - accio: text opcional del botó del destacat quan aquesta temporada és activa.

const temporada = [
  { id: 'verema', nom: 'Verema', mesos: [9, 10], color: '#6A2A47', familia: 'vi', accio: 'Qui verema ara' },
  { id: 'oli-nou', nom: 'Oli nou', mesos: [11, 12, 1], color: '#B7962A', familia: 'oli' },
  { id: 'formatge-fresc', nom: 'Formatge fresc', mesos: [3, 4, 5, 6], color: '#E0AC45', familia: 'formatge' },
  { id: 'horta-estiu', nom: "Horta d'estiu", mesos: [6, 7, 8, 9], color: '#6E7B2F', familia: 'horta' },
  { id: 'fruita-dolca', nom: 'Fruita dolça', mesos: [5, 6, 7, 8], color: '#EE9A63', familia: 'fruita' },
]

export default temporada
