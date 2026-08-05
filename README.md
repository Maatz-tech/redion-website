# LP Programa Trainee Redion 2026

Landing page single-page em **Astro 5 + Tailwind CSS v4**, construída a partir do
Figma `qI2WSiTIULZ0kUdd5c2z8W`. Animações em **Framer Motion** (pacote `motion`),
API vanilla — zero React, zero hidratação.

- **Decisões, medições, mapa de animações e pendências:** [`PROJECT.md`](./PROJECT.md)
- **Processo de trabalho:** [`PLAYBOOK.md`](./PLAYBOOK.md)

## Comandos

| Comando | O que faz |
| :--- | :--- |
| `npm install` | Instala as dependências |
| `npm run dev` | Sobe o dev server em `localhost:4321` |
| `npm run build` | Gera o site estático em `./dist/` |
| `npm run preview` | Serve o build (use este para rodar Lighthouse) |

## Ferramentas de verificação

```sh
# screenshot de página inteira (força reveals e imagens lazy)
node scripts/shot.mjs http://localhost:4321/ 1440 docs/local/desktop.png
node scripts/shot.mjs http://localhost:4321/ 375  docs/local/mobile.png

# altura de cada seção, para comparar com o Figma
node scripts/measure.mjs http://localhost:4321/ 1440

# regera favicon.svg + favicon-32.png + apple-touch-icon.png a partir do
# traçado da asa em images/brand/redion-dark.svg
node scripts/favicon.mjs
```

Referências do Figma ficam em `docs/reference/`, capturas do build em `docs/local/`.

```sh
# serve o build como ele sai no ar (domínio próprio = raiz)
npm run build
node scripts/serve-base.mjs dist / 4397

# simula o preview do GitHub Pages (que serve o repo em /redion-website/)
GITHUB_ACTIONS=true PREVIEW_NOINDEX=true npm run build
node scripts/serve-base.mjs dist /redion-website 4397
```

Rode isso sempre que adicionar um asset: um caminho absoluto esquecido
(`/images/...` em vez de `${import.meta.env.BASE_URL}images/...`) funciona na
raiz e só quebra no preview em subcaminho.

## Estrutura

```text
src/
├── components/
│   ├── sections/        uma seção da página por arquivo
│   ├── icons/figma.ts   ícones exportados do Figma
│   ├── Accordion.astro  acordeão reusado em Programa e Benefícios
│   ├── Button.astro     variantes primary / outline / pill
│   ├── Icon.astro       único ponto de entrada de SVG
│   └── RevealText.astro título que entra palavra a palavra
├── data/
│   ├── site.ts          nav, links legais, URLs de CTA
│   └── conteudo.ts      textos das seções
├── layouts/Base.astro   head, SEO, JSON-LD, skip link
├── lib/motion.ts        tokens e helpers de animação
├── pages/index.astro    monta as seções
└── styles/global.css    tokens @theme + utilitárias semânticas
```

Regra: cor, fonte e tipografia moram em `global.css`. Nenhum hex hard-coded em
componente.

## Deploy

**Produção — https://traineeredion2026.com.br (Hostinger, manual):**

```sh
npm run build   # dist/ já sai com o domínio em canonical, OG, JSON-LD e sitemap
```

Subir o **conteúdo** de `dist/` (não a pasta) na raiz pública do domínio —
`public_html/` no File Manager ou FTP da Hostinger. É um site estático: não há
build, runtime nem redirect a configurar do lado do servidor.

**Preview — https://maatz-tech.github.io/redion-website/:**
`.github/workflows/deploy.yml` publica no GitHub Pages a cada push na `main`
(mesmo workflow dos projetos irmãos da org). O Pages serve o repo num
subcaminho, então lá o `astro.config.mjs` usa o par `site`/`base` de preview e o
workflow passa `PREVIEW_NOINDEX=true` — o preview sai com `<meta name="robots"
content="noindex">` para não competir com o domínio nos índices de busca.

Os dois builds convivem no mesmo `astro.config.mjs`, separados pelo
`GITHUB_ACTIONS`. Não unificar: com `base: '/'` no Pages todo asset dá 404
(aconteceu em 03/08/2026, commit revertido).

## Antes de publicar

Conferir as pendências listadas no fim do `PROJECT.md` — hoje só o LinkedIn da
Redion em `src/data/site.ts` e as respostas oficiais de três itens do FAQ.
