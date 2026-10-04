import { useState } from 'react'
import { Link } from 'react-router-dom'
import useFadeIn from '../hooks/useFadeIn'
import temporada from '../data/temporada'
import { getFamilia } from '../data/families'
import { alMes, textMesos, uneix } from '../utils/mesos'
import RodaAny from './RodaAny'
import Fletxa from './marca/Fletxa'

// Secció "Temporada" de la portada: la roda de l'any, la llegenda amb els
// intervals de cada temporada i, si n'hi ha d'activa aquest mes, un destacat
// que porta als productors de la família de la primera temporada activa.

/** Luminància relativa i contrast WCAG entre dos colors #RRGGBB */
function luminancia(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a, b) {
  const [clar, fosc] = [luminancia(a), luminancia(b)].sort((x, y) => y - x)
  return (clar + 0.05) / (fosc + 0.05)
}

/** "de verema", "d'oli nou", "d'horta d'estiu" */
function deNom(nom) {
  const minuscula = nom.charAt(0).toLowerCase() + nom.slice(1)
  return /^[aeiouàèéíòóúh]/i.test(minuscula) ? `d'${minuscula}` : `de ${minuscula}`
}

export default function Temporada() {
  const ref = useFadeIn()
  const [mes] = useState(() => new Date().getMonth() + 1)

  const actives = temporada.filter((t) => t.mesos.includes(mes))
  const principal = actives[0]
  const familia = principal ? getFamilia(principal.familia) : null

  // Colors del destacat: el de la família; el botó, invers (el text del botó
  // pren el color de la família que més contrasta amb el fons del botó).
  let estilDestacat
  if (familia) {
    const fonsBoto = familia.colorSobre
    const textBoto =
      contrast(familia.color, fonsBoto) >= contrast(familia.colorText, fonsBoto)
        ? familia.color
        : familia.colorText
    estilDestacat = {
      '--destacat-fons': familia.color,
      '--destacat-text': familia.colorSobre,
      '--destacat-boto-fons': fonsBoto,
      '--destacat-boto-text': textBoto,
    }
  }

  return (
    <section id="temporada" className="temporada-seccio" aria-labelledby="temporada-titol">
      <div ref={ref} className="temporada-seccio__inner contenidor fade-in">
        <div>
          <p className="seccio-etiqueta">Temporada</p>
          <h2 id="temporada-titol" className="seccio-titol">
            Cada mes, el camp dona una cosa diferent
          </h2>
          <p className="seccio-intro">
            La roda marca el mes en què som i què està en el seu punt. Cada color et porta als
            productors que en fan.
          </p>

          <ul className="temporada-llegenda" role="list">
            {temporada.map((t) => (
              <li key={t.id} className="temporada-llegenda__item">
                <span
                  className="temporada-llegenda__barra"
                  style={{ background: t.color }}
                  aria-hidden="true"
                />
                <span className="temporada-llegenda__nom">{t.nom}</span>
                <span className="temporada-llegenda__mesos">{textMesos(t.mesos)}</span>
              </li>
            ))}
          </ul>

          {principal && (
            <div className="temporada-destacat" style={estilDestacat}>
              <p className="temporada-destacat__text">
                <strong>Ara, {alMes(mes)}:</strong>{' '}
                temps {uneix(actives.map((t) => deNom(t.nom)))}.
              </p>
              <Link
                to={`/productors?familia=${principal.familia}`}
                className="temporada-destacat__boto"
              >
                {principal.accio ?? 'Veure els productors'}
                <Fletxa />
              </Link>
            </div>
          )}
        </div>

        <div>
          <RodaAny temporades={temporada} mes={mes} />
        </div>
      </div>
    </section>
  )
}
