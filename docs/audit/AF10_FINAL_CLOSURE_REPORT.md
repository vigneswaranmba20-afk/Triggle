# Triggle AF-10R closure report

21 November 2026 · Recovery checkpoint. The original 46 findings are reconciled individually in the [audit ledger](WEEKEND_AF09_FIX_LOG.md). Findings with remaining source or browser checks are still open.

## Release record

| Work | Repository and CI | Deployment and learner checks |
|---|---|---|
| Grade 9 cardinality | [PR #283](https://github.com/vigneswaranmba20-afk/Triggle/pull/283) was merged as [f39cc24](https://github.com/vigneswaranmba20-afk/Triggle/commit/f39cc24eeccee58837ff09db861b3ab9447d2d59). The [PR quality run](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/44867733445) passed its required gate, security job and all four browser shards. | [Main quality and Pages run](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/44869628699). Downloaded production HTML, Sets script, chapter stylesheet and worker matched the merged files byte for byte. A fresh production browser run passed at 320, 360, 390 and 430 px in English and Tamil. Earlier cached deep links still returned the old UI during deployment. |
| Grade 9 concept navigation | [PR #315](https://github.com/vigneswaranmba20-afk/Triggle/pull/315) merged as [7ba03389](https://github.com/vigneswaranmba20-afk/Triggle/commit/7ba03389e1706f98bb7a950977a20f5282b73214) from reconciled head [4eceb96](https://github.com/vigneswaranmba20-afk/Triggle/commit/4eceb9641fb0ff29162623bb3055d5caea997d27). [Quality run](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/44869975300). [Discriminant release test](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/44869975198) and [Thales release test](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/44869975275) passed on this head. | [Main quality and Pages run](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/44871015828). Deployment 7959199130 succeeded. Six live files matched their commit bytes. Production 393 px and desktop Chromium passed all four Grade 9 paths in EN/TA. |
| Remaining confirmed defects | [PR #321](https://github.com/vigneswaranmba20-afk/Triggle/pull/321) on `audit-fix/af10-outstanding` is based on the merged navigation release. | See the ledger for live status. |

## Recovered changes

- PR #283 retained Gemini’s bilingual first-screen givens, overlap control, both cardinality expressions and the three-set inclusion-exclusion bridge. The original five-operation Venn lab from [PR #280](https://github.com/vigneswaranmba20-afk/Triggle/pull/280) passed an independent production-browser retest.
- For an overlap of k students, the four regions are 14 − k, k, 11 − k and 5 + k. The union is 25 − k and the total is 30 for every integer k from 0 to 11. At k = 6 the regions are 8, 6, 5 and 11. A member of all three sets contributes 3 − 3 + 1 in inclusion-exclusion, which counts them once. The independent example gives 21 + 18 + 17 − 7 − 6 − 5 + 2 = 40.
- PR #315 retained Gemini’s top controls on Sets, Real Numbers and Probability and the bottom dock. The conflict resolution preserved the fourth pathway, Mensuration, along with Grade 10 navigation, cache entries and existing content. The final top control invokes the same index return as the bottom control. The index return replaces the current history entry. Stepping between lessons creates history entries.
- A CI run exposed an ordering mismatch between the new query parameter and the existing TRACE media adapter. The reconciled head restores the order the adapter reproduces. The original TRACE assertions passed without changes.

## Verification and uncertainty

The Sets slider passed all 12 integer overlaps at 393 px in both languages. At each setting, the test checked two cardinality expressions, five region and total outputs, and the boundary state of the step buttons.

Students’ existing Sets and Real Numbers progress keys survived Next, Back and a language switch. The tested top buttons measured 9.36:1 text contrast at 393 px. Offline cold deep links passed for all four Grade 9 pathways both locally and on the production worker. The production worker test used a browser-specific accommodation for the workspace proxy certificate.

| Command or check | Result |
|---|---|
| `node site/tools/test_set_language_journey.cjs`, `node site/tools/test_set_venn_figures.cjs`, `node site/tools/test_exact_textbook_fidelity.cjs` | 3/3 passed on the recovered cardinality head |
| `node site/tools/test_g9_cardinality_aud01_browser.cjs`, `node site/tools/test_g9_venn_aud01_browser.cjs` | 2/2 local Chromium suites passed at 320, 360, 390 and 430 px in English and Tamil. Venn also passed with production as the origin. |
| `node site/tools/test_g9_ch9_probability_browser.cjs`, `node site/tools/test_g9_ch7_heron_browser.cjs`, `node site/tools/test_g10_ch6_concepts_browser.cjs` | 3/3 local Chromium suites passed on the reconciled navigation candidate, including touch, navigation, translations, KaTeX and existing offline tests. |
| `node site/tools/test_af09_ch6_fixes.cjs`, `node site/tools/test_af09_p0_fixes.cjs`, `node site/tools/test_af09_batch3_fixes.cjs` | 3/3 passed against the recovered source. These results support the ledger’s implementation column. |
| `python3 site/tools/test_trace_discriminant_release.py`, `python3 site/tools/test_trace_thales_release.py` | 10/10 assertions at the test-method level passed after restoring the existing parameter order. |
| Independent navigation smoke | 96/96 local cases and 16/16 live pathway/language/viewport cases passed across Grade 9 Sets, Real Numbers, Mensuration, Probability and the existing Grade 10 Chapter 2 and 6 pathways. Widths were 320, 360, 390, 393 and 430 px plus tablet, desktop and landscape. First, middle and final controls, keyboard, focus, top/bottom controls and Back/Forward passed. An exploratory assertion about retaining the final lesson in history failed because both existing return controls replace the current entry. |

PR #283 source review used the Grade 9 2025 English printed pp. 29 and 32 (PDF 35 and 38) and Tamil printed pp. 30, 31 and 34 (PDF 36, 37 and 40). The page images corroborate the two-set count and complement formulas and the three-set identity. English p. 23/PDF 29 and Tamil p. 25/PDF 31 show both distributive laws and Fig. 1.29. The toy member lists are Triggle-authored practice. The Sets symbols and set-difference formulas were also checked against actual English and Tamil page images. The Probability footers were matched to the ten printed section pages. Tamil editorial signoff and 2026–27 edition parity remain pending. [English PDF](https://drive.google.com/file/d/1WxLnjLPhAGkTylUHNFvh8UL34Z8eqC4J/view) · [Tamil PDF](https://drive.google.com/file/d/1gp6z1UOuqoH6MCuZt_qNi492R3vZUWaj/view)

A separate Probability Q5 source citation discrepancy remains. English PDF 308 and Tamil PDFs 324–325 show the 860/370/250 table and question. The current record uses Tamil PDF 335, an answer page from another chapter. Automatic review declined updating the preservation-fixture hash. The canonical question data and preservation guard remain intact.

The connected audit workbook also has a later Grade 10 Chapter 8 audit. Its entries are outside the specified historical 46. The missing Chapter 1 and Chapter 8 concept pathways remain an original P0 curriculum gap. The remaining original P0 scope includes the two absent curriculum pathways and the missing semantic Relations and Functions table. P1 work includes the remaining Trigonometry concept SVG collision inventory and the centroid’s treatment of negative addends and rounded coordinates. P2 work includes the remaining Algebra and Coordinate Geometry page locators, consistent recurring-decimal notation, the scientific-notation addition rule, and the Chapter 1 semantic table. The ledger identifies further per-route live checks on merged changes. [Original audit workbook](https://docs.google.com/spreadsheets/d/1jWqBgH2k2zQHEe3_JlgUHE2QXMx0d67X0W2RuEt2n6U/edit#gid=0)

[Production Sets Venn](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=9&chapter=g9-ch1&section=concepts&concept=3) · [Cardinality](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=9&chapter=g9-ch1&section=concepts&concept=6) · [Probability](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=9&chapter=g9-ch9&section=concepts&concept=1) · [Mensuration](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=9&chapter=g9-ch7&section=concepts&concept=0) · [Trigonometry quotient lab](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html?class=10&chapter=g10-ch6&section=concepts&concept=1)

## Recovered release regressions

PR #321’s first required run exposed a lost static Venn default contract. A subsequent run exposed duplicate Sets explanation disclosures in the typography suite. Both behaviors were restored in the application, and the original checks remained intact. The most recent candidate, [7997280](https://github.com/vigneswaranmba20-afk/Triggle/commit/7997280dd1838fafc47e07795801ffb94726b145), also corrects the five Probability concept count in the menus. [First gate](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/44871414749) · [Browser shard](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/44872114317/job/136748990949)

## Scorecard

| Measure | Count or status |
|---|---|
| Total original findings | 46 |
| Closed and live-verified | 28 |
| Fixed but awaiting live verification | 10 |
| Open or blocked | 8 |
| Critical regressions | 0 confirmed in executed checks |
| Required tests passed | PRs #283 and #315 2/2 required gates. PR #321 verification in progress. |
| Open audit PRs remaining | 1, PR #321. Both recovered PRs merged. |
| Latest confirmed Pages build SHA | `7ba03389e1706f98bb7a950977a20f5282b73214` |
| Deployment independently verified | NO for the complete mission |
