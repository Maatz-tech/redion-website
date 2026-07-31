# Playbook — Landing pages Astro + Tailwind a partir do Figma

Guia canônico para tocar um site do zero à entrega, usando este template como base. Segue a ordem. Só passa pra próxima fase quando a atual está fechada.

---

## Stack e princípios

- **Stack:** Astro 5 (static output) + Tailwind CSS v4 (`@theme` tokens em `src/styles/global.css`).
- **Animações:** **Framer Motion** (pacote `motion`) — ver Fase 6.5. É a biblioteca padrão do projeto para qualquer movimento não-trivial.
- **Fonte de verdade do design:** Figma via MCP (`get_design_context`, `get_screenshot`, `get_metadata`, `get_variable_defs`).
- **Arquitetura:** globals → componentes → seções → páginas. Página só monta seções, seção só compõe componentes.
- **Regra-mestre:** uma seção por vez. Não desenvolver duas em paralelo, não pular pra próxima antes da anterior ficar pixel-perfect.

---

## Modos de trabalho (LEIA ANTES DE COMEÇAR QUALQUER TAREFA)

O playbook completo (Fases 0→10) é para **construir uma seção nova do zero**. Rodar o processo inteiro para um ajuste de 3px é desperdício de tempo e tokens. Classifique a tarefa primeiro:

| Modo | Quando | O que roda |
|---|---|---|
| **🔧 Quick fix** | "aumenta o padding", "troca a cor", "esse texto tá errado", "sobe o botão", ajustes de 1 propriedade | Edit direto no arquivo. **Sem** screenshot, **sem** build, **sem** Figma, **sem** subagente, **sem** Lighthouse. Responder em 1–3 frases. |
| **🎯 Ajuste de seção** | "essa seção tá diferente do Figma", mudança de layout dentro de uma seção existente | Edit + 1 screenshot local do viewport afetado. Só puxa Figma se o gap for de spec, não de execução. |
| **🏗️ Seção nova** | Seção que ainda não existe | Loop completo da Fase 4. |
| **🚀 Pré-entrega** | Cliente vai receber | Fases 7→10 (SEO, Lighthouse, a11y, build). |

### Regras de economia de tokens

1. **Não reler arquivo que acabei de editar.** O Edit falha se não aplicar — não existe motivo pra verificar.
2. **Ler só o trecho relevante.** `Read` com `offset`/`limit` ou `Grep` para achar a linha antes de abrir 400 linhas de componente.
3. **Screenshot só quando muda geometria.** Cor, texto, `alt`, link → zero screenshot.
4. **`npm run build` só antes de entregar** ou quando mexeu em config/import/rota. Ajuste de CSS não quebra build.
5. **Lighthouse só na Fase 10** ou quando o usuário pedir. Nunca "de bônus".
6. **Dev server fica de pé.** Se `:4321` já responde, não derrubar e subir de novo a cada ajuste — Astro faz HMR.
7. **Assets do Figma se baixam uma vez.** Se o arquivo já está em `public/images/`, não rebaixar.
8. **Sem subagente para tarefa de 1 arquivo.** Subagente só quando a busca varre muitos arquivos e eu não sei onde está.
9. **Batch de ajustes.** Se o usuário listar 5 correções, aplicar as 5 e validar **uma vez** no final, não 5 ciclos.
10. **Resposta curta é entrega válida.** Não recapitular o que foi feito em bullet points se foi uma linha de CSS.

**Quando escalar de modo:** se durante um quick fix eu descobrir que a seção inteira está fora do design, eu **aviso e pergunto** antes de subir para o loop completo — não escalo por conta própria.

---

## Fase 0 — Kickoff / Design intake

Antes de escrever qualquer código, preencher no topo deste arquivo (ou criar `PROJECT.md`) o bloco abaixo:

