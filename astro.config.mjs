// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// Rehype plugin (senza dipendenze): marca i link esterni del corpo articolo
// come affiliati — target _blank + rel="sponsored nofollow noopener noreferrer".
// Sostiene il modello "earning per click" del Journal in modo SEO-corretto.
function affiliateExternalLinks() {
  return (tree) => {
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'a') {
        const href = String(node.properties?.href ?? '');
        if (/^https?:\/\//i.test(href)) {
          node.properties.target = '_blank';
          node.properties.rel = ['sponsored', 'nofollow', 'noopener', 'noreferrer'];
          node.properties.className = [...(node.properties.className ?? []), 'ext-link'];
          node.properties['data-affiliate'] = 'true';
        }
      }
      if (Array.isArray(node.children)) node.children.forEach(walk);
    };
    walk(tree);
  };
}

// Portfolio + journal editoriale: build statica (output: 'static'), servita da Vercel.
// Keystatic inietta da sé le rotte server (/keystatic + /api/keystatic) come
// on-demand: con l'adapter Vercel funzionano anche in output static.
// React island per i filtri di Progetti/Journal; Markdoc per i contenuti editati da Keystatic.
export default defineConfig({
  site: 'https://haus-of-rada.com',
  integrations: [react(), markdoc(), keystatic()],
  adapter: vercel(),
  markdown: {
    rehypePlugins: [affiliateExternalLinks],
  },
});
