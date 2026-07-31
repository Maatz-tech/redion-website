/**
 * Screenshot local para comparação pixel-perfect com o Figma (Fase 4.3).
 *
 *   node scripts/shot.mjs <url> <width> <out.png> [selector]
 *
 * Sem selector: captura a página inteira.
 * Com selector: captura só aquele elemento (ex.: "header", "footer").
 */
import { chromium } from 'playwright';

const [url, width, out, selector] = process.argv.slice(2);

if (!url || !width || !out) {
  console.error('uso: node scripts/shot.mjs <url> <width> <out.png> [selector]');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Number(width), height: 900 },
  deviceScaleFactor: 2,
});

await page.goto(url, { waitUntil: 'networkidle' });
// deixa a fonte assentar antes de fotografar
await page.evaluate(() => document.fonts.ready);
// o dev toolbar do Astro injeta <header>/<footer> próprios — fora daqui
await page.evaluate(() => document.querySelector('astro-dev-toolbar')?.remove());

// Reveals de scroll não disparam num fullPage screenshot: força o estado final
// para a comparação com o Figma refletir a página "assentada".
await page.evaluate(() => {
  document.documentElement.classList.remove('js');
  for (const el of document.querySelectorAll(
    '[data-reveal],[data-reveal-x],[data-reveal-stagger] > *,[data-palavra]'
  )) {
    el.style.opacity = '1';
    el.style.filter = 'none';
    el.style.transform = 'none';
  }
  // as linhas só precisam do scaleX final — a opacidade delas é estado de design
  for (const el of document.querySelectorAll('[data-draw-line]')) el.style.transform = 'none';
});
// imagens `lazy` fora da viewport não carregam num fullPage: força tudo
await page.evaluate(async () => {
  const imgs = [...document.images];
  for (const i of imgs) i.loading = 'eager';
  await Promise.all(
    imgs.map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r))))
  );
});
await page.waitForTimeout(300);

const target = selector ? page.locator(selector) : page;
await target.screenshot({ path: out, ...(selector ? {} : { fullPage: true }) });

await browser.close();
console.log(`✓ ${out}`);
