// Targeta de la fitxa "en un cop d'ull" (maqueta visita.html, secció "La fitxa"):
// un panell il·lustrat, l'etiqueta del tipus, el valor gran en Fraunces i el text petit.
// - panell: l'SVG de la infografia (cada tipus el dibuixa i el descriu)
// - etiqueta: "Comarca", "Trajectòria", "Superfície", "Producció"
// - valor / text: la xifra gran i la línia que l'explica

export default function TargetaFitxa({ panell, etiqueta, valor, text }) {
  return (
    <li className="fitxa-targeta targeta">
      <div className="fitxa-targeta__panell">{panell}</div>
      <p className="fitxa-targeta__etiqueta">{etiqueta}</p>
      <p className="fitxa-targeta__valor">{valor}</p>
      {text && <p className="fitxa-targeta__text">{text}</p>}
    </li>
  )
}
