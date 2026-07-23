import { config, fields, collection, singleton } from '@keystatic/core';

// Keystatic — CMS git-based in local mode.
// Rispecchia esattamente gli schema Zod di src/content/config.ts.
// Format: `data: 'yaml'` (frontmatter YAML) + `contentField: 'body'` (corpo Markdoc).
// Le immagini vengono caricate in public/img/<collection> e referenziate come /img/<collection>/...

const TONO_OPTIONS = [
  { label: 'Warm', value: 'warm' },
  { label: 'Green', value: 'green' },
  { label: 'Amber', value: 'amber' },
  { label: 'Stone', value: 'stone' },
] as const;

export default config({
  // GitHub storage mode: gli edit da /keystatic diventano commit sul repo
  // (poi Vercel ridispiega). Richiede una GitHub App + le env var KEYSTATIC_*.
  // Per l'editing locale senza auth si può temporaneamente tornare a { kind: 'local' }.
  storage: {
    kind: 'github',
    repo: { owner: 'RadaStudio', name: 'Haus-of-Rada' },
  },
  ui: {
    brand: { name: 'Haus of Rada' },
  },
  singletons: {
    // ------------------------------------------------------------------ HOME
    home: singleton({
      label: 'Home',
      path: 'src/content/pagine/home',
      format: { data: 'json' },
      schema: {
        heroEyebrow: fields.text({ label: 'Hero — eyebrow' }),
        heroTagline: fields.text({ label: 'Hero — tagline' }),
        heroSub: fields.text({ label: 'Hero — sottotitolo', multiline: true }),
        manifestoEyebrow: fields.text({ label: 'Manifesto — eyebrow' }),
        manifestoStatement: fields.text({ label: 'Manifesto — frase (*verde*, ~ambra~)', multiline: true }),
        manifestoNota: fields.text({ label: 'Manifesto — nota', multiline: true }),
        metodo: fields.object(
          {
            eyebrow: fields.text({ label: 'Eyebrow' }),
            titolo: fields.text({ label: 'Titolo' }),
            testo: fields.text({ label: 'Testo (righe = paragrafi)', multiline: true }),
            passi: fields.array(
              fields.object({
                numero: fields.text({ label: 'Numero' }),
                titolo: fields.text({ label: 'Titolo' }),
                testo: fields.text({ label: 'Testo', multiline: true }),
              }),
              { label: 'Passi (4)', itemLabel: (p) => `${p.fields.numero.value} · ${p.fields.titolo.value}` }
            ),
            linkTesto: fields.text({ label: 'Link — testo' }),
            linkLabel: fields.text({ label: 'Link — etichetta' }),
            linkHref: fields.text({ label: 'Link — destinazione' }),
          },
          { label: 'Blocco "il metodo"' }
        ),
        worldsTitolo: fields.text({ label: 'Mondi — titolo' }),
        worldsIndice: fields.text({ label: 'Mondi — etichetta indice' }),
        worlds: fields.array(
          fields.object({
            idx: fields.text({ label: 'Numero (es. 01 — Progetti)' }),
            titolo: fields.text({ label: 'Titolo' }),
            href: fields.text({ label: 'Link' }),
            sub: fields.text({ label: 'Descrizione', multiline: true }),
            tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tag', itemLabel: (p) => p.value }),
            frame: fields.text({ label: 'Etichetta segnaposto' }),
            immagine: fields.image({ label: 'Immagine', directory: 'public/img/home', publicPath: '/img/home/' }),
            tono: fields.select({ label: 'Tono', options: [...TONO_OPTIONS], defaultValue: 'warm' }),
          }),
          { label: 'Mondi', itemLabel: (p) => p.fields.titolo.value }
        ),
        featuredEyebrow: fields.text({ label: 'In evidenza — eyebrow' }),
        featuredTitolo: fields.text({ label: 'In evidenza — titolo', multiline: true }),
        featuredTesto: fields.text({ label: 'In evidenza — testo', multiline: true }),
        featuredImmagine: fields.image({ label: 'In evidenza — foto (banda)', directory: 'public/img/home', publicPath: '/img/home/' }),
        featuredCta: fields.text({ label: 'In evidenza — CTA' }),
        featuredHref: fields.text({ label: 'In evidenza — link' }),
        journalHeading: fields.text({ label: 'Journal — titolo sezione' }),
        journalCta: fields.text({ label: 'Journal — CTA' }),
        journalPreview: fields.array(
          fields.object({
            stamp: fields.text({ label: 'Stamp (serie)' }),
            title: fields.text({ label: 'Titolo' }),
            place: fields.text({ label: 'Luogo / sottotitolo' }),
            frame: fields.text({ label: 'Etichetta segnaposto' }),
            immagine: fields.image({ label: 'Immagine', directory: 'public/img/home', publicPath: '/img/home/' }),
            tono: fields.select({ label: 'Tono', options: [...TONO_OPTIONS], defaultValue: 'warm' }),
            href: fields.text({ label: 'Link articolo' }),
          }),
          { label: 'Journal — anteprima (3 card)', itemLabel: (p) => p.fields.title.value }
        ),
      },
    }),

    // ------------------------------------------------------------------ INTERNI (pagina Progetti)
    interni: singleton({
      label: 'Interni (pagina)',
      path: 'src/content/pagine/interni',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Eyebrow' }),
        titolo: fields.text({ label: 'Titolo' }),
        intro: fields.text({ label: 'Intro (righe = paragrafi)', multiline: true }),
        notaFiltro: fields.text({ label: 'Nota sotto il filtro' }),
        budgetK: fields.text({ label: 'Budget band — etichetta' }),
        budgetTesto: fields.text({ label: 'Budget band — testo', multiline: true }),
        budgetHref: fields.text({ label: 'Budget band — link' }),
      },
    }),

    // ------------------------------------------------------------------ IL PERCORSO
    percorso: singleton({
      label: 'Il percorso (pagina)',
      path: 'src/content/pagine/percorso',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Eyebrow' }),
        titolo: fields.text({ label: 'Titolo' }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        passi: fields.array(
          fields.object({
            numero: fields.text({ label: 'Numero (es. 01)' }),
            titolo: fields.text({ label: 'Titolo' }),
            testo: fields.text({ label: 'Testo', multiline: true }),
            consegno: fields.text({ label: 'Ti consegno' }),
            serve: fields.text({ label: 'Serve da te' }),
            dove: fields.text({ label: 'Dove', multiline: true }),
          }),
          { label: 'Passi', itemLabel: (p) => `${p.fields.numero.value} · ${p.fields.titolo.value}` }
        ),
        notaPerimetro: fields.text({ label: 'Nota sul perimetro', multiline: true }),
        formuleTitolo: fields.text({ label: 'Formule — titolo' }),
        formule: fields.array(
          fields.object({
            formula: fields.text({ label: 'Formula' }),
            comprende: fields.text({ label: 'Cosa comprende', multiline: true }),
            perChi: fields.text({ label: 'Per chi', multiline: true }),
          }),
          { label: 'Formule', itemLabel: (p) => p.fields.formula.value }
        ),
        rigaPrezzi: fields.text({ label: 'Riga prezzi', multiline: true }),
        ctaTitolo: fields.text({ label: 'CTA — titolo' }),
        ctaTesto: fields.text({ label: 'CTA — testo', multiline: true }),
        ctaLabel: fields.text({ label: 'CTA — bottone' }),
        ctaHref: fields.text({ label: 'CTA — link' }),
      },
    }),

    // ------------------------------------------------------------------ STUDIO
    studio: singleton({
      label: 'Studio (pagina)',
      path: 'src/content/pagine/studio',
      format: { data: 'json' },
      schema: {
        pageEyebrow: fields.text({ label: 'Eyebrow' }),
        pageTitolo: fields.text({ label: 'Titolo', multiline: true }),
        portraitLabel: fields.text({ label: 'Etichetta ritratto (segnaposto)' }),
        portrait: fields.image({ label: 'Ritratto', directory: 'public/img/studio', publicPath: '/img/studio/' }),
        bioLead: fields.text({ label: 'Bio — lead (*accento*)', multiline: true }),
        bioParagrafi: fields.array(fields.text({ label: 'Paragrafo', multiline: true }), {
          label: 'Bio — paragrafi',
          itemLabel: (p) => (p.value ?? '').slice(0, 50),
        }),
        credenziali: fields.array(
          fields.object({
            titolo: fields.text({ label: 'Colonna' }),
            voci: fields.array(fields.text({ label: 'Voce' }), { label: 'Voci', itemLabel: (p) => p.value }),
          }),
          { label: 'Credenziali', itemLabel: (p) => p.fields.titolo.value }
        ),
        portfolioHref: fields.text({ label: 'Link portfolio' }),
        budgetEyebrow: fields.text({ label: 'Budget — eyebrow' }),
        budgetTitolo: fields.text({ label: 'Budget — titolo (*accento*)' }),
        budgetLead: fields.text({ label: 'Budget — lead (*accento*)', multiline: true }),
        budgetPunti: fields.array(
          fields.object({
            k: fields.text({ label: 'Titolo' }),
            t: fields.text({ label: 'Testo', multiline: true }),
          }),
          { label: 'Budget — punti', itemLabel: (p) => p.fields.k.value }
        ),
        budgetCta: fields.text({ label: 'Budget — CTA' }),
        ctaEyebrow: fields.text({ label: 'CTA finale — eyebrow' }),
        ctaTitolo: fields.text({ label: 'CTA finale — titolo (*accento*)' }),
        ctaLabel: fields.text({ label: 'CTA finale — bottone' }),
      },
    }),

    // ------------------------------------------------------------------ CONTATTI
    contatti: singleton({
      label: 'Contatti (pagina)',
      path: 'src/content/pagine/contatti',
      format: { data: 'json' },
      schema: {
        pageEyebrow: fields.text({ label: 'Eyebrow' }),
        pageTitolo: fields.text({ label: 'Titolo', multiline: true }),
        pageIntro: fields.text({ label: 'Intro', multiline: true }),
        bloccoEyebrow: fields.text({ label: 'Blocco — eyebrow' }),
        bloccoTitolo: fields.text({ label: 'Blocco — titolo (*accento*)' }),
        bloccoFirma: fields.text({ label: 'Blocco — firma', multiline: true }),
        bloccoNome: fields.text({ label: 'Blocco — nome' }),
        bloccoRuolo: fields.text({ label: 'Blocco — ruolo' }),
        buyerNota: fields.text({ label: 'Nota buyer (*accento*)', multiline: true }),
        notaSopralluoghi: fields.text({ label: 'Nota sopralluoghi (25 km)', multiline: true }),
      },
    }),

    // ------------------------------------------------------------------ COLLEZIONE (pagina)
    collezionePagina: singleton({
      label: 'Collezione (pagina)',
      path: 'src/content/pagine/collezione',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Eyebrow' }),
        titolo: fields.text({ label: 'Titolo', multiline: true }),
        intro: fields.text({ label: 'Intro (*accento*)', multiline: true }),
        noteEyebrow: fields.text({ label: 'Note bar — eyebrow' }),
        noteTesto: fields.text({ label: 'Note bar — testo', multiline: true }),
      },
    }),

    // ------------------------------------------------------------------ JOURNAL (pagina)
    journalPagina: singleton({
      label: 'Journal (pagina)',
      path: 'src/content/pagine/journalPagina',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Eyebrow' }),
        titolo: fields.text({ label: 'Titolo', multiline: true }),
        intro: fields.text({ label: 'Intro', multiline: true }),
        serie: fields.array(
          fields.object({
            nome: fields.text({ label: 'Nome serie' }),
            descrizione: fields.text({ label: 'Descrizione', multiline: true }),
          }),
          { label: 'Le serie', itemLabel: (p) => p.fields.nome.value }
        ),
      },
    }),

    // ------------------------------------------------------------------ IMPOSTAZIONI (sito)
    impostazioni: singleton({
      label: 'Impostazioni sito',
      path: 'src/content/pagine/impostazioni',
      format: { data: 'json' },
      schema: {
        email: fields.text({ label: 'Email di contatto' }),
        citta: fields.text({ label: 'Città (footer)' }),
        footerTagline: fields.text({ label: 'Footer — tagline' }),
        instagram: fields.text({ label: 'Instagram URL' }),
        pinterest: fields.text({ label: 'Pinterest URL' }),
        linkedin: fields.text({ label: 'LinkedIn URL' }),
      },
    }),
  },
  collections: {
    // ------------------------------------------------------------------ PROGETTI
    progetti: collection({
      label: 'Progetti',
      slugField: 'titolo',
      path: 'src/content/progetti/*',
      format: { data: 'yaml', contentField: 'body' },
      schema: {
        titolo: fields.slug({ name: { label: 'Titolo' } }),
        categoria: fields.select({
          label: 'Categoria',
          options: [
            { label: 'Residenziale', value: 'residenziale' },
            { label: 'Horeca', value: 'horeca' },
          ],
          defaultValue: 'residenziale',
        }),
        luogo: fields.text({ label: 'Luogo' }),
        anno: fields.text({ label: 'Anno' }),
        tipo: fields.text({ label: 'Tipo' }),
        mq: fields.text({ label: 'Superficie (mq)' }),
        ruolo: fields.text({ label: 'Ruolo (il mio ruolo nel progetto)' }),
        linea: fields.text({ label: 'Linea (il concept in una frase)', multiline: true }),
        problema: fields.text({ label: 'Il problema (vincolo di partenza, 2–3 righe)', multiline: true }),
        concept: fields.array(fields.text({ label: 'Paragrafo', multiline: true }), {
          label: 'Concept',
          itemLabel: (props) => props.value?.slice(0, 60) || 'Paragrafo',
        }),
        natura: fields.array(
          fields.object({
            k: fields.text({ label: 'Chiave (k)', description: 'Es. La luce, Materiali, Il dettaglio' }),
            t: fields.text({ label: 'Testo (t)', multiline: true }),
          }),
          {
            label: 'La natura del progetto',
            itemLabel: (props) => props.fields.k.value || 'Blocco',
          }
        ),
        tono: fields.select({ label: 'Tono segnaposto', options: [...TONO_OPTIONS], defaultValue: 'stone' }),
        cover: fields.image({
          label: 'Cover',
          directory: 'public/img/progetti',
          publicPath: '/img/progetti/',
        }),
        gallery: fields.array(
          fields.image({
            label: 'Immagine',
            directory: 'public/img/progetti',
            publicPath: '/img/progetti/',
          }),
          { label: 'Gallery', itemLabel: (props) => props.value?.filename || 'Immagine' }
        ),
        ordine: fields.integer({ label: 'Ordine', defaultValue: 99 }),
        body: fields.markdoc({ label: 'Note (corpo)' }),
      },
    }),

    // ------------------------------------------------------------------ JOURNAL
    journal: collection({
      label: 'Journal',
      slugField: 'titolo',
      path: 'src/content/journal/*',
      format: { data: 'yaml', contentField: 'body' },
      schema: {
        titolo: fields.slug({ name: { label: 'Titolo' } }),
        bozza: fields.checkbox({ label: 'Bozza (non pubblicata sul sito)', defaultValue: false }),
        serie: fields.select({
          label: 'Serie',
          options: [
            { label: 'Guide', value: 'guide' },
            { label: 'Anatomia di un posto', value: 'anatomia' },
            { label: 'Storia dell’oggetto', value: 'oggetti' },
            { label: 'Lifestyle', value: 'lifestyle' },
          ],
          defaultValue: 'guide',
        }),
        luogo: fields.text({ label: 'Luogo' }),
        data: fields.date({ label: 'Data' }),
        estratto: fields.text({ label: 'Estratto', multiline: true }),
        tono: fields.select({ label: 'Tono segnaposto', options: [...TONO_OPTIONS], defaultValue: 'stone' }),
        cover: fields.image({
          label: 'Cover',
          directory: 'public/img/journal',
          publicPath: '/img/journal/',
        }),
        indirizzi: fields.array(
          fields.object({
            label: fields.text({ label: 'Etichetta' }),
            url: fields.url({ label: 'URL (link affiliato)' }),
            tipo: fields.select({
              label: 'Tipo',
              options: [
                { label: 'Hotel', value: 'hotel' },
                { label: 'Oggetto', value: 'oggetto' },
                { label: 'Luogo', value: 'luogo' },
                { label: 'Esperienza', value: 'esperienza' },
                { label: 'Store', value: 'store' },
              ],
              defaultValue: 'luogo',
            }),
            nota: fields.text({ label: 'Nota' }),
          }),
          {
            label: 'Indirizzi & link del racconto',
            itemLabel: (props) => props.fields.label.value || 'Link',
          }
        ),
        ordine: fields.integer({ label: 'Ordine', defaultValue: 99 }),
        body: fields.markdoc({ label: 'Corpo' }),
      },
    }),

    // ------------------------------------------------------------------ COLLEZIONE
    collezione: collection({
      label: 'Collezione',
      slugField: 'nome',
      path: 'src/content/collezione/*',
      format: { data: 'yaml', contentField: 'body' },
      schema: {
        nome: fields.slug({ name: { label: 'Nome' } }),
        categoria: fields.select({
          label: 'Categoria',
          options: [
            { label: 'Oggetto d’arredo', value: 'oggetto' },
            { label: 'Opera d’arte', value: 'arte' },
          ],
          defaultValue: 'oggetto',
        }),
        autore: fields.text({ label: 'Autore / Designer' }),
        provenienza: fields.text({ label: 'Provenienza' }),
        anno: fields.text({ label: 'Anno' }),
        storia: fields.text({ label: 'Breve storia', multiline: true }),
        tono: fields.select({ label: 'Tono segnaposto', options: [...TONO_OPTIONS], defaultValue: 'stone' }),
        // --- campi shop (nascosti sul sito, pronti per la vendita) ---
        prezzo: fields.integer({ label: 'Prezzo', description: 'Campo shop — non mostrato sul sito' }),
        valuta: fields.text({ label: 'Valuta', defaultValue: 'EUR' }),
        disponibile: fields.checkbox({ label: 'Disponibile', defaultValue: false }),
        cover: fields.image({
          label: 'Cover',
          directory: 'public/img/collezione',
          publicPath: '/img/collezione/',
        }),
        ordine: fields.integer({ label: 'Ordine', defaultValue: 99 }),
        body: fields.markdoc({ label: 'Note (corpo)' }),
      },
    }),

    // ------------------------------------------------------------------ PAGINE (page-builder)
    pagine: collection({
      label: 'Pagine (nuove)',
      slugField: 'titolo',
      path: 'src/content/pagine-libere/*',
      format: { data: 'yaml' },
      schema: {
        titolo: fields.slug({ name: { label: 'Titolo pagina' } }),
        descrizione: fields.text({ label: 'Descrizione (SEO)' }),
        blocchi: fields.blocks(
          {
            testo: {
              label: 'Testo',
              schema: fields.object({
                eyebrow: fields.text({ label: 'Eyebrow' }),
                titolo: fields.text({ label: 'Titolo' }),
                corpo: fields.text({ label: 'Corpo', multiline: true }),
              }),
            },
            banda: {
              label: 'Banda scura',
              schema: fields.object({
                eyebrow: fields.text({ label: 'Eyebrow' }),
                titolo: fields.text({ label: 'Titolo (*accento*)' }),
                testo: fields.text({ label: 'Testo', multiline: true }),
                immagine: fields.image({ label: 'Foto di sfondo (opzionale)', directory: 'public/img/pagine', publicPath: '/img/pagine/' }),
                ctaLabel: fields.text({ label: 'CTA — etichetta' }),
                ctaHref: fields.text({ label: 'CTA — link' }),
              }),
            },
            immagineTesto: {
              label: 'Immagine + testo',
              schema: fields.object({
                titolo: fields.text({ label: 'Titolo' }),
                testo: fields.text({ label: 'Testo', multiline: true }),
                immagine: fields.image({ label: 'Immagine', directory: 'public/img/pagine', publicPath: '/img/pagine/' }),
                etichetta: fields.text({ label: 'Etichetta segnaposto (se senza immagine)' }),
                lato: fields.select({
                  label: 'Lato immagine',
                  options: [
                    { label: 'Sinistra', value: 'sinistra' },
                    { label: 'Destra', value: 'destra' },
                  ],
                  defaultValue: 'sinistra',
                }),
              }),
            },
            cta: {
              label: 'CTA',
              schema: fields.object({
                titolo: fields.text({ label: 'Titolo (*accento*)' }),
                ctaLabel: fields.text({ label: 'Bottone' }),
                ctaHref: fields.text({ label: 'Link' }),
              }),
            },
            galleria: {
              label: 'Galleria',
              schema: fields.object({
                immagini: fields.array(
                  fields.image({ label: 'Immagine', directory: 'public/img/pagine', publicPath: '/img/pagine/' }),
                  { label: 'Immagini', itemLabel: (p) => p.value?.filename || 'Immagine' }
                ),
              }),
            },
          },
          { label: 'Blocchi' }
        ),
      },
    }),
  },
});
