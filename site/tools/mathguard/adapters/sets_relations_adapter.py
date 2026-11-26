"""TRACE MathGuard V1.5 — Sets, Relations & Functions Verification Adapter.

Covers:
- Grade 9 Chapter 1: Set Language
- Grade 10 Chapter 1: Relations and Functions

Integrates:
- SetTheoryReasoner (typed sets, operations, minterm identity proofs)
- VennDiagramReasoner (2-set and 3-set region constraints, inconsistency/underdetermined detection)
- RelationReasoner (ordered pairs, Cartesian products, domain/codomain/range, inverse, properties)
- ExtendedFunctionRegistry / FiniteFunction / SymbolicFunction
- Tamil semantic parity for Sets, Relations & Functions
- Textbook ambiguity & source-diagram dependency protection
"""

from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Tuple

from ..reasoning_engine import verify_complete_working
from ..relation_reasoner import RelationReasoner
from ..set_theory_reasoner import SetTheoryReasoner
from ..set_types import TypedSet, parse_set_literal
from ..tamil_sets_parity import check_bilingual_set_parity
from ..venn_reasoner import VennDiagramReasoner
from .base import ChapterAdapter, verify_generic_answer, verify_tamil_math_parity


def _extract_named_sets_from_text(text: str) -> Dict[str, TypedSet]:
    """Extract named finite roster definitions like A = {1, 2, 3} from text."""
    out: Dict[str, TypedSet] = {}
    if not text:
        return out
    s = text.replace("−", "-").replace("–", "-")
    for m in re.finditer(r"(?:^|(?<=[\s;,]))([A-Z]|R_?\d*)\s*=\s*(\{)", s):
        prefix = s[: m.start(1)].rstrip()
        if prefix and prefix[-1] in ("∪", "∩", "\\", "-", "Δ", "×", "∘", "'", "′", ")"):
            continue
        name = m.group(1)
        start = m.start(2)
        depth = 0
        end = -1
        for i in range(start, len(s)):
            if s[i] == "{":
                depth += 1
            elif s[i] == "}":
                depth -= 1
                if depth == 0:
                    end = i
                    break
        if end > start:
            frag = s[start : end + 1]
            parsed = parse_set_literal(frag)
            if isinstance(parsed, TypedSet):
                out[name] = parsed
    return out


def _extract_cardinality_givens(text: str) -> List[Tuple[str, int]]:
    """Extract n(expr) = k givens from question or step text (skipping intermediate arithmetic chains)."""
    out: List[Tuple[str, int]] = []
    if not text:
        return out
    s = text.replace("−", "-").replace("–", "-").replace("’", "'").replace("′", "'")
    for m in re.finditer(r"n\s*\(\s*([^()]+(?:\([^()]*\)[^()]*)*)\s*\)\s*=\s*(?:[^=\n;]*=\s*)?(\d+)(?!\s*[×x·*+\-/])", s):
        expr = m.group(1).strip()
        val = int(m.group(2))
        out.append((expr, val))
    return out


def _detect_ambiguity_flags(item: Dict[str, Any], q_en: str, q_ta: str) -> List[str]:
    """Detect textbook ambiguities, missing universal sets, or external diagram dependencies."""
    flags: List[str] = []
    q_low = q_en.lower()

    if item.get("sourceBlocked") or item.get("source_blocked"):
        flags.append("source_blocked_item")

    has_inline_diagram = bool(item.get("venn") or item.get("diagramData") or item.get("figureData"))
    if re.search(r"\b(?:using the (?:given|adjacent) venn diagram|from the venn diagram|graph given below)\b", q_low) and not has_inline_diagram:
        flags.append("external_diagram_dependency")

    if ("'" in q_en or "′" in q_en or "complement" in q_low) and not re.search(r"\bU\s*=", q_en) and not re.search(r"n\s*\(\s*U\s*\)", q_en):
        if "universal" not in q_low:
            flags.append("possible_missing_universal_set")

    if q_ta and q_en:
        ta_sem = check_bilingual_set_parity(q_en, q_ta)
        if ta_sem.status == "FAIL":
            flags.extend(ta_sem.flags)

    return flags


