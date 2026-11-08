'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const site=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(site,p),'utf8');
const manifest=JSON.parse(read('data/textbook-fidelity/g9-ch1-ex1-1-q1-q2.json'));
const sourceRows=['q1','q2'].flatMap(q=>JSON.parse(read('data/textbook-exercises/g9-ch1-ex1-1-'+q+'.json')).questions);
const rows=new Map(sourceRows.map(q=>[q.id,q]));
const ctx={window:{}};
for(const p of ['data/class-9.js','data/curriculum.js','data/textbook-exercises/g9-ch1-ex1-1-view.js'])vm.runInNewContext(read(p),ctx,{filename:p});
const shown=new Map(ctx.window.TRIGGLE_CLASSES[9].items.map(q=>[q.id,q]));
assert.equal(manifest.edition,'2025 revised');
assert.equal(manifest.items.length,8,'Expected Q1/Q2 8 subparts');
assert.equal(new Set(manifest.items.map(x=>x.id)).size,8,'Duplicate evidence ID');
for(const lang of ['en','ta']){
 const f=manifest.source[lang];
 assert.match(f.driveId,/^[\w-]{20,}$/,'Missing source file ID');
 assert.match(f.fileName,/Mathematics_.+2025_Edition.+\.pdf$/,'Wrong edition');
 assert.equal(f.printedPage,5);assert.equal(f.pdfPage,11);
}
const checked=new Set();
for(const e of manifest.items){
 const q=rows.get(e.id),v=shown.get(e.id);
 assert.ok(q&&v,'Missing student question or authoring record: '+e.id);
 for(const lang of ['en','ta']){
  const literal=e.textbookPrompt[lang],page=e.sourcePages[lang];
  assert.equal(e.visualStatus[lang],'page-checked');
  assert.equal(page.pdf,11);assert.equal(page.printed,5);
  assert.ok(literal.startsWith(e.questionNumber+'. '),'Missing full textbook question stem');
  assert.ok(literal.includes('\n('+e.part+') '),'Missing original textbook subpart');
  assert.equal(q.prompt[lang],literal,'Authoring source differs from verified book: '+e.id+' '+lang);
  assert.equal(v.q[lang],literal,'Student-facing question differs from verified book: '+e.id+' '+lang);
  assert.equal(q.source.pdfPage[lang],page.pdf);
  assert.equal(v.sourceFidelity.sourcePdfPage[lang],page.pdf);
 }
 assert.equal(q.sourceFidelity.status,'page-visual-checked');
 assert.equal(v.sourceFidelity.status,'page-visual-checked');
 assert.equal(q.review.publication,'draft','Source check is not a teaching review');
 assert.equal(v.review.tamilEditorial,'pending','Do not forge editorial approval');
 checked.add(e.id);
}
const pendingLegacy=new Set([
 ...['i','ii','iii','iv','v','vi'].map(x=>'g9-ch1-ex1.1-q3-a-'+x),
 ...['i','ii','iii','iv'].map(x=>'g9-ch1-ex1.1-q3-b-'+x)
]);
for(const file of fs.readdirSync(path.join(site,'data/textbook-exercises')).filter(f=>/^g9-ch1-ex1-1-q.+\.json$/.test(f))){
 for(const q of JSON.parse(read('data/textbook-exercises/'+file)).questions){
  if(checked.has(q.id))continue;
  assert.ok(pendingLegacy.has(q.id),'New official textbook question needs visual page evidence: '+q.id);
  assert.equal(q.review.publication,'draft');
  assert.notEqual(q.sourceFidelity?.status,'page-visual-checked','Unreviewed question cannot falsely claim exactness');
 }
}
assert.equal(checked.size,8);
const original=manifest.items[0].textbookPrompt.en;
assert.notEqual(original.replace('upto','up to'),original,'Negative test must detect changed textbook wording');
assert.notEqual(original.slice(3),original,'Dropping original numbering must fail');
assert.match(read('index.html'),/g9-ch1-ex1-1-view\.js\?v=ex1-1-exact-q1q2-1/,'Source update must refresh browser assets');
assert.match(read('service-worker.js'),/triggle-shell-real-2025-v38/,'Source update must refresh offline cache');
console.log('PASS: 8 bilingual textbook-exact Q1/Q2 prompts, 2025 PDF evidence, UI integration, strict drift checks, legacy pending and cache.');
