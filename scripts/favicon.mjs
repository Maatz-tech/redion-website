/**
 * Gera o favicon a partir do traçado da asa do próprio logotipo — quadrado
 * vermelho de cantos arredondados com a asa em branco, como o cliente pediu.
 *
 *   node scripts/favicon.mjs
 *
 * Reaproveitar o path do logo (em vez de redesenhar) garante que a asa é
 * exatamente a da marca. A bbox vem do `getBBox()` do Chromium, que considera
 * as curvas de verdade — estimar pelos números do `d` erra o centro.
 *
 * Sai: public/favicon.svg, public/favicon-32.png, public/apple-touch-icon.png
 */
import { chromium } from 'playwright';
import { readFile, writeFile } from 'node:fs/promises';

const LOGO = 'public/images/brand/redion-dark.svg';
const VERMELHO = '#C21C17'; // o mesmo da asa no logotipo
const LADO = 512; // canvas do SVG
const RAIO = 116; // ~22.7% do lado, o arredondamento do ícone enviado
const OCUPACAO = 0.62; // quanto da largura do ícone a asa ocupa

const svgLogo = await readFile(LOGO, 'utf8');
const asa = svgLogo.match(/<path[^>]*fill="#C21C17"[^>]*\/>/)?.[0];
if (!asa) throw new Error('não achei o path da asa no logotipo');
const d = asa.match(/ d="([^"]*)"/)[1];

const navegador = await chromium.launch();
const pagina = await navegador.newPage();
await pagina.setContent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 186 32"><path id="asa" d="${d}"/></svg>`
);
const bbox = await pagina.evaluate(() => {
  const { x, y, width, height } = document.querySelector('#asa').getBBox();
  return { x, y, width, height };
});
console.log('bbox da asa:', bbox);

// escala e translada a asa para o centro do quadrado
const escala = (LADO * OCUPACAO) / bbox.width;
const tx = LADO / 2 - (bbox.x + bbox.width / 2) * escala;
const ty = LADO / 2 - (bbox.y + bbox.height / 2) * escala;

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LADO} ${LADO}">
  <rect width="${LADO}" height="${LADO}" rx="${RAIO}" fill="${VERMELHO}"/>
  <path transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${escala.toFixed(4)})" d="${d}" fill="#fff"/>
</svg>
`;
await writeFile('public/favicon.svg', favicon);

// rasteriza os fallbacks (o Chromium é o renderizador; PIL não lê SVG)
//
// O apple-touch-icon vai FULL-BLEED e opaco de propósito: o iOS aplica a
// própria máscara de cantos e, com transparência, preenche o resto de preto.
const semCantos = favicon.replace(`rx="${RAIO}" `, '');

for (const [arquivo, tamanho, fonte, opaco] of [
  ['public/favicon-32.png', 32, favicon, false],
  ['public/apple-touch-icon.png', 180, semCantos, true],
]) {
  const p = await navegador.newPage({ viewport: { width: tamanho, height: tamanho } });
  await p.setContent(
    `<style>html,body{margin:0;padding:0;background:${opaco ? VERMELHO : 'transparent'}}svg{display:block}</style>` +
      fonte.replace('<svg ', `<svg width="${tamanho}" height="${tamanho}" `)
  );
  await p.screenshot({ path: arquivo, omitBackground: !opaco });
  await p.close();
  console.log('gerado', arquivo, `${tamanho}×${tamanho}`, opaco ? '(opaco, sem cantos)' : '(transparente)');
}

await navegador.close();
