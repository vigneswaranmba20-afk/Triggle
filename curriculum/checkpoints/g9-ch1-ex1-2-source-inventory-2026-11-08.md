# Grade 9 Chapter 1 — Exercise 1.2 source checkpoint (2026-11-08)

Status: **source inventory established; NOT student-facing, NOT deployed, NOT editorially approved.** This is a scoped checkpoint, not a chapter-completion declaration.

Primary editions: Government of Tamil Nadu, Standard Nine Mathematics, revised 2025.
- English Google Drive file ID: `1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J`, printed pp. 11–12.
- Tamil Google Drive file ID: `1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj`, printed pp. 13–14.
- PDF page indexes: **not independently established**. Inspect original page images before exact-fidelity publication.
- Tamil extracted text contains corrupted combining characters; do not treat extracted glyphs as exact transcription.

## Source-listed Exercise 1.2 subpart inventory

| Question | Subparts | Count | Status |
|---|---|---:|---|
| Q1 | (i), (ii), (iii), (iv), (v) | 5 | (i)–(ii) mathematically checked below; remaining missing |
| Q2 | (i), (ii), (iii), (iv) | 4 | missing |
| Q3 | (i), (ii), (iii), (iv) | 4 | missing |
| Q4 | (i), (ii), (iii), (iv) | 4 | missing |
| Q5 | (i), (ii), (iii) | 3 | missing |
| Q6 | (i), (ii), (iii), (iv) | 4 | missing |
| Q7 | no labelled subpart | 1 | missing |
| Q8 | (i), (ii), (iii), (iv) | 4 | missing |
| Q9 | (i), (ii) | 2 | missing |
| Q10 | (i), (ii), (iii) | 3 | missing |
| **Total** | | **34** | **2 math checked; 32 missing/not checked** |

## Math-checked draft solutions (not source-exact UI transcriptions)

**Ex 1.2 Q1(i)** Source EN: `M = {p, q, r, s, t, u}`. Source TA: same symbolic set. EN: A set's cardinality is its number of distinct elements. Enumerate p (1), q (2), r (3), s (4), t (5), u (6). Therefore n(M)=6. TA: ஒரு கணத்தின் ஆதி எண் என்பது அதன் வெவ்வேறு உறுப்புகளின் எண்ணிக்கை. p, q, r, s, t, u என ஆறு தனித்த உறுப்புகள் உள்ளன. ஆகவே n(M)=6. Independent check: `new Set(['p','q','r','s','t','u']).size===6`.

**Ex 1.2 Q1(ii)** Source EN: `P = {x : x = 3n+2, n∈W and x<15}`. EN: Whole numbers are n=0,1,2,... . Solve 3n+2<15 ⇒ n<13/3. Hence allowed n=0,1,2,3,4. Substitution yields P={2,5,8,11,14}, so n(P)=5. TA: முழு எண்கள் n=0,1,2,... . 3n+2<15 என்பதால் 3n<13; எனவே n<13/3. ஆகவே n=0,1,2,3,4. பதிலீடு செய்தால் P={2,5,8,11,14}; எனவே n(P)=5. Independent check: `Array.from({length:30},(_,n)=>3*n+2).filter(x=>x<15).join(',')==='2,5,8,11,14'`.

For both: English and Tamil derivations are AI-drafted, **human Tamil editorial review pending**. Mathematical reasoning cross-checked against independently enumerated values and the textbook answer key. Exact original question punctuation/typesetting and page-image visual fidelity **not yet approved**. Do not promote to published based on this checkpoint alone.

## Next safe increment
Visually inspect English printed p.11 and Tamil printed p.13 (and their PDF page indices), reconcile exact Tamil glyphs, add Q1(i)–(ii) to the existing question schema and source-fidelity manifest, add automated assertions, run npm test + npm run test:browser and CI, and only then preview merge/deploy. Continue Q1(iii) after the first batch. Preserve 105 legacy IDs, all video assets, and other grade branches.
