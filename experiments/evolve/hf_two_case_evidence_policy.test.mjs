import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {CASES,evidencePacket,promptFor,validateProposal,parseRecord} from './hf_two_case_evidence_policy.mjs';

const root=resolve(process.env.TRIGGLE_SOURCE_ROOT||'.');
async function packed(c){return evidencePacket(await readFile(join(root,c.file),'utf8'),c);}
function good(c,p){
 return c.id==='AUD09-04'
  ? {findingId:c.id,verdict:'source-issue',reportedLiteralPresent:true,
   evidence:[{field:'steps[2].en',quote:'x^(b−c) × y^(c−a) × z^(a−b)'}],
   proposedTarget:'steps[2].en',
   proposedAction:'Improve only prose notation in steps[2].en, keeping eq and all accessibility fallbacks intact.',
   rationale:'The third prose step has raw caret exponents; the separate KaTeX expression already encodes proper powers.',
   verification:'Open the question in a real 320px browser; compare prose against rendered KaTeX and test accessible fallback text.',
   state:'proposal-only'}
  :{findingId:c.id,verdict:'needs-browser',reportedLiteralPresent:false,
   evidence:[{field:'steps[1].eq',quote:'V_brick=0.03 m³; V_wall=5×3×2=30 m³'}],
   proposedTarget:'none',
   proposedAction:'No edit supported by the current source; investigate the renderer on an actual mobile viewport.',
   rationale:'The source uses single-underscore tokens; alleged triple underscores need browser evidence.',
   verification:'Open Grade 9 Exercise 7.4 Q10 at 320/390/412px with English and Tamil rendering, then inspect displayed math.',
   state:'proposal-only'};
}
for(const c of CASES){
 test(c.id+' pinned record must parse with expected exact source evidence',async()=>{
  const src=await readFile(join(root,c.file),'utf8');
  const rec=parseRecord(src,c.recordId),p=evidencePacket(src,c);
  assert.equal(rec.id,c.recordId);
  assert.equal(p.sourceSha,'8ca60d0aaaae07011017cb9f321713c141a48ba2');
  assert.match(p.fileSha256,/^[a-f0-9]{64}$/);
  assert.equal(p.reportedLiteralPresentInRecord,c.id==='AUD09-04');
  assert.ok(promptFor(c,p).includes('SOURCE_FIELDS'));
  assert.ok(!promptFor(c,p).includes('OBSERVED_LITERAL_PRESENT_IN_RECORD'));
  assert.deepEqual(validateProposal(good(c,p),c,p),{accepted:true,failures:[]});
 });
}
test('AUD09-04: model cannot rewrite accessible fallback under any target',async()=>{
 const c=CASES[0],p=await packed(c),x=good(c,p);
 const wrong={...x,proposedTarget:'questionMath.en[5].fallback',proposedAction:'Replace the fallback text with LaTeX superscripts for prettier rendering.'};
 const verdict=validateProposal(wrong,c,p);
 assert.equal(verdict.accepted,false);
 assert.ok(verdict.failures.includes('forbidden-change-target'));
 assert.ok(verdict.failures.includes('tries-to-break-accessible-fallback'));
});
test('AUD09-04: model must quote target prose, not an unrelated field',async()=>{
 const c=CASES[0],p=await packed(c),x=good(c,p);
 const bad={...x,evidence:[{field:'questionMath.en[5].fallback',quote:'x^(b−c) × y^(c−a) × z^(a−b) = 1.'}]};
 assert.ok(validateProposal(bad,c,p).failures.includes('no-evidence-in-proposed-target'));
});
test('AUD10-03: impossible triple-underscore quote is rejected',async()=>{
 const c=CASES[1],p=await packed(c),x=good(c,p);
 const bad={...x,evidence:[{field:'steps[1].eq',quote:'V___brick=0.03 m³'}],reportedLiteralPresent:true,verdict:'source-issue'};
 const r=validateProposal(bad,c,p);
 assert.ok(r.failures.includes('fabricated-or-unbounded-quote'));
 assert.ok(r.failures.includes('literal-presence-contradicts-source'));
 assert.ok(r.failures.includes('fabricated-source-defect'));
});
test('AUD10-03: a source claim of triple underscores is unsupported even if no code edit is requested',async()=>{
 const c=CASES[1],p=await packed(c),x=good(c,p);
 const bad={...x,rationale:'The source contains V___brick and V___wall and should be rewritten.'};
 assert.ok(validateProposal(bad,c,p).failures.includes('invented-literal-presence'));
});
test('model may not claim that its patch already deployed',async()=>{
 const c=CASES[0],p=await packed(c),x=good(c,p);
 assert.ok(validateProposal({...x,state:'deployed',proposedAction:'Changes deployed after tests passed.'},c,p).failures.length>=2);
});
