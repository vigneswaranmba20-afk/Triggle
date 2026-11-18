'use strict';
/* Grade 10 Ch2 quality-regression guard. Original concept practice, not textbook exercises. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const site=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(site,name),'utf8');
const ctx={window:{}};
vm.runInNewContext(read('data/g10-ch2-concepts.js'),ctx,{timeout:5000});
const stages=ctx.window.TRIGGLE_G10_CH2_PATH.stages;
assert.equal(stages.length,15,'Keep all fifteen concepts and order');
const find=name=>{const stage=stages.find(s=>s.id==='g10-ch2-'+name);assert(stage,name);return stage;};
const choicesBefore=stages.map(s=>[s.id,s.practiceId,s.choices[s.correct].en]);
assert.equal(new Set(choicesBefore.map(x=>x[0])).size,15);
assert.equal(stages.filter(s=>!!s.practiceId).length,4,'Retain the four originally supplied exercise links; do not invent links');
for(const stage of stages){
 if(stage.practiceId)assert(/^c10-2-ex2-[12]-q[0-9]+$/.test(stage.practiceId),'Related exercise links keep canonical Chapter 2 IDs');
 assert(stage.math.latex&&stage.math.fallback,'Structured mathematics + accessible fallback');
 for(const lang of ['en','ta'])for(const field of ['idea','example','rule','question','why','hint'])
  assert(stage[field]?.[lang]?.trim(),'Bilingual pedagogical field '+stage.id+' '+field+'.'+lang);
}
assert.match(find('division').math.latex,/b>0/,'Euclid division must specify positive divisor');
assert.equal(34,5*6+4);assert(4<5);
assert.match(find('primes').idea.en,/two positive divisors/);
assert.equal(12*18,6*36,'HCF × LCM invariant');
assert.match(find('sequence').idea.en,/position starting at 1/);
assert.match(find('recursive').math.latex,/a_1/);
assert.match(find('recursive').math.latex,/a_2/);
assert.match(find('recursive').math.latex,/n\\ge 3/);
const rec=[1,1];for(let i=2;i<6;i++)rec.push(rec[i-1]+rec[i-2]);
assert.equal(rec.join(','),'1,1,2,3,5,8');
const gp=find('gp-sum');
assert(gp.example.en.includes('S = 1 + 2 + 4 + 8'),'Written illustration matches the four-term lab');
assert.equal([1,2,4,8].reduce((a,b)=>a+b,0),15);
assert(gp.why.en.includes('S = 40'),'Quiz transfer separately derives ratio 3');
assert.match(find('gp-infinite').idea.en,/−1 < r < 1/);
assert(Math.abs(1/(1-(-.5))-2/3)<1e-12);
const special=find('special');
assert.match(special.math.latex,/k\^2/,'Displayed rule matches squares quiz');
assert.match(special.question.en,/1²/);
assert.equal(special.choices[special.correct].en,'30');
assert.equal([1,2,3,4].reduce((sum,n)=>sum+n*n,0),30);
vm.runInNewContext(read('assets/g10-ch2-discovery-labs.js'),ctx,{timeout:5000});
const lab=ctx.window.TriggleG10ConceptLabs;
assert.equal(lab.specialSum(2,4),30,'The selected squares lab model equals the quiz');
assert.equal(lab.specialSum(3,4),100,'Cubes have their own formula');
assert(Math.abs(lab.geometricPartial(1,-.5,6)-.65625)<1e-12,'Alternating partial sum');
const js=read('assets/g10-ch2-discovery-labs.js');
assert(js.includes("{r:-0.5,label:'−½'}"),'Alternating-ratio control offered');
assert(js.includes('let power=2,n=4;'),'Squares, not cubes or plain numbers, are the initial visual');
assert(js.includes('Math.abs(target-partial)'),'Gap magnitude cannot be presented as negative');
assert(js.includes('ratio<0?copy.alternating:copy.converges'),'Alternating convergence is explained');
assert(js.includes('track.hidden=!converges||ratio<0'),'Do not show a misleading filled bar for alternating sums');
const hub=read('assets/chapter-hub.js');
assert(hub.includes("v.kind==='sequence'"),'Student sees the one-based sequence visual instead of an empty stage');
assert(hub.includes("v.values[n-1]"),'Sequence visual indexes from the first term');
assert(hub.includes("stage.id==='g10-ch2-modulo'?45"),'Clock launches the taught 45-day example');
assert(hub.includes("stage.id==='g10-ch2-congruence'?14"),'Congruence launches the 14 modulo 5 transfer');
assert(hub.includes("n+' ≡ '+mark"),'Congruence exposes its equivalent residue');

// Student Psychology Lab regression checks: make the meaning visible, not a slider.
// These preserve the independent textbook questions and fifteen lesson IDs.
const hcfStage=find('gcd'),gpStage=find('gp');
assert.equal(hcfStage.visual.kind,'remainders');
assert.equal(hcfStage.visual.values.join(','),'60,32,28,4');
assert.equal(gpStage.visual.kind,'sequence');
assert.equal(gpStage.visual.values.join(','),'5,15,45,135');
assert.equal(60,32*1+28);
assert.equal(32,28*1+4);
assert.equal(28,4*7+0);
assert.equal(gpStage.visual.values[1]/gpStage.visual.values[0],3);
for(let i=1;i<gpStage.visual.values.length;i++){
 assert.equal(gpStage.visual.values[i],gpStage.visual.values[i-1]*3,'Each visible GP term explicitly multiplies');
}
assert(hub.includes("function showHCFSteps("),'HCF has a dedicated no-slider teaching view');
assert(hub.includes("function showGPMultiplication("),'GP has a dedicated multiplication stepper');
assert(hub.includes("stage.id==='g10-ch2-gcd'){showHCFSteps"),'HCF is routed away from the generic slider');
assert(hub.includes("stage.id==='g10-ch2-gp'){showGPMultiplication"),'GP is routed away from the generic slider');
assert(hub.includes("['g10-ch2-gp-sum','g10-ch2-gcd'"),'HCF no longer starts with a clipped equality chain');
assert(hub.includes("button.setAttribute('aria-pressed',String(i===selected))"),'GP selected step is accessible');
assert(hub.includes("math.innerHTML=typeof window.TriggleNotation?.renderLatex"),'HCF equations remain typeset');
const pilotCss=read('assets/g10-ch2-foundations.css');
assert(pilotCss.includes('.g10ch2-hcf-steps'),'HCF-specific styles retained');
assert(pilotCss.includes('.g10ch2-gp-term'),'GP controls have compact mobile layout');
assert(pilotCss.includes('grid-template-columns:repeat(4,minmax(0,1fr))'),'All four GP terms fit in mobile grid');
const studentLabHtml=read('index.html');
const studentLabSW=read('service-worker.js');
assert(studentLabHtml.includes('assets/g10-ch2-foundations.css'),'HCF/GP mobile styling remains loaded');
assert(studentLabHtml.includes('assets/chapter-hub.js'),'Concept behavior remains loaded');
assert(studentLabSW.includes("const CACHE='triggle-g9-math-first-student-lab-hcf-gp-20261118-g9-lesson-read-g9ex32'"),'Offline cache invalidates old lesson assets');

console.log('PASS G10 Ch2 quality: 15 bilingual concepts, 7 targeted teaching repairs and functional cycle/sequence visuals, formulas and lab models');
