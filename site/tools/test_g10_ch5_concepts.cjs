'use strict';
/* Independent schema, KaTeX, 6-part learning design, coordinate geometry math, and degeneracy checks for Grade 10 Ch5 Coordinate Geometry Concepts. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const katex=require('../assets/vendor/katex/katex.min.js');
const {loadRuntime}=require('./curriculum_bulk.cjs');

const ROOT=path.resolve(__dirname,'../..');
const site=path.join(ROOT,'site');
const read=p=>fs.readFileSync(path.join(site,p),'utf8');

function checkTex(label,latex){
  assert(typeof latex==='string'&&latex.trim().length>0,'Missing LaTeX for '+label);
  const html=katex.renderToString(latex,{displayMode:true,output:'htmlAndMathml',throwOnError:true,trust:false,strict:'error',maxExpand:200,maxSize:20});
  assert(!html.includes('mathcolor="#cc0000"'),'Restricted KaTeX command in '+label+': '+latex);
}

const ctx=vm.createContext({window:{}});
vm.runInContext(read('data/g10-ch5-concepts.js'),ctx,{filename:'g10-ch5-concepts.js',timeout:5000});
vm.runInContext(read('assets/g10-ch5-concepts.js'),ctx,{filename:'g10-ch5-concepts.js',timeout:5000});

const pathData=ctx.window.TRIGGLE_G10_CH5_PATH;
const labs=ctx.window.TriggleG10Ch5Labs;
assert(pathData&&Array.isArray(pathData.stages),'Missing TRIGGLE_G10_CH5_PATH.stages');
assert.equal(pathData.chapterId,'g10-ch5');
assert.equal(pathData.tamilStatus,'draft, editorial review pending','Tamil editorial status must remain honest');
assert.equal(pathData.stages.length,12,'All 12 textbook-ordered Chapter 5 concepts must be authored');

const expectedIds=[
  'g10-ch5-distance-midpoint-centroid',
  'g10-ch5-area-triangle',
  'g10-ch5-collinearity',
  'g10-ch5-area-quadrilateral',
  'g10-ch5-inclination-slope',
  'g10-ch5-parallel-perpendicular-slopes',
  'g10-ch5-axes-and-parallel-lines',
  'g10-ch5-slope-intercept-form',
  'g10-ch5-point-slope-and-two-point',
  'g10-ch5-intercept-form',
  'g10-ch5-general-form',
  'g10-ch5-parallel-perpendicular-general'
];
assert.deepEqual([...pathData.stages.map(s=>s.id)],expectedIds,'Preserve exact textbook order of all 12 Chapter 5 concepts');

const correctCounts=[0,0,0];
const visualIds=new Set();
for(const stage of pathData.stages){
  assert(stage.math?.latex&&stage.math?.fallback,stage.id+' needs structured rule math');
  checkTex(stage.id+'.math',stage.math.latex);
  if(stage.questionMath){assert(stage.questionMath.fallback);checkTex(stage.id+'.questionMath',stage.questionMath.latex);}
  if(stage.whyMath){assert(stage.whyMath.fallback);checkTex(stage.id+'.whyMath',stage.whyMath.latex);}

  for(const lang of ['en','ta']){
    for(const field of ['title','firstGlance','rule','question','hint','why','connect']){
      assert(stage[field]?.[lang]?.trim(),'Missing '+stage.id+'.'+field+'.'+lang);
    }
    assert(stage.understand?.intro?.[lang]?.trim(),'Missing understand.intro for '+stage.id+'.'+lang);
    assert(stage.understand?.watchOut?.[lang]?.trim(),'Missing understand.watchOut for '+stage.id+'.'+lang);
    assert(Array.isArray(stage.understand?.symbols)&&stage.understand.symbols.length>=2,'Need >=2 symbol breakdowns for '+stage.id);
    for(const sym of stage.understand.symbols){
      assert(sym.symbol?.fallback?.trim(),stage.id+' symbol fallback');
      if(sym.symbol?.latex)checkTex(stage.id+'.symbol',sym.symbol.latex);
      assert(sym[lang]?.trim(),stage.id+' symbol meaning.'+lang);
    }
    assert(Array.isArray(stage.proof?.steps)&&stage.proof.steps.length>=2,'Need >=2 visual proof steps for '+stage.id);
    for(const st of stage.proof.steps){
      assert(st.title?.[lang]?.trim(),stage.id+' proof title.'+lang);
      assert(st.reason?.[lang]?.trim(),stage.id+' proof reason.'+lang);
      if(st.math?.latex){assert(st.math.fallback);checkTex(stage.id+'.proof',st.math.latex);}
    }
  }

  assert.equal(stage.visual?.kind,'ch5-lab',stage.id+' must use ch5-lab');
  assert(labs.ids.includes(stage.visual.id),stage.id+' lab ID registered in TriggleG10Ch5Labs');
  visualIds.add(stage.visual.id);
  assert.equal(stage.explainAfterAttempt,true,stage.id+' explainAfterAttempt');
  assert.equal(stage.choices.length,3,stage.id+' 3 choices');
  assert([0,1,2].includes(stage.correct),stage.id+' valid correct index');
  correctCounts[stage.correct]++;
  assert.equal(stage.incorrectFeedback.length,3,stage.id+' aligned incorrectFeedback array');
  stage.choices.forEach((ch,idx)=>{
    assert(ch.en?.trim()&&ch.ta?.trim(),stage.id+' choice '+idx+' bilingual');
    if(idx===stage.correct)assert.equal(stage.incorrectFeedback[idx],null,stage.id+' null feedback at correct index');
    else assert(stage.incorrectFeedback[idx]?.en?.trim()&&stage.incorrectFeedback[idx]?.ta?.trim(),stage.id+' distractor feedback '+idx);
  });
}
assert.equal(visualIds.size,12,'All 12 concepts have distinct interactive lab IDs');
assert.deepEqual(correctCounts,[4,4,4],'Correct answers remain strictly balanced across options 0, 1, 2');

const runtime=loadRuntime();
const g10Ids=new Set(runtime.classes[10].items.map(i=>i.id));
assert(g10Ids.has('c10-5-5-practice-20'),'Expected existing Ch5 practice ID');
assert.equal(pathData.stages[0].practiceId,'c10-5-5-practice-20');

/* Independent coordinate geometry & degeneracy checks across all 12 concepts */
const close=(a,b,eps=1e-7)=>assert(Math.abs(a-b)<eps,`${a} vs ${b}`);
const M=labs.math;

