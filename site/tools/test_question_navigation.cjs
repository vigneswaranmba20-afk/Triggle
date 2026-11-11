'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs');
const html=fs.readFileSync('site/index.html','utf8'),js=fs.readFileSync('site/assets/app.js','utf8'),sw=fs.readFileSync('site/service-worker.js','utf8');
for(const id of ['questionText','previous','next','langEn','langTa','figureDialog'])assert.ok(html.includes('id="'+id+'"'));
for(const contract of ['function navMove(delta)','function remember()',"lastOpened={grade,questionId:current.id}","store('triggle.lastByGrade.v119',lastByGrade)","window.addEventListener('popstate'"])assert.ok(js.includes(contract),'Preserve '+contract);
assert.ok(!/removeItem|localStorage.clear/.test(js),'Never delete existing progress');
assert.ok(Number(sw.match(/triggle-shell-real-2025-v(\d+)/)[1])>=76);
new Function(js);
console.log('PASS question navigation, bilingual controls, stored progress and versioned offline cache.');
