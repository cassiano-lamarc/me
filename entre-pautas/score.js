import { candidates } from './candidates.js';
import { hasBinaryEvidence, hasBothBinaryPositions } from './eligibility.js';
export const hasRecord=hasBinaryEvidence;
export const isComparable=hasBothBinaryPositions;
export const positionLabel=p=>hasRecord(p)?(p.stance==='favor'?'A favor':'Contra'):'Posição não confirmada';
export const coverageLabel=key=>({both:'Registros dos dois',one:'Registro de apenas um',none:'Nenhum registro confirmado'}[key]);
export function compareDocuments(session,proposals){
 const byId=new Map(proposals.map(p=>[p.id,p])),coverage={both:0,one:0,none:0};
 const rows=session.questionOrder.map(id=>{
  const proposal=byId.get(id);if(!proposal)throw Error('Proposta não encontrada: '+id);
  const records=candidates.map(candidate=>({candidate,position:proposal.positions?.[candidate.id],confirmed:hasRecord(proposal.positions?.[candidate.id])}));
  const count=records.filter(r=>r.confirmed).length,kind=count===2?'both':count===1?'one':'none';coverage[kind]++;
  return {proposal,answer:session.answersByQuestionId[id],records,coverage:kind};
 });
 const byGroup=candidates.map(candidate=>{const count=rows.filter(row=>row.records.find(r=>r.candidate.id===candidate.id).confirmed).length;return {id:candidate.id,name:candidate.name,count,total:rows.length,percent:rows.length?Math.round(count/rows.length*100):null};});
 return {total:rows.length,coverage,byGroup,rows};
}
