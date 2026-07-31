/**
 * Conteúdo editorial da página, separado da apresentação.
 * Textos transcritos do Figma qI2WSiTIULZ0kUdd5c2z8W.
 */
import type { AccordionItem } from '../components/Accordion.astro';

/** Seção "A Redion" — parágrafos do node 4010:74. */
export const SOBRE_PARAGRAFOS = [
  'A Redion é uma empresa global líder em soluções de assistência, seguro viagem e benefícios para colaboradores. Com mais de 60 anos de história e 30 anos de atuação no Brasil, está presente em mais de 190 países, conectando tecnologia, inovação e cuidado para apoiar pessoas e organizações nos momentos em que elas mais precisam.',
  'No Brasil, a Redion oferece soluções de assistência, proteção, seguro viagem e benefícios para colaboradores, apoiando pessoas e empresas com mais segurança, tranquilidade e cuidado. Ao longo de sua trajetória, tornou-se parceira de importantes empresas dos setores de seguros, mobilidade, turismo, financeiro e residencial, atendendo clientes como Generali, Bradesco Seguros, Stellantis, Caixa Residencial, MSC, Icatu, entre outros. Reconhecida pelas certificações Great Place to Work (GPTW) e Top Employer, investe continuamente em um ambiente que promove desenvolvimento, bem-estar e oportunidades de crescimento.',
  'Guiados pelo propósito "You Live, We Care", trabalhamos para estar presentes de forma genuína, prática e humana, ajudando as pessoas a aproveitarem ao máximo cada momento. Temos a ambição de ser o principal parceiro de cuidado no mundo.',
] as const;

/**
 * Acordeão de "Conheça o Programa" (node 4010:167).
 *
 * ⚠️ No Figma só "A Jornada" tem texto próprio; os painéis de "Áreas de
 * atuação" e "A oportunidade" estão ocultos e repetem o mesmo parágrafo.
 * O texto abaixo para esses dois é PLACEHOLDER — ver Pendências no PROJECT.md.
 */
export const PROGRAMA_ITENS: readonly AccordionItem[] = [
  {
    titulo: 'A Jornada',
    icone: 'plane',
    texto:
      'O Programa Trainee Redion 2026 foi criado para formar os futuros líderes da companhia. Durante a jornada, você atuará em diferentes áreas de negócio, participará de projetos e desenvolverá uma visão ampla da empresa, preparando-se para assumir posições de maior impacto no médio prazo.',
  },
  {
    titulo: 'Áreas de atuação',
    icone: 'users',
    // TODO: texto oficial pendente com o cliente
    texto:
      'Você poderá atuar em áreas como Operações, Comercial, Produto, Tecnologia, Financeiro e Pessoas & Cultura, com rotação entre times ao longo do programa para construir uma visão completa do negócio.',
  },
  {
    titulo: 'A oportunidade',
    icone: 'star',
    // TODO: texto oficial pendente com o cliente
    texto:
      'Uma trilha estruturada de desenvolvimento, com mentoria de liderança, exposição a projetos estratégicos e um plano de carreira desenhado para quem quer crescer dentro de uma empresa global de cuidado.',
  },
];

/**
 * Seção "Requisitos" (node 4019:134).
 * `**negrito**` marca o trecho em destaque; `|` força quebra de linha
 * (nos cards 1 e 3 o Figma usa dois parágrafos separados).
 */
export const REQUISITOS = [
  { icone: 'graduation-cap-lg', texto: '**Formação superior concluída**|entre julho de 2023 e julho de 2026' },
  { icone: 'diploma', texto: '**Diploma emitido** por Instituição de Ensino Superior reconhecida pelo MEC' },
  { icone: 'message-lines', texto: '**Inglês avançado**|(requisito obrigatório)' },
  { icone: 'map-pin', texto: 'Disponibilidade para atuar no **modelo híbrido, em Alphaville (SP)**' },
  { icone: 'globe', texto: 'Interesse em construir uma **carreira de longo prazo** em uma empresa global' },
] as const;

