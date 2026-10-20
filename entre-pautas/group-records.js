// Independent authors remain independent, even when displayed in one dossier.
const authors={lula:'Lula','flavio-bolsonaro':'Flávio Bolsonaro',jair:'Jair Bolsonaro',pl:'PL — Partido Liberal',pt:'PT — Partido dos Trabalhadores'};
export const priorities={lula:['lula','pt'],'flavio-bolsonaro':['flavio-bolsonaro','jair','pl']};
const documented=(label,url,title,date,summary,note)=>({stance:'documented',label,verifiedAt:'2026-10-20',sources:[{url,title,date,summary}],note});
const ptSource='https://pt.org.br/para-lula-a-recuperacao-economica-comeca-pelas-mulheres/';
const plSource='https://partidoliberal.org.br/pl-realiza-convencao-nacional-e-aprova-novo-programa-partidario/';
export const supplementaryRecords={
  'sus-atencao':{pt:documented('Publicação partidária propõe ampliar a atenção básica',ptSource,'Rede PT — propostas para serviços públicos e cuidados','2022-09-06','A publicação apresenta investimento em serviços públicos e ampliação da atenção básica em saúde.','Proposta apresentada pela comunicação do PT em 2022. Não especifica valor ou mecanismo de financiamento das equipes e não é declaração direta de Lula.')},
  creches:{pt:documented('Publicação partidária propõe ampliar a rede de creches',ptSource,'Rede PT — propostas para serviços públicos e cuidados','2022-09-06','A publicação propõe ampliar e interiorizar a rede de cuidados, incluindo creches e educação infantil.','Não especifica a parcela federal de financiamento, os municípios ou o orçamento. É uma publicação do partido, não uma declaração pessoal.')},
  'escola-integral':{pt:documented('Publicação partidária inclui ensino integral na rede de cuidados',ptSource,'Rede PT — propostas para serviços públicos e cuidados','2022-09-06','Inclui o ensino integral entre os serviços públicos cuja ampliação é proposta.','Não define jornada de sete horas. Esse registro partidário não é equivalente ao recorte da lei de 2023.')},
  telemedicina:{jair:documented('Sancionou a autorização e disciplina da telessaúde','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14510.htm','Lei 14.510/2022 — Presidência','2022-12-27','Jair Bolsonaro sancionou lei de telessaúde que prevê consentimento e direito ao atendimento presencial, com regras aplicáveis ao SUS.','A lei autoriza e regulamenta a prática; não comprova expansão efetiva ou um plano de financiamento. Registro de Jair, sem atribuição a Flávio ou à campanha atual.')},
  'internet-escolas':{pl:{stance:'unknown',verifiedAt:null,note:'O programa partidário prioriza digitalização e conectividade, mas a publicação consultada não confirma a proposta específica de financiar internet nas escolas. Não é posição pessoal de Flávio ou Jair.',sources:[{url:plSource,title:'PL — aprovação do programa partidário',date:'2022-12-19',summary:'A nota oficial lista digitalização e conectividade como prioridades. Não detalha o financiamento da internet escolar. O PDF integral retornou acesso negado nesta consulta.'}]}}
};
export function groupEntries(proposal,candidate){
  return priorities[candidate.id].map(id=>({authorId:id,author:authors[id],position:id===candidate.id?proposal.positions?.[id]:supplementaryRecords[proposal.id]?.[id]}));
}
