import { useState } from 'react'
import useFadeIn from '../hooks/useFadeIn'
import { getCalendari } from '../data/calendaris'
import { fraseMesos, intervals, nomMes, uneix } from '../utils/mesos'

// Secció "L'any a la vinya / a l'obrador / a l'hort" de la visita (maqueta visita.html):
// una graella de 12 mesos amb una barra per feina, la columna del mes actual ressaltada
// i un xip "Ara: {mes}, {feines actives}". Les feines venen de src/data/calendaris.js
// (plantilla per família, substituïble amb el camp `calendari` del productor).
// En pantalla estreta la graella fa scroll horitzontal dins la seva caixa.

const ABREVIATURES = ['gen', 'febr', 'març', 'abr', 'maig', 'juny', 'jul', 'ag', 'set', 'oct', 'nov', 'des']
const capital = (text) => text.charAt(0).toUpperCase() + text.slice(1)

/** Intervals d'una feina com a barres: un interval que travessa el desembre es parteix en dos. */
function barres(mesos) {
  return intervals(mesos).flatMap(({ inici, longitud }) => {
    const finsDesembre = 12 - inici + 1
    return longitud > finsDesembre
      ? [
          { inici, longitud: finsDesembre },
          { inici: 1, longitud: longitud - finsDesembre },
        ]
      : [{ inici, longitud }]
  })
}

function etiquetaBarra({ inici, longitud }) {
  if (longitud >= 12) return "tot l'any"
  if (longitud === 1) return ABREVIATURES[inici - 1]
  return `${ABREVIATURES[inici - 1]}–${ABREVIATURES[inici + longitud - 2]}`
}

export default function CalendariFeines({ productor }) {
  const ref = useFadeIn()
  const [mes] = useState(() => new Date().getMonth() + 1)
  const calendari = getCalendari(productor)
  if (!calendari || calendari.feines.length === 0) return null

  const { feines } = calendari
  const actives = feines.filter((f) => f.mesos.includes(mes))
  // El xip anomena les feines d'aquest mes; les de tot l'any només si no n'hi ha cap altra
  const peAny = (f) => new Set(f.mesos).size === 12
  const destacades = actives.filter((f) => !peAny(f))
  const nomsActius = (destacades.length > 0 ? destacades : actives).map((f) => f.nom.toLowerCase())

  const descripcio = feines
    .map((f) => `${f.nom.toLowerCase()} ${fraseMesos(f.mesos)}`)
    .join(', ')
  const ariaLabel = `Calendari de ${calendari.lloc}: ${descripcio}. Ara és ${nomMes(mes)}.`

  return (
    <section className="visita-any" aria-labelledby="any-titol">
      <div ref={ref} className="visita-any__inner contenidor fade-in">
        <div className="seccio-capcalera">
          <div className="seccio-capcalera__titols">
            <p className="seccio-etiqueta">{calendari.etiqueta}</p>
            <h2 id="any-titol" className="seccio-titol">{calendari.titol}</h2>
            <p className="seccio-intro">
              Cada productor té el seu calendari. La columna marcada és el mes en què som.
            </p>
          </div>
          <p className="visita-any__xip">
            <span className="visita-any__xip-punt" aria-hidden="true" />
            Ara: {nomMes(mes)}{nomsActius.length > 0 && `, ${uneix(nomsActius)}`}
          </p>
        </div>

        <div className="visita-any__caixa" tabIndex={0} role="region" aria-label="Calendari de feines, desplaçable en horitzontal">
          <div className="visita-any__graella" role="img" aria-label={ariaLabel}>
            <div
              className="visita-any__avui"
              aria-hidden="true"
              style={{ gridColumn: mes + 1, gridRow: `1 / ${feines.length + 2}` }}
            />
            <span className="visita-any__capcal visita-any__capcal--feina" style={{ gridColumn: 1, gridRow: 1 }}>Feina</span>
            {ABREVIATURES.map((abr, i) => (
              <span
                key={abr}
                className={`visita-any__capcal${i + 1 === mes ? ' visita-any__capcal--avui' : ''}`}
                style={{ gridColumn: i + 2, gridRow: 1 }}
              >
                {capital(abr)}
              </span>
            ))}

            {feines.map((feina, fila) => (
              <FilaFeina key={feina.id} feina={feina} fila={fila + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FilaFeina({ feina, fila }) {
  return (
    <>
      <span className="visita-any__feina" style={{ gridColumn: 1, gridRow: fila }}>
        <span className="visita-any__bolla" style={{ background: feina.punt ?? feina.color }} aria-hidden="true" />
        {feina.nom}
      </span>
      {barres(feina.mesos).map((barra) => (
        <span
          key={barra.inici}
          className={`visita-any__barra${barra.longitud === 1 ? ' visita-any__barra--curta' : ''}`}
          style={{
            gridColumn: `${barra.inici + 1} / span ${barra.longitud}`,
            gridRow: fila,
            background: feina.color,
            color: feina.text,
          }}
        >
          {etiquetaBarra(barra)}
        </span>
      ))}
    </>
  )
}
