import { useId } from 'react'

// Segell d'Arrela't (design/icones/segell.svg): sempre numerat segons l'ordre
// en què es van gravar les entrevistes.
// - numero: enter (es mostra com a "Nº 001")
// - nom: opcional, es mostra sota el número
// - mida: costat en px

export default function Segell({ numero, nom, mida = 140, className, style }) {
  // useId() retorna ids amb ":" i aquí cal un id vàlid dins d'un href de SVG;
  // així poden conviure diversos segells a la mateixa pàgina.
  const arcId = `segell-arc-${useId().replace(/:/g, '')}`
  const codi = String(numero).padStart(3, '0')
  const nomMida = nom && nom.length > 16 ? 11 : 13

  return (
    <svg
      viewBox="0 0 300 300"
      width={mida}
      height={mida}
      role="img"
      aria-label={`Segell Arrela't número ${codi}`}
      className={className}
      style={{ display: 'block', flex: '0 0 auto', ...style }}
    >
      <circle cx="150" cy="150" r="142" fill="#1F4A34" />
      <circle
        cx="150"
        cy="150"
        r="129"
        fill="none"
        stroke="#E4BE5C"
        strokeWidth="2.5"
        strokeDasharray="0.1 8"
        strokeLinecap="round"
      />
      <path
        id={arcId}
        d="M150 150 m-104 0 a104 104 0 1 1 208 0 a104 104 0 1 1 -208 0"
        fill="none"
      />
      <text
        fontFamily="'Instrument Sans Variable', 'Instrument Sans', sans-serif"
        fontSize="16"
        fontWeight="700"
        letterSpacing="4.5"
        fill="#F5F0E4"
      >
        <textPath href={`#${arcId}`}>{"PRODUCTOR VISITAT · ARRELA'T · TERRITORI · "}</textPath>
      </text>
      <circle cx="150" cy="150" r="80" fill="#F5F0E4" />
      <g transform="translate(120 88) scale(1.5)">
        <path d="M20 15 C14 15 9 11 8 5 C14 5 19 9 20 15 Z" fill="#6E7B2F" />
        <path d="M20 12 C26 12 31 8 32 3 C26 3 21 6 20 12 Z" fill="#1F4A34" />
        <path d="M20 22 V12" fill="none" stroke="#1F4A34" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M7 22 H33" fill="none" stroke="#1F4A34" strokeWidth="2.4" strokeLinecap="round" />
        <path
          d="M20 22 C20 28 16 30 12 35 M20 22 C20 29 21 32 20 37 M20 22 C21 28 25 30 29 34"
          fill="none"
          stroke="#B5562F"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
      <text
        x="150"
        y="182"
        textAnchor="middle"
        fontFamily="'Fraunces Variable', Fraunces, serif"
        fontSize="30"
        fontWeight="700"
        fill="#1F4A34"
        style={{ fontVariationSettings: "'SOFT' 100" }}
      >
        {`Nº ${codi}`}
      </text>
      {nom && (
        <text
          x="150"
          y="204"
          textAnchor="middle"
          fontFamily="'Instrument Sans Variable', 'Instrument Sans', sans-serif"
          fontSize={nomMida}
          fontWeight="600"
          fill="#8F3F1F"
        >
          {nom}
        </text>
      )}
    </svg>
  )
}
