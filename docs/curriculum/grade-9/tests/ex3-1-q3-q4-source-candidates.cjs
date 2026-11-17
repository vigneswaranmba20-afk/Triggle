'use strict';
// 2025 English textbook original page 93 and answer appendix page 316, candidate-only math gate.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../../../../');
const katex=require(path.join(root,'site/assets/vendor/katex/katex.min.js'));
const m=JSON.parse(fs.readFileSync(path.join(root,'docs/curriculum/grade-9/candidates/g9-ch3-ex3-1-q3-q4-english-9.json'),'utf8'));
const index=fs.readFileSync(path.join(root,'site/index.html'),'utf8');
assert.equal(m.schemaVersion,1);
assert.equal(m.englishPartCount,9);
assert.equal(m.rows.length,9);
assert.equal(m.imageEvidenceChecked,true);
assert.equal(m.status,'source-audited-candidates-not-published');
assert.equal(m.sourceOriginalPdfPages[0],93);
assert.equal(m.sourceAnswerAppendixPdfPages[0],316);
assert.equal(m.externalApiSpendUsd,0);
assert.deepEqual(m.rows.map(x=>x.id),['q3-i','q3-ii','q3-iii','q3-iv','q3-v','q4-i','q4-ii','q4-iii','q4-iv'].map(x=>'g9-ch3-ex3.1-'+x));
assert.deepEqual(m.rows.slice(0,5).map(x=>x.answerKeyShort),['7','4','5','6','4'],'Official 2025 Q3 degrees');
assert(m.rows[1].steps.some(s=>s.reason.includes('undefined at x = 0')),'Do not conceal x=0 domain restriction');
const descending=[
 '\\sqrt7\\,x^3+6x^2+x-9',
 '-\\frac72x^4-5x^3+\\sqrt2\\,x^2+x',
 '7x^3-\\frac65x^2+4x-1',
 '9y^4+\\sqrt5\\,y^3+y^2-\\frac73y-11'
];
assert.deepEqual(m.rows.slice(5).map(x=>x.answerMathLatex),descending,'Original answer appendix descending-order math');
assert(m.rows.slice(5).every(x=>x.answer.startsWith('Descending: ')&&x.answer.includes('ascending: ')),'Both official standard-form orders');
assert.equal(new Set(m.rows.map(x=>x.id)).size,9);
let renders=0,steps=0;
for(const row of m.rows){
 assert.equal(row.translationReview,'pending');assert.equal(row.studentPublished,false);
 assert.equal(row.sourceEvidence.enPdfPage,93);assert.equal(row.sourceEvidence.answerEnPdfPage,316);
 assert.equal(row.steps.length,3);
 assert(row.stem.length>20&&row.sourceEnglish.length>3&&row.answer);
 assert(!index.includes(row.id),'Candidates are not student-facing until separately approved '+row.id);
 for(const tex of [row.sourceMathLatex,row.answerMathLatex,...row.steps.map(s=>s.mathLatex)]){
  const rendered=katex.renderToString(tex,{throwOnError:true,trust:false,strict:'error',output:'htmlAndMathml'});
  assert(rendered.includes('katex-html')&&rendered.includes('<math'),'Accessible TeX for '+row.id);renders++;
 }
 for(const step of row.steps){assert(step.reason.length>45&&step.equation&&step.mathLatex);steps++;}
}
assert.equal(renders,45);assert.equal(steps,27);
console.log('PASS G9 Algebra Ex3.1 Q3–Q4: nine original-image-audited parts, official degree answers [7,4,5,6,4], standard-order results, domain caveat, 27 steps, 45 accessible KaTeX renders, no premature student publication.');
