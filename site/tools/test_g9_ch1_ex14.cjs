'use strict';

const assert = require('node:assert/strict');
const {ROOT, chapterItems, loadRuntime, hashRecord} = require('./curriculum_bulk.cjs');
const fs = require('node:fs');
const path = require('node:path');
const katex = require('../assets/vendor/katex/katex.min.js');
const source = require('../data/textbook-fidelity/g9-ch1-ex1-4.json');

function verify(runtime = loadRuntime()) {
  const cards=chapterItems(runtime,9,1).filter(q=>q.exercise==='1.4');
  assert.equal(cards.length,5);
  assert.equal(source.items.flatMap(q=>q.parts).length,7);
  assert(fs.readFileSync(path.join(ROOT,'site/service-worker.js'),'utf8').includes('./data/textbook-exercises/g9-ch1-ex1-4.js'));
  for(const [i,card] of cards.entries()){
    assert.equal(card.id,source.items[i].id);
    assert.deepEqual(card.q,source.items[i].textbookPrompt);
    assert.equal(card.review.tamilEditorial,'pending');
    assert.match(card.hint.ta,/\p{Script=Tamil}/u);
    for(const lang of ['en','ta']){
      const fragments=card.questionMath[lang];
      assert.equal(fragments.map(fragment=>fragment.fallback??fragment).join(''),card.q[lang]);
      for(const formula of [...fragments,card.answerMath,...card.steps.map(step=>step.math)].filter(x=>x.latex)){
        katex.renderToString(formula.latex,{throwOnError:true,strict:'error'});
      }
    }
    assert(card.steps.every(step=>step.eq===step.math.fallback&&/\p{Script=Tamil}/u.test(step.ta)&&/\p{Script=Tamil}/u.test(step.why.ta)));
    assert.equal(card.answer,card.answerMath.fallback);
  }

  const inAll=(values,...rest)=>values.filter(value=>rest.every(set=>set.includes(value)));
  const union=(...sets)=>[...new Set(sets.flat())];
  const [p,q,r,s]=[[1,2,5,7,9],[2,3,5,9,11],[3,4,5,7,9],[2,3,4,5,8]];
  const [a,b,c]=[[...'pqrs'],[...'mnqst'],[...'mnpqs']];
  const q1Working=[
    [union(p,q),union(p,q,r)],[inAll(p,q),inAll(p,q,s)],[inAll(q,s),inAll(q,s,r)]
  ];
  const rosterStrings=expression=>[...expression.matchAll(/\{([^{}]+)\}/g)].map(match=>match[1].split(',').sort());
  const compare=(expression,sets)=>assert.deepEqual(rosterStrings(expression),sets.map(set=>set.map(String).sort()));
  cards[0].steps.forEach((step,i)=>compare(step.eq,q1Working[i]));
  compare(cards[0].answer,q1Working.map(pair=>pair[1]));

  // Q2 uses the ordered-subset relation Q ⊆ P. The only possible region
  // membership flags (P,Q) are (0,0), (1,0), (1,1).
  for (const [real,rational] of [[0,0],[1,0],[1,1]]) {
    assert.equal(real || rational, real);
    assert.equal(real && rational, rational);
  }
  assert.deepEqual(cards[1].steps.map(step=>step.eq),['Q ⊆ P','P∪Q = Q∪P = P','P∩Q = Q∩P = Q']);
  assert.equal(cards[1].answer,'P∪Q = Q∪P = P\nP∩Q = Q∩P = Q');

  compare(cards[2].steps[0].eq,[union(a,b),union(a,b,c)]);
  compare(cards[2].steps[1].eq,[union(b,c),union(a,b,c)]);
  compare(cards[2].answer,[union(a,b,c)]);

  const radicals=[['−11','√2','√5','7'],['√3','√5','6','13'],['√2','√3','√5','9']];
  compare(cards[3].steps[0].eq,[inAll(radicals[0],radicals[1]),inAll(...radicals)]);
  compare(cards[3].steps[1].eq,[inAll(radicals[1],radicals[2]),inAll(...radicals)]);
  compare(cards[3].answer,[inAll(...radicals)]);

  const powers=[0,1,2,3].map(n=>2**n), even=[1,2,3,4].map(n=>2*n), third=[0,1,2,5,6];
  compare(cards[4].steps[0].eq,[powers,even]);
  compare(cards[4].steps[1].eq,[inAll(powers,even),inAll(powers,even,third)]);
  compare(cards[4].steps[2].eq,[inAll(even,third),inAll(powers,even,third)]);
  compare(cards[4].answer,[inAll(powers,even,third)]);

  return {checks:cards.map((record,i)=>({recordId:record.id,parts:source.items[i].parts,passed:true,
    recordSha256:hashRecord(record),method:i===1?'Ordered-subset membership truth table':'Independent roster enumeration and operation order'}))};
}

if (require.main === module) {
  verify();
  console.log('PASS Grade 9 Exercise 1.4: seven source tasks, bilingual reasoning, roster invariants and KaTeX');
}
module.exports={verify};
