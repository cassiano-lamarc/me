import { CANONICAL_URL } from './candidates.js';
import { levels, answerLabel } from './data.js';
import { compareDocuments, positionLabel, coverageLabel } from './score.js';
export const dateLabel = session => new Date(session.createdAt).toLocaleString('pt-BR', { timeZone:'America/Sao_Paulo' });
export const resultTitle = () => 'Propostas e registros públicos';
export const groupContext = 'Consulta: Flávio → Jair → PL; Lula → PT. Cada documento mantém sua autoria e não comprova a posição dos demais.';
export const groupCoverageText = g => g.name+': '+(g.percent===null?'—':g.percent+'%')+' de cobertura documental ('+g.count+' de '+g.total+' perguntas com registros).';
export const coverageText = c => c.total+' perguntas: '+c.coverage.both+' com registros dos dois grupos, '+c.coverage.one+' de apenas um grupo e '+c.coverage.none+' sem registros de posição confirmados.';
export function summaryText(session, proposals) { const c=compareDocuments(session,proposals);return [resultTitle(),'Grupos: Lula e PT; Flávio Bolsonaro e PL.',coverageText(c),...c.byGroup.map(groupCoverageText),groupContext,'Cobertura documental não mede apoio, afinidade ou intenção de voto.',CANONICAL_URL].join('\n'); }
export function rowText(row,index) {
  const p=row.proposal,lines=[(index+1)+'. '+p.title,'Sua resposta: '+answerLabel(row.answer),coverageLabel(row.coverage),'Contexto da pergunta: '+p.conditions];
  for(const {candidate,entries,primaryAuthor} of row.records) {
    lines.push(candidate.name+' — referência contextual prioritária: '+(primaryAuthor||'nenhuma confirmada'));
    for(const {author,position} of entries){
      lines.push('Responsável: '+author+' — '+positionLabel(position)+'. Conferência: '+(position?.verifiedAt || 'Pendente')+'.',position?.note || 'Pesquisa pendente para este responsável e recorte.');
      for(const s of position?.sources || [])lines.push('Fonte: '+s.title+' | Manifestação/registro: '+s.date+' | '+s.url,s.summary);
    }
  }
  return lines;
}
export function textReport(session, proposals) {
  const c=compareDocuments(session,proposals);
  return ['entre pautas — comparação factual','Pesquisa '+levels[session.level].label+' — '+dateLabel(session)+' (São Paulo)',summaryText(session,proposals),'Registros históricos não certificam posições atuais. Ausência de registro não significa oposição.','Expectativa opcional: '+(session.expectation || 'Não respondida'),'',...c.rows.flatMap((row,i)=>[...rowText(row,i),'']),'Fotos: Lula — Ricardo Stuckert/PR (CC BY 2.0); Flávio Bolsonaro — Carlos Moura/Agência Senado (CC BY-SA 4.0).','Desenvolvido por Cassiano Lamarc — https://cassianolamarc.com.br/'].join('\n');
}
export function downloadBlob(blob,name) { const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000); }
