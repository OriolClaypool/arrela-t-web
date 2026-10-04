import useFadeIn from '../hooks/useFadeIn'
import productors from '../data/productors'
import families from '../data/families'
import IconaFamilia from './marca/IconaFamilia'

// Banda verda de la portada (maqueta inici.html): les 4 xifres d'Arrela't i
// la graella amb les 8 famílies de producte. Totes les xifres es calculen de
// les dades; només el "0 €" és fix.

const publicats = productors.filter((p) => p.publicat)

const nProductors = publicats.length
const nComarques = new Set(publicats.map((p) => p.comarca).filter(Boolean)).size
const nVideos = publicats.reduce((suma, p) => suma + (p.reportatge?.videos?.length ?? 0), 0)

const plural = (n, singular, pluralText) => (n === 1 ? singular : pluralText)

// Icones de les xifres (traç fi de blat, tal com a la maqueta)
const IconaCasa = () => (
  <g fill="none" stroke="#E4BE5C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 41 V22 L24 9 L41 22 V41 Z" />
    <path d="M20 41 V31 H28 V41" />
    <path d="M13 27 H17 M31 27 H35" />
  </g>
)

const IconaMuntanya = () => (
  <g fill="none" stroke="#E4BE5C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 40 L17 17 L25 29 L31 21 L44 40 Z" />
    <path d="M13 24 L17 17 L21 24" />
  </g>
)

const IconaVideo = () => (
  <>
    <circle cx="24" cy="24" r="18" fill="none" stroke="#E4BE5C" strokeWidth="2.2" />
    <path d="M20 16 L33 24 L20 32 Z" fill="#E4BE5C" />
  </>
)

const IconaBrot = () => (
  <g fill="none" stroke="#E4BE5C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 32 H40" />
    <path d="M24 32 V18" />
    <path d="M24 22 C17 22 11 17 10 10 C17 10 23 15 24 22 Z" />
    <path d="M24 18 C31 18 37 13 38 7 C31 7 25 11 24 18 Z" />
    <path d="M24 32 C24 38 20 40 16 44 M24 32 C25 38 29 40 33 43" />
  </g>
)

const XIFRES = [
  {
    id: 'productors',
    Icona: IconaCasa,
    valor: String(nProductors),
    text: plural(nProductors, 'productor visitat en persona', 'productors visitats en persona'),
  },
  {
    id: 'comarques',
    Icona: IconaMuntanya,
    valor: String(nComarques),
    text: plural(nComarques, 'comarca recorreguda', 'comarques recorregudes'),
  },
  {
    id: 'videos',
    Icona: IconaVideo,
    valor: String(nVideos),
    text: plural(nVideos, 'vídeo gravat a peu de camp', 'vídeos gravats a peu de camp'),
  },
  {
    id: 'cost',
    Icona: IconaBrot,
    valor: '0 €',
    text: 'el que paga un productor per sortir-hi',
  },
]

export default function XifresFamilies() {
  const refXifres = useFadeIn()
  const refFamilies = useFadeIn()

  return (
    <section className="bandes-verda" aria-labelledby="families-titol">
      <div className="bandes-verda__inner">
        <ul ref={refXifres} className="xifres fade-in" role="list" aria-label="Arrela't en xifres">
          {XIFRES.map((xifra) => {
            const Icona = xifra.Icona
            return (
              <li key={xifra.id} className="xifres__item">
                <svg viewBox="0 0 48 48" width="52" height="52" aria-hidden="true" focusable="false">
                  <Icona />
                </svg>
                <div>
                  <p className="xifres__valor">{xifra.valor}</p>
                  <p className="xifres__text">{xifra.text}</p>
                </div>
              </li>
            )
          })}
        </ul>

        <div ref={refFamilies} className="families fade-in">
          <div className="families__capcalera">
            <div className="families__titols">
              <p className="seccio-etiqueta seccio-etiqueta--clara">Què hi trobaràs</p>
              <h2 id="families-titol" className="seccio-titol seccio-titol--clar families__titol">
                El sector primari, família a família
              </h2>
            </div>
            <p className="families__intro">
              Cada família té el seu color i la seva icona, i t&apos;acompanya per tot el web: a les
              visites, al mapa i a la temporada.
            </p>
          </div>

          <ul className="families__graella" role="list">
            {families.map((familia) => {
              const deLaFamilia = publicats.filter((p) => p.familia === familia.id)
              return (
                <li key={familia.id} className="families__item">
                  <IconaFamilia familia={familia.id} mida={112} />
                  <span className="families__nom">{familia.nom}</span>
                  {deLaFamilia.length > 0 ? (
                    deLaFamilia.map((p) => (
                      <span key={p.slug} className="families__productor">
                        {p.nom}
                      </span>
                    ))
                  ) : (
                    <span className="families__aviat">Pròximament</span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
