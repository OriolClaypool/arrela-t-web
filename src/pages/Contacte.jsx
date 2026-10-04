import Seo from '../components/Seo'
import Footer from '../components/Footer'
import Formulari from '../components/formulari/Formulari'
import IconaCheck from '../components/marca/IconaCheck'
import Fletxa from '../components/marca/Fletxa'
import IlustracioSobre from '../components/illustracions/IlustracioSobre'
import useFadeIn from '../hooks/useFadeIn'

// /contacte — dues columnes: introducció i canals a l'esquerra, formulari a la dreta.
// Mateix patró de confirmació que els formularis de /professional.

const INSTAGRAM = 'https://instagram.com/arrela_t_'

const MOTIUS = [
  'Ets productor o productora i vols que et visitem.',
  "Coneixes algú que hauríem d'anar a veure.",
  "Treballes en un projecte del sector primari i t'interessa col·laborar.",
]

const CAMPS = [
  { nom: 'nom', etiqueta: 'Nom', autoComplete: 'name', ample: true },
  { nom: 'email', etiqueta: 'Correu electrònic', tipus: 'email', autoComplete: 'email', ample: true },
  { nom: 'missatge', etiqueta: 'Missatge', tipus: 'textarea', files: 6, ample: true },
]

const IconaInstagram = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="24" height="24">
    <g fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" />
    </g>
  </svg>
)

export default function Contacte() {
  const ref = useFadeIn(0.05)

  return (
    <>
      <Seo
        title="Contacte — Arrela't"
        description="Ets productor o productora i vols que et visitem? Escriu-nos i parlem de com posar en valor el teu projecte."
        path="/contacte"
      />

      <main className="portada">
        <section className="contacte-pagina" aria-labelledby="contacte-titol">
          <div ref={ref} className="contacte-pagina__inner contenidor fade-in">
            <div className="contacte-pagina__text">
              <div className="contacte-pagina__blob">
                <IlustracioSobre className="contacte-pagina__il" />
              </div>
              <p className="seccio-etiqueta">Contacte</p>
              <h1 id="contacte-titol" className="seccio-titol seccio-titol--gran">
                Escriu-nos, parlem
              </h1>
              <p className="seccio-intro seccio-intro--ample">
                Ets productor o productora i vols que et visitem? Treballes en un projecte relacionat
                amb el sector primari i t&apos;interessa col·laborar? Escriu-nos.
              </p>

              <ul className="contacte-motius" role="list">
                {MOTIUS.map((motiu) => (
                  <li key={motiu}>
                    <IconaCheck fons="#1F4A34" check="#F5F0E4" />
                    {motiu}
                  </li>
                ))}
              </ul>

              <div className="contacte-canals">
                <p className="contacte-canals__titol">També ens trobaràs a</p>
                <a
                  href={INSTAGRAM}
                  className="targeta lift contacte-canal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contacte-canal__icona">
                    <IconaInstagram />
                  </span>
                  <span className="contacte-canal__text">
                    <span className="contacte-canal__nom">Instagram</span>
                    <span className="contacte-canal__detall">@arrela_t_</span>
                  </span>
                  <Fletxa className="contacte-canal__fletxa" />
                  <span className="sr-only">(s&apos;obre en una pestanya nova)</span>
                </a>
                {/* TODO: afegir el canal de YouTube quan existeixi l'URL real (al peu també és només text) */}
              </div>
            </div>

            <div className="contacte-pagina__formulari">
              <h2 className="contacte-pagina__subtitol">El teu missatge</h2>
              <Formulari
                prefix="contacte"
                camps={CAMPS}
                boto="Envia el missatge"
                confirmacio={{
                  text: 'Hem rebut el teu missatge i et respondrem el més aviat possible.',
                  textTorna: 'Envia un altre missatge',
                }}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
