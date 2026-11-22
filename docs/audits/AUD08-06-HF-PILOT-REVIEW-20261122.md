# AUD08-06 — independently reviewed HF pilot outcome

- Source: Neon audit reconciliation `AUD08-06` targeting Grade 10 Statistics, Exercise 8.1 Q5 (six inconsistent `Rs.` in LaTeX math) and Q6 (missing natural-numbers variance shortcut).
- Paid pilot: 2026-11-22, `Qwen/Qwen3-Coder-30B-A3B-Instruct:amazon-bedrock`, GitHub Actions run 45047979770.
- Reported HF usage: 3,354 prompt + 112 completion tokens; $0.0005703. No repeat inference.
- Model response supplied the right `\text{₹}` symbol but proposed a 382+ character explanation, exceeding the 350-character constraint, and claimed variance depends on unique values rather than frequency. That is false under non-uniform repetition. Its direct patch was rejected by the safety validator.
- Independently reviewed correction: Q5 six math currency tokens render as ₹ using KaTeX-supported `\text{\char"20B9}` under unchanged strict-mode settings; Q6 explains that repeating **every** observation equally preserves variance, with `(n²−1)/12` for consecutive integers.
- Retain all original question text, answers, textbook source references, exercise IDs, Tamil pending-review state and all other Q5–Q10 records.
- Maintain equality between student-facing JS records and source evidence manifest. Extend existing Grade 10 Statistics regression to validate six currency math labels and distinguish uniform from non-uniform repetition.
- This is an AI-assisted, **human-corrected** patch, not an autonomous AI success. Opening a PR or committing to a branch does NOT constitute live deployment. Close the audit only after quality gates and production-visible validation.

- KaTeX diagnostic run 45048797373 verified the literal `₹` fails strict mode, while `\char"20B9` displays ₹ with MathML without relaxing renderer security; the diagnostic-only probe is removed from the release changes.
