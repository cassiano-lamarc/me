// Registros históricos: nunca equivalem automaticamente a uma posição atual.
export const VERIFIED_AT = '2026-10-20';
export const unknown = (note = 'Posição não confirmada nesta base. Falta pesquisa ou validação de fonte para este recorte.') => ({ stance: 'unknown', sources: [], verifiedAt: null, note });
const position = (stance, title, url, date, summary, note) => ({ stance, verifiedAt: VERIFIED_AT, sources: [{ title, url, date, summary }], note });
export const evidence = {
  'intervencao-df-2023': {
    lula: position('favor', 'Decreto 11.377 — Presidência da República', 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/decreto/d11377.htm', '2023-01-08', 'Lula assinou a intervenção federal na segurança pública do DF, com Ricardo Cappelli como interventor e prazo até 31 de janeiro.', 'Evidência do ato específico, incluindo o interventor escolhido; não de toda intervenção possível.'),
    'flavio-bolsonaro': position('against', 'Pronunciamento de Flávio Bolsonaro — Senado', 'https://www25.senado.leg.br/web/atividade/pronunciamentos/-/p/pronunciamento/495483', '2023-01-10', 'Declarou voto contrário à aprovação da intervenção, criticando a escolha e a isenção do interventor.', 'Declaração pessoal, não lista nominal. No mesmo discurso, condenou os ataques e defendeu punições; oposição à medida não significa apoio aos ataques.')
  },
  'decreto-armas-2023': {
    lula: position('favor', 'Decreto 11.615 — registro original da Presidência', 'https://legislacao.presidencia.gov.br/atos?ano=2023&ato=bf7cXUE50MZpWT3b4&data=21%2F07%2F2023&numero=11615&tipo=DEC', '2023-07-21', 'Lula assinou a regulamentação da aquisição, registro e acesso a armas, das atividades de CACs e das entidades de tiro.', 'Recorte da edição original em julho de 2023. O decreto recebeu alterações posteriores.'),
    'flavio-bolsonaro': position('against', 'PDL 193/2023 — autoria e ementa, Senado', 'https://www25.senado.leg.br/web/atividade/materias/-/materia/158826', '2023-07-25', 'Flávio apresentou, com outros senadores, proposta para sustar os efeitos do Decreto 11.615/2023.', 'A classificação contrária à manutenção do decreto decorre de autoria legislativa; não é voto nominal nem promessa eleitoral.')
  },
  'marco-temporal': {
    lula: position('against', 'Mensagem de veto 536/2023 — Presidência', 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/msg/vep/vep-536-23.htm', '2023-10-20', 'Vetou a exigência de ocupação em 5 de outubro de 1988 como critério de demarcação, ressalvadas as exceções do texto.', 'Não descreve a situação jurídica atual.'),
    'flavio-bolsonaro': { ...unknown('A lista do PL 2.903/2023 registra ausência por atividade parlamentar. Isso não é abstenção nem prova de posição.'), sources: [{title:'Votações do PL 2.903/2023 — Senado',url:'https://www25.senado.leg.br/web/atividade/materias/-/materia/157888/votacoes',date:'2023-09-27',summary:'Registro sem voto de Flávio; não autoriza classificá-lo como favorável ou contrário.'}] }
  }
};

// Novos registros são descrições contextuais, sem classificação binária do tema.
const record = (label,title,url,date,summary,note) => ({stance:'documented',label,verifiedAt:VERIFIED_AT,sources:[{title,url,date,summary}],note});
evidence['renda-basica'] = {
  lula: record('Sancionou o Bolsa Família em 2023','Lei 14.601/2023 — Presidência','https://www.presidencia.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14601.htm','2023-06-19','Sancionou a transferência condicionada de renda. O art. 10 inclui acompanhamento de saúde e frequência escolar.','Registro da lei de 2023, não endosso de qualquer valor ou regra posterior. O texto consolidado contém alterações posteriores identificadas.'),
  'flavio-bolsonaro': {...unknown('Há manifestação sobre financiamento na PEC da Transição, mas ela não confirma posição sobre as condicionalidades desta pergunta. Não foi atribuída oposição ao programa.'),sources:[{title:'Pronunciamento de Flávio — PEC da Transição',url:'https://www25.senado.leg.br/web/atividade/pronunciamentos/-/p/pronunciamento/494920',date:'2022-12-07',summary:'Defendeu destaque relativo ao financiamento e ao poder de compra do benefício. O encaminhamento não estabelece posição sobre toda a política de renda condicionada.'}]}
};
evidence['escola-integral'] = {
  lula: record('Sancionou o Programa Escola em Tempo Integral','Lei 14.640/2023 — Presidência','https://www.presidencia.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14640.htm','2023-07-31','Sancionou assistência técnica e financeira para novas matrículas; a lei considera jornada de pelo menos sete horas diárias ou 35 semanais.','Recorte do programa de 2023. Não comprova efeitos no aprendizado nem disponibilidade atual de vagas.'),
  'flavio-bolsonaro': unknown('Pesquisa de registros individuais não confirmou posição sobre este recorte. Aprovação coletiva não foi atribuída como voto pessoal.')
};
evidence['salario-minimo'] = {
  lula: record('Sancionou a regra de valorização em 2023','Lei 14.663/2023 — Presidência','https://www.presidencia.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14663.htm','2023-08-28','Sancionou regra a partir de 2024 que combina INPC e crescimento real do PIB do segundo ano anterior.','Descreve a regra sancionada em 2023; não certifica sua vigência sem alterações nem apoio a qualquer limite futuro.'),
  'flavio-bolsonaro': unknown('Não foi confirmado registro individual sobre a fórmula exata desta pergunta. Pesquisa documental permanece pendente.')
};
evidence['moradia-social'] = {
  lula: record('Sancionou a retomada do Minha Casa, Minha Vida','Lei 14.620/2023 — Presidência','https://www.presidencia.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14620.htm','2023-07-13','Sancionou o novo programa habitacional, destinado a facilitar acesso à moradia, incluindo subsídios para famílias de menor renda.','É o programa de 2023, com faixas e modalidades próprias; não se presume apoio a todo modelo de subsídio habitacional.'),
  'flavio-bolsonaro': unknown('Falta confirmação de registro individual para subsídio com recursos orçamentários neste recorte.')
};
evidence['igualdade-salarial'] = {
  lula: record('Sancionou lei com transparência salarial','Lei 14.611/2023 — Presidência','https://www.presidencia.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14611.htm','2023-07-03','Sancionou lei com mecanismos de transparência e fiscalização da remuneração, incluindo relatórios para empresas com cem ou mais empregados.','A sanção abrange um conjunto de medidas. Não representa aprovação de qualquer regulamentação futura.'),
  'flavio-bolsonaro': record('Anunciou oposição ao PL 1.085/2023 na CAE','Manifestação na CAE — Agência Senado','https://www12.senado.leg.br/noticias/materias/2023/05/31/igualdade-salarial-entre-mulheres-e-homens-passa-na-cae-e-vai-ao-plenario/','2023-05-31','Anunciou voto contrário ao projeto, citando dúvidas sobre efetividade e judicialização; declarou-se favorável à igualdade salarial.','Oposição ao projeto completo não prova oposição isolada aos relatórios. Manifestação na comissão, não voto nominal em Plenário. A fonte descreve relatórios para empresas com cem ou mais empregados.')
};
evidence['universidade-cotas'] = {
  lula: record('Sancionou a revisão da Lei de Cotas','Sanção da ampliação das cotas — Agência Senado','https://www12.senado.leg.br/noticias/noticias/materias/2023/11/14/sancionada-ampliacao-da-lei-de-cotas','2023-11-13','Sancionou a Lei 14.723/2023, que reformula a reserva de vagas no ensino federal e inclui estudantes quilombolas.','Registro de uma lei com critérios sociais e raciais combinados; não permite isolar apoio a toda fórmula possível de cotas.'),
  'flavio-bolsonaro': {...unknown('A manifestação sobre preferência por uma emenda não confirma, isoladamente, apoio ou oposição a todos os critérios da pergunta.'),sources:[{title:'Pronunciamento de Flávio — PL 5.384/2020',url:'https://www25.senado.leg.br/web/atividade/pronunciamentos/-/p/pronunciamento/501657',date:'2023-10-24',summary:'Defendeu preferência para a emenda substitutiva e argumentou pela inclusão de todos os pobres. Não foi convertido em posição geral sobre a política combinada de cotas.'}]}
};
evidence['tributos-consumo'] = {
  lula: unknown('A pergunta não identifica uma versão legislativa. Ainda falta vincular uma manifestação pessoal ao recorte federal e regional exato, sem equiparar textos distintos.'),
  'flavio-bolsonaro': {
    stance:'documented',label:'Coautor em 2019; oposição ao texto debatido em 2023',verifiedAt:VERIFIED_AT,
    note:'São projetos e momentos diferentes. Coautoria não é voto nominal. A crítica à versão de 2023 não foi convertida em oposição geral ao IVA ou ao princípio de simplificação.',
    sources:[
      {title:'PEC 110/2019 — autoria e tramitação, Senado',url:'https://www25.senado.leg.br/web/atividade/materias/-/materia/137699',date:'2019-07-09',summary:'O registro identifica Flávio entre os autores da PEC que propõe substituir tributos e criar imposto sobre bens e serviços.'},
      {title:'Debate da reforma em 2023 — Agência Senado',url:'https://www12.senado.leg.br/noticias/noticias/materias/2023/11/08/reforma-tributaria-posicao-resiste-mas-texto-obtem-apoio-necessario',date:'2023-11-08',summary:'A Agência Senado o identifica entre os senadores que acompanharam críticas à versão em debate. Isso não caracteriza oposição a toda reforma tributária.'}
    ]
  }
};
evidence['arcabouco'] = {
  lula: record('Sancionou o regime fiscal de 2023','Lei Complementar 200/2023 — Presidência','https://www.presidencia.gov.br/ccivil_03/leis/lcp/lcp200.htm','2023-08-30','Sancionou regra de crescimento das despesas vinculada à receita, com limites de expansão real e condições ligadas às metas fiscais.','Sanção de um regime específico, com vetos. A pergunta é mais ampla; versões posteriores e texto aprovado no Senado não foram equiparados.'),
  'flavio-bolsonaro': unknown('A validação do registro nominal e do texto específico permanece pendente. Não se atribuiu uma posição geral a partir de versões distintas do projeto.')
};