```md
## Project meta
- Nome: <slug-do-projeto>
- fileKey Figma: <b7X4YhKqfFMnwDvCHju895>
- Home Desktop node: <5124:1016>
- Home Mobile node: <5125:1359>
- Outras páginas: <URLs Figma>
- Fonte(s): <Montserrat 300/500/600/700>
- Paleta base: <#a48550 gold, #273961 navy, #162546 navy-deep>
- Domínio final: <camaraenagib.adv.br>
```

Se algum campo estiver faltando, **pare e peça ao cliente/designer**. Não invente.

**Ações desta fase:**
1. Rodar `get_metadata` no node da home → salvar árvore para identificar Header/Footer/Sections e seus IDs.
2. Rodar `get_variable_defs` no node da home → extrair cores, fonts, tracking, line-heights.
3. Rodar `get_screenshot` na home desktop e mobile → salvar em `docs/reference/home-desktop.png` e `home-mobile.png` (referência para comparação).
4. Fazer inventário de assets (logos, ilustrações, fotos) e listar em `PROJECT.md`.

---

## Fase 1 — Setup

```bash
cp -R "astro-power-template - cópia" ../<nome-projeto>
cd ../<nome-projeto>
rm -rf node_modules .astro dist
# Editar package.json: campo "name"
npm install
npm run dev  # sanity check, deve subir em :4321
```

**Checklist de saída:**
- [ ] `package.json` renomeado.
- [ ] `npm run dev` sobe sem warning.
- [ ] `npm run build` termina sem erro.

---

## Fase 2 — Design tokens

Editar `src/styles/global.css` — nunca hard-codar cor/fonte fora daqui.

```css
@import "tailwindcss";

@theme {
  /* Brand — mapear 1:1 com get_variable_defs do Figma */
  --color-<brand>: #hex;
  --color-<brand>-10: rgba(..., 0.1);

  /* Superficies neutras (fundos, bordas) */
  --color-navy: #hex;
  --color-navy-deep: #hex;

  /* Camadas "on-dark" (textos sobre fundo escuro do footer/CTA) */
  --color-on-dark-70: rgba(255,255,255,0.7);
  --color-on-dark-40: rgba(255,255,255,0.4);
  --color-on-dark-10: rgba(255,255,255,0.1);

  /* Tipografia */
  --font-sans: "<Family>", ui-sans-serif, system-ui, sans-serif;

  /* Letter spacings — copiar do Figma */
  --tracking-tightest: -1.5px;
  --tracking-widest: 3.6px;
}
```

Definir também **classes utilitárias semânticas** (não repetir font-size/weight nas seções):

```css
.eyebrow { /* small caps colorido acima do heading */ }
.h1 / .h2 / .h3 / .h4 { /* escala de headings do Figma */ }
.body / .body-lg / .body-sm { /* body copy */ }
.btn / .btn-primary / .btn-outline / .btn-sm|md|lg { /* botões */ }
```

**Regra:** se apareceu duas vezes no design com o mesmo estilo, é utilitária semântica. Nunca duplique tokens em componentes.

`src/layouts/Base.astro` recebe o import da fonte (Google Fonts com preconnect) e os metas de SEO globais.

**Checklist:**
- [ ] Todas cores do `get_variable_defs` mapeadas.
- [ ] Todas variações de peso da fonte importadas (não mais do que o necessário).
- [ ] Escala de headings/body definida em CSS, não em Tailwind spray.

---

## Fase 3 — Componentes globais

Nesta ordem, um por vez, cada um em `src/components/`:

1. **Header** — logo, nav, CTA, menu mobile (hamburger com aria-expanded).
2. **Footer** — colunas (Brand, Nav, Serviços, Contato) + bottom bar. Stack no mobile.
3. **Button** — variantes (primary/outline/ghost) e tamanhos (sm/md/lg), como componente `.astro` que aceita `href` ou `as="button"`.
4. **Badge / Eyebrow** — pill colorida acima do heading.
5. **SectionHeader** — `<Eyebrow>` + `<h2>` + subtítulo opcional. Reutilizado em quase toda seção.
6. **Icon** — wrapper para SVGs em `src/components/icons/` (ver Fase 6, regra SVG).

