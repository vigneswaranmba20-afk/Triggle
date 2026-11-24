'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const geometry=require('../data/textbook-fidelity/g9-ch4-bilingual-20261124.json');
const context={window:{}};
const run=(f)=>vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),context,{filename:f});
run('data/class-9.js');run('data/curriculum.js');
const files=["g9-ch3-ex3-1-q10-q12-en.js","g9-ch3-ex3-2-q4-en.js","g9-ch4-ex4-1-q2-q4-en.js","g9-ch4-ex4-2-en.js","g9-ch4-ex4-3-en.js","g9-ch5-ex5-2-en.js"];
for(const f of files)run('data/textbook-exercises/'+f);
const ids=["g9-ch3-ex3.1-q10","g9-ch3-ex3.1-q11","g9-ch3-ex3.1-q12","g9-ch3-ex3.2-q4","g9-ch4-ex4.1-q2","g9-ch4-ex4.1-q4","g9-ch4-ex4.2-q1","g9-ch4-ex4.2-q2","g9-ch4-ex4.2-q3","g9-ch4-ex4.2-q4","g9-ch4-ex4.2-q6","g9-ch4-ex4.3-q1","g9-ch4-ex4.3-q2","g9-ch4-ex4.3-q4","g9-ch4-ex4.3-q6","g9-ch5-ex5.2-q2","g9-ch5-ex5.2-q3","g9-ch5-ex5.2-q5","g9-ch5-ex5.2-q6","g9-ch5-ex5.2-q7","g9-ch5-ex5.2-q8","g9-ch5-ex5.2-q9","g9-ch5-ex5.2-q11"];
const items=context.window.TRIGGLE_CLASSES[9].items.filter(e=>ids.includes(e.id));
assert.equal(items.length,23);
assert.equal(new Set(items.map(e=>e.id)).size,23);
for(const q of items){assert.ok(q.q.en.length>40);assert.ok(q.answer.length>2);assert.ok(q.steps.length>=3);if(q.id==='g9-ch3-ex3.2-q4'){
  assert.equal(q.kind,'textbook');
  assert.equal(q.sourceFidelity.status,'english-source-page-visual-checked');
  assert.equal(q.page,97);
 }else if(geometry.records[q.id]){
  const {en,ta}=geometry.records[q.id].pages;
  assert.equal(q.kind,'reference');
  assert.equal(q.sourceFidelity.status,'page-images-checked-en-ta');
  assert.equal(q.sourceFidelity.tamilEditorial,'textbook-question-checked');
  assert.equal(q.page,en.pdf);
  assert.deepEqual([q.sourceFidelity.enPrintedPage,q.sourceFidelity.enPdfPage],[en.printed,en.pdf]);
  assert.deepEqual([q.sourceFidelity.taPrintedPage,q.sourceFidelity.taPdfPage],[ta.printed,ta.pdf]);
  assert.equal(new URL(q.source).pathname,'/file/d/'+geometry.sources.en.driveId+'/view');
  assert.equal(new URL(q.sourceFidelity.taSource).pathname,'/file/d/'+geometry.sources.ta.driveId+'/view');
 }else{
  assert.equal(q.kind,'reference');
  assert.ok(q.sourceFidelity.status.includes('visual-pending'));
 }}
const manifest=JSON.parse(fs.readFileSync(path.join(root,'data/g9-english-completeness-manifest.json'),'utf8'));
assert.equal(manifest.expectedChapterCount,9);assert.equal(manifest.expectedExerciseCount,60);assert.equal(manifest.newlyMathematicallyVerified,23);assert.equal(manifest.verifiedCoveragePercent,null);
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
for(const f of files){assert.ok(html.includes('./data/textbook-exercises/'+f));assert.ok(sw.includes("'./data/textbook-exercises/"+f+"'"));}
const eq=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,a+' != '+b);
eq((10+5)**2,225);eq((3*20+2)*(3*20-2),3596);
eq((6/5)*5-6,0);eq((-9/10)*10+9,0);eq((4/9)*9-4,0);
eq(30+60+90,180);eq(40+80+100+140,360);eq(72+114+108+66,360);
eq(Math.hypot(6,8),10);eq(Math.sqrt(26**2-10**2),24);eq(Math.hypot(15,8),17);
eq(2*Math.sqrt(15**2-12**2),18);eq(2*Math.sqrt(5**2-4**2),6);
for(const a of [1,5])eq((3-1)**2+(a-3)**2,8);
for(const t of [-5,9])eq((t-1)**2+(t-3)**2,100);
for(const [x,y] of [[0,9],[4,25],[-2,1]])eq((x-3)**2+(y-4)**2,(x+5)**2+(y-6)**2);
for(const [x,y] of [[1,2],[3,-4],[5,-6]])eq((11-x)**2+(2-y)**2,100);
console.log('PASS: 23 registered Grade 9 English questions, 6 modules, 60-exercise source index, unique IDs, mathematical invariants and offline/page load references');

// AUD12-02: check actual coordinates, not just the presence of a diagram.
{
 const paths=["assets/grade9-ch4/ex4-1-q4.svg","assets/grade9-ch4/ex4-2-q3.svg","assets/grade9-ch4/ex4-2-q4.svg","assets/grade9-ch4/ex4-2-q6.svg","assets/grade9-ch4/ex4-3-q1.svg","assets/grade9-ch4/ex4-3-q2.svg","assets/grade9-ch4/ex4-3-q4.svg","assets/grade9-ch4/ex4-3-q6.svg"];
 const figs=paths.map(f=>fs.readFileSync(path.join(root,f),'utf8'));
 const near=(a,b)=>assert.ok(Math.abs(a-b)<0.01,a+' != '+b);
 const pts=s=>s.match(/<polygon points="([^"]+)"/)[1].split(' ').map(p=>p.split(',').map(Number));
 const angle=(h,w)=>Math.atan2(h,w)*180/Math.PI;
 const [a,b,c]=pts(figs[0]);near(angle(b[1]-a[1],a[0]-b[0]),60);near(angle(c[1]-a[1],c[0]-a[0]),70);
 const rc=figs[1].match(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/).slice(1).map(Number);near(angle(rc[3],rc[2]),46);
 const [u,v,w,z]=pts(figs[2]);near((v[0]-z[0])/(w[1]-u[1]),16/12);
 assert.match(figs[3],/M174 164 H182 V172/);
 for(const [i,R,h,half] of [[4,26,24,10],[5,17,8,15],[6,15,12,9]]){
  const m=figs[i].match(/<line x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)"/).slice(1).map(Number);
  near(m[1],m[3]);near(Math.hypot(m[0]-160,m[1]-103),78);near(Math.hypot(m[2]-160,m[3]-103),78);near((m[2]-m[0])/2,78*half/R);near(m[1]-103,78*h/R);assert.match(figs[i],/>M<\/text>/);assert.match(figs[i],/<path d="M160 /);
 }
 assert.match(figs[7],/M174 102 H182 V110/);near(Math.hypot(56,42),70);
 for(const f of paths)assert.ok(sw.includes("'./"+f+"'"),f+' missing offline');
 console.log('PASS: AUD12-02 geometry proportions and offline invariants');
}
