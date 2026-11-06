# Phase 0: curriculum architecture audit

Audit date: 2026-11-06. Scope: [Issue #3](https://github.com/vigneswaranmba20-afk/Triggle/issues/3) only. Baseline: `e1d20cb85d7776d0a6ea92d00a23f1741c2f4178` on `main`.

## Repository and deployment verified before edits

The live, editable application is `site/index.html`, using plain JavaScript and CSS; there is no application bundler or server. The four `site/data/class-{9,10,11,12}.js` scripts expose `window.TRIGGLE_CLASSES`. `site/assets/app.js` controls grades, bilingual UI, question routing and device-local progress. Separate scripts render diagrams, guided/deep lessons, videos and the daily Diwali celebration. The root `index.html` and two historical ZIPs are older artifacts, not the current Pages upload directory. This change creates no ZIP and does not read or regenerate those archives.

`.github/workflows/deploy.yml` uploads `site/` to GitHub Pages on matching pushes to `main` or manual dispatch. The latest inspected main run, [42175848265](https://github.com/vigneswaranmba20-afk/Triggle/actions/runs/42175848265), succeeded at the baseline commit. The source is served at `https://vigneswaranmba20-afk.github.io/Triggle/`. Existing `grades.html?class=...` redirects, `class9-classic.html` and `playground.html` remain intact. The old ZIP bootstrap branch in the deployment workflow is unreachable while `site/index.html` exists; it is left intact as historical recovery behavior.

The new pull-request validation workflow has read-only repository permissions and no deployment steps. The existing publish workflow now runs the curriculum/static regression checks before uploading. Publication still requires the existing `main`/manual trigger; this PR is not merged or deployed as part of Phase 0.

## Existing content inventory

| Grade | Questions | Existing chapters with questions | Book-reference / original practice |
| --- | ---: | --- | --- |
| 9 | 53 | 1, 2, 3, 4, 5, 6, 7, 8, 9 | 44 / 9 |
| 10 | 20 | 2, 3, 5, 6 | 17 / 3 |
| 11 | 16 | 3 | 16 / 0 |
| 12 | 16 | 4 | 13 / 3 |

All **105 questions**, their ID order, solutions, source links, diagram data, deep-learning modules and video manifests are retained byte for byte. `site/data/legacy-content-baseline.json` records the baseline commit, all 105 IDs and SHA-256 hashes for 17 learning files. Validation rejects changed hashes or reordered IDs. The root historical artifacts are also unchanged in the diff.

Examples of preserved routes: `?class=9&question=c9-example-6-1`, `?class=10&question=c10-6-6-1-1`, `?class=11&question=c11-3-3-1-1`, `?class=12&question=c12-4-4-1-2`. Existing `triggle.learned.v119`, `triggle.lastByGrade.v119`, deep-position and language storage keys retain their meanings. Individual learned-question ticks never change a chapter's publication status.

## Textbook evidence and reconciliation

The inspected **Government of Tamil Nadu / SCERT textbooks** support 9 + 8 + 12 + 12 = **41 chapters**. Their contents/copyright pages were read through third-party mirrors; publisher authority comes from the reproduced government publication, not from the mirror host. Every chapter records separate English and Tamil source locators. These are chapter-title references, not verification of any existing numbered exercise.

The [official Corporation 2026–27 price list](https://www.textbookcorp.in/files/PRICELIST.pdf) confirms English/Tamil Mathematics availability: Grade 9/10 on PDF p2, Grade 11 volumes I/II on pp2–3, Grade 12 volumes I/II on pp4–5. It **does not contain chapter lists or establish that archived editions equal the current prescribed editions**. No current-year equivalence claim is made.

| Source ID / reference | Medium | Edition evidence | Verification scope |
| --- | --- | --- | --- |
| [tn-g9-en-2019](https://pdfcoffee.com/9th-maths-em-pdf-pdf-free.html) | English | First edition 2018; revised edition 2019 | Archived textbook text inspected |
| [tn-g9-ta-2019](https://www.scribd.com/document/422098191/9th-Maths-TM-pdf) | Tamil | First edition 2018; revised edition 2019 | Archived textbook text inspected |
| [tn-g10-en-2019](https://studylib.net/doc/25350282/std10-maths-em-www.tntextbooks.in) | English | First edition 2019 | Archived textbook text inspected |
| [tn-g10-ta-2020](https://www.scribd.com/document/523832591/Std10-Maths-TM-Www-tntextbooks-in) | Tamil | First edition 2019; revised edition 2020 | Archived textbook text inspected |
| [tn-g11-en-v1-2024](https://www.scribd.com/document/1071999727/Class-11-Mathematics-English-Medium-Volume-1-2024-Edition-www-tntextbooks-in) | English | First edition 2018; revised editions 2019, 2020, 2022, 2023; reprints 2021, 2024 | Archived textbook text inspected |
| [tn-g11-en-v2-2018](https://anyflip.com/olfn/hlwb/basic) | English | First edition 2018 | Archived textbook text inspected |
| [tn-g11-ta-v1-2020](https://www.scribd.com/document/525994503/11th-Maths-Vol1-TM-Www-tntextbooks-in) | Tamil | First edition 2018; revised editions 2019, 2020 | Archived textbook text inspected |
| [tn-g11-ta-v2-2020](https://www.scribd.com/document/525994452/11th-Maths-Vol2-TM-Www-tntextbooks-in) | Tamil | First edition 2018; revised editions 2019, 2020 | Archived textbook text inspected |
| [tn-g12-en-v1-2020](https://www.scribd.com/document/516241039/12th-Maths-Vol1-EM-Www-tntextbooks-in) | English | First edition 2019; revised edition 2020 | Archived textbook text inspected |
| [tn-g12-en-v2-2019](https://cdn1.byjus.com/wp-content/uploads/2019/10/Tamil-Nadu-State-Board-Textbooks_Samacheer-Kalvi-Class-XII_Maths_Vol-2_Chapter-7_English_Medium.pdf) | English | First edition 2019 | Archived textbook text inspected |
| [tn-g12-ta-index](https://www.brainkart.in/subject/Maths-12th-Std_408/) | Tamil | Edition not specified; secondary corroboration only | Secondary index only; textbook verification pending |
| [tn-current-catalogue-en](https://www.textbookcorp.in/files/PRICELIST.pdf) | English | Academic year 2026–2027 catalogue; textbook edition not stated | Current catalogue media/volumes only |
| [tn-current-catalogue-ta](https://www.textbookcorp.in/files/PRICELIST.pdf) | Tamil | Academic year 2026–2027 catalogue; textbook edition not stated | Current catalogue media/volumes only |

Grade 9 English/Tamil revised 2019 contents: pp iii–iv. Grade 10 first-2019 English and revised-2020 Tamil contents: pp v–vi; the revised-2020 English mirror corroborates the same sequence. Grade 11 volume I English 2024 reprint: pp IV–V, Tamil revised 2020: pp iv–v; volume II first-2018 English and revised-2020 Tamil: pp iii–iv. Grade 12 English revised-2020 volume I: pp IV–V, first-2019 volume II: pp III–IV. Grade 12 Tamil titles currently have secondary-index corroboration only, with no authoritative edition/locator verified.

Reconciliations:

- No chapter-count difference was found in these inspected editions. The previous Grade 11/12 data exposed only the trigonometry chapters; missing navigation was not evidence of fewer textbook chapters.
- Pagination differs between media/editions, so each source has its own chapter locator. Grade 11 volume II starts again at printed p1.
- Grade 11 English chapter 8 is “Vector Algebra-I”; the inspected Tamil contents omits “I”. Both source forms are retained.
- Grade 12 English volume II contents uses “Application of Differential Calculus”; the chapter 7 opener uses “Applications of Differential Calculus”. Navigation follows the opener.
- Canonical titles use full textbook wording (for example “Relations and Functions”). Original lesson metadata is preserved, including its earlier spellings.

## Bilingual chapter register

All chapters are **planned / unreviewed**. An existing question is not full chapter coverage. All `terminology.ta` flags remain `pending`: extracted Tamil Grades 9–11 contents were corroborated against readable indexes, but visual/editor terminology review is outstanding; Grade 12 additionally needs the Tamil textbook itself. This conservative flag is visible on chapter overviews.

| Grade / chapter | English | Tamil | Existing questions |
| --- | --- | --- | ---: |
| 9 / 1 | Set Language | கண மொழி | 1 |
| 9 / 2 | Real Numbers | மெய்யெண்கள் | 1 |
| 9 / 3 | Algebra | இயற்கணிதம் | 2 |
| 9 / 4 | Geometry | வடிவியல் | 1 |
| 9 / 5 | Coordinate Geometry | ஆயத்தொலை வடிவியல் | 1 |
| 9 / 6 | Trigonometry | முக்கோணவியல் | 44 |
| 9 / 7 | Mensuration | அளவியல் | 1 |
| 9 / 8 | Statistics | புள்ளியியல் | 1 |
| 9 / 9 | Probability | நிகழ்தகவு | 1 |
| 10 / 1 | Relations and Functions | உறவுகளும் சார்புகளும் | 0 |
| 10 / 2 | Numbers and Sequences | எண்களும் தொடர்வரிசைகளும் | 1 |
| 10 / 3 | Algebra | இயற்கணிதம் | 1 |
| 10 / 4 | Geometry | வடிவியல் | 0 |
| 10 / 5 | Coordinate Geometry | ஆயத்தொலை வடிவியல் | 1 |
| 10 / 6 | Trigonometry | முக்கோணவியல் | 17 |
| 10 / 7 | Mensuration | அளவியல் | 0 |
| 10 / 8 | Statistics and Probability | புள்ளியியலும் நிகழ்தகவும் | 0 |
| 11 / 1 | Sets, Relations and Functions | கணங்கள், தொடர்புகள் மற்றும் சார்புகள் | 0 |
| 11 / 2 | Basic Algebra | அடிப்படை இயற்கணிதம் | 0 |
| 11 / 3 | Trigonometry | முக்கோணவியல் | 16 |
| 11 / 4 | Combinatorics and Mathematical Induction | சேர்ப்பியல் மற்றும் கணிதத் தொகுத்தறிதல் | 0 |
| 11 / 5 | Binomial Theorem, Sequences and Series | ஈருறுப்புத் தேற்றம், தொடர்முறைகள் மற்றும் தொடர்கள் | 0 |
| 11 / 6 | Two Dimensional Analytical Geometry | இருபரிமாண பகுமுறை வடிவியல் | 0 |
| 11 / 7 | Matrices and Determinants | அணிகளும் அணிக்கோவைகளும் | 0 |
| 11 / 8 | Vector Algebra-I | வெக்டர் இயற்கணிதம் | 0 |
| 11 / 9 | Differential Calculus – Limits and Continuity | வகை நுண்கணிதம் – எல்லைகள் மற்றும் தொடர்ச்சித் தன்மை | 0 |
| 11 / 10 | Differential Calculus – Differentiability and Methods of Differentiation | வகை நுண்கணிதம் – வகைமை மற்றும் வகையிடல் முறைகள் | 0 |
| 11 / 11 | Integral Calculus | தொகை நுண்கணிதம் | 0 |
| 11 / 12 | Introduction to Probability Theory | நிகழ்தகவு கோட்பாடு – ஓர் அறிமுகம் | 0 |
| 12 / 1 | Applications of Matrices and Determinants | அணிகள் மற்றும் அணிக்கோவைகளின் பயன்பாடுகள் | 0 |
| 12 / 2 | Complex Numbers | கலப்பு எண்கள் | 0 |
| 12 / 3 | Theory of Equations | சமன்பாட்டியல் | 0 |
| 12 / 4 | Inverse Trigonometric Functions | நேர்மாறு முக்கோணவியல் சார்புகள் | 16 |
| 12 / 5 | Two Dimensional Analytical Geometry-II | இருபரிமாண பகுமுறை வடிவியல் II | 0 |
| 12 / 6 | Applications of Vector Algebra | வெக்டர் இயற்கணிதத்தின் பயன்பாடுகள் | 0 |
| 12 / 7 | Applications of Differential Calculus | வகை நுண்கணிதத்தின் பயன்பாடுகள் | 0 |
| 12 / 8 | Differentials and Partial Derivatives | வகையீடுகள் மற்றும் பகுதி வகைக்கெழுக்கள் | 0 |
| 12 / 9 | Applications of Integration | தொகை நுண்கணிதத்தின் பயன்பாடுகள் | 0 |
| 12 / 10 | Ordinary Differential Equations | சாதாரண வகைக்கெழுச் சமன்பாடுகள் | 0 |
| 12 / 11 | Probability Distributions | நிகழ்தகவு பரவல்கள் | 0 |
| 12 / 12 | Discrete Mathematics | தனிநிலைக் கணிதம் | 0 |

## Content contract and navigation

`site/data/curriculum.js` is the single runtime metadata source. `site/data/curriculum.schema.json` defines the contract, with semantic checks in `site/tools/validate_curriculum.cjs`:

- Stable chapter IDs `g{grade}-ch{number}`, bilingual titles, `planned` / `drafting` / `review` / `published` status and a separate `unreviewed` / `in_review` / `approved` review record.
- Concepts have bilingual body text and prerequisites. Prerequisites reference chapter or concept IDs; validation rejects cycles.
- Worked examples have a problem, explained steps, equations, answer and concept references. Exercises reference actual question IDs. Quizzes have bilingual questions, choices, answer references and explanations.
- Each chapter and authored content record carries source references and review state. Source records capture publisher, edition, medium, URL, evidence and verification scope.
- `legacyQuestionIds` maps every existing question exactly once to its original grade/chapter. Empty content arrays mean unfilled plans, not completed sections. No prerequisite or new teaching content is invented for Phase 0.
- Publication validation requires approved chapter/content reviews, verified Tamil terminology, verified chapter sources and nonempty concepts, worked examples, exercises and quizzes. Editorial review must still establish actual coverage; automation cannot prove instructional completeness.

All chapters appear in the selected grade's sidebar and chapter chooser, in both languages. Selecting a chapter opens `?class=11&chapter=g11-ch1`, even when no questions exist. Existing exercise buttons open their unchanged question routes. Browser Back, refresh, search, language switching, grade navigation and device-local learning progress are preserved. Bibliographic titles/edition strings/locators retain their source wording; new interface labels and review notes are bilingual. Some legacy question titles still contain English in their Tamil fields; translating/reviewing those learning records belongs to later content work and is not represented as completed here.

The service-worker cache version is updated and includes the curriculum metadata for offline use.

## Verification

Run from the repository root:

```sh
npm ci
npm test
npx playwright install chromium
CHROMIUM_PATH='' npm run test:browser
```

For an existing system Chromium, set `CHROMIUM_PATH=/usr/bin/chromium`. The independent Diwali regression is `npm run test:diwali` and needs access to its two pinned CDN dependencies. The production site remains dependency-free; Playwright is only a pinned development dependency.

Testing evidence is recorded in `docs/phase-0-test-results.md`. Validation checks chapter counts, nonempty English/Tamil fields, duplicate IDs, source/concept/prerequisite/question/quiz references, cycles, publication gates, preservation hashes, local links, all runtime JavaScript syntax, JSON and offline assets. External reference URLs are checked for HTTP(S) syntax; external availability is not guaranteed by the local link checks.

## Unverified work retained for review

1. Compare every chapter sequence/title against the school's currently prescribed English and Tamil copies and record their edition/reprint. Current 2026–27 equivalence remains unverified.
2. Visually verify Tamil textbook terminology for all 41 chapters, including direct Grade 12 Tamil textbook edition/page evidence. OCR/secondary corroboration is insufficient to mark it approved.
3. Review existing exercise numbering, question fidelity, solutions and translations against those editions. Phase 0 preserves rather than certifies these learning records.
4. Author and review full concepts, prerequisites, examples, exercises and quizzes in subsequent issues. No chapter is published as complete.
5. Review/merge this PR before any publication; a new production deployment is deliberately not performed for the PR.

Issues #4, #5, #6 and #7 have not been started.
