# PROJECT — LP Programa Trainee Redion 2026

## Project meta

- **Nome:** `redion-website`
- **fileKey Figma:** `qI2WSiTIULZ0kUdd5c2z8W` — "LP - Redion (Eureca)"
- **Home Desktop node:** `4010:60` (1440 × 5251)
- **Home Mobile node:** `4060:1501` (375 × 8775)
- **Outras páginas:** nenhuma (single page)
- **Fonte:** **Gabarito** (Google Fonts, variável 400–600) — auto-hospedada em `public/fonts/`
- **Domínio final:** ⚠️ **pendente** (`astro.config.mjs` → `site`)
- **Assinatura de rodapé:** Redion + eureca · "Desenvolvido por Maatz"

---

## Design tokens (de `get_variable_defs`)

| Token Figma | Hex | Token CSS |
|---|---|---|
| dark-blue | `#030338` | `--color-dark-blue` |
| body | `#33334b` | `--color-body` |
| medium-red | `#c21c17` | `--color-medium-red` |
| bright-red | `#ff3026` | `--color-bright-red` |
| dark-red | `#630d14` | `--color-dark-red` |
| medium-blue | `#1a2bc2` | `--color-medium-blue` |
| bright-blue | `#5466ff` | `--color-bright-blue` |
| blue/blue-600 | `#18137b` | `--color-blue-600` |
| medium-gray | `#dadad9` | `--color-medium-gray` |
| light-gray | `#ededec` | `--color-light-gray` |

**Assinatura visual da marca — o canto assimétrico.** Aparece em três variações e
está toda em `global.css`, nunca hard-coded:

| Onde | Raio | Utilitária |
|---|---|---|
| Botão sólido | `20px 0 1000px 0` (a "folha") | `.btn` |
| Card de requisito / etapas / avatar | `0 24px 0 24px` (invertido) | `.card-soft` |
| Foto grande | `0 48px 0 48px` | `.photo-frame` |
| Card do FAQ / depoimento | `24px` simétrico | inline |

Padding assimétrico do botão (`pr` > `pl`) é intencional: compensa a curva.

**Escala tipográfica** (mobile → desktop, `global.css`):
`.h2` 32→48px · `.h3` 20→24px · `.eyebrow` 18px · `.body` 18px (igual nos dois).
Botões e rótulos usam `line-height` ≈ 1.22, que é o `leading-normal` do Gabarito
no Figma — o padrão do Tailwind (1.5) deixava tudo mais alto que o design.

---

## Inventário de seções

| # | Seção | Desktop | Mobile | Componente |
|---|---|---|---|---|
| 1 | Header | `4004:11` | `4060:1502` | `Header.astro` |
| 2 | Hero | `4012:5` | `4060:1515` + `4135:1372` | `HeroSection.astro` |
| 3 | A Redion | `4010:67` | `4060:1544` | `SobreSection.astro` |
| 4 | Conheça o Programa | `4010:121` | `4060:1570` | `ProgramaSection.astro` |
| 5 | Requisitos | `4019:134` | `4060:1611` | `RequisitosSection.astro` |
| 6 | Benefícios | `4020:296` | `4060:1668` | `BeneficiosSection.astro` |
| 7 | Etapas do processo | `4020:489` | `4060:1739` | `EtapasSection.astro` |
| 8 | Depoimentos | `4025:97` | `4060:1796` | `DepoimentosSection.astro` |
| 9 | FAQ | `4029:873` | `4060:1902` | `FaqSection.astro` |
| 10 | Footer + barra legal | `4029:920` / `4029:945` | `4060:1987` / `4060:2033` | `Footer.astro` |

Conteúdo dos acordeões (Benefícios e Programa) veio de nodes **ocultos** no Figma
(`4136:1913`, `4010:167`) — está transcrito em `src/data/conteudo.ts`.

### Diferenças mobile ↔ desktop que valem lembrar

