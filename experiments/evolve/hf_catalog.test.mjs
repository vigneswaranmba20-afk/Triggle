import test from 'node:test';
import assert from 'node:assert/strict';
import {catalogCandidates} from './hf_catalog.mjs';
test('shortlist, exclude unavailable, calculate advertised rate',()=>{
 const r=catalogCandidates({data:[
 {id:'Qwen/Qwen3-4B',providers:[{status:'live',provider:'a',pricing:{input:0.1,output:0.2}},{status:'offline',provider:'b'}]},
 {id:'Other/xyz',providers:[{status:'live',provider:'c'}]}]});
 assert.equal(r.candidates.length,1);
 assert.equal(r.candidates[0].exampleCostUSD,0.0004);
 assert.equal(r.billedInferenceCalls,0);
});
test('unknown cost never assumed free',()=>{
 const r=catalogCandidates({data:[{id:'microsoft/phi-4',providers:[{status:'live',provider:'p'}]}]});
 assert.equal(r.candidates[0].exampleCostUSD,null);
 assert.equal(r.candidates[0].freeFlag,false);
});
test('reject malformed response',()=>assert.throws(()=>catalogCandidates({}),/data\[\]/));
test('empty catalog is safe',()=>assert.equal(catalogCandidates({data:[]}).optionCount,0));
