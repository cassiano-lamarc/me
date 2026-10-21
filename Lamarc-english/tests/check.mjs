import assert from 'node:assert/strict';
import { questions, validateBank } from '../js/questions.js';
import { levels, config } from '../js/config.js';
import { estimate, score } from '../js/scoring.js';
import { shuffle, draw, createAttempt, restoreAttempt, saveAttempt, finishAttempt, startWithLock } from '../js/quiz.js';
import { read, write, clearData, storageNotice } from '../js/storage.js';
class Store {
  data=new Map();get length(){return this.data.size;}key(i){return [...this.data.keys()][i];}
  getItem(k){return this.data.get(k)??null;}setItem(k,v){this.data.set(k,v);}removeItem(k){this.data.delete(k);}
}
globalThis.localStorage=new Store();globalThis.sessionStorage=new Store();
assert.equal(validateBank(),true);assert.equal(questions.length,120);
assert.throws(()=>validateBank([...questions,questions[0]]));
for(const [counts,level,irregular] of [
  [[3,3,3,1,0,0],'B1',false],[[4,2,4,4,3,3],'A1',true],[[2,0,0,0,0,0],'Abaixo de A1',false],[[4,4,4,4,4,4],'C2',false]
])assert.deepEqual(estimate(counts),{level,irregular});
let history={},previous=null;const cycle=new Set();let changedOrder=false;
for(let i=0;i<100;i++){
  const drawn=draw(questions,history);history=drawn.history;
  assert.equal(drawn.items.length,24);assert.equal(new Set(drawn.items.map(q=>q.id)).size,24);
  for(const level of levels){
    const block=drawn.items.slice(levels.indexOf(level)*4,levels.indexOf(level)*4+4).map(item=>questions.find(q=>q.id===item.id));
    assert.ok(block.every(q=>q.level===level));
    for(const [skill,count] of Object.entries({grammar:2,vocabulary:1,reading:1}))assert.equal(block.filter(q=>q.skill===skill).length,count);
  }
  for(const item of drawn.items){
    if(i<5){assert.ok(!cycle.has(item.id),'Repetição antes do primeiro ciclo');cycle.add(item.id);}
    if(previous)assert.ok(!previous.includes(item.id),'Evita tentativa imediatamente anterior');
    if(item.options.join('')!=='abcd')changedOrder=true;
  }
  previous=drawn.items.map(item=>item.id);
}
assert.equal(cycle.size,120);assert.ok(changedOrder);
const original=[1,2,3,4];shuffle(original);assert.deepEqual(original,[1,2,3,4]);
const attempt=createAttempt(questions);const deadline=attempt.deadline;
for(const item of attempt.items)attempt.answers[item.id]=questions.find(q=>q.id===item.id).correctOptionId;
saveAttempt(attempt);const restored=restoreAttempt(questions);assert.deepEqual(restored,attempt);assert.equal(restored.deadline,deadline);
assert.equal(JSON.stringify(restored).includes('name'),false);
assert.equal(finishAttempt(restored,deadline+90000),true);assert.equal(finishAttempt(restored),false);
assert.equal(restored.finishedAt,deadline);assert.equal(restoreAttempt(questions),null);
const result=score(restored,questions);assert.equal(result.level,'C2');assert.equal(result.total,24);assert.equal(result.percent,100);assert.equal(result.duration,config.durationMs);
const untimed=createAttempt(questions,true);saveAttempt(untimed);assert.equal(restoreAttempt(questions).deadline,null);
finishAttempt(untimed,untimed.startedAt+2000000);assert.equal(score(untimed,questions).duration,2000000);
const missing=createAttempt(questions);missing.answers[missing.items[0].id]='unknown';finishAttempt(missing);assert.equal(score(missing,questions).total,0);
write('active',{...attempt,items:[]},'sessionStorage');assert.equal(restoreAttempt(questions),null);
localStorage.setItem('lamarc-english:1:history','broken JSON');assert.equal(read('history'),null);
write('starting',{time:Date.now(),token:'other'});await assert.rejects(()=>startWithLock(()=>{}));clearData();
localStorage.setItem('unrelated','keep');write('history',{groups:{}});clearData();assert.equal(localStorage.getItem('unrelated'),'keep');assert.equal(read('history'),null);
let notice='';storageNotice(text=>notice=text);
Object.defineProperty(globalThis,'localStorage',{configurable:true,get(){throw Error('blocked');}});
write('history',{test:1});assert.deepEqual(read('history'),{test:1});assert.ok(notice.length);
Object.defineProperty(globalThis,'sessionStorage',{configurable:true,get(){throw Error('blocked');}});
const inMemory=createAttempt(questions);saveAttempt(inMemory);assert.deepEqual(restoreAttempt(questions),inMemory);clearData();
console.log('OK: 120 itens, cotas, pontuação, 100 sorteios, ciclos, retomada, expiração idempotente, modo sem limite, JSON inválido e armazenamento bloqueado.');
