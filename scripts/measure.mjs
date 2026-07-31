/** Mede a altura de cada seção no viewport dado — para comparar com o Figma. */
import { chromium } from 'playwright';
const [url, width] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: Number(width), height: 900 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.evaluate(() => document.querySelector('astro-dev-toolbar')?.remove());
const out = await p.evaluate(() =>
  [...document.querySelectorAll('header, main > *, main > * + div, footer')].map((el) => {
    const r = el.getBoundingClientRect();
    return `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}  y=${Math.round(r.top + scrollY)}  h=${Math.round(r.height)}`;
  })
);
console.log(out.join('\n'));
console.log('TOTAL', await p.evaluate(() => document.body.scrollHeight));
await b.close();
