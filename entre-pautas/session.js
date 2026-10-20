import { levels } from './data.js';
export function shuffle(ids, random = Math.random) {
  const order = [...ids];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}
export function createSession(level, random = Math.random) {
  if (!levels[level]) throw new Error('Nível inválido');
  return { level, questionOrder: shuffle(levels[level].ids, random), answersByQuestionId: {}, index: 0, expectation: '', revision: 0, createdAt: new Date().toISOString() };
}
export function answer(session, id, value) {
  if (!session.questionOrder.includes(id) || !['favor','against','depends','none'].includes(value)) throw new Error('Resposta inválida');
  if (session.answersByQuestionId[id] !== value) { session.answersByQuestionId[id] = value; session.revision++; }
}