Cada componente deve:
- Aceitar props tipadas (`interface Props`).
- Ter defaults sensatos.
- Usar utilitárias semânticas (`.h2`, `.body`) e tokens (`text-navy`, `bg-gold`).
- Ser responsivo (breakpoints `md:` e `lg:` conforme Figma).

**Só passar pra Fase 4 quando Header e Footer estiverem pixel-perfect** — eles aparecem em todas as páginas, um bug aqui contamina o site inteiro.

---

## Fase 4 — Loop de seções (o coração do trabalho)

Para **cada seção** do Figma, executar o loop abaixo. Não pular etapas.

### 4.1 Coleta

1. Abrir o node da seção no Figma, copiar a URL, extrair `nodeId`.
2. Chamar `mcp__claude_ai_Figma__get_design_context` com o `nodeId` → código de referência (React+Tailwind), lista de assets.
3. Chamar `mcp__claude_ai_Figma__get_screenshot` com o mesmo `nodeId` → salvar em `docs/reference/<slug-secao>-desktop.png`.
4. Repetir 2 e 3 para o node mobile equivalente → `<slug-secao>-mobile.png`.
5. Baixar assets referenciados (imagens, ilustrações) via curl das URLs `figma.com/api/mcp/asset/...` → `public/images/<slug-secao>/*.webp` (converter, ver Fase 6).

### 4.2 Implementação

- Criar `src/components/sections/<PascalNameSection>.astro`.
- Traduzir o código React de referência para Astro:
  - Remover `data-node-id` (Figma noise).
  - Trocar tokens `var(--color/orange/48)` pelos tokens do projeto (`text-gold`, `bg-navy-deep`).
  - Usar utilitárias semânticas em vez de reimplementar tipografia.
  - Sub-elementos repetidos (cards, itens de lista com ícone) viram sub-componentes em `src/components/` — nunca copiar-colar 3× a mesma estrutura.
- Montar a seção na página (ex.: `src/pages/index.astro`).

### 4.3 Comparação pixel-perfect

Este é o passo que separa "quase pronto" de entrega.

1. Subir dev server (`npm run dev`).
2. Abrir a página no viewport correspondente (desktop 1440 / mobile 375).
3. Tirar screenshot local (comando abaixo) e abrir lado a lado com `docs/reference/<slug-secao>-desktop.png`.
4. Auditar em ordem:
   - **Layout / spacing** — paddings, gaps, margens (usar régua ou overlay).
   - **Tipografia** — font-size, line-height, letter-spacing, weight.
   - **Cores** — sempre pelo hex exato do token.
   - **Border-radius, sombras, blur** — copiar valores do Figma.
   - **Imagens** — aspect ratio, object-fit.
   - **Estados interativos** — hover, focus, active (o Figma às vezes esconde; conferir com designer se dúvida).
5. Ajustar → recarregar → recomparar. **Iterar até dif visual < ~3px em spacing e cores idênticas.**
6. Testar mobile no mesmo loop.

Comando de screenshot local (headless):

```bash
# instalação uma vez por projeto
npm install -D playwright
npx playwright install chromium

# script em scripts/shot.mjs (criar no primeiro uso)
node scripts/shot.mjs http://localhost:4321#<hash-secao> 1440 docs/local/<slug>-desktop.png
node scripts/shot.mjs http://localhost:4321#<hash-secao> 375  docs/local/<slug>-mobile.png
```

### 4.4 Fecho da seção

Antes de marcar como concluída:

- [ ] Screenshots desktop e mobile validados contra Figma.
- [ ] Sem estilos hard-coded (tudo via tokens/utilitárias).
- [ ] Nenhum sub-elemento duplicado — extraído se aparece 2+ vezes.
- [ ] Textos revisados (typos, acentuação).
- [ ] Links reais ou placeholders `#` marcados como TODO.
- [ ] `npm run build` ainda passa.

**Só então** pegar a próxima seção.

---

## Fase 5 — Páginas internas

