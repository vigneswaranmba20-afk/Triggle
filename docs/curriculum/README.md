# Triggle bulk curriculum production

This is the repeatable content workflow for Grades 9–12. It follows the Grade 10 Chapter 1 module and renderer contracts: `answer` remains a string, `steps` remains an ordered array of language keyed explanations with optional `eq`, and new textbook items register additively. The curriculum in `site/data/curriculum.js` remains authoritative. Do not change the Adaptive Continuous Reader during content work.

## Sources and inventories

Search the connected owner's Drive first, then owner supplied official files, official SCERT sources, and existing verified committed content. `sources.json` records files located on 10 November 2026; it does not certify their wording. Read the actual imprint, contents and target pages. Never infer an edition from another grade. PDFs stay outside Git. Record SHA-256, grade, language, volume, edition, Drive URL, printed pages and PDF pages. Inspect page images when extracting mathematical notation and required figures. English wording must match the source; Tamil wording must come from the matching Tamil source. Unverified Tamil stays pending, without translated textbook claims.

`grade-N/batches/*.json` is the single authoring source for each batch: runtime records, the independently reviewed exercise inventory, source snapshots and record-to-question/subpart mappings. Generated JavaScript is not separately edited. Use a complete chapter when feasible; otherwise use a natural exercise boundary. A candidate text extraction is a worklist to review, never a verified inventory. Explicitly record all exercise headings, numbered questions, subparts, MCQ options, figures, tables, graphs and answer-key locators. Source ambiguity blocks that item; it does not justify invented text.

Keep four distinct measures: numbered textbook questions, app records, solved subparts, and verified records. A chapter denominator is known only after every exercise heading and numbered question is reconciled against the source. A complete exercise is not a complete chapter. Unknown denominators remain null and have no percentage. Existing records without equivalent evidence are preserved and reported separately from newly verified content.

## Commands and quality gates

Run `node site/tools/curriculum_bulk.cjs --help` for the current command contract and read [the authoring schema](SCHEMA.md). The engine supports runtime inventory, candidate extraction, batch validation, additive registration, per-grade checkpoints and locks. Batch validation requires exact source mappings, complete subpart coverage, schema and global ID checks, nonempty worked steps and final answers, existing required figures, and independent mathematical evidence bound to the current record contents. Reports are machine readable. A passing structural check alone cannot certify a proof or source inspection.

For each batch, independently solve the problem before comparing with the textbook key. Use substitution, Euclid identities, rational arithmetic, domain checks, set enumeration or suitable symbolic checks. Proof questions require a reviewed general argument; examples alone are insufficient. A verifier must examine the actual records and report every covered part. If one item fails, repair that record and its evidence, rerun its checks, then reconcile the exercise. Do not regenerate completed chapters.

Register the module after its base grade and `curriculum.js`, before the app; append the new IDs to that chapter's `textbookQuestionIds`. Check that every item appears in chapter navigation. Register the module and any figures in the service worker and change the cache version for changed offline assets. Keep Grade 10 Chapter 1's original files, 69 numbered questions, 74 app records, seven exercise groups and three figures unchanged.

Before merging run `npm test`, `npm run test:browser`, all affected batch validators and the repository's required CI checks, including the Grade 9 usability job. Do not disable a gate. Browser checks cover chapter entry, all new deep links, Previous/Next, final answer in How It Works, required figures, truthful Tamil handling, mobile overflow, continuous-reader behavior and an offline reload. Store validation reports and update the grade checkpoint with actual results.

## Isolated runs and integration

1. Fetch remote `main`; inspect open PRs, grade checkpoints and currently active work before choosing content. Do not blindly merge a historical curriculum branch or generate a duplicate draft for already completed questions.
2. Acquire the grade's remote lease with `acquire-lease --grade N --report /tmp/triggle-grade-N-owner.json`, then work on an isolated grade branch/worktree. The lease atomically claims `refs/heads/triggle-locks/grade-N` and saves ownership in the Git common directory. It persists across model tool calls until explicit release. Separate checkouts contend on the same remote ref. A held ref or unavailable authenticated push blocks conflicting production. Local filesystem locks also coordinate worktrees sharing a Git common directory; they cannot coordinate separate executors alone.
3. Select the earliest incomplete source verified chapter/exercise. Preserve old IDs and unrelated grade files. Write the batch and independent verifier, then validate, register and test it.
4. Acquire the shared remote lease using `acquire-lease --integration --report /tmp/triggle-integration-owner.json` while changing shared script registration/cache/package files, refreshing latest `main`, resolving conflicts and checking the proposed merge. The engine's local integration lock protects deterministic registration too. Always revalidate against the current main before merging.
5. Commit real work, open or update one grade PR, wait for required CI at the exact head SHA and merge only when all release gates pass. The existing main push workflow publishes Pages. No content-generation Actions cron is added.
6. Confirm the Pages workflow completed for the merged commit. Open the live app, inspect the new question/steps/answer and language behavior, and confirm assets and offline caching. Record commit, PR, deployment and next batch in the grade checkpoint. Never call an unmerged draft deployed.

Lock ownership is explicit. Release each persistent lease with `release-lease --grade N --expected-sha SHA` or `release-lease --integration --expected-sha SHA`, using its saved exact owner SHA. The remote deletion is guarded by a compare-and-swap lease. Do not silently steal a stale lock; inspect the owning process/run before manual recovery. A killed run leaves an inspectable remote claim. For deterministic child commands, `lease --grade N -- COMMAND [ARGS]` acquires/releases automatically and permits inherited nesting; a multi-tool model run uses persistent acquire/release. On errors retain actionable diagnostics and release only owned locks. Per-grade progress uses atomic replacement; no run rewrites another grade's checkpoint. Integration changes always need shared coordination.

## Scheduling

The four existing ChatGPT tasks are `Triggle Grade 9 Bulk` (:00), `Triggle Grade 11 Bulk` (:15), `Triggle Grade 10 Bulk` (:30), and `Triggle Grade 12 Bulk` (:45), hourly in `Asia/Kolkata`. Copy-ready prompts and the migration checklist are in `schedules/`. Only a supported scheduler update followed by readback establishes a saved change. A Markdown file does not change a schedule. Do not create duplicates or substitute Codex-only tasks for existing ChatGPT tasks.

Each future run follows: latest state → missing verified content → bulk solutions → independent verification → integration → tests → eligible merge/deploy → measured progress → next batch. Source access, execution environment and GitHub permissions must be checked in the actual scheduled run; saved prompts do not provision those capabilities. Report actual blockers and continue independently verifiable work. Do not make empty activity commits.

## First execution evidence

`audit-2026-11-10.json` records the baseline runtime audit and preserved hashes. The pilot covers Grade 10 Chapter 2 Exercise 2.1 only; its completion does not establish Chapter 2's full denominator. Historical drafts for Grades 9, 11 and 12 remain subject to source, integration and mathematical reconciliation. No full bilingual chapter is certified by this workflow setup.
