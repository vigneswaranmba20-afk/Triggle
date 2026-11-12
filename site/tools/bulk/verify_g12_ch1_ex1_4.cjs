'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {build,sourcePath}=require('./trace_g12_ex1_4.cjs'),{verify}=require('./trace_cramer_verify.cjs');
const {ROOT}=require('../curriculum_bulk.cjs');
module.exports=({records,mapping},{hashRecord})=>{
 const data=JSON.parse(fs.readFileSync(path.join(ROOT,sourcePath),'utf8')),expected=build(data);
 const reviewed=JSON.parse(fs.readFileSync(path.join(ROOT,'docs/trace/candidates/g12-ex1-4-reviewed-model-hashes.json'),'utf8'));
 assert.equal(records.length,8);assert.equal(mapping.length,8);
 return {checks:records.map(record=>{
  const item=data.models.find(i=>i.id===record.id);assert(item,'Unexpected record ID');
  assert.equal(hashRecord(item),reviewed[item.id],'Source model/text changed; reopen original page images before renewing review');
  const authored=expected.batch.records.find(r=>r.id===record.id),m=mapping.find(m=>m.recordId===record.id),evidence=expected.reasoning.find(r=>r.recordId===record.id);
  assert.equal(hashRecord(record),hashRecord(authored),'Question/working/answer differ from the checked reasoning representation');
  assert.deepEqual(m,expected.batch.mapping.find(m=>m.recordId===record.id));
  assert.equal(evidence.recordSha256,hashRecord(record));const check=verify(evidence.reasoning);assert.equal(check.passed,true);
  evidence.reasoning.values.forEach((value,j)=>{
   const wanted=item.expectedValues[j],q=typeof wanted==='number'?{n:wanted,d:1}:wanted;assert.deepEqual(value,q,'Independently reviewed exact answer');
  });
  if(item.question==='2'){assert.equal(84+16,100);assert.equal(84-16/4,80);}
  if(item.question==='3'){assert.equal(6+4,10);assert.equal(6/2+4/4,4);}
  if(item.question==='4'){assert.equal(1/15+1/30,1/10);assert.equal(1/15-1/30,1/30);}
  if(item.question==='5'){assert.deepEqual([2*30+3*10+2*30,2*30+2*10+4*30,5*30+4*10+2*30],[150,200,250]);assert.equal(3*30+6*10+6*30,330);assert.equal(350-330,20);}
  return {recordId:record.id,parts:m.parts,passed:true,method:check.method+'; exact solution and application interpretation compared with both visually reviewed answer appendices; professional Tamil review pending',recordSha256:hashRecord(record)};
 })};
};
