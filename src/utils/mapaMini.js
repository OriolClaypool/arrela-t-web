// Projecció de la silueta mini de Catalunya de la pàgina de la visita
// (maqueta visita.html: viewBox 120 x 120). La silueta és el contorn de
// src/data/mapaContorn.js escalat a 0,2.

const COS_LATITUD = Math.cos((41.7 * Math.PI) / 180)

/** [lon, lat] -> { x, y } dins del viewBox 120 x 120 de la silueta */
export function posicioPin(coordenades) {
  if (!Array.isArray(coordenades) || coordenades.length < 2) return null
  const [lon, lat] = coordenades
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) return null
  return {
    x: (lon - 0.1) * COS_LATITUD * 46 + 4,
    y: (42.92 - lat) * 46 + 4,
  }
}
