# Phase 0 test results

Tested on 2026-11-06 against the Phase 0 PR source. Baseline: `e1d20cb85d7776d0a6ea92d00a23f1741c2f4178`.

| Check | Result |
| --- | --- |
| `npm test` | Pass: 41 bilingual chapters, 105 preserved questions, schema, counts, translations, IDs, references, local links and 17 baseline file hashes |
| Validator regression cases | Pass: 27 cases, including future structured content and rejected missing translations, duplicates, invalid references, cycles, premature publication, changed content and broken local links |
| Static Pages source | Pass: all 14 runtime JavaScript files parse; UI translation keys match in both languages; JSON parses; 32 local HTML links resolve; offline shell assets exist |
| Existing video availability regression | Pass: 15 planned lessons, Tamil states, no placeholder MP4 playback, ready-upload behavior and download handling |
| Existing video/data verification | Pass: original 105 IDs and mathematical sine-solution regression |
| Independent JSON Schema check | Pass with Python `jsonschema` Draft 2020-12, including schema validity |
| Workflow YAML and whitespace | Pass: both workflows parse, `git diff --check` clean |
| Existing Diwali browser suite | Pass: 15 scenarios, including daily claims across tabs, reload/history, reduced motion, expiry, unavailable storage and real pinned CDN libraries with SRI |
| Curriculum browser suite | Pass: 8 scenarios with all 41 chapter clicks and all 105 question routes; no uncaught browser errors or broken local assets |
| Responsive visual review | Pass: English/Tamil at 320, 390 and 1280px; screenshots inspected; Tamil header overlap found and fixed, with control overlap/text-fit assertions added |

The curriculum browser suite uses Playwright 1.56.1 and system Chromium at `/usr/bin/chromium`. It exercises all 41 chapter links, English/Tamil navigation, 320/390/1280px layouts, planned chapters without questions, all 105 existing question routes and solutions, question progress, diagrams, immersive lessons, search, history, refresh and offline service-worker chapter reload. The existing Diwali suite was rerun after the final responsive fix and passed again. GitHub-hosted results appear on the PR's Checks tab.

The browser checks serve the same static `site/` directory used by GitHub Pages. There is no separate compile step. The deployment workflow's source checks run locally and are added to the existing publish job. The new PR workflow validates without publishing; an actual new production deployment is intentionally not performed before review.

The first GitHub run passed all source tests, then exposed an Ubuntu runner compatibility issue: `ubuntu-latest` had advanced to 26.04, unsupported by pinned Playwright 1.56.1. The PR browser job now pins supported `ubuntu-24.04` so runner upgrades cannot silently change its browser platform.

Screenshots are review artifacts in the execution workspace, not changes to the repository. No ZIP files were created.

Textbook verification limitations are tracked in the [audit](phase-0-audit.md): current prescribed-edition equivalence, visual Tamil terminology review, direct Grade 12 Tamil textbook evidence, and legacy question fidelity remain unverified. Passing code checks does not certify those editorial claims.
