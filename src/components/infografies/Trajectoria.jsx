import TargetaFitxa from './TargetaFitxa'
import { minuscula } from '../../utils/format'

// Infografia "trajectòria": una línia del temps amb un punt per any, des de `anyInici`
// fins a l'any actual (l'últim punt, terracota). Valor gran: "{n} anys"; text petit:
// "fent {categoria} des del {anyInici}". Sense `anyInici` vàlid, la targeta no es mostra.

const X0 = 14
const X1 = 206
const FONT = "'Instrument Sans Variable', 'Instrument Sans', sans-serif"

export default function Trajectoria({ productor, familia }) {
  const anyActual = new Date().getFullYear()
  const inici = productor.anyInici
  const anys = anyActual - inici
  if (!Number.isInteger(inici) || anys < 1) return null

  const pas = (X1 - X0) / anys
  const radi = Math.max(1.2, Math.min(4, pas * 0.32))
  const punts = Array.from({ length: anys }, (_, i) => X0 + i * pas)

  const panell = (
    <svg
      viewBox="0 0 220 100"
      role="img"
      aria-label={`Línia del temps de ${inici} a ${anyActual}, un punt per any`}
      className="fitxa-targeta__grafic"
    >
      <line x1={X0} y1="46" x2={X1} y2="46" stroke={familia.colorText} strokeWidth="4" strokeLinecap="round" />
      <g fill={familia.colorText}>
        {punts.map((x, i) => (
          <circle key={x} cx={x} cy="46" r={i === 0 ? Math.min(5, radi + 1) : radi} />
        ))}
      </g>
      <circle cx={X1} cy="46" r="9" fill="#B5562F" stroke="#FFFBF2" strokeWidth="3" />
      <g fontFamily={FONT} fontSize="13" fontWeight="700" fill="#5E5040">
        <text x={X0} y="80">{inici}</text>
        <text x={X1} y="80" textAnchor="end">{anyActual}</text>
      </g>
    </svg>
  )

  const categoria = minuscula(productor.categoria ?? '')

  return (
    <TargetaFitxa
      panell={panell}
      etiqueta="Trajectòria"
      valor={`${anys} ${anys === 1 ? 'any' : 'anys'}`}
      text={categoria ? `fent ${categoria} des del ${inici}` : `des del ${inici}`}
    />
  )
}
