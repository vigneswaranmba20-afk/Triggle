'use strict';
/* Independent schema, KaTeX, 6-part learning design, trigonometry math, degeneracy, and offline asset checks for Grade 10 Ch6 Trigonometry Concepts. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const katex=require('../assets/vendor/katex/katex.min.js');

const ROOT=path.resolve(__dirname,'../..');
const site=path.join(ROOT,'site');
const read=p=>fs.readFileSync(path.join(site,p),'utf8');

function checkTex(label,latex){
  assert(typeof latex==='string'&&latex.trim().length>0,'Missing LaTeX for '+label);
  const html=katex.renderToString(latex,{displayMode:true,output:'htmlAndMathml',throwOnError:true,trust:false,strict:'error',maxExpand:200,maxSize:20});
  assert(!html.includes('mathcolor="#cc0000"'),'Restricted KaTeX command in '+label+': '+latex);
}

const ctx=vm.createContext({window:{}});
vm.runInContext(read('data/g10-ch6-concepts.js'),ctx,{filename:'g10-ch6-concepts.js',timeout:5000});
vm.runInContext(read('assets/g10-ch6-concepts.js'),ctx,{filename:'g10-ch6-concepts.js',timeout:5000});

const pathData=ctx.window.TRIGGLE_G10_CH6_PATH;
const labs=ctx.window.TriggleG10Ch6Labs;
assert(pathData&&Array.isArray(pathData.stages),'Missing TRIGGLE_G10_CH6_PATH.stages');
assert.equal(pathData.chapterId,'g10-ch6');
assert.equal(pathData.tamilStatus,'draft, editorial review pending','Tamil editorial status must remain honest');
assert.equal(pathData.stages.length,10,'All 10 textbook-ordered Chapter 6 concepts must be authored');

const expectedIds=[
  'g10-ch6-trig-ratios',
  'g10-ch6-quotient-reciprocal',
  'g10-ch6-complementary-angles',
  'g10-ch6-standard-angles',
  'g10-ch6-identity-sin-cos',
  'g10-ch6-identity-sec-cosec',
  'g10-ch6-proving-identities',
  'g10-ch6-angle-elevation',
  'g10-ch6-angle-depression',
  'g10-ch6-combined-elevation-depression'
];
assert.equal(JSON.stringify([...pathData.stages.map(s=>s.id)]),JSON.stringify(expectedIds));

const correctCounts=[0,0,0];
const linkedPracticeIds=new Set();
const class10Text=read('data/class-10.js');

pathData.stages.forEach((stage,idx)=>{
  const prefix=`Concept ${idx+1} (${stage.id})`;
  assert(stage.section&&stage.title?.en&&stage.title?.ta,`${prefix}: missing title/section`);
  assert(stage.firstGlance?.en&&stage.firstGlance?.ta,`${prefix}: missing firstGlance`);
  assert(stage.rule?.en&&stage.rule?.ta,`${prefix}: missing rule`);
  checkTex(`${prefix} main math`,stage.math?.latex);
  assert(stage.visual?.kind==='ch6-lab'&&stage.visual?.id,`${prefix}: missing ch6-lab visual`);
  assert(stage.understand?.intro?.en&&stage.understand?.intro?.ta,`${prefix}: missing understand.intro`);
  assert(Array.isArray(stage.understand?.symbols)&&stage.understand.symbols.length>=2,`${prefix}: need >=2 symbols`);
  stage.understand.symbols.forEach((sym,j)=>{
    checkTex(`${prefix} symbol ${j}`,sym.symbol?.latex);
    assert(sym.en&&sym.ta,`${prefix} symbol ${j}: bilingual meaning required`);
  });
  assert(stage.understand?.watchOut?.en&&stage.understand?.watchOut?.ta,`${prefix}: missing watchOut`);
  assert(Array.isArray(stage.proof?.steps)&&stage.proof.steps.length===2,`${prefix}: expect 2 proof steps`);
  stage.proof.steps.forEach((st,j)=>{
    assert(st.title?.en&&st.title?.ta&&st.reason?.en&&st.reason?.ta,`${prefix} proof step ${j}: bilingual copy required`);
    checkTex(`${prefix} proof step ${j}`,st.math?.latex);
  });
  assert(stage.question?.en&&stage.question?.ta,`${prefix}: missing Try It Yourself question`);
  if(stage.questionMath?.latex)checkTex(`${prefix} questionMath`,stage.questionMath.latex);
  assert(Array.isArray(stage.choices)&&stage.choices.length===3,`${prefix}: must have 3 choices`);
  stage.choices.forEach((ch,j)=>{
    assert(ch.en&&ch.ta,`${prefix} choice ${j}: bilingual text required`);
    if(ch.math?.latex)checkTex(`${prefix} choice ${j}`,ch.math.latex);
  });
  assert([0,1,2].includes(stage.correct),`${prefix}: valid correct index`);
  correctCounts[stage.correct]++;
  assert(stage.hint?.en&&stage.hint?.ta,`${prefix}: missing hint`);
  assert(Array.isArray(stage.incorrectFeedback)&&stage.incorrectFeedback.length===3,`${prefix}: missing incorrectFeedback array`);
  stage.choices.forEach((_,j)=>{
    if(j!==stage.correct)assert(stage.incorrectFeedback[j]?.en&&stage.incorrectFeedback[j]?.ta,`${prefix}: misconception feedback missing for choice ${j}`);
  });
  assert(stage.why?.en&&stage.why?.ta,`${prefix}: missing why`);
  checkTex(`${prefix} whyMath`,stage.whyMath?.latex);
  assert(stage.explainAfterAttempt===true,`${prefix}: must gate Why until attempt`);
  assert(stage.connect?.en&&stage.connect?.ta,`${prefix}: missing connect copy`);
  for(const pid of [stage.practiceId,stage.secondaryPracticeId,stage.tertiaryPracticeId].filter(Boolean)){
    assert(class10Text.includes(`"id":"${pid}"`),`${prefix}: linked practiceId ${pid} missing in class-10.js`);
    linkedPracticeIds.add(pid);
  }
});

assert.equal(JSON.stringify(correctCounts),JSON.stringify([3,4,3]),'Answer indices must stay balanced [3,4,3], got '+correctCounts);
assert(linkedPracticeIds.size>=12,'Concepts must link broadly across Ch6 existing exercises (linked '+linkedPracticeIds.size+')');

/* Independent trigonometry math & degeneracy checks across all labs */
const close=(a,b,eps=1e-7)=>assert(Math.abs(a-b)<eps,`${a} vs ${b}`);
const M=labs.math;

