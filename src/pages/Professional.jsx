import { useState } from 'react'
import Seo from '../components/Seo'
import Footer from '../components/Footer'
import Onada from '../components/marca/Onada'
import IconaCheck from '../components/marca/IconaCheck'
import ArcsConcentrics from '../components/illustracions/ArcsConcentrics'
import IlustracioBotiga from '../components/illustracions/IlustracioBotiga'
import IlustracioCaixa from '../components/illustracions/IlustracioCaixa'
import Formulari from '../components/formulari/Formulari'
import FitxaComercial from '../components/professional/FitxaComercial'
import DialegContacte from '../components/professional/DialegContacte'
import useFadeIn from '../hooks/useFadeIn'
import productors from '../data/productors'
import families from '../data/families'
import COMARQUES from '../data/comarques'

// /professional — "El punt de trobada": capçalera verda, els dos formularis (botigues i
// restaurants que busquen proveïdor, productors que busquen on vendre) i les fitxes
// comercials dels productors amb el filtre per comarca. Les zones de repartiment
// vénen de `comercial.zonesDistribucio` (font única).

const CONFIRMACIO = {
  text: 'Et respondrem en 48 hores amb una proposta.',
  textTorna: 'Envia una altra sol·licitud',
}

const FORMULARIS = [
  {
    id: 'proveidor',
    Il: IlustracioBotiga,
    titol: 'Busco proveïdor',
    text: "Per a botigues, restaurants i obradors. Explica'ns què busques i et proposem productors visitats per nosaltres que reparteixen a la teva zona.",
    boto: 'Envia la sol·licitud',
    classeBoto: 'btn btn--terracota btn--gran lift',
    camps: [
      { nom: 'negoci', etiqueta: 'Nom del negoci', autoComplete: 'organization', ample: true },
      { nom: 'tipus', etiqueta: 'Tipus de negoci', tipus: 'select', opcions: ['Botiga', 'Restaurant', 'Obrador', 'Altres'] },
      { nom: 'comarca', etiqueta: 'Comarca', tipus: 'select', opcions: COMARQUES },
      { nom: 'busca', etiqueta: 'Què busques', tipus: 'textarea', ample: true, placeholder: 'Productes, varietats, formats' },
      { nom: 'volum', etiqueta: 'Volum aproximat', placeholder: '20 kg a la setmana' },
      {
        nom: 'frequencia',
        etiqueta: 'Freqüència',
        tipus: 'select',
        opcions: ['Puntual', 'Setmanal', 'Quinzenal', 'Mensual'],
      },
      { nom: 'email', etiqueta: 'Correu electrònic', tipus: 'email', autoComplete: 'email' },
      { nom: 'telefon', etiqueta: 'Telèfon', tipus: 'tel', autoComplete: 'tel', opcional: true },
    ],
  },
  {
    id: 'distribucio',
    Il: IlustracioCaixa,
    titol: 'Busco on vendre',
    text: "Per a productors. Explica'ns què fas i on vols arribar. Quan una botiga busqui el que tu fas, et presentarem.",
    nota: 'Sense cap cost: els productors no paguen mai.',
    boto: 'Envia la sol·licitud',
    classeBoto: 'btn btn--bosc btn--gran lift',
    camps: [
      { nom: 'nom', etiqueta: 'El teu nom', autoComplete: 'name' },
      { nom: 'projecte', etiqueta: 'Nom del projecte', autoComplete: 'organization' },
      {
        nom: 'familia',
        etiqueta: 'Família de producte',
        tipus: 'select',
        opcions: families.map((f) => ({ valor: f.id, text: f.nom })),
      },
      { nom: 'comarca', etiqueta: 'Comarca', tipus: 'select', opcions: COMARQUES },
      { nom: 'fa', etiqueta: 'Què fas', tipus: 'textarea', ample: true, placeholder: 'Productes, varietats, com ho elabores' },
      { nom: 'capacitat', etiqueta: 'Capacitat', placeholder: '200 kg a la setmana' },
      { nom: 'zones', etiqueta: 'Zones on pots repartir', placeholder: 'Comarques o zones' },
      { nom: 'email', etiqueta: 'Correu electrònic', tipus: 'email', autoComplete: 'email', ample: true },
    ],
  },
]

const fitxes = productors.filter((p) => p.publicat && p.comercial)

