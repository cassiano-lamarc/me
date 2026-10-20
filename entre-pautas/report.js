import { CANONICAL_URL } from './candidates.js';
import { levels, answerLabel } from './data.js';
import { compareDocuments, positionLabel, coverageLabel } from './score.js';
export const dateLabel=s=>new Date(s.createdAt).toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'});
export const sourceDateLabel=source=>source.date||('Publicação não informada; consulta em '+source.accessedAt);
export const resultTitle=()=> 'Propostas e registros públicos';
export const coverageText=c=>c.total+' perguntas com posições documentadas: '+c.coverage.both+' com registros dos dois, '+c.coverage.one+' de apenas um e '+c.coverage.none+' sem registros confirmados.';
export const groupCoverageText=g=>g.name+': '+(g.percent===null?'—':g.percent+'%')+' de cobertura documental ('+g.count+' de '+g.total+' perguntas).';
export function summaryText(session,proposals){const c=compareDocuments(session,proposals);return [resultTitle(),coverageText(c),...c.byGroup.map(groupCoverageText),'Cobertura da base documental, independente das respostas do visitante.',CANONICAL_URL].join('\n');}
export function rowText(row,index){
 const p=row.proposal,lines=[(index+1)+'. '+p.title,'Sua resposta: '+answerLabel(row.answer),coverageLabel(row.coverage),'Contexto: '+p.conditions];
 for(const {candidate,position} of row.records){lines.push(candidate.name+': '+positionLabel(position)+'. Conferência: '+(position?.verifiedAt||'Pendente')+'.',position?.note||'');for(const source of position?.sources||[])lines.push('Fonte: '+source.title+' | '+sourceDateLabel(source)+' | '+source.url,source.summary);}
 return lines;
}
export function textReport(session,proposals){return ['entre pautas — comparação factual',levels[session.level].label+' — '+dateLabel(session),summaryText(session,proposals),'Programas vinculados pelo TSE para as eleições de 2026. Apoio ao recorte não iguala modelos ou instrumentos.','Expectativa opcional: '+(session.expectation||'Não respondida'),'',...compareDocuments(session,proposals).rows.flatMap((row,i)=>[...rowText(row,i),'']),'Fotos: Ricardo Stuckert/PR (CC BY 2.0); Carlos Moura/Agência Senado (CC BY-SA 4.0).','Desenvolvido por Cassiano Lamarc — https://cassianolamarc.com.br/'].join('\n');}
export function downloadBlob(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);}
