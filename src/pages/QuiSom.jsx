import Footer from '../components/Footer'

const equip = [
  {
    nom: 'Nom Cognom',
    rol: 'Direcció i continguts',
    cita: 'Crec en la força de les històries per transformar la manera com entenem el menjar i el territori.',
  },
  {
    nom: 'Nom Cognom',
    rol: 'Vídeo i fotografia',
    cita: "La càmera és l'eina, però la mirada és el que importa. Volem mostrar el que sovint passa desapercebut.",
  },
]

export default function QuiSom() {
  return (
    <div className="qui-som">
      <section className="qui-som__hero">
        <h1>Qui som</h1>
        <p>
          Dues persones amb la voluntat de posar en valor el sector primari català,
          una càmera i moltes ganes d'escoltar.
        </p>
      </section>

      <section className="qui-som__equip">
        <h2>L'equip</h2>
        <div className="qui-som__equip-grid">
          {equip.map((persona, i) => (
            <div key={i} className="qui-som__persona">
              <div className="qui-som__foto" aria-hidden="true" />
              <h3 className="qui-som__nom">{persona.nom}</h3>
              <p className="qui-som__rol">{persona.rol}</p>
              <p className="qui-som__cita">"{persona.cita}"</p>
            </div>
          ))}
        </div>
      </section>

      <section className="qui-som__manifest">
        <div className="qui-som__manifest-inner">
          <h2>El manifest</h2>
          <p>
            Arrela't neix de la convicció que el sector primari català és un patrimoni viu
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
            Tenim la visió d'un espai físic: un lloc de trobada entre el camp i la taula.
            Un espai amb botiga de productes de proximitat, degustació, tallers i activitats
            per connectar les persones amb el territori del qual formen part.
          </p>
          <p>Perquè el camp mereix ser vist. I nosaltres ho expliquem.</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
