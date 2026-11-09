# Triggle Grade 9 English — bulk throughput methods (2026-11-09)

Twenty methods ranked for this particular repository and accessible source, not universal rankings. Speed/quality/risk cells are engineering assessments, not fabricated timings.

| Rank | Method | Extraction speed | Integration speed | Math reliability | Setup | Repo fit | Cost/tokens | Bottleneck | Miss/wrong risk |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | Google Drive authenticated text extraction | Fast | Fast | Medium | Low | High | Low | Math glyph corruption | Medium |
| 2 | Typed exercise JSON generator | N/A | Very fast | High with QA | Low | High | Low | Schema drift | Low |
| 3 | Incremental Git tree/commit API | N/A | Very fast | High | Low | High | Low | Concurrent head updates | Low |
| 4 | Deterministic math checks (SymPy) | N/A | Fast | High for applicable | Low | High | Low | Proof/diagram not covered | Medium |
| 5 | Exercise boundary parsing | Fast | Fast | Medium | Low | High | Low | False positives in answer appendix | Medium |
| 6 | Question/answer-key alignment | Medium | Fast | Medium | Medium | High | Low | OCR/printed answer key errors | Medium |
| 7 | Chapter-parallel processing | Fast | Fast | Medium | Medium | High | Medium | Shared integration conflicts | Medium |
| 8 | PDF PyMuPDF extraction | Fast | Fast | Medium | Low | High | Low | Raw PDF access; glyph order | Medium |
| 9 | Direct GitHub ZIP and local patch | Fast | Fast | High | Low | High | Low | Stale ZIP overwrites changes | Medium |
| 10 | Google Drive PDF raw download | Fast | Fast | Medium | Medium | High | Low | Binary not local in current runtime | Medium |
| 11 | pdfplumber extraction | Medium | Fast | Medium | Medium | High | Low | Math layout/embedded fonts | Medium |
| 12 | Official textbook HTML ingestion | Very fast | Fast | High if existent | High | Medium | Low | No authoritative structured HTML found | Medium |
| 13 | Generated JS content modules | N/A | Very fast | Medium with QA | Low | High | Low | Dup IDs or missed registration | Low |
| 14 | Cached text-page extraction | Fast after cache | Fast | Medium | Low | High | Low | Outdated cache | Medium |
| 15 | Content deduplication templates | N/A | Fast | Medium | Medium | High | Low | Overgeneralized solutions | Medium |
| 16 | LLM exercise-level drafting | N/A | Fast | Medium with QA | Medium | High | Medium | Hallucinated transformations | High |
| 17 | Direct ZIP reconstruction | Fast | Fast | High | Medium | Medium | Low | Lost permissions/latest files | Medium |
| 18 | OCR-assisted fallback | Slow | Medium | Medium | High | Medium | High | Math notation hallucination | High |
| 19 | Visual PDF-page manual review | Slow | Slow | High | High | High | Medium | Review throughput | Low |
| 20 | Full GUI/browser regression per batch | N/A | Slow | Low math value | High | High | High | Time diverted from content | Low math risk |

## Primary decision
Use authenticated Drive PDF text (2025 SCERT source) → page/exercise-boundary extraction → structured JS modules → independently verified worked solutions → one atomic Git tree commit → controlled PR. Use visual PDF review for math glyphs and figures; keep those questions unresolved until reliable.

## Small representative benchmark / evidence
Source read: 502,124 characters from the connected 2025 PDF. Headings visible for nine chapters and 60 distinct exercises before the answer-key appendix. Human inspection of extracted samples: word problems and simple coordinate pairs generally legible; polynomial expressions around Exercise 3.1 become glyph-merged (e.g. superscripts, roots), while geometry figures lose usable layout. Mathematical reliability is therefore gated by source and math checks rather than PDF text confidence alone.
Three candidate extraction paths considered: (1) Drive PDF text extraction: successfully obtained readable text (selected). (2) standalone PyMuPDF/pdfplumber: not timed here because the authenticated raw PDF was not available as a local filesystem file. (3) online textbook PDF/HTML: references identified but no authoritative machine-readable HTML source that could be benchmarked at comparable fidelity. No invented end-to-end throughput benchmark is claimed.

## Testing policy
Keep exercise IDs/schema integrity, independent mathematical checks, script-load references, service-worker cache, and deployment status. Temporarily omit optional UI screenshots, cosmetics, animation profiling and full browser suites for this content-only batch. Shared HTML/SW references remain a minimal compatibility change.

## Isolation
Only Grade 9 English data modules and Grade 9 English tracking files are added; the two shared registration files receive only script references and cache entries. Other grades, Tamil curricula, automations and unrelated projects are not altered.
