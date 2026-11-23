'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const read=p=>fs.readFileSync(path.join(__dirname,'../..',p),'utf8');
const html=read('site/index.html'),sw=read('site/service-worker.js');
const scripts=[...html.matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"[^>]*><\/script>/g)].map(m=>'site/'+m[1]);
const context={window:{},console};vm.createContext(context);
for(const file of scripts)vm.runInContext(read(file),context,{filename:file,timeout:10000});
const lessons=new Map(context.window.TRIGGLE_CLASSES[10].items.map(item=>[item.id,item]));
const hints=context.window.TriggleWhyStepG10.hints,ids=Object.keys(hints);
assert.ok(lessons.size>=136,'Grade 10 baseline authored catalogue');
assert.equal(ids.length,268,'123 Chapter 3 Algebra bridges plus eight Exercise 2.3 bridges and the reviewed Grade 10 baseline');
const pages=['data/why-step-g10.js','data/why-step-g10-coverage.js','assets/why-step-g10.js','assets/why-step-g10.css'];
for(const asset of pages){assert.ok(html.includes('./'+asset),'HTML missing '+asset);assert.ok(sw.includes('./'+asset),'Offline cache missing '+asset);}
assert.ok(html.indexOf('data/why-step-g10.js')<html.indexOf('data/why-step-g10-coverage.js'),'Base must load before extension');
assert.ok(html.indexOf('data/why-step-g10-coverage.js')<html.indexOf('assets/app.js'),'Extension must load before first render');
assert.equal(context.window.TriggleWhyStepG10.review.ta,'editorial-pending');
const katex=require('../assets/vendor/katex/katex.min.js');
const chapters=new Set();let total=0,withVisual=0;
for(const id of ids){
 const item=lessons.get(id);assert.ok(item,'Unknown Class 10 item '+id);
 assert.equal(item.classNum,10);
 chapters.add(String(item.chapter));
 const entries=Array.isArray(hints[id])?hints[id]:[hints[id]];
 assert.ok(entries.length>=1&&entries.length<=3,'Keep disclosure sparse '+id);
 const seenSteps=new Set();
 for(const entry of entries){
  assert.ok(Number.isInteger(entry.step)&&entry.step>=0&&entry.step<item.steps.length,'Bad step index '+id);
  assert.ok(!seenSteps.has(entry.step),'Do not double-attach to a step '+id);
  seenSteps.add(entry.step);
  assert.ok(entry.expected.length>=10&&item.steps[entry.step].en.includes(entry.expected),'Stale explanation '+id);
  for(const lang of ['en','ta']){
   assert.ok(typeof entry[lang]==='string'&&entry[lang].length>=35,'Missing '+lang+' note '+id);
   assert.ok(!/<[A-Za-z][^>]*>/.test(entry[lang]),'No HTML tags in hint '+id);
  }
  if(entry.math){
   assert.equal(entry.math.display,true);
   assert.ok(entry.math.latex&&entry.math.fallback);
   const formula=katex.renderToString(entry.math.latex,{displayMode:true,output:'htmlAndMathml',throwOnError:true,trust:false,strict:'error'});
   assert.ok(formula.includes('<math')&&formula.includes('katex'),'Math markup failed '+id);
  }
  if(entry.diagram){
   const v=entry.diagram;
   assert.ok(['grid','venn','mapping','flow','triangle','interval'].includes(v.type),'Unknown drawing '+id);
   if(v.type==='grid')assert.ok(v.rows.length&&v.cols.length);
   if(v.type==='venn')assert.ok(v.both.length,'No overlap shown '+id);
   if(v.type==='mapping')assert.ok(v.pairs.length>=2);
   if(v.type==='flow')assert.ok(v.nodes.length>=2);
   if(v.type==='interval')assert.ok(Number(v.start)<Number(v.mid)&&Number(v.mid)<Number(v.end));
   withVisual++;
  }
  total++;
 }
}
assert.deepEqual([...chapters].sort(),['1','2','3','4','5','6','8'],'No fabricated Grade 7 questions');
// Only four high-transfer-risk questions get a voluntary self-check. Students
// see neither a quiz nor additional controls before opening the Why disclosure.
const checks={
 'c10-2-ex2-2-q1':{correct:0,values:['4','6','8']},
 'c10-2-ex2-2-q3':{correct:1,values:['12','120','10']},
 'c10-2-ex2-2-q6':{correct:2,values:['18','72','6']},
 'c10-2-ex2-2-q8':{correct:2,values:['1','12','13']}
};
const actualTransfers=ids.filter(id=>[].concat(hints[id]).some(h=>!!h.transfer));
assert.deepEqual(actualTransfers.sort(),Object.keys(checks).sort(),'No quizzes on straightforward repetition');
for(const [id,expected] of Object.entries(checks)){
 const note=[].concat(hints[id]).find(h=>h.transfer);
 const check=note.transfer;
 assert.equal(check.correct,expected.correct);
 assert.deepEqual(Array.from(check.choices.map(v=>v.en)),expected.values);
 assert.equal(check.choices.length,3);
 assert.equal(new Set(check.choices.map(v=>v.en)).size,3);
 for(const lang of ['en','ta']){
  assert.ok(check.prompt[lang]?.length>15,'Question translation missing '+id+' '+lang);
  assert.ok(check.wrong[lang]?.length>15,'Wrong-answer teaching hint missing '+id+' '+lang);
  assert.ok(check.success[lang]?.length>15,'Answer explanation missing '+id+' '+lang);
  assert(check.choices.every(v=>v[lang]?.length>0),'Option translation missing '+id+' '+lang);
 }
}
const ex23Hints=Object.keys(hints).filter(id=>/^c10-2-ex2-3-(?:q1-(?:ii|iii|iv|v)|q2|q3|q4|q8)$/.test(id));
assert.equal(ex23Hints.length,8,'Only eight source-specific bridges for cognitively difficult modular tasks');
assert.equal(hints['c10-2-ex2-3-q1-iv'].step,0,'Clarify integer interpretation of textbook fraction');
assert.ok(hints['c10-2-ex2-3-q4'].en.includes('3 × 4'),'Bridge modular inverse concretely');
assert.equal(4n**7n%10n,4n,'Last-digit cycle check');
assert.equal((a=>{let b=360;while(b){const t=a%b;a=b;b=t;}return a;})(240),120,'HCF scaling check');
assert.equal((a=>{let b=18;while(b){const t=a%b;a=b;b=t;}return a;})(24),6,'Prime exponent HCF check');
assert.equal(13%4,1);assert.equal(13%6,1);assert.equal(1%4,1);assert.equal(1%6,1);
const q8=hints['c10-2-ex2-2-q8'];
assert.equal(q8.step,0);
assert.ok(q8.en.includes('3647')&&q8.en.includes('7')&&q8.en.includes('zero'),'Explicit original question ambiguity');
const q4=hints['c10-1-ex1-1-q4'];
assert.ok(Array.isArray(q4)&&q4.length===2,'Screenshot question must have TWO source-specific explanations');
assert.equal(q4[0].step,0);assert.equal(q4[0].diagram.type,'grid');
assert.deepEqual(Array.from(q4[0].diagram.rows),['5','6']);
assert.deepEqual(Array.from(q4[0].diagram.cols),['5','6']);
assert.equal(q4[1].step,1);assert.equal(q4[1].diagram.type,'venn');
assert.deepEqual(Array.from(q4[1].diagram.both),['5','6']);
const source=read('site/assets/why-step-g10.js');
assert.ok(source.includes('triggle:lessonchange')&&source.includes('original.en.includes(hint.expected)'),'Stale source guard is mandatory');
assert.ok(source.includes("document.createElementNS")&&source.includes("details"),'Native accessible diagrams/disclosures required');
assert.ok(withVisual>=18,'Expected useful diagrams across the selected mathematical concepts');
console.log('PASS Class 10 Why: '+ids.length+' questions, '+total+' source-matched explanations, '+withVisual+' optional diagrams, '+chapters.size+' authored chapters, bilingual and no unverified maths alteration.');
