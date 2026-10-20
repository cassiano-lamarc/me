export const PLAN_REVIEWED_AT='2026-10-20';
export const governmentPlans={
  lula:{
    title:'Programa de Governo — Lula — Eleições 2026',
    indexUrl:'https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/lula-propostas-de-governo',
    url:'https://www.tse.jus.br/eleicoes/eleicoes-2026-content/arquivos/proposta-pt/@@display-file/file/proposta-pt.pdf',pageCount:84
  },
  'flavio-bolsonaro':{
    title:'Diretrizes do Plano de Governo — Flávio Bolsonaro — 2027–2030',
    indexUrl:'https://www.tse.jus.br/eleicoes/eleicoes-2026-content/propostas-de-governo-dos-candidatos-ao-cargo-de-presidente-da-republica-eleicoes-2026/flavio-bolsonaro',
    url:'https://www.tse.jus.br/eleicoes/eleicoes-2026-content/arquivos/proposta-pl/@@display-file/file/proposta-pl.pdf',pageCount:76
  }
};
function position(actor,pages,summary){
  const plan=governmentPlans[actor];
  return {stance:'favor',verifiedAt:PLAN_REVIEWED_AT,note:'Proposta do programa consultado; execução e instrumentos devem ser avaliados separadamente.',sources:[{
    title:plan.title+' — PDF, página'+(pages.length>1?'s ':' ')+pages.join(', '),
    url:plan.url+'#page='+pages[0],indexUrl:plan.indexUrl,
    date:null,dateStatus:'notProvided',accessedAt:PLAN_REVIEWED_AT,planYear:2026,
    pages,pageCount:plan.pageCount,summary
  }]};
}
// Each recut is the common documented proposal, not an inference from silence.
const rows=[
  ['escola-integral','Educação','Apoiar a oferta de educação em tempo integral?',
    'A jornada ampliada pode incluir ensino e atividades complementares.','Uma escola poderia oferecer atividades no contraturno.','Não fixa sete horas, orçamento ou modelo pedagógico.',
    [31],'Prioriza expansão do tempo integral com financiamento educacional.',[35],'Apoia tempo integral, reforço e atividades formativas.'],
  ['creches','Educação','Ampliar a oferta de vagas em creches?',
    'A oferta de vagas atende crianças e famílias.','Uma família poderia acessar uma nova vaga.','Não equipara construção pública e vouchers; consulte cada modelo.',
    [31],'Amplia apoio à construção de creches e educação infantil.',[21],'Amplia creches; prevê voucher enquanto faltar vaga pública.'],
  ['internet-escolas','Tecnologia','Ampliar o acesso à internet nas escolas?',
    'A conectividade permite usar recursos digitais no ensino.','Uma escola poderia melhorar sua conexão.','Não iguala metas, equipamentos ou prazos dos programas.',
    [32],'Propõe universalizar conectividade adequada nas escolas.',[24,35],'Prioriza escolas na conectividade e prevê internet e equipamentos.'],
  ['sus-atencao','Saúde','Fortalecer a atenção primária e as equipes de Saúde da Família?',
    'Essas equipes acompanham a saúde perto da comunidade.','Uma unidade poderia ampliar seu acompanhamento territorial.','Não fixa valores de repasse nem presume medidas idênticas.',
    [34,35],'Apoia expansão e qualificação das equipes de Saúde da Família.',[37,38],'Propõe ampliar Saúde da Família e ações preventivas.'],
  ['telemedicina','Saúde','Ampliar a telessaúde como recurso de atendimento no SUS?',
    'O atendimento a distância depende de adequação clínica.','Uma consulta adequada poderia usar comunicação remota.','Não substitui todo atendimento presencial nem garante resultados clínicos.',
    [35,38],'Amplia teleconsultas e infraestrutura de telessaúde.',[38],'Prevê telessaúde e atendimento médico por aplicativo.'],
  ['saude-mental','Saúde','Ampliar os serviços de atendimento em saúde mental?',
    'Serviços de saúde mental oferecem acompanhamento especializado.','Uma pessoa poderia acessar uma equipe de atendimento.','Não atribui o modelo CAPS a ambos os programas.',
    [39],'Amplia investimentos na atenção psicossocial e nos CAPS.',[39],'Amplia atenção à saúde mental e apoio a cuidadores.'],
  ['moradia-social','Moradia','Ampliar o acesso à moradia por programas habitacionais?',
    'Programas habitacionais podem adotar diferentes formas de acesso.','Uma família poderia acessar uma linha habitacional.','Não equipara subsídios e financiamento nem fixa a mesma faixa de renda.',
    [45],'Mantém e amplia MCMV, priorizando famílias de menor renda.',[47],'Propõe Casa Verde e Amarela e financiamento com juros menores.'],
  ['energia-renovavel','Energia','Apoiar a expansão das fontes renováveis de energia?',
    'A expansão pode envolver geração e integração ao sistema energético.','Um projeto poderia ampliar a participação de fontes renováveis.','Não afirma incentivos exclusivos a solar e eólica.',
    [64],'Propõe aumentar a participação de fontes renováveis.',[63],'Busca investimentos em transição energética e fontes renováveis.']
];
export const planProposals=rows.map(([id,category,title,details,example,conditions,lulaPages,lulaSummary,flavioPages,flavioSummary])=>({
  id,category,title,details,example,conditions,sourceEdition:'tse-2026',positions:{
    lula:position('lula',lulaPages,lulaSummary),
    'flavio-bolsonaro':position('flavio-bolsonaro',flavioPages,flavioSummary)
  }
}));
