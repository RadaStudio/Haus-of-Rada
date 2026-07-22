import { config, fields, collection } from '@keystatic/core';

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
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Haus of Rada' },
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
        linea: fields.text({ label: 'Linea', multiline: true }),
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
  },
});
