# Haus of Rada

Atelier editoriale di **Marianna Radaelli** — progettazione d'interni (residenziale + horeca),
collezione di oggetti e arte, e un journal di racconto del design.

> _Luce sulle cose belle._

Sito costruito seguendo [`HAUS-OF-RADA-BUILD-BRIEF.md`](./HAUS-OF-RADA-BUILD-BRIEF.md).

## Stack

- **Astro** (build statica) + **React island** solo per i filtri (Progetti / Journal)
- **Content Collections** tipizzate con Zod (progetti, collezione, journal)
- CSS puro con custom properties (design system in `src/styles/global.css`)
- Font: Fraunces (display) + Instrument Sans (testo)
- Deploy: **GitHub → Vercel** (adapter `@astrojs/vercel`)

## Sviluppo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # build statica
npm run preview  # anteprima della build
```

## Struttura

```
src/
├─ layouts/BaseLayout.astro     # head, font, Nav, Footer, grana, reveal
├─ components/                  # Nav, Footer, HeroRadiance, WorldIndex,
│                               # ProjectCard, CollectionFilter (island),
│                               # Gallery, JournalCard, Contact, BudgetService…
├─ content/                     # config.ts (schema Zod) + progetti/journal/collezione (.md)
├─ pages/                       # index, progetti, collezione, journal, studio, contatti
└─ styles/global.css            # token del design system
public/img/…                    # immagini reali (finché mancano: segnaposto "[ fotografia: … ]")
```

## Contenuti

- **Progetti / Collezione / Journal** sono in `src/content/**` come Markdown con frontmatter.
  Aggiungere un `.md` = aggiungere una scheda/articolo.
- **Immagini:** convenzione `public/img/…`. Finché mancano le foto reali si usano i segnaposto.
- **Journal – link affiliati:** il campo `indirizzi` nel frontmatter e i link esterni nel corpo
  sono resi con `rel="sponsored"` (modello earning-per-click). Gli URL seme `https://example.com/…`
  vanno sostituiti con i veri link affiliati.
- **Collezione – shop:** i campi `prezzo` / `disponibile` esistono nello schema ma non sono
  ancora mostrati ("prossimamente in vendita").

## Deploy

Ogni `push` su `main` = deploy automatico su Vercel. Le branch generano preview URL.
Framework preset su Vercel: **Astro**.
