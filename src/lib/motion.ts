/**
 * Tokens e helpers de movimento — fonte única de verdade das animações.
 * Ver Fase 6.5 do PLAYBOOK.md.
 *
 * A assinatura de movimento do projeto é o reveal com **desfoque**: fade +
 * subida curta + `blur()` saindo. Sem o blur a entrada fica seca e genérica.
 * Nunca espalhar `duration: 0.63` mágico pelas seções: importe daqui.
 */

/** ease-out expo — curva padrão do projeto */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** ease-in-out suave, para loops e autoplay de carrossel */
export const EASE_SOFT = [0.4, 0, 0.2, 1] as const;

export const DUR = {
  fast: 0.25, // micro-interação
  base: 0.45, // entrada de elemento
  slow: 0.7, // reveal com desfoque / transição de slide
} as const;

/** Quanto do elemento precisa estar visível para disparar o reveal */
export const IN_VIEW_AMOUNT = 0.25;

/** True quando o usuário pediu menos movimento. Sempre checar antes de animar. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Espera o `load` + um tick de ociosidade antes de baixar o Framer Motion.
 *
 * O motivo é de performance, não de estética: o bundle do motion (~26 KB gzip)
 * competia banda com a imagem do LCP no 4G simulado. Todos os reveals ficam
 * abaixo da dobra, então adiar a inicialização não é percebido — e o `inView`
 * dispara imediatamente para o que já estiver na tela quando registrar.
 */
let ocioso: Promise<void> | null = null;
function aposCarregar(): Promise<void> {
  if (!ocioso) {
    ocioso = new Promise<void>((resolve) => {
      const seguir = () =>
        'requestIdleCallback' in window
          ? window.requestIdleCallback(() => resolve(), { timeout: 600 })
          : setTimeout(resolve, 120);

      if (document.readyState === 'complete') seguir();
      else window.addEventListener('load', seguir, { once: true });
    });
  }
  return ocioso;
}

/** Tira o estado inicial invisível (usado quando não vamos animar). */
function mostrar(els: ArrayLike<HTMLElement>) {
  for (const el of Array.from(els)) {
    el.style.opacity = '1';
    el.style.filter = 'none';
    el.style.transform = 'none';
  }
}

/**
 * Reveal de scroll — fade + subida + desfoque.
 *
 * O estado inicial (invisível) vem do CSS, condicionado à classe `.js` que o
 * Base.astro põe no <html>. Assim, com JS o elemento já nasce invisível sem
 * piscar; sem JS a regra não se aplica e o conteúdo aparece normalmente.
 */
export async function revealOnScroll(selector: string, opts: { atraso?: number } = {}) {
  const alvos = document.querySelectorAll<HTMLElement>(selector);
  if (!alvos.length) return;
  if (prefersReducedMotion()) return mostrar(alvos);

  await aposCarregar();
  const { animate, inView } = await import('motion');
  const { atraso = 0 } = opts;

  inView(
    selector,
    (el) => {
      animate(
        el,
        { opacity: [0, 1], y: [24, 0], filter: ['blur(10px)', 'blur(0px)'] },
        { duration: DUR.slow, delay: atraso, ease: EASE }
      );
    },
    { amount: IN_VIEW_AMOUNT }
  );
}

/**
 * Igual ao revealOnScroll, mas escalona os filhos diretos do container —
 * usado onde o design tem uma lista (cards de requisitos, etapas da jornada).
 */
export async function revealStagger(selector: string, passo = 0.1) {
  const containers = document.querySelectorAll<HTMLElement>(selector);
  if (!containers.length) return;

  if (prefersReducedMotion()) {
    for (const c of Array.from(containers)) mostrar(Array.from(c.children) as HTMLElement[]);
    return;
  }

  await aposCarregar();
  const { animate, inView, stagger } = await import('motion');

  for (const container of Array.from(containers)) {
    const filhos = Array.from(container.children) as HTMLElement[];
    inView(
      container,
      () => {
        animate(
          filhos,
          { opacity: [0, 1], y: [28, 0], filter: ['blur(10px)', 'blur(0px)'] },
          { duration: 0.6, ease: EASE, delay: stagger(passo) }
        );
      },
      { amount: 0.15 }
    );
  }
}

/**
 * Reveal lateral com desfoque — usado nos itens de acordeão e nos cards que
 * entram pela direita. `passo` escalona os itens.
 */
