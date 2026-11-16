'use strict';
/* Grade 10 GP-sum transfer + rendering contract. No web/API dependency. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const site=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(site,p),'utf8');
const ctx={window:{}};
vm.runInNewContext(read('assets/g10-ch2-gp-sum.js'),ctx,{timeout:5000});
assert.equal(typeof ctx.window.TriggleGPSumLab.mount,'function');
const calc=ctx.window.TriggleGPSumLab.model;
for(const [a,r,n] of [[1,2,4],[1,3,4],[2,2,5],[3,-2,4],[5,1,4]]){
 const x=calc(a,r,n),direct=Array.from({length:n},(_,i)=>a*r**i).reduce((p,q)=>p+q,0);
 assert.equal(x.sum,direct,'All geometric sums match direct addition');
 assert.equal(x.formula,direct,'Derivation is exact, including r=1');
 assert.equal(x.shifted.reduce((p,q)=>p+q,0)-x.sum,(r-1)*direct,'Subtracting aligned series');
 if(r!==1)assert.equal(x.difference,(r-1)*direct,'Endpoint cancellation');
}
assert.equal(calc(1,2,4).sum,15);
assert.equal(calc(1,3,4).sum,40);
assert.throws(()=>calc(1,2,0),/Use small integer terms/);
const stageContext={window:{}};
vm.runInNewContext(read('data/g10-ch2-concepts.js'),stageContext,{timeout:5000});
const stage=stageContext.window.TRIGGLE_G10_CH2_PATH.stages.find(s=>s.id==='g10-ch2-gp-sum');
assert(stage&&stage.section==='2.10');
assert.equal(stage.choices[stage.correct].en,'81 − 1');
assert.equal(stage.choices[stage.correct].ta,'81 − 1');
assert.match(stage.question.en,/3S − S/);
assert.match(stage.question.ta,/3S − S/);
const hub=read('assets/chapter-hub.js'),idx=read('index.html'),sw=read('service-worker.js');
assert.match(hub,/window\.TriggleGPSumLab\.mount\(host,lang\)/,'Dedicated geometric-series lab');
assert.match(hub,/stage\.id==='g10-ch2-gp-sum'\?'':/,'Formula is discovered, not shown first');
assert(idx.indexOf('assets/g10-ch2-gp-sum.js')<idx.indexOf('assets/chapter-hub.js'),'Dependency loads first');
assert(sw.includes('assets/g10-ch2-gp-sum.js'),'Offline cache includes lab');
assert.match(read('assets/g10-ch2-foundations.css'),/gp-lab-term\.is-cancelled/);
console.log('PASS Grade 10 Ch 2 GP-sum: bilingual transfer, aligned cancellation, exact formula, offline mobile lab');
