// Pin de mapa en forma de llàgrima (maqueta inici.html, secció "El mapa").
// Renderitza un <g> pensat per anar DINS d'un <svg> pare.
// - color: color de la família (usa colorPin de families.js)
// - numero: opcional, es dibuixa dins d'un cercle clar
// - x, y: posició de la punta del pin dins del SVG pare
// - escala: factor de mida (1 = 26 de ample per 37 d'alt)
// - colorNumero: color de la xifra (per defecte tinta; passa-hi colorText de la família)
// Les altres props (className, style, aria-*...) van al <g>.

export default function Pin({
  color,
  numero,
  x = 0,
  y = 0,
  escala = 1,
  colorNumero = '#2A2017',
  ...resta
}) {
  const teNumero = numero !== undefined && numero !== null && numero !== ''

  return (
    <g transform={`translate(${x} ${y}) scale(${escala})`} {...resta}>
      <path
        d="M0 0 C-6 -9 -13 -15 -13 -24 A13 13 0 1 1 13 -24 C13 -15 6 -9 0 0 Z"
        fill={color}
        stroke="#FFFBF2"
        strokeWidth="2.5"
      />
      <circle cx="0" cy="-24" r={teNumero ? 8.5 : 6} fill="#FFFBF2" />
      {teNumero && (
        <text
          x="0"
          y="-23.5"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="'Instrument Sans Variable', 'Instrument Sans', sans-serif"
          fontSize="11"
          fontWeight="700"
          fill={colorNumero}
        >
          {numero}
        </text>
      )}
    </g>
  )
}
