'use strict';
// AUD14-02: 2025 Tamil Nadu Std IX Ex6.4 Q1 uses a FOUR-FIGURE TABLE,
// not calculator rounding. English printed pp.236-237, 239, 316;
// Tamil printed p.332. Independently verify all six arithmetic transitions.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const text=fs.readFileSync(path.join(__dirname,'../data/class-9.js'),'utf8');
const expected=[
  ['i','0.7547',49,0,0.7547,0,3],
  ['ii','0.2648',74,39,0.2656,-0.0008,4],
  ['iii','1.3985',54,26,1.3968,0.0017,3],
  ['iv','0.3641',21,21,0.3633,0.0008,3],
  ['v','0.8302',33,53,0.8310,-0.0008,3],
  ['vi','2.7907',70,17,2.7776,0.0131,4]
];
const seen=new Set();
for(const [suffix,answer,deg,min,base,difference,steps] of expected){
 const id='c9-exercise-6-4-q1-'+suffix;
 const start=text.indexOf('{"id":"'+id+'"');
 const end=text.indexOf(',{"id":"',start+5);
 assert(start>=0&&end>start,'Source record '+id);
 const rec=JSON.parse(text.slice(start,end));
 assert(!seen.has(rec.id));seen.add(rec.id);
 assert.equal(rec.classNum,9);assert.equal(rec.chapter,'6');assert.equal(rec.exercise,'6.4');
 assert.equal(rec.answer,answer,'Official 2025 English/Tamil answer for '+id);
 assert.equal(rec.steps.length,steps,'Full source-table worked solution for '+id);
 assert(rec.q.en.includes(String(deg)+'°'),'Original source angle '+id);
 const teaching=rec.steps.map(s=>s.en+' '+s.eq).join(' | ');
 assert.match(teaching,/table/i,'Explain lookup rather than calculator rounding: '+id);
 assert(rec.steps.every(s=>s.en&&s.ta&&s.eq),'English, Tamil and symbolic rows '+id);
 assert(rec.steps.some(s=>s.eq.includes(answer)),'Student steps must derive final value '+id);
 assert(!teaching.includes('0.2647146845')&&!teaching.includes('2.7903338772'),
   'Do not use precise calculator values as the core table method');
 if(min!==0){
  assert(teaching.includes('Mean difference')||teaching.includes('mean difference'),
    'Mean difference method explicitly taught '+id);
  assert(rec.steps.some(s=>s.eq.includes(base.toFixed(4))),'Six-minute reference entry '+id);
  assert(rec.steps.some(s=>s.eq.includes(Math.abs(difference).toFixed(4))),
    'Four-place mean-difference adjustment '+id);
 }
 const calc=Math.round((base+difference)*10000)/10000;
 assert.equal(calc,+answer,'Independent integer-unit table arithmetic '+id);
 // Calculator differs from table approximation for (ii) and (vi). This is
 // intentional, NOT evidence of a source-key correction.
 if(suffix==='ii'||suffix==='vi'){
  const precise=suffix==='ii'?Math.cos((deg+min/60)*Math.PI/180):Math.tan((deg+min/60)*Math.PI/180);
  assert.notEqual(+precise.toFixed(4),+answer,'Do not silently replace prescribed table output '+id);
  assert.match(teaching,/calculator/i,'Disclose distinction from calculator value '+id);
 }
}
assert.equal(seen.size,6);
const negative=[['cos',74,39,0.2647],['tan',70,17,2.7903]];
for(const [fn,d,m,value] of negative){
 const actual=Math[fn]((d+m/60)*Math.PI/180);
 assert.equal(+actual.toFixed(4),value,'Explicit negative control: exact calculator value is different');
}
console.log('PASS AUD14-02: six 2025 table-based Ex6.4 Q1 solutions, bilingual explanation scaffolds, 2 key corrections, independent mean-difference and calculator negative controls.');
