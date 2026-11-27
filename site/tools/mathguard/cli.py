"""Read-only CLI for TRACE MathGuard V1.0."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from .benchmark import run_benchmark
from .engine import run_audit, write_reports


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="TRACE MathGuard V1.0 — Deterministic Math Validation Engine")
    sub = parser.add_subparsers(dest="command", required=True)

    p_audit = sub.add_parser("audit", help="Run read-only mathematical audit on Grade 10 Chapter 7")
    p_audit.add_argument("--out-dir", type=Path, default=Path("docs/trace/mathguard"), help="Output directory for JSON/CSV/MD")
    p_audit.add_argument("--strict-answers", action="store_true", help="Exit non-zero if any answer_status == FAIL")

    p_bench = sub.add_parser("benchmark", help="Run 100+ case controlled mutation benchmark")
    p_bench.add_argument("--out", type=Path, default=Path("docs/trace/mathguard/benchmark-results.json"), help="Output JSON path")
    p_bench.add_argument("--strict", action="store_true", help="Exit non-zero if any critical error is missed")

    args = parser.parse_args(argv)
    repo_root = Path(__file__).resolve().parents[3]

    if args.command == "audit":
        report = run_audit(repo_root)
        paths = write_reports(report, repo_root / args.out_dir)
        print(json.dumps(report["summary"], indent=2))
        print("Wrote:", {k: str(v) for k, v in paths.items()})
        if args.strict_answers and report["summary"]["answerVerificationCounts"]["FAIL"] > 0:
            return 1
        return 0

    if args.command == "benchmark":
        res = run_benchmark()
        out_path = repo_root / args.out
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(json.dumps(res, indent=2) + "\n", encoding="utf-8")
        print(json.dumps(res["summary"], indent=2))
        if args.strict and res["summary"]["criticalMissedErrors"] > 0:
            return 1
        return 0

    return 0


if __name__ == "__main__":
    sys.exit(main())
