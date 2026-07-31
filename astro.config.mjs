// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// TODO: trocar `site` pelo domínio final (ver PROJECT.md) — o sitemap, o
// canonical e as tags OG saem daqui.
export default defineConfig({
  site: 'https://exemplo.com.br',
  // 30 KB de CSS (7 KB gzip) inline saem do caminho crítico de render
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
