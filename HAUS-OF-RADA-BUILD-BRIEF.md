# Haus of Rada — Build Brief

Brief operativo per costruire il sito **Haus of Rada** come progetto reale, versionato su GitHub e pubblicato su Vercel. Mettere questo file nella root del repo: è la fonte di verità per stack, design system, architettura e contenuti.

Founder: **Marianna Radaelli** — interior designer. Il sito è un atelier editoriale: progettazione d'interni (residenziale + horeca), collezione di oggetti/arte (in futuro in vendita) e un journal di racconto del design.

Tagline: **"Luce sulle cose belle."** — Rada richiama *irradiare/radiance*: prendere le cose belle e farle risplendere.

---

## 1. Stack

- **Astro** (content-first, veloce, ideale per portfolio + journal editoriale).
- **React island** solo dove serve interattività (il filtro dei Progetti).
- **Content Collections** di Astro per Progetti e Journal (Markdown + frontmatter tipizzato con Zod).
- **CSS puro con custom properties** (niente framework UI: il design è su misura). Un solo `global.css` con i token qui sotto.
- **Deploy: GitHub → Vercel.** Build `astro build`, output `dist/`.
- Font: Google Fonts **Fraunces** (display) + **Instrument Sans** (testo/utility).

> Alternativa: se si vuole anticipare l'e-commerce della Collezione, usare **Next.js**. Per la fase attuale (portfolio + journal) Astro è più semplice e più veloce; si migra a Next quando la Collezione diventa vendita reale.

---

## 2. Design system (token — usare esattamente questi)

Direzione: **luminosa ed editoriale**. Ossatura Nordic (pulizia, tanto respiro) + calore Zimmermann (florale, avorio/ambra, sole). L'impatto cinematografico si applica *vestito di luce, non di buio*.

```css
:root{
  /* colore */
  --ivory:#F5EFE2;      /* base */
  --ivory-2:#EDE4D2;
  --ivory-3:#E4D8C1;
  --ink:#221D15;        /* testo, espresso non nero puro */
  --ink-soft:#5A5142;
  --green:#37493A;      /* accento primario, botanico */
  --green-deep:#232F27; /* sezioni scure / footer */
  --amber:#B0742E;      /* nod "Brandy"/cognac, usato con parsimonia */
  --gold:#B49B5C;       /* filetti luxe */
  --glow:#F4D9A0;       /* la "luce" di Rada */
  --line:rgba(34,29,21,.16);
  /* type */
  --serif:"Fraunces",Georgia,serif;   /* display, pesi 300–600, con corsivi */
  --sans:"Instrument Sans",system-ui,sans-serif;
  /* sistema */
  --ease:cubic-bezier(.22,.61,.36,1);
  --pad:clamp(22px,6vw,120px);        /* padding orizzontale di sezione */
}
```

Regole trasversali:
- **Serif** per titoli e claim (spesso in `weight:300` + corsivo per gli accenti). **Sans** per corpo, nav, etichette.
- **Eyebrow / stamp editoriale**: sans, 11px, `letter-spacing:.34em`, uppercase. È la firma testuale, es. `[ Haus of Rada · Guide ]`. Ricorre su journal e sezioni — è il filo che lega sito e Instagram.
- **Grana carta**: overlay SVG noise a `opacity .05`, `mix-blend-mode:multiply`, `position:fixed`.
- **Motion sobrio**: reveal all'ingresso hero + scroll-reveal via IntersectionObserver (`.reveal → .in`). **Rispettare `prefers-reduced-motion`** (disattiva animazioni). Niente effetti sparsi.
- **Quality floor**: responsive fino a mobile, `:focus-visible` visibile (`outline:2px solid var(--amber)`), keyboard-navigabile.

### Elemento firma: la "radiance"
Nell'hero della Home, dei **raggi di luce** (SVG) che "respirano" dietro il wordmark + un **orizzonte botanico** morbido dal basso. È l'unico momento "bold" — tutto il resto resta quieto e disciplinato. Non replicare l'effetto ovunque.

### Wordmark
`Haus of Rada` — serif; "Haus" e "Rada" in `weight:600`, "of" in corsivo colore `--amber` a `.7em`.

---

## 3. Architettura / rotte

I 4 pilastri → le pagine.

