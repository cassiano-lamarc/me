import { candidates } from './candidates.js';
// Coverage describes documents, never the visitor's political affinity.
export const hasRecord = p => Boolean(p && ['favor','against','documented'].includes(p.stance) && p.verifiedAt && p.sources?.some(s => /^https:\/\//.test(s.url) && s.date && s.summary));
export const positionLabel = p => hasRecord(p) ? p.label || ({favor:'A favor no recorte documentado',against:'Contrário no recorte documentado'}[p.stance] || 'Registro público contextualizado') : 'Posição não confirmada';
export const isComparable = p => candidates.every(c => hasRecord(p.positions?.[c.id]));
export function documentCoverage(p) { const n=candidates.filter(c => hasRecord(p.positions?.[c.id])).length; return n===2?'both':n===1?'one':'none'; }
export const coverageLabel = key => ({both:'Registros dos dois',one:'Registro de apenas um',none:'Nenhum registro de posição confirmado'}[key]);
export function compareDocuments(session, proposals) {
  const byId=new Map(proposals.map(p=>[p.id,p])),coverage={both:0,one:0,none:0};
  const rows=session.questionOrder.map(id=>{
    const proposal=byId.get(id);if(!proposal)throw new Error('Proposta não encontrada: '+id);
    const kind=documentCoverage(proposal);coverage[kind]++;
    return {proposal,answer:session.answersByQuestionId[id],coverage:kind,records:candidates.map(candidate=>({candidate,position:proposal.positions?.[candidate.id],confirmed:hasRecord(proposal.positions?.[candidate.id])}))};
  });
  return {total:rows.length,coverage,rows};
}
