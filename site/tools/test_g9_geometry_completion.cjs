'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const bulk = require('./curriculum_bulk.cjs');
const sourceData = require('../data/textbook-fidelity/g9-ch4-geometry-2025.json');
const evidencePath = 'site/data/textbook-fidelity/g9-ch4-geometry-2025.json';

const literal = value => Array.isArray(value) ? value.map(literal).join('') : value?.fallback ?? value;
const checkMath = values => {
  for (const value of [].concat(values || [])) {
    if (value?.latex) katex.renderToString(value.latex,{throwOnError:true});
  }
};
const near = (actual, expected) => assert(Math.abs(actual-expected)<1e-8,actual+' != '+expected);
const distance = (a,b) => Math.hypot(a[0]-b[0],a[1]-b[1]);
const determinant = (a,b,c) => (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
const measure = (a,b,c) => Math.acos(((a[0]-b[0])*(c[0]-b[0])+(a[1]-b[1])*(c[1]-b[1]))/(distance(a,b)*distance(b,c)))*180/Math.PI;

function verify(runtime = bulk.loadRuntime()) {
  const source = bulk.validateChapterInventory(sourceData,{runtime});
  assert(source.passed,source.errors.join('\n'));
  assert.equal(source.numberedQuestions,69);
  assert.equal(source.sourceTasks,86);
  const rows = bulk.chapterItems(runtime,9,'4').filter(bulk.exerciseItem);
  const byId = new Map(rows.map(row=>[row.id,row]));
  assert.equal(rows.length,86);
  assert.equal(byId.size,86);
  const sw = fs.readFileSync(path.join(bulk.ROOT,'site/service-worker.js'),'utf8');
  const preserved = require('../data/textbook-fidelity/g9-ch4-bilingual-20261124.json').records;
  const taText = /\p{Script=Tamil}/u;
  for (const ex of sourceData.inventory.exercises) {
    for (const q of ex.questions) {
      for (const part of q.parts) {
        const id = 'g9-ch4-ex'+ex.id+'-q'+q.number+(part==='whole'?'':'-'+part);
        const record = sourceData.records[id], row = byId.get(id);
        assert(row,id);
        assert.equal(record.part,part);
        assert.equal(record.exercise,ex.id);
        assert.equal(record.question,q.number);
        assert.deepEqual(record.visualChecked,{en:true,ta:true});
        assert.deepEqual(row.q,record.textbookPrompt);
        assert(taText.test(row.q.ta),id);
        assert(row.answer && row.answerTa,id);
        assert(row.steps.every(step=>step.en && taText.test(step.ta)),id);
        assert(q.pdfPages.includes(record.sourcePages.en.pdf),id);
        assert(q.taPdfPages.includes(record.sourcePages.ta.pdf),id);
        for (const lang of ['en','ta']) {
          assert.equal(record.sourcePages[lang].printed+6,record.sourcePages[lang].pdf);
          if (row.questionMath) assert.equal(literal(row.questionMath[lang]),row.q[lang],id);
          checkMath(row.questionMath?.[lang]);
          checkMath(row.answerMath?.[lang]);
        }
        if (preserved[id]) {
          const digest = crypto.createHash('sha256').update(JSON.stringify(row)).digest('hex');
          assert.equal(digest,preserved[id].reviewedRecordSha256,id);
        } else {
          assert(row.steps.every(step=>step.why.en&&taText.test(step.why.ta)),id);
          assert(taText.test(row.hint.ta),id);
          assert(Number.isInteger(row.geometryConcept) && row.geometryConcept>=0 && row.geometryConcept<7,id);
        }
        row.steps.forEach(step=>{checkMath(step.math);checkMath(step.mathTa);});
        if (row.choices) {
          assert.deepEqual(row.choices.map(c=>({en:literal(c.en),ta:literal(c.ta)})),record.textbookChoices);
          row.choices.forEach(c=>{checkMath(c.en);checkMath(c.ta);});
        }
        if (row.figureSrc) {
          assert(sw.includes("'./"+row.figureSrc+"'"),id+' offline figure');
          assert(taText.test(row.figureAlt.ta) && row.figureAlt.en,id);
          const svg = fs.readFileSync(path.join(bulk.ROOT,'site',row.figureSrc),'utf8');
          assert.match(svg,/viewBox="0 0 320 224"/);
        }
      }
    }
  }

  const row = id => byId.get('g9-ch4-ex'+id);
  const numberAnswers = {
    '4.1-q1-i':[360-140-150], '4.1-q1-ii':[360-48-24], '4.1-q1-iii':[180-53-38],
    '4.1-q2':[1,2,3].map(n=>n*180/6), '4.1-q5':[45+35,2*45-5,180-(45+35)-(2*45-5)],
    '4.2-q1':[2,4,5,7].map(n=>n*360/18), '4.2-q2':[(360-180+6)/3,72,2*62-10,180-72,62+4],
    '4.2-q3':[90-46], '4.2-q4':[Math.hypot(12/2,16/2)],
    '4.2-q7-i':[180-2*75], '4.2-q7-ii':[180-75], '4.2-q7-iii':[75], '4.2-q7-iv':[180-75],
    '4.2-q8':[180-(180-64)/2,(180-64-58)/2], '4.2-q10':[(10*8-4*3-6*5)/Math.hypot(4,3)],
    '4.3-q1':[Math.hypot(24,10)===52/2?24:NaN], '4.3-q2':[Math.hypot(30/2,8)],
    '4.3-q3':[Math.sqrt(4*4*2*2), (180-90)/2], '4.3-q4':[2*Math.sqrt(15**2-12**2)],
    '4.3-q5':[6+8,8-6], '4.3-q6':[2*Math.sqrt(5**2-4**2)],
    '4.3-q7-i':[(30+60)/2], '4.3-q7-ii':[180-80/2-30-2*(180-80)/2],
    '4.3-q7-iii':[(180-70)/2], '4.3-q7-iv':[360-2*120], '4.3-q7-v':[(360-140-100)/2],
    '4.3-q8':[25,90-25,2*25], '4.4-q1':[120-90], '4.4-q2-i':[90-35],
    '4.4-q2-ii':[90-40], '4.4-q2-iii':[90-35-30], '4.4-q3':[2*30+4,6*14-4,4*30-4,7*14+2],
    '4.4-q4-i':[40], '4.4-q4-ii':[180-40-60], '4.4-q5':[Math.hypot(4,(7-1)/2)],
    '4.4-q6':[(3**2+2**2)/(2*2)], '4.4-q7':[(2*120-180)/2],
    '4.4-q8':[Number(Math.sqrt(2*6**2-4**2-5**2).toFixed(1))], '4.4-q9':[(180-2*30)/2]
  };
  for (const [id,values] of Object.entries(numberAnswers)) {
    for (const lang of ['answer','answerTa']) {
      const tokens = row(id)[lang].match(/\d+(?:\.\d+)?/g).map(Number);
      for (const value of values) assert(tokens.includes(value),id+' '+lang+' target '+value);
    }
  }
  assert.match(row('4.2-q9').answer,/1\s*:\s*1/);
  assert.match(row('4.2-q11').answer,/9\/8/);
  assert.match(row('4.4-q8').answer,/√31/);
  const mcqOptions = [2,3,1,4,4,3,2,2,4,2,3,3,1,1,4,2,2,3,2,4];
  for (const [i,result] of mcqOptions.entries()) assert.equal(row('4.7-q'+(i+1)).correctIndex+1,result);
  assert.equal((360-108-42)/2,105);
  assert.equal(180-(75-(180-110-30))-60,85);
  assert.equal(2*Math.sqrt(25**2-15**2),40);
  assert.equal((8**2+4**2)/(2*4),10);
  assert.equal(17-Math.sqrt(17**2-15**2),9);

  const window = {};
  vm.runInNewContext(fs.readFileSync(path.join(bulk.ROOT,'site/assets/g9-geometry-constructions.js'),'utf8'),{window});
  const construction = rows.filter(x=>x.geometryConstruction);
  assert.equal(construction.length,16);
  for (const {geometryConstruction:spec,id} of construction) {
    const m = window.TriggleGeometryConstruction.model(spec);
    const [A,B,C] = m.vertices;
    near(distance(A,B),spec.length);
    assert(determinant(A,B,C)>0,id);
    if (spec.mode==='sss') {
      near(distance(A,C),spec.a);
      near(distance(B,C),spec.b);
    } else {
      const end = spec.mode.startsWith('end');
      near(end?measure(A,B,C):measure(B,A,C),spec.a);
      if (spec.mode==='asa') near(measure(A,B,C),spec.b);
      else near(distance(end===spec.mode.endsWith('opposite')?A:B,C),spec.b);
    }
    if (spec.centre==='G') for (let i=0;i<2;i++) near(m.centre[i],(A[i]+B[i]+C[i])/3);
    if (spec.centre==='H') for (const [v,a,b] of m.pairs) near((m.centre[0]-v[0])*(a[0]-b[0])+(m.centre[1]-v[1])*(a[1]-b[1]),0);
    if (spec.centre==='S') for (const v of m.vertices) near(distance(m.centre,v),m.radius);
    if (spec.centre==='I') for (const [,a,b] of m.pairs) near(determinant(a,b,m.centre)/distance(a,b),m.radius);
    if (id.endsWith('4.5-q8')) near(distance(m.centre,B),0);
    if (id.endsWith('4.6-q2')) near(m.radius,3.75);
    if (id.endsWith('4.6-q6')) near(m.radius,2);
  }
  return {source,sourceData,evidencePath};
}

if (require.main===module) {
  verify();
  console.log('PASS Grade 9 Geometry: 69 numbered questions, 86 tasks, both languages, preserved IDs, numeric answers, all 20 MCQs, 16 construction invariants, KaTeX and offline assets');
}
module.exports = {verify};