Repetir Fases 4 para cada rota (`/sobre`, `/blog`, `/contato`). Muitas seções já vão existir como componentes — importar direto. Novas seções específicas ficam em `src/components/sections/` também.

Rotas devem ficar em `src/pages/<slug>.astro`. Para conjuntos grandes (blog), usar Content Collections (`src/content/`).

---

## Fase 6 — Regras de código (aplicar durante todo o desenvolvimento)

### SVG
- **Ícones reutilizáveis**: arquivo em `src/components/icons/<Nome>.astro` (SVG inline dentro do componente, com `currentColor` para herdar cor). NUNCA colar SVG cru dentro de uma seção.
- **Assets estáticos** (logos, ilustrações complexas): `public/images/*.svg` referenciado via `<img src="/images/...">`.
- Nunca deixar SVG do Figma com atributos `<title>`, `<desc>`, ou classes geradas automaticamente — limpar antes.

### Imagens
- Todo raster vira **WebP** (fallback JPG só se necessário para compatibilidade específica). Converter no download:
  ```bash
  cwebp -q 82 input.png -o output.webp
  ```
- Usar `astro:assets` (`import { Image } from 'astro:assets'`) para imagens locais — gera formatos e tamanhos automaticamente.
- `loading="lazy"` em tudo abaixo do fold; `loading="eager"` + `fetchpriority="high"` só no LCP.
- `width` e `height` sempre presentes (evita CLS).
- `alt` obrigatório: descritivo se contextual, `alt=""` se decorativa.

### CSS / Tailwind
- Tokens `@theme` são a única fonte de cores/fontes. Zero hex hard-coded em componentes.
- Classes utilitárias semânticas (`.h2`, `.body`, `.eyebrow`) antes de duplicar `text-[36px] font-bold leading-10 ...`.
- Responsivo por breakpoint (`md:` = 768px+ padrão Tailwind, `lg:` = 1024, `xl:` = 1280). Alinhar com breakpoints do Figma.

### DRY
- Se aparece 2 vezes: extrair componente.
- Se aparece 3 vezes com pequenas variações: componente com props.
- Se aparece em duas páginas: promover a `src/components/` (fora de `sections/`).
- Listas de nav, serviços, contato: definir uma vez (idealmente em `src/content/` ou `src/data/`), importar onde precisa.

### JS
- Preferir CSS/HTML nativo antes de JS para **interação**: `<details>`, `:has()`, `:focus-within`, scroll-snap, container queries.
- Se precisar JS: componente `<script>` inline no `.astro`, escopo do componente.
- **Animação é exceção à regra:** usar Framer Motion (Fase 6.5), não escrever tween na mão.
- Nada de bibliotecas grandes (jQuery, Alpine full, GSAP) sem necessidade real.

---

## Fase 6.5 — Animações (Framer Motion)

**Framer Motion é o padrão do projeto.** Nada de `@keyframes` na mão para entradas/scroll/carrossel, nada de GSAP, nada de `requestAnimationFrame` custom.

### Instalação

```bash
npm install motion
```

O pacote `motion` é o Framer Motion moderno. Ele expõe duas APIs:

- **`motion` (vanilla)** — funciona em Astro puro, dentro de `<script>`, **zero React, zero hidratação**. É o padrão.
- **`motion/react`** — só quando a animação depende de estado de componente React (ex.: `AnimatePresence` em modal, carrossel com layout animation). Aí sim vira ilha `client:visible`.

**Regra:** comece sempre no vanilla. Só suba pra ilha React se o vanilla não resolver — e justifique no PR/commit.

### Vanilla dentro de um `.astro`

```astro
<section data-hero>
  <h1 data-anim="fade-up">Título</h1>
</section>

<script>
  import { animate, inView, stagger } from "motion";

  // entrada no viewport
  inView("[data-anim='fade-up']", (el) => {
    animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
  }, { amount: 0.3 });

  // lista com stagger
  animate("[data-stagger] > *", { opacity: [0, 1], y: [16, 0] }, { delay: stagger(0.08) });
</script>
```

