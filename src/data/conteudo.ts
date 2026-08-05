/**
 * Conteúdo editorial da página, separado da apresentação.
 * Textos transcritos do Figma qI2WSiTIULZ0kUdd5c2z8W.
 */
import type { AccordionItem } from '../components/Accordion.astro';

/**
 * Seção "A Redion" — texto novo enviado pelo cliente em 03/08/2026
 * (substitui a transcrição do node 4010:74 do Figma).
 *
 * ⚠️ O 2º parágrafo chegou truncado pelo "Ler mais" do WhatsApp, em
 * "...reforçando seu compromisso com um ambiente que promove dese…".
 * Encerramos a frase no ponto anterior, sem inventar o fecho. Falta confirmar
 * o final e se existe um 3º parágrafo (a versão antiga tinha um sobre o
 * propósito "You Live, We Care"). Ver Pendências no PROJECT.md.
 */
export const SOBRE_PARAGRAFOS = [
  'A Redion é uma empresa global líder em soluções de assistência, benefícios para colaboradores e seguro viagem. Com mais de 60 anos de história e 30 anos de atuação no Brasil, está presente em mais de 190 países, conectando tecnologia, inovação e cuidado para apoiar pessoas e organizações nos momentos em que elas mais precisam. Reconhecida globalmente como Top Employer, investe continuamente no desenvolvimento de pessoas e na excelência de seus serviços.',
  'No Brasil, a Redion oferece soluções em assistência e viagem, apoiando pessoas e empresas com mais segurança, tranquilidade e cuidado. Além disso, fazemos parte do Grupo Generali, uma das maiores seguradoras do mundo, e, no Brasil, temos o Bradesco Seguros como um dos nossos acionistas. Entre seus clientes estão Stellantis, Caixa Residencial, MSC e Icatu. Nacionalmente, a Redion é reconhecida como Great Place to Work (GPTW).',
] as const;

/**
 * Acordeão de "Conheça o Programa" (node 4010:167).
 *
 * "Áreas de atuação" e "A oportunidade" estavam ocultos no Figma; os textos
 * oficiais dos dois chegaram do cliente em 03/08/2026 e substituem os
 * placeholders anteriores.
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
    // Texto corrido a pedido do cliente; a lista oficial de áreas entra na
    // mesma ordem em que ele enviou. Revisão de 05/08/2026: Administrativo-
    // Financeiro saiu (não abrirão vagas nessa frente) e Comercial/Travel virou
    // Comercial/Marketing.
    texto:
      'Você poderá atuar em áreas como Operações, Marketing/Produtos, Comercial/Marketing, TI, RH e Área Técnica/Projetos, com rotação entre times ao longo do programa para construir uma visão completa do negócio.',
  },
  {
    titulo: 'A oportunidade',
    icone: 'star',
    texto:
      'Uma trilha estruturada de desenvolvimento, com acompanhamento e exposição a projetos estratégicos para quem quer crescer dentro de uma empresa global de cuidado.',
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
      'Auxílio Especial*',
    ],
    nota: '*destina-se a todos os colaboradores que possuem dependentes com deficiência conforme laudo médico.',
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
      'Auxílio Internet',
      'Estacionamento',
      'Quadras de areia e society',
    ],
  },
];

/**
 * Etapas do processo seletivo (node 4020:489). `cor` é a classe de fundo;
 * `obs` é a linha de apoio que explica ao candidato o que é a etapa.
 */
export const ETAPAS = [
  { titulo: 'Inscrições e Trilha Online', prazo: 'Até 26/08', cor: 'bg-bright-blue' },
  {
    titulo: 'Jornada de Aprofundamento',
    prazo: '01/09 a 03/09',
    obs: 'Etapa de entrevistas por Inteligência Artificial',
    cor: 'bg-medium-blue',
  },
  { titulo: 'Painéis Online', prazo: '16/09 a 17/09', cor: 'bg-dark-blue' },
  { titulo: 'Entrevistas em inglês', prazo: '22/09 a 25/09', cor: 'bg-dark-red' },
  { titulo: 'Painel e entrevistas presenciais', prazo: 'A partir de 01/10', cor: 'bg-medium-red' },
  { titulo: 'Day one dos Trainees', prazo: 'A partir de 13/10', cor: 'bg-bright-red' },
] as const;

/**
 * Depoimentos (node 4025:97) — textos, nomes, cargos e fotos enviados pelo
 * cliente em 03/08/2026.
 *
 * `texto` é uma lista de parágrafos: o depoimento do Maycon tem dois, e emendar
 * tudo num parágrafo só mudaria o texto do cliente. As aspas que vieram no
 * original foram removidas — o card já traz o ícone de citação.
 */
export const DEPOIMENTOS = [
  {
    texto: [
      'Acredito que investir em talentos é a forma mais concreta de construir o futuro da Redion. O Programa Trainee é onde esse futuro começa: reunindo pessoas curiosas, cheias de vontade de aprender e de deixar sua marca. Espero encontrar profissionais que não tenham medo de se desafiar e abracem o crescimento junto com a gente.',
    ],
    nome: 'Julio Cesar de Souza Santos',
    cargo: 'Gerente de Riscos e Compliance',
    foto: 'images/depoimentos/julio-cesar.webp',
  },
  {
    texto: [
      'O que mais me marcou no Programa de Estágio da Redion foi perceber que, mesmo sendo estagiário, minhas ideias eram ouvidas e valorizadas. Desde o início, tive contato com profissionais experientes que me incentivaram a aprender na prática e participar de desafios reais do negócio. A cada projeto, ganhei mais confiança e desenvolvi habilidades que levarei para toda a minha carreira.',
      'Para quem busca um ambiente acolhedor, com oportunidades de crescimento e aprendizado constante, a Redion é um lugar onde realmente é possível evoluir.',
    ],
    nome: 'Maycon Diodato Franca',
    cargo: 'Estagiário da Tesouraria',
    foto: 'images/depoimentos/maycon.webp',
  },
  {
    texto: [
      'Entrei na Redion como estagiária e hoje, cinco anos depois, atuo como advogada em projetos que impactam diretamente o negócio. Essa trajetória só foi possível por causa do ambiente colaborativo daqui, onde as equipes caminham juntas e cada desafio estratégico se transforma em aprendizado. A empresa acredita no potencial de quem está começando. Para quem busca evoluir na prática, a Redion é o lugar certo para dar os primeiros passos e construir uma carreira sólida.',
    ],
    nome: 'Luana Ribeiro',
    cargo: 'Advogada Pleno',
    foto: 'images/depoimentos/luana.webp',
  },
  {
    texto: [
      'Na Redion, acreditamos no potencial das pessoas. Minha trajetória, de Analista Sênior a Coordenadora em apenas 1 ano e meio, mostra como investir em talentos fortalece nossas futuras lideranças. O Programa Trainee é uma oportunidade para acelerar o aprendizado, desenvolver uma visão ampla do negócio e construir conexões entre áreas. Espero que os novos profissionais sejam curiosos, protagonistas e enxerguem os processos com olhar de companhia, indo além dos silos e contribuindo para resultados cada vez melhores.',
    ],
    nome: 'Mikaeli Marques de Souza',
    cargo: 'Coordenadora de Rede de Prestadores',
    foto: 'images/depoimentos/mikaeli.webp',
  },
] as const;

/** Texto de apoio do FAQ — enviado pelo cliente em 03/08/2026. */
export const FAQ_INTRO = [
  'Ainda ficou com alguma dúvida?',
  'Entre em contato com a equipe de suporte da Eureca por meio da nossa Central de Ajuda. Acesse no botão abaixo!',
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
