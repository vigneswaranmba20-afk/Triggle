'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {createHash}=require('node:crypto');
const katex=require('../assets/vendor/katex/katex.min.js');
const manifest=require('../data/textbook-fidelity/g10-frontier-tamil-answers.json');
const site=path.join(__dirname,'..');
const read=name=>fs.readFileSync(path.join(site,name),'utf8');
const fallback=value=>Array.isArray(value)?value.map(fallback).join(''):value?.fallback??value;
const render=value=>{
  if(Array.isArray(value))value.forEach(render);
  else if(value?.latex)katex.renderToString(value.latex,{throwOnError:true,strict:'error'});
};
const asSet=list=>new Set(list.map(pair=>pair.join(',')));
const cross=(as,bs)=>as.flatMap(a=>bs.map(b=>[a,b]));
const union=(a,b)=>[...new Set([...a,...b])];
const intersection=(a,b)=>a.filter(x=>b.includes(x));
const difference=(a,b)=>a.filter(x=>!b.includes(x));
const remainder=(a,b)=>((a%b)+b)%b;
const near=(a,b)=>assert(Math.abs(a-b)<1e-10,JSON.stringify([a,b]));

function verify(){
 const context={window:{}};
 for(const match of read('index.html').matchAll(/<script src="\.\/(data\/[^?"]+)[^"]*"/g)){
  vm.runInNewContext(read(match[1]),context,{filename:match[1]});
 }
 const w=context.window,items=w.TRIGGLE_CLASSES[10].items;
 w.TriggleG10NumbersTamil?.(items);
 w.TriggleG10AlgebraTamil?.(items);
 w.TriggleG10GeometryTamil?.(items);
 const current=new Map(items.map(q=>[q.id,q]));
 const preserve=q=>JSON.stringify({q:q.q,steps:q.steps.map(({mathTa,...step})=>step),answer:q.answer});
 const originals=new Map(items.map(q=>[q.id,preserve(q)]));
 w.TriggleG10FrontierTamilAnswers(items);
 assert.equal(manifest.items.length,19);
 assert.equal(new Set(manifest.items.map(r=>r.id)).size,19);
 const ans=id=>current.get(id).answerTa;
 const pairs=id=>asSet([...ans('c10-1-ex1-1-'+id).matchAll(/\((-?\d+),(-?\d+)\)/g)].map(m=>[m[1],m[2]]));
 const A=[0,1],B=[2,3,4],C=[3,5],natural=[1,2,3,4,5,6,7],prime=[2,3,5,7],evenPrime=[2];
 const independently=[
  ['q5',cross(intersection([1,2,3],[3,4]),intersection([2,3,5],[1,3,5])),
        cross([1,2,3],[2,3,5]).filter(([a,b])=>[3,4].includes(a)&&[1,3,5].includes(b))],
  ['q6-i',cross(A,union(B,C)),[...cross(A,B),...cross(A,C)]],
  ['q6-ii',cross(A,intersection(B,C)),cross(A,B).filter(([,b])=>C.includes(b))],
  ['q6-iii',cross(union(A,B),C),[...cross(A,C),...cross(B,C)]],
  ['q7-i',cross(intersection(natural,prime),evenPrime),cross(natural,evenPrime).filter(([a])=>prime.includes(a))],
  ['q7-ii',cross(natural,difference(prime,evenPrime)),cross(natural,prime).filter(([,b])=>!evenPrime.includes(b))]
 ];
 for(const [id,left,right] of independently){
  assert.deepEqual(asSet(left),asSet(right),id+' independently check both sides');
  assert.deepEqual(pairs(id),asSet(left),id+' roster is the proven intersection, union or difference');
 }
 for(const m of [-3,0,4])assert.equal(remainder(7*(13+17*m)-3,17),3);
 assert.match(ans('c10-2-ex2-3-q2'),/≡ 3/);
 assert.equal(16+(15-1)*(-5),-54);
 assert.match(ans('c10-2-ex2-5-q5'),/^15/);
 assert.equal(Math.floor(107/4),26);
 assert.equal(107%4,3);
 assert.match(ans('c10-2-unit-q4'),/q = 26/);
 for(const [m,n,d] of [[2,1,3],[8,3,7],[3,5,-2]]){
  const a=(m-2*n)*d,t=k=>a+(k-1)*d;
  assert.equal(t(m+1),2*t(n+1));
  assert.equal(t(3*m+1),2*t(m+n+1));
 }
 assert.match(ans('c10-2-unit-q5'),/2\(2m − n\)d/);
 for(const d of [-4,0,13]){
  for(const k of [1,10,21,50])assert.equal((7+(k-1)*d)-(2+(k-1)*d),5);
 }
 assert.match(ans('c10-2-unit-q7'),/= 5/);
 const square=x=>x*x;
 const cube=x=>x*x*x;
 for(const theta of [-1.12,-0.62,0.37,1.08,2.4]){
  const s=Math.sin(theta),c=Math.cos(theta),tan=s/c,sec=1/c;
  near(sec**6,tan**6+3*square(tan*sec)+1);
  const m=Math.cos(theta+0.13)/c,n=Math.cos(theta+0.13)/s;
  near((square(m)+square(n))*square(c),square(n));
  const x=c/s+s/c,y=sec-c;
  near(square(Math.cbrt(x*x*y))-square(Math.cbrt(x*y*y)),1);
  const p=s+c,q=sec+1/s;
  near(q*(p*p-1),2*p);
  const a=(1+s)/c;
  near((a*a-1)/(a*a+1),s);
  // The difference of the two sides equals the residual of the squared premise.
  near(cube(c*c)-4*square(c*c)+8*c*c-4,square(1-s*s)-square(s*(1+s*s)));
 }
 assert.match(ans('c10-6-ex6-1-q8-i'),/n²/);
 assert.match(ans('c10-6-ex6-1-q8-ii'),/1/);
 assert.match(ans('c10-6-ex6-1-q9-ii'),/= 4/);
 assert.equal(5+8+10+12+7+8,50);
 assert.equal(10*5+30*8+50*10+70*12+90*7+110*8,3140);
 assert.equal(3140*10/50,628);
 assert.match(ans('c10-8-unit-q1'),/f₁ = 8, f₂ = 12/);
 assert.equal(5*18+3,93);
 assert.equal(43*2-1,85);
 assert.match(ans('c10-8-unit-q5'),/31\/6/);
 assert.match(ans('c10-8-unit-q5'),/√85\/6/);

 const structured=manifest.items.map(row=>{
  const item=current.get(row.id);
  assert(item,row.id+' retains the registered ID');
  assert.equal(preserve(item),originals.get(row.id),row.id+' original content and English answer are preserved');
  assert(item.answerMath.en&&item.answerMath.ta);
  assert.equal(item.answerTa,fallback(item.answerMath.ta));
  assert.doesNotMatch(item.answerTa,/\b(?:True|Verified|both sides|proved|where|Mean|and|term)\b/);
  render(item.answerMath.ta);
  if(['c10-6-ex6-1-q8-ii','c10-8-unit-q1'].includes(row.id)){
    const step=item.steps.find(s=>s.mathTa);
    assert(step,row.id+' Tamil equation explicitly authored');
    render(step.mathTa);
  }
  return {recordId:row.id,passed:true,recordSha256:createHash('sha256').update(JSON.stringify(item)).digest('hex')};
 });
 assert(read('service-worker.js').includes('./data/textbook-exercises/g10-frontier-tamil-answers.js'));
 console.log('PASS Grade 10: 19 independent final-answer checks, stable English work, Tamil displays and offline script');
 return structured;
}
if(require.main===module)verify();
module.exports={verify};
