/**
 * Dados compartilhados do site — definidos UMA vez, importados onde precisa.
 * Regra do playbook (Fase 6, DRY): listas de nav/legal/conteúdo moram aqui.
 */

/** URL de inscrição — enviada pelo cliente em 03/08/2026. */
export const INSCRICAO_URL = 'https://go.eureca.me/TraineeRedion_botaoLP';

/**
 * Botão "Fale conosco" do FAQ. O texto novo aponta para a Central de Ajuda da
 * Eureca — TODO: falta a URL (ver Pendências no PROJECT.md).
 */
export const CONTATO_URL = '#contato';

export const NAV_LINKS = [
  { label: 'A empresa', href: '#a-redion' },
  { label: 'O Programa', href: '#o-programa' },
  { label: 'Requisitos', href: '#requisitos' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'FAQ', href: '#faq' },
] as const;

/** TODO: substituir pelo perfil real (ver PROJECT.md) */
export const SOCIAL_LINKS = [{ label: 'LinkedIn', href: '#', icon: 'linkedin' }] as const;

/** Assinatura da agência no rodapé. */
export const MAATZ_URL =
  'https://maatz.com.br/?utm_source=redion-eureca&utm_medium=footer&utm_campaign=portfolio';

/** TODO: substituir pelas URLs reais (ver PROJECT.md) */
export const LEGAL_LINKS = [
  { label: 'Aviso de Cookies', href: '#' },
  { label: 'Política de Privacidade', href: '#' },
] as const;
