# Dual dashboard execution checkpoint — 2026-11-10

Scope: manually initiated development only. No recurring automation was read or changed. No curriculum questions, stable IDs or student navigation were changed.

## Phase 1: loader recovery implemented

Baseline: main e787ed5. Dedicated branch: feat/dual-dashboard-reliability.

Evidence: fault-injected blocked Firebase SDK and CSS on the original page in Chromium. The original message remained “Loading secure review access…” with no visible sign-in or Retry. Static ESM dependency errors occur before the original module's try/catch runs. This reproduces an indefinite-loading mechanism; it does not prove the historical Android screenshot's network cause. No evidence implicates browser translation.

Public HTTP probes on 2026-11-10: /Triggle/site/teacher-review.html, CSS, application module, configuration module and Firebase 13.2.0 SDK returned 200 with correct MIME types. /Triggle/assets/teacher-portal.css returned 404; Pages API reported legacy main / source, despite an Actions workflow that uploads site/. The public canonical teacher URL is /Triggle/site/teacher-review.html under that configuration. Compatibility redirects already exist for artifact hosting.

Implemented: independent inline startup controller, explicit eight states, 12-second configurable watchdog, caught dynamic module import, critical fallback CSS, English/Tamil recovery text, reload-based Retry with fresh URL, server-only authorization grant reads, stale callback guards, auth observer cleanup, duplicate submission guard, popup cancellation message, bounded curriculum/history requests, and exclusion of teacher/status assets from student service-worker caching.

Passing targeted checks: test_teacher_portal_loader.cjs; test_teacher_startup_browser.cjs (SDK/module/CSS failures, delayed authentication/authorization, offline/reconnection, Retry, 320/390/430px). These are controlled browser tests, not live Google authentication or production Firestore authorization tests.

Next: generated public project status and Owner Dashboard; authenticated inbox and auditable correction handoff. Complete full local/CI and live gates before release. Live authorized Google sign-in requires an approved account and interactive user session; no credentials are available to this executor.

## Phase 2: public Mission Control core implemented and targeted-tested

Generated site/data/project-status.json uses the existing runtime loader, bulk validators, authoritative inventories and scoped deployment hashes. Strict deployed batches: 55 tasks (Grade 10: 13; Grade 12: 42). Known remaining tasks: 53 in Grade 12 Chapter 1; other denominators unknown. Grade 9 inherited visual evidence and Grade 10 accepted Chapter 1 reference remain separately labelled. First task rechecked: Grade 12 Chapter 1 Exercise 1.4 Q1(i), printed 35 / PDF 43. No curriculum changes were performed.

Owner path: /Triggle/dashboard/ redirects to /Triggle/site/dashboard/ under current legacy main-root Pages. If Pages uses the existing Actions site/ artifact, /Triggle/dashboard/ is the dashboard itself. No hosting settings were changed.

Passing targeted checks: test_project_status.cjs and test_dashboard_browser.cjs: accurate counts/unknowns, prompt scope and clipboard, filters, grade/chapter/exercise/question links, browser Back, API failure with aged snapshot, manifest failure, no private-backend requests, no overflow at 320/390/430/1280px. Deployment snapshot fetched from public Pages builds API: successful e787ed51bc55fbca3e369feba12e03e54f8de2c1; canonical teacher HTML/module bytes matched that commit. Snapshot timestamps remain explicit; refresh is manual.

## Phase 3: authenticated inbox and correction workflow

Implemented a private paginated feedback inbox with grade/chapter/exercise/question/decision/status/date filters, selected-feedback copy/export, correction categories, English/Tamil question view, existing figures, and escaped native mathematics rendering. No public API fetches private records. Sign-out/session loss clears notes and exports.

New Firestore rules atomically pair each correction projection transition with immutable history, bind the original correction report/hash, require evidence and a fresh hash-specific teacher approval after re-review. Real demo Firestore emulator tests passed for anonymous/unapproved/non-Google/revoked denial, forbidden grant mutation, review creation, immutable history, all lifecycle states, invalid jumps, missing history, blocked recovery and stale/wrong-hash approvals. Controlled browser tests passed for authentication/cancellation, denial, login reload, server-grant outage, version hashes, inbox/handoff, duplicate submits, correction history and mobile widths.

Production blocker: `firebase login:list` reports no authorized accounts; managed environment has no Firebase deployment identity. New correction rules have NOT been published. Existing review rules safely deny correction collection reads/writes; UI marks tracking unavailable until publication. Review submission/inbox/manual handoff preserve the existing schema and permissions. Follow docs/teacher-review/SETUP.md to publish reviewed rules and perform real authorized/unapproved account tests.

Full `npm test` and `npm run test:browser` passed locally, including 105 preserved legacy deep links and existing offline Grade 9–12 routes. Production anonymous Firestore read probes were rejected by automatic approval review due possible private-data response; explicit user approval is pending. No rejected request was executed or bypassed.

## Safari engine hardening

Playwright WebKit 26.0 was installed. Initial execution lacked runtime libraries; official Debian libraries were downloaded/extracted into temporary user-owned storage, and a temporary launcher exposed them to the unchanged browser binary. No system libraries or repository security checks were disabled. Real WebKit tests then passed for both dashboards at 320/390/430px: prompts/filters/drill-down, MathML, private reviews/inbox/handoff, sign-out clearing, unauthorized denial, failed module/CSS recovery. Added `npm run test:webkit` and a required WebKit step to the existing validation workflow. This is Safari-engine coverage, not a physical iOS device or production Google-account test.
