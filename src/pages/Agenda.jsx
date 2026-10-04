import Seo from '../components/Seo'
import Footer from '../components/Footer'
import CapcaleraPagina from '../components/CapcaleraPagina'
import IlustracioAgenda from '../components/illustracions/IlustracioAgenda'
import IconaInfo from '../components/marca/IconaInfo'
import Fletxa from '../components/marca/Fletxa'
import useFadeIn from '../hooks/useFadeIn'
import agenda from '../data/agenda'
import { NOMS_MESOS } from '../utils/mesos'

// /agenda — esdeveniments com a targetes amb un bloc de data terracota (dia gran en
// Fraunces, mes petit). Sense esdeveniments: il·lustració i enllaç a Instagram.

const INSTAGRAM = 'https://instagram.com/arrela_t_'

/** 'AAAA-MM-DD' -> { dia, mes, any, passat } (sense passar pel fus horari) */
function dadesData(text) {
  const [any, mes, dia] = text.split('-').map(Number)
  const avui = new Date()
  const iniciAvui = new Date(avui.getFullYear(), avui.getMonth(), avui.getDate())
  return { dia, mes: NOMS_MESOS[mes - 1], any, passat: new Date(any, mes - 1, dia) < iniciAvui }
}

const esdeveniments = [...agenda].sort((a, b) => a.data.localeCompare(b.data))

export default function Agenda() {
  const ref = useFadeIn(0.05)

  return (
    <>
      <Seo
        title="Agenda — Arrela't"
        description="Esdeveniments, visites i activitats relacionades amb Arrela't i els productors del sector primari català."
        path="/agenda"
      />

      <main className="portada">
        <CapcaleraPagina
          id="agenda-titol"
          etiqueta="Agenda"
          titol="Què passa al territori"
          intro="Esdeveniments, visites i activitats relacionades amb Arrela't i els seus productors."
        />

        <section className="pagina-cos pagina-cos--fosc" aria-label="Esdeveniments">
          <div ref={ref} className="pagina-cos__inner contenidor fade-in">
            {esdeveniments.length === 0 ? (
              <div className="agenda-buit">
                <IlustracioAgenda className="agenda-buit__il" />
                <h2 className="agenda-buit__titol">Aviat tindrem novetats</h2>
                <p className="agenda-buit__text">
                  Mentrestant, t&apos;anirem explicant què fem a Instagram.
                </p>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--terracota lift"
                >
                  Segueix-nos a Instagram
                  <Fletxa />
                  <span className="sr-only"> (s&apos;obre en una pestanya nova)</span>
                </a>
              </div>
            ) : (
              <ul className="agenda-llista" role="list">
                {esdeveniments.map((esdeveniment) => {
                  const { dia, mes, any, passat } = dadesData(esdeveniment.data)
                  const teEnllac = esdeveniment.url && esdeveniment.url !== '#'
                  return (
                    <li key={esdeveniment.id}>
                      <article className="targeta agenda-targeta">
                        <time className="agenda-data" dateTime={esdeveniment.data}>
                          <span className="agenda-data__dia">{dia}</span>
                          <span className="agenda-data__mes">{mes}</span>
                          <span className="agenda-data__any">{any}</span>
                        </time>
                        <div className="agenda-targeta__cos">
                          {passat && <span className="etiqueta agenda-targeta__passat">Ja celebrat</span>}
                          <h2 className="agenda-targeta__titol">{esdeveniment.titol}</h2>
                          {esdeveniment.lloc && (
                            <p className="agenda-targeta__lloc">
                              <IconaInfo tipus="pin" mida={20} />
                              {esdeveniment.lloc}
                            </p>
                          )}
                          <p className="agenda-targeta__text">{esdeveniment.descripcio}</p>
                          {teEnllac && !passat && (
                            <a href={esdeveniment.url} className="enllac-fletxa">
                              {esdeveniment.cta}
                              <Fletxa />
                            </a>
                          )}
                        </div>
                      </article>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
