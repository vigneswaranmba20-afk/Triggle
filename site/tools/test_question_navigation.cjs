'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs');
const html=fs.readFileSync('site/index.html','utf8'),js=fs.readFileSync('site/assets/app.js','utf8'),sw=fs.readFileSync('site/service-worker.js','utf8');
for(const id of ['questionText','previous','next','langEn','langTa','figureDialog'])assert.ok(html.includes('id="'+id+'"'));
for(const contract of ['function navMove(delta)','function remember()',"lastOpened={grade,questionId:current.id}","store('triggle.lastByGrade.v119',lastByGrade)","window.addEventListener('popstate'"])assert.ok(js.includes(contract),'Preserve '+contract);
assert.ok(!/removeItem|localStorage.clear/.test(js),'Never delete existing progress');
assert.match(sw,/^const CACHE=['"]triggle-[a-z0-9-]*[0-9][a-z0-9-]*['"];?/m,'Keep a versioned Triggle offline cache namespace');
new Function(js);
// AUD28-04: exact question-specific triangle, visible in both languages.
const figureWindow={};
new Function('window',fs.readFileSync('site/assets/concept-figures.js','utf8'))(figureWindow);
new Function('window',fs.readFileSync('site/data/class-9.js','utf8'))(figureWindow);
const angleItem=figureWindow.TRIGGLE_CLASSES[9].items.find(x=>x.id==='c9-4-4-practice-5');
assert.equal(angleItem.answer,'60°');
assert.match(angleItem.q.en,/55° and 65°/);
for(const lang of ['en','ta']){
 const graphic=figureWindow.TriggleConcept.render({item:angleItem,lang});
 assert(graphic?.html.includes('viewBox="0 0 620 350"'));
 const vertices=graphic.html.match(/<path d="M([\d.]+) ([\d.]+) L([\d.]+) ([\d.]+) L([\d.]+) ([\d.]+) Z"/);
 assert(vertices,'Triangle vertices must be present and nonnegative');
 const [ax,ay,bx,by,cx,cy]=vertices.slice(1).map(Number);
 assert(ax>0&&bx<620&&cx>0&&cx<620&&cy>30&&ay<300&&by<300,'Complete triangle inside visible area');
 assert(Math.abs(Math.atan2(ay-cy,cx-ax)*180/Math.PI-55)<1e-8);
 assert(Math.abs(Math.atan2(by-cy,bx-cx)*180/Math.PI-65)<1e-8);
 assert(graphic.html.includes('55° + 65° + x = 180°'));
 assert(!/sin θ|cos θ|60°/.test(graphic.html),'Question artwork does not reveal the answer or introduce trig');
 assert(lang==='ta'?/முக்கோணம்/.test(graphic.html):/unknown angle x/.test(graphic.html));
}

console.log('PASS question navigation, bilingual controls, stored progress and versioned offline cache.');
