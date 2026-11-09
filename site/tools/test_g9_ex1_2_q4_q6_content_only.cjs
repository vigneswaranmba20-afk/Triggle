// Grade 9 revised-2025 Exercise 1.2 Q4-Q6 content-only assertions.
// Run from repository root: node site/tools/test_g9_ex1_2_q4_q6_content_only.cjs
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const groups=[4,5,6].map(q=>JSON.parse(fs.readFileSync(path.join(__dirname,'../data/g9-ex1-2-q'+q+'-content-only.json'),'utf8')));
const expected=[4,3,4];
const ids=new Set();
groups.forEach((g,i)=>{
 assert.equal(g.entries.length,expected[i]);
 assert.equal(g.source.printedPage,12);
 assert.equal(g.source.driveFileId,'1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J');
 assert.match(g.source.fidelity,/page-image review pending/);
 assert.match(g.tamilStatus,/pending/);
 g.entries.forEach((e,j)=>{
  assert.equal(e.id,'g9-ch1-ex1-2-q'+(i+4)+'-'+['i','ii','iii','iv'][j]);
  assert(!ids.has(e.id));ids.add(e.id);
  assert(e.question.length>10&&e.steps.length>=3&&e.steps.every(s=>s.length>15));
  assert(e.answer&&e.mathCheck&&e.sourceVisualReview==='pending');
 });
});
assert.equal(ids.size,11);
const intersection=(a,b)=>a.filter(x=>b.includes(x));
assert.deepEqual(intersection(['f','i','a','s'],['a','n','f','h','s']).sort(),['a','f','s']);
assert.deepEqual(intersection([1,2,3,4,6,8,12,24],[3,6,9,12,15,18,21,24,27]),[3,6,12,24]);
assert.equal([2,3,5,7,11,13].filter(n=>n>2&&n%2===0).length,0);
assert.equal([1,2,3,4,5].filter(n=>n>1&&n<2).length,0);
assert.equal([0].length,1);
assert.equal(Math.pow(3-2,0),1);
console.log('PASS: 11 IDs, schema, provenance, English/Tamil status and independent set assertions');