- **Hero:** no desktop o chip "Híbrido · Alphaville (SP)" e o cartão de prazo
  ficam dentro do hero; no mobile eles saem para uma faixa branca logo abaixo
  (node `4135:1372`). O CTA é pílula branca nos dois.
- **A Redion:** desktop tem a foto à esquerda em duas colunas; mobile é
  título → foto → texto → CTA. Resolvido com `grid` + `col-start/row-start`,
  sem duplicar markup.
- **Etapas e Requisitos:** ganham um CTA "Conheça o Programa" só no mobile.
- **Depoimentos:** as setas do carrossel existem só no desktop; no mobile ficam
  apenas os indicadores.

---

## Hero — como a arte foi montada

O hero tem **três camadas**, na ordem do Figma:

1. **Curva vermelha** decorativa no canto superior-esquerdo (`hero/curve.svg`).
   No Figma o vetor está espelhado no eixo Y; o SVG do projeto já vem com a
   curva na orientação final.
2. **Foto de fundo** recortada pela curva da marca via `mask-image`. As máscaras
   estão **inline como data URI** no `<style>` do componente — como arquivo
   externo, a requisição da máscara atrasava a pintura do LCP em ~1,6 s.
   Os traçados são os do Figma **espelhados no eixo X** (no arquivo original o
   grupo de máscara tem o flip aplicado no wrapper).
3. **Recorte da pessoa em PNG/WebP com alpha** por cima, sem máscara — é ele que
   "estoura" a curva.

O `<h1>` real é `sr-only`: o título visível é a arte fechada do lockup.
Nada acima da dobra entra com `opacity: 0`.

### Comportamento entre 375 e 1024 px

O comp só define 375 e 1440. No meio, a arte do mobile fica **em fluxo** com o
aspecto do comp (`aspect-[375/281]`) em vez de uma altura fixa, e o bloco de
conteúdo vem antes dela no DOM.

Isso não é preferência: com `h-[281px] w-full`, a partir de ~533 px de viewport
a caixa fica mais larga que a proporção da foto (1,896) — o `object-cover` passa
a recortar na vertical e o `object-bottom` **decepava a cabeça** da moça,
piorando progressivamente até 1023 px. O `max-h-[560px]` limita o crescimento em
tablet sem trazer o recorte de volta (ele só reapareceria a partir de 1062 px, e
aí o layout já é o desktop). Altura do hero: 713 px em 375, 1042 px em 768–1023,
575 px em 1440.

### Enquadramento e resolução (não mexer no chute)

As duas camadas usam o **mesmo enquadramento** e o **mesmo arquivo** nos dois
breakpoints, mudando só a ancoragem (`object-bottom` no mobile,
`object-center` no desktop). Isso não é simplificação: se fundo e recorte
usarem enquadramentos diferentes, **a moça aparece duas vezes** — uma no fundo
(ela está na foto) e outra no recorte deslocado.

Havia um asset mobile separado, reduzido de 1024 → 750 px. Era ele que aparecia
borrado no celular: num slot de 532 CSS a 3× de densidade o navegador precisa de
~1600 px e recebia 750, ampliando 2× um arquivo já reduzido. O enquadramento
mobile do comp foi conferido medindo a extensão da blusa vermelha no PNG de
referência (3 521 px vermelhos no Figma × 3 557 no build): é o recorte inteiro,
igual ao desktop.

**Teto de resolução:** o original que subiu para o Figma tem **1727 × 911 px**.
Num slot de 1077 CSS a 2× (retina desktop) o navegador pede 2154 px, então
sobra uma ampliação de 1,25× que nenhum reprocessamento resolve — ver
Pendências. Para compensar em parte, o recorte da pessoa leva um **unsharp
leve** (raio 1,1 / 55% / limiar 3) aplicado só no RGB, nunca no alpha, para não
serrilhar a borda. O fundo **não** leva unsharp e vai em qualidade mais baixa:
ele está desfocado na foto original e é o elemento do LCP, então ali peso
importa mais que nitidez.

