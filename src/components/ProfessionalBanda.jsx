import { Link } from 'react-router-dom'
import useFadeIn from '../hooks/useFadeIn'
import ArcsConcentrics from './illustracions/ArcsConcentrics'
import IlustracioBotiga from './illustracions/IlustracioBotiga'
import IlustracioCaixa from './illustracions/IlustracioCaixa'
import Fletxa from './marca/Fletxa'
import IconaCheck from './marca/IconaCheck'

// Banda verda "Espai professional" de la portada (maqueta inici.html): arcs
// concèntrics de fons i dues targetes (botigues/restaurants i productors).

const TARGETES = [
  {
    id: 'proveidor',
    Il: IlustracioBotiga,
    titol: 'Tens botiga o restaurant?',
    text: "Explica'ns què busques i et proposem productors visitats per nosaltres que reparteixen a la teva zona.",
    punts: [
      'Fitxa comercial de cada productor',
      'Zones de repartiment i comanda mínima',
      'Calendari de disponibilitat per producte',
      'Contacte directe amb el productor',
    ],
    boto: 'Busco proveïdor',
    to: '/professional#proveidor',
    classeBoto: 'btn btn--terracota lift',
    colorCheck: { fons: '#1F4A34', check: '#F5F0E4' },
  },
  {
    id: 'distribucio',
    Il: IlustracioCaixa,
    titol: 'Ets productor?',
    text: "Explica'ns què fas i on vols arribar. Quan una botiga busqui el que tu fas, et presentarem.",
    punts: [
      'Preparem la teva fitxa durant la visita',
      'Et presentem botigues que busquen el que fas',
      'Sense cap cost: els productors no paguen mai',
    ],
    boto: 'Busco on vendre',
    to: '/professional#distribucio',
    classeBoto: 'btn btn--bosc lift',
    colorCheck: { fons: '#2A2017', check: '#E4BE5C' },
  },
]

export default function ProfessionalBanda() {
  const ref = useFadeIn()

  return (
    <section id="professional" className="pro-banda" aria-labelledby="pro-titol">
      <ArcsConcentrics className="pro-banda__arcs" />

      <div ref={ref} className="pro-banda__inner contenidor fade-in">
        <div className="pro-banda__intro">
          <p className="seccio-etiqueta seccio-etiqueta--clara">Espai professional</p>
          <h2 id="pro-titol" className="seccio-titol seccio-titol--clar seccio-titol--gran">
            El punt de trobada entre el camp i el comerç
          </h2>
          <p className="pro-banda__text">
            No som un mercat en línia. Som dues persones que coneixen cada productor i fan de pont,
            a mà, entre qui produeix i qui ven o cuina.
          </p>
        </div>

        <div className="pro-banda__targetes">
          {TARGETES.map((targeta) => {
            const { id, titol, text, punts, boto, to, classeBoto, colorCheck } = targeta
            const Il = targeta.Il
            return (
              <article key={id} className={`pro-targeta pro-targeta--${id}`}>
                <Il className="pro-targeta__il" />
                <h3 className="pro-targeta__titol">{titol}</h3>
                <p className="pro-targeta__text">{text}</p>
                <ul className="pro-targeta__punts" role="list">
                  {punts.map((punt) => (
                    <li key={punt}>
                      <IconaCheck fons={colorCheck.fons} check={colorCheck.check} />
                      {punt}
                    </li>
                  ))}
                </ul>
                <Link to={to} className={`${classeBoto} pro-targeta__boto`}>
                  {boto}
                  <Fletxa />
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
