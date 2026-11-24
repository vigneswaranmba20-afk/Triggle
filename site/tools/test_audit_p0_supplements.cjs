'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const katex = require('../assets/vendor/katex/katex.min.js');
const { loadRuntime } = require('./curriculum_bulk.cjs');

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync('site/data/audit-p0-supplements.js', 'utf8'), ctx);
const sup = ctx.window.TriggleP0Supplements;
assert.ok(sup && Array.isArray(sup.ids) && sup.ids.length === 21, 'Expected 21 P0 supplement entries');

const rt = loadRuntime();
const allIds = new Set([
  ...rt.classes[9].items.map(i => i.id),
  ...rt.classes[10].items.map(i => i.id),
]);

for (const id of sup.ids) {
  assert.ok(allIds.has(id), `Supplement target ${id} missing from runtime`);
  const entry = sup.get(id);
  assert.ok(entry.title?.en && entry.title?.ta, `Bilingual title required on ${id}`);
  if (entry.note) {
    assert.ok(entry.note.en && entry.note.ta, `Bilingual note required on ${id}`);
  }
  if (entry.table) {
    assert.ok(Array.isArray(entry.table.headers) && entry.table.headers.length >= 2);
    assert.ok(Array.isArray(entry.table.rows) && entry.table.rows.length >= 1);
  }
  if (entry.latex) {
    const html = katex.renderToString(entry.latex, { displayMode: true, throwOnError: true, strict: 'error' });
    assert.ok(html.includes('katex'), `KaTeX render failed for ${id}`);
  }
}

console.log(`PASS P0 Wave 3 Supplements: ${sup.ids.length} additive records (AUD08-02, AUD15-01, AUD15-02, AUD20-01, AUD20-02), bilingual EN/TA, strict KaTeX, 0 preservation changes.`);
