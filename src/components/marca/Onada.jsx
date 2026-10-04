// Ona de separació entre seccions (maqueta inici.html: capçalera de "La carta del
// camp"; maqueta visita.html: peu de la capçalera de la visita).
// - color: farciment de l'ona (el color de la secció veïna)
// - invertida: l'ona puja des de baix (per al peu d'una secció); per defecte
//   penja des de dalt (per a la capçalera d'una secció)
// - altura: alçada en px (per defecte 56, o 48 si és invertida)
// Per superposar-la a una secció usa className/style (p. ex. position: absolute).

const FORMES = {
  normal: {
    viewBox: '0 0 1440 70',
    d: 'M0 0 H1440 V34 C1260 66 1080 18 900 40 C720 62 540 22 360 44 C220 61 100 40 0 52 Z',
    altura: 56,
  },
  invertida: {
    viewBox: '0 0 1440 60',
    d: 'M0 60 V30 C240 0 480 50 720 30 C960 10 1200 46 1440 24 V60 Z',
    altura: 48,
  },
}

export default function Onada({ color, invertida = false, altura, className, style }) {
  const forma = invertida ? FORMES.invertida : FORMES.normal

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={forma.viewBox}
      preserveAspectRatio="none"
      className={className}
      style={{ display: 'block', width: '100%', height: altura ?? forma.altura, ...style }}
    >
      <path d={forma.d} fill={color} />
    </svg>
  )
}
