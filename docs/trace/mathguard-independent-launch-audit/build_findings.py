"""Combine observed run evidence and independent dispositions into the handoff."""
import argparse
import hashlib
import json
from collections import Counter
from pathlib import Path

from audit_curriculum import LEDGER, ROOT
from review_quarantine import REVIEWS

LOGS = ROOT / "logs"
BASE = "413a7540c4a6054b98f20d9c43d73b66ddb6332b"
ENGINE = "985a9bbf6c34a9cd069a3cba3c04c078a0f3c0a1"
DISPOSITIONS = {
    "empty_side": "An equation segment lost an operand in extraction. Reassemble from adjacent authored segments before checking.",
    "missing_variable_bindings": "The evaluator lacks a source-bound substitution or definition. Trace the named values or variables to the stem or prior step before validating.",
    "no_equality_relation": "This step has no parsed equality. Review the actual theorem, construction or prose rather than counting the line as a proved equality.",
    "prose_only_unverified": "This answer classifies a physical object's shape. Confirm independently with an appropriate shuttlecock model.",
    "standalone_expression_no_relation": "A displayed expression alone does not assert an equality. Recover its relation to the question or adjacent working.",
    "unjustified_approximation": "The transition was not justified by a specified approximation or rounding rule. Recompute at the requested precision.",
    "unparsed_equation": "At least one side is outside the parser grammar. Reconstruct both sides using the original mathematical notation.",
    "unparsed_rhs": "The right-hand side failed to parse. Normalize the authored notation before attempting verification.",
    "unverified_implication": "The engine did not establish the logical direction of this implication. Preserve source premises and check them independently.",
    "unverified_inequality": "The engine did not establish the inequality under the stated domain. Check the sign conditions before accepting the comparison.",
}
SPECIAL = {
    "g10-ch3-matrix-types": "Recoverable abstention. Transposition sends A[i,j] to Aᵀ[j,i], so 3×4 becomes 4×3.",
    "c10-5-ex5-5-q13": "The keyed B is the strongest option under the chapter's exclusive trapezium definition. A and C describe necessary fragments. Abstain on a uniquely necessary condition under the literal wording.",
    "c10-5-ex5-5-q15": "Recoverable working abstention. Substitution at (2,1) satisfies only both equations in B. Their normals (1,1) and (3,1) are independent, so the intersection is unique.",
    "c10-7-ex7-5-q11": "The textbook option D describes an idealized shuttlecock. The algebra engine appropriately abstains on the unmodeled physical shape.",
    "c10-3-ex3-6-q6": "Independent simplification gives 2(x²+1)/(x(x+1)²) for x≠−1,0. The engine lacks a dedicated proof-answer oracle.",
    "c10-3-ex3-13-q3": "The quadratic has x=1 as a root. A repeated root forces the derivative at 1 to vanish, so 2a=b+c, under the nonzero leading coefficient condition.",
    "c10-3-ex3-13-q4": "Discriminant 72(a²+b²)>0 if a≠b. When a=b≠0 the equation is linear with one root, and when a=b=0 it is identically zero.",
    "c10-3-ex3-13-q5": "One fourth of the discriminant factors as a(a³+b³+c³−3abc). A genuine repeated-root quadratic makes that product zero.",
    "c10-5-ex5-5-q14": "Candidate newly abstains. For the requested slopes method, testing slopes or directions of both pairs of opposite sides establishes answer B.",
}
ENGINE_FINDINGS = [
    {"id": "ENG-001", "finding": "Correct union working certified the separately wrong roster {2,5,13}.",
     "derived": "{2,5} ∪ {11} = {2,5,11}. Final answer checked against question rosters in candidate."},
    {"id": "ENG-002", "finding": "Generic answer fallback accepted 52 and 51.01 for exact 17+34, and accepted an unrelated declaration a=5 as the answer to 99−7.",
     "derived": "Exact answers are 51 and 92. The candidate binds supported exact numeric answers to the stem and abstains outside that grammar."},
    {"id": "ENG-003", "finding": "A translated numeric answer alone certified Tamil parity with missing Tamil question and working.",
     "derived": "Candidate records missing fields. Full bilingual semantic review remains separate."},
    {"id": "ENG-004", "finding": "The engine counted √(x²)=x and (x²−1)/(x−1)=x+1 for all real x as verified.",
     "derived": "At x=−1 the first left side is 1. At x=1 only the second right side is defined. Candidate checks the explicit universal real domain for supported single-variable equalities."},
    {"id": "ENG-005", "finding": "5 kg = 5 m passed after unit normalization.",
     "derived": "Mass and length dimensions differ. Candidate recognizes gram, kilogram and milligram in pure conversions."},
    {"id": "ENG-006", "finding": "A worked step replaced a given roster and certified a changed set.",
     "derived": "The original question fixes A={2,5}. A student step cannot replace 5 with 7. Candidate preserves declared rosters."},
    {"id": "ENG-007", "finding": "A Venn calculation returned a known region before establishing feasibility of all regions.",
     "derived": "A two-member subset of a one-member universe is impossible. Candidate checks nonnegative integer feasibility with a bounded exact search."},
    {"id": "ENG-008", "finding": "Composition simplification discarded a pole or accepted an input outside the outer domain.",
     "derived": "For f(x)=(x−1)/(x+1), f(f(x)) simplifies to −1/x but excludes both −1 and 0. An outer function on the naturals cannot take g(1)=1/2 when g(x)=x/2."},
    {"id": "ENG-009", "finding": "Composition equality treated matching simplified expressions as equal functions despite unequal domains.",
     "derived": "The Möbius functions f(x)=(x−1)/(x+1) and g(x)=(1+x)/(1−x) have both compositions simplifying to x. The first excludes 1 and the second excludes −1. Domains are retained before comparison."},
    {"id": "ENG-010", "finding": "The function reasoner accepted totality or evaluation outside the provided domain and codomain.",
     "derived": "√x cannot define a total real-valued function on all reals, and a negative result for a declared nonnegative codomain is invalid."},
    {"id": "ENG-011", "finding": "The reasoner inferred surjectivity and non-injectivity from degree without respecting integer inputs.",
     "derived": "2x maps integers to even integers. For 2x²+x, two distinct integer inputs would require 2(x+y)+1=0, an impossibility."},
    {"id": "ENG-012", "grade": 10, "chapter": 7, "questionId": "c10-7-ex7-1-q1",
     "finding": "The English mensuration answer checker ignored measure labels, discarded the minus sign and accepted metres as centimetres. It rejected equivalent converted lengths.",
     "derived": "With r=5k and h=7k, the textbook π=22/7 convention gives 220k²=5500, so r=25 cm and h=35 cm. Candidate binds the two named measures and converts their units.",
     "sourceEvidence": "Source-pinned production stem and independently constructed mutated answers. The same two-measure check applies to Q2.",
     "englishTamilImpact": "The verified radius and height have the same physical values in English and Tamil. The repaired acceptance path reads the English exercise answer. Tamil parity has its own remaining coverage limits."},
]
PROBABILITY = {"6": "20 of 36 ordered outcomes, 5/9.", "7": "13 of 18 odd-numbered cards.",
               "8": "All outcomes except TTT, 7/8.", "11": "All eight outcomes.",
               "12": "11/48, 11/24, 11/16. All eight probability atoms are nonnegative.",
               "13": "17 even, seven additional odd prime boys, five additional odd composite girls, 29/35."}


