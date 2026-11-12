# TRACE — manual, offline curriculum reconciliation

## Current implementation (12 November 2026)

The current tool extends the existing bulk engine. It reads all runtime data modules, pins open-PR evidence to commit SHAs, and writes a source/math/editorial/deployment ledger and gap report. The original v0 observations below are historical evidence. They are not newly checked source pages.

From the repository root:

```bash
npm run test:trace
npm run trace:reconcile -- --report /tmp/triggle-reconciliation
npm run trace:dry-run -- --state-dir /tmp/triggle-trace-private --report /tmp/triggle-broker.json
```

The last command uses a **labelled synthetic mock**, with a USD 0 budget and one item. It makes no HTTP requests. Private state directories must have mode 0700. No paid provider test applies: this version installs no live provider adapters and has no spending authorization.

The reconciliation uses `open-pr-snapshot-20261112.json`, containing metadata from the connected GitHub app, and pinned objects from the local clone. It **does not refresh GitHub itself**. Run `git fetch origin` and refresh the snapshot through the connected GitHub app before treating a later report as current. Each PR requires `number`, `url`, `state`, `draft`, `base_sha`, and `head_sha`. Deleted/unavailable commit objects fail closed. PR JavaScript is scanned for literal candidate IDs, never executed. JSON candidate records are indexed conservatively. Documentation-only source/math audits are listed separately and require review; their solutions are not silently treated as absent or integrated.

The ledger is reproducible from source modules, the existing bulk manifests/verifiers, the pinned PR snapshot and the v0 intake snapshot. Only `loadRuntime(..., {trace:true})` adds module registration history; the ordinary runtime result is unchanged. The existing publisher, leases and integration gates remain authoritative. There is no scheduler, student UI, service-worker or curriculum-content change.

`reports/2026-11-12/ledger.json` is the canonical generated checkpoint; its CSV projection supports review. `ledger.schema.json` describes the contract, and `validateReport` blocks invalid stage types, identities, provenance and summary counts. `gaps.csv` includes all 41 chapters. Whole-project denominators stay unknown. The 53 missing parts come from the existing verified Grade 12 Chapter 1 inventory; they are a lower bound, and are not necessarily unworked in draft audits. `expectedMissingParts` retains their canonical IDs and source locators separately from available app records.

Ledger rows count **medium/part representations**, not unique completed questions. Stage totals include both available ledger rows and known missing-part rows; `stagePopulationMediumPartRows` records that denominator. `appId` retains the exact progress/deep-link identity. Grade 12 source volumes are matched by PDF digest against the book manifest. A `whole` record is never silently split to claim coverage of every labelled subpart. Equal text, whitespace-normalized text and equal numbering only identify review candidates. Canonical-label collisions preserve every app ID and flag all affected rows. No automatic source-equivalence merge occurs.

Stages are independent evidence states: true = established by this adapter's stated evidence, false = not established by this adapter, null = unknown/not rechecked. Source and mathematical checks are inherited from passing bulk-engine validation, bound to the exact record hash. Merged means the contributing runtime module's bytes match the pinned main commit. No deployment or live verification follows from that fact. Professional Tamil review and release readiness are never inferred from generated or bilingual text.

**Access limits:** connected Drive search located all twelve PDFs, and the English Grade 10 raw-file fetch succeeded. No textbook page image was inspected during this tooling run. Original W1–W5 ZIPs were absent locally and Drive search found no `G10_W` files; ChatGPT Library access was unavailable. The 16-item comparison therefore reuses the explicitly labelled historical intake snapshot. The old `published_legacy_evidence.json` contained an access-error string rather than JSON; it is preserved as `.error.txt`, and the replacement contains reproducible base-module labels only.

See [execution evidence and decisions](EXECUTION-2026-11-12.md) and [the offline broker contract](BROKER.md). The pilot remains **NOT_STARTED**: 60 eligible unworked source-verified parts and independent bilingual reviewers have not been established. No acceleration result is claimed.

---

## Historical TRACE v0 intake

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
