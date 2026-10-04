// Marca de verificació rodona (maqueta inici.html: punts de la portada i de les
// targetes de l'espai professional).
// - fons: color del cercle
// - check: color de la marca
// - mida: costat en px (per defecte 20)

export default function IconaCheck({ fons = '#1F4A34', check = '#F5F0E4', mida = 20, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={mida}
      height={mida}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ flex: '0 0 auto' }}
    >
      <circle cx="12" cy="12" r="10" fill={fons} />
      <path
        d="M7.5 12.5 L10.5 15.5 L16.5 9"
        fill="none"
        stroke={check}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
