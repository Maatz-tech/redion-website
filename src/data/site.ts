/**
 * Dados compartilhados do site — definidos UMA vez, importados onde precisa.
 * Regra do playbook (Fase 6, DRY): listas de nav/legal/conteúdo moram aqui.
 */

/** URL do formulário de inscrição. TODO: confirmar destino real (ver PROJECT.md) */
export const INSCRICAO_URL = '#inscricao';

/** TODO: confirmar e-mail/URL de contato (ver PROJECT.md) */
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

/** TODO: substituir pelas URLs reais (ver PROJECT.md) */
export const LEGAL_LINKS = [
  { label: 'Aviso de Cookies', href: '#' },
  { label: 'Política de Privacidade', href: '#' },
] as const;
