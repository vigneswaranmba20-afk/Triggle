'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const katex = require('../assets/vendor/katex/katex.min.js');
const {ROOT, chapterItems, loadRuntime, hashRecord} = require('./curriculum_bulk.cjs');
const evidence = require('../data/textbook-fidelity/g9-ch1-ex1-6.json');

const sum = values => values.reduce((total,value)=>total+value,0);
const ends = eq => eq.split('\n').map(row=>Number(row.match(/(?:^|= )(-?\d+)$/)?.[1])).filter(Number.isFinite);
const knownRegionLabels = (id, labels, membership) => {
  const svg = fs.readFileSync(path.join(ROOT,'site/assets/grade9-ch1/ex1-6-q'+id+'.svg'),'utf8');
  const circles = [...svg.matchAll(/<circle cx="(\d+)" cy="(\d+)" r="(\d+)"/g)]
    .map(m=>m.slice(1).map(Number));
  const positions = new Map([...svg.matchAll(/<text x="(\d+)" y="(\d+)">([^<]+)</g)]
    .map(([,sx,sy,value])=>[value,[Number(sx),Number(sy)-6]]));
  for (const [i,label] of labels.entries()) {
    const [x,y] = positions.get(label);
    const mask = circles.map(([cx,cy,radius])=>Number((x-cx)**2+(y-cy)**2<radius**2)).join('');
    assert.equal(mask,membership[i],id+' Venn position '+label);
  }
};

function verify(runtime = loadRuntime()) {
  const records=chapterItems(runtime,9,1).filter(row=>row.exercise==='1.6');
  assert.equal(records.length,13);
  assert.equal(evidence.items.flatMap(row=>row.parts).length,23);
  const checks=[];
  for (const [i,item] of records.entries()) {
    const row=evidence.items[i];
    assert.equal(item.id,row.id);
    assert.equal(item.setConcept,'cardinality');
    assert.equal(item.notationSource,'authored');
    assert.deepEqual(item.q,row.textbookPrompt);
    assert.equal(item.review.tamilEditorial,'pending');
    assert.match(item.hint.ta,/\p{Script=Tamil}/u);
    assert.equal(item.answerMath.fallback,item.answer);
    const formulas=[item.answerMath];
    for (const medium of ['en','ta']) {
      const fragments=item.questionMath[medium];
      assert.equal(fragments.map(v=>v.fallback??v).join(''),row.textbookPrompt[medium]);
      assert.equal(row.visualStatus[medium],'page-checked');
      assert(row.sourcePages[medium].every(page=>page.pdf===page.printed+6));
      formulas.push(...fragments.filter(v=>v.latex));
    }
    for (const step of item.steps) {
      assert.match(step.ta,/\p{Script=Tamil}/u);
      assert.match(step.why.ta,/\p{Script=Tamil}/u);
      if (step.math) {
        assert.equal(step.math.fallback,step.eq);
        formulas.push(step.math);
      }
    }
    for (const math of formulas) katex.renderToString(math.latex,{throwOnError:true,strict:'error'});
    for (const file of row.figureFiles) {
      assert(fs.existsSync(path.join(ROOT,'site',file)));
      assert(fs.readFileSync(path.join(ROOT,'site/service-worker.js'),'utf8').includes("'"+file+"'"));
      assert.match(item.figureAlt.ta,/\p{Script=Tamil}/u);
    }
    checks.push({recordId:item.id,parts:row.parts,passed:true,recordSha256:hashRecord(item),
      method:i===1||i===2?'Enumerate the unions and intersections from the source rosters':
        'Independently solve the finite-set region equations, then check intermediate counts and final results'});
  }

  const checklist = [
    [15,65,250,600], [7,7], [7,6], [17,22,47], [10,10,25], [90,30,300,1000],
    [32,48], [550], [122,14,2,148,11,26,185,141,326], [70], [125,90,90,80,30],
    [4,2,23,11,5,7,8], [25,5]
  ];
  for (const [i,item] of records.entries()) {
    const working=item.steps.flatMap(step=>ends(step.eq||''));
    if (i===5) {
      assert.equal(item.steps[0].eq,'100% − 10% = 90%');
      assert.equal(item.steps[1].eq,'50% + 70% − 90% = 30%');
      assert.deepEqual([90,30,...working],checklist[i]);
    } else {
      assert.deepEqual(working,checklist[i],item.id+' intermediate arithmetic');
    }
  }

  const explicitAnswers = [
    '(i) n(A∩B) = 15, n(U) = 65\n(ii) n(B) = 250, n(U) = 600',
    'n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = 7', '(i) n(A∪B∪C) = 7\n(ii) n(A∪B∪C) = 6',
    '(i) 17\n(ii) 22\n(iii) 47','(i) 10\n(ii) 10\n(iii) 25','1000','x = 8','550 > 500',
    '(i) 185\n(ii) 141\n(iii) 326','70','x = 20, y = 40, z = 30','(i) 5\n(ii) 7\n(iii) 8','5'
  ];
  assert.deepEqual(records.map(item=>item.answer),explicitAnswers);

  // Reconstruct all underlying region counts as a disjoint partition. This
  // independently checks that the newspaper, farm and game totals can coexist.
  function totals(regions) {
    const [a,b,c,ab,ac,bc,abc] = regions;
    return [a+ab+ac+abc,b+ab+bc+abc,c+ac+bc+abc,ab+abc,ac+abc,bc+abc,sum(regions)];
  }
  assert.deepEqual(totals([148,11,26,122,2,14,3]),[275,150,45,125,5,17,326]);
  assert.deepEqual(totals([470,200,170,50,10,30,70]),[600,350,280,120,80,100,1000]);
  assert.deepEqual(totals([7,8,3,5,4,2,6]),[22,21,15,11,10,8,35]);
  assert.equal(sum([20,40,30,4,6,17,3,5]),125);
  assert.equal(20*2,40);
  assert.equal(20+10,30);
  assert.deepEqual([50-(25+20+30-50-2*10)-10,25+20+30-50-2*10,10],[35,5,10]);
  assert(400+200-50>500,'Car counts are deliberately impossible');

  // Source Venn regions and solution diagrams, located relative to each
  // rendered circle, independently of the order in which SVG labels appear.
  knownRegionLabels(7,['32 + x','x','5x'],['10','11','01']);
  const three=['100','010','001','110','101','011','111','000'];
  knownRegionLabels(9,['148','11','26','122','2','14','3','0'],three);
  knownRegionLabels(11,['x','y','z','4','6','17','3','5'],three);
  knownRegionLabels(12,['7','8','3','5','4','2','6','0'],three);

  return {checks};
}

if (require.main===module) {
  verify();
  console.log('PASS Grade 9 Exercise 1.6: 23 bilingual source tasks, independent counts, all four Venn diagrams and KaTeX');
}
module.exports={verify};
