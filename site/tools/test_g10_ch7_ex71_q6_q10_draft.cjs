'use strict';
/* Draft-stage independent math oracle and source-passport regression — Grade 10 Ex 7.1 Q6–Q10.
 * Does not claim Gemini Neon blind audit. Release remains gated on its frozen report.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const manifest=JSON.parse(read('docs/curriculum/grade-10/g10-ch7-ex7-1-q6-q10-passports-20261122.json'));
const mod='site/data/textbook-exercises/g10-ch7-ex7-1-q6-q10-en.js';
const script='./data/textbook-exercises/g10-ch7-ex7-1-q6-q10-en.js';
const index=read('site/index.html'),sw=read('site/service-worker.js');
assert.equal((index.match(/g10-ch7-ex7-1-q6-q10-en\.js/g)||[]).length,1,'new 2025 exercise module must load exactly once');
for(const asset of [script,'./assets/grade10-ch7/ex7-1-q10.svg'])assert.ok(sw.includes(asset),'offline cache missing '+asset);
const scriptList=[...index.matchAll(/<script\s+src=["']([^"']+)["']/g)].map(m=>m[1].split('?')[0]);
for(const predecessor of ['./data/class-10.js','./data/curriculum.js','./data/textbook-exercises/g10-ch7-ex7-1-q1-q5-en.js'])
 assert.ok(scriptList.indexOf(predecessor)>=0&&scriptList.indexOf(predecessor)<scriptList.indexOf(script),'Q6-Q10 must load after '+predecessor);
assert.ok(scriptList.indexOf(script)<scriptList.indexOf('./assets/app.js'),'records before UI renderer');
const sandbox={window:{},console};vm.createContext(sandbox);
for(const p of ['site/data/class-10.js','site/data/curriculum.js','site/data/textbook-exercises/g10-ch7-ex7-1-q1-q5-en.js',mod,'site/data/problem-difficulty.js'])
 vm.runInContext(read(p),sandbox,{filename:p,timeout:15000});
const g=sandbox.window.TRIGGLE_CLASSES[10],ch=sandbox.window.TRIGGLE_CURRICULUM.grades.find(x=>x.grade===10).chapters.find(x=>x.number===7);
assert.equal(new Set(g.items.map(x=>x.id)).size,g.items.length,'all grade 10 IDs unique');
const ids=[6,7,8,9,10].map(n=>'c10-7-ex7-1-q'+n);
assert.deepEqual(manifest.records.map(r=>r.id),ids);
assert.equal(g.items.filter(x=>x.chapter==='7'&&x.exercise==='7.1'&&x.kind==='textbook').length,10,'all ten Ex 7.1 questions appear once');
assert.equal(manifest.source.questionPageImagesInspected,true);
assert.equal(manifest.source.answerKeyPageImagesInspected,true);
assert.equal(manifest.source.q10FigureInspected,true);
assert.equal(manifest.source.independentBlindAuditCompleted,false,'never falsely mark Neon audit as completed');
for(const p of manifest.records){
 const e=g.items.find(x=>x.id===p.id);assert.ok(e,'missing '+p.id);
 assert.equal(e.q.en,p.englishQuestion,'exact 2025 English source text for '+p.id);
 assert.equal(e.sourceFidelity.status,'page-visual-checked');
 assert.equal(e.sourceFidelity.sourcePdfPage.en,288);
 assert.equal(e.sourceFidelity.sourcePdfPage.ta,296);
 assert.equal(e.edition,'2025');assert.equal(e.translationReview,'pending');
 assert.ok(!e.q.ta,'unapproved Tamil lesson text must not be invented');
 assert.ok(e.steps.length>=4,'full worked steps '+p.id);
 for(const step of e.steps){
  assert.ok(step.en.length>=28&&step.eq&&step.math?.latex&&step.math?.fallback,'accessible worked line in '+p.id);
 }
 assert.ok(e.answerMath?.latex&&e.answerMath?.fallback,'typeset final answer for '+p.id);
 assert.ok(ch.textbookQuestionIds.includes(p.id),'chapter navigation includes '+p.id);
 const diff=sandbox.window.TriggleDifficulty.get(e);
 assert.ok(diff&&['easy','medium','difficult'].includes(diff.level)&&diff.grade===10,'difficulty record for '+p.id);
}
const q7=g.items.find(x=>x.id===ids[1]);assert.ok(q7.answerMath.latex.includes('\\sqrt5'),'Q7 answer must preserve square-root sign');
const q10=g.items.find(x=>x.id===ids[4]);assert.ok(q10.figureSrc.endsWith('/ex7-1-q10.svg'),'lampshade source figure aid');
assert.ok(q10.figureAlt.en.length>90);
assert.match(q10.steps.at(-1).en,/one-paise difference/,'teach 2025 textbook rounding caveat');
const svg=read('site/'+q10.figureSrc);
assert.match(svg,/<svg\s/);assert.match(svg,/<title\b/);assert.match(svg,/<desc\b/);
assert.ok(!/<script\b/i.test(svg),'no executable script in SVG');
const pi=22/7;const close=(a,b)=>Math.abs(a-b)<1e-10;
const slant6=Math.hypot(5,12);assert.equal(slant6,13);assert.ok(close(5720/(pi*5*slant6),28));
const ratio=(Math.sqrt(10))/(9*Math.sqrt(2));assert.ok(close(ratio,Math.sqrt(5)/9));
assert.equal(((1.25)**2-1)*100,56.25);
const area9=2*pi*14**2+2*pi*10**2+pi*(14**2-10**2);
assert.ok(close(area9,688*pi));assert.ok(close(area9*0.14,302.72));
const slant10=Math.hypot(8,12-6);assert.equal(slant10,10);
const area10=pi*(12+6)*slant10+pi*6**2;
assert.ok(close(area10,216*pi));
const areaRounded=Number(area10.toFixed(2));assert.equal(areaRounded,678.86);
assert.equal(2*areaRounded,1357.72);
assert.equal(Number((2*area10).toFixed(2)),1357.71,'clarify one-paise textbook rounding difference');
// Mutation traps: a wrong formula or dimension must be distinguishable by oracle.
assert.ok(!close(5720/(pi*5*(slant6+5)),28),'wrong cap slant must fail');
assert.ok(!close(5/9,ratio),'missing radical must fail');
assert.notEqual((1.25-1)*100,56.25,'linear sphere area scaling must fail');
assert.ok(!close((area9-pi*(14**2-10**2))*0.14,302.72),'omitted vessel rim must fail');
assert.ok(!close((area10+pi*12**2)*2,1357.72),'painting bottom must fail');
console.log('PASS G10 Ch7 Ex7.1 Q6–Q10 draft source/Math: 5 records, 10/10 chapter questions, exact radical/rounding, page-image evidence, accessibility, offline cache, 5 mutations. Neon blind audit remains pending.');
