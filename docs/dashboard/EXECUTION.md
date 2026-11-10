# Dual dashboard execution checkpoint — 2026-11-10

Scope: manually initiated development only. No recurring automation was read or changed. No curriculum questions, stable IDs or student navigation were changed.

## Phase 1: loader recovery implemented

Baseline: main e787ed5. Dedicated branch: feat/dual-dashboard-reliability.

Evidence: fault-injected blocked Firebase SDK and CSS on the original page in Chromium. The original message remained “Loading secure review access…” with no visible sign-in or Retry. Static ESM dependency errors occur before the original module's try/catch runs. This reproduces an indefinite-loading mechanism; it does not prove the historical Android screenshot's network cause. No evidence implicates browser translation.

Public HTTP probes on 2026-11-10: /Triggle/site/teacher-review.html, CSS, application module, configuration module and Firebase 13.2.0 SDK returned 200 with correct MIME types. /Triggle/assets/teacher-portal.css returned 404; Pages API reported legacy main / source, despite an Actions workflow that uploads site/. The public canonical teacher URL is /Triggle/site/teacher-review.html under that configuration. Compatibility redirects already exist for artifact hosting.

Implemented: independent inline startup controller, explicit eight states, 12-second configurable watchdog, caught dynamic module import, critical fallback CSS, English/Tamil recovery text, reload-based Retry with fresh URL, server-only authorization grant reads, stale callback guards, auth observer cleanup, duplicate submission guard, popup cancellation message, bounded curriculum/history requests, and exclusion of teacher/status assets from student service-worker caching.

Passing targeted checks: test_teacher_portal_loader.cjs; test_teacher_startup_browser.cjs (SDK/module/CSS failures, delayed authentication/authorization, offline/reconnection, Retry, 320/390/430px). These are controlled browser tests, not live Google authentication or production Firestore authorization tests.

Next: generated public project status and Owner Dashboard; authenticated inbox and auditable correction handoff. Complete full local/CI and live gates before release. Live authorized Google sign-in requires an approved account and interactive user session; no credentials are available to this executor.