// Similarity scale invariance
const r1=M.trigRatios(37,0.8),r2=M.trigRatios(37,1.4);
assert.equal(r1.valid,true);
close(r1.sin,r2.sin);close(r1.cos,r2.cos);close(r1.tan,r2.tan);
close(r1.sin*r1.cosec,1);close(r1.cos*r1.sec,1);close(r1.tan*r1.cot,1);
assert.equal(M.trigRatios(0,1).valid,false);
assert.equal(M.trigRatios(90,1).valid,false);

// Complementary ratios
const cm=M.complementary(38);
close(cm.sinT,cm.cosC);close(cm.cosT,cm.sinC);close(cm.tanT,cm.cotC);

// Standard angles exact table + undefined boundaries
const st0=M.standardAngle(0),st30=M.standardAngle(30),st45=M.standardAngle(45),st60=M.standardAngle(60),st90=M.standardAngle(90);
assert.equal(st0.cot,'undefined');assert.equal(st0.cosec,'undefined');
assert.equal(st90.tan,'undefined');assert.equal(st90.sec,'undefined');
close(st30.sVal,0.5);close(st45.tVal,1);close(st60.tVal,Math.sqrt(3));

// Three Pythagorean identities across range
for(const deg of [12,30,45,60,78]){
  const id=M.identities(deg);
  assert.equal(id.valid,true);
  close(id.id1,1);
  close(id.id2Left,id.id2Right);
  close(id.id3Left,id.id3Right);
}
assert.equal(M.identities(0).valid,false);
assert.equal(M.identities(90).valid,false);

// Elevation & depression (including eye height & trap check)
const ev=M.elevation(5,5,1.8);
close(ev.thetaDeg,45);close(ev.totalHeight,6.8);
const dp=M.depression(50*Math.sqrt(3),30);
close(dp.dist,150);close(dp.wrongWallDist,50);

// Gemini Neon AUD05-01: at 45°, the complementary wall angle equals the horizon angle.
// Never show a mathematically false inequality; the reference line, not the number, is wrong.
const depressionLabSource=read('assets/g10-ch6-concepts.js');
assert(!depressionLabSource.includes('≠ ${angle}°!'),'AUD05-01: false wall/horizon inequality must not return');
assert(depressionLabSource.includes('Wall angle = ${90-angle}° (from vertical)'),
  'AUD05-01: distinguish the vertical wall angle from the horizontal depression angle');
assert(depressionLabSource.includes('Coincides at }45^'),
  'AUD05-01: 45-degree numerical coincidence must be explained');
for(const angle of [20,30,40,45,50,60,70]){
  const complement=90-angle;
  assert.equal(complement===angle,angle===45,'Complement equals depression only at 45 degrees');
}

// AUD05-01: every Discover trigonometric ratio must identify its angle.
for(const fragment of [
  '\\\\operatorname{cosec} ${focusDeg}^\\\\circ=',
  '\\\\sec ${focusDeg}^\\\\circ=',
  '\\\\sec ${theta}^\\\\circ\\\\cdot\\\\cos ${theta}^\\\\circ=1',
  '\\\\operatorname{cosec} ${theta}^\\\\circ\\\\cdot\\\\sin ${theta}^\\\\circ=1',
  '\\\\cot\\\\theta+\\\\tan\\\\theta='
]){
  assert(depressionLabSource.includes(fragment),'AUD05-01 missing angle argument: '+fragment);
}

// Two-triangle heights & boats
const dh=M.combinedTwoTriangles('deck-hill',40,60,30);
close(dh.x,40*Math.sqrt(3));close(dh.total,160);
const ts=M.combinedTwoTriangles('two-same',1800,60,30);
close(ts.gap,1800*(Math.sqrt(3)-1/Math.sqrt(3)));
assert.equal(M.combinedTwoTriangles('two-same',100,30,60).valid,false,'Near angle <= far angle rejected on same side');
const to=M.combinedTwoTriangles('two-opposite',200,60,45);
close(to.gap,200*(1+1/Math.sqrt(3)));

/* HTML & Service Worker offline asset integrity */
const html=read('index.html');
const sw=read('service-worker.js');
for(const asset of ['data/g10-ch6-concepts.js','assets/g10-ch6-concepts.js']){
  assert.equal(html.split(asset).length-1,1,'index.html must include '+asset+' once');
  assert(sw.includes("'./"+asset+"'"),'service-worker.js must precache '+asset);
}
assert.match(sw,/const CACHE='triggle-[^']+-gpfola-v2-fa50e19c-g9ex32'/,'Preserve SW cache version check');

console.log('PASS Grade 10 Chapter 6 Trigonometry Concepts: 10 bilingual 6-part stages, KaTeX, identities, heights/distances & offline checks');
