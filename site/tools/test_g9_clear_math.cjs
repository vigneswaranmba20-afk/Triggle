'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {load,build,expression,rich}=require('./build_g9_math.cjs');
const katex=require('../assets/vendor/katex/katex.min.js');
const root=path.resolve(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,file),'utf8');
assert.equal(read('data/g9-clear-math.js'),build(),'Reproducible presentation must track canonical content');
const ctx={window:{katex}};vm.createContext(ctx);
vm.runInContext(read('assets/math-notation.js'),ctx);
vm.runInContext(read('data/g9-clear-math.js'),ctx);
const {render}=ctx.window.TriggleNotation,{get}=ctx.window.TriggleG9Math;
const fallback=v=>Array.isArray(v)?v.map(fallback).join(''):typeof v==='string'?v:v.fallback;
let formulas=0;
function check(value,original,id){
 assert.equal(fallback(value),original,'Verbatim wording and every calculation: '+id);
 for(const part of Array.isArray(value)?value:[value])if(part?.latex){
  const html=render(part);assert(!html.includes('data-math-error'),id+': '+part.latex);
  assert(html.includes('<math')&&html.includes('katex-html'),'Accessible and visual math: '+id);formulas++;
 }
}
const items=load();assert.equal(items.length,322);
assert.deepEqual(Array.from({length:9},(_,i)=>items.filter(q=>+q.chapter===i+1).length),[40,121,6,12,9,40,37,31,26]);
assert.equal(items.filter(q=>q.chapter==='2'&&q.kind==='textbook-exercise').length,120);
assert.equal(items.filter(q=>q.chapter==='3'&&q.kind!=='practice').length,4);
for(const q of items){
 const before=JSON.stringify(q),p=get(q);assert(p,q.id);assert.equal(p.steps.length,q.steps.length);
 for(const lang of ['en','ta'])check(p.questionMath[lang]||p.questionMath.en,q.q[lang]||q.q.en,q.id+' '+lang);
 if(typeof q.answer==='object')for(const lang of ['en','ta'])check(p.answerMath[lang],q.answer[lang],q.id+' answer '+lang);
 else check(p.answerMath,q.answer,q.id+' answer');
 q.steps.forEach((s,i)=>{if(s.eq!==undefined)check(p.steps[i].math,s.eq,q.id+' step '+i);for(const lang of ['en','ta'])check(p.steps[i].reasonMath[lang]||p.steps[i].reasonMath.en,s[lang]||s.en,q.id+' reason '+i+' '+lang);});
 assert.equal(JSON.stringify(q),before,'Canonical question object is never mutated');
}
assert(formulas>3800,'Full question, explanation, working and answer coverage');
for(const q of [{id:items[0].id,classNum:10,chapter:'2'},{id:items[0].id,classNum:11,chapter:'1'},{id:'g9-ch2-example-1',classNum:9,chapter:'2'}])assert.equal(get(q),undefined,'Scope excludes other grades/chapters and archived examples');
const compact=source=>expression(source).latex.replace(/\s/g,'');
assert.equal(compact('3√5/√6'),'\\frac{3\\sqrt{5}}{\\sqrt{6}}','Coefficient and radical belong in the numerator');
assert.equal(compact('1/x²'),'\\frac{1}{x^{2}}','Power belongs to denominator');
assert.equal(compact('¹⁸√5⁶'),'\\sqrt[18]{5^{6}}','Multi-digit root index and radicand power');
assert.equal(compact('9^(−3/2)'),'9^{\\frac{-3}{2}}','Signed fractional exponent');
assert.equal(compact('√(4/5)'),'\\sqrt{\\frac{4}{5}}','Fraction inside the radical');
assert.equal(compact('0.3(4)'),'0.3\\overline{4}','Only recurring digits receive the bar');
assert.equal(compact('3⅔'),'3\\,\\frac{2}{3}','Mixed number retains its whole part');
assert.equal(compact('−5 3/11'),'-5\\,\\frac{3}{11}','Negative mixed number must not turn into a product or an improper numerator');
assert.equal(compact('4 9/35'),'4\\,\\frac{9}{35}','Mixed number whitespace is meaningful');
assert.equal(rich('a pure surd'),'a pure surd','Prose articles remain prose');
assert.equal(rich('Recurring, period 2'),'Recurring, period 2','Period length remains prose');
const roots=items.find(q=>q.id==='g9-ch3-ex3.2-q4'),rootPresentation=get(roots);
assert.equal(rootPresentation.questionMath.en.filter(p=>p?.latex).length,4,'All four polynomial equations are typeset, including labels separated by a single space');
assert.match(rootPresentation.answerMath.latex,/begin\{gathered\}/,'Answer labels stay with their fractional results');
for(const step of rootPresentation.steps)assert(!JSON.stringify(step.math).includes('[t]'),'No unsupported array position option may leak into the visible mathematics');
assert.match(rich('x²+1/x²=(2√5)²−2=20−2=18',{display:true}).latex,/begin\{aligned\}/,'Calculation chains align on separate lines');
assert.match(rich('√48=4√3; √32=4√2',{display:true}).latex,/begin\{gathered\}/,'Related equalities share compact rows');
assert.equal(fallback(rich('Find 1/x² (where x≠0).')),'Find 1/x² (where x≠0).');
const html=read('index.html'),sw=read('service-worker.js');
assert(html.indexOf('data/g9-clear-math.js')>html.indexOf('data/textbook-exercises/g9-ch3-ex3-2-q4-en.js'));
assert(html.indexOf('data/g9-clear-math.js')<html.indexOf('assets/app.js'));
assert(sw.includes("'./data/g9-clear-math.js'"));assert(sw.includes('g9-clear-math'));
console.log('PASS Grade 9: 322 preserved records across all nine chapters, '+formulas+' valid offline TeX formulas, bilingual fallbacks, fractional powers, radical/fraction grouping, recurring decimals, aligned steps and isolated presentation.');
