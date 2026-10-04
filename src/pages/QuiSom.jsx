import Seo from '../components/Seo'
import Footer from '../components/Footer'
import Onada from '../components/marca/Onada'
import IlustracioEquip from '../components/illustracions/IlustracioEquip'
import SilhuetaPersona from '../components/illustracions/SilhuetaPersona'
import IlustracioPrincipi from '../components/illustracions/IlustracioPrincipi'
import useFadeIn from '../hooks/useFadeIn'
import equip from '../data/equip'

// /qui-som — capçalera amb una composició de formes orgàniques, les dues persones de
// l'equip (dades a src/data/equip.js), el manifest com a columna de lectura i els
// quatre principis. Els principis resumeixen el que el web ja diu del mètode
// (/segell), del manifest i de l'espai professional.

const PRINCIPIS = [
  {
    id: 'hi-anem',
    titol: 'Hi anem en persona',
    text: "Cap productor surt a Arrela't sense que dues persones hagin anat a veure'l a casa seva.",
  },
  {
    id: 'escoltem',
    titol: "Escoltem abans d'explicar",
    text: 'Les històries les expliquen qui hi treballa cada dia, amb les seves paraules.',
  },
  {
    id: 'futur',
    titol: 'El camp és futur',
    text: 'El sector primari és un patrimoni viu i una aposta de futur, no una relíquia del passat.',
  },
  {
    id: 'pont',
    titol: 'Fem de pont, a mà',
    text: 'Entre qui produeix i qui ven o cuina, de persona a persona. Els productors no paguen mai per sortir-hi.',
  },
]

export default function QuiSom() {
  const refEquip = useFadeIn()
  const refManifest = useFadeIn()
  const refPrincipis = useFadeIn()

  return (
    <>
      <Seo
        title="Qui som — Arrela't"
        description="Dues persones amb la voluntat de posar en valor el sector primari català, una càmera i moltes ganes d'escoltar."
        path="/qui-som"
      />

      <main className="portada">
        <header className="qui-som-hero" aria-labelledby="qui-som-titol">
          <div className="qui-som-hero__inner contenidor">
            <div className="qui-som-hero__text">
              <p className="seccio-etiqueta">Qui som</p>
              <h1 id="qui-som-titol" className="seccio-titol seccio-titol--gran">
                Dues persones, una càmera i moltes ganes d&apos;escoltar
              </h1>
              <p className="seccio-intro seccio-intro--ample">
                Volem posar en valor el sector primari català: visitem cada productor a casa seva i
                expliquem la seva història.
              </p>
            </div>
            <IlustracioEquip className="qui-som-hero__il" />
          </div>
        </header>

        <section className="qui-som-equip" aria-labelledby="qui-som-equip-titol">
          {/* Les ones porten el color de la secció de dalt */}
          <Onada color="#F5F0E4" />
          <div ref={refEquip} className="qui-som-equip__inner contenidor fade-in">
            <p className="seccio-etiqueta">L&apos;equip</p>
            <h2 id="qui-som-equip-titol" className="seccio-titol">
              Qui hi ha darrere de cada visita
            </h2>

            <ul className="qui-som-equip__graella" role="list">
              {equip.map((persona) => (
                <li key={persona.id} className="targeta persona">
                  <div className="persona__foto">
                    {persona.foto ? (
                      <img src={persona.foto} alt={persona.alt} loading="lazy" />
                    ) : (
                      <SilhuetaPersona className="persona__silueta" />
                    )}
                  </div>
                  <div className="persona__text">
                    <h3 className="persona__nom">{persona.nom}</h3>
                    <p className="persona__rol">{persona.rol}</p>
                    <blockquote className="persona__cita">
                      <p>&laquo;{persona.cita}&raquo;</p>
                    </blockquote>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="qui-som-manifest" aria-labelledby="qui-som-manifest-titol">
          <Onada color="#EDE5D2" />
          <div ref={refManifest} className="qui-som-manifest__inner contenidor fade-in">
            <div className="qui-som-manifest__capcalera">
              <p className="seccio-etiqueta">El manifest</p>
              <h2 id="qui-som-manifest-titol" className="seccio-titol">
                Un patrimoni viu, no una relíquia
              </h2>
            </div>
            <div className="qui-som-manifest__columna">
              <div className="qui-som-manifest__cos">
                <p>
                  Arrela&apos;t neix de la convicció que el sector primari català és un patrimoni viu
                  que mereix ser conegut, valorat i protegit. No com una relíquia del passat,
                  sinó com una aposta de futur.
                </p>
                <p>
                  Visitem productors i productores que han triat quedar-se al territori, que
                  treballen la terra, que fan formatge, que fan vi, que creen amb les seves mans.
                  Expliquem les seves històries perquè creiem que el coneixement és la millor
                  eina per canviar els hàbits de consum.
                </p>
                <p>
                  Tenim la visió d&apos;un espai físic: un lloc de trobada entre el camp i la taula.
                  Un espai amb botiga de productes de proximitat, degustació, tallers i activitats
                  per connectar les persones amb el territori del qual formen part.
                </p>
              </div>
              <p className="qui-som-manifest__final">
                Perquè el camp mereix ser vist. <span>I nosaltres ho expliquem.</span>
              </p>
            </div>
          </div>
        </section>

        <section className="qui-som-principis" aria-labelledby="qui-som-principis-titol">
          <Onada color="#F5F0E4" />
          <div ref={refPrincipis} className="qui-som-principis__inner contenidor fade-in">
            <p className="seccio-etiqueta">Com treballem</p>
            <h2 id="qui-som-principis-titol" className="seccio-titol">
              Quatre principis que ens guien
            </h2>
            <ul className="qui-som-principis__graella" role="list">
              {PRINCIPIS.map((principi) => (
                <li key={principi.id} className="targeta principi lift">
                  <IlustracioPrincipi principi={principi.id} className="principi__il" />
                  <h3 className="principi__titol">{principi.titol}</h3>
                  <p className="principi__text">{principi.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