| Rotta | Pagina | Pilastro |
|---|---|---|
| `/` | Home (hero radiance + indice dei mondi) | — |
| `/progetti` | Interni — griglia con filtro **Residenziale / Horeca** | 1. Interni |
| `/progetti/[slug]` | Scheda immersiva del progetto (drill-in: "la natura del progetto") | 1. Interni |
| `/collezione` | Catalogo oggetti d'arredo + arte ("prossimamente in vendita") | 2. Collezione |
| `/journal` | Indice storie con le 4 serie | 3. Journal |
| `/journal/[slug]` | Articolo | 3. Journal |
| `/studio` | Marianna: bio, portfolio, foto, social, contatti | 4. La firma |
| `/contatti` | Form di contatto + CTA consulenza (o sezione dentro /studio) | — |

Nav globale: Interni · Collezione · Journal · Studio · Contatti. Footer scuro (`--green-deep`) con firma, social, città (Monza · Milano).

---

## 4. Specifiche pagina

**Home** — hero full-height con radiance + wordmark animato + tagline "Luce sulle cose belle" → manifesto (statement editoriale, molto respiro) → **indice dei mondi** (Interni con tag Residenziale/Horeca, Collezione, Journal, come voci di rivista con numero, immagine, freccia hover) → progetto in evidenza (banda cinematografica scura) → preview Journal (3 card con stamp) → contatti/footer con la firma di Marianna.

**Progetti** — intestazione + **filtro** (Tutti / Residenziale / Horeca) con contatore. Griglia 2 colonne di card (cover, categoria badge, titolo serif, luogo·anno, riga, "Esplora il progetto →"). Click → `/progetti/[slug]`.

**Progetto (detail)** — questa è la richiesta chiave: *l'utente accede alla natura del progetto*. Struttura: hero immersivo (cover full-screen) con eyebrow categoria + titolo + facts (Luogo/Anno/Superficie/Tipo) → intro (linea + concept) → **"La natura del progetto"** = 3 blocchi *La luce / Materiali / Il dettaglio* (i tecnicismi) → gallery immagini + planimetrie/render → CTA "Richiedi una consulenza". Back bar sticky "← Tutti i progetti".

**Collezione** — griglia catalogo (oggetto/opera, autore/designer, provenienza, breve storia). Ogni scheda con etichetta "Prossimamente in vendita". Impostare i campi già pensando allo shop futuro (prezzo, disponibilità) ma nasconderli ora.

**Journal** — indice filtrabile per **serie**: *Guide* (guida a una città/destinazione), *Anatomia di un posto* (un luogo sviscerato coi tecnicismi), *Storia dell'oggetto* (un pezzo iconico raccontato), *Lifestyle*. Card con stamp `[ Haus of Rada · Serie ]`, titolo, luogo. Formato ispirato alle carousel-guida editoriali (immagine grande che respira, luogo taggato). Ogni articolo alimenta anche Instagram (1 post = 1 articolo).

**Studio** — ritratto di Marianna. Bio reale da usare come base (da confermare/limare con lei):
- Laurea triennale in **Interior Design, Politecnico di Milano**.
- Corso **Horeca Design Indoor & Outdoor, POLI.design**; corso di approfondimento **3ds Max, IED Milano (2025)**.
- Dal 2021 presso lo studio dell'**Arch. Piergiorgio de Flumeri** (progettazione tecnica, rendering, rilievi, pratiche edilizie).
- Progetti residenziali per privati (nuovo e ristrutturazione), dal concept alla documentazione finale e ai render.
- Concept horeca sviluppati e in portfolio.
- Cittadinanza italiana e svizzera. Su Monza dal 2026.
- Link portfolio + social (Instagram, Pinterest, LinkedIn) + finestra di contatto.

**Contatti** — form (Nome, Email, Progetto) + CTA consulenza. Il form può partire come `mailto:` o un servizio come Formspree; niente backend nella prima versione.

---

## 5. Modello contenuti (Content Collections)

`src/content/progetti/*.md` — frontmatter:
```yaml
titolo: "Villa in fiore"
slug: "villa-in-fiore"
categoria: "residenziale"   # residenziale | horeca
luogo: "Collina di Bergamo"
anno: "2025"
tipo: "Residenza privata"
mq: "420 m²"
linea: "Una residenza dove la luce guida ogni scelta."
concept: ["...", "..."]
natura:
  - { k: "La luce", t: "..." }
  - { k: "Materiali", t: "..." }
  - { k: "Il dettaglio", t: "..." }
cover: "/img/progetti/villa-fiore/cover.jpg"
gallery: ["...", "..."]
ordine: 1
```