def read(path):
    return json.loads(path.read_text())


def write(name, data):
    (ROOT / name).write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")


def main(engine, runtime):
    baseline = read(LOGS / "frozen-baseline.json")
    candidate = read(LOGS / "frozen-expanded-candidate.json")
    frozen_path = engine / "docs/trace/mathguard/v1_3_5_frozen_dataset.json"
    frozen = read(frozen_path)
    runtime_ids = {item["id"] for chapter in read(runtime)["chapters"] for item in chapter["items"]}
    frozen_ids = {item["id"] for item in frozen["items"]}
    row_reviews = []
    for row in baseline["v1_4_remaining_non_pass"]:
        disposition = Counter(claim["evidence"] for claim in row["unsupported_details"])
        row_reviews.append({
            "id": row["id"], "workingStatus": row["status"], "answerStatus": row["answer_status"],
            "claimsVerified": row["verified_claims"], "claimsTotal": row["total_claims"],
            "unsupportedClaims": [{**claim, "disposition": DISPOSITIONS[claim["evidence"]]}
                                  for claim in row["unsupported_details"]],
            "evidenceCounts": disposition,
            "independentRecheck": SPECIAL.get(row["id"]),
        })
    quarantine = []
    for exercise in read(LEDGER)["exercises"]:
        for question in exercise["questions"]:
            for task in question["tasks"]:
                state = task["state"]["current"]
                if state["status"] == "SOURCE_BLOCKED":
                    quarantine.append({
                        "taskId": task["taskId"], "status": state["status"],
                        "readerCards": [row["id"] for row in state["records"]],
                        "source": question["source"], "sourcePagesVisuallyCompared": ["en", "ta"],
                        "independentReview": REVIEWS[task["taskId"]],
                    })
    assert len(row_reviews) == 78 and len(quarantine) == len(REVIEWS) == 18
    regressions = {}
    for variant in ("baseline", "candidate"):
        run_name = "baseline" if variant == "baseline" else "expanded-candidate"
        historical, v15 = [json.loads(line) for line in (LOGS / f"regression-{run_name}.jsonl").read_text().splitlines()]
        regressions[variant] = {
            "historical": historical["historical_and_recent"]["overallSummary"],
            "v15": {key: value for key, value in v15["v15"].items() if key not in {"main", "holdout"}},
        }
    write("MATHGUARD_FINDINGS.json", {
        "schemaVersion": 1, "mainBaseline": BASE, "mathGuardBaseline": ENGINE, "releaseDecision": "HOLD",
        "coverage": read(LOGS / "curriculum-summary.json"), "regressionRuns": regressions,
        "independentEngineTests": {"baselinePassed": 10, "baselineFailed": 21, "candidatePassed": 31,
                                   "logs": ["logs/independent-expanded-baseline.log", "logs/independent-expanded-candidate.log"]},
        "engineFindings": [{
            "grade": None, "chapter": None, "questionId": None,
            "sourceEvidence": "Synthetic independently specified cases at the pinned PR head",
            "regression": "test_engine_soundness.py",
            "englishTamilImpact": ("Tamil parity omitted missing question and working" if entry["id"] == "ENG-003"
                                   else "The engine's acceptance applies to numerical or symbolic content shared by both readers"),
            **entry,
        } for entry in ENGINE_FINDINGS],
        "curriculumFindings": [{
            "id": "CURR-003", "grade": 10, "chapter": 3, "questionId": "c10-3-ex3-4-q2-iii",
            "original": "The reader gave x=1 as the only exclusion without distinguishing the original quotient from its reduced form.",
            "corrected": "The original denominator (x+2)(x−1) vanishes at −2 and 1. Cancellation gives (x+4)/(x−1) on the original domain. The reduced expression, considered separately, excludes 1, as the textbook convention and key specify.",
            "sourceEvidence": {"edition": 2025, "EN": {"pdf": 105, "keyPdf": 343, "keyPrinted": 337},
                               "TA": {"pdf": 107, "keyPdf": 357, "keyPrinted": 351}},
            "englishTamilImpact": "Both answers display the original exclusions and the lowest-term convention. Both hint sets explain why cancelling a factor does not extend the original domain.",
            "regression": "site/tools/test_g10_ch3_ex32_to_36_browser.cjs", "deployed": False
        }] + [
            {"id": f"CURR-00{n}", "grade": 10, "chapter": 6, "questionId": f"c10-6-ex6-1-q3-{part}",
             "original": "The proof assumes an acute angle and the rendered answer omits cos θ > 0.",
             "corrected": result, "sourceEvidence": {"edition": 2025, "EN": {"pdf": 256, "printed": 250},
                                                        "TA": {"pdf": 264, "printed": 258}},
             "englishTamilImpact": "Both solutions keep the absolute value and give the 180° counterexample. Both rendered answers state cos θ > 0.",
             "regression": "test_trig_reader.cjs", "deployed": False}
            for n, part, result in [(1, "i", "(1+sin θ)/|cos θ| = |sec θ+tan θ|"),
                                    (2, "ii", "2/|cos θ| = 2|sec θ|")]
        ],
        "verifiedProbabilityWorking": PROBABILITY,
        "openEngineFindings": [
            {**json.loads(candidate_line), "baselineObservedStatus": json.loads(baseline_line)["observedStatus"],
             "repairStatus": "OPEN", "regression": "reproduce_engine.py open-findings"}
            for baseline_line, candidate_line in zip(
                (LOGS / "engine-open-baseline.jsonl").read_text().splitlines(),
                (LOGS / "engine-open-findings.jsonl").read_text().splitlines(), strict=True)
        ],
        "statisticsReviews": {
            "STAT-001": {"grade": 9, "chapter": 8, "questionId": "g9-ch8-ex8.3-q6",
                         "sources": {"EN": 293, "TA": 311},
                         "sourceDifference": "English asks for mode. Tamil asks for mean, median and mode from the same frequencies.",
                         "derived": "Mode 117/2 kg, midpoint-estimated mean 559/10 kg, interpolated median 793/14 kg.",
                         "disposition": "Bilingual working and all three results independently verified."},
            "STAT-002": {"grade": 10, "chapter": 8, "questionId": "c10-8-ex8-1-q5",
                         "sources": {"EN": 319, "TA": 328},
                         "sourceDifference": "English says nine wages. Tamil says ten. Both list the same nine values.",
                         "derived": "For the nine listed values, mean 300 rupees, variance 2000/9 square rupees, deviation 20√5/3 rupees.",
                         "disposition": "The conditional calculation is correct. The tenth Tamil value remains unknown. Existing source status preserved."},
        },
        "quarantine": quarantine,
        "frozenBenchmark": {
            "baseline": {key: baseline[key] for key in ("statuses", "answerStatuses", "claims", "runtimeSec", "peakMemoryMB")},
            "candidate": {key: candidate[key] for key in ("statuses", "answerStatuses", "claims", "runtimeSec", "peakMemoryMB")},
            "observedFileSha256": hashlib.sha256(frozen_path.read_bytes()).hexdigest(),
            "declaredDatasetDigest": frozen["datasetSha256"],
            "productionCardsWithMatchingId": len(runtime_ids & frozen_ids),
            "nonPassWorkingInvestigation": row_reviews,
            "answerAbstentionInvestigation": [{"id": key, "review": SPECIAL[key]}
                                             for key, row in candidate["details"].items()
                                             if row["answer_status"] == "UNVERIFIABLE"],
            "independenceFindings": [
                "334 frozen entries cover Grade 10 chapters 3, 5 and 7, including concepts and practice. The 297 shared production IDs are an ID overlap, not proof of byte equality.",
                "All 153 chapter 3 and all 110 chapter 5 frozen IDs are present in their chapter-specific source fingerprint registries. The registered derivations include literal coefficients. The grade 10 chapter 7 derivations also embed per-question quantities.",
                "The frozen benchmark awards working and answer PASS to c10-3-ex3-4-q2-iii. Its fingerprint explicitly reduces before computing exclusions, correctly matching the textbook's lowest-term key. It leaves the omitted original restriction x≠−2 unchecked.",
                "The V1.5 holdout is visible in the same source file. Thirty expected sets are computed with TypedSet, also used by the system under test. This is a correlated oracle.",
                "Fifteen wrong-working cases, fifteen source-blocked cases, and twenty shaded-region cases exercise only four distinct fixture behaviors. The published count is an execution count.",
                "Historical skipped counts follow confusion-matrix totals. For modern suites the normalizer declares skipped=0 and uses suite-reported counts. It is not an independent skip observer.",
                "Evaluator reads frozen item fields, but echoes a pinned digest without validating the file or recomputing the declared dataset digest. The logged file digest is computed independently.",
                "The broad working and final-answer denominators are different. The final-answer pass-rate calculation excludes abstentions.",
            ],
        },
    })


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("engine", type=Path)
    parser.add_argument("runtime", type=Path)
    args = parser.parse_args()
    main(args.engine, args.runtime)
