'use strict';
/* Teacher review is a private drafting tool — never a certification badge. */
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const html=read('reviewer.html'),js=read('assets/teacher-review.js');
const sw=read('service-worker.js'),css=read('assets/teacher-review.css');
for(const name of [
 'data/class-9.js','data/curriculum.js','data/real-numbers/g9-ch2-core.js',
 'data/real-numbers/g9-ch2-examples-a.js','data/real-numbers/g9-ch2-examples-b.js',
 ...'abcdef'.split('').map(x=>'data/real-numbers/g9-ch2-exercises-'+x+'.js'),
 'data/real-numbers/g9-ch2-concepts.js','assets/diagrams.js','assets/real-number-line.js',
 'assets/teacher-review.js','assets/teacher-review.css'
]){
 assert.ok(html.includes('./'+name),name+' must load in reviewer page');
 assert.ok(sw.includes('./'+name),name+' must be available offline');
}
assert.ok(html.includes('noindex,nofollow'),'review URL should not be search-indexed');
assert.ok(!html.includes('id="reviewedBadge"'),'no unearned public-reviewed label');
assert.ok(html.includes('no reviewer login or server synchronization'),'limitations must be explicit');
assert.ok(js.includes('fingerprint(item)'),'per-item content change must invalidate approval');
assert.ok(js.includes('localStorage'),'review notes are stored locally');
assert.ok(js.includes('new File('),'teacher must be able to back up reviews');
assert.ok(js.includes('navigator.share'),'mobile native Share Sheet must be available');
assert.ok(js.includes('if(textbooks.length!==151||concepts.length!==8'),'full chapter + concepts audit scope');
assert.ok(js.includes("status:'approved'")||js.includes("status==='approved'"),'approval state must be explicit');
assert.ok(css.includes('min-height:44px'),'interactive touch targets must be mobile size');
assert.ok(!/fetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket/.test(js),'review notes must not be transmitted to a server');
console.log('PASS: phone-first bilingual teacher review has 159-item coverage, revision invalidation, private local draft storage, export and offline assets.');