`src/content/journal/*.md` — frontmatter:
```yaml
titolo: "Copenhagen, in otto luoghi di design da vivere"
slug: "copenhagen-design-guide"
serie: "guide"              # guide | anatomia | oggetti | lifestyle
luogo: "Copenhagen, Danimarca"
data: 2026-06-23
cover: "/img/journal/copenhagen/cover.jpg"
# corpo in Markdown sotto il frontmatter
```

Definire gli schema con `zod` in `src/content/config.ts`. I 6 progetti già impostati nei prototipi (3 residenziali: Villa in fiore, Appartamento Novecento, Casa sul lago; 3 horeca: Boutique hotel Langhe, Ristorante d'autore, Spa Dolomiti) sono contenuti-seme verosimili da sostituire con i progetti reali.

Immagini: convenzione `public/img/...`. Finché mancano le foto reali, usare i **segnaposto** in stile `[ fotografia: … ]` già presenti nei prototipi (cornice + etichetta), così i layout reggono anche senza asset.

---

## 6. Struttura repo (proposta)

```
haus-of-rada/
├─ src/
│  ├─ layouts/BaseLayout.astro        # <head>, font, global.css, Nav, Footer
│  ├─ components/
│  │  ├─ Nav.astro
│  │  ├─ Footer.astro
│  │  ├─ HeroRadiance.astro           # hero Home (SVG raggi + orizzonte)
│  │  ├─ WorldIndex.astro             # indice dei mondi
│  │  ├─ ProjectCard.astro
│  │  ├─ ProjectFilter.jsx            # React island (filtro)
│  │  ├─ Gallery.astro
│  │  ├─ JournalCard.astro
│  │  ├─ EditorialStamp.astro
│  │  └─ ContactForm.astro
│  ├─ content/
│  │  ├─ config.ts                    # schema zod di progetti + journal
│  │  ├─ progetti/*.md
│  │  └─ journal/*.md
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ progetti/index.astro
│  │  ├─ progetti/[slug].astro
│  │  ├─ collezione/index.astro
│  │  ├─ journal/index.astro
│  │  ├─ journal/[slug].astro
│  │  ├─ studio.astro
│  │  └─ contatti.astro
│  └─ styles/global.css               # i token della sezione 2
├─ public/img/...
├─ astro.config.mjs                   # integrazione @astrojs/react + @astrojs/vercel
├─ package.json
└─ HAUS-OF-RADA-BUILD-BRIEF.md        # questo file
```

---

## 7. Ordine di costruzione (task per Claude Code)

1. Scaffold Astro + integrazione React + Vercel adapter. Aggiungere `global.css` con i token e i font. Costruire `BaseLayout`, `Nav`, `Footer`, l'overlay grana, e le utility reveal + `prefers-reduced-motion`.
2. **Home**: `HeroRadiance` (raggi SVG + orizzonte + wordmark animato + tagline), manifesto, `WorldIndex`, progetto in evidenza, preview Journal.
3. **Progetti**: `config.ts` (schema), i 6 md seme, `/progetti` con `ProjectFilter` (island) e `ProjectCard`, poi `/progetti/[slug]` con la sezione "La natura del progetto" + `Gallery`.
4. **Journal**: collection + `/journal` filtrabile per serie + `/journal/[slug]` con lo stamp editoriale.
5. **Collezione**: catalogo con campi pronti per lo shop (nascosti ora).
6. **Studio** (bio Marianna reale della sezione 4) + **Contatti** (form mailto/Formspree).
7. Rifinire responsive/focus/motion. Screenshot di controllo.

---

## 8. Deploy (GitHub → Vercel)

1. `git init` → commit → repo su GitHub (`hausofrada` o `haus-of-rada`).
2. Su Vercel: **Add New → Project → Import** dal repo. Framework preset: **Astro** (build `astro build`, output `dist`). Deploy.
3. Ogni `git push` su `main` = deploy automatico. Le preview branch danno URL di anteprima.
4. Dominio: comprare `hausofrada.com` (o `.studio` / `.design`) e collegarlo in **Vercel → Settings → Domains**.

---

## Prompt d'avvio per Claude Code

> Costruisci il sito Haus of Rada seguendo esattamente `HAUS-OF-RADA-BUILD-BRIEF.md` in root. Stack Astro + React island + Vercel adapter. Parti dal task 1 (scaffold + design system + layout/Nav/Footer), poi fermati e mostrami la Home prima di proseguire con Progetti. Usa i token e i contenuti-seme del brief; per le immagini mancanti usa i segnaposto `[ fotografia: … ]`. Rispetta `prefers-reduced-motion` e i focus states.