export default function Professional() {
  const [comarca, setComarca] = useState('')
  const [contacte, setContacte] = useState(null)
  const refFormularis = useFadeIn(0.05)
  const refFitxes = useFadeIn(0.05)

  const filtrades = fitxes.filter(
    (p) =>
      !comarca ||
      p.comercial.zonesDistribucio.includes(comarca) ||
      p.comercial.zonesDistribucio.includes('Tot Catalunya')
  )

  const recompte = comarca
    ? `${filtrades.length} ${filtrades.length === 1 ? 'productor reparteix' : 'productors reparteixen'} a la comarca: ${comarca}`
    : `${filtrades.length} ${filtrades.length === 1 ? 'productor disponible' : 'productors disponibles'}`

  return (
    <>
      <Seo
        title="Espai professional — Arrela't"
        description="El punt de trobada entre el camp i el comerç: botigues i restaurants que busquen proveïdor, productors que busquen on vendre i les fitxes comercials dels productors que hem visitat."
        path="/professional"
      />

      <main className="portada">
        <header className="pro-capcalera" aria-labelledby="pro-titol">
          <ArcsConcentrics className="pro-capcalera__arcs" />
          <div className="pro-capcalera__inner contenidor">
            <p className="seccio-etiqueta seccio-etiqueta--clara">Espai professional</p>
            <h1 id="pro-titol" className="seccio-titol seccio-titol--clar seccio-titol--gran">
              El punt de trobada entre el camp i el comerç
            </h1>
            <p className="pro-capcalera__text">
              No som un mercat en línia. Som dues persones que coneixen cada productor i fan de pont,
              a mà, entre qui produeix i qui ven o cuina.
            </p>
            <div className="pro-capcalera__botons">
              <a href="#proveidor" className="btn btn--clar btn--gran">Busco proveïdor</a>
              <a href="#distribucio" className="btn btn--contorn-clar btn--gran">Busco on vendre</a>
            </div>
          </div>
        </header>

        <section className="pro-formularis" aria-label="Formularis">
          {/* L'ona té el color de la capçalera de dalt (--bosc) */}
          <Onada color="#1F4A34" />
          <div ref={refFormularis} className="pro-formularis__inner contenidor fade-in">
            <div className="pro-formularis__graella">
              {FORMULARIS.map((formulari) => {
                const { id, titol, text, nota, boto, classeBoto, camps } = formulari
                const Il = formulari.Il
                return (
                  <article key={id} id={id} className={`pro-form pro-form--${id}`}>
                    <div className="pro-form__capcalera">
                      <div className="pro-form__il">
                        <Il />
                      </div>
                      <div>
                        <h2 className="pro-form__titol">{titol}</h2>
                        <p className="pro-form__text">{text}</p>
                        {nota && (
                          <p className="pro-form__nota">
                            <IconaCheck fons="#2A2017" check="#E4BE5C" />
                            {nota}
                          </p>
                        )}
                      </div>
                    </div>
                    <Formulari
                      prefix={id}
                      camps={camps}
                      boto={boto}
                      classeBoto={classeBoto}
                      confirmacio={CONFIRMACIO}
                    />
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="pro-fitxes" aria-labelledby="pro-fitxes-titol">
          <Onada color="#F5F0E4" />
          <div ref={refFitxes} className="pro-fitxes__inner contenidor fade-in">
            <div className="seccio-capcalera">
              <div className="seccio-capcalera__titols">
                <p className="seccio-etiqueta">Fitxes comercials</p>
                <h2 id="pro-fitxes-titol" className="seccio-titol">
                  Productors que reparteixen a la teva zona
                </h2>
                <p className="seccio-intro">
                  La fitxa comercial dels productors que hem visitat: on reparteixen i quina és la
                  comanda mínima. Tria la comarca on tens el negoci.
                </p>
              </div>

              <div className="pro-fitxes__filtre">
                <label className="camp__etiqueta" htmlFor="pro-comarca">
                  On tens el negoci?
                </label>
                <select
                  id="pro-comarca"
                  className="camp__control camp__control--select"
                  value={comarca}
                  onChange={(e) => setComarca(e.target.value)}
                >
                  <option value="">Totes les comarques</option>
                  {COMARQUES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="pro-fitxes__compte" role="status">
              {recompte}
            </p>

            {filtrades.length > 0 ? (
              <div className="pro-fitxes__graella">
                {filtrades.map((p) => (
                  <FitxaComercial key={p.slug} productor={p} onContacte={setContacte} />
                ))}
              </div>
            ) : (
              <div className="buit">
                <p className="buit__titol">Encara no tenim productors que reparteixin a {comarca}.</p>
                <p className="buit__text">
                  Explica&apos;ns què busques al formulari de dalt i ho mirem.
                </p>
                <div className="buit__botons">
                  <button type="button" className="btn btn--bosc btn--petit" onClick={() => setComarca('')}>
                    Veure tots els productors
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {contacte && <DialegContacte key={contacte.slug} productor={contacte} onTanca={() => setContacte(null)} />}
    </>
  )
}
