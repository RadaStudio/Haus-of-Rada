// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
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

// Portfolio + journal editoriale: build statica, servita da Vercel.
// React island solo dove serve interattività (i filtri di Progetti/Journal).
export default defineConfig({
  site: 'https://hausofrada.com',
  integrations: [react()],
  adapter: vercel(),
  markdown: {
    rehypePlugins: [affiliateExternalLinks],
  },
});
