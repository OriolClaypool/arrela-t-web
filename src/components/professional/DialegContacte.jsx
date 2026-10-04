import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Formulari from '../formulari/Formulari'

// Sol·licitud de contacte amb un productor: un <dialog> modal natiu (el navegador
// gestiona el focus, la tecla Escape i el fons inert). Es munta només quan hi ha un
// productor triat.

export default function DialegContacte({ productor, onTanca }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialeg = ref.current
    if (dialeg && !dialeg.open) dialeg.showModal()
    return () => {
      if (dialeg?.open) dialeg.close()
    }
  }, [])

  const camps = [
    { nom: 'negoci', etiqueta: 'Nom del negoci', autoComplete: 'organization', ample: true },
    { nom: 'contacte', etiqueta: 'Nom de contacte', autoComplete: 'name', opcional: true },
    { nom: 'email', etiqueta: 'Correu electrònic', tipus: 'email', autoComplete: 'email' },
    {
      nom: 'missatge',
      etiqueta: 'Missatge',
      tipus: 'textarea',
      files: 3,
      ample: true,
      opcional: true,
      placeholder: "Explica'ns què necessites",
    },
  ]

  return (
    <dialog
      ref={ref}
      className="dialeg"
      aria-labelledby="dialeg-titol"
      onClose={onTanca}
      onClick={(e) => {
        // Clic a la capa fosca (fora de la caixa): tanca
        if (e.target === ref.current) ref.current.close()
      }}
    >
      <div className="dialeg__caixa">
        <button
          type="button"
          className="dialeg__tanca"
          aria-label="Tanca"
          onClick={() => ref.current?.close()}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
            <path d="M6 6 L18 18 M18 6 L6 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>

        <p className="seccio-etiqueta">Sol·licitud de contacte</p>
        <h2 id="dialeg-titol" className="dialeg__titol">
          {productor.nom}
        </h2>
        <p className="dialeg__text">
          {[productor.categoria, productor.comarca].filter(Boolean).join(' · ')}
        </p>

        <Formulari
          prefix="dialeg"
          camps={camps}
          boto="Envia la sol·licitud"
          ocults={{ productor: productor.nom }}
          confirmacio={{
            text: `Hem rebut la teva sol·licitud per contactar amb ${productor.nom}. Et posarem en contacte aviat.`,
            textTorna: 'Tanca',
            onTorna: () => ref.current?.close(),
          }}
        />
      </div>
    </dialog>
  )
}

DialegContacte.propTypes = {
  productor: PropTypes.shape({
    nom: PropTypes.string.isRequired,
    categoria: PropTypes.string,
    comarca: PropTypes.string,
  }).isRequired,
  onTanca: PropTypes.func.isRequired,
}
