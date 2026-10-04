// Famílies de producte d'Arrela't (font: design/README.md, taula "Product families").
// color:      farciment de la família (icona, pin, targeta, calendari)
// colorPin:   color del pin al mapa (només difereix al formatge)
// colorText:  text sobre fons clars (contrast AA verificat)
// colorSobre: text sobre el farciment de la família

const families = [
  { id: 'vi',        nom: 'Vi',        color: '#6A2A47', colorPin: '#6A2A47', colorText: '#6A2A47', colorSobre: '#F5F0E4' },
  { id: 'formatge',  nom: 'Formatge',  color: '#E4BE5C', colorPin: '#C99A35', colorText: '#8A6416', colorSobre: '#2A2017' },
  { id: 'horta',     nom: 'Horta',     color: '#6E7B2F', colorPin: '#6E7B2F', colorText: '#5A6522', colorSobre: '#FFFFFF' },
  { id: 'fruita',    nom: 'Fruita',    color: '#EE9A63', colorPin: '#EE9A63', colorText: '#9A4A1C', colorSobre: '#2A2017' },
  { id: 'oli',       nom: 'Oli',       color: '#B9C49B', colorPin: '#B9C49B', colorText: '#4E5A1C', colorSobre: '#2A2017' },
  { id: 'ramaderia', nom: 'Ramaderia', color: '#B5562F', colorPin: '#B5562F', colorText: '#8F3F1F', colorSobre: '#FFF8EE' },
  { id: 'mel',       nom: 'Mel',       color: '#C98A26', colorPin: '#C98A26', colorText: '#8E5C10', colorSobre: '#2A2017' },
  { id: 'pesca',     nom: 'Pesca',     color: '#8EB9C4', colorPin: '#8EB9C4', colorText: '#2F5E6E', colorSobre: '#2A2017' },
]

export function getFamilia(id) {
  return families.find((f) => f.id === id)
}

export default families
