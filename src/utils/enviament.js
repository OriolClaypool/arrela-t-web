// Enviament dels formularis del web (contacte, /professional i La carta del camp).
//
// Els formularis envien a Formspree quan hi ha l'adreça del formulari a la variable
// d'entorn VITE_FORMSPREE_ENDPOINT (a Vercel: Settings › Environment Variables, i
// tornar a desplegar). Exemple: https://formspree.io/f/abcdwxyz
//
// Si no n'hi ha, els formularis no fan veure que envien res: en lloc del formulari
// mostren com escriure'ns per Instagram. Abans de connectar-ho, no es perdia cap
// missatge en silenci perquè no se n'enviava cap; ara tampoc es diu "rebut" en fals.

export const ENDPOINT = (import.meta.env.VITE_FORMSPREE_ENDPOINT || '').trim()
export const FORMULARIS_ACTIUS = ENDPOINT.startsWith('https://')
export const INSTAGRAM_URL = 'https://instagram.com/arrela_t_'

// Envia les dades com a JSON. Torna { ok: true } només si Formspree confirma que les
// ha rebudes; si no, { ok: false, motiu } perquè el formulari ho pugui dir.
export async function enviaFormulari(dades) {
  if (!FORMULARIS_ACTIUS) return { ok: false, motiu: 'sense-endpoint' }
  try {
    const resposta = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(dades),
    })
    return resposta.ok ? { ok: true } : { ok: false, motiu: 'error' }
  } catch {
    return { ok: false, motiu: 'xarxa' }
  }
}
