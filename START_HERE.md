# START HERE — Triggle curriculum launch handoff (2026-11-28)

**EXPORT ONLY. Never merge this snapshot branch into main.** It deliberately omits deployment workflows, historical archives, videos and unrelated files. It is a read-only reference / analysis bundle, not a deployable checkout.

Current curriculum source: 810a437623561c8765f109c0a6b608ee4826300d (main at preparation).
MathGuard verification code and evidence: 985a9bbf6c34a9cd069a3cba3c04c078a0f3c0a1 (open PR #467, unmerged; historical claims require independent reproduction).
Use site/data/project-status.json as an inventory starting point; 746 Grade 9 and 880 Grade 10 existing records, not confirmed complete questions. The ledger is older than the pinned source. Exact textbook denominators are unresolved. No new Grade 11/12 work, examples or videos.

## Read order / credit budget
1. This file; AGENTS.md; docs/TRIGGLE_MASTER_PROMPT.md; docs/CHATGPT_STYLE_MATH_NOTATION_STANDARD.md.
2. site/data/project-status.json (parse programmatically; summarize by chapter, not by dumping the whole file).
3. docs/curriculum/grade-9 and grade-10, docs/reference-library/2025-user-textbook-manifest.json, site/data/curriculum.js, site/data/textbook-exercises and site/data/textbook-fidelity.
4. Confirm current open PRs and main commit; do not repeat work already integrated. Read only chapter-specific sources/tests after choosing a batch.
5. For MathGuard: docs/trace/mathguard/README.md, Complete_Regression_Results.json, Confirmed_Correction_Queue.json, site/tools/mathguard/tests/test_v1_5a.py and relevant domain adapters. Run tests instead of reading every historical report. Report unsupported findings accurately.
6. Use actual authorized English/Tamil 2025 textbook PDFs for page-image and denominator verification. PDFs are NOT included; source registry points to them. Do not invent source evidence or redistribute copyrighted pages.

## Execution isolation
Create a fresh worktree or clone from current main, branch antigravity/launch-curriculum-completion (or a unique suffixed branch if it exists). The export snapshot is reference-only; do not copy its omissions or wholesale overlay the MathGuard branch onto production. Keep MathGuard review code in a separate scratch location/worktree if running against current data, or independently reproduce the historical pinned branch before comparing current results. Keep all output local or in a draft PR; do not merge, enable auto-merge, deploy, edit DNS, change CI, service workers, global app shell or video assets. Codex owns production release. Verify each change with targeted tests in the actual isolated full checkout. Some checks in this trimmed bundle require omitted fixtures; missing dependencies are not failures of mathematics or evidence of a pass.

## Scope
Prioritize verified missing Grade 10 exercises, then Grade 9, incomplete solutions, Tamil parity and concepts. No separate Worked Examples sections. Preserve IDs, original wording where authorized, structured LaTeX, one complete solution and student progress. Work in small chapter-scoped batches. Maintain a checkpoint ledger. Return exact chapter counts, source pages, confirmed corrections, test results, blocked cases, files and draft PR; avoid full repeated repository scans.

## Suggested verification
Use deterministic counts and comparisons first. In an isolated complete checkout, run node site/tools/validate_curriculum.cjs, node site/tools/test_exact_textbook_fidelity.cjs and the relevant chapter tests. For MathGuard use an isolated Python environment with pytest and SymPy; see docs/trace/mathguard/README.md. Run PYTHONPATH=site/tools python3 -m pytest site/tools/mathguard/tests/test_v1_5a.py -v against the pinned verification branch before applying to current data. Do not trust reported pass counts until rerun. No API keys are needed or included.
