import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Footer from '../components/Footer'
import Segell from '../components/marca/Segell'
import IconaPas from '../components/marca/IconaPas'
import IconaCheck from '../components/marca/IconaCheck'
import Fletxa from '../components/marca/Fletxa'
import useFadeIn from '../hooks/useFadeIn'
import productors from '../data/productors'
import passos from '../data/segell'

// Pàgina /segell: què vol dir "verificat" a Arrela't, el mètode en 4 passos,
// què és i què no és el segell i tots els segells emesos (un per productor publicat).

const emesos = productors
  .filter((p) => p.publicat && p.numeroVisita != null)
  .sort((a, b) => a.numeroVisita - b.numeroVisita)

const ES = [
  'El compromís de dues persones que hi han anat en persona.',
  "Una visita numerada i amb data, segons l'ordre en què es van gravar les entrevistes.",
  'Els vídeos de la visita, com a prova que hi hem estat.',
]

const NO_ES = [
  'No és una certificació oficial.',
  'No és un distintiu de qualitat.',
  'Els productors no paguen mai per tenir-lo.',
]

const IconaCreu = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false" style={{ flex: '0 0 auto' }}>
    <circle cx="12" cy="12" r="10" fill="#8F3F1F" />
    <path d="M8.5 8.5 L15.5 15.5 M15.5 8.5 L8.5 15.5" fill="none" stroke="#F6E2D3" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
)

export default function SegellPagina() {
  const refMetode = useFadeIn()
  const refQueEs = useFadeIn()
  const refEmesos = useFadeIn()
  const primer = emesos[0]

  return (
    <>
      <Seo
        title="El segell Arrela't — Verificat vol dir que hi hem estat"
        description="El segell Arrela't no és una certificació oficial: és el compromís de dues persones que han visitat cada productor en persona. Cada segell porta un número, la data de la visita i els vídeos que ho demostren."
        path="/segell"
      />

      <main className="portada">
        <section className="segell-hero" aria-labelledby="segell-hero-titol">
          <div className="segell-hero__inner contenidor">
            <div className="segell-hero__segell">
              <Segell
                numero={primer?.numeroVisita ?? 1}
                nom={primer?.nom}
                mida={340}
                style={{ width: '100%', maxWidth: 340, height: 'auto' }}
              />
            </div>
            <div className="segell-hero__text">
              <p className="seccio-etiqueta">El segell Arrela&apos;t</p>
              <h1 id="segell-hero-titol" className="seccio-titol seccio-titol--gran">
                Verificat vol dir que hi hem estat
              </h1>
              <p className="seccio-intro seccio-intro--ample">
                Cada productor que surt a Arrela&apos;t ha rebut la visita de dues persones. Quan
                hi som, ho filmem i li posem un número: aquest és el segell.
              </p>
            </div>
          </div>
        </section>

        <section className="segell-metode" aria-labelledby="segell-metode-titol">
          <div ref={refMetode} className="segell-metode__inner contenidor fade-in">
            <p className="seccio-etiqueta">El mètode</p>
            <h2 id="segell-metode-titol" className="seccio-titol">
              Quatre passos, cada vegada
            </h2>
            <ol className="segell-metode__passos" role="list">
              {passos.map((pas, i) => (
                <li key={pas.id} className="targeta segell-metode__pas">
                  <span
                    className={`segell-pas__icona${pas.id === 'segellem' ? ' segell-pas__icona--terracota' : ''}`}
                    aria-hidden="true"
                  >
                    <IconaPas pas={pas.id} />
                  </span>
                  <span className="segell-pas__numero">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="segell-metode__nom">{pas.nom}</h3>
                  <p className="segell-metode__detall">{pas.detall}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="segell-quees" aria-labelledby="segell-quees-titol">
          <div ref={refQueEs} className="segell-quees__inner contenidor fade-in">
            <p className="seccio-etiqueta">Sense lletra petita</p>
            <h2 id="segell-quees-titol" className="seccio-titol">
              Què és i què no és
            </h2>
            <div className="segell-quees__columnes">
              <div className="segell-quees__bloc">
                <h3 className="segell-quees__subtitol">El que és</h3>
                <ul role="list">
                  {ES.map((text) => (
                    <li key={text}>
                      <IconaCheck fons="#1F4A34" check="#F5F0E4" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="segell-quees__bloc segell-quees__bloc--no">
                <h3 className="segell-quees__subtitol">El que no és</h3>
                <ul role="list">
                  {NO_ES.map((text) => (
                    <li key={text}>
                      <IconaCreu />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="segell-emesos" aria-labelledby="segell-emesos-titol">
          <div ref={refEmesos} className="segell-emesos__inner contenidor fade-in">
            <div className="seccio-capcalera">
              <div className="seccio-capcalera__titols">
                <p className="seccio-etiqueta">Els segells emesos</p>
                <h2 id="segell-emesos-titol" className="seccio-titol">
                  Un segell per cada visita
                </h2>
              </div>
              <Link to="/entrevistes" className="enllac-fletxa">
                Totes les visites
                <Fletxa />
              </Link>
            </div>

            {emesos.length > 0 ? (
              <ul className="segell-emesos__llista" role="list">
                {emesos.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/productors/${p.slug}`} className="targeta lift segell-emes">
                      <span aria-hidden="true">
                        <Segell numero={p.numeroVisita} mida={96} />
                      </span>
                      <span className="segell-emes__text">
                        <span className="segell-emes__nom">{p.nom}</span>
                        {p.comarca && <span className="segell-emes__detall">{p.comarca}</span>}
                        {p.reportatge?.dataVisita && (
                          <span className="segell-emes__detall">
                            Visita: {p.reportatge.dataVisita.toLowerCase()}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="seccio-intro">Aviat publicarem els primers segells.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
