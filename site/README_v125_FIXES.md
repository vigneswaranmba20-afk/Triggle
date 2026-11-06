# Triggle v1.25 — Clear Explanations / Rendering Repair

## What changed
- Fixed `[object Object]` in unreviewed learning stages. Localized values are resolved to English or Tamil strings before they reach the HTML renderer.
- Removed the generic "Why does this work?" green expander. Authored mathematical insights are now regular stage paragraphs; generated filler is omitted.
- Added a fully question-specific Class 10 Quadratic A lesson with the zero-product rule, correct factors −2 and −3, worked substitutions, and an optional checkpoint.
- Fixed the related quick-solution step: the factors must multiply to +6 and sum to −5.
- Preserved Quick Solution, interactive diagrams, Class 9–12 content, the MP4 pilot and video player, the navigators, saved stars and the GitHub deployable ZIP structure.
- Bumped script query versions and offline shell cache to ensure Android Chrome receives the fix.

## Publishing
Your repository's current deploy.yml unzips `Triggle_v124_Complete_Website.zip`. Replace that file with the v1.25 ZIP **without changing the name**, or update the workflow to the new filename. In this release we include a same-name GitHub-ready ZIP to avoid workflow edits.

## QA / honesty
The mathematical correction for Quadratic A was checked by expansion and direct substitution. Automated checks validate both languages for all 105 lesson paths, plus the Class 10 quadratic lesson. This does not constitute a complete current-edition textbook audit. Browser-specific checks are noted separately.
