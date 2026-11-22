import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('scanner explicitly marked public and contains no inference call',async()=>{
 const s=await readFile('experiments/evolve/model_landscape.mjs','utf8');
 assert.ok(s.includes('exhaustiveWholeHub:false'));
 assert.ok(s.includes('paidCalls:0'));
 assert.ok(!s.includes('/v1/chat/completions'));
 assert.ok(!s.includes('process.env.HF_TOKEN'));
});
test('scanner scope includes translation, OCR, speech and embeddings',async()=>{
 const s=await readFile('experiments/evolve/model_landscape.mjs','utf8');
 for(const tag of ['translation','text-to-speech','image-to-text','sentence-similarity','image-text-to-text'])assert.ok(s.includes(tag));
});
