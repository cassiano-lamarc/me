import { candidates } from './candidates.js';
import { groupEntries } from './group-records.js';
// Coverage describes documents, never the visitor's political affinity.
export const hasRecord = p => Boolean(p && ['favor','against','documented'].includes(p.stance) && p.verifiedAt && p.sources?.some(s => /^https:\/\//.test(s.url) && s.date && s.summary));
export const positionLabel = p => hasRecord(p) ? p.label || ({favor:'A favor no recorte documentado',against:'Contrário no recorte documentado'}[p.stance] || 'Registro público contextualizado') : 'Posição não confirmada';
export const isComparable = p => candidates.every(c => groupEntries(p,c).some(entry=>hasRecord(entry.position)));
export function documentCoverage(p) { const n=candidates.filter(c => groupEntries(p,c).some(entry=>hasRecord(entry.position))).length; return n===2?'both':n===1?'one':'none'; }
export const coverageLabel = key => ({both:'Registros dos dois grupos',one:'Registro de apenas um grupo',none:'Nenhum registro de posição confirmado'}[key]);
export function compareDocuments(session, proposals) {
  const byId=new Map(proposals.map(p=>[p.id,p])),coverage={both:0,one:0,none:0};
  const rows=session.questionOrder.map(id=>{
    const proposal=byId.get(id);if(!proposal)throw new Error('Proposta não encontrada: '+id);
    const kind=documentCoverage(proposal);coverage[kind]++;
    return {proposal,answer:session.answersByQuestionId[id],coverage:kind,records:candidates.map(candidate=>{
      const entries=groupEntries(proposal,candidate),primary=entries.find(e=>hasRecord(e.position));
      return {candidate,entries,primaryAuthor:primary?.author||null,position:primary?.position||entries[0].position,confirmed:Boolean(primary)};
    })};
  });
  const byGroup=candidates.map(candidate=>{
    const count=rows.filter(row=>row.records.find(r=>r.candidate.id===candidate.id).confirmed).length;
    return {id:candidate.id,name:candidate.name,count,total:rows.length,percent:rows.length?Math.round(count/rows.length*100):null};
  });
  return {total:rows.length,coverage,byGroup,rows};
}
