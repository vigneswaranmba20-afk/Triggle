import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('one-shot job gated by exact explicit user approval commit message',async()=>{
 const w=await readFile('.github/workflows/evolve-audit-repair.yml','utf8');
 assert.ok(w.includes("github.event.head_commit.message == 'EVOLVE_POSTSUB_APPROVED_20261122_QWEN3_CODER'"));
 assert.ok(w.includes('environment: evolve-hf-lab'));
 assert.ok(w.includes('contents: read'));
 assert.ok(!w.includes('contents: write'));
 assert.ok(!w.includes('secrets.HF_TOKEN'));
});
test('model request is pinned, one-shot and rejects attempts to rerun',async()=>{
 const f=await readFile('experiments/evolve/audit_fix_aud08_06.mjs','utf8');
 assert.ok(f.includes("GITHUB_RUN_ATTEMPT!=='1'"));
 assert.ok(f.includes("process.env.HF_INFER_APPROVED!==ONE_SHOT_APPROVAL"));
 assert.ok(f.includes("const PINNED_MODEL='Qwen/Qwen3-Coder-30B-A3B-Instruct:amazon-bedrock'"));
 assert.ok(f.includes("await acquireAccessToken()"));
 assert.ok(f.includes("one possible inference POST; never retry"));
 assert.ok(!f.includes('process.env.HF_TOKEN'));
});
