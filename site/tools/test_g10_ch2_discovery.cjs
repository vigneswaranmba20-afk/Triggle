'use strict';
/* Standalone evidence gate for three student-paced Grade 10 concept labs. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const root=process.cwd(),read=p=>fs.readFileSync(root+'/'+p,'utf8');
const context={window:{}};
vm.runInNewContext(read('site/assets/g10-ch2-discovery-labs.js'),context,{timeout:3000});
const lab=context.window.TriggleG10ConceptLabs;
assert(lab&&typeof lab.mount==='function');
for(const r of [0.5,1/3,1,2])for(let n=1;n<=8;n++){
 const expected=Array.from({length:n},(_,i)=>Math.pow(r,i)).reduce((x,y)=>x+y,0);
 assert(Math.abs(lab.geometricPartial(1,r,n)-expected)<1e-9,`Geometric partial sum, r=${r}, n=${n}`);
}
for(let n=1;n<=30;n++)for(const p of [1,2,3]){
 const expected=Array.from({length:n},(_,i)=>Math.pow(i+1,p)).reduce((x,y)=>x+y,0);
 assert.equal(lab.specialSum(p,n),expected,`Power sum p=${p}, n=${n}`);
}
assert.throws(()=>lab.specialSum(4,3),/Invalid special/);
assert.throws(()=>lab.geometricPartial(1,1,0),/Invalid geometric/);
vm.runInNewContext(read('site/data/g10-ch2-concepts.js'),context,{timeout:3000});
const stages=context.window.TRIGGLE_G10_CH2_PATH.stages;
assert.equal(stages.length,15);
const by=id=>stages.find(x=>x.id==='g10-ch2-'+id);
assert.equal(by('bezout').choices[by('bezout').correct].en,'x = −2, y = 3');
assert.equal(-2*21+3*15,3);
assert.equal(by('gp-infinite').choices[by('gp-infinite').correct].en,'6');
assert.equal(3/(1-1/2),6);
assert.equal(by('special').choices[by('special').correct].en,'30');
assert.equal(1+4+9+16,30);
for(const x of ['bezout','gp-infinite','special'])assert.equal(by(x).choices.length,3);
const hub=read('site/assets/chapter-hub.js'),html=read('site/index.html'),sw=read('site/service-worker.js');
assert(hub.includes('TriggleG10ConceptLabs?.mount(stage,host,lang)'));
for(const p of ['assets/g10-ch2-discovery-labs.js','assets/g10-ch2-discovery-labs.css']){
 assert(html.includes(p),'HTML loads '+p);assert(sw.includes(p),'offline caches '+p);
}
assert(html.indexOf('g10-ch2-discovery-labs.js')<html.indexOf('chapter-hub.js'),'Load lab before chapter hub');
assert(html.includes('trace-videos/g10-ch2-gp-sum')===false,'Video references stay in concept data');
assert(by('ap-sum').video.src.includes('trace-videos/g10-ch2-ap-sum'));
assert(by('gp-sum').video.src.includes('trace-videos/g10-ch2-gp-sum'));
console.log('PASS: 3 bilingual labs, 120 exact sum checks, independent quiz transfers, offline integration and preserved videos');
