// Logotip d'Arrela't: la marca (brot + arrels, design/icones/logo-arrel.svg)
// seguida del nom en Fraunces 650.
// - invers: per a fons foscos (colors del peu de la maqueta inici.html)
// - mida: costat de la marca en px (el nom s'escala amb ella)
// - nom: false per mostrar només la marca

const COLORS = {
  normal: { fulla: '#6E7B2F', tija: '#1F4A34', fulla2: '#1F4A34', arrels: '#B5562F', text: '#1F4A34' },
  invers: { fulla: '#A3B565', tija: '#F5F0E4', fulla2: '#F5F0E4', arrels: '#EE9A63', text: '#F5F0E4' },
}

export default function Logo({ invers = false, mida = 38, nom = true, className = '' }) {
  const c = invers ? COLORS.invers : COLORS.normal

  return (
    <span
      className={`logo${className ? ` ${className}` : ''}`}
      style={{ color: c.text, gap: Math.round(mida * 0.26) }}
    >
      <svg viewBox="0 0 40 40" width={mida} height={mida} aria-hidden="true" focusable="false">
        <path d="M20 15 C14 15 9 11 8 5 C14 5 19 9 20 15 Z" fill={c.fulla} />
        <path d="M20 12 C26 12 31 8 32 3 C26 3 21 6 20 12 Z" fill={c.fulla2} />
        <path d="M20 22 V12" fill="none" stroke={c.tija} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M7 22 H33" fill="none" stroke={c.tija} strokeWidth="2.4" strokeLinecap="round" />
        <path
          d="M20 22 C20 28 16 30 12 35 M20 22 C20 29 21 32 20 37 M20 22 C21 28 25 30 29 34"
          fill="none"
          stroke={c.arrels}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      {nom && (
        <span className="logo__nom" style={{ fontSize: Math.round(mida * 0.71) }}>
          Arrela&apos;t
        </span>
      )}
    </span>
  )
}
