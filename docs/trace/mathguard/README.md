# TRACE MathGuard V1.0 — Deterministic Mathematical Validation Engine

## Overview

TRACE MathGuard V1.0 is an independent, deterministic, zero-LLM-API mathematical validation engine built on Python 3, SymPy, and exact rational arithmetic (`fractions.Fraction`). It begins with **Grade 10 Chapter 7 — Mensuration** as a controlled pilot:

- **62 exercises**: Ex 7.1 (10), Ex 7.2 (10), Ex 7.3 (9), Ex 7.4 (8), Ex 7.5 (15), Unit Ex 7 (10)
- **9 bilingual concept lessons**: `site/data/g10-ch7-concepts.js`
- **Total audited items**: 71

## Architecture (`site/tools/mathguard/`)

- `extractor.cjs`: Read-only Node.js sandbox loader that extracts student curriculum records and fidelity/inventory manifests to JSON.
- `parser.py`: Safe recursive-descent math/LaTeX parser producing SymPy ASTs with **zero `eval()` / `exec()`**.
- `arithmetic.py`: Exact `Fraction` / `Rational` arithmetic, mixed fractions, and ratio equivalence.
- `symbolic.py`: SymPy symbolic equivalence and `π` mode evaluation (`22/7`, `3.14`, exact `π`).
- `units.py`: Length/area/volume/time conversions and dimensional consistency checks.
- `rounding.py`: Rounding and approximation reconciliation.
- `geometry.py`: Independent SymPy formulas for cylinders, hollow cylinders, cones, frustums, spheres, hollow spheres, hemispheres, hollow hemispheres, cubes, and cuboids.
- `steps.py`: Intermediate-step equality chain and `⇒` implication-consistency validator.
- `mcq.py`: Multiple-choice option parser and verifier.
- `tamil_consistency.py`: Deterministic English–Tamil numerical, terminology, unit, and intent validator (reusing `trace/tamil-validation-pilot-20261125` rules).
- `reconcile.py`: Textbook answer-key and fidelity manifest reconciliation.
- `derivations_g10_ch7.py`: Independent first-principles derivations for all 62 exercises and 9 concepts, anchored to stated source numbers (with `c10-7-ex7-5-q11` honestly marked `UNVERIFIABLE` as qualitative shape recognition).
- `engine.py` & `cli.py`: Read-only CLI producing `audit-g10-ch7.json`, `audit-g10-ch7.csv`, and `audit-g10-ch7.md`, keeping answer verification, intermediate-step verification, and Tamil editorial validation strictly separate.
- `benchmark.py`: 120-case controlled mutation benchmark (`60` development + `60` held-out evaluation cases across clean controls and 9 error categories).

## Reproducible Read-Only Commands

```bash
# Run unit & integration tests
PYTHONPATH=site/tools python3 -m pytest site/tools/mathguard/tests/test_mathguard.py -v

# Run Grade 10 Chapter 7 audit (writes JSON/CSV/MD)
PYTHONPATH=site/tools python3 -m mathguard.cli audit --out-dir docs/trace/mathguard --strict-answers

# Run 120-case controlled mutation benchmark
PYTHONPATH=site/tools python3 -m mathguard.cli benchmark --out docs/trace/mathguard/benchmark-results.json --strict
```

## Grade 9 & Grade 10 Expansion Roadmap

1. **Phase 1 (Current Pilot — Completed)**: Grade 10 Chapter 7 (Mensuration) — 62 exercises + 9 concepts + 120-case benchmark.
2. **Phase 2 (Algebra & Coordinate Geometry)**:
   - Grade 10 Ch 3 (Algebra: polynomials, GCD/LCM, quadratic equations, matrices), Ch 5 (Coordinate Geometry).
   - Grade 9 Ch 3 (Algebra), Ch 5 (Coordinate Geometry).
   - Extend `parser.py` for matrices, polynomial factors, and coordinate pairs `(x, y)`.
3. **Phase 3 (Numbers, Sequences & Trigonometry)**:
   - Grade 10 Ch 1 (Relations & Functions), Ch 2 (Numbers & Sequences: Euclid's lemma, AP/GP), Ch 6 (Trigonometry).
   - Grade 9 Ch 1 (Set Language), Ch 2 (Real Numbers), Ch 6 (Trigonometry).
   - Add SymPy `Set`, `summation`, and trigonometric identity (`trigsimp`) validators.
4. **Phase 4 (Geometry, Mensuration G9, Statistics & Probability)**:
   - Grade 10 Ch 4 (Geometry), Ch 8 (Statistics & Probability).
   - Grade 9 Ch 4 (Geometry), Ch 7 (Mensuration), Ch 8 (Statistics), Ch 9 (Probability).
   - Add exact mean/variance/probability validators and theorem-based geometric proof-step checks.
5. **Phase 5 (CI & Editorial Integration)**:
   - Wire chapter-scoped read-only MathGuard checks into manual editorial review gates without slowing `npm test` or altering `deploy.yml`.
