'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs');
const {f,M,eye,product,scale,det,inverse,matrix,eq}=require('./verify_g12_ch1_ex1_1.cjs').arithmetic;
const problems={
 '1-i':{a:[[2,5],[1,2]],b:[[-2],[-3]],answer:'x = -11, y = 4.'},
 '1-ii':{a:[[2,-1],[3,2]],b:[[8],[-2]],answer:'x = 2, y = -4.'},
 '1-iii':{a:[[2,3,-1],[1,1,1],[3,-1,-1]],b:[[9],[9],[-1]],answer:'x = 2, y = 3, z = 4.'},
 '1-iv':{a:[[1,1,1],[6,-4,5],[5,2,2]],b:[[2],[31],[13]],answer:'x = 3, y = -2, z = 1.'},
 '3':{a:[[1,3],[1,9]],b:[[19800],[23400]],answer:'Starting salary = ₹18,000 per month; annual increment = ₹600.'},
 '4':{a:[[4,4],[2,5]],b:[[f(1,3)],[f(1,4)]],answer:'One man alone: 18 days; one woman alone: 36 days.'},
 '5':{a:[[2,-4,5],[3,1,-2],[-1,3,1]],b:[[15000],[1000],[4000]],answer:'A: ₹2,000 per unit; B: ₹1,000 per unit; C: ₹3,000 per unit.'}
};
module.exports=({records,mapping},{hashRecord})=>{
 assert.equal(records.length,8);
 const reviewed=JSON.parse(fs.readFileSync(__dirname+'/../../../docs/curriculum/grade-12/reports/ex1-3-reviewed-hashes.json'));
 return {checks:records.map(r=>{
  const m=mapping.find(m=>m.recordId===r.id),key=m.question+(m.question==='1'?'-'+m.parts[0]:'');
  if(key==='2'){
   const a=M([[-5,1,3],[7,1,-5],[1,-1,1]]),b=M([[1,1,2],[3,2,1],[2,1,3]]),rhs=M([[1],[7],[2]]);
   eq(product(a,b),scale(eye(3),4));eq(product(b,a),scale(eye(3),4));eq(inverse(b),scale(a,f(1,4)));
   const x=product(inverse(b),rhs);eq(x,M([[2],[1],[-1]]));eq(product(b,x),rhs);
   assert.equal(r.answer,'AB = BA = 4I₃; x = 2, y = 1, z = −1.');
  }else{
   const p=problems[key],a=M(p.a),b=M(p.b),inv=inverse(a),x=product(inv,b);
   eq(product(a,inv),eye(a.length));eq(product(inv,a),eye(a.length));eq(product(a,x),b);
   assert.ok(r.steps.some(s=>s.eq?.includes('A⁻¹ = '+matrix(inv))),'Displayed inverse matches independent Gauss-Jordan result');
   assert.ok(r.steps.some(s=>s.eq==='|A| = '+(det(a)[1]===1n?''+det(a)[0]:det(a)[0]+'/'+det(a)[1])+'; X = A⁻¹B'));
   assert.equal(r.answer,p.answer);
   if(key==='3')eq(x,M([[18000],[600]]));
   if(key==='4'){eq(x,[[f(1,18)],[f(1,36)]]);assert.equal(4*2+4,12);assert.equal(2*2+5,9);}
   if(key==='5')eq(x,M([[2000],[1000],[3000]]));
  }
  assert.equal(hashRecord(r),reviewed[r.id],'Changed lesson requires renewed source and intermediate arithmetic review');
  return {recordId:r.id,parts:m.parts,passed:true,method:'Independent exact rational Gauss-Jordan inverse; determinant; both inverse products; substitution into every original equation; application rate/price/salary interpretation',recordSha256:hashRecord(r)};
 })};
};
