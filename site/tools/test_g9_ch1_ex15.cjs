'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const katex = require('../assets/vendor/katex/katex.min.js');
const {ROOT, chapterItems, loadRuntime, hashRecord} = require('./curriculum_bulk.cjs');
const source = require('../data/textbook-fidelity/g9-ch1-ex1-5.json');

const rosters = fallback => [...fallback.matchAll(/\{([^{}]+)\}/g)].map(match=>match[1].split(',').map(v=>v.trim()).sort());
const compare = (formula, expected) => assert.deepEqual(rosters(formula),expected.map(v=>v.split(' ').sort()));

function verify(runtime=loadRuntime()) {
  const cards=chapterItems(runtime,9,1).filter(q=>q.exercise==='1.5');
  const sw=fs.readFileSync(path.join(ROOT,'site/service-worker.js'),'utf8');
  assert.equal(cards.length,11);
  assert.equal(source.items.flatMap(row=>row.parts).length,20);
  assert(sw.includes('./data/textbook-exercises/g9-ch1-ex1-5.js'));
  for(const [i,card] of cards.entries()){
    const row=source.items[i];
    assert.equal(card.id,row.id);
    assert.deepEqual(card.q,row.textbookPrompt);
    assert.equal(card.review.tamilEditorial,'pending');
    assert.match(card.hint.ta,/\p{Script=Tamil}/u);
    for(const lang of ['en','ta']){
      const prompt=card.questionMath[lang];
      assert.equal(prompt.map(v=>v.fallback??v).join(''),card.q[lang]);
      const answer=card.answerMath[lang]??card.answerMath;
      assert.equal(answer.fallback,lang==='ta'&&card.answerTa?card.answerTa:card.answer);
      for(const math of [...prompt,answer,...card.steps.map(s=>lang==='ta'?s.mathTa??s.math:s.math)].filter(v=>v?.latex)){
        katex.renderToString(math.latex,{throwOnError:true,strict:'error'});
      }
    }
    assert(card.steps.every(s=>s.eq===s.math.fallback&&/\p{Script=Tamil}/u.test(s.ta)&&/\p{Script=Tamil}/u.test(s.why.ta)));
    for(const file of row.figureFiles){
      assert(sw.includes(file));
      assert(fs.statSync(path.join(ROOT,'site',file)).isFile());
      assert.match(card.figureAlt.ta,/\p{Script=Tamil}/u);
    }
  }

  const q1=['3 4 6','−1 5 7','−3 0 1 2 3 4 5 6 7 8','−3 0 1 2','1 2 4 6','4 6','−1 3 4 6'];
  compare(cards[0].answer,q1);
  compare(cards[0].steps[0].eq,['−2 −1 3 4 6','−2 −1 5 7 8','−3 −2 0 3 8','−3 −2 −1 0 1 2 3 4 5 6 7 8']);
  compare(cards[0].steps[1].eq,q1.slice(0,2));
  compare(cards[0].steps[2].eq,['−3 0 1 2 5 7 8','−3 0 1 2 3 4 6',...q1.slice(2,4)]);
  compare(cards[0].steps[3].eq,['−3 −2 −1 0 3 5 7 8',...q1.slice(4,6)]);
  compare(cards[0].steps[4].eq,['−2 8',q1[6]]);

  const q2=['a b c d e f','a b d','a b c d e f','a b d'];
  compare(cards[1].answer,q2);
  compare(cards[1].steps[0].eq,['b c d',q2[0],'a b c d g h',q2[1]]);
  compare(cards[1].steps[1].eq,['a b c d e f g','a b c d e f h',q2[2]]);
  compare(cards[1].steps[2].eq,['b d','a b d',q2[3]]);
  assert.equal(cards[1].steps[3].eq,'K∪(L∩M) = (K∪L)∩(K∪M)\nK∩(L∪M) = (K∩L)∪(K∩M)');

  const q3Result='−1 0 1 2 3 4';
  compare(cards[2].steps[0].eq,[q3Result,'0 1 2 3 4 5']);
  assert.match(cards[2].q.en,/A∪\(B∩C\)/);
  assert.match(cards[2].q.ta,/A∩\(B∪C\)/);
  compare(cards[2].steps[1].eq,['0 2 3 4',q3Result]);
  compare(cards[2].steps[2].eq,['−1 0 1 2 3 4 5','−4 −1 0 1 2 3 4',q3Result]);
  compare(cards[2].steps[1].mathTa.fallback,['−4 −1 0 1 2 3 4 5',q3Result]);
  compare(cards[2].steps[2].mathTa.fallback,['0 1 2 3 4','−1 0 2 3 4',q3Result]);
  for(const answer of [cards[2].answer,cards[2].answerTa]) compare(answer,[q3Result,q3Result]);

  const differenceExamples=[
    {index:4,steps:[['a d g','b c e h'],['b e h','b c','b c e h']]},
    {index:5,initial:['0 6 12 18 24 30','6 8 10 12 14 16 18','12 15 18 21 24 27'],
      steps:[['12 18','0 6 24 30'],['0 24 30','0 6 30','0 6 24 30']]},
    {index:6,steps:[['−1 0 2 5 6 7','−2 1 3'],['−2 1 3','−2 0 1 3','−2 1 3']]},
    {index:7,initial:['1/2 1 3/2 2 5/2 3','−1/2 1/2 3/2 5/2 7/2'],
      steps:[['−1 −1/2 1/2 1 3/2 2 5/2 7/2','3'],['1 2 3','1/2 5/2 3','3']]}
  ];
  for(const {index,initial,steps} of differenceExamples){
    if(initial) compare(cards[index].steps[0].eq,initial);
    steps.forEach((sets,i)=>compare(cards[index].steps[i+Number(!!initial)].eq,sets));
    compare(cards[index].answer,[steps[0][1],steps[1][2]]);
  }

  const deMorgan=cards[9];
  compare(deMorgan.steps[0].eq,['4 10 15 16','7 10 11 16']);
  compare(deMorgan.steps[1].eq,['4 7 8 11 12 15','10 16','10 16']);
  compare(deMorgan.steps[2].eq,['8 12','4 7 10 11 15 16','4 7 10 11 15 16']);
  compare(deMorgan.answer,['10 16','4 7 10 11 15 16']);

  // Match the authored region masks to independently evaluated truth tables.
  const g=(k,a,b,c)=>k===4?(a||b)&&(a||c):k===9?(a&&!b)||(a&&!c):!a||!b;
  const lhs=(k,a,b,c)=>k===4?a||b&&c:k===9?a&&!(b&&c):!(a&&b);
  for(const k of [4,9,11]){
    const svg=fs.readFileSync(path.join(ROOT,'site/assets/grade9-ch1/ex1-5-q'+k+'.svg'),'utf8');
    const states=(k===11?['00','01','10','11']:['000','001','010','011','100','101','110','111']);
    for(const mask of states){
      const flags=[...mask].map(bit=>bit==='1');
      const right=g(k,...flags),left=lhs(k,...flags);
      assert.equal(left,right);
      for(const [side,shaded] of [['left',left],['right',right]]){
        if(!mask.includes('0')) continue; // The all-true patch uses only clip paths.
        assert.equal(svg.includes('mask="url(#q'+k+'-'+side+'-region-'+mask+')"'),shaded);
      }
    }
  }

  const svg=fs.readFileSync(path.join(ROOT,'site/assets/grade9-ch1/ex1-5-q1.svg'),'utf8');
  const circles=[...svg.matchAll(/<circle cx="(\d+)" cy="(\d+)" r="(\d+)"/g)].map(m=>m.slice(1).map(Number));
  const byRegion={};
  for(const [,sx,sy,value] of svg.matchAll(/<text x="(\d+)" y="(\d+)" [^>]+>(−?\d+)<\/text>/g)){
    const region=circles.map(([x,y,r])=>Number((Number(sx)-x)**2+(Number(sy)-6-y)**2<r*r)).join('');
    (byRegion[region]??=[]).push(value);
  }
  assert.deepEqual(byRegion,{'100':['4','6'],'010':['5','7'],'001':['0','−3'],'110':['−1'],
    '101':['3'],'011':['8'],'111':['−2'],'000':['1','2']});
  return {checks:cards.map((q,i)=>({recordId:q.id,parts:source.items[i].parts,passed:true,recordSha256:hashRecord(q),
    method:[4,9,11].includes(i+1)?'Truth-table equivalence of both shaded diagrams':'Independent finite-set and exact rational roster comparison'}))};
}

if(require.main===module){
  verify();
  console.log('PASS Grade 9 Exercise 1.5: 20 bilingual source tasks, both distinct Q3 identities, Venn membership and KaTeX');
}
module.exports={verify};