---

## Mapa de animações (Framer Motion — Fase 6.5 do playbook)

Tudo em **vanilla `motion`**, dentro do `<script>` de cada seção. Zero React,
zero hidratação. Tokens e helpers em `src/lib/motion.ts`.

| Onde | Animação | Helper |
|---|---|---|
| Hero | cartão de prazo entra com `scale` mínima; recorte sobe 12px | `animate` direto (sem `opacity: 0` no LCP) |
| Headings de seção | reveal palavra a palavra com desfoque | `revealWords` + `RevealText.astro` |
| Blocos de texto / fotos | fade + subida + `blur()` saindo | `revealOnScroll` |
| Listas (requisitos, etapas, parágrafos) | o mesmo, escalonado | `revealStagger` |
| Itens de acordeão e cards do FAQ | entram pela direita com desfoque | `revealFromX` |
| Divisor vermelho do acordeão | `scaleX: 0 → 1` | `drawLine` |
| Foto de "A Redion" | parallax de 24px | `parallax` |
| Abrir/fechar acordeão e FAQ | altura real do conteúdo | `toggleAccordion` |
| Carrossel de depoimentos | `x` do trilho | `animate` no `<script>` da seção |
| Menu mobile | altura + stagger dos itens | `<script>` do Header |
| Overlay do vídeo | fade + `scale` na moldura | `<script>` do `VideoOverlay` |

**Carrossel de depoimentos:** os quatro depoimentos têm comprimentos bem
diferentes (o do Maycon tem dois parágrafos). Como os slides ficam numa linha
flex, todos assumem a altura do mais alto — o que evita salto de altura na
transição. Para a sobra não virar um vão único embaixo do texto, a citação leva
`my-auto` (centraliza no espaço livre) e o autor fica preso no rodapé, como no
comp. Por isso o card tem 515 px no desktop em vez dos 308 do Figma: é o custo
do texto real.
| Hover de nav, botões, setas | CSS `transition` | — |
| Card do FAQ (fundo + pergunta + troca +/−) | CSS `transition` | — |

**A assinatura de movimento é o desfoque.** `revealOnScroll` e companhia animam
`opacity` + `y` + `filter: blur()`. Sem o blur a entrada fica seca e genérica —
é o que diferencia deste projeto de um fade padrão.

Detalhes que não são óbvios e não devem ser "simplificados":

- `drawLine` observa o **elemento pai**, não a linha. Um elemento com
  `scaleX(0)` tem largura zero e o IntersectionObserver nunca reporta interseção
  para caixas de área zero.
- O estado inicial invisível dos reveals vem do **CSS**, condicionado à classe
  `.js` que o `Base.astro` põe no `<html>`. Com JS o elemento já nasce
  invisível (sem piscar); sem JS a regra não se aplica e o conteúdo aparece.
- O download do `motion` é adiado para depois do `load` + um tick de ociosidade
  (`aposCarregar()` em `motion.ts`). Não é preciosismo: os ~26 KB gzip
  competiam banda com a imagem do LCP no 4G simulado. Todos os reveals ficam
  abaixo da dobra, então nada é percebido.
- `toggleAccordion` tem fallback instantâneo se o `import('motion')` falhar —
  conteúdo preso em `height: 0` é conteúdo perdido.
- `prefers-reduced-motion` é respeitado em todos os helpers **e** no CSS.
- O preflight do Tailwind v4 zera o `cursor` dos `<button>`. O `global.css`
  devolve `cursor: pointer` — sem isso as setas do carrossel, os pontos e os
  gatilhos de acordeão/FAQ não pareciam clicáveis.

---

## Overlay do vídeo

`VideoOverlay.astro` usa `<dialog>` nativo com `showModal()` — de graça vêm o
trap de foco, o Esc, o `::backdrop` e o resto da página inerte para leitores de
tela. Abre a partir de qualquer elemento com `data-video-abrir`.

