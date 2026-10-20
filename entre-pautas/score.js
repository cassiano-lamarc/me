import { candidates } from './candidates.js';
export const isComparable = proposal => candidates.every(c => {
  const p = proposal.positions[c.id];
  return p && ['favor','against'].includes(p.stance) && p.verifiedAt && p.sources.some(s => /^https:\/\//.test(s.url) && s.date && s.summary);
});
export function calculate(session, proposals) {
  const eligible = session.questionOrder.map(id => proposals.find(p => p.id === id)).filter(p => p && isComparable(p) && ['favor','against'].includes(session.answersByQuestionId[p.id]));
  const results = candidates.map(c => {
    const matches = eligible.filter(p => p.positions[c.id].stance === session.answersByQuestionId[p.id]);
    const divergences = eligible.filter(p => p.positions[c.id].stance !== session.answersByQuestionId[p.id]);
    return { ...c, matches, divergences, count: matches.length, percent: eligible.length ? Math.round(matches.length / eligible.length * 100) : null };
  });
  const max = Math.max(...results.map(r => r.count));
  return { denominator: eligible.length, results, leaders: eligible.length ? results.filter(r => r.count === max) : [] };
}
export function exclusion(proposal, value) {
  if (!isComparable(proposal)) return 'Exploratória: evidência insuficiente para comparar os dois.';
  if (!value) return 'Não respondida; fora do cálculo.';
  if (!['favor','against'].includes(value)) return 'Resposta sem posição binária; fora do cálculo.';
  return 'Incluída no cálculo, com peso igual.';
}
