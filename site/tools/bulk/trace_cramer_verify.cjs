'use strict';
// Independent critic: existing BigInt Gauss-Jordan arithmetic and elimination
// determinants. Does not import the compiler or its Number/cofactor engine.
const assert=require('node:assert/strict'),{hashRecord}=require('../curriculum_bulk.cjs');
const big=require('./verify_g12_ch1_ex1_1.cjs').arithmetic;
const q=x=>x&&typeof x==='object'&&!Array.isArray(x)?big.f(x.n,x.d):big.f(x);
const M=A=>A.map(row=>row.map(q));
function eliminationDet(A){
 const a=M(A),n=a.length;let result=big.f(1);
 for(let j=0;j<n;j++){
  const p=a.findIndex((r,i)=>i>=j&&r[j][0]!==0n);if(p<0)return big.f(0);
  if(p!==j){[a[p],a[j]]=[a[j],a[p]];result=big.neg(result);}
  const pivot=a[j][j];result=big.mul(result,pivot);
  for(let i=j+1;i<n;i++){const factor=big.div(a[i][j],pivot);for(let k=j;k<n;k++)a[i][k]=big.add(a[i][k],big.neg(big.mul(factor,a[j][k])));}
 }
 return result;
}
function verifyDet(node,A){
 assert.equal(node.kind,'determinant');assert.deepEqual(M(node.matrix),M(A));assert.deepEqual(q(node.value),eliminationDet(A));
 assert.equal(node.terms.length,A.length);
 node.terms.forEach((term,j)=>{
  assert.equal(term.sign,j%2?-1:1);assert.deepEqual(q(term.coefficient),q(A[0][j]));
  const minor=A.slice(1).map(row=>row.filter((_,k)=>k!==j));assert.deepEqual(M(term.minor),M(minor));
  const minorValue=eliminationDet(minor);assert.deepEqual(q(term.minorValue),minorValue);
  assert.deepEqual(q(term.value),big.mul(j%2?-1:1,big.mul(q(A[0][j]),minorValue)));
 });
 assert.deepEqual(node.terms.reduce((s,t)=>big.add(s,q(t.value)),big.f(0)),q(node.value));
}
function verify(ir){
 assert.equal(ir.schemaVersion,1);assert.equal(ir.family,'CRAMER_LINEAR_SYSTEM');assert.equal(ir.modelHash,hashRecord(ir.model));
 const {A,B,variables}=ir.model,n=variables.length;
 assert([2,3].includes(n));assert.equal(A.length,n);assert(A.every(row=>row.length===n));assert.equal(B.length,n);assert(B.every(row=>row.length===1));
 assert.equal(new Set(variables.map(v=>v.name)).size,n);
 assert(variables.every(v=>['identity','reciprocal'].includes(v.transform)));
 assert.deepEqual(ir.domain,variables.filter(v=>v.transform==='reciprocal').map(v=>({variable:v.name,excludedValue:{n:0,d:1}})));
 verifyDet(ir.determinant,A);assert.notEqual(q(ir.determinant.value)[0],0n);
 assert.equal(ir.determinants.length,n);assert.equal(ir.transformed.length,n);assert.equal(ir.values.length,n);
 const solution=big.product(big.inverse(M(A)),M(B)).map(row=>row[0]);
 for(let j=0;j<n;j++){
  const replacement=A.map((row,i)=>row.map((x,k)=>k===j?B[i][0]:x));verifyDet(ir.determinants[j],replacement);
  assert.deepEqual(q(ir.transformed[j]),solution[j]);
  assert.deepEqual(q(ir.transformed[j]),big.div(q(ir.determinants[j].value),q(ir.determinant.value)));
  if(variables[j].transform==='reciprocal')assert.notEqual(solution[j][0],0n);
  const value=variables[j].transform==='reciprocal'?big.div(1,solution[j]):solution[j];assert.deepEqual(q(ir.values[j]),value);
  if(variables[j].constraint==='positive')assert(value[0]>0n);
  if(['nonnegative','nonnegative-integer'].includes(variables[j].constraint))assert(value[0]>=0n);
  if(variables[j].constraint==='nonnegative-integer')assert.equal(value[1],1n);
 }
 assert.deepEqual(big.product(M(A),solution.map(x=>[x])),M(B));assert.deepEqual(ir.substitution.map(q),B.map(row=>q(row[0])));
 assert.equal(ir.applicability.determinantNonzero,true);
 return {passed:true,modelHash:ir.modelHash,reasoningHash:hashRecord(ir),method:'Independent BigInt elimination determinant, Gauss-Jordan inverse and original-equation substitution with reciprocal-domain and context constraints'};
}
module.exports={verify,eliminationDet};
