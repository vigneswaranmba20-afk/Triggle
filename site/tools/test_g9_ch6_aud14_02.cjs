'use strict';
/* AUD14-02 independent arithmetic and provenance gate for 2025 TN SCERT
 * four-figure-table Exercise 6.4 Q1. Calculator rounding is NOT a
 * replacement for the textbook's tabular mean-difference convention. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.join(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const evidence=JSON.parse(read('docs/audit/AUD14_02_FOUR_FIGURE_TABLE_EVIDENCE.json'));
const baseline=JSON.parse(read('docs/standard-solution-preservation.json'));
const ctx={window:{}};vm.runInNewContext(read('site/data/class-9.js'),ctx);
const all=ctx.window.TRIGGLE_CLASSES[9].items;
const ids=['i','ii','iii','iv','v','vi'].map(x=>'c9-exercise-6-4-q1-'+x);
assert.equal(evidence.auditId,'AUD14-02');
assert.deepEqual(Object.keys(evidence.records).sort(),[...ids].sort());
assert.equal(evidence.gates.englishExercisePageImage,'passed');
assert.equal(evidence.gates.englishAndTamilAnswerPageImages,'passed');
assert.equal(evidence.gates.tamilExplanationEditorial,'pending');
const byId=new Map(all.map(q=>[q.id,q]));
assert.equal(byId.size,all.length,'Full class 9 inventory contains no duplicate IDs');
const arithmetic={
  i:[7547,0,7547],
  ii:[2656,-8,2648],
  iii:[13968,17,13985],
  iv:[3633,8,3641],
  v:[8310,-8,8302],
  vi:[27776,131,27907]
};
for(const id of ids){
 const q=byId.get(id),record=evidence.records[id],part=id.split('-').at(-1);
 assert.ok(q&&record,'Published exercise part exists: '+id);
 assert.equal(q.chapter,'6');assert.equal(q.exercise,'6.4');
 assert.equal(q.kind,'reference');assert.equal(q.steps.length,3);
 assert.equal(q.q.en,record.unchangedEnglishQuestion,'Preserve English original question');
 assert.equal(q.q.ta,record.unchangedTamilQuestion,'Preserve Tamil original question');
 assert.equal(q.answer,record.correctedFinalAnswer,'Official 2025 key');
 assert.equal(q.source,evidence.source.english2025);
 const hash=crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex');
 assert.equal(record.originalRecordSha256,baseline.sha256[id],'Original 568-record baseline remains intact');
 assert.equal(hash,record.correctedRecordSha256,'Scoped immutable approval hash');
 assert.ok(q.steps.every(s=>s.en&&s.ta&&s.eq),'Complete three-step bilingual teaching copy');
 const [start,delta,end]=arithmetic[part];
 assert.equal(start+delta,end,'Independent integer fourth-decimal arithmetic: '+id);
 assert.equal(Number(q.answer)*10000,end,'Official answer numerically matches table: '+id);
 assert.ok(q.steps[0].eq.includes(record.tableBaseAngle),'Correct preceding column angle '+id);
 assert.ok(q.steps[1].eq.includes(record.tableBaseValue),'Table entry appears in explanation '+id);
 if(part!=='i'){
  assert.match(q.steps[1].eq,/MD\(/,'Mean difference explicit '+id);
  assert.ok(q.steps[1].eq.includes(record.meanDifference.replace(/[+-]/g,'')),'Correct mean difference shown '+id);
  assert.ok(q.steps[2].eq.includes(q.answer),'Final calculation explicitly shown '+id);
 }
}
const degrees=(d,m)=>Math.PI*(d+m/60)/180;
const cosPrecise=Math.cos(degrees(74,39)),tanPrecise=Math.tan(degrees(70,17));
assert.equal(cosPrecise.toFixed(4),'0.2647');
assert.equal(tanPrecise.toFixed(4),'2.7903');
assert.notEqual(byId.get(ids[1]).answer,cosPrecise.toFixed(4),'Do not replace textbook cosine with calculator rounding');
assert.notEqual(byId.get(ids[5]).answer,tanPrecise.toFixed(4),'Do not replace textbook tangent with calculator rounding');
assert.notEqual(2656+8,2648,'Cosine mean difference must be subtracted');
assert.notEqual(27776-131,27907,'Tangent mean difference must be added');
const why=read('site/data/why-step-g9.js');
assert.match(why,/c9-exercise-6-4-q1-ii/);
assert.match(why,/c9-exercise-6-4-q1-vi/);
assert.ok(read('site/index.html').includes('data/class-9.js'));
assert.ok(read('site/service-worker.js').includes('data/class-9.js'));
console.log('PASS AUD14-02: six Grade 9 2025 trigonometric table results, original prompt hashes, mean differences, calculator negative controls, why-step and offline inclusion.');
