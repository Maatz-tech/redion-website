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
# abre http://localhost:4397/ e confere que nada dá 404
```

Rode isso sempre que adicionar um asset. O site já roda na raiz, mas continue
usando `${import.meta.env.BASE_URL}images/...` em vez de `/images/...`: é o que
deixa o `base` trocável (um preview em subcaminho, por exemplo) sem ter que
caçar caminho absoluto pelo projeto depois.

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

`.github/workflows/deploy.yml` publica no GitHub Pages a cada push na `main`
(mesmo workflow dos projetos irmãos da org). O site no ar é
**https://traineeredion2026.com.br**.

O domínio customizado depende do `public/CNAME`: o deploy sobe o conteúdo de
`dist/`, e sem esse arquivo no artefato o Pages perde a configuração no próximo
deploy. No repositório, Settings → Pages precisa ter o mesmo domínio e o DNS
apontando para o Pages.

Para subir um preview em subcaminho de novo, é só rodar o build com
`PREVIEW_NOINDEX=true` (o `Base.astro` ainda lê a variável) e devolver o par
`site`/`base` no `astro.config.mjs`.

## Antes de publicar

Resolver as pendências listadas no fim do `PROJECT.md` — principalmente o
domínio final em `astro.config.mjs` (alimenta canonical, OG e sitemap) e os
destinos dos CTAs em `src/data/site.ts`.
