'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const html=fs.readFileSync(path.resolve(__dirname,'../grade-12/adjugate-preview.html'),'utf8');
assert.match(html,/id="matrix-lab"/);
assert.match(html,/id="matrix-choice"/);
assert.match(html,/id="matrix-result" aria-live="polite"/);
assert.match(html,/இரு முற்றொருமைகளும் சரிபார்க்கப்பட்டன/);
const js=html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(js,'inline script missing');
const elements={};
const document={
 getElementById(id){return elements[id]??=( {value:'i',dataset:{},setAttribute(){},addEventListener(){}} );},
 querySelectorAll(){return []},
 documentElement:{lang:'en'}
};
const context={document,console};
vm.createContext(context);
vm.runInContext(js[1],context);
for(const [key,det,adj] of [
 ['i',-30,[[2,-4],[-6,-3]]],
 ['ii',2,[[1,1,-1],[-3,1,1],[9,-5,-1]]]
]){
 const actual=vm.runInContext('verifyMatrix(matrices['+JSON.stringify(key)+'])',context);
 assert.equal(actual.det,det,key+' determinant');
 assert.deepEqual(JSON.parse(JSON.stringify(actual.adj)),adj,key+' adjugate');
 assert.equal(actual.valid,true,key+' both multiplication identities');
 const expected=adj.map((r,i)=>r.map((_,j)=>i===j?det:0));
 assert.deepEqual(JSON.parse(JSON.stringify(actual.left)),expected,key+' left');
 assert.deepEqual(JSON.parse(JSON.stringify(actual.right)),expected,key+' right');
}
assert.equal(vm.runInContext('determinant([[5]])',context),5);
assert.equal(vm.runInContext('determinant([[1,2],[2,4]])',context),0);
console.log('PASS Grade 12 matrix explorer: 2x2 and 3x3 independent adjugate, determinant, both products, singular case and bilingual accessibility');
