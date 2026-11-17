'use strict';
// English-only 2025 Grade 9 Algebra source/appendix candidates. NOT published student questions.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const katex=require('../../../../site/assets/vendor/katex/katex.min.js');
const root=path.resolve(__dirname,'../../../../');
const json=JSON.parse(fs.readFileSync(path.join(root,'docs/curriculum/grade-9/candidates/g9-ch3-ex3-1-q1-q2-english-11.json'),'utf8'));
const html=fs.readFileSync(path.join(root,'site/index.html'),'utf8');
assert.equal(json.schemaVersion,1);
assert.equal(json.englishPartCount,11);
assert.equal(json.rows.length,11);
assert.equal(json.pageImagesInspected,true);
assert.equal(json.textbookAnswerKeyConfirmed,true);
assert.equal(json.status,'student-source-registered-not-live-verified');
assert.match(json.sourcePdfSha256,/^[0-9a-f]{64}$/);
assert.equal(json.sourceOriginalPdfPages[0],93);
assert.equal(json.answerKeyPdfPages[0],316);
assert.equal(json.externalApiSpendUsd,0);
const ids=['q1-i','q1-ii','q1-iii','q1-iv','q1-v','q1-vi','q2-i','q2-ii','q2-iii','q2-iv','q2-v'].map(s=>'g9-ch3-ex3.1-'+s);
assert.deepEqual(json.rows.map(x=>x.id),ids);
assert.equal(new Set(ids).size,11);
const originalKey=['Not a polynomial','Polynomial','Not a polynomial','Polynomial (after simplification for x ≠ 0)','Polynomial','Not a polynomial'];
assert.deepEqual(json.rows.slice(0,6).map(x=>x.answer),originalKey,'2025 textbook official Q1 classifications');
const coeffs=[
 'Coefficient of x²: 2/5; coefficient of x: −3',
 'Coefficient of x²: −2; coefficient of x: −√7',
 'Coefficient of x²: π; coefficient of x: −1',
 'Coefficient of x²: √3; coefficient of x: √2',
 'Coefficient of x²: 1; coefficient of x: −7/2'
];
assert.deepEqual(json.rows.slice(6).map(x=>x.answer),coeffs,'Q2 answer pairs match the source answer appendix');
assert(json.rows[3].steps.at(-1).reason.includes('undefined at x = 0'),'Retain x=0 domain caveat for original Q1(iv)');
let formulaCount=0;
for(const row of json.rows){
 assert.equal(row.translationReview,'pending');
 assert.equal(row.studentPublished,false);
 assert.equal(row.sourceEvidence.printedPage,87);
 assert.equal(row.sourceEvidence.pdfPage,93);
 assert.equal(row.sourceEvidence.answerPdfPage,316);
 assert(row.sourceEnglish&&row.stem&&row.answer,'Complete source and answer '+row.id);
 assert.equal(row.studentRegisteredOnBranch,true,'Student source registration tracked: '+row.id);
 assert(html.includes('data/textbook-exercises/g9-ch3-ex3-1-q1-q2-en.js'),'Source module included in student index');
 assert.equal(row.steps.length,3);
 for(const [name,latex] of [['source',row.sourceMathLatex],['answer',row.answerMathLatex],...row.steps.map((step,i)=>['step '+i,step.mathLatex])]){
  const rendered=katex.renderToString(latex,{throwOnError:true,trust:false,strict:'error',output:'htmlAndMathml'});
  assert(rendered.includes('<math')&&rendered.includes('katex-html'),'Accessible offline math '+row.id+'/'+name);
  formulaCount++;
 }
 for(const step of row.steps){
  assert(step.reason.length>=35,'Clear original explanation '+row.id);
  assert(step.equation.length>=3,'Nonempty mathematical step '+row.id);
 }
}
assert.equal(formulaCount,55);
console.log('PASS 2025 original source pages 93 and answer appendix 316: 11 reviewed English-only Algebra Ex3.1 candidates, Q1 classifications, Q2 coefficients, 55 offline KaTeX renders, 33 step explanations, no student registration; Tamil pending.');
