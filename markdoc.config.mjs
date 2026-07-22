import { defineMarkdocConfig, nodes, component } from '@astrojs/markdoc/config';

// Config Markdoc per i contenuti editati da Keystatic (.mdoc).
// Override del nodo link: i link esterni ricevono rel="sponsored…" (affiliati),
// coerente col rehype plugin usato per i .md.
export default defineMarkdocConfig({
  nodes: {
    link: {
      ...nodes.link,
      render: component('./src/components/MarkdocLink.astro'),
    },
  },
});