### Ilha React (só quando necessário)

```bash
npx astro add react
```

```astro
<HeroCarousel client:visible slides={slides} />
```

```tsx
import { motion, AnimatePresence } from "motion/react";
// AnimatePresence exige React — este é o caso legítimo de ilha.
```

### Tokens de movimento

Definir uma vez em `src/lib/motion.ts` e importar. **Nunca** espalhar `duration: 0.63` mágico pelas seções.

```ts
export const EASE = [0.22, 1, 0.36, 1] as const; // ease-out expo
export const DUR = { fast: 0.25, base: 0.45, slow: 0.7 } as const;
export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DUR.base, ease: EASE },
};
```

### Regras

- **`prefers-reduced-motion` é obrigatório.** Sem exceção:
  ```ts
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) animate(...);
  ```
  Em React: `useReducedMotion()` do próprio Motion.
- **Anima só `transform` e `opacity`.** `width`, `height`, `top`, `margin` causam layout thrash. Se precisar de tamanho, `scale` ou layout animation.
- **Nada de animação no LCP.** O hero principal não pode entrar com `opacity: 0` — mata o Largest Contentful Paint e o score de Performance. Elementos acima do fold entram imediatamente ou com delay ≤ 100ms.
- **`inView` com `amount: 0.2–0.4`** para scroll reveal. Não disparar tudo de uma vez no load.
- **Durações**: micro-interação 150–250ms, entrada 400–600ms, transição de slide 500–800ms. Nada acima de 1s.
- **Hover/focus continuam em CSS.** `transition-colors` do Tailwind resolve; não gastar JS com isso.
- Carrossel/slider (ex.: hero com slides) → Framer Motion + `AnimatePresence`, com controles acessíveis (`aria-label`, setas navegáveis por teclado, pausa em `prefers-reduced-motion`).
- Import sempre dentro do `<script>` do componente que usa. Nada de `motion` global no `Base.astro`.

