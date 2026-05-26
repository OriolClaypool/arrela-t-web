import { useState, useRef } from 'react'
import productors from '../data/productors'

const COMARQUES = [
  { id: 'alt-emporda',       nom: "Alt Empordà",         d: "M480,30 L560,30 L570,90 L490,95 Z" },
  { id: 'baix-emporda',      nom: "Baix Empordà",        d: "M420,60 L480,30 L490,95 L430,110 Z" },
  { id: 'garrotxa',          nom: "Garrotxa",             d: "M370,60 L420,60 L430,110 L375,115 Z" },
  { id: 'girones',           nom: "Gironès",              d: "M410,110 L490,95 L495,150 L415,155 Z" },
  { id: 'pla-estany',        nom: "Pla de l'Estany",     d: "M375,115 L430,110 L415,155 L370,150 Z" },
  { id: 'ripolles',          nom: "Ripollès",             d: "M320,30 L420,30 L420,60 L370,60 L320,80 Z" },
  { id: 'cerdanya',          nom: "Cerdanya",             d: "M250,30 L320,30 L320,80 L250,80 Z" },
  { id: 'selva',             nom: "Selva",                d: "M430,110 L495,150 L480,200 L420,190 L390,150 Z" },
  { id: 'osona',             nom: "Osona",                d: "M280,80 L370,60 L375,115 L370,150 L300,145 L270,110 Z" },
  { id: 'bergueda',          nom: "Berguedà",             d: "M220,80 L280,80 L270,110 L300,145 L240,155 L200,120 Z" },
  { id: 'llucanes',          nom: "Lluçanès",             d: "M300,145 L370,150 L365,185 L305,180 Z" },
  { id: 'maresme',           nom: "Maresme",              d: "M390,150 L420,190 L400,230 L360,200 Z" },
  { id: 'valles-oriental',   nom: "Vallès Oriental",     d: "M330,155 L390,150 L360,200 L310,195 Z" },
  { id: 'valles-occidental', nom: "Vallès Occidental",   d: "M275,165 L330,155 L310,195 L270,190 Z" },
  { id: 'barcelones',        nom: "Barcelonès",           d: "M310,195 L360,200 L355,225 L305,220 Z" },
  { id: 'bages',             nom: "Bages",                d: "M200,120 L270,110 L275,165 L210,170 Z" },
  { id: 'solsones',          nom: "Solsonès",             d: "M150,80 L220,80 L200,120 L140,115 Z" },
  { id: 'anoia',             nom: "Anoia",                d: "M210,170 L275,165 L270,210 L215,215 Z" },
  { id: 'baix-llobregat',    nom: "Baix Llobregat",      d: "M270,190 L310,195 L305,220 L260,225 Z" },
  { id: 'garraf',            nom: "Garraf",               d: "M260,225 L305,220 L295,255 L255,250 Z" },
  { id: 'alt-penedes',       nom: "Alt Penedès",          d: "M215,215 L270,210 L260,250 L255,250 L210,245 Z" },
  { id: 'noguera',           nom: "Noguera",              d: "M80,70 L150,80 L140,115 L100,140 L70,110 Z" },
  { id: 'pallars-jussa',     nom: "Pallars Jussà",       d: "M60,30 L250,30 L250,80 L150,80 L80,70 Z" },
  { id: 'segarra',           nom: "Segarra",              d: "M100,140 L140,115 L210,170 L215,215 L150,220 L110,185 Z" },
  { id: 'urgell',            nom: "Urgell",               d: "M60,145 L100,140 L110,185 L65,185 Z" },
  { id: 'segria',            nom: "Segrià",               d: "M30,100 L80,70 L100,140 L60,145 L25,135 Z" },
  { id: 'conca-barbera',     nom: "Conca de Barberà",    d: "M150,220 L215,215 L210,255 L155,260 Z" },
  { id: 'tarragonès',        nom: "Tarragonès",           d: "M210,255 L255,250 L250,290 L205,290 Z" },
  { id: 'baix-camp',         nom: "Baix Camp",            d: "M255,250 L295,255 L290,300 L250,300 Z" },
  { id: 'priorat',           nom: "Priorat",              d: "M155,260 L210,255 L205,295 L155,300 Z" },
  { id: 'terra-alta',        nom: "Terra Alta",           d: "M100,280 L155,260 L155,300 L100,310 Z" },
  { id: 'montsia',           nom: "Montsià",              d: "M100,310 L200,310 L195,355 L95,355 Z" },
]

