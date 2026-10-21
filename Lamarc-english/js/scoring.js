import { levels, config } from './config.js';
export function estimate(counts) {
  let index=-1;
  for (let i=0;i<levels.length;i++) { if(counts[i]<3) break; index=i; }
  return { level:index<0?'Abaixo de A1':levels[index], irregular:counts.slice(index+2).some(n=>n>=3) };
}
export function score(attempt, bank) {
  const counts=levels.map(level=>attempt.items.filter(item=>{
    const q=bank.find(q=>q.id===item.id);
    return q.level===level && attempt.answers[q.id]===q.correctOptionId;
  }).length);
  const total=counts.reduce((a,b)=>a+b,0);
  return {...estimate(counts),counts,total,percent:Math.round(total/24*100),
    date:new Date(attempt.finishedAt).toLocaleString('pt-BR'),
    duration:Math.max(0,Math.min(attempt.finishedAt-attempt.startedAt,attempt.untimed?Infinity:config.durationMs))};
}
export function recommendation(level) {
  if (['C1','C2'].includes(level)) return 'Refine leitura crítica, nuances, coesão e registro. Há indícios de '+level+' nas habilidades avaliadas. Procure uma avaliação complementar, incluindo fala, compreensão oral e produção escrita.';
  if (['B1','B2'].includes(level)) return 'Consolide tempos verbais, condicionais e collocations. Leia textos argumentativos e pratique identificar evidências e inferências.';
  return 'Reforce fundamentos A1/A2: verbo be, presente e passado, perguntas, rotina e vocabulário cotidiano. Leia textos curtos e revise os exemplos da correção.';
}