class SetsRelationsFunctionsAdapter(ChapterAdapter):
    """Certified V1.5 domain adapter for Grade 9 Ch 1 (Set Language) and Grade 10 Ch 1 (Relations & Functions)."""

    domain = "sets_and_relations"
    adapter_status = "verified_v1_5"
    allow_positive_domain = False

    def __init__(self, grade: int, chapter: str, title: str = "") -> None:
        super().__init__(grade, chapter, title)
        self.set_reasoner = SetTheoryReasoner()

    def _verify_set_and_relation_steps(
        self,
        item: Dict[str, Any],
        is_concept: bool,
    ) -> Tuple[int, int, int, int, List[Dict[str, Any]], List[Dict[str, Any]]]:
        q_obj = (item.get("question") if is_concept else item.get("q")) or {}
        q_en = str(q_obj.get("en") or "")
        steps = ((item.get("proof") or {}).get("steps") if is_concept else item.get("steps")) or []

        subpart_envs: List[Dict[str, TypedSet]] = []
        subpart_idx = 0
        if "(i)" in q_en and "(ii)" in q_en:
            for part in re.split(r"\([ivx]+\)", q_en):
                pe = _extract_named_sets_from_text(part)
                if pe:
                    subpart_envs.append(pe)
            env: Dict[str, TypedSet] = dict(subpart_envs[0]) if subpart_envs else _extract_named_sets_from_text(q_en)
        else:
            env = _extract_named_sets_from_text(q_en)
        universal: Optional[TypedSet] = env.get("U")
        card_givens: List[Tuple[str, int]] = _extract_cardinality_givens(q_en)

        total = 0
        verified = 0
        failed = 0
        unsupported = 0
        failed_details: List[Dict[str, Any]] = []
        unsupported_details: List[Dict[str, Any]] = []

        # Only pass pure algebraic steps (dict math, no set-theory symbols) to V1.4 algebraic engine
        alg_steps = []
        for st in steps:
            if not isinstance(st, dict):
                continue
            m_obj = st.get("math")
            if isinstance(m_obj, list):
                continue
            eq_s = str((m_obj.get("latex") if isinstance(m_obj, dict) else "") or st.get("eq") or "")
            if any(sym in eq_s for sym in ("∪", "∩", "∈", "∉", "⊆", "⊂", "∅", "{", "}", "×", "∘", "n(", "P(", "\\text")):
                continue
            if re.search(r"\b[fghSt]\s*\(", eq_s) or re.search(r"[a-zA-Z]{3,}\s+[a-zA-Z]{3,}\s*=", eq_s):
                continue
            alg_steps.append(st)
        alg_item = dict(item)
        if is_concept:
            alg_item["proof"] = {"steps": alg_steps}
        else:
            alg_item["steps"] = alg_steps
        base_work = verify_complete_working(alg_item, is_concept=is_concept, allow_positive_domain=False)

        for idx, st in enumerate(steps):
            if not isinstance(st, dict):
                continue
            st_en = str(st.get("en") or "")
            st_eq = str(st.get("eq") or "")
            st_math = ""
            if isinstance(st.get("math"), dict):
                st_math = str(st["math"].get("latex") or "")
            combined = f"{st_eq} ; {st_en} ; {st_math}"

            step_sets = _extract_named_sets_from_text(combined)
            for k, v in step_sets.items():
                env[k] = v
                if k == "U":
                    universal = v

            # Check set-algebra or Cartesian product claims: LHS = { ... } using balanced braces
            eq_src = (st_eq or st_en).replace("’", "'").replace("′", "'").replace("−", "-").replace("–", "-")
            for m in re.finditer(r"([A-Za-z0-9_'∪∩\\\-Δ×\(\)\s]+?)\s*=\s*(\{)", eq_src):
                prefix = eq_src[: m.start(1)].rstrip()
                if prefix and prefix[-1] in ("∪", "∩", "\\", "-", "Δ", "×", "∘", "="):
                    continue
                lhs_str = m.group(1).strip()
                b_start = m.start(2)
                depth = 0
                b_end = -1
                for bi in range(b_start, len(eq_src)):
                    if eq_src[bi] == "{":
                        depth += 1
                    elif eq_src[bi] == "}":
                        depth -= 1
                        if depth == 0:
                            b_end = bi
                            break
                if b_end <= b_start:
                    continue
                rhs_str = eq_src[b_start : b_end + 1].strip()
                rhs_set = parse_set_literal(rhs_str)
                if not isinstance(rhs_set, TypedSet):
                    continue
                if re.fullmatch(r"[A-Za-z]|R_?\d*", lhs_str):
                    continue

                m_cart = re.fullmatch(r"([A-Z])\s*[×x]\s*([A-Z])", lhs_str)
                if m_cart:
                    s1, s2 = m_cart.group(1), m_cart.group(2)
                    if s1 in env and s2 in env:
                        total += 1
                        res = RelationReasoner.verify_cartesian_product_claim(env[s1], env[s2], rhs_str)
                        if res.get("equal") or res.get("status") == "PASS":
                            verified += 1
                        else:
                            failed += 1
                            failed_details.append({
                                "step": idx,
                                "claim": f"{lhs_str} = {rhs_str}",
                                "reason": res.get("reason", "Cartesian product mismatch"),
                            })
                    continue

                # General set expression evaluation
                ev = self.set_reasoner.evaluate(lhs_str, env=env, universe=universal)
                if ev.ok and isinstance(ev.value, TypedSet):
                    if ev.value != rhs_set and subpart_idx + 1 < len(subpart_envs):
                        nxt_env = subpart_envs[subpart_idx + 1]
                        nxt_ev = self.set_reasoner.evaluate(lhs_str, env=nxt_env, universe=nxt_env.get("U"))
                        if nxt_ev.ok and nxt_ev.value == rhs_set:
                            subpart_idx += 1
                            env = dict(nxt_env)
                            universal = env.get("U")
                            ev = nxt_ev
                    total += 1
                    if ev.value == rhs_set:
                        verified += 1
                    else:
                        failed += 1
                        failed_details.append({
                            "step": idx,
                            "claim": f"{lhs_str} = {rhs_str}",
                            "expected": str(ev.value),
                            "reason": "Set operation mismatch",
                        })

            # Check cardinality claims n(X) = k
            for c_expr, c_val in _extract_cardinality_givens(st_eq or st_en):
                if c_expr in env:
                    total += 1
                    if env[c_expr].cardinality == c_val:
                        verified += 1
                    else:
                        failed += 1
                        failed_details.append({
                            "step": idx,
                            "claim": f"n({c_expr}) = {c_val}",
                            "expected": env[c_expr].cardinality,
                            "reason": "Cardinality mismatch",
                        })
                elif re.fullmatch(r"[A-Z]\s*[×x]\s*[A-Z]", c_expr):
                    parts = re.split(r"\s*[×x]\s*", c_expr)
                    if parts[0] in env and parts[1] in env:
                        total += 1
                        exp_c = env[parts[0]].cardinality * env[parts[1]].cardinality
                        if exp_c == c_val:
                            verified += 1
                        else:
                            failed += 1
                            failed_details.append({"step": idx, "claim": f"n({c_expr}) = {c_val}", "expected": exp_c})
                elif card_givens and (c_expr, c_val) not in card_givens and "×" not in c_expr and not ("(i)" in q_en and "(ii)" in q_en):
                    bool_givens = [(g_e, g_v) for g_e, g_v in card_givens if "×" not in g_e and "P(" not in g_e]
                    set_vars = sorted({ch for g_e, _ in bool_givens for ch in re.findall(r"\b([A-C])\b", g_e)})
                    if len(set_vars) in (2, 3):
                        try:
                            solver = VennDiagramReasoner(set_vars)
                            for g_e, g_v in bool_givens:
                                solver.add_constraint(g_e, g_v)
                            vres = solver.solve([c_expr])
                            if c_expr in vres.determined_quantities:
                                total += 1
                                if int(vres.determined_quantities[c_expr]) == c_val:
                                    verified += 1
                                else:
                                    failed += 1
                                    failed_details.append({"step": idx, "claim": f"n({c_expr}) = {c_val}", "expected": int(vres.determined_quantities[c_expr])})
                            elif vres.status == "INCONSISTENT":
                                total += 1
                                failed += 1
                                failed_details.append({"step": idx, "claim": f"n({c_expr}) = {c_val}", "reason": vres.reason})
                        except ValueError:
                            pass

        return (
            base_work.total_claims + total,
            base_work.verified_claims + verified,
            base_work.failed_claims + failed,
            base_work.unsupported_claims + unsupported,
            list(base_work.failed_details) + failed_details,
            list(base_work.unsupported_details) + unsupported_details,
        )

    def verify_item(self, item: Dict[str, Any], is_concept: bool = False) -> Dict[str, Any]:
        qid = str(item.get("id") or item.get("stageId") or "")
        q_obj = (item.get("question") if is_concept else item.get("q")) or {}
        q_en = str(q_obj.get("en") or "")
        q_ta = str(q_obj.get("ta") or "")

        ambiguity_flags = _detect_ambiguity_flags(item, q_en, q_ta)
        sanitized_steps = []
        for st in (((item.get("proof") or {}).get("steps") if is_concept else item.get("steps")) or []):
            if not isinstance(st, dict):
                continue
            m_obj = st.get("math")
            if isinstance(m_obj, list):
                continue
            eq_s = str((m_obj.get("latex") if isinstance(m_obj, dict) else "") or st.get("eq") or "")
            if any(sym in eq_s for sym in ("∪", "∩", "∈", "∉", "⊆", "⊂", "∅", "{", "}", "×", "∘", "n(", "P(", "\\text")):
                continue
            if re.search(r"\b[fghSt]\s*\(", eq_s) or re.search(r"[a-zA-Z]{3,}\s+[a-zA-Z]{3,}\s*=", eq_s):
                continue
            sanitized_steps.append(st)
        san_item = dict(item)
        if is_concept:
            san_item["proof"] = {"steps": sanitized_steps}
        else:
            san_item["steps"] = sanitized_steps
        base_work = verify_complete_working(san_item, is_concept=is_concept, allow_positive_domain=False)
        tot_c, ver_c, fail_c, unsup_c, fail_det, unsup_det = self._verify_set_and_relation_steps(item, is_concept)

        q_low = q_en.lower()
        has_domain_context = (
            "unsupported domain" not in q_low
            and bool(
                re.search(
                    r"(?:∪|∩|∈|∉|⊆|⊂|∅|×|Δ|\{|\}|n\s*\(|P\s*\(|[fgh]\s*\(|\b(?:set|sets|subset|union|intersection|complement|venn|relation|function|codomain|range|ordered\s+pair|cartesian|bijective|injective|surjective|onto|one-to-one)\b|(?<!unsupported\s)\bdomain\b)",
                    q_en + " " + " ".join(str(s.get("eq") or "") + " " + str(s.get("en") or "") for s in (((item.get("proof") or {}).get("steps") if is_concept else item.get("steps")) or []) if isinstance(s, dict)),
                    re.I,
                )
            )
        )

        if not has_domain_context:
            return {
                "id": qid,
                "grade": self.grade,
                "chapter": self.chapter,
                "domain": self.domain,
                "item_type": "concept" if is_concept else "exercise",
                "working_status": "UNVERIFIABLE",
                "answer_status": "UNVERIFIABLE",
                "tamil_status": "UNVERIFIABLE",
                "tamil_flags": [],
                "ambiguity_flags": ambiguity_flags + ["no_domain_context"],
                "total_claims": 0,
                "verified_claims": 0,
                "failed_claims": 0,
                "unsupported_claims": 0,
                "failed_details": [],
                "unsupported_details": [],
                "discrepancy": "No set-theory, relation, or function mathematical context found; abstaining",
            }

        if fail_c > 0:
            work_status = "FAIL"
        elif ver_c > 0 and unsup_c == 0:
            work_status = "PASS"
        elif ver_c > 0:
            work_status = "PARTIAL"
        else:
            work_status = base_work.status

        if fail_c > 0:
            ans_status, ans_disc = "FAIL", f"Working failed: {fail_det[:1]}"
        elif "source_blocked_item" in ambiguity_flags:
            ans_status, ans_disc = "UNVERIFIABLE", "source_blocked_item"
        else:
            ans_obj = item.get("answer")
            ans_en = str(ans_obj.get("en") if isinstance(ans_obj, dict) else (ans_obj or "")).strip()
            if not ans_en:
                ans_status, ans_disc = "UNVERIFIABLE", "empty_answer"
            elif work_status == "PASS":
                ans_status, ans_disc = "PASS", "set_theory_working_verified"
            else:
                ans_status, ans_disc = verify_generic_answer(item, base_work, is_concept=is_concept, allow_positive_domain=False)
                if ans_status == "FAIL" and any(sym in ans_en for sym in ("{", "}", "∅", "∪", "∩", "×")):
                    ans_status, ans_disc = "UNVERIFIABLE", "set_answer_requires_full_context"

        ta_res = verify_tamil_math_parity(item, is_concept=is_concept)
        ta_flags = list(ta_res.flags)
        ta_status = ta_res.status
        if ta_status == "FAIL":
            # Re-verify step mismatches with Sets/Relations bilingual parity engine
            steps_list = ((item.get("proof") or {}).get("steps") if is_concept else item.get("steps")) or []
            filtered_flags = []
            for fl in ta_flags:
                m_st = re.match(r"^step_(\d+)_", fl)
                if m_st:
                    sidx = int(m_st.group(1))
                    if sidx < len(steps_list) and isinstance(steps_list[sidx], dict):
                        st = steps_list[sidx]
                        st_m = (st.get("math") or {}).get("latex") if isinstance(st.get("math"), dict) else ""
                        res_sp = check_bilingual_set_parity(str(st.get("en") or ""), str(st.get("ta") or ""), math_latex=str(st_m or ""), eq_text=str(st.get("eq") or ""))
                        if res_sp.status == "PASS":
                            continue
                filtered_flags.append(fl)
            ta_flags = filtered_flags
            if not any("mismatch" in f or "missing_tamil" in f or "placeholder" in f for f in ta_flags):
                ta_status = "PARTIAL" if ta_flags else "PASS"
        if q_ta and q_en:
            sets_ta = check_bilingual_set_parity(q_en, q_ta)
            for fl in sets_ta.flags:
                if fl not in ta_flags:
                    ta_flags.append(fl)
            if sets_ta.status == "FAIL":
                ta_status = "FAIL"

        return {
            "id": qid,
            "grade": self.grade,
            "chapter": self.chapter,
            "domain": self.domain,
            "item_type": "concept" if is_concept else "exercise",
            "validation_method": "set_relations_functions_reasoner",
            "working_status": work_status,
            "answer_status": ans_status,
            "tamil_status": ta_status,
            "tamil_flags": ta_flags,
            "ambiguity_flags": ambiguity_flags,
            "total_claims": tot_c,
            "verified_claims": ver_c,
            "failed_claims": fail_c,
            "unsupported_claims": unsup_c,
            "failed_details": fail_det,
            "unsupported_details": unsup_det,
            "discrepancy": ans_disc,
        }
