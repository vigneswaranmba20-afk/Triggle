# Existing Triggle schedule migration

These files contain the complete replacement prompt bodies for the four existing ChatGPT tasks. Copy the entire matching `grade-N.md` body into the existing task's Prompt field. Updating a Markdown file does not change a scheduled task. Do not create replacements or alter other automations.

Confirmed on 2026-11-10: the supported scheduler returned successful prompt-only updates for these four existing task IDs, and individual readbacks matched the replacement files exactly. Titles, enabled states, schedules, timezone and timing modes were preserved. See `migration-evidence.json`; future execution capabilities remain unverified.

| Existing task title | Existing task ID | Preserve hourly local minute |
|---|---|---|
| Triggle Grade 9 Bulk | `6aeefa4b68c88191bb7ee58c88b0be10` | :00 |
| Triggle Grade 11 Bulk | `6aef7206c7488191b0ea66731148eda5` | :15 |
| Triggle Grade 10 Bulk | `6aef7114b3d48191bafbed5ab27f398d` | :30 |
| Triggle Grade 12 Bulk | `6aef720b16888191b620978b5426ac91` | :45 |

All four were observed enabled with `default_timezone=Asia/Kolkata`, `timing_mode=exact_schedule`, and inherited environments whose details were unavailable. Their latest recorded runs were completed at audit time; this is not proof that a new run cannot start. They are ChatGPT tasks (`is_self_owned_automation=false` for this Codex agent). A supported `automations_update` interface was discovered; confirmation must come from the actual update and readback.

## Exact update checklist

1. Finish and validate the shared engine, workflow documentation and these prompt files. Read the latest remote-main state before applying prompt changes. If the engine has not yet merged, the updated task must fail closed until that required code is available; a saved prompt is not evidence of a deployed runner. Merge the implementation only after required checks pass.
2. Privately look up the four IDs using the available scheduler's supported read interface. Recheck title, ownership/access, prompt, enabled state, timezone, schedule, timing mode and recorded active runs. Preserve current schedules byte-for-byte. If a run is already active, a prompt update affects future runs; reconcile that run's branch/PR before concurrent production.
3. For each existing task, use supported update with only its ID and replacement `prompt`. Leave title, schedule, timezone, timing mode, enabled state and execution environment omitted and unchanged. No task creation is necessary. Stop if connection or approval is requested; never bypass it.
4. Read each saved task back. Verify the prompt equals the corresponding file byte-for-byte, its ID/title are unchanged, it remains enabled, and timezone/schedule/timing mode equal the pre-update values. Record returned update timestamps and SHA-256 prompt/schedule hashes in `migration-evidence.json`. Do not claim success from a local file edit or an attempted tool call.
5. Verify the four saved local minute offsets remain Grade 9 :00, Grade 11 :15, Grade 10 :30 and Grade 12 :45, in Asia/Kolkata. Grade 9's original RRULE has no BYMINUTE: its DTSTART minute is 00 and must be preserved.
6. Report exactly which updates were confirmed. If management access is unavailable or restricted to Codex-owned tasks, leave the four ChatGPT task definitions pending and give the owner these four copy-ready bodies plus this checklist. Never substitute Codex tasks, duplicate tasks or an AI-generating GitHub Actions schedule.
7. On the next recorded run, verify actual execution environment, latest-main checkout, source access, grade claim, required test execution and release evidence. Inherited environment metadata alone does not establish any of those capabilities.

## Shared commands and coordination

The workflow is [../README.md](../README.md). Each grade owns `docs/curriculum/grade-N/checkpoint.json`, `docs/curriculum/grade-N/batches/*.json` and the chapter inventories `docs/curriculum/grade-N/chapters/*.json` used to reconcile completion across exercise batches. Typical deterministic commands (replace N and BATCH):

```sh
node site/tools/curriculum_bulk.cjs inventory --grade N
node site/tools/curriculum_bulk.cjs extract --text /tmp/source-text.txt
node site/tools/curriculum_bulk.cjs validate BATCH --report /tmp/batch-report.json
node site/tools/curriculum_bulk.cjs register BATCH
node site/tools/curriculum_bulk.cjs validate BATCH --integrated --report /tmp/integrated-report.json
node site/tools/curriculum_bulk.cjs checkpoint --grade N
```

Extraction output is a candidate worklist, never a certified textbook denominator. Review the current CLI/schema before invoking it. For model work spanning tool calls, acquire a persistent atomic remote grade lease using `node site/tools/curriculum_bulk.cjs acquire-lease --grade N --report /tmp/triggle-grade-N-owner.json`, and save the returned SHA. It reserves `refs/heads/triggle-locks/grade-N` until explicitly released. Before shared writes, acquire `acquire-lease --integration --report /tmp/triggle-integration-owner.json` and hold its returned `refs/heads/triggle-locks/integration` owner SHA across latest-main refresh, registration, final checks and merge/deployment coordination. In the run's final/finally cleanup, use `release-lease --integration --expected-sha SHA`, then `release-lease --grade N --expected-sha SHA`, each with its exact saved owner SHA. The compare-and-swap guard requires authenticated git push, fails closed when authorization is missing or a lease is held, and releases only saved ownership. Never steal or remove another executor's stale lease. If the runtime, engine or credential/lease interface is unavailable, report the actual blocker; prompt updates do not provision an execution environment. The `lease --grade N -- COMMAND [ARGS]` wrapper is appropriate only when a real executable child can run the entire intended operation; it does not itself run a model across tool calls. Local `lock --grade N`/`lock --integration` common-git-directory guards remain additional protection for worktrees on one checkout host; PR inspection and those local locks alone do not coordinate separate machines. Inspect open PRs and remote active work in addition to leasing.

Existing drafts are reconciliation leads, not proof of validated content: Grade 9 #118, Grade 10 #37, Grade 11 #40, Grade 12 #38. Inspect current PR state rather than repeatedly appending work to divergent branches. Grade 10 Chapter 1 is already preserved complete and must not be regenerated from those drafts.

## Evidence interpretation

`migration-evidence.json` records the audit and current update/readback status without storing enormous historical prompt bodies. The evidence may show `prepared` or `pending`; those states mean the ChatGPT definitions have not been confirmed changed. A future run and a successful deployment are separate events and must be verified separately.
