// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/**
 * Domínio final definido em 03/08/2026. Com domínio próprio o GitHub Pages
 * serve na RAIZ, então o `base` volta a ser '/' também no build da Action —
 * o par site/base de preview (maatz-tech.github.io/redion-website/) saiu.
 *
 * O `public/CNAME` é o que mantém o domínio na publicação por Action: o
 * deploy sobe o conteúdo de `dist/`, e sem esse arquivo no artefato o Pages
 * perde a configuração de domínio customizado.
 *
 * `site` alimenta canonical, OG e sitemap — os três precisam de URL absoluta.
 */
export default defineConfig({
  site: 'https://traineeredion2026.com.br',
  base: '/',
  // 30 KB de CSS (7 KB gzip) inline saem do caminho crítico de render
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
