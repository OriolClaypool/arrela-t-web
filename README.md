# arrelat.cat

El web d'Arrela't: visitem productors del sector primari català i n'expliquem la història. React + Vite, desplegat a Vercel (cada push a `main` es publica).

## Per treballar-hi

```
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build    # genera dist/ i public/sitemap.xml
```

## On és cada cosa

- `src/data/productors.js`: les visites (una entrada per productor). El que no se sap no s'hi posa: els components amaguen el que falta.
- `design/`: el sistema visual i les tandes per a Claude Code (`design/README.md` primer).
- `design/contingut-real.md`: la llista per marcar què és real a les visites del 2026.
- `design/atles/`: les dades per comarques del cens agrari, per a la pàgina `/atles`.
- `design/recuperacio/`: el que es va poder recuperar de l'antic web de WordPress.

## Formularis

Els formularis de contacte, de `/professional` i de La carta del camp envien a [Formspree](https://formspree.io) quan hi ha la variable `VITE_FORMSPREE_ENDPOINT`. Sense la variable no es mostren: el web convida a escriure per Instagram, perquè cap formulari digui "rebut" sense haver enviat res.

Per activar-los:

1. Crea un compte a Formspree (té un pla gratuït) i un formulari nou.
2. Copia l'adreça del formulari, del tipus `https://formspree.io/f/xxxxxxxx`.
3. A Vercel, al projecte: Settings › Environment Variables › `VITE_FORMSPREE_ENDPOINT` amb aquesta adreça, per a Production i Preview.
4. Torna a desplegar (Deployments › Redeploy).

Les altes de La carta del camp arriben com un missatge amb l'assumpte "Alta a La carta del camp". Abans d'enviar la primera carta, cal tenir una pàgina de privacitat que digui qui guarda els correus i per a què.

Per provar-ho en local, crea un fitxer `.env.local` (no es puja al repositori) amb la mateixa variable.
