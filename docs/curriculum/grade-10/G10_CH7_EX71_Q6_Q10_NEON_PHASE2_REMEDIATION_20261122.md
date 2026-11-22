# Grade 10 Mensuration Exercise 7.1 Q6–Q10 — Neon Phase 2 remediation

**Date:** 2026-11-22  
**Draft PR:** https://github.com/vigneswaranmba20-afk/Triggle/pull/338  
**Original Phase 2 upload:** `Neon G10 Ch7 Ex71 Q6 Q10 Phase2 Complete Audit Report.md`  
**SHA-256:** `bd84ad87f1593d7ab4d1539710a89ba4876071005e760628df8b31c06b8c0079` (21,980 bytes)

## Independent verdict
Neon inspected the offline source, ran its local Q1–Q5/Q6–Q10 maths scripts and personally examined hashes and all 15 Chromium screenshots at 320/390/412 px. It **did not itself perform live browser interactions** because its sandbox blocked loopback networking. **CONDITIONAL GO** is not a production release approval. The 2025 source/question correctness and all five answers passed; Q10 geometry visualization and final-head CI remain release gates.

## Findings and fixes
| Neon ID | Severity | Author remediation | Status |
|---|---|---|---|
| PHASE2-HIGH-01 | HIGH | Refresh generated project-status, run 4-way browser/core/security full-quality CI on corrected final PR head | **Pending final green** |
| PHASE2-HIGH-02 | HIGH | Redraw Q10 frustum so lower front ellipse matches back rim, radius segments originate at centre, height label avoids wall, and slant ℓ=10 cm is drawn | Implemented, awaiting CI visual check |
| PHASE2-MED-02 | MEDIUM | At widths up to 420 px, stack Q10 diagram and enlarge action vertically; don't squeeze figure to 160px | Implemented, awaiting 320/390/412px measurement |
| PHASE2-MED-03 | MEDIUM | Add real Q5→Q6, Q10 end/previous, Tamil pending, diagram modal and fixed-dock clearance click tests | Implemented, awaiting browser checks |
| PHASE2-MED-01 | MEDIUM | KaTeX strict-mode uses `Rs.` while textbook/plain-text/fallback retain `₹` | Disclosed; non-blocking currency style inconsistency pending a safe formatter |
| PHASE2-LOW-01 | LOW | Some implicit mental arithmetic can be expanded | Non-blocking instructional polish |
| PHASE2-LOW-02 | LOW | Upright cm² typography in auto-processed question cards | Non-blocking notation polish |

## Verified independent maths
- Q6: 28 caps, cone slant 13cm, curved area only.
- Q7: `√5:9`; both official 2025 keys print the radical (PDF OCR loses it).
- Q8: +56.25%.
- Q9: ₹302.72; two curved hemispheres plus annular rim.
- Q10: top radius 6cm, bottom radius 12cm, vertical height 8cm, slant 10cm, painted area 216π; area rounded to 678.86cm² ×₹2 = ₹1357.72; exact-cost-last differs by one paise.

Original Phase 1 frozen files remain unchanged. The Phase 2 report's hypothetical wrong-diameter calculation erratum has been documented separately; it is not a change to the correct answer.

## Release rule
**DO NOT MERGE** this PR based on this remediation note. Require current-head green risk-based CI, especially fresh real-browser coverage at 320/390/412px, a correct Q10 diagram with sufficient on-screen label legibility, and updated release gates. After merging, verify GitHub Pages deployed source. Tamil authored lesson translation remains explicitly pending.