/** Acordeão de "Benefícios" (node 4136:1913). */
export const BENEFICIOS_ITENS: readonly AccordionItem[] = [
  {
    titulo: 'Remuneração e Benefícios',
    icone: 'dollar-sign',
    lista: [
      'Salário competitivo',
      'Vale-refeição',
      'Vale-alimentação',
      'Convênios de alimentação',
      'Previdência privada',
    ],
  },
  {
    titulo: 'Saúde e Bem-estar',
    icone: 'heart-pulse',
    lista: [
      'Assistência médica',
      'Assistência odontológica',
      'Seguro de vida',
      'Convênio Farmácia',
      'TotalPass',
    ],
  },
  {
    titulo: 'Desenvolvimento',
    icone: 'graduation-cap',
    lista: ['Convênio educacional', 'Incentivo ao desenvolvimento profissional'],
  },
  {
    titulo: 'Qualidade de Vida',
    icone: 'hand-heart',
    lista: [
      'Auxílio Creche',
      'Auxílio Telefonia',
      'Estacionamento',
      'Quadras de areia e society',
    ],
  },
];

/** Etapas do processo seletivo (node 4020:489). `cor` é a classe de fundo. */
export const ETAPAS = [
  { titulo: 'Inscrições e Trilha Online', prazo: 'Até 26/08', cor: 'bg-bright-blue' },
  { titulo: 'Jornada de Aprofundamento', prazo: '01/09 a 03/09', cor: 'bg-medium-blue' },
  { titulo: 'Painéis Online', prazo: '16/09 a 17/09', cor: 'bg-dark-blue' },
  { titulo: 'Entrevistas em inglês', prazo: '22/09 a 25/09', cor: 'bg-dark-red' },
  { titulo: 'Painel e entrevistas presenciais', prazo: 'A partir de 01/10', cor: 'bg-medium-red' },
  { titulo: 'Day one dos Trainees', prazo: 'A partir de 13/10', cor: 'bg-bright-red' },
] as const;

/**
 * Depoimentos (node 4025:97).
 * ⚠️ PLACEHOLDER — o Figma traz texto e pessoa fictícios.
 * Ver Pendências no PROJECT.md.
 */
export const DEPOIMENTOS = [
  {
    texto:
      'Depoimento de 3 a 5 linhas sobre a importância de desenvolver talentos, o papel do Programa Trainee na construção do pipeline de lideranças e o que espera dos profissionais que ingressam na Redion.',
    nome: 'Nome e sobrenome',
    cargo: 'Especialista de [Área]',
    foto: '/images/depoimentos/pessoa-1.webp',
  },
  {
    texto:
      'Depoimento de 3 a 5 linhas sobre a importância de desenvolver talentos, o papel do Programa Trainee na construção do pipeline de lideranças e o que espera dos profissionais que ingressam na Redion.',
    nome: 'Nome e sobrenome',
    cargo: 'Especialista de [Área]',
    foto: '/images/depoimentos/pessoa-1.webp',
  },
  {
    texto:
      'Depoimento de 3 a 5 linhas sobre a importância de desenvolver talentos, o papel do Programa Trainee na construção do pipeline de lideranças e o que espera dos profissionais que ingressam na Redion.',
    nome: 'Nome e sobrenome',
    cargo: 'Especialista de [Área]',
    foto: '/images/depoimentos/pessoa-1.webp',
  },
  {
    texto:
      'Depoimento de 3 a 5 linhas sobre a importância de desenvolver talentos, o papel do Programa Trainee na construção do pipeline de lideranças e o que espera dos profissionais que ingressam na Redion.',
    nome: 'Nome e sobrenome',
    cargo: 'Especialista de [Área]',
    foto: '/images/depoimentos/pessoa-1.webp',
  },
] as const;

/** FAQ (node 4029:873). */
export const FAQ = [
  {
    pergunta: 'Quem pode participar do Programa Trainee Redion 2026?',
    resposta:
      'Podem participar profissionais que atendam aos requisitos informados na página do programa. Antes de se inscrever, confira atentamente os critérios de elegibilidade.',
  },
  {
    pergunta: 'Posso participar morando em outra cidade?',
    // TODO: resposta oficial pendente com o cliente
    resposta:
      'Sim. As primeiras etapas são online, mas o programa exige disponibilidade para atuar no modelo híbrido em Alphaville (SP) a partir do início da jornada.',
  },
  {
    pergunta: 'Como acompanho as próximas etapas?',
    // TODO: resposta oficial pendente com o cliente
    resposta:
      'Todas as comunicações são enviadas por e-mail. Acompanhe também a plataforma de inscrição, onde o status da sua candidatura fica sempre atualizado.',
  },
  {
    pergunta: 'Há etapas presenciais no processo seletivo?',
    // TODO: resposta oficial pendente com o cliente
    resposta:
      'Sim. A etapa de painel e entrevistas finais é presencial, prevista a partir de 01/10, em Alphaville (SP).',
  },
] as const;
