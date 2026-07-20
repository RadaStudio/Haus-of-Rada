import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Progetti d'interni — residenziale + horeca.
// Schema tipizzato con Zod. L'id dell'entry = nome del file (slug).
const progetti = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/progetti' }),
  schema: z.object({
    titolo: z.string(),
    categoria: z.enum(['residenziale', 'horeca']),
    luogo: z.string(),
    anno: z.string(),
    tipo: z.string(),
    mq: z.string(),
    linea: z.string(),
    concept: z.array(z.string()),
    natura: z.array(z.object({ k: z.string(), t: z.string() })),
    // tono del segnaposto fotografia finché mancano le foto reali
    tono: z.enum(['warm', 'green', 'amber', 'stone']).default('stone'),
    cover: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    ordine: z.number().default(99),
  }),
});

// Collezione — catalogo di oggetti d'arredo + opere d'arte.
// I campi shop (prezzo, valuta, disponibile) sono già previsti ma NON mostrati:
// oggi tutto è "prossimamente in vendita".
const collezione = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/collezione' }),
  schema: z.object({
    nome: z.string(),
    categoria: z.enum(['oggetto', 'arte']),   // oggetto d'arredo | opera d'arte
    autore: z.string(),                       // autore / designer
    provenienza: z.string(),
    anno: z.string().optional(),
    storia: z.string(),                        // breve storia
    tono: z.enum(['warm', 'green', 'amber', 'stone']).default('stone'),
    // --- campi pronti per lo shop futuro, nascosti in questa fase ---
    prezzo: z.number().optional(),
    valuta: z.string().default('EUR'),
    disponibile: z.boolean().default(false),
    cover: z.string().optional(),
    ordine: z.number().default(99),
  }),
});

// Journal — indice per serie (Task 4).
const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    titolo: z.string(),
    serie: z.enum(['guide', 'anatomia', 'oggetti', 'lifestyle']),
    luogo: z.string(),
    data: z.coerce.date(),
    estratto: z.string().optional(),
    tono: z.enum(['warm', 'green', 'amber', 'stone']).default('stone'),
    cover: z.string().optional(),
    // Indirizzi & link del racconto: hotel, oggetti, luoghi/esperienze.
    // Sono link affiliati (earning per click): resi con rel="sponsored".
    indirizzi: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
          tipo: z.enum(['hotel', 'oggetto', 'luogo', 'esperienza', 'store']).optional(),
          nota: z.string().optional(),
        })
      )
      .default([]),
    ordine: z.number().default(99),
  }),
});

export const collections = { progetti, collezione, journal };