export async function revealFromX(
  selector: string,
  x = 32,
  passo = 0,
  opts: { duracao?: number; atraso?: number; amount?: number } = {}
) {
  const alvos = document.querySelectorAll<HTMLElement>(selector);
  if (!alvos.length) return;
  if (prefersReducedMotion()) return mostrar(alvos);

  await aposCarregar();
  const { animate, inView } = await import('motion');
  const { duracao = 0.55, atraso = 0, amount = 0.2 } = opts;

  Array.from(alvos).forEach((el, i) => {
    inView(
      el,
      () => {
        animate(
          el,
          { opacity: [0, 1], x: [x, 0], filter: ['blur(8px)', 'blur(0px)'] },
          { duration: duracao, delay: atraso + i * passo, ease: EASE }
        );
      },
      { amount }
    );
  });
}

/**
 * Título revelado palavra a palavra com desfoque. As palavras já vêm em
 * <span data-palavra> do componente RevealText.astro, então não há reflow
 * no cliente.
 */
export async function revealWords(selector: string, passo = 0.045) {
  const titulos = document.querySelectorAll<HTMLElement>(selector);
  if (!titulos.length) return;

  if (prefersReducedMotion()) {
    for (const t of Array.from(titulos))
      mostrar(t.querySelectorAll<HTMLElement>('[data-palavra]'));
    return;
  }

  await aposCarregar();
  const { animate, inView, stagger } = await import('motion');

  for (const titulo of Array.from(titulos)) {
    const palavras = Array.from(titulo.querySelectorAll<HTMLElement>('[data-palavra]'));
    if (!palavras.length) continue;

    inView(
      titulo,
      () => {
        animate(
          palavras,
          { opacity: [0, 1], y: [14, 0], filter: ['blur(8px)', 'blur(0px)'] },
          { duration: 0.55, ease: EASE, delay: stagger(passo) }
        );
      },
      { amount: 0.4 }
    );
  }
}

/**
 * Linha que se desenha da esquerda para a direita (`scaleX: 0 → 1`) — o
 * divisor vermelho embaixo do item aberto do acordeão.
 *
 * ATENÇÃO: observa o elemento PAI, não a linha. Um elemento com `scaleX(0)`
 * tem largura zero e o IntersectionObserver nunca reporta interseção para
 * caixas de área zero — observando a própria linha, nada dispararia.
 */
export async function drawLine(selector: string, passo = 0.12, atraso = 0.2) {
  const alvos = document.querySelectorAll<HTMLElement>(selector);
  if (!alvos.length) return;
  if (prefersReducedMotion()) {
    for (const el of Array.from(alvos)) el.style.transform = 'scaleX(1)';
    return;
  }

  await aposCarregar();
  const { animate, inView } = await import('motion');

  Array.from(alvos).forEach((el, i) => {
    inView(
      el.parentElement ?? el,
      () => {
        animate(el, { scaleX: [0, 1] }, { duration: 0.6, delay: i * passo + atraso, ease: EASE });
      },
      { amount: 0.2 }
    );
  });
}

/**
 * Parallax discreto: desloca o elemento em Y conforme o scroll da própria
 * seção. Usado nas fotos grandes — dá profundidade sem chamar atenção.
 * Amplitude pequena de propósito (o design não é "efeitoso").
 */
export async function parallax(selector: string, amplitude = 40) {
  const alvos = document.querySelectorAll<HTMLElement>(selector);
  if (!alvos.length || prefersReducedMotion()) return;

  await aposCarregar();
  const { scroll, animate } = await import('motion');

  for (const el of Array.from(alvos)) {
    scroll(animate(el, { y: [amplitude, -amplitude] }, { ease: 'linear' }), {
      target: el,
      offset: ['start end', 'end start'],
    });
  }
}

/**
 * Anima a abertura/fechamento de um painel de acordeão pela altura real do
 * conteúdo. `height` é a única propriedade de layout que animamos no projeto,
 * e só aqui: acordeão sem transição de altura fica truncado.
 */
export async function toggleAccordion(painel: HTMLElement, abrir: boolean) {
  const instantaneo = () => {
    painel.style.height = abrir ? 'auto' : '0px';
    painel.style.opacity = abrir ? '1' : '0';
  };

  if (prefersReducedMotion()) return instantaneo();

  // Se o módulo de animação não carregar, o acordeão ainda tem que abrir:
  // conteúdo preso em height 0 é conteúdo perdido.
  let animate: typeof import('motion').animate;
  try {
    ({ animate } = await import('motion'));
  } catch {
    return instantaneo();
  }

  const alvo = painel.scrollHeight;

  if (abrir) {
    painel.style.display = '';
    await animate(
      painel,
      { height: [painel.offsetHeight, alvo], opacity: [0, 1] },
      { duration: 0.45, ease: EASE }
    );
    painel.style.height = 'auto';
  } else {
    await animate(
      painel,
      { height: [painel.offsetHeight, 0], opacity: [1, 0] },
      { duration: 0.32, ease: EASE }
    );
  }
}
