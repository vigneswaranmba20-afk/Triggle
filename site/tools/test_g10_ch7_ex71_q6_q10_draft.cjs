'use strict';
/* Draft-stage independent math oracle and source-passport regression — Grade 10 Ex 7.1 Q6–Q10.
 * Neon Phase 1 blind source and math audit passed; Phase 2 UI review is still a required release gate.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const manifest=JSON.parse(read('docs/curriculum/grade-10/g10-ch7-ex7-1-q6-q10-passports-20261122.json'));
const mod='site/data/textbook-exercises/g10-ch7-ex7-1-q6-q10-en.js';
const script='./data/textbook-exercises/g10-ch7-ex7-1-q6-q10-en.js';
const index=read('site/index.html'),sw=read('site/service-worker.js');
assert.equal((index.match(/g10-ch7-ex7-1-q6-q10-en\.js/g)||[]).length,1,'new 2025 exercise module must load exactly once');
for(const asset of [script,'./assets/grade10-ch7/ex7-1-q10.svg'])assert.ok(sw.includes(asset),'offline cache missing '+asset);
const scriptList=[...index.matchAll(/<script\s+src=["']([^"']+)["']/g)].map(m=>m[1].split('?')[0]);
for(const predecessor of ['./data/class-10.js','./data/curriculum.js','./data/textbook-exercises/g10-ch7-ex7-1-q1-q5-en.js'])
 assert.ok(scriptList.indexOf(predecessor)>=0&&scriptList.indexOf(predecessor)<scriptList.indexOf(script),'Q6-Q10 must load after '+predecessor);
assert.ok(scriptList.indexOf(script)<scriptList.indexOf('./assets/app.js'),'records before UI renderer');
const sandbox={window:{},console};vm.createContext(sandbox);
for(const p of ['site/data/class-10.js','site/data/curriculum.js','site/data/textbook-exercises/g10-ch7-ex7-1-q1-q5-en.js',mod,'site/data/problem-difficulty.js'])
 vm.runInContext(read(p),sandbox,{filename:p,timeout:15000});
const g=sandbox.window.TRIGGLE_CLASSES[10],ch=sandbox.window.TRIGGLE_CURRICULUM.grades.find(x=>x.grade===10).chapters.find(x=>x.number===7);
assert.equal(new Set(g.items.map(x=>x.id)).size,g.items.length,'all grade 10 IDs unique');
const ids=[6,7,8,9,10].map(n=>'c10-7-ex7-1-q'+n);
assert.deepEqual(manifest.records.map(r=>r.id),ids);
assert.equal(g.items.filter(x=>x.chapter==='7'&&x.exercise==='7.1'&&x.kind==='textbook').length,10,'all ten Ex 7.1 questions appear once');
assert.equal(manifest.source.questionPageImagesInspected,true);
assert.equal(manifest.source.answerKeyPageImagesInspected,true);
assert.equal(manifest.source.q10FigureInspected,true);
assert.equal(manifest.source.independentBlindAuditCompleted,true,'Phase 1 independently verified after frozen Neon source addendum');
assert.equal(manifest.independentAudit.phase1.status,'PASS','require 5/5 blind original source/maths pass');
assert.equal(manifest.independentAudit.phase1.sourceUnblockAddendum.sha256,'54c1ffb7b66d0d721c5885953564c41de2002c010b6ce13a232c3553f6924745','immutable Phase 1 addendum hash');
assert.equal(manifest.independentAudit.phase1.sourceUnblockAddendum.mathematicalAnswersVerified,5);
assert.equal(manifest.independentAudit.phase1.sourceUnblockAddendum.bilingualSourceRecordsVerified,5);
assert.equal(manifest.independentAudit.phase1.sourceUnblockAddendum.originalQ10FigureVerified,1);
assert.equal(manifest.independentAudit.phase2.neonStudentFacingReviewCompleted,true,'Neon Phase 2 reviewed source and prior screenshots');
assert.equal(manifest.independentAudit.phase2.status,'CONDITIONAL_GO_REMEDIATION_IN_PROGRESS','High-priority remediations must be completed before release');
assert.equal(manifest.independentAudit.phase2.reportSha256,'bd84ad87f1593d7ab4d1539710a89ba4876071005e760628df8b31c06b8c0079','preserve original Neon Phase 2 report hash');
assert.equal(manifest.independentAudit.phase2.remediation.fullCI,'PENDING','do not falsely claim final CI clearance');
assert.equal(manifest.releaseGates.merged,false,'never mark draft as released');
for(const p of manifest.records){
 const e=g.items.find(x=>x.id===p.id);assert.ok(e,'missing '+p.id);
 assert.equal(e.q.en,p.englishQuestion,'exact 2025 English source text for '+p.id);
 assert.equal(e.sourceFidelity.status,'page-visual-checked');
 assert.equal(e.sourceFidelity.sourcePdfPage.en,288);
 assert.equal(e.sourceFidelity.sourcePdfPage.ta,296);
 assert.equal(e.edition,'2025');assert.equal(e.translationReview,'pending');
 assert.ok(!e.q.ta,'unapproved Tamil lesson text must not be invented');
 assert.ok(e.steps.length>=4,'full worked steps '+p.id);
 for(const step of e.steps){
  assert.ok(step.en.length>=28&&step.eq&&step.math?.latex&&step.math?.fallback,'accessible worked line in '+p.id);
 }
 assert.ok(e.answerMath?.latex&&e.answerMath?.fallback,'typeset final answer for '+p.id);
 // Site KaTeX cannot reliably display Unicode ₹. Render Rs. in math and preserve ₹ in plain answer.
 const formulas=[e.answerMath.latex,...e.steps.map(x=>x.math.latex)];
 assert.ok(formulas.every(x=>!x.includes('₹')),'Safe KaTeX currency syntax '+p.id);
 const katex=require('../assets/vendor/katex/katex.min.js');
 for(const formula of formulas){
  assert.doesNotThrow(()=>katex.renderToString(formula,{throwOnError:true,strict:'error'}),'All maths parses in KaTeX '+p.id);
 }
 if(p.id.endsWith('q9')||p.id.endsWith('q10')){
  assert.ok(e.answerMath.latex.includes('\\text{Rs.}'),'Student-readable rupee abbreviation '+p.id);
  assert.ok(e.answerMath.fallback.includes('₹')&&e.answer.includes('₹'),'Keep ₹ in accessible plain text '+p.id);
 }
 assert.ok(ch.textbookQuestionIds.includes(p.id),'chapter navigation includes '+p.id);
 const diff=sandbox.window.TriggleDifficulty.get(e);
 assert.ok(diff&&['easy','medium','difficult'].includes(diff.level)&&diff.grade===10,'difficulty record for '+p.id);
}
const q7=g.items.find(x=>x.id===ids[1]);assert.ok(q7.answerMath.latex.includes('\\sqrt5'),'Q7 answer must preserve square-root sign');
const q10=g.items.find(x=>x.id===ids[4]);assert.ok(q10.figureSrc.endsWith('/ex7-1-q10.svg'),'lampshade source figure aid');
assert.ok(q10.figureAlt.en.length>90);
assert.match(q10.steps.at(-1).en,/one-paise difference/,'teach 2025 textbook rounding caveat');
const svg=read('site/'+q10.figureSrc);
assert.match(svg,/<svg\s/);assert.match(svg,/<title\b/);assert.match(svg,/<desc\b/);
assert.ok(!/<script\b/i.test(svg),'no executable script in SVG');
assert.match(svg,/id="upper-radius" d="M300 122 H394"/,'Top 6cm radius must visibly span centre to upper rim');
assert.match(svg,/id="lower-radius" d="M300 307 H490"/,'Bottom 12cm radius must visibly span centre to lower rim');
assert.match(svg,/id="vertical-height" d="M300 142 V297"/,'Vertical height axis must be explicit');
assert.match(svg,/A190 38 0 0 0 490 307/,'Front bottom curve must share the same ellipse as opening');
assert.match(svg,/A190 38 0 0 1 490 307/,'Back bottom curve must share the same ellipse as opening');
assert.match(svg,/ℓ = 10 cm/,'Slant height must be visible, not just in accessibility text');
assert.match(svg,/<rect x="316" y="201" width="100"/,'The height label must not reach the right frustum wall');
assert.doesNotMatch(svg,/x="318" y="186" width="140"/,'Old label-wall collision must never return');
const pi=22/7;const close=(a,b)=>Math.abs(a-b)<1e-10;
const slant6=Math.hypot(5,12);assert.equal(slant6,13);assert.ok(close(5720/(pi*5*slant6),28));
const ratio=(Math.sqrt(10))/(9*Math.sqrt(2));assert.ok(close(ratio,Math.sqrt(5)/9));
assert.equal(((1.25)**2-1)*100,56.25);
// AUD16-02: exact fractional derivation must be present in rendered maths and fallback.
const audQ8=g.items.find(x=>x.id==='c10-7-ex7-1-q8');
const audQ9=g.items.find(x=>x.id==='c10-7-ex7-1-q9');
assert.ok(audQ8.steps[1].math.latex.includes('\\frac54'));
assert.ok(audQ8.steps[2].math.latex.includes('\\frac{25}{16}'));
assert.ok(audQ8.steps[3].math.latex.includes('\\frac9{16}'));
assert.ok(audQ8.steps[3].math.fallback.includes('9/16'));
assert.equal((25/16-1)*100,56.25);
assert.ok(audQ9.steps[1].math.latex.includes('\\pi(3R^2+r^2)'));
const area9=2*pi*14**2+2*pi*10**2+pi*(14**2-10**2);
assert.ok(close(area9,688*pi));assert.ok(close(area9*0.14,302.72));
const slant10=Math.hypot(8,12-6);assert.equal(slant10,10);
const area10=pi*(12+6)*slant10+pi*6**2;
assert.ok(close(area10,216*pi));
const areaRounded=Number(area10.toFixed(2));assert.equal(areaRounded,678.86);
assert.equal(2*areaRounded,1357.72);
assert.equal(Number((2*area10).toFixed(2)),1357.71,'clarify one-paise textbook rounding difference');
// Mutation traps: a wrong formula or dimension must be distinguishable by oracle.
assert.ok(!close(5720/(pi*5*(slant6+5)),28),'wrong cap slant must fail');
assert.ok(!close(5/9,ratio),'missing radical must fail');
assert.notEqual((1.25-1)*100,56.25,'linear sphere area scaling must fail');
assert.ok(!close((area9-pi*(14**2-10**2))*0.14,302.72),'omitted vessel rim must fail');
assert.ok(!close((area10+pi*12**2)*2,1357.72),'painting bottom must fail');
console.log('PASS G10 Ch7 Ex7.1 Q6–Q10 draft source/Math: 5 records, 10/10 chapter questions, exact radical/rounding, page-image evidence, accessibility, offline cache, 5 mutations. Neon Phase 1 PASS; Phase 2 CONDITIONAL GO with remediation gates still open.');
