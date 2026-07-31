/**
 * Servidor estático mínimo que monta `dist/` num subcaminho, para testar
 * localmente o build do GitHub Pages (que serve o repo em /<repo>/).
 *
 *   GITHUB_ACTIONS=true PREVIEW_NOINDEX=true npm run build
 *   node scripts/serve-base.mjs dist /redion-website 4397
 *
 * Sem isso, um caminho absoluto esquecido (ex.: /images/...) só apareceria
 * quebrado depois do deploy.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const [raiz = 'dist', prefixo = '/redion-website', porta = '4397'] = process.argv.slice(2);

const TIPOS = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

createServer(async (req, res) => {
  let caminho = decodeURIComponent(req.url.split('?')[0]);

  if (!caminho.startsWith(prefixo)) {
    res.writeHead(404).end(`fora do prefixo ${prefixo}: ${caminho}`);
    return;
  }

  caminho = caminho.slice(prefixo.length) || '/';
  if (caminho.endsWith('/')) caminho += 'index.html';

  try {
    const conteudo = await readFile(join(raiz, normalize(caminho)));
    res
      .writeHead(200, { 'content-type': TIPOS[extname(caminho)] ?? 'application/octet-stream' })
      .end(conteudo);
  } catch {
    res.writeHead(404).end(`404 ${caminho}`);
  }
}).listen(Number(porta), () => {
  console.log(`servindo ${raiz} em http://localhost:${porta}${prefixo}/`);
});
