'use strict';

const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const katex=require('../assets/vendor/katex/katex.min.js');
const {ROOT,chapterItems,loadRuntime,hashRecord}=require('./curriculum_bulk.cjs');
const manifest=require('../data/textbook-fidelity/g9-ch1-ex1-7.json');

function verify(runtime=loadRuntime()){
  const cards=chapterItems(runtime,9,1).filter(item=>item.exercise==='1.7');
  assert.equal(cards.length,20);
  const worker=fs.readFileSync(path.join(ROOT,'site/service-worker.js'),'utf8');
  const plain=value=>value?.fallback??value;
  const key=[1,0,2,1,3,0,1,3,2,3,1,null,0,2,3,0,3,2,2,0];
  const checks=[];
  for(const [i,card] of cards.entries()){
    const source=manifest.items[i], number=source.question;
    assert.equal(card.id,source.id);
    assert.deepEqual(card.q,source.textbookPrompt);
    assert.equal(card.review.tamilEditorial,'pending');
    assert.match(card.hint.ta,/\p{Script=Tamil}/u);
    if(key[i]===null){
      assert.equal(card.sourceStatus,'SOURCE_BLOCKED');
      assert.equal(card.choices,undefined);
      assert.equal(card.correctIndex,undefined);
      assert.match(card.answer.en,/5 to 20/);
      assert.match(card.answer.ta,/5 முதல் 20/);
    }else{
      assert.equal(card.correctIndex,key[i]);
      assert.deepEqual(card.choices.map(choice=>({en:plain(choice.en),ta:plain(choice.ta)})),source.textbookChoices);
      checks.push({recordId:card.id,parts:['whole'],passed:true,recordSha256:hashRecord(card),
        method:[9,16,20].includes(number)?'Independent cardinality arithmetic and disjoint regions':
          'Check 2025 options against the set membership conditions'});
    }
    for(const lang of ['en','ta']){
      assert.equal(card.questionMath[lang].map(plain).join(''),card.q[lang]);
      const formulas=[...card.questionMath[lang],...(card.choices??[]).map(c=>c[lang]),card.answerMath?.[lang],
        ...card.steps.map(s=>s.math)];
      for(const formula of formulas.filter(f=>f?.latex)) katex.renderToString(formula.latex,{throwOnError:true,strict:'error'});
    }
    assert(card.steps.every(step=>/\p{Script=Tamil}/u.test(step.ta)&&/\p{Script=Tamil}/u.test(step.why.ta)&&step.eq===step.math.fallback));
    for(const file of source.figureFiles){
      assert(worker.includes(file));
      assert(fs.existsSync(path.join(ROOT,'site',file)));
      assert.match(card.figureAlt.ta,/\p{Script=Tamil}/u);
    }
  }
  assert.equal(checks.length,19);

  const finite=N=>Array.from({length:N},(_,i)=>i+1);
  assert.deepEqual(finite(10).filter(n=>n===7),[7]);
  assert.equal(finite(10).some(n=>Array.isArray(n)),false);
  assert.deepEqual([-2,-1,0,1,2].filter(n=>-1<n&&n<1),[0]);
  const U=finite(9), a=[2,3,4,5], minus=(a,b)=>a.filter(x=>!b.includes(x));
  assert.deepEqual(minus(U,minus(U,a)),[2,3,4,5]);
  assert.deepEqual([2,3].filter(n=>[1,2,3].includes(n)),[2,3]);
  const subsets=values=>values.reduce((subsets,v)=>subsets.concat(subsets.map(s=>[...s,v])),[[]]);
  assert.equal(subsets(['x','y','z']).filter(s=>s.length>0).length,7);
  assert([].every(v=>['a','b'].includes(v)));
  for(const [a,b] of [[false,false],[false,true],[true,false],[true,true]]){
    if((a||b)===(a&&b))assert.equal(a,b);
    if((b&&!a)===b)assert(!(a&&b));
    assert.equal(!(a&&b),!a||!b);
    assert.equal(!(a||b),!a&&!b);
    for(const c of [false,true]){
      assert.equal(a&&!(b&&c),(a&&!b)||(a&&!c));
      assert.equal((a&&!b)&&(b&&!c),false);
    }
  }
  const left=[60,85,75,30,20],right=[90,70,30,20];
  assert.equal(subsets([...minus(left,right),...minus(right,left)]).length,32);
  assert.deepEqual(finite(10).filter(n=>finite(15).includes(n)).length,10);
  assert.deepEqual(finite(10).filter(n=>finite(15).map(x=>x+10).includes(n)).length,0);
  const empty=JSON.stringify([]), a11=JSON.stringify([[]]);
  assert.deepEqual([empty].filter(x=>[empty,a11].includes(x)),[empty]);
  assert.deepEqual(minus(U,[1,2,3,5,6,7,8,9]),[4]);
  for(let overlap=5;overlap<=20;overlap++){
    const counts=[35-overlap,20-overlap,overlap,overlap-5];
    assert(counts.every(n=>n>=0));
    assert.equal(counts.reduce((a,b)=>a+b,0),50);
  }
  const x=(100+20+15+25-10)/(4+6+5);
  assert.equal(x,10);
  const portions=[4*x-20-25+10,6*x-20-15+10,5*x-15-25+10,20-10,15-10,25-10,10];
  assert(portions.every(n=>n>=0));
  assert.equal(portions.reduce((a,b)=>a+b,0),100);
  // An isosceles right triangle has two equal legs and a right angle.
  // Equal legs achieve both restrictions without forcing all sides equal.
  const [leg1,leg2]=[[1,0],[0,1]];
  assert.equal(leg1[0]*leg2[0]+leg1[1]*leg2[1],0);
  assert.equal(leg1[0]**2+leg1[1]**2,leg2[0]**2+leg2[1]**2);
  const shading=Array.from({length:8},(_,i)=>[(i&4)!==0,(i&2)!==0,(i&1)!==0]);
  assert.deepEqual(shading.flatMap(([x,y,z],i)=>z&&!(x&&y)?[i]:[]),[1,3,5]);
  assert.equal(100-(40+35+20),5);

  const diagram=fs.readFileSync(path.join(ROOT,'site/assets/grade9-ch1/ex1-7-q9.svg'),'utf8');
  const circles=[...diagram.matchAll(/<circle cx="(\d+)" cy="(\d+)" r="(\d+)"/g)].map(v=>v.slice(1).map(Number));
  const memberships={};
  for(const [,sx,sy,value] of diagram.matchAll(/<text x="(\d+)" y="(\d+)">(\d+)<\/text>/g)){
    const code=circles.map(([x,y,r])=>Number((Number(sx)-x)**2+(Number(sy)-6-y)**2<r*r)).join('');
    (memberships[code]??=[]).push(Number(value));
  }
  assert.deepEqual(memberships,{'10':[60,85,75],'11':[30,20],'01':[90,70],'00':[50,10,65]});
  return {checks,sourceBlocked:[cards[11].id]};
}
if(require.main===module){
  verify();
  console.log('PASS Grade 9 Exercise 1.7: 19 verified MCQs and one bilingual source-ambiguity explanation');
}
module.exports={verify};
