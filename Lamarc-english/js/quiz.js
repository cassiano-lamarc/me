import { levels, config } from './config.js';
import { read, write, remove } from './storage.js';
export function shuffle(values, random=Math.random) {
  const copy=[...values];
  for(let i=copy.length-1;i>0;i--) {const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}
  return copy;
}
export function draw(bank, history={}) {
  const groups = history.groups && typeof history.groups==='object' ? {...history.groups} : {};
  const previous = Array.isArray(history.previous)?history.previous:[];
  const items=[];
  for (const level of levels) {
    const block=[];
    for (const [skill, quota] of Object.entries({grammar:2,vocabulary:1,reading:1})) {
      const key=level+':'+skill, pool=bank.filter(q=>q.level===level && q.skill===skill);
      let seen=Array.isArray(groups[key])?groups[key].filter(id=>pool.some(q=>q.id===id)):[];
      const selected=[];
      while(selected.length<quota) {
        let available=pool.filter(q=>!seen.includes(q.id) && !selected.includes(q));
        if(!available.length) {seen=[];available=pool.filter(q=>!selected.includes(q));}
        const fresh=available.filter(q=>!previous.includes(q.id));
        const choice=shuffle(fresh.length?fresh:available)[0];
        selected.push(choice);seen.push(choice.id);
      }
      groups[key]=seen;
      block.push(...selected);
    }
    items.push(...shuffle(block).map(q=>({id:q.id,options:shuffle(q.options).map(o=>o.id)})));
  }
  // Salvaguarda para históricos manipulados que reproduzam o conjunto anterior.
  if(items.every(item=>previous.includes(item.id))) {
    const first=items[0], q=bank.find(q=>q.id===first.id);
    const replacement=shuffle(bank.filter(other=>other.level===q.level && other.skill===q.skill && !previous.includes(other.id)))[0];
    if(replacement) {first.id=replacement.id;first.options=shuffle(replacement.options).map(o=>o.id);groups[q.level+':'+q.skill].push(replacement.id);}
  }
  return {items,history:{groups,previous:items.map(item=>item.id)}};
}
export function createAttempt(bank,untimed=false) {
  const selected=draw(bank,read('history')||{});
  write('history',selected.history); // Registra exposição antes da primeira questão.
  const now=Date.now();
  return {version:config.bankVersion,state:'answering',items:selected.items,answers:{},index:0,startedAt:now,deadline:untimed?null:now+config.durationMs,untimed,finishedAt:null,warned:false};
}
export function saveAttempt(attempt) {write('active',attempt,'sessionStorage');}
export function restoreAttempt(bank) {
  const a=read('active','sessionStorage');
  const valid=a && a.version===config.bankVersion && ['answering','reviewing'].includes(a.state) && Array.isArray(a.items) && a.items.length===24 && new Set(a.items.map(i=>i.id)).size===24 && Number.isFinite(a.startedAt) && typeof a.untimed==='boolean' && (a.untimed?a.deadline===null:Number.isFinite(a.deadline)) && Number.isInteger(a.index) && a.index>=0 && a.index<24 && a.answers && typeof a.answers==='object' && !Array.isArray(a.answers) && a.items.every(item=>{
    const q=bank.find(q=>q.id===item.id);
    return q && Array.isArray(item.options) && item.options.length===4 && new Set(item.options).size===4 && item.options.every(id=>q.options.some(o=>o.id===id)) && (a.answers[item.id]===undefined || a.answers[item.id]==='unknown' || q.options.some(o=>o.id===a.answers[item.id]));
  }) && levels.every(level=>['grammar','vocabulary','reading'].every(skill=>a.items.filter(i=>bank.some(q=>q.id===i.id&&q.level===level&&q.skill===skill)).length===(skill==='grammar'?2:1)));
  if(!valid) {remove('active','sessionStorage');return null;}
  return a;
}
export function finishAttempt(a, now=Date.now()) {
  if(a.state==='finished')return false;
  a.state='finished';a.finishedAt=a.untimed?now:Math.min(now,a.deadline);
  remove('active','sessionStorage');return true;
}
// Web Locks quando disponível; lease curto é somente uma proteção adicional.
export async function startWithLock(callback) {
  const run=async()=>{
    const lease=read('starting');
    if(lease && Date.now()-lease.time<2000) throw new Error('Outra aba está iniciando uma avaliação. Aguarde um instante e tente novamente.');
    const token=Math.random().toString(36).slice(2);write('starting',{token,time:Date.now()});
    try {return await callback();} finally {if(read('starting')?.token===token)remove('starting');}
  };
  return globalThis.navigator?.locks ? navigator.locks.request('lamarc-english-start',run):run();
}
