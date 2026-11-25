'use strict';
/* Independent schema, KaTeX, 6-part learning design, mensuration math, degeneracy, and offline asset checks for Grade 10 Ch7 Mensuration Concepts. */
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
vm.runInContext(read('data/g10-ch7-concepts.js'),ctx,{filename:'g10-ch7-concepts.js',timeout:5000});
vm.runInContext(read('assets/g10-ch7-concepts.js'),ctx,{filename:'g10-ch7-concepts.js',timeout:5000});

const pathData=ctx.window.TRIGGLE_G10_CH7_PATH;
const labs=ctx.window.TriggleG10Ch7Labs;
assert(pathData&&Array.isArray(pathData.stages),'Missing TRIGGLE_G10_CH7_PATH.stages');
assert.equal(pathData.chapterId,'g10-ch7');
assert.equal(pathData.tamilStatus,'draft, editorial review pending','Tamil editorial status must remain honest');
assert.equal(pathData.stages.length,9,'All 9 textbook-ordered Chapter 7 concepts must be authored');

const expectedIds=[
  'g10-ch7-solids-and-units',
  'g10-ch7-cylinder-surface-area',
  'g10-ch7-cone-slant-surface',
  'g10-ch7-sphere-hemisphere-surface',
  'g10-ch7-frustum-surface-volume',
  'g10-ch7-volumes-cylinder-cone',
  'g10-ch7-volumes-sphere-hemisphere',
  'g10-ch7-combined-solids',
  'g10-ch7-conversion-volume-conservation'
];
assert.equal(JSON.stringify([...pathData.stages.map(s=>s.id)]),JSON.stringify(expectedIds));

const correctCounts=[0,0,0];
const linkedPracticeIds=new Set();
const {loadRuntime}=require('./curriculum_bulk.cjs');
const class10Ids=new Set(loadRuntime().classes[10].items.map(i=>i.id));

pathData.stages.forEach((stage,idx)=>{
  const prefix=`Concept ${idx+1} (${stage.id})`;
  assert(stage.section&&stage.title?.en&&stage.title?.ta,`${prefix}: missing title/section`);
  assert(stage.firstGlance?.en&&stage.firstGlance?.ta,`${prefix}: missing firstGlance`);
  assert(stage.rule?.en&&stage.rule?.ta,`${prefix}: missing rule`);
  checkTex(`${prefix} main math`,stage.math?.latex);
  assert(stage.visual?.kind==='ch7-lab'&&stage.visual?.id,`${prefix}: missing ch7-lab visual`);
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
    assert(class10Ids.has(pid),`${prefix}: linked practiceId ${pid} missing in Class 10 runtime`);
    linkedPracticeIds.add(pid);
  }
});

assert.equal(JSON.stringify(correctCounts),JSON.stringify([3,3,3]),'Answer indices must stay balanced [3,3,3], got '+correctCounts);
assert(linkedPracticeIds.size>=18,'Concepts must link broadly across Ch7 existing exercises (linked '+linkedPracticeIds.size+')');

/* Independent mensuration math & degeneracy checks across all formulas */
const close=(a,b,eps=1e-6)=>assert(Math.abs(a-b)<eps,`${a} vs ${b}`);
const M=labs.math;

// Unit conversions
const u=M.unitConvert(2.5);
assert.equal(u.valid,true);close(u.litres,2500);close(u.cm3,2500000);
assert.equal(M.unitConvert(0).valid,false);

// Solid & hollow cylinder
const cyl=M.cylinder(14,20);
close(cyl.csa,1760);close(cyl.tsa,2992);
const hcyl=M.hollowCylinder(8,6,25);
close(hcyl.csa,2200);close(hcyl.thickness,2);
assert.equal(M.hollowCylinder(5,5,10).valid,false,'Hollow cylinder R <= r rejected');

// Cone & 1:3 volume ratio
const cn=M.cone(7,24);
close(cn.l,25);close(cn.csa,550);close(cn.tsa,704);
const cylSame=M.cylinder(7,24);
close(cylSame.vol,3*cn.vol);
// Scaling radius by 2 quadruples volume
close(M.cone(14,24).vol,4*cn.vol);

// Sphere, hemisphere, hollow hemisphere
const sp=M.sphere(3.5);
close(sp.sa,154);
const hm=M.hemisphere(7);
close(hm.csa,2*hm.tsa/3);
const hhm=M.hollowHemisphere(5,3);
close(hhm.tsa,264);
// Two cones (h=2r) equal one sphere
close(M.sphere(6).vol,2*M.cone(6,12).vol);
// Scaling radius by 2 multiplies sphere volume by 8
close(M.sphere(12).vol,8*M.sphere(6).vol);

// Frustum similarity & volume identity
const fr=M.frustum(28,7,45);
close(fr.vol,48510);
close(fr.vol,fr.volDiff);
const fr2=M.frustum(5,2,4);
close(fr2.l,5);close(fr2.csa,110);
assert.equal(M.frustum(4,5,6).valid,false,'Frustum R <= r rejected');

// Combined solids
const toy=M.combinedSolid('toy-cyl-hemi',6,19);
close(toy.tsa,1056);
const cav=M.combinedSolid('cavity-cyl-cone',0.7,2.4);
close(cav.tsa,17.6);
close(cav.vol,(2/3)*M.cylinder(0.7,2.4).vol);

// Volume conservation & pipe flow
const rc=M.recastSphereToCylinder(12,8);
close(rc.H,36);
const rc2=M.recastSphereToCylinder(6,2);
close(rc2.nSpheres,27);
const pf=M.pipeFlow(0.07,15000,50*44,0.21);
close(pf.timeH,2);

/* HTML & Service Worker offline asset integrity */
const html=read('index.html');
const sw=read('service-worker.js');
for(const asset of ['data/g10-ch7-concepts.js','assets/g10-ch7-concepts.js']){
  assert.equal(html.split(asset).length-1,1,'index.html must include '+asset+' once');
  assert(sw.includes("'./"+asset+"'"),'service-worker.js must precache '+asset);
}

console.log('PASS Grade 10 Chapter 7 Mensuration Concepts: 9 bilingual 6-part stages, KaTeX, formulas, conservation & degeneracy checks');
