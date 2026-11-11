# Triggle

Triggle — Mathematics Made Clear. Tamil Nadu State Board Grades 9–12, in English and Tamil.

Each available question has one standard worked solution and a compact Easy, Medium or Difficult indicator. Difficulty reflects mathematical demands and never hides required working. Explanation-mode switching is discontinued. See [the implementation audit and review notes](docs/STANDARD_SOLUTIONS_2026-11-11.md).

The editable GitHub Pages source is in `site/`. Work directly on these files; the historical ZIPs and root `index.html` are not the active deployment source.

Phase 0 adds a 41-chapter curriculum register while preserving the existing 105 questions. Chapters remain planned until their full content, textbook alignment and Tamil terminology are reviewed. See the [curriculum audit](docs/phase-0-audit.md) and [test results](docs/phase-0-test-results.md).

```sh
npm ci
npm test
npx playwright install chromium
CHROMIUM_PATH='' npm run test:browser
python3 -m http.server 8000 --directory site
```

Open `http://localhost:8000/`. Use `CHROMIUM_PATH=/usr/bin/chromium` to test with a system Chromium. Production is a static site; Node/Playwright are development checks only.

Pull requests run `.github/workflows/validate.yml` without deploying. The existing Pages workflow publishes `site/` after review and a merge to `main`, or an explicit manual dispatch.

## Editorial reference library

For Phase 2, start with the [source register](docs/reference-library/README.md), [original teaching handbook](docs/reference-library/teaching-handbook.md), and [41-chapter crosswalk](docs/reference-library/chapter-crosswalk.md). These are living internal notes, not imported copies of reference books. Coding agents should follow [AGENTS.md](AGENTS.md) when authoring new bilingual mathematics content.