// 1: Distance, midpoint, section & centroid
close(M.distance([2,4],[8,10]),Math.hypot(6,6));
const mp=M.midpoint([2,4],[8,10]);
close(mp[0],5);close(mp[1],7);
const sec=M.sectionPoint([0,0],[4,4],1,3);
close(sec[0],1);close(sec[1],1);
assert.equal(M.sectionPoint([0,0],[4,4],1,-1),null,'Zero ratio sum rejected');
const cen=M.centroid([3,-1],[-2,7],[5,3]);
close(cen[0],2);close(cen[1],3);

// 2 & 3: Area of triangle + CCW/CW + collinearity
const triCCW=M.triangleArea([1,-1],[-4,6],[-3,-5]);
close(triCCW.area,24);
assert.equal(triCCW.isCCW,true);
const triRev=M.triangleArea([1,-1],[-3,-5],[-4,6]);
close(triRev.area,24);
assert.equal(triRev.isCCW,false);
const col=M.triangleArea([2,3],[4,0],[6,-3]);
assert.equal(col.collinear,true);close(col.area,0);

// 4: Quadrilateral area + self-intersection check
const qGood=M.quadArea([-4,-2],[-3,-5],[3,-2],[2,3]);
close(qGood.area,28);assert.equal(qGood.selfIntersecting,false);
const qBad=M.quadArea([-3,-2],[3,-2],[-2,2],[2,3]);
assert.equal(qBad.selfIntersecting,true);

// 5 & 6: Inclination, slope, parallel & perpendicular (including vertical/horizontal)
const sPos=M.slopeBetween([-6,1],[-3,2]);
assert.equal(sPos.defined,true);close(sPos.m,1/3);
const sVert=M.slopeBetween([5,-2],[5,4]);
assert.equal(sVert.defined,false);assert.equal(sVert.angleDeg,90);
assert.equal(M.relationSlopes(2/3,-3/2),'perpendicular');
assert.equal(M.relationSlopes(2/3,2/3),'parallel');
assert.equal(M.relationSlopes(0,Infinity),'perpendicular');
assert.equal(M.relationSlopes(Infinity,Infinity),'parallel');

// 11 & 12: General form & families
const lf=M.lineFromGeneral(8,-7,6);
assert.equal(lf.valid,true);close(lf.m,8/7);close(lf.yInt,6/7);
const lv=M.lineFromGeneral(3,0,-9);
assert.equal(lv.vertical,true);close(lv.xInt,3);
assert.equal(M.lineFromGeneral(0,0,5).valid,false);
assert.equal(M.generalRelation(3,-4,5,4,3,-18).kind,'perpendicular');
assert.equal(M.generalRelation(3,-4,5,6,-8,1).kind,'parallel');
assert.equal(M.generalRelation(3,-4,5,6,-8,10).kind,'coincident');

/* HTML & Service Worker offline asset integrity */
const html=read('index.html');
const sw=read('service-worker.js');
for(const asset of ['data/g10-ch5-concepts.js','assets/g10-ch5-concepts.js']){
  assert.equal(html.split(asset).length-1,1,'index.html must include '+asset+' once');
  assert(sw.includes("'./"+asset+"'"),'service-worker.js must precache '+asset);
}
assert.match(sw,/const CACHE='[^']*-g9ex32-aud14-02-tables-20261122-q46-20261122'/,'Preserve G9 Ex3.2 SW revision and require audited Ex6.4 offline cache update');

console.log('PASS Grade 10 Chapter 5 Coordinate Geometry Concepts: 12 bilingual 6-part stages, KaTeX, coordinate math, degeneracy & offline checks');
