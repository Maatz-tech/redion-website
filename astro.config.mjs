// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/**
 * O GitHub Pages serve um repo de projeto em /<repo>/, então o `base` só é
 * aplicado no build da Action. Local e dev rodam na raiz ('/'), igual ao que
 * vai valer no domínio final.
 *
 * TODO: quando o domínio final for definido (ver PROJECT.md), trocar `site`
 * pelo domínio e remover o par site/base do preview.
 */
const ehPreviewPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: ehPreviewPages ? 'https://maatz-tech.github.io' : 'https://exemplo.com.br',
  base: ehPreviewPages ? '/redion-website/' : '/',
  // 30 KB de CSS (7 KB gzip) inline saem do caminho crítico de render
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
