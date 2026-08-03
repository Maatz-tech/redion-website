/**
 * Dados compartilhados do site — definidos UMA vez, importados onde precisa.
 * Regra do playbook (Fase 6, DRY): listas de nav/legal/conteúdo moram aqui.
 */

/**
 * Origem do tráfego que sai daqui. Todo link externo carrega esse parâmetro,
 * menos os que já vêm parametrizados de fábrica (ex.: MAATZ_URL).
 */
export const UTM_SOURCE = 'hotsite-redion';

/** Anexa `utm_source` sem estragar uma query que já exista na URL. */
const comSource = (url: string) => `${url}${url.includes('?') ? '&' : '?'}utm_source=${UTM_SOURCE}`;

/** URL de inscrição — enviada pelo cliente em 03/08/2026. */
export const INSCRICAO_URL = comSource('https://go.eureca.me/TraineeRedion_botaoLP');

/** Botão "Fale conosco" do FAQ → Central de Ajuda da Eureca. */
export const CONTATO_URL = comSource('https://intercom.help/eureca_central/pt-BR');

export const NAV_LINKS = [
  { label: 'A empresa', href: '#a-redion' },
  { label: 'O Programa', href: '#o-programa' },
  { label: 'Requisitos', href: '#requisitos' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'FAQ', href: '#faq' },
] as const;

/** A Redion é o programa de trainee do grupo Europ Assistance — daí o perfil. */
export const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: comSource('https://www.linkedin.com/company/europ-assistance/'),
    icon: 'linkedin',
  },
] as const;

/** Assinatura da agência no rodapé. */
export const MAATZ_URL =
  'https://maatz.com.br/?utm_source=redion-eureca&utm_medium=footer&utm_campaign=portfolio';

export const LEGAL_LINKS = [
  {
    label: 'Política de Privacidade',
    href: comSource('https://app.eureca.me/politica-de-privacidade'),
  },
  { label: 'Termos de Uso', href: comSource('https://app.eureca.me/termos-de-uso') },
] as const;
