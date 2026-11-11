# TRACE v0 — read-only intake and reconciliation

Date: 2026-11-12. Scope: the five 2026-11-11 Grade 10 staging ZIPs only.

This tool reads existing WIP archives and optional PR/live evidence. It **does not** solve new textbook problems, certify English/Tamil translations, validate original source images, change the live site, update scheduled workstreams, or publish curriculum.

## Run locally

```bash
python3 trace_intake.py \
  --zip-dir /path/to/five-staging-zips \
  --drafts draft_evidence.json \
  --published published_legacy_evidence.json \
  --output /tmp/trace-report
python3 -m unittest -v test_trace_intake.py
```

Evidence inputs are manually curated snapshots and are not live GitHub API queries. Published legacy labels are **possible matching exercises only**, not proof of 2025 textbook identity. PR 114 remains an unmerged draft.

## Observed output

- 5 WIP archives; 16 records total, representing 14 newly checked in the most recent scheduled runs plus 2 carried-forward placeholders.
- 16 unique stage IDs; zero duplicate IDs across these specific five archives.
- 6 IDs overlap with the known unmerged PR #114 1.2 draft.
- 3 staged items match earlier-edition Grade 10 lesson labels in the base class-10.js, but not confirmed 2025 equivalents or validated as full production inventory.
- 8 records do not contain structured step arrays; some carry their worked solutions in markdown instead. This is a schema normalization issue, not proof their solution is missing.
- 14 records report Tamil editorial review pending.
- No chapter is complete; no files deployed in this intake.

## Operational rule

Read-only inventory first. Do not let an intake adapter promote a candidate to 'verified', 'human-reviewed', 'complete', or 'live'. Compare against 2025 textbook pages and app content before release. Integration requires the repository's existing `site/tools/curriculum_bulk.cjs` authoring engine, lock protocol, CI and Pages checks. Avoid rebuilding that engine. Preserve all legacy IDs and progress.

## 60-question pilot protocol (NOT started)

1. Complete a source-page-verified inventory and identify 60 *unworked* questions across several problem types and grades.
2. Stratify by topic, difficulty, diagrams, medium and source pages, then seed/randomly assign 30 to existing process and 30 to TRACE. No post-hoc exclusions.
3. Both arms use identical independent mathematical and bilingual QA. Track timestamps, token costs, corrections and source mismatch rates per accepted unique item.
4. Minimum adoption threshold: at least 30% lower median labor+runtime per accepted item, no observed new correctness faults. A zero-fault 30-item arm is not a guarantee of low future error rate, so maintain full verification beyond the pilot.
5. Keep five scheduled Grade 10 extraction streams unchanged; a separate integrator consumes a chapter only once reconciliation and gates pass.

## Known blockers

- Full Grades 9–12 exercise denominators are not yet established.
- Grade 10 Statistics Exercise 8.1 Q5 source disagreement: EN says nine, TA says ten workers; both provide nine wage values.
- Actual live site includes dynamically loaded modules in addition to `site/data/class-10.js`; a base class-10 snapshot cannot certify all live coverage.