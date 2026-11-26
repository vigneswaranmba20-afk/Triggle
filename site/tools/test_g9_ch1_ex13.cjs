'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const katex = require('../assets/vendor/katex/katex.min.js');
const {ROOT, chapterItems, loadRuntime, hashRecord} = require('./curriculum_bulk.cjs');
const source = require('../data/textbook-fidelity/g9-ch1-ex1-3.json');

const namespace = 'g9-ch1-ex1.3-q';
const parseSets = text => [...text.matchAll(/\{([^{}]*)\}/g)]
  .map(match => match[1].split(',').map(value => value.trim()).sort());
const asSets = groups => groups.map(group => group.split(',').sort());
const checkSets = (record, expected, steps) => {
  assert.deepEqual(parseSets(record.answer), asSets(expected), record.id + ' final sets');
  assert.deepEqual(record.steps.map(step => parseSets(step.eq)), steps.map(asSets), record.id + ' intermediate sets');
};
const equation = (lhs, rhs) => lhs + ' = ' + rhs;

function verify(runtime = loadRuntime()) {
  const introduced = chapterItems(runtime, 9, 1).filter(item => item.exercise === '1.3');
  assert.equal(introduced.length, 7);
  assert.deepEqual(introduced.map(item => item.id), source.items.map(item => item.id));
  const checks = [];
  for (const [i, item] of introduced.entries()) {
    const row = source.items[i];
    assert.equal(item.id, namespace + row.question);
    assert.deepEqual(item.q, row.textbookPrompt);
    assert.equal(item.review.tamilEditorial, 'pending');
    assert.equal(item.review.teacher, 'pending');
    assert.equal(item.setConcept, 'operations');
    assert.match(item.hint.ta, /\p{Script=Tamil}/u);

    for (const lang of ['en', 'ta']) {
      const fragments = item.questionMath[lang];
      assert.equal(fragments.map(fragment => fragment.fallback ?? fragment).join(''), row.textbookPrompt[lang]);
      assert.equal(row.visualStatus[lang], 'page-checked');
      assert.equal(row.sourcePages[lang].printed + 6, row.sourcePages[lang].pdf);
      const notation = item.answerMath[lang] ?? item.answerMath;
      assert.equal(notation.fallback, lang === 'ta' && item.answerTa ? item.answerTa : item.answer);
      for (const math of [...fragments, notation, ...item.steps.map(step => lang === 'ta' ? step.mathTa ?? step.math : step.math)].filter(value => value?.latex)) {
        katex.renderToString(math.latex, {throwOnError:true, strict:'error'});
      }
    }
    for (const step of item.steps) {
      assert.match(step.ta, /\p{Script=Tamil}/u);
      assert.match(step.why.ta, /\p{Script=Tamil}/u);
      if (step.math) assert.equal(step.math.fallback, step.eq);
    }
    const worker = fs.readFileSync(path.join(ROOT, 'site/service-worker.js'), 'utf8');
    for (const file of row.figureFiles) {
      assert(fs.statSync(path.join(ROOT, 'site', file)).isFile());
      assert(worker.includes("'" + file + "'"), file + ' offline');
      assert.match(item.figureAlt.ta, /\p{Script=Tamil}/u);
    }
    checks.push({recordId:item.id, parts:row.parts, recordSha256:hashRecord(item), passed:true,
      method:i === 0 ? 'Explicit partition of the original Venn regions' :
        i === 5 || i === 6 ? 'Evaluate the membership truth table of all four disjoint regions' :
          'Independent roster enumeration and comparison with both-language source tasks'});
  }

  const q1 = ['2,4,7,8,10','3,4,6,7,9,11','2,3,4,6,7,8,9,10,11','4,7','2,8,10','3,6,9,11',
    '1,3,6,9,11,12','1,2,8,10,12','1,2,3,4,6,7,8,9,10,11,12'];
  checkSets(introduced[0], q1, [q1.slice(0,2),q1.slice(2,4),q1.slice(4,6),q1.slice(6)]);

  // Values enumerated from the two membership lists per part, using the
  // textbook convention N starts at 1 and W includes 0.
  const q2 = [
    ['2,5,6,10,14,16','2,14','6,10','5,16'],
    ['a,b,c,e,i,o,u','a,e,u','b,c','i,o'],
    ['0,1,2,3,4,5,6,7,8,9,10','1,2,3,4,5','6,7,8,9,10','0'],
    ['m,a,t,h,e,i,c,s,g,o,r,y','e,m,t','a,h,i,c,s','g,o,r,y']
  ];
  const initialPairs = [['2,6,10,14','2,5,14,16'],['a,b,c,e,u','a,e,i,o,u'],
    ['1,2,3,4,5,6,7,8,9,10','0,1,2,3,4,5'],['m,a,t,h,e,i,c,s','g,e,o,m,t,r,y']];
  checkSets(introduced[1], q2.flat(), initialPairs.flatMap((pair, i) => [pair,q2[i]]));

  const q3 = ['a,c,e,g','b,c,f,g','a,b,c,e,f,g','c,g','c,g','a,b,c,e,f,g','b,d,f,h','a,d,e,h'];
  const q4 = ['0,2,4,6','1,4,6','0,1,2,4,6','4,6','4,6','0,1,2,4,6','1,3,5,7','0,2,3,5,7'];
  for (const [i, expected, union, overlap] of [[2,q3,'a,b,d,e,f,h','d,h'],[3,q4,'0,1,2,3,5,7','3,5,7']]) {
    checkSets(introduced[i],expected,[expected.slice(0,2),expected.slice(2,4),[union,overlap,...expected.slice(4,6)],expected.slice(6)]);
  }
  checkSets(introduced[4],['1,2,7','m,o,p,q,j','6,9,10'],[['2,7','1','1,2,7'],['m,o,p','j,q','m,o,p,q,j'],['6','9,10','6,9,10']]);

  const regions = [[false,false], [true,false], [true,true], [false,true]];
  const pick = predicate => regions.flatMap(([a,b], i) => predicate(a,b) ? [i] : []);
  const expectedQ6 = [
    pick((x,y) => y && !x), pick((x,y) => !(x || y)), pick((x,y) => x !== y)
  ];
  const expectedQ7 = [
    pick((a,b) => a || b), pick((a,b) => a && b), pick((a,b) => !(a && b)),
    pick((a,b) => !(!a && b)), pick((a,b) => !a || !b), pick((a,b) => !a && !b)
  ];
  function checkShading(files, expected) {
    for (const file of files) {
      const svg = fs.readFileSync(path.join(ROOT,'site',file),'utf8');
      const captions = [...svg.matchAll(/<g transform="translate\([^)]+\)">([\s\S]*?)<\/g>/g)];
      assert.equal(captions.length, expected.length);
      for (const [i, [, drawing]] of captions.entries()) {
        const actual = ['outside','left-only','right','right-only'].flatMap((region, j) =>
          new RegExp('(?:mask|clip-path)="url\\(#q[67]-'+i+'-'+region+'\\)"').test(drawing) ? [j] : []);
        assert.deepEqual(actual, expected[i], file + ' panel ' + (i + 1));
      }
    }
  }
  const figure = fs.readFileSync(path.join(ROOT,'site',source.items[0].figureFiles[0]),'utf8');
  const membersByRegion = [[],[],[],[]];
  for (const [, sX, sY, value] of figure.matchAll(/<text x="(\d+)" y="(\d+)" [^>]+>(\d+)<\/text>/g)) {
    const [x,y] = [Number(sX),Number(sY)];
    const memberships = [119,201].map(cx => ((x-cx)/65)**2 + ((y-6-76)/48)**2 < 1);
    const region = regions.findIndex(pair => pair.every((value, i) => value === memberships[i]));
    membersByRegion[region].push(value);
  }
  assert.deepEqual(membersByRegion.map(row=>row.sort()),asSets(['1,12','2,8,10','4,7','3,6,9,11']));
  checkShading(source.items[5].figureFiles, expectedQ6);
  checkShading(source.items[6].figureFiles, expectedQ7);
  assert.deepEqual(introduced[5].steps.map(step=>step.eq),['Y−X','(X∪Y)′','(X−Y) ∪ (Y−X)']);
  assert.deepEqual(introduced[5].steps.map(step=>step.mathTa.fallback),['B−A','(A∪B)′','(A−B) ∪ (B−A)']);
  assert.deepEqual(expectedQ7[2], expectedQ7[4], 'De Morgan shading equality in all four regions');
  assert.deepEqual(introduced[6].steps.slice(1,7).map(step=>step.eq),['(i) A∪B','(ii) A∩B','(iii) (A∩B)′',
    '(iv) (B–A)′','(v) A′∪B′','(vi) A′∩B′']);
  assert.equal(introduced[6].steps.at(-1).eq, equation('(A∩B)′','A′∪B′'));
  assert.equal(introduced[6].answer, '(vii) ' + equation('(A∩B)′','A′∪B′'));
  assert.equal(checks.flatMap(row=>row.parts).length, 42);
  return {checks};
}

if (require.main === module) {
  verify();
  console.log('PASS Grade 9 Exercise 1.3: 42 bilingual source tasks, roster workings, shading truth tables and KaTeX');
}

module.exports = {verify};
