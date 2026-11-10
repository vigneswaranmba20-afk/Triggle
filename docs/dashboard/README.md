# Triggle Mission Control (retired)

The owner-facing Mission Control dashboard was removed at the owner's request on 2026-11-10. Both old URLs (`/Triggle/dashboard/` and `/Triggle/site/dashboard/`) now redirect to the public mathematics learning homepage. The independent Teacher Review page remains available at `/Triggle/site/teacher-review.html`.

The notes below describe the previous dashboard implementation for historical context only; it is no longer published as a dashboard.

---

# Archived implementation notes

Owner bookmark: **https://vigneswaranmba20-afk.github.io/Triggle/dashboard/**

Former canonical dashboard: **https://vigneswaranmba20-afk.github.io/Triggle/site/dashboard/** (redirects to lessons)

Teacher Dashboard: **https://vigneswaranmba20-afk.github.io/Triggle/site/teacher-review.html**

The Pages API reported `build_type: legacy`, `main /` on 2026-11-10. The repository-root `/dashboard/` redirect supports that configuration. The Actions workflow now stages the same repository layout (maintained app under `/site/` plus root redirects), eliminating different asset URLs between publishers. No hosting configuration changes are required. Historical teacher and student URLs retain their existing redirects.

## Evidence and metrics

Run `npm run status:build` after a curriculum/checkpoint change; commit `site/data/project-status.json` with that change. `npm run status:check` and `npm test` reject stale projections. The builder loads the real student runtime in script order and runs the existing integrated batch validators and chapter reconciler. Input file hashes and the most recent source commit are recorded. CI checks out full history for reproducible source timestamps.

- A navigable exercise **record** can contain multiple mathematical tasks/subparts. Neither quantity is a whole-grade denominator.
- Strict verified counts use passing integrated bulk batches. Deployment additionally requires the checkpoint's successful live verification and matching module hashes. Grade 9 inherited visual evidence and the preserved Grade 10 Chapter 1 accepted reference are labelled separately; they are not silently added to strict verified totals.
- Chapter bars show completed English chapters / catalogued chapters. They do not represent full bilingual or teacher approval.
- `null` denotes unknown. Whole-grade denominators and exact first gaps without source inventories remain unknown. Known remaining tasks are a lower bound.
- Deployment/build, merge, mathematical verification and teacher approval are separate facts. Public teacher statistics remain unavailable without an explicitly approved aggregate feed.

At this source checkpoint: Grade 9 has 304 available exercise records and 38 records / 42 tasks of separately recorded inherited visual evidence; Grade 10 has 101 available records, including the accepted 69-question / 74-record Chapter 1 reference and 10 strictly validated Chapter 2 records / 13 tasks; Grade 11 has 16 available legacy exercise records and no strict validated batch; Grade 12 has 51 available exercise records, including 38 strictly validated Chapter 1 records / 23 numbered questions / 42 tasks out of 63 numbered questions / 95 tasks. Grade 12 Chapter 1 still lacks 40 numbered questions / 53 tasks. All grades' whole-grade denominators and full Tamil editorial review remain pending.

Next manual curriculum task: **Grade 12, Chapter 1, Exercise 1.4, Q1(i)**, English volume 1 printed page 35 / PDF page 43. The source inventory lists Q1(i–iv), Q2, Q3, Q4 and Q5 for this exercise. Reopen the matching English and Tamil original page images before authoring. No new questions or source verification were performed in this dashboard session.

## Deployment centre

`node site/tools/refresh_deployment_status.cjs` performs an explicit public GitHub API snapshot refresh and compares canonical live teacher asset bytes with the successful Pages build commit. Set the runtime's normal proxy support if required (for Node 24 managed proxies, `NODE_USE_ENV_PROXY=1`). It never uses or embeds a token. Commit the timestamped snapshot only after reviewing it.

The browser's Refresh button queries public commits, PRs, CI, issues and Pages builds with bounded requests. If a request fails or is rate limited, the last checked snapshot remains labelled with its timestamp and age. A successful build alone is not an interactive live verification. Public API results are not written back into project files.

## Manual operation and privacy

Every backlog item prepares a scoped prompt for the owner to copy manually. There is no execution API, recurring job, automatic Codex invocation or privileged browser token. The dashboard never calls Firebase or reads private teacher feedback. Teacher remarks can only be copied/exported from the authorized Teacher Dashboard and must stay out of public issues, commits, static JSON, URLs, logs and screenshots.

## Verification

`npm test`, `npm run test:browser`, and `npm run test:security`, and `npm run test:webkit` cover source projection, unknown denominators, prompt contents, deployment metadata, public/private separation, mobile layouts, startup fault recovery, controlled authentication, inbox/handoff and actual emulator-enforced rules. Controlled SDK tests are explicitly labelled; they are not production Google login tests. Live authorized-account login, authorized submission and unapproved-account denial require owner-assisted account testing.