Dois detalhes que não devem ser "simplificados":

- **O iframe é criado na abertura e removido no fechamento.** Assim a página não
  faz nenhuma requisição ao YouTube no load (o embed sozinho passa de 800 KB e
  derrubaria o Performance) e o vídeo para de tocar ao fechar, sem precisar da
  API do player. Usa `youtube-nocookie.com`.
- **O `overflow: hidden` mora no `.palco`, não na `.moldura`.** Com o recorte na
  moldura, o `showModal()` focava o botão de fechar (posicionado fora dela) e o
  navegador rolava o container para revelá-lo — arrastando o vídeo 56 px para o
  lado. O botão só sai do quadro a partir de 1264 px, onde já sobram 82 px de
  margem lateral.

---

## Ícones

Os ícones de conteúdo (Programa, Requisitos, Benefícios) foram **exportados do
próprio Figma** para `src/components/icons/figma.ts` — traçados fechados,
pintados com `currentColor`. Não redesenhar à mão: a primeira tentativa com
Lucide "de memória" errou o ícone de "Áreas de atuação" (o do Figma tem quatro
cabeças) e o de "Inglês avançado".

Os ícones de interface (menu, chevrons, play, `+`/`−`, LinkedIn) estão no próprio
`Icon.astro`. Todos passam pelo mesmo componente — nada de SVG cru numa seção.

---

## Performance (Lighthouse mobile, build de produção)

| Categoria | Alvo | Mobile | Desktop |
|---|---|---|---|
| Performance | ≥ 95 | **95** | **100** |
| Accessibility | ≥ 95 | **100** | **100** |
| Best Practices | 100 | **100** | **100** |
| SEO | 100 | **100** | **100** |

FCP 1,5 s · LCP 2,8 s · TBT 0 ms · CLS 0.

O LCP subiu de 2,6 s para 2,8 s quando as fotos do hero passaram a ser servidas
em resolução nativa. Foi troca consciente: em resolução menor a moça ficava
visivelmente borrada no retina e no celular.

O que tirou o score de 85 → 96, em ordem de impacto:

1. **Auto-hospedar a Gabarito** em vez de linkar o Google Fonts (−1,2 s de
   render bloqueante). É um único variable font, cobre 400/500/600.
2. **Um `<img>` só no recorte do hero** — antes eram dois com `lg:hidden`, e o
   celular baixava os dois (66 KB inúteis disputando banda com o LCP).
3. **Máscaras do hero inline como data URI** (−1,6 s de render delay).
4. **Adiar o download do `motion`** para depois do `load`.
5. `srcset`/`sizes` em todas as fotos grandes + CSS inline
   (`build.inlineStylesheets: 'always'`).
6. `preload` do LCP repetindo `imagesrcset`/`imagesizes` do `<img>` — sem isso o
   navegador trata como recurso diferente e baixa duas vezes.
7. **Foto de fundo do hero em qualidade 68** (46 KB). Ela é o elemento do LCP e
   está desfocada na foto original, então a compressão não aparece. O recorte da
   pessoa — que é o que se lê — segue em 88 com unsharp. Sem isso o mobile
   ficava oscilando em 94, abaixo do alvo.

---

## Responsividade entre os dois comps

O Figma só define 375 e 1440. A revisão varreu 320 → 1920 e o que faltava era o
meio do caminho; três coisas foram corrigidas:

1. **Padding de seção fluido.** `clamp(40px, 8.34vw, 120px)` — 8.34vw dá
   exatamente os 120 px do comp em 1440. Com 120 px fixos, entre 1024 e 1440 as
   colunas internas não caberiam e a página estourava na horizontal.
2. **Colunas em proporção, não em px.** Benefícios, Depoimentos e Programa usam
   `flex-1 min-w-0` (dá 568 px exatos em 1440); "A Redion" usa
   `grid-cols-[38.5%_1fr]` + `aspect-[462/659]` na foto; FAQ usa `w-[38%]`.
   Antes eram larguras fixas de 568/462/455 px, que somadas passavam de 1024.
