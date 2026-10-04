// Fletxa per als botons (maqueta sistema.html): tot el tamany el fixa .btn svg
// (18px). Hereta el color del botó amb currentColor.

export default function Fletxa({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <path
        d="M5 12 H19 M13 6 L19 12 L13 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
