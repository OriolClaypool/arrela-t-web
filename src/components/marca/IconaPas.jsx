// Icones dels 4 passos del segell (maqueta inici.html, secció "El segell"):
// hi anem, escoltem, filmem, segellem. Traç clar sobre un cercle de color;
// el cercle el posa qui l'usa (.segell-pas__icona).

const ICONES = {
  'hi-anem': (
    <g fill="none" stroke="#F5F0E4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 44 C24 44 12 33 12 25 A12 12 0 0 1 36 25 C36 33 24 44 24 44 Z" />
      <circle cx="24" cy="25" r="4" />
    </g>
  ),
  escoltem: (
    <g fill="none" stroke="#F5F0E4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="7" width="12" height="21" rx="6" />
      <path d="M12 24 C12 31 17 36 24 36 C31 36 36 31 36 24" />
      <path d="M24 36 V42 M18 42 H30" />
    </g>
  ),
  filmem: (
    <g fill="none" stroke="#F5F0E4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="14" width="27" height="20" rx="4" />
      <path d="M32 21 L43 15 V33 L32 27 Z" />
    </g>
  ),
  segellem: (
    <g fill="none" stroke="#F5F0E4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="20" r="12" />
      <path d="M18 30 L15 44 L24 40 L33 44 L30 30" />
      <path d="M19 20 L23 24 L30 16" />
    </g>
  ),
}

export default function IconaPas({ pas, mida = 30 }) {
  const contingut = ICONES[pas]
  if (!contingut) return null

  return (
    <svg viewBox="0 0 48 48" width={mida} height={mida} aria-hidden="true" focusable="false">
      {contingut}
    </svg>
  )
}
