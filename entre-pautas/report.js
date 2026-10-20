import { candidates, CANONICAL_URL } from './candidates.js';
import { levels, proposalById, answerLabel } from './data.js';
import { calculate, exclusion } from './score.js';
export const dateLabel = session => new Date(session.createdAt).toLocaleString('pt-BR', { timeZone:'America/Sao_Paulo' });
export function resultTitle(score) {
  if (!score.denominator) return 'Ainda sem comparação';
  return score.leaders.length === 2 ? 'Empate nas coincidências' : `Mais coincidências com ${score.leaders[0].name}`;
}
export function summaryText(session, proposals) {
  const score = calculate(session, proposals);
  return [resultTitle(score), ...score.results.map(r => `${r.name}: ${r.percent === null ? 'sem percentual' : r.percent + '%'} (${r.count}/${score.denominator} respostas elegíveis).`), 'Coincidência de propostas. Não é recomendação de voto.', CANONICAL_URL].join('\n');
}
export function textReport(session, proposals) {
  const score = calculate(session, proposals);
  const lines = ['entre pautas — beta', `Pesquisa ${levels[session.level].label} — ${dateLabel(session)} (São Paulo)`, summaryText(session,proposals), '', 'Base histórica restrita. Percentuais independentes; não precisam somar 100%. Pautas exploratórias, Depende e Sem opinião ficam fora do denominador.', `Expectativa opcional: ${session.expectation || 'Não respondida'}`, ''];
  session.questionOrder.forEach((id,i) => {
    const p = proposalById[id];
    lines.push(`${i+1}. ${p.title}`, `Resposta: ${answerLabel(session.answersByQuestionId[id])}`, exclusion(p,session.answersByQuestionId[id]), `Detalhes: ${p.details}`, `Exemplo: ${p.example}`, `Condições: ${p.conditions}`);
    candidates.forEach(c => {
      const pos = p.positions[c.id];
      lines.push(`${c.name}: ${['favor','against'].includes(pos.stance) ? answerLabel(pos.stance) : 'Sem evidência suficiente'}. Conferência: ${pos.verifiedAt || 'Pendente'}.`, pos.note || '');
      pos.sources.forEach(s => lines.push(`Fonte: ${s.title} | ${s.date} | ${s.url}`, s.summary));
    });
    lines.push('');
  });
  lines.push('Desenvolvido por Cassiano Lamarc — https://cassianolamarc.com.br/', 'Fotos: Lula — Ricardo Stuckert/PR (CC BY 2.0); Flávio Bolsonaro — Carlos Moura/Agência Senado (CC BY-SA 4.0).', 'As respostas permanecem na memória desta sessão até o recarregamento. Este arquivo foi gerado por ação do usuário.');
  return lines.join('\n');
}
export function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = name; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
