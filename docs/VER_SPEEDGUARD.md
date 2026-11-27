# VER SpeedGuard

Triggle — Samacheer Kalvi Mathematics (Grades 9 & 10) is a free, independent VER labs application for the Tamil Nadu State Board curriculum. The production build is staged by `site/tools/build_student_release.cjs`. The editable authoring page and teacher tools continue to use the source files.

## Checks

Run `node site/tools/test_speedguard.cjs` for the manifest, icon dimensions and budgets, staged resource inventory, sitemap, and initial compressed-size budgets. Run `CHROMIUM_PATH=/usr/bin/chromium node site/tools/test_speedguard.cjs --browser` for the browser checks. Omit the environment variable when using Playwright’s installed Chromium. Set `TRIGGLE_PREVIOUS_STAGE` to a locally staged previous production release to exercise a real release transition. Stage it from a separate checkout.

The risk-based CI runs the build checks on every change. Its full browser tier also covers installation UI states, cache growth, layout shift, question latency, localization, offline math and diagrams, and an interrupted worker install. The staged student regression compares complete question records and rendered solutions for all 17 chapters against the authoring runtime.

| Budget | CI limit |
| --- | ---: |
| English mobile home, predicted gzip transfer | 310 kB |
| Home startup JavaScript, predicted gzip transfer | 150 kB |
| Home stylesheets, predicted gzip transfer | 90 kB |
| Home foreground requests including the document | 16 |
| Unprompted external requests | 0 |
| Home layout shift | < 0.05 |
| Home cache, decoded response bodies | 1.75 MB |
| Home plus one Geometry chapter, decoded response bodies | 5.5 MB |
| Question switch p95, 20 samples, Chromium at 4× CPU slowdown | 400 ms CI ceiling, 200 ms product target |

The wire budgets estimate gzip bytes and omit headers. Browser timing ceilings have headroom for shared CI; compare repeated lab medians and tail measurements before changing budgets. Record the browser, throttling settings, tested routes, exact revision, run count, and raw measurements with a release.

## Cache lifecycle

The production worker is generated from `site/tools/student_service_worker.js` and uses one cache per release. Its signature changes with the shell, generated packs, worker logic, and local render assets. Installation verifies the shell signature and stores the required resources before activation. Chapter packs and diagrams are saved as students open them. KaTeX fonts are retained after the first lesson opens, and videos remain on-demand. Storage may be reclaimed by the browser.

A new worker waits until existing Triggle tabs and windows close. The release migrates chapter packs it can identify from previous visits. Older releases cached all chapters, and for those releases a stored navigation is the available evidence of a visit. The strict staged test uses a previous production build to check this transition. A failed install leaves the active release available. Student progress and preferences use existing browser storage keys independently of the worker cache.

If an offline lesson is unavailable, reconnect and open that lesson once. To recover from a damaged cache, first close other Triggle windows and reopen online. If that fails, use a browser’s application inspector to unregister the Triggle worker and delete only its `triggle-lightspeed-*` Cache Storage entries. Keep local storage intact to retain learned questions and language preferences. Reopen Triggle online and revisit the lessons needed offline.

To roll back, revert the offending release commit on `main` and let the existing quality and Pages workflows publish it. Verify the stage signature, manifest, icons, English and Tamil routes, and an offline reopening on the published URL. Close previous Triggle windows if a worker is waiting.

## Android phone checklist

1. In Chrome, open Triggle and tap **Install Triggle** on the home page. Follow Chrome’s install prompt, or use the menu instructions if offered. [Open Triggle](https://vigneswaranmba20-afk.github.io/Triggle/site/index.html)
2. Find the gold triangle named **Triggle** on the home screen or app drawer. Open it and check that it launches in its own window.
3. While online, open a Grade 9 question and a Grade 10 concept. Switch to Tamil and complete a concept check. Use Android Back to return to the previous view.
4. Turn on Airplane mode. Open Triggle from the launcher and revisit those lessons. Check that the equations, figures, Tamil selection and last opened lesson are retained. Try an unopened chapter to see the explanation.
5. Turn Airplane mode off and reopen that chapter. If practical, dismiss an install attempt in a fresh session and confirm lessons remain available.
