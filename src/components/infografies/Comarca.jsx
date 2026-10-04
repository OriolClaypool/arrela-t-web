import MiniCatalunya from './MiniCatalunya'
import TargetaFitxa from './TargetaFitxa'
import { posicioPin } from '../../utils/mapaMini'
import { codiVisita } from '../../utils/format'

// Infografia "comarca": la silueta de Catalunya amb el punt de la visita en el color
// de la família. Valor gran: la comarca; text petit: el número de visita al mapa.
// Si falta la comarca o les coordenades, la targeta no es mostra.

export default function Comarca({ productor, familia }) {
  const pin = posicioPin(productor.coordenades)
  if (!productor.comarca || !pin) return null

  const panell = (
    <MiniCatalunya
      titol={`Mapa de Catalunya amb la comarca ${productor.comarca} assenyalada`}
      className="fitxa-targeta__mapa"
    >
      <circle cx={pin.x} cy={pin.y} r="10" fill={familia.colorPin} opacity="0.22" />
      <circle cx={pin.x} cy={pin.y} r="4.8" fill={familia.colorPin} />
    </MiniCatalunya>
  )

  return (
    <TargetaFitxa
      panell={panell}
      etiqueta="Comarca"
      valor={productor.comarca}
      text={productor.numeroVisita != null ? `Visita nº ${codiVisita(productor.numeroVisita)} del mapa` : null}
    />
  )
}
