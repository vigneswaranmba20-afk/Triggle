# AUD14-02 — 2025 primary-source trigonometric table reconciliation

Status: implementation in progress. English/Tamil answer-key visuals independently inspected 22 November 2026. **Not production-verified.**

## Primary evidence
- TN Government Standard Nine Mathematics (English) **2025 revised** original PDF, printed **p.236** (PDF p.242): 6-minute table column spacing; columns 1–5 for *mean difference*, which is **added** for sine/tangent and **subtracted** for cosine
- English printed **p.237** (PDF p.243): Example 6.13 gives `tan70°12′=2.7776`, then adds the 1-minute table correction to find `tan70°13′`
- English printed **p.239** (PDF p.245): exact Exercise 6.4 Q1(i–vi) prompts
- English printed **p.316** (PDF p.322): official Ex6.4 answer key
- Tamil original revised PDF, printed **p.251** (PDF p.257): same mean-difference method; printed **p.332** (PDF p.338): same Ex6.4 values
- Independently compare the individual mean-difference entries and six worked table solutions with the specialist source https://tnboardsolutions.com/samacheer-kalvi-9th-maths-guide-chapter-6-ex-6-4/ . This corroborates the method but does **not** replace the official PDFs above.

| Part | Six-minute lookup | Mean difference (4-decimal units) | 2025 English/Tamil answer | Calculator alternative |
|---|---:|---:|---:|---:|
| (i) sin49°00′ | 0.7547 | 0 | 0.7547 | same at four places |
| (ii) cos74°39′ | cos74°36′ = 0.2656 | −8 | **0.2648** | 0.2647 |
| (iii) tan54°26′ | tan54°24′ = 1.3968 | +17 | 1.3985 | 1.3985 |
| (iv) sin21°21′ | sin21°18′ = 0.3633 | +8 | 0.3641 | 0.3641 |
| (v) cos33°53′ | cos33°48′ = 0.8310 | −8 | 0.8302 | 0.8302 |
| (vi) tan70°17′ | tan70°12′ = 2.7776 | +131 | **2.7907** | 2.7903 |

Mean differences are in units of 0.0001. They are **not** ordinary exact analytic values. The source's table method, not calculator rounding, determines the required result. Do not label a four-figure table output as equal to the mathematical exact value.

## Scope and release policy
- Correct all six existing Q1 student worked explanations; Q1(ii) and Q1(vi) also require corrected final answers
- Preserve the exact existing English/Tamil question prompts, stable IDs and original baseline preservation hashes
- Add scoped test-guarded new record hashes **only** for these six intentional worked-solution corrections
- Regenerate the canonical Grade 9 MathML presentation and project-status snapshots; do not modify other grades' content
- Tamil explanatory wording in the implementation must remain explicitly **pending editorial review**; English/Tamil answer keys are independently visually checked, not the newly composed Tamil pedagogical language
- Publish only after full risk-based required tests, 4 Chromium/WebKit shards, security, merge and live Pages verification. No user-facing audit closure merely from a green smoke check
