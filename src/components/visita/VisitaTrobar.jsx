import useFadeIn from '../../hooks/useFadeIn'
import MiniCatalunya from '../infografies/MiniCatalunya'
import Pin from '../marca/Pin'
import Fletxa from '../marca/Fletxa'
import { posicioPin } from '../../utils/mapaMini'
import { enllacCorreu, enllacInstagram, enllacTelefon, enllacWeb, esMarcador } from '../../utils/format'

// Secció "On trobar-los" de la visita (id="contacte", maqueta visita.html): tres targetes.
// 1. El mapa mini amb la comarca i la ubicació.  2. On comprar-ho (`onComprar`).
// 3. Contacte: web, correu, Instagram i telèfon, i el botó "Escriu-los" si hi ha correu.
// Les URL es construeixen amb seguretat (utils/format.js: sense protocol previ, només
// valors vàlids) i qualsevol valor amb "·" és un marcador de posició i s'amaga.

const TRAC = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }

const ICONES_VENDA = {
  explotacio: (
    <g {...TRAC} stroke="#B5562F"><path d="M4 20 V10 L12 4 L20 10 V20 Z" /><path d="M10 20 V14 H14 V20" /></g>
  ),
  botiga: (
    <g {...TRAC} stroke="#B5562F"><path d="M3 9 H21 L19 5 H5 Z" /><path d="M5 9 V20 H19 V9" /><path d="M10 20 V14 H14 V20" /></g>
  ),
  mercat: (
    <g {...TRAC} stroke="#B5562F"><path d="M4 8 H20 L18 4 H6 Z" /><path d="M6 8 V20 M18 8 V20 M4 20 H20" /></g>
  ),
  restaurant: (
    <g {...TRAC} stroke="#B5562F"><path d="M7 3 V11 M5 3 V7 Q5 11 7 11 Q9 11 9 7 V3 M7 11 V21" /><path d="M17 21 V3 Q14 5 14 11 H17" /></g>
  ),
}

const TIPUS_VENDA = {
  explotacio: "Venda directa a l'explotació",
  botiga: 'Botiga',
  mercat: 'Mercat o fira',
  restaurant: 'Restaurant',
}

const ICONES_CONTACTE = {
  web: (
    <g {...TRAC} stroke="#4E5A1C"><circle cx="12" cy="12" r="9" /><path d="M3 12 H21 M12 3 C9 6 9 18 12 21 M12 3 C15 6 15 18 12 21" /></g>
  ),
  correu: (
    <g {...TRAC} stroke="#4E5A1C"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M4 7 L12 13 L20 7" /></g>
  ),
  instagram: (
    <g {...TRAC} stroke="#4E5A1C"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /></g>
  ),
  telefon: (
    <path {...TRAC} stroke="#4E5A1C" d="M6 3 H9 L11 8 L8.5 9.5 Q10 13.5 14.5 15.5 L16 13 L21 15 V18 Q21 21 18 21 Q4 19 3 6 Q3 3 6 3 Z" />
  ),
}

function Glif({ children, fons }) {
  return (
    <span className="visita-trobar__glif" style={{ background: fons }} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="20" height="20" focusable="false">{children}</svg>
    </span>
  )
}

function FilaContacte({ icona, enllac, extern }) {
  return (
    <li>
      <a
        href={enllac.href}
        className="visita-trobar__fila"
        {...(extern ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <Glif fons="#E8EDD6">{ICONES_CONTACTE[icona]}</Glif>
        <span className="visita-trobar__valor">{enllac.text}</span>
        {extern && <span className="sr-only"> (s&apos;obre en una pestanya nova)</span>}
      </a>
    </li>
  )
}

export default function VisitaTrobar({ productor, familia }) {
  const ref = useFadeIn()
  const contacte = productor.contacte ?? {}
  const xarxes = productor.xarxes ?? {}
  const web = enllacWeb(contacte.web ?? xarxes.web)
  const correu = enllacCorreu(contacte.email)
  const instagram = enllacInstagram(contacte.instagram ?? xarxes.instagram)
  const telefon = enllacTelefon(contacte.telefon)
  const teContacte = web || correu || instagram || telefon

  const venda = (productor.onComprar ?? []).filter((p) => p.nom && !esMarcador(p.nom))
  const pin = posicioPin(productor.coordenades)
  const teMapa = productor.comarca || productor.ubicacio

  return (
    <section id="contacte" className="visita-trobar" aria-labelledby="trobar-titol">
      <div ref={ref} className="visita-trobar__inner contenidor fade-in">
        <p className="seccio-etiqueta">On trobar-los</p>
        <h2 id="trobar-titol" className="seccio-titol">Com arribar-hi i on comprar</h2>

        <div className="visita-trobar__graella">
          {teMapa && (
            <div className="visita-trobar__mapa">
              <MiniCatalunya
                gruix={1}
                titol={productor.comarca ? `Mapa de Catalunya amb la comarca ${productor.comarca} assenyalada` : undefined}
                className="visita-trobar__mini"
              >
                {pin && <Pin color={familia.colorPin} x={pin.x} y={pin.y} escala={0.31} />}
              </MiniCatalunya>
              {productor.comarca && <p className="visita-trobar__comarca">{productor.comarca}</p>}
              {productor.ubicacio && <p className="visita-trobar__ubicacio">{productor.ubicacio}</p>}
            </div>
          )}

          <div className="visita-trobar__targeta targeta">
            <h3 className="visita-trobar__titol">On comprar-ho</h3>
            {venda.length > 0 ? (
              <>
                <ul className="visita-trobar__llista" role="list">
                  {venda.map((punt) => (
                    <li key={`${punt.nom}-${punt.lloc ?? ''}`} className="visita-trobar__punt">
                      <Glif fons="#F6E2D3">{ICONES_VENDA[punt.tipus] ?? ICONES_VENDA.botiga}</Glif>
                      <span>
                        <span className="sr-only">{TIPUS_VENDA[punt.tipus] ?? TIPUS_VENDA.botiga}: </span>
                        <span className="visita-trobar__punt-nom">{punt.nom}</span>
                        {punt.lloc && !esMarcador(punt.lloc) && (
                          <span className="visita-trobar__punt-lloc">{punt.lloc}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="visita-trobar__nota">
                  Aquestes botigues també són la millor referència per a l&apos;espai professional.
                </p>
              </>
            ) : (
              <p className="visita-trobar__buit">Encara no hi ha punts de venda publicats.</p>
            )}
          </div>

          {teContacte && (
            <div className="visita-trobar__targeta targeta">
              <h3 className="visita-trobar__titol">Contacte</h3>
              <ul className="visita-trobar__llista" role="list">
                {web && <FilaContacte icona="web" enllac={web} extern />}
                {correu && <FilaContacte icona="correu" enllac={correu} />}
                {instagram && <FilaContacte icona="instagram" enllac={instagram} extern />}
                {telefon && <FilaContacte icona="telefon" enllac={telefon} />}
              </ul>
              {correu && (
                <a href={correu.href} className="btn btn--terracota lift visita-trobar__boto">
                  Escriu-los
                  <Fletxa />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