### HTML semântico
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` corretos.
- Um único `<h1>` por página (o hero).
- `<h2>` para título de cada seção; sub-elementos em `<h3>`+.
- Botões que navegam são `<a>`, botões que executam ação são `<button>`.

---

## Fase 7 — SEO

Por página (props do `Base.astro`):
- `<title>` único, ≤ 60 chars.
- `<meta name="description">` único, 140–160 chars.
- Open Graph: `og:title`, `og:description`, `og:image` (1200×630 WebP), `og:url`, `og:type`.
- Twitter Card: `summary_large_image` + os mesmos campos.
- `<link rel="canonical">` apontando para URL final.

No projeto:
- `robots.txt` em `public/`.
- `@astrojs/sitemap` instalado, `sitemap.xml` gerado no build.
- Structured Data (JSON-LD) — pelo menos `Organization` no `Base.astro`. Para casos específicos: `LocalBusiness`, `Article` (blog), `BreadcrumbList`.
- URLs limpas, sem `.html`, com trailing slash consistente.

### Checklist SEO
- [ ] Todas as páginas com title/description únicos.
- [ ] Todas as imagens com alt.
- [ ] Headings em hierarquia (nada de pular de h1 para h4).
- [ ] Sitemap acessível.
- [ ] `<html lang="pt-BR">` correto.

---

## Fase 8 — Performance

Targets Lighthouse (mobile, throttled 4G, moto G4-like):
- **Performance**: ≥ 95
- **Accessibility**: ≥ 95
- **Best Practices**: 100
- **SEO**: 100

Táticas:
- Fontes: 1 família, ≤ 4 pesos. `preconnect` + `font-display: swap`. Preload só do peso do LCP.
- Imagens: WebP + `astro:assets` + `loading="lazy"` (exceto LCP).
- CSS: Tailwind v4 já purga. Zero `@import` externo em prod.
- JS: idealmente zero KB shipped. Se tem, `type="module"` + `defer` ou dentro de `<script>` Astro.
- Sem trackers/scripts terceiros sem discussão explícita.

Rodar antes de entregar:
```bash
npm run build
npm run preview
# em outra aba: Lighthouse (Chrome DevTools) em mobile
```

Se algum score < target: investigar → ajustar → medir de novo. Não entregar com score amarelo/vermelho sem justificativa.

---

## Fase 9 — Acessibilidade

Além do que já é regra na Fase 6:

- **Contraste**: AA mínimo (4.5:1 texto normal, 3:1 texto grande). Verificar cores gold/mute em fundo branco — costuma falhar.
- **Focus visível**: nunca remover outline sem substituir com ring/border custom.
- **Skip link**: `<a href="#main">Ir para conteúdo</a>` no topo do body, visível ao Tab.
- **ARIA**: só onde HTML nativo não resolve. `aria-label` em botões-ícone. `aria-expanded`/`aria-controls` em toggles.
- **Formulários**: `<label>` associado a cada input, `required`, `type` correto, mensagens de erro programáticas.
- **`prefers-reduced-motion`**: envolver animações não essenciais em `@media (prefers-reduced-motion: no-preference)`.
- **Ordem de tab**: navegar todo o site só com Teclado antes da entrega.

Rodar `axe` (extensão de browser) ou `pa11y` como check final.

---

## Fase 10 — Build & entrega

```bash
npm run build          # deve terminar sem warning
npm run preview        # sanity check no build
```

Antes de entregar/deploy:
- [ ] Lighthouse todos os targets batidos.
- [ ] Todas as seções revisadas contra Figma (screenshots side-by-side arquivados em `docs/`).
- [ ] Links de nav funcionando (incluindo âncoras).
- [ ] Formulários com destino real (email, endpoint, Formspree, etc.) — nunca deixar `action="#"`.
- [ ] `favicon`, meta tags OG e sitemap corretos.
- [ ] Sem `console.log`, `TODO`, ou textos placeholder ("Lorem ipsum").
- [ ] `robots.txt` permite indexação (se cliente autorizou).

---

## Loop de revisão pixel-perfect (resumo visual)

```
┌─ Figma node ─────┐   ┌─ Astro section ──┐
│ get_screenshot   │   │ npm run dev      │
│ → reference.png  │   │ → local.png      │
└────────┬─────────┘   └─────────┬────────┘
         │                       │
         └────────── diff ───────┘
                     │
              < 3px & cores exatas?
              /              \
            não               sim
             │                 │
        ajustar CSS      próxima seção
```

Repetir até "sim" nos dois viewports (desktop e mobile).

---

## Anti-patterns (nunca fazer)

- Copiar SVG cru do Figma inline em uma seção.
- Hard-codar `#a48550` em vez de `text-gold`.
- Criar `Section1.astro`, `Section2.astro`, `Section3.astro` — usar nomes semânticos (`HeroSection`, `ServicesSection`).
- Duplicar tipografia em cada componente em vez de usar `.h2`/`.body`.
- Instalar biblioteca UI (Radix, Headless) para resolver algo que HTML nativo faz.
- Marcar seção como pronta sem screenshot lado a lado.
- Deixar `data-node-id` do Figma no HTML final.
- Adicionar seção nova antes da anterior estar pixel-perfect.
- Entregar sem rodar Lighthouse.
- Escrever `@keyframes`/tween na mão em vez de usar Framer Motion.
- Animar `width`/`height`/`top` em vez de `transform`.
- Hero com `opacity: 0` esperando scroll reveal (mata o LCP).
- Hidratar React só para fazer um fade — vanilla `motion` resolve.
- **Rodar o processo completo (screenshot + build + Lighthouse) para um ajuste de uma linha.** Ver "Modos de trabalho".

---

Este playbook é o processo. Se o cliente mudar de ideia sobre uma seção depois de pronta, é uma iteração — repetir Fase 4 para essa seção, não abrir espaço pra improviso.

Mas **o processo é escalonado**: o peso da validação acompanha o tamanho da mudança. Ajuste pequeno, resposta pequena.
