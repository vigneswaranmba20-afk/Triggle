# Project Chroma

The Grade 9 and 10 student shell takes its semantic colours from `site/assets/bond-light.css`. The original Paper + Indigo theme remains the fallback layer. Existing Bond and VER Glyph variables resolve to the approved palette in the active theme.

| Role | Token | Colour |
| --- | --- | --- |
| Questions, headings and mathematics | `--text-primary` | `#181B20` |
| Explanations and learning instructions | `--text-explanation` | `#404650` |
| References, breadcrumbs and progress | `--text-secondary` | `#525B62` |
| Navigation and selection | `--text-navigation` | `#6E2933` |
| Confirmed answers and completion | `--text-correct` | `#166353` |
| Incorrect attempts and errors | `--text-incorrect` | `#B42318` |
| Brand decoration | `--brand-gold` | `#B79253` |
| Page and reading surfaces | `--surface-page`, `--surface-content` | `#F7F6F2`, `#FFFFFF` |

Feedback gets its state where the existing answer checker evaluates the choice. Keep controls neutral initially, use the navigation accent for selection before evaluation, and update the live message and evaluated choice together. Keep textual explanations and hints in the existing language. A reset clears the evaluated choice and the message.

## Browser audit

The existing browser suite runs `node site/tools/test_chroma_browser.cjs`. It visits the chapter menu, concept index and lessons, exercise and activity sections, resources, chapter quizzes and representative questions in each exercise in English and Tamil. The audit measures rendered foregrounds and flat or alpha-composited ancestor backgrounds, compares the reading roles across languages, and exercises feedback and offline rendering. Use `--all-questions` to scan every question in the public inventory. Use `--report` and `CHROMA_OUTPUT` to save issue records and matched screenshots. `CHROMA_SITE_ROOT` can point to a separate checkout's `site` directory.

An issue identity consists of the check, element or reading role, and computed foreground and background. The output retains the number of occurrences and an example route. The comparison counts recurring style defects once per identity and includes checks for each feedback outcome. Emulated measurements use Chromium and the Pixel 5 viewport and input profile. The checks do not measure contrast against every pixel of an image, gradient or video. Inspect those surfaces visually and use the existing diagram and notation browser suites for glyphs, geometry, reflow and keyboard access.

## Intentional colour distinctions

- SVG and canvas graphics retain their authored fills, strokes, and labels. This includes Venn regions, number lines, coordinate series, geometry constructions and celebration particles.
- KaTeX and MathML keep their authored colours and inherit the surrounding reading role where no colour is authored.
- The Grade 10 algebra demonstration distinguishes minimum, maximum and sum and traces the active matrix operand. The statistics and probability studio distinguishes favourable outcomes alongside the related diagram. The text audit still measures contrast on these HTML labels.
- Logo marks and decorative gold stay outside the semantic text palette. Video pixels and native media controls remain under the video player.
- The original Class 9 classic page is a preserved archive. The maintained Grade 9 reader and the public bilingual Triggle Basics activities receive the active palette.