3. **Composição desktop do hero só em `xl` (1280).** Ela depende de posições
   calculadas para 1440 (`left-[577px]`, `w-[1077px]`) e, entre 1024 e 1439, a
   foto invadia o bloco de texto. Abaixo de 1280 vale a versão empilhada.
   A nav do header também ganhou `gap-6 xl:gap-10` — em 1024, com gap-10, ela
   colidia com o logotipo.

Varredura final (320, 360, 375, 414, 560, 768, 1024, 1180, 1280, 1366, 1440,
1600, 1920): **zero overflow horizontal e zero recorte de cabeça no hero**.
Reproduzir com o bloco de verificação do README.

---

## Fidelidade ao Figma

Altura por seção, desktop 1440 (Figma → implementado):

| Seção | Figma | Aqui |
|---|---|---|
| Header | 94 | 94 |
| Hero | 575 | 575 |
| A Redion | 894 | 895 |
| Conheça o Programa | 640 | 640 |
| Requisitos | 616 | 615 |
| Benefícios | 462 | 606 ¹ |
| Etapas | 558 | 560 |
| Depoimentos | 578 | 578 |
| FAQ | 550 | 496 ² |
| Footer | 284 | 288 |

² **Diferença pedida pelo cliente:** no comp o primeiro item do FAQ aparece
aberto; a pedido, todos começam fechados. Daí os 54 px a menos.

¹ **Diferença intencional.** O comp desktop de Benefícios foi exportado com
todos os itens do acordeão fechados, mas com o divisor vermelho marcando o
primeiro item como ativo; o comp mobile mostra esse item **aberto**, com a lista
de benefícios. Mantivemos o primeiro item aberto nos dois viewports — é o mesmo
comportamento de "Conheça o Programa", onde o desktop mostra "A Jornada"
aberta. Se o cliente preferir tudo fechado no desktop, é um ajuste de uma linha
em `Accordion.astro`.

No mobile as seções ficam 2–3% mais curtas que o comp (soma de gaps internos);
nenhum elemento individual passa de ~3px de desvio.

Referências em `docs/reference/` (Figma) e `docs/local/` (build).
Para regerar: `node scripts/shot.mjs <url> <largura> <saída.png>` e
`node scripts/measure.mjs <url> <largura>` (altura por seção).

---

## Pendências (precisam de resposta do cliente)

1. ~~Domínio final~~ — **resolvido em 03/08/2026:**
   **https://traineeredion2026.com.br**. Com domínio próprio o Pages serve na
   raiz, então: `site` trocado, o par `site`/`base` de preview removido,
   `PREVIEW_NOINDEX` fora do workflow (a página precisa ser indexada),
   `public/CNAME` criado e o sitemap do `robots.txt` apontado para o domínio.

   O `CNAME` em `public/` não é opcional numa publicação por Action: o deploy
   sobe o conteúdo de `dist/`, e sem o arquivo no artefato o Pages perde a
   configuração de domínio customizado no próximo deploy.

   Continua valendo referenciar asset como `${import.meta.env.BASE_URL}images/...`
   e manter as fontes em `src/assets` (e não em `public/`) — é o que deixa o
   `base` trocável sem caçar caminho absoluto pelo projeto.
2. ~~Destino do CTA "Inscreva-se agora"~~ — **resolvido em 03/08/2026:**
   `https://go.eureca.me/TraineeRedion_botaoLP`.
3. ~~URL da Central de Ajuda da Eureca~~ — **resolvido em 03/08/2026:** o botão
   do FAQ virou "Central de Ajuda" e aponta para
   `https://intercom.help/eureca_central/pt-BR`, em nova aba.
4. ~~Vídeo do card "Assista ao vídeo"~~ — **resolvido em 03/08/2026:** abre em
   overlay o YouTube `WePjklxVdMY` ("We are Redion", canal Redion Brasil).