const comarcaToId = (nom) => {
  const map = {
    "Alt Empordà": "alt-emporda",
    "Baix Empordà": "baix-emporda",
    "Garrotxa": "garrotxa",
    "Gironès": "girones",
    "Pla de l'Estany": "pla-estany",
    "Ripollès": "ripolles",
    "Cerdanya": "cerdanya",
    "Selva": "selva",
    "Osona": "osona",
    "Berguedà": "bergueda",
    "Lluçanès": "llucanes",
    "Maresme": "maresme",
    "Vallès Oriental": "valles-oriental",
    "Vallès Occidental": "valles-occidental",
    "Barcelonès": "barcelones",
    "Bages": "bages",
    "Solsonès": "solsones",
    "Anoia": "anoia",
    "Baix Llobregat": "baix-llobregat",
    "Garraf": "garraf",
    "Alt Penedès": "alt-penedes",
    "Noguera": "noguera",
    "Pallars Jussà": "pallars-jussa",
    "Segarra": "segarra",
    "Urgell": "urgell",
    "Segrià": "segria",
    "Conca de Barberà": "conca-barbera",
    "Tarragonès": "tarragonès",
    "Baix Camp": "baix-camp",
    "Priorat": "priorat",
    "Terra Alta": "terra-alta",
    "Montsià": "montsia",
  }
  return map[nom] || null
}

const comarcesAmbProductors = new Set(
  productors.filter((p) => p.publicat && p.comarca).map((p) => comarcaToId(p.comarca))
)

export default function MapaCatalunya({ onSelect, selected }) {
  const [tooltip, setTooltip] = useState({ visible: false, nom: '', x: 0, y: 0 })
  const svgRef = useRef(null)

  const handleMouseEnter = (e, nom) => {
    const rect = svgRef.current?.getBoundingClientRect()
    const svgRect = e.currentTarget.getBoundingClientRect()
    if (!rect) return
    setTooltip({
      visible: true,
      nom,
      x: svgRect.left + svgRect.width / 2 - rect.left,
      y: svgRect.top - rect.top,
    })
  }

  const handleMouseLeave = () => {
    setTooltip((t) => ({ ...t, visible: false }))
  }

  const handleClick = (comarca) => {
    if (!comarcesAmbProductors.has(comarca.id)) return
    onSelect(selected === comarca.nom ? null : comarca.nom)
  }

  return (
    <div className="mapa-wrap" ref={svgRef}>
      <svg viewBox="0 0 600 390" aria-label="Mapa de les comarques de Catalunya" role="img">
        <title>Mapa de les comarques de Catalunya</title>
        {COMARQUES.map((comarca) => {
          const teProductors = comarcesAmbProductors.has(comarca.id)
          const isSelected = selected === comarca.nom
          let cls = 'comarca-shape'
          if (isSelected) cls += ' comarca-shape--seleccionada'
          else if (teProductors) cls += ' comarca-shape--activa'
          return (
            <path
              key={comarca.id}
              d={comarca.d}
              className={cls}
              role={teProductors ? 'button' : undefined}
              aria-label={teProductors ? `${comarca.nom} — té productors` : comarca.nom}
              tabIndex={teProductors ? 0 : undefined}
              onMouseEnter={(e) => handleMouseEnter(e, comarca.nom)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(comarca)}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(comarca)}
            />
          )
        })}
      </svg>
      <div
        className={`mapa-tooltip${tooltip.visible ? ' mapa-tooltip--visible' : ''}`}
        style={{ left: tooltip.x, top: tooltip.y }}
        aria-hidden="true"
      >
        {tooltip.nom}
      </div>
    </div>
  )
}
