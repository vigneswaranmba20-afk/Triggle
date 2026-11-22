// Offline, deterministic source-evidence contract for Triggle Hugging Face repairs.
// Does not perform inference or mutate production. Unsafe model output is never code.
import {createHash} from 'node:crypto';

export const SOURCE_SHA='8ca60d0aaaae07011017cb9f321713c141a48ba2';
export const MODEL='Qwen/Qwen3-Coder-30B-A3B-Instruct:amazon-bedrock';
export const CASES=Object.freeze([
 {id:'AUD09-04',file:'site/data/textbook-exercises/g10-ch2-ex2-7-gp-missing-en.js',
  recordId:'c10-2-ex2-7-q12',reportedLiteral:'x^(b−c)',
  fields:['q.en','questionMath.en[5].latex','questionMath.en[5].fallback','steps[2].en','steps[2].eq','steps[2].math.latex','steps[2].math.fallback','answerMath.latex'],
  allowedTargets:['none','steps[2].en']},
 {id:'AUD10-03',file:'site/data/textbook-exercises/g9-ch7-ex7-4-en.js',
  recordId:'g9-ch7-ex7.4-q10',reportedLiteral:'V___brick',
  fields:['q.en','steps[1].en','steps[1].eq','steps[2].eq','answer'],
  allowedTargets:['none']}
]);
export function parseRecord(source,recordId){
 const anchor='"id": "'+recordId+'"';
 const at=source.indexOf(anchor);
 if(at<0||source.indexOf(anchor,at+anchor.length)!==-1)throw Error('Unique record ID missing: '+recordId);
 const startMarker=source.lastIndexOf('\n  {',at);
 if(startMarker<0)throw Error('Cannot find record object boundary');
 const start=startMarker+3;
 let depth=0,quoted=false,escaped=false,stop=-1;
 for(let i=start;i<source.length;i++){
  const ch=source[i];
  if(quoted){if(escaped)escaped=false;else if(ch==='\\')escaped=true;else if(ch==='"')quoted=false;continue;}
  if(ch==='"'){quoted=true;continue;}
  if(ch==='{')depth++;
  else if(ch==='}'&&--depth===0){stop=i+1;break;}
 }
 if(stop<0)throw Error('Unterminated textbook record');
 const obj=JSON.parse(source.slice(start,stop));
 if(obj.id!==recordId)throw Error('Extracted wrong record ID');
 return obj;
}
export function fieldValue(obj,path){
 const parts=path.replace(/\[(\d+)\]/g,'.$1').split('.');
 let val=obj;
 for(const p of parts){if(val==null||!(p in Object(val)))return undefined;val=val[p];}
 return typeof val==='string'?val:undefined;
}
export function evidencePacket(source,c){
 const obj=parseRecord(source,c.recordId);
 const fields={};
 for(const path of c.fields){
  const value=fieldValue(obj,path);
  if(typeof value!=='string')throw Error('Missing pinned field '+c.id+' '+path);
  fields[path]=value;
 }
 const entire=JSON.stringify(obj);
 const present=entire.includes(c.reportedLiteral);
 return {id:c.id,file:c.file,recordId:c.recordId,sourceSha:SOURCE_SHA,
  fileSha256:createHash('sha256').update(source).digest('hex'),
  reportedLiteral:c.reportedLiteral,reportedLiteralPresentInRecord:present,fields};
}
export function promptFor(c,p){
 return [
  'Role: independent evidence auditor. You may propose a repair, but you cannot edit code.',
  'Task: evaluate '+c.id+' on an immutable current-main source snapshot; old audit descriptions may be stale.',
  'NO fictional source quotes. Ground each claim in the provided SOURCE_FIELDS, never in the audit description.',
  'SOURCE_FIELDS contains literal JavaScript record fields. A JSON fallback field exists for accessibility when math renderer is unavailable: keep plain-text fallback readable, do NOT replace fallback with LaTeX commands.',
  'Structured .latex fields use KaTeX; ordinary steps[].en prose may contain unformatted maths and be worth investigating separately.',
  'A reported visual rendering artifact is not evidence of a source substring. If not found in SOURCE_FIELDS, treat it as an unverified rendering symptom. Request actual browser reproduction; DO NOT invent a repair.',
  'Preserve 2025 official question stems, all answers, stable IDs, and Tamil status. Do not claim live testing, code changes, deployment, or textbook page-image review.',
  'Return ONLY one JSON object, no markdown, with exact fields:',
  '{"findingId":"...","verdict":"source-issue|needs-browser|source-not-supported",',
  '"reportedLiteralPresent":true-or-false,',
  '"evidence":[{"field":"exact key from SOURCE_FIELDS","quote":"EXACT contiguous substring from that field"}],',
  '"proposedTarget":"exact key from SOURCE_FIELDS or none","proposedAction":"plain-English instruction, or no edit",',
  '"rationale":"source-grounded concise reasoning","verification":"concrete future browser/test check",',
  '"state":"proposal-only"}',
  'Give 1 to 2 evidence quotes; no quoting the audit or invented LaTeX rendering. Select "none" when no source edit is supported.',
  'AUDIT_ID '+c.id,
  'REPORTED_LITERAL '+JSON.stringify(p.reportedLiteral),
  'ALLOWED_PROPOSED_TARGETS '+JSON.stringify(c.allowedTargets),
  'SOURCE_SHA '+p.sourceSha,
  'SOURCE_FILE '+p.file,
  'SOURCE_FIELDS '+JSON.stringify(p.fields),
  'END SOURCE_FIELDS'
 ].join('\n');
}
export function validateProposal(candidate,c,p){
 const failures=[];
 if(!candidate||Array.isArray(candidate)||typeof candidate!=='object')return {accepted:false,failures:['non-object']};
 if(candidate.findingId!==c.id)failures.push('wrong-id');
 if(!['source-issue','needs-browser','source-not-supported'].includes(candidate.verdict))failures.push('invalid-verdict');
 if(candidate.reportedLiteralPresent!==p.reportedLiteralPresentInRecord)failures.push('literal-presence-contradicts-source');
 if(candidate.state!=='proposal-only')failures.push('false-workflow-state');
 if(!c.allowedTargets.includes(candidate.proposedTarget))failures.push('forbidden-change-target');
 if(!Array.isArray(candidate.evidence)||candidate.evidence.length<1||candidate.evidence.length>2){
  failures.push('missing-or-excess-evidence');
 }else{
  for(const e of candidate.evidence){
   if(!e||typeof e.field!=='string'||typeof e.quote!=='string'||!Object.hasOwn(p.fields,e.field)){
    failures.push('unknown-evidence-field');continue;
   }
   if(e.quote.length<5||e.quote.length>350||!p.fields[e.field].includes(e.quote))
    failures.push('fabricated-or-unbounded-quote');
  }
 }
 for(const k of ['proposedAction','rationale','verification']){
  if(typeof candidate[k]!=='string'||(candidate[k].length<12&&!(k==='proposedAction'&&candidate.proposedTarget==='none'&&candidate[k]==='no edit'))||candidate[k].length>1400)
   failures.push('invalid-'+k);
 }
 const action=String(candidate.proposedAction||'');
 if(/\b(deployed|already merged|tests passed|live verified)\b/i.test(action))failures.push('unearned-release-claim');
 if(c.id==='AUD09-04'){
  if(candidate.verdict==='source-issue'&&candidate.proposedTarget!=='steps[2].en')
   failures.push('math-target-is-not-prose');
  if(/(?:change|convert|replace|write|edit|modify|fix|use)[^.!?]{0,100}\b(?:fallback|questionMath)\b/i.test(action)
    ||/(?:fallback|questionMath)[^.!?]{0,100}(?:change|convert|replace|edit|modify|fix)/i.test(action))
   failures.push('tries-to-break-accessible-fallback');
  if(/fallback[^.!?]{0,100}(?:should match|should use|should be formatted|should be changed|should be replaced|needs changing)/i.test(String(candidate.rationale||'')+' '+String(candidate.verification||'')))
   failures.push('fallback-formatting-misconception');
  if(candidate.proposedTarget==='steps[2].en'&&
     !candidate.evidence?.some(e=>e.field==='steps[2].en'))failures.push('no-evidence-in-proposed-target');
 }
 if(c.id==='AUD10-03'){
  if(p.reportedLiteralPresentInRecord===false&&candidate.verdict==='source-issue')
   failures.push('fabricated-source-defect');
  if(/(?:replace|change|modify|convert|edit)\s+['"]?V___/i.test(action))
   failures.push('tries-to-change-nonexistent-token');
  if(/(?:contains|has|shows|includes)[^.!?]{0,100}V___brick/i.test(String(candidate.rationale||'')))
   failures.push('invented-literal-presence');
 }
 return {accepted:failures.length===0,failures};
}
