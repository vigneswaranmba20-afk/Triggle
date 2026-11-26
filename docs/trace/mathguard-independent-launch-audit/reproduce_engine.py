"""Run published suites or independently reproduce open engine findings."""
import argparse
import json
import os
from pathlib import Path
import sys


def open_findings():
    import sympy as sp

    from mathguard.derivations_g10_ch7 import DerivedResult
    from mathguard.engine import _verify_exercise_answer

    cases = (
        ("ENG-013", "Find the area of a circle of radius 100 cm. Use π = 22/7 and round to two decimal places.",
         "Area = 31415.93 cm²", 10000 * sp.pi, "31428.57 cm²"),
        ("ENG-014", "Find the area of a rectangle with length 8 cm and width 5 cm.",
         "Area = 1 cm²; an unrelated check figure is 40 cm²", sp.Integer(40), "40 cm²"),
    )
    wrong = 0
    for finding, question, answer, exact, independent_answer in cases:
        derived = DerivedResult(True, "independent_area", exact, expected_dimension="area",
                                preferred_pi="22/7", tolerance=0.005)
        status, _, _, evidence = _verify_exercise_answer({"q": {"en": question}, "answer": answer}, derived)
        print(json.dumps({"id": finding, "question": question, "submittedAnswer": answer,
                          "independentlyDerivedAnswer": independent_answer, "expectedStatus": "FAIL",
                          "observedStatus": status, "evidence": evidence}, ensure_ascii=False))
        wrong += status == "PASS"
    return int(bool(wrong))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("engine", type=Path)
    parser.add_argument("suite", choices=("regression", "frozen", "open-findings"))
    args = parser.parse_args()
    engine = args.engine.resolve()
    sys.path.insert(0, str(engine / "site" / "tools"))
    os.chdir(engine)

    if args.suite == "regression":
        from mathguard.adversarial_v1_5 import run_v1_5_adversarial_suite
        from mathguard.v1_4c_runner import run_historical_and_recent_suites

        print(json.dumps({"historical_and_recent": run_historical_and_recent_suites()}, ensure_ascii=False), flush=True)
        print(json.dumps({"v15": run_v1_5_adversarial_suite()}, ensure_ascii=False), flush=True)
    elif args.suite == "frozen":
        from mathguard.v1_4_runner import evaluate_frozen_benchmark

        print(json.dumps(evaluate_frozen_benchmark(engine), ensure_ascii=False, indent=2))
    else:
        return open_findings()
    return 0


if __name__ == "__main__":
    sys.exit(main())
