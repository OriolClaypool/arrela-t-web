// Arcs concèntrics del fons de la banda "Espai professional" (maqueta inici.html).
// Es reutilitza a la capçalera de /professional.
// Va en una capa absoluta a la dreta de la secció; el pare ha de tenir position: relative.

export default function ArcsConcentrics({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 700 700"
      preserveAspectRatio="xMaxYMin slice"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="#2B5B41" strokeWidth="2">
        <path d="M620 0 A80 80 0 0 0 700 80" />
        <path d="M560 0 A140 140 0 0 0 700 140" />
        <path d="M500 0 A200 200 0 0 0 700 200" />
        <path d="M440 0 A260 260 0 0 0 700 260" />
        <path d="M380 0 A320 320 0 0 0 700 320" />
        <path d="M320 0 A380 380 0 0 0 700 380" />
        <path d="M260 0 A440 440 0 0 0 700 440" />
        <path d="M200 0 A500 500 0 0 0 700 500" />
        <path d="M140 0 A560 560 0 0 0 700 560" />
      </g>
    </svg>
  )
}