5. **LinkedIn da Redion** — `SOCIAL_LINKS` em `src/data/site.ts` segue em `#`.
   O rodapé legal foi resolvido em 03/08/2026: **Política de Privacidade**
   (`https://app.eureca.me/politica-de-privacidade`) e **Termos de Uso**
   (`https://app.eureca.me/termos-de-uso`), ambos em nova aba. O "Aviso de
   Cookies", que não tinha URL, saiu da lista.
6. ~~Depoimentos~~ — **resolvido em 03/08/2026:** textos, nomes, cargos e fotos
   das quatro pessoas (Julio Cesar, Maycon, Luana e Mikaeli).
7. **Fecho do 2º parágrafo do "sobre".** O texto novo (03/08/2026) chegou
   truncado pelo "Ler mais" do WhatsApp, em "...reforçando seu compromisso com
   um ambiente que promove dese…". Encerramos a frase no ponto anterior, sem
   inventar o fecho — falta confirmar o final e se existe um 3º parágrafo (a
   versão do Figma tinha um sobre o propósito "You Live, We Care").
8. ~~Textos de dois itens do acordeão "Conheça o Programa"~~ — **resolvido em
   03/08/2026:** o cliente enviou a lista oficial de "Áreas de atuação" (sete
   itens, agora em `lista`) e o texto de "A oportunidade".
9. **Três respostas do FAQ** — só a primeira tem texto no Figma. As outras três
   estão provisórias, também marcadas com `TODO`.
10. **Confirmar o vermelho dos rótulos com o designer.** O comp usa
   `bright-red` (#ff3026) no eyebrow, no botão "Fale conosco" e no nome do
   depoimento. Em 18–20 px sobre fundo claro isso dá **3,68:1** no branco e
   **3,14:1** no light-gray, e o AA pede 4,5:1 para texto normal — o Lighthouse
   desktop reprovava. Trocamos para `medium-red` (#c21c17), que já é token da
   marca e dá 6,05:1 / 5,16:1; a diferença visual é imperceptível. O bright-red
   ficou onde passa: headings de 48 px (texto grande, pede 3:1) e ícones
   (componente de UI, 3:1).
11. **Foto do hero em resolução maior** — o arquivo original no Figma tem
   1727 × 911 px. Para ficar realmente nítido em tela retina seria preciso o
   original em **≥ 2600 px de largura** (a foto de fundo e o recorte da pessoa
   em PNG com transparência). Hoje sobra 1,25× de ampliação no desktop retina.
12. ~~Imagem OG~~ — **resolvido em 03/08/2026:** o cliente enviou a peça própria
   (`public/opengraph.jpg`, 1200×630), que substituiu o `og.jpg` gerado a partir
   do hero. O caminho é o default do `Base.astro`.
13. **Foto da seção "A Redion" em resolução maior — a mais crítica das três.**
   O original tem 1400 × 933 px, mas o quadro é retrato (0,70) e a foto é
   paisagem (1,50): o `object-cover` escala pela ALTURA, então a imagem é
   *pintada* com ~1024 px de largura no desktop (462 px de quadro × 2,2) e
   ~46% dos pixels da largura são jogados fora no recorte. Em retina o alvo é
   **≥ 2048 px** e temos 1400 — daí a suavidade que o cliente apontou.
   Feito em 03/08/2026: (a) o `sizes` declarava os 462 px do quadro e fazia o
   browser baixar a versão de 700 e esticar para 1024 — corrigido para
   `1024px`; (b) `photo-2100.webp` é uma ampliação Lanczos + unsharp do 1400
   (não cria detalhe, mas rende melhor que a ampliação do browser).
   **O que resolve de fato:** o original em ≥ 2000 px — de preferência já
   recortado em RETRATO (~1400 × 2000), porque aí nenhum pixel se perde no
   `object-cover` e o arquivo ainda fica mais leve que o de hoje.
