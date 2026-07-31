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
```

Referências do Figma ficam em `docs/reference/`, capturas do build em `docs/local/`.

```sh
# simula o build do GitHub Pages (que serve o repo em /redion-website/)
GITHUB_ACTIONS=true PREVIEW_NOINDEX=true npm run build
node scripts/serve-base.mjs dist /redion-website 4397
# abre http://localhost:4397/redion-website/ e confere que nada dá 404
```

Rode isso sempre que adicionar um asset: um caminho absoluto esquecido
(`/images/...` em vez de `${import.meta.env.BASE_URL}images/...`) funciona local
e só quebra depois do deploy.

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
(mesmo workflow dos projetos irmãos da org). O preview sai em
**https://maatz-tech.github.io/redion-website/**, com `<meta name="robots"
content="noindex">` enquanto o domínio final não estiver definido.

Quando o domínio sair: trocar `site` no `astro.config.mjs`, remover o par
`site`/`base` de preview e tirar o `PREVIEW_NOINDEX` do workflow.

## Antes de publicar

Resolver as pendências listadas no fim do `PROJECT.md` — principalmente o
domínio final em `astro.config.mjs` (alimenta canonical, OG e sitemap) e os
destinos dos CTAs em `src/data/site.ts`.
