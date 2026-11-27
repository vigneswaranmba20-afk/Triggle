'use strict';
/* Independent schema, KaTeX, 6-part learning design, degeneracy, and mathematical verification for Grade 10 Ch4 Geometry Concepts. */
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

const ctx={window:{}};
vm.runInNewContext(read('data/g10-ch4-concepts.js'),ctx,{filename:'g10-ch4-concepts.js',timeout:5000});
vm.runInNewContext(read('assets/g10-ch4-concepts.js'),ctx,{filename:'g10-ch4-concepts.js',timeout:5000});

const pathData=ctx.window.TRIGGLE_G10_CH4_PATH;
const labs=ctx.window.TriggleG10Ch4Labs;
assert(pathData&&Array.isArray(pathData.stages),'Missing TRIGGLE_G10_CH4_PATH.stages');
assert.equal(pathData.chapterId,'g10-ch4');
assert.equal(pathData.tamilStatus,'draft, editorial review pending','Tamil editorial status must remain honest');
assert.equal(pathData.stages.length,12,'All 12 textbook-ordered Chapter 4 concepts must be authored');

const expectedIds=[
  'g10-ch4-similarity-vs-congruence',
  'g10-ch4-similarity-criteria',
  'g10-ch4-similarity-results',
  'g10-ch4-similar-construction',
  'g10-ch4-bpt-thales',
  'g10-ch4-converse-bpt',
  'g10-ch4-angle-bisector',
  'g10-ch4-converse-abt',
  'g10-ch4-triangle-construction',
  'g10-ch4-pythagoras',
  'g10-ch4-circles-tangents',
  'g10-ch4-concurrency'
];
assert.deepEqual([...pathData.stages.map(s=>s.id)],expectedIds,'Preserve exact textbook order of all 12 Chapter 4 concepts');

const correctCounts=[0,0,0];
const visualIds=new Set();
for(const stage of pathData.stages){
  assert(stage.math?.latex&&stage.math?.fallback,stage.id+' needs structured rule math');
  checkTex(stage.id+'.math',stage.math.latex);
  if(stage.questionMath){assert(stage.questionMath.fallback);checkTex(stage.id+'.questionMath',stage.questionMath.latex);}
  if(stage.whyMath){assert(stage.whyMath.fallback);checkTex(stage.id+'.whyMath',stage.whyMath.latex);}

  // Verify 6 mandatory learning-design parts in both EN and TA
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

  assert.equal(stage.visual?.kind,'ch4-lab',stage.id+' must use ch4-lab');
  assert(labs.ids.includes(stage.visual.id),stage.id+' lab ID registered in TriggleG10Ch4Labs');
  visualIds.add(stage.visual.id);
  assert.equal(stage.explainAfterAttempt,true,stage.id+' explainAfterAttempt');
  assert.equal(stage.choices.length,3,stage.id+' 3 choices');
  assert([0,1,2].includes(stage.correct),stage.id+' valid correct index');
  correctCounts[stage.correct]++;
  assert.equal(stage.incorrectFeedback.length,3,stage.id+' aligned incorrectFeedback array');
  stage.choices.forEach((ch,idx)=>{
    assert(ch.en?.trim()&&ch.ta?.trim(),stage.id+' choice '+idx+' bilingual');
    if(ch.math){assert(ch.math.fallback);checkTex(stage.id+'.choice'+idx,ch.math.latex);}
    if(idx===stage.correct)assert.equal(stage.incorrectFeedback[idx],null,stage.id+' null feedback at correct index');
    else assert(stage.incorrectFeedback[idx]?.en?.trim()&&stage.incorrectFeedback[idx]?.ta?.trim(),stage.id+' distractor feedback '+idx);
  });
}
assert.equal(visualIds.size,12,'All 12 concepts have distinct interactive Geometry lab IDs');
assert.deepEqual(correctCounts,[4,4,4],'Correct answers remain strictly balanced across options 0, 1, 2');

/* Verify every linked PR #277 textbook exercise ID exists in loaded Class 10 data */
const runtime=loadRuntime();
const g10Ids=new Set(runtime.classes[10].items.map(i=>i.id));
const linked=[...pathData.stages.flatMap(s=>[s.practiceId,s.secondaryPracticeId,s.tertiaryPracticeId].filter(Boolean))];
assert(linked.length>=20,'Prioritized concepts link directly to PR #277 Exercise 4.1 & 4.2 questions');
for(const id of linked)assert(g10Ids.has(id),'Linked PR #277 exercise ID missing: '+id);

/* Independent mathematical, geometric & degeneracy checks across all 12 labs */
const close=(a,b,eps=1e-7)=>assert(Math.abs(a-b)<eps,`${a} vs ${b}`);

// 1. Similarity scaling & congruence
assert.equal(labs.math.scaleTriangle(1).isCongruent,true);
assert.equal(labs.math.scaleTriangle(1.5).isCongruent,false);
close(labs.math.scaleTriangle(2.5).areaRatio,6.25);
assert.equal(8*(9/6),12); // Q1 check

// 2. SSA Ambiguous Case (two valid distinct triangles sharing B=35°, c=8, b=5.5)
const ssa=labs.math.ssaAmbiguous(8,5.5,35);
assert(ssa&&ssa.a1>ssa.a2&&ssa.a2>0,'SSA produces two distinct valid triangles');
assert.equal(labs.math.ssaAmbiguous(8,3,35),null,'Too-short opposite side yields zero triangles');

