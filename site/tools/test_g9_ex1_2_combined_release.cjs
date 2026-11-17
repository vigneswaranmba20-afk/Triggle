'use strict';
// Combined English release gate: all 34 source-backed parts uniquely present, with no staging duplication.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const html=read('site/index.html'),sw=read('site/service-worker.js');
const lessons=['g9-ch1-ex1-2-q1-en.js','g9-ch1-ex1-2-q2-en.js','g9-ch1-ex1-2-q5-iii-q6-en.js','g9-ch1-ex1-2-q3-q5-batch1-en.js','g9-ch1-ex1-2-q7-q10-en.js'];
for(const file of lessons){const p='data/textbook-exercises/'+file;assert.equal(html.split(p).length-1,1,'One student module '+file);assert(sw.includes("'./"+p+"'"),'Offline module '+file);}
for(const file of ['why-step-g9-ex1-2-q3-q5-batch1.js','why-step-g9-ex1-2-q7-q10.js']){
 assert.equal(html.split('data/'+file).length-1,1,'Exactly one Why-step module '+file);
 assert(sw.includes("'./data/"+file+"'"),'Offline Why-step '+file);
}
assert(!html.includes('g9-ch1-ex1-2-en.js'),'Never expose the 34-part generic staging module');
const scriptPaths=[...html.matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"]*)?"/g)].map(m=>'site/'+m[1]);
const ctx={window:{},console};vm.createContext(ctx);
for(const file of scriptPaths)vm.runInContext(read(file),ctx,{filename:file,timeout:20000});
const source=JSON.parse(read('docs/curriculum/grade-9/candidates/g9-ch1-ex1-2-english-34.json'));
const items=ctx.window.TRIGGLE_CLASSES[9].items,ids=source.rows.map(x=>x.id);
const menu=ctx.window.TRIGGLE_CURRICULUM.grades.find(x=>x.grade===9).chapters.find(x=>String(x.number)==='1').textbookQuestionIds;
assert.equal(ids.length,34);assert.equal(new Set(ids).size,34);
for(const id of ids){
 const all=items.filter(q=>q.id===id);assert.equal(all.length,1,'One student question '+id);
 assert.equal(menu.filter(x=>x===id).length,1,'One textbook navigation target '+id);
 const q=all[0];assert.equal(q.releaseStatus,'english-preview');
 assert.equal(q.translationReview,'pending');assert(!q.q.ta,'No invented Tamil '+id);
 assert(q.q.en&&q.answer&&q.steps.length>=2,'Complete English working '+id);
 const why=ctx.window.TriggleWhyStepG9.hints[id];
 assert(why&&why.en&&!why.ta,'English-only Why-step bridge '+id);
 assert(ctx.window.TriggleDifficulty.get(q)?.grade===9,'Difficulty metadata '+id);
}
assert.equal(new Set(items.map(x=>x.id)).size,items.length,'No duplicate Grade 9 IDs');
const app=read('site/assets/app.js');
assert(app.includes("(grade===9&&String(chapter?.number)==='1')"),'Student navigation must sort Grade 9 Chapter 1 textbook batches');
const candidateItems=items.filter(q=>ids.includes(q.id));
const roman={i:1,ii:2,iii:3,iv:4,v:5,vi:6,vii:7,viii:8};
const byQuestion=q=>{
 const match=q.id.match(/-q(\d+)(?:-([ivx]+))?$/);
 return [match?Number(match[1]):Number.MAX_SAFE_INTEGER,match?.[2]?roman[match[2]]||99:0];
};
const textbookOrder=[...candidateItems].sort((a,b)=>{
 const ex=String(a.exercise||'').localeCompare(String(b.exercise||''),undefined,{numeric:true});
 if(ex)return ex;
 const x=byQuestion(a),y=byQuestion(b);return x[0]-y[0]||x[1]-y[1];
}).map(q=>q.id);
assert.deepEqual(textbookOrder,ids,'Grade 9 Ex1.2 Next/Previous order matches source Q1(i)–Q10(iii)');

const {buildPlan}=require('./bulk/trace_g9_g10_batch.cjs');
const plan=buildPlan();
assert.equal(plan.grade9.registeredCandidateIds,34);
assert.equal(plan.grade9.notRegisteredCandidateIds,0);
assert.equal(plan.grade10.registeredTaskIds,21,'Preserve Grade 10 Exercise 2.5 source audit');
console.log('PASS G9 Exercise 1.2: all 34 source-audited English parts, no duplicates, all steps and Why hints, offline modules and 21 G10 Ex2.5 registrations; Tamil pending.');
