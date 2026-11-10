# Triggle connector-native bulk execution when git DNS is blocked

## Why this exists

The ChatGPT automation cloud environment on 2026-11-10 repeatedly failed Git remote commands with `Could not resolve host: github.com`. The **connected GitHub API** remained accessible. The original engine's atomic remote leases are still mandatory; filesystem locks, branch naming, PR lists, or blind GitHub file updates are not adequate substitutes.

The GitHub connector provides **create_commit**, **create_branch**, **update_ref(expected_sha)**, **fetch**, **fetch_file**, **create_file**, **update_file** and PR/CI operations. This protocol uses the same `refs/heads/triggle-locks/grade-N` and integration refs as the Git CLI. Its persistent free marker is defined in `remote-lease-sentinel.json`. Both the Git CLI lease engine and connector CAS claimant must treat that exact SHA as FREE; any other head means HELD or UNKNOWN. This is a real remote compare-and-swap, **not** a local memory lock. A failed or unavailable connector action means STOP, not permission to proceed.

## One-time initialization (repository owner)

Provision exactly the five ref branches in `remote-lease-sentinel.json`, with **head SHA equal to `freeCommitSha`**, via the GitHub connector `create_branch` using the immutable free SHA. If a ref already exists, **read its head first; never reset an occupied lease**. An existing head that differs from the free SHA must be inspected by the owner, not overwritten. No student source, curriculum or main-branch file is modified by the free refs.

The owner ran a one-grade CAS proof on `triggle-locks/grade-9`: created the grade branch pointing at the free SHA, created a separate lease-owner commit, moved the grade ref with `update_ref(force=true, expected_sha=free)`, confirmed it held that owner SHA, then released it with `update_ref(force=true, expected_sha=owner)` back to free. The ref returned to the free SHA. In a separate attempt, a wrong expected SHA was rejected and the ref remained unchanged.

## Every scheduled run: connector-native route

1. Read latest main, current checkpointer, competing branches/PRs, `AGENTS.md`, `docs/curriculum/README.md`, `remote-lease-sentinel.json`, and the actual owner's connected source PDF pages. Confirm this run has the necessary GitHub connector write actions; do not claim success merely because a read succeeded. Use a unique, run-specific owner marker, UTC start, grade, and scheduled task ID. Never put passwords, secrets, or private teacher feedback in commit metadata.
2. **Preflight grade ref:** Read `GET /repos/vigneswaranmba20-afk/Triggle/git/ref/heads/triggle-locks/grade-N` through the GitHub connector. It MUST equal `freeCommitSha`. If missing, changed or unavailable, fail closed. Never steal a stale claim.
3. Fetch the free commit's tree SHA with the approved GitHub endpoint `GET /repos/.../git/commits/{freeCommitSha}`. Create an **owner commit** using `create_commit` with that unchanged tree, `parent_sha=freeCommitSha`, and a metadata-only message recording grade, unique owner and purpose. The owner commit never modifies content. Keep its returned SHA private to this execution's working context.
4. **Atomically claim:** `update_ref({repository_full_name, branch_name:"triggle-locks/grade-N", sha:ownerCommitSha, expected_sha:freeCommitSha, force:true})`. Confirm `success=true` then **read the remote ref again** and confirm its head equals the exact owner SHA. A rejected CAS means another run won; stop and report. A successful API response without a matching subsequent head is also a blocker.
5. Read the source and current grade data, author one verified batch. Use a unique grade branch based on fresh main through GitHub connector. Write the smallest complete batch via `create_file`/`update_file`, always passing the expected content SHA on updates. Do not edit another grade. Generated module files must match their batch source manifest, not hand-written divergent content. Use available local validation if possible. The required GitHub PR checks are the final gate; if local checks cannot run, do not claim local validation happened.
6. Before shared `site/index.html`, service worker, package/config or integration writes, claim `triggle-locks/integration` by exactly the same CAS protocol using a separate owner commit. Re-read main; reconcile any newer changes and conflicting PRs. Never claim a second holder's lease. Keep the integration claim until the merge/deployment coordination ends; if external writing/testing restrictions prevent correct integration, leave a draft, do not merge.
7. Open or update an isolated grade PR, wait for ALL required checks on its **current head SHA** (including `npm test`, `npm run test:browser`, Grade 9 usability, applicable source and math tests). No bypass. Verify actual source PDFs and mathematics before claiming completion; a passing CI run does not certify textbook correctness. Merge only eligible tested changes and confirm Pages deployment and live app.
8. **Release only owned refs**, in reverse order (integration, then grade). Read the current ref immediately before release and require exact owner SHA. Call `update_ref({repository_full_name, branch_name, sha:freeCommitSha, expected_sha:ownerCommitSha, force:true})` and confirm the ref reads back as free. A mismatch, timeout, lost execution context or uncertain ownership means **do not touch the ref**; report the exact ref and recorded owner for manual inspection. Do not release any claim another run created. Do not mark a failed/partial batch verified.
9. Record batch, verified question counts, PR, CI, merge, Pages URL and any blocked items. The existing four hourly tasks remain the scheduler; **do not add a cron job, duplicate tasks, or increase frequency**.

### Non-negotiable safeguards

- Do not put GitHub tokens in HTML, JavaScript, a branch or a textbook record. The connector is an authorized tool, not an embedded credential.
- Do not use `force=true` without **the exact** `expected_sha` matching the reference you intend to replace. If an API exposes only unguarded ref updates, this protocol is unavailable and production MUST STOP.
- If the GitHub connector cannot create an owner commit, cannot perform the protected CAS, or cannot read a ref after the claim, production MUST STOP. Never substitute a plain branch name or unprotected file edit.
- The connector route does not magically mount the Google Drive PDFs or provide a Git working tree. Verify those separately on each run. Where code execution is missing, only commit with supporting independent math evidence and require complete CI before merge.
- Do not move the free SHA or create new owner commits on the main branch.
- The source-first, chapter-inventory, figure, translation, mathematical and test requirements in the existing bulk README remain mandatory. Teacher-review feedback is not yet connected to scheduled production.
- If the Git CLI is available, the updated `remote_lease.cjs` also supports these persistent free refs and uses force-with-lease to atomically claim/release them. Existing legacy no-sentinel fixtures remain supported for local backward-compatible tests.

### Recovery

If an owner ref points to a commit other than `freeCommitSha`, read the commit metadata and inspect scheduled runs, PRs and the associated environment. No automatic TTL-based lease theft. An authorized owner may recover a confirmed abandoned claim using a separate **explicit** CAS update that provides the exact observed occupied SHA. Record why recovery was safe. Never use a broad force push or silently reset it.
