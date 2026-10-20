// Registros históricos: nunca equivalem automaticamente a uma posição atual.
export const VERIFIED_AT = '2026-10-20';
export const unknown = (note = 'Ainda não há evidência editorial suficiente para este recorte.') => ({ stance: 'unknown', sources: [], verifiedAt: null, note });
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
