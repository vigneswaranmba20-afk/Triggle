'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const katex=require('../assets/vendor/katex/katex.min.js');
const notation={window:{katex}};
vm.runInNewContext(read('site/assets/math-notation.js'),notation);
const render=notation.window.TriggleNotation.render;
const manifests=[
 JSON.parse(read('docs/curriculum/grade-10/g10-seven-recovery-20261113.json')),
 JSON.parse(read('docs/curriculum/grade-10/g10-ch8-ex8-1-q5-q10-20261113.json'))
];
const sourceRecords=manifests.flatMap(m=>m.records),ids=sourceRecords.map(x=>x.id);
assert.equal(sourceRecords.length,13);
assert.equal(new Set(ids).size,13);
const scripts=[...read('site/index.html').matchAll(/<script src="\.\/(data\/[^?"']+)(?:\?[^"']*)?"[^>]*><\/script>/g)].map(m=>m[1]);
const context={window:{},console};vm.createContext(context);
for(const file of scripts)vm.runInContext(read('site/'+file),context,{filename:file,timeout:10000});
const runtime=context.window.TRIGGLE_CLASSES[10].items;
const expected=new Set(ids);
let valid=0,formulaCount=0;
for(const rec of sourceRecords){
 const actual=runtime.find(x=>x.id===rec.id);
 assert.ok(actual,'Lesson not registered: '+rec.id);
 assert.equal(JSON.stringify(actual),JSON.stringify(rec),'Authored module and source manifest match: '+rec.id);
 assert.equal(rec.answerMath?.fallback,rec.answer,'Answer fallback exactly preserved: '+rec.id);
 assert.equal(typeof rec.answerMath?.latex,'string','Missing answer TeX '+rec.id);
 for(const [i,step] of rec.steps.entries()){
  assert.equal(step.math?.fallback,step.eq,'Step fallback must preserve every original mathematical expression '+rec.id+'/'+i);
  assert.equal(step.math?.display,true);
  const latex=step.math?.latex;
  assert.ok(latex&&latex.length>3,'Missing TeX for '+rec.id+'/'+i);
  const output=render(step.math);
  assert.ok(output.includes('<math'),'MathML missing for '+rec.id+'/'+i);
  assert.ok(output.includes('katex'),'KaTeX output missing for '+rec.id+'/'+i);
  assert.ok(!output.includes('data-math-error'),'Invalid TeX '+rec.id+'/'+i+': '+latex);
  formulaCount++;
 }
 const answer=render(rec.answerMath);
 assert.ok(!answer.includes('data-math-error'),'Invalid final TeX for '+rec.id);
 assert.ok(answer.includes('<math'),'Final answer must be semantic math');
 valid++;
}
const byId=id=>sourceRecords.find(x=>x.id===id),p4=byId('c10-8-ex8-1-q4'),p5=byId('c10-8-ex8-1-q5');
for(const record of [p4,p5]){
 assert.ok(record.steps.some(s=>s.math.latex.includes('\\begin{aligned}')),'Working must be line-aligned');
 assert.ok(record.steps.some(s=>s.math.latex.includes('\\dfrac')),'Fractions must be stacked');
 assert.ok(record.steps.some(s=>s.math.latex.includes('\\sqrt')),'Roots must be correctly bracketed');
 assert.ok(record.steps.some(s=>s.math.latex.includes('\\bar{x}')),'Means must have a genuine overbar');
 assert.ok(record.steps.some(step=>render(step.math).includes('<mfrac>')),'Use semantic fractions rather than literal slashes');
 assert.ok(render(record.steps[4].math).includes('<mfrac>'),'Variance must show a real fraction');
 assert.ok(render(record.steps.find(s=>s.math.latex.includes('\\sqrt')).math).includes('<msqrt>'),'Radical must have correct MathML');
 assert.ok(record.answerMath.latex.includes('\\dfrac')||record.id==='c10-8-ex8-1-q4');
}
const p4root=p4.steps[4].math.latex;
assert.ok(p4root.includes('\\dfrac{\\sqrt{351}}8'),'Root sign must cover 351, denominator outside');
const p5root=p5.steps[5].math.latex;
assert.ok(p5root.includes('\\sqrt{\\dfrac{2000}{9}}'),'Root must cover the entire fraction');
assert.ok(p5.answerMath.latex.includes('\\dfrac{20\\sqrt5}{3}'));
assert.equal(p4.answer,'Standard deviation ≈ 2.34 pages.');
assert.ok(p5.answer.includes('₹14.91'));
assert.ok(read('AGENTS.md').includes('ALWAYS use ChatGPT-style mathematical typesetting'));
assert.ok(read('site/assets/math-typesetting.css').includes('ChatGPT'));
const html=read('site/index.html'),sw=read('site/service-worker.js');
for(const name of ['g10-seven-recovery-20261113-en.js','g10-ch8-ex8-1-q5-q10-en.js']){
 assert.ok(html.includes(name),'New module missing from app index: '+name);
 assert.ok(sw.includes(name),'Offline cache missing new module: '+name);
}
assert.ok(html.includes('math-typesetting.css?v=chatgpt-math-20261113'));
console.log('PASS permanent ChatGPT math style: '+valid+' source-unchanged questions, '+formulaCount+' validated KaTeX steps, semantic stacked fractions/roots, readable answer fallbacks, offline assets and agent policy.');
