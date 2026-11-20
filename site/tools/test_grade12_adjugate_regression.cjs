'use strict';
// Independent Grade 12 Exercise 1.1 Q1(i–ii) regression, using exact integer arithmetic.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const cases = [
  {id:'g12-ch1-ex1.1-q1-i', matrix:[[-3,4],[6,2]], adj:[[2,-4],[-6,-3]], det:-30},
  {id:'g12-ch1-ex1.1-q1-ii', matrix:[[2,3,1],[3,4,1],[3,7,2]], adj:[[1,1,-1],[-3,1,1],[9,-5,-1]], det:2},
];
function determinant(m) {
  if (m.length===1) return m[0][0];
  return m[0].reduce((sum,entry,j)=>sum+(-1)**j*entry*determinant(m.slice(1).map(row=>row.filter((_,k)=>k!==j))),0);
}
function adjugate(m) {
  return m.map((row,i)=>row.map((_,j)=> (-1)**(i+j)*determinant(m.filter((_,r)=>r!==i).map(r=>r.filter((_,c)=>c!==j))))).map((_,i,cof)=>cof.map(row=>row[i]));
}
function product(a,b) {return a.map(row=>b[0].map((_,j)=>row.reduce((sum,v,k)=>sum+v*b[k][j],0)));}
for (const item of cases) {
  const {matrix:m,adj,det}=item;
  assert.equal(determinant(m),det,`${item.id} determinant`);
  assert.deepEqual(adjugate(m),adj,`${item.id} adjugate`);
  const identity=m.map((row,i)=>row.map((_,j)=>i===j?det:0));
  assert.deepEqual(product(m,adj),identity,`${item.id} A adj(A)`);
  assert.deepEqual(product(adj,m),identity,`${item.id} adj(A) A`);
}
const ledgerPath=path.resolve(__dirname,'../../docs/grade-12/coverage-2025.json');
if(fs.existsSync(ledgerPath)) {
  const ledger=JSON.parse(fs.readFileSync(ledgerPath,'utf8'));
  assert.equal(ledger.grade,12);
  assert.equal(ledger.inventoryComplete,false);
  assert.deepEqual(ledger.chapterStatus.map(x=>x.chapter),Array.from({length:12},(_,i)=>i+1));
  assert.equal(new Set(ledger.items.map(x=>x.id)).size,ledger.items.length,'unique source IDs');
  for(const item of cases){
    const record=ledger.items.find(x=>x.id===item.id);
    assert.ok(record,`${item.id} must be inventoried`);
    assert.equal(record.status,'mathematically_verified');
    assert.equal(record.sourceVerified,true);
    assert.equal(record.tamilEditorialReview,'pending');
    assert.equal(record.merged,false);
    assert.equal(record.liveVerified,false);
    const lesson=path.resolve(__dirname,`../../docs/grade-12/ex1.1-q1-${item.id.endsWith('-ii')?'ii':'i'}.md`);
    assert.ok(fs.existsSync(lesson),`${item.id} bilingual draft exists`);
    const text=fs.readFileSync(lesson,'utf8');
    assert.match(text,/தமிழில்|தமிழ்/);
    assert.match(text,/English/);
  }
  assert.equal(ledger.chapterStatus[0].verifiedSubparts,ledger.items.filter(x=>x.chapter===1&&x.status==='mathematically_verified').length);
}
console.log('PASS: Grade 12 Q1(i–ii) independent determinant, cofactor adjugate, both matrix identities and available ledger assertions');
