'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs');
const {f,M,add,neg,mul,div,eye,product,det,inverse,matrix,eq}=require('./verify_g12_ch1_ex1_1.cjs').arithmetic;
const parse=x=>{const [n,d='1']=x.trim().replaceAll('−','-').split('/');return f(n,d);};
const readMatrix=text=>{const body=text.match(/\[\[([^\[\]|]+)\]\]/)?.[1];assert.ok(body);return body.split(';').map(row=>row.split(',').map(parse));};
const combinations=(n,k,start=0)=>k===0?[[]]:Array.from({length:n-start},(_,i)=>start+i).flatMap(i=>combinations(n,k-1,i+1).map(rest=>[i,...rest]));
function rank(a){for(let k=Math.min(a.length,a[0].length);k>0;k--)for(const rr of combinations(a.length,k))for(const cc of combinations(a[0].length,k))if(det(rr.map(i=>cc.map(j=>a[i][j])))[0]!==0n)return k;return 0;}
module.exports=({records,mapping},{hashRecord})=>{
 const reviewed=JSON.parse(fs.readFileSync(__dirname+'/../../../docs/curriculum/grade-12/reports/ex1-2-reviewed-hashes.json'));
 assert.equal(records.length,11);
 return {checks:records.map(r=>{
  const m=mapping.find(m=>m.recordId===r.id),a=readMatrix(r.q.en);
  if(m.question==='1'||m.question==='2')assert.equal(r.answer,`rank A = ${rank(a)}.`);
  else {const b=inverse(a);eq(product(a,b),eye(a.length));eq(product(b,a),eye(a.length));assert.equal(r.answer,'A⁻¹ = '+matrix(b));}
  if(m.question!=='1'){
   let current=m.question==='3'?a.map((row,i)=>[...row,...eye(a.length)[i]]):a;
   for(const s of r.steps){if(!/^R\d+ [↔→]/.test(s.eq||''))continue;
    let z=s.eq.match(/^R(\d+) ↔ R(\d+):/);
    if(z){const i=+z[1]-1,j=+z[2]-1;[current[i],current[j]]=[current[j],current[i]];}
    else if(z=s.eq.match(/^R(\d+) → R\d+\/\(([^)]+)\):/)){const i=+z[1]-1,p=parse(z[2]);current[i]=current[i].map(x=>div(x,p));}
    else {z=s.eq.match(/^R(\d+) → R\d+ − \(([^)]+)\)R(\d+):/);assert.ok(z,'Known reversible row operation');const i=+z[1]-1,j=+z[3]-1,p=parse(z[2]);current[i]=current[i].map((x,k)=>add(x,neg(mul(p,current[j][k]))));}
    eq(current,readMatrix(s.eq));
   }
   if(m.question==='3'){eq(current.map(row=>row.slice(0,a.length)),eye(a.length));eq(current.map(row=>row.slice(a.length)),inverse(a));}
   else assert.equal(current.filter(row=>row.some(x=>x[0]!==0n)).length,rank(a));
  }
  assert.equal(hashRecord(r),reviewed[r.id],'Changed solution requires renewed source and mathematical review');
  return {recordId:r.id,parts:m.parts,passed:true,method:'Independent exhaustive exact-rational minors, Gauss-Jordan inverse with both product orders, and every displayed row operation replayed',recordSha256:hashRecord(r)};
 })};
};
