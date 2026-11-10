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