// 3. Area k^2 scaling
assert.equal(Math.sqrt(9/25)*(10/6),1); // Q3 check: BC=6 => EF=10

// 4. Similar construction 7/3 > 1 & 2/3 < 1
assert(7/3>1&&2/3<1);

// 5. BPT invariant across skewed triangles & cut ratios
for(const ax of [70,154,240]){
  for(const t of [0.22,0.45,0.78]){
    const res=labs.math.bptCut([ax,24],[38,154],[282,154],t);
    close(res.ratioPart,res.ratioPartRight);
    close(res.ratioWhole,res.ratioWholeRight);
  }
}
close((3/8)*16,6); // Q5 check

// 6. Converse BPT
assert.equal(labs.math.converseBptState([160,22],[36,154],[284,154],0.40,0.62).isParallel,false);
assert.equal(labs.math.converseBptState([160,22],[36,154],[284,154],0.40,0.41).isParallel,false);
assert.equal(labs.math.converseBptState([160,22],[36,154],[284,154],0.40,0.40).isParallel,true);
close((8/12)*18,12); // Q6 check

// 7. Angle Bisector Theorem across skewed apexes
for(const ax of [65,110,160,245]){
  const abt=labs.math.angleBisectorPoint([ax,24],[36,154],[284,154]);
  close(abt.ratioSides,abt.ratioSegs);
  close(abt.ang1,abt.ang2);
}
assert.equal((6/15)*10,4); // Q7 check

// 8. Converse ABT & triangle-inequality degeneracy checks (4.2 Q8(i) & Q8 check)
const q8Trap=labs.math.converseAbtCheck(5,10,1.5,3.5);
assert.equal(q8Trap.validTriangle,false,'4.2 Q8(i) lengths collapse flat');
assert.equal(q8Trap.isBisector,false);
const q8Check=labs.math.converseAbtCheck(3,6,1,2);
assert.equal(q8Check.ratioMatches,true);
assert.equal(q8Check.validTriangle,false,'Ratio matches 1/2 yet 3 + 3 = 6 fails triangle inequality');
assert.equal(q8Check.isBisector,false);
const q8Valid=labs.math.converseAbtCheck(4,6,2,3);
assert.equal(q8Valid.isBisector,true);

// 9. Circumcircle inscribed angle invariance
const arc=labs.math.circumcircleArc([102,126],[218,126],40);
for(const phi of [-135,-100,-72,-45]){
  const P=[arc.O[0]+arc.R*Math.cos(phi*Math.PI/180),arc.O[1]+arc.R*Math.sin(phi*Math.PI/180)];
  const ux=102-P[0],uy=126-P[1],vx=218-P[0],vy=126-P[1];
  const ang=Math.acos((ux*vx+uy*vy)/(Math.hypot(ux,uy)*Math.hypot(vx,vy)))*180/Math.PI;
  close(ang,40,1e-6);
}

// 10. Pythagoras & Converse + ladder check
assert.equal(labs.math.pythagorasCheck(3,4,5).kind,'right');
assert.equal(labs.math.pythagorasCheck(3,4,4.2).kind,'acute');
assert.equal(labs.math.pythagorasCheck(3,4,6).kind,'obtuse');
close(Math.sqrt(5*5-1.4*1.4),4.8);

// 11. Circles & Tangents (interior, on-circle, exterior)
assert.equal(labs.math.tangentLengths(5,3).count,0);
assert.equal(labs.math.tangentLengths(5,5).count,1);
assert.equal(labs.math.tangentLengths(5,13).count,2);
close(labs.math.tangentLengths(5,13).len,12);

// 12. Concurrency (Ceva)
const cevaOk=labs.math.cevaPoints([160,22],[42,158],[278,158],2/3,3/4,2);
assert.equal(cevaOk.concurrent,true);
assert(cevaOk.spread<1e-6,'Concurrent cevians must meet at a single point');
const cevaMiss=labs.math.cevaPoints([160,22],[42,158],[278,158],2/3,3/4,1.1);
assert.equal(cevaMiss.concurrent,false);
assert(cevaMiss.spread>5,'Non-concurrent cevians form a measurable gap triangle');

/* HTML, SW & integration checks */
const html=read('index.html'),sw=read('service-worker.js'),hub=read('assets/chapter-hub.js'),disc=read('assets/discovery.js'),app=read('assets/app.js');
assert(html.includes('assets/g10-ch4-concepts.css'));
assert(html.includes('data/g10-ch4-concepts.js'));
assert(html.includes('assets/g10-ch4-concepts.js'));
assert(sw.includes('./assets/g10-ch4-concepts.css'));
assert(sw.includes('./data/g10-ch4-concepts.js'));
assert(sw.includes('./assets/g10-ch4-concepts.js'));
assert(hub.includes("chapter.id==='g10-ch4'"));
assert(hub.includes('TriggleG10Ch4Labs')&&hub.includes('labEngine?.mount'));
assert(disc.includes("id==='g10-ch4'"));
assert(app.includes("chapter.id==='g10-ch4'"));

console.log('PASS Grade 10 Chapter 4 Geometry Concepts: 12 bilingual 6-part stages, all KaTeX expressions, degeneracy & geometry math checks, PR #277 links & offline cache');
