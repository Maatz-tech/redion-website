// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/**
 * PRODUÇÃO (build local → upload manual do `dist/` na Hostinger):
 * https://traineeredion2026.com.br, servido na raiz. É o que `npm run build`
 * gera — `site` alimenta canonical, OG, JSON-LD e sitemap, que precisam de URL
 * absoluta.
 *
 * PREVIEW (build da Action): o GitHub Pages serve um repo de projeto em
 * /<repo>/, então lá o par site/base continua apontando para
 * maatz-tech.github.io/redion-website/. O workflow ainda roda a cada push na
 * main e o preview vai com `PREVIEW_NOINDEX`, para não competir com o domínio
 * final nos índices de busca.
 *
 * Não unificar os dois: foi exatamente o que quebrou em 03/08/2026 (abc9b38 →
 * revertido em af8b64a). Com `base: '/'` no Pages, todo asset dá 404.
 */
const ehPreviewPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: ehPreviewPages ? 'https://maatz-tech.github.io' : 'https://traineeredion2026.com.br',
  base: ehPreviewPages ? '/redion-website/' : '/',
  // 30 KB de CSS (7 KB gzip) inline saem do caminho crítico de render
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
