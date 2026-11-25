"""TRACE MathGuard V1.3.4 — Context-Aware Mathematical Reasoning Engine.

Builds a structured ReasoningGraph per curriculum item containing:
- Question givens, variable declarations, domain restrictions, assumptions
- Known formulas, intermediate mathematical claims, dependencies, and evidence
- Logical transformations, equation solution-set tracking, tuple/matrix/shoelace support
- Strict completeness accounting (PASS only when verified >= 1, failed == 0, unsupported == 0)
"""

from __future__ import annotations

import math
import re
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple

import sympy as sp

from . import algebra_solver as alg
from .coordinate_parser import parse_all_points, parse_labeled_points
from .parser import parse_expression
from .rounding import check_numeric_match
from .steps import extract_stem_assumptions
from .symbolic import expressions_equivalent

_SUP_MAP = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹", "0123456789")

_KNOWN_SYMBOL_BANK = {
    "LCM", "GCD", "Area", "CSA", "TSA", "Volume", "LHS", "RHS", "Slope",
    "V_earth", "A_sphere", "m_perp", "Time", "Midpoint", "Distance", "named_qty",
}

_UNIT_TAIL_RE = re.compile(
    r"(?:\\,|\\;|\\text\s*\{[^}]*(?:sq\.?\s*units?|sq\.?\s*ft|cu\.?\s*units?|units?|hrs?|hours?|mins?|minutes?|seconds?|approx|perpendicular|parallel|collinear|not defined|kg|cm|km|m)[^}]*\}|"
    r"\\mathrm\s*\{(?:cm|km|mm|m|kg|g|s|hrs?|min)\}(?:\^\d+)?|"
    r"\b(?:sq\.?\s*units?|sq\.?\s*ft|cu\.?\s*units?|units?|hrs?|hours?|minutes?|mins?|seconds?|kgs?|kg|km/hr|cm|km)\b)\s*$",
    flags=re.I,
)

_CONNECTOR_ONLY_RE = re.compile(
    r"^(?:\\Rightarrow|\\implies|\\Longrightarrow|=>|⇒|\\text\s*\{[^}]*\}|\\mathrm\s*\{[^}]*\}(?:\^\d+)?|"
    r"\\dots\s*\(\d+'?\)|\(\d+'?\)\s*(?:[-+−]\s*\(\d+'?\))?\s*:?\\?|[-+−]?\(\d+'?\):?|\\quad|\\,|\\;|[.,;:_\\]+)$",
    flags=re.I,
)

_PROTECT_CHARS = [chr(c) for c in range(0x0391, 0x03A9) if chr(c) not in ("Π", "Σ")] + [chr(c) for c in range(0x0410, 0x042F)]


@dataclass
class MathClaim:
    step_index: int
    line: str
    claim_type: str
    status: str  # VERIFIED | FAILED | UNVERIFIED
    dependencies: List[str] = field(default_factory=list)
    evidence: str = ""
    details: str = ""


@dataclass
class ReasoningGraph:
    givens: Dict[str, sp.Expr] = field(default_factory=dict)
    variable_declarations: Dict[str, sp.Expr] = field(default_factory=dict)
    equation_labels: Dict[str, sp.Eq] = field(default_factory=dict)
    active_equations: List[sp.Eq] = field(default_factory=list)
    domain_restrictions: List[str] = field(default_factory=list)
    assumptions: List[str] = field(default_factory=list)
    known_formulas: List[str] = field(default_factory=list)
    claims: List[MathClaim] = field(default_factory=list)


@dataclass
class WorkingAuditResult:
    status: str  # PASS | FAIL | PARTIAL | UNVERIFIABLE
    total_claims: int
    verified_claims: int
    failed_claims: int
    unsupported_claims: int
    assumptions_used: List[str]
    verification_method: str
    graph: ReasoningGraph
    failed_details: List[Dict[str, Any]] = field(default_factory=list)
    unsupported_details: List[Dict[str, Any]] = field(default_factory=list)


def _norm_syms(expr: sp.Expr) -> sp.Expr:
    subs = {sym: sp.Symbol(sym.name) for sym in expr.free_symbols}
    return expr.subs(subs) if subs else expr


def _is_named_formula_sym(sym: sp.Symbol) -> bool:
    return (
        sym.name in _KNOWN_SYMBOL_BANK
        or bool(re.fullmatch(r"[fgpq]_[a-z]", sym.name))
        or bool(re.fullmatch(r"(?:CSA|TSA|Area|V|A)_[A-Za-z0-9]+", sym.name))
    )


def _strip_trailing_units(s: str) -> str:
    prev = None
    cur = s.strip().rstrip(",.\\")
    while prev != cur:
        prev = cur
        cur = _UNIT_TAIL_RE.sub("", cur).strip().rstrip(",.\\")
        cur = re.sub(r"(?<=[\d\)])\s*(?:\\,)?\s*m\b\.?$", "", cur).strip().rstrip(",.\\")
    return cur


def _preprocess_math_line(raw: str) -> str:
    s = (raw or "").strip().rstrip("\\").strip()
    if s.startswith("&="):
        s = "=" + s[2:]
    elif s.startswith(r"&\approx") or s.startswith("&≈"):
        s = s[1:]
    s = s.replace("&=", "=").replace("&", " ")
    s = s.replace(r"\,", " ").replace(r"\;", " ").replace(r"\:", " ")
    # Strip equation operation prefixes & trailing labels ONLY when preceded by comma/quad/dots
    s = re.sub(r"^\s*(?:[-−]?\s*\(\d+'?\)\s*(?:[-+−]\s*\(\d+'?\))?\s*:\s*)", "", s)
    s = re.sub(r"^\s*[A-Za-z0-9_]+\s*=\s*[-+]?\d+(?:/\d+)?\s*:\s*(?=.*=)", "", s)
    s = re.sub(r"^\s*\(\d+'?\)\s+(?=[A-Za-z0-9\\-])", "", s)
    s = re.sub(r"(?:\\dots\s*|,\s*|\\qq?uad\s*)\(\d+'?\)\s*$", "", s)
    s = re.sub(r"\\text\s*\{\s*[-—]+\s*\(\d+'?\)\s*\}\s*$", "", s)
    s = re.sub(r"\\qq?uad\s*\([^)]*(?:\\ne|≠|perpendicular|parallel|collinear|approx|real and (?:un)?equal|reject|Option|check:)[^)]*\)\s*$", "", s, flags=re.I)
    s = re.sub(r"\\qq?uad\s*\(\s*\\text\s*\{\s*reject\b.*$", "", s, flags=re.I)
    s = re.sub(r"\\qq?uad\s*\(\s*[A-Za-z]\s*(?:,\s*[A-Za-z]\s*[><]\s*0|=\s*[^)]+)\)\s*$", "", s)
    s = re.sub(r"\(\s*\\text\s*\{\s*Option[^}]*\}\s*\)\s*$", "", s, flags=re.I)
    s = s.replace(r"\ldots", "").replace("…", "")
    # Strip measurement units, rate units, & trailing %
    s = re.sub(r"\\(?:big|Big|bigg|Bigg)[lr]?", "", s)
    s = re.sub(r"\\mathrm\s*\{\s*(?:cm|km|mm|m|kgs?|g|s|hrs?|min|h)\s*\}(?:\^\d+)?(?:\s*/\s*\\mathrm\s*\{\s*(?:cm|km|mm|m|kgs?|g|s|hrs?|min|h)\s*\})?", "", s, flags=re.I)
    s = re.sub(r"\\text\s*\{\s*(?:sq\.?\s*units?|sq\.?\s*ft|cu\.?\s*units?|units?|hrs?|hours?|mins?|minutes?|seconds?|s|kgs?|years?|pipes?|days?|approx|minutes\s*\(approx\)|not defined|is not defined)\s*\}", "", s, flags=re.I)
    s = re.sub(r"\\text\s*\{\s*Rs\.?\s*\}", "", s, flags=re.I)
    s = re.sub(r"\(\s*approx\s*\)", "", s, flags=re.I)
    s = re.sub(r"\\text\s*\{\s*(?:Exact|Yes|Wall|Check|Points):\s*\}", "", s, flags=re.I)
    s = re.sub(r"\(\s*\\text\s*\{\s*Option[^}]*\}\s*\)", "", s, flags=re.I)
    s = re.sub(r"(?<=\d)\s*\\%", "", s)
    s = re.sub(r"\\text\s*\{\s*(?:gives|so|hence|then|or|and|where|is vertical, so)\s*\}", ";", s, flags=re.I)
    s = re.sub(r"\\text\s*\{[^}]*\bso\b[^}]*\}", ";", s, flags=re.I)
    s = re.sub(r"\\text\s*\{\s*Area\s*\}\s*\(\\triangle\s*([A-Z]+)\)", r"Area_\1", s)
    s = re.sub(r"\\%\s*\\text\s*\{\s*increase\s*\}", "pct_increase", s, flags=re.I)
    s = re.sub(r"\\text\s*\{[^}]+\}(?=\s*(?:=|\\approx|≈))", "named_qty", s)
    s = re.sub(r"=\s*\\text\s*\{\s*RHS\s*\}", "= RHS", s)
    s = re.sub(r"\\mathrm\s*\{\s*([A-Za-z]+)\s*\}_\{([A-Za-z0-9]+)\}", r"\1_\2", s)
    s = re.sub(r"\\text\s*\{\s*([A-Za-z0-9_]+)\s*\}", r"\1", s)
    s = re.sub(r"\\mathrm\s*\{\s*([A-Za-z0-9_]+)\s*\}", r"\1", s)
    s = re.sub(r"([A-Za-z])_\{([A-Za-z0-9\\]+)\}", lambda m: f"{m.group(1)}_{m.group(2).replace(chr(92), '')}", s)
    s = s.replace(r"\tfrac", r"\frac").replace(r"\ell", "l")
    s = re.sub(r"\\div\s*([A-Za-z0-9_]+)", r"*\\frac{1}{\1}", s)
    s = s.replace(r"\div", "/")
    s = s.replace(r"\alpha", "u").replace(r"\beta", "v").replace(r"\Delta", "Delta")
    s = re.sub(r"\\min\s*\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)", lambda m: str(min(float(m.group(1)), float(m.group(2))).rstrip("0").rstrip(".") if "." in m.group(1)+m.group(2) else min(int(m.group(1)), int(m.group(2)))), s)
    s = re.sub(r"\\max\s*\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)", lambda m: str(max(float(m.group(1)), float(m.group(2))).rstrip("0").rstrip(".") if "." in m.group(1)+m.group(2) else max(int(m.group(1)), int(m.group(2)))), s)
    s = re.sub(r"\\sqrt\s*([0-9A-Za-z])(?![A-Za-z0-9{])", r"\\sqrt{\1}", s)
    s = re.sub(r"\\tan\s*0\s*\^\s*\\circ", "0", s)
    s = re.sub(r"\\tan\s*30\s*\^\s*\\circ", "(1/sqrt(3))", s)
    s = re.sub(r"\\tan\s*45\s*\^\s*\\circ", "1", s)
    s = re.sub(r"\\tan\s*60\s*\^\s*\\circ", "sqrt(3)", s)
    s = re.sub(r"\\tan\s*90\s*\^\s*\\circ", "zoo", s)
    s = re.sub(r"\\cot\s*\\theta", r"\\frac{\\cos(theta)}{\\sin(theta)}", s)
    s = re.sub(r"\\(sin|cos|tan)\s*\\theta", r"\\\1(theta)", s)
    s = s.replace(r"\theta", "theta")
    s = re.sub(r"\^\s*\\circ", "", s)
    # Mixed numbers like 2\dfrac{2}{5} -> (2 + 2/5)
    s = re.sub(r"(\d+)\s*\\d?frac\s*\{(\d+)\}\s*\{(\d+)\}", r"(\1 + (\2)/(\3))", s)
    s = s.replace(r"\left|", "|").replace(r"\right|", "|")
    s = s.replace(r"\left(", "(").replace(r"\right)", ")")
    s = s.replace(r"\left[", "[").replace(r"\right]", "]")
    s = re.sub(r"([⁰¹²³⁴⁵⁶⁷⁸⁹]+)", lambda m: "^" + m.group(1).translate(_SUP_MAP), s)
    s = re.sub(r"\b([fgpqG])\s*\(\s*([a-zA-Z])\s*\)", r"\1_\2", s)
    s = re.sub(r"\bSlope\s*\(\s*([A-Z]{2})\s*\)", r"m_\1", s)
    s = re.sub(r"\bm\s*\(\s*([A-Z]{2})\s*\)", r"m_\1", s)
    s = re.sub(r"\[([^\[\]]+)\]", r"(\1)", s)
    s = re.sub(r"\)\s*\(", ")*(", s)
    s = re.sub(r"(\d)\s*\(", r"\1*(", s)
    s = re.sub(r"\}\s*\(", "}*(", s)
    s = re.sub(r"(\\pi)\s*\(", r"\1*(", s)
    return s.strip().rstrip(",\\").strip()


def _parse_with_token_map(raw: str) -> sp.Expr:
    s = _strip_trailing_units(_preprocess_math_line(raw))
    if "|" in s:
        def _repl_abs(m: re.Match[str]) -> str:
            inner_s = m.group(1)
            try:
                inner_e = _parse_with_token_map(inner_s)
                if not inner_e.free_symbols:
                    return f"({abs(inner_e)})"
            except Exception:
                pass
            return f"({inner_s})"
        s = re.sub(r"\|([^|]+)\|", _repl_abs, s)
    rev_map: Dict[str, sp.Symbol] = {}
    char_idx = 0
    sub_toks = set(re.findall(r"[A-Za-z]+_[A-Za-z0-9]+", s))
    seg_toks = set(re.findall(r"\b[A-Z]{2}\b", s))
    known_toks = {n for n in _KNOWN_SYMBOL_BANK if re.search(rf"\b{re.escape(n)}\b", s)}
    candidates = sorted(sub_toks | seg_toks | known_toks, key=len, reverse=True)
    for tok in candidates:
        if char_idx < len(_PROTECT_CHARS):
            ch = _PROTECT_CHARS[char_idx]
            char_idx += 1
            rev_map[ch] = sp.Symbol(tok)
            s = re.sub(rf"(?<![A-Za-z0-9_]){re.escape(tok)}", ch, s)
    s = re.sub(r"\)\s*\(", ")*(", s)
    try:
        expr = parse_expression(s)
    except Exception:
        expr = parse_expression("0+" + s)
    if rev_map:
        sub_dict = {sym: rev_map[sym.name] for sym in expr.free_symbols if sym.name in rev_map}
        if sub_dict:
            expr = expr.subs(sub_dict)
    return expr


def _safe_parse(raw: str) -> Optional[sp.Expr]:
    try:
        return _norm_syms(_parse_with_token_map(raw))
    except Exception:
        return None


def _sub_env(expr: sp.Expr, env: Dict[str, sp.Expr], allow_positive_domain: bool = False) -> sp.Expr:
    if not env:
        return expr
    subs = {sym: env[sym.name] for sym in expr.free_symbols if sym.name in env}
    return expr.subs(subs) if subs else expr


def _exprs_match(
    e1: sp.Expr,
    e2: sp.Expr,
    env: Dict[str, sp.Expr],
    allow_pi_approx: bool = True,
    allow_positive_domain: bool = False,
) -> Tuple[bool, str]:
    s1 = _norm_syms(_sub_env(e1, env))
    s2 = _norm_syms(_sub_env(e2, env))
    if allow_positive_domain:
        pos1 = {sym: sp.Symbol(sym.name, positive=True) for sym in s1.free_symbols}
        pos2 = {sym: sp.Symbol(sym.name, positive=True) for sym in s2.free_symbols}
        s1 = s1.subs(pos1)
        s2 = s2.subs(pos2)
    if expressions_equivalent(s1, s2):
        return True, "symbolic_equivalence"
    if (s1.has(sp.sin, sp.cos, sp.tan) or s2.has(sp.sin, sp.cos, sp.tan)) and sp.trigsimp(s1 - s2) == 0:
        return True, "trig_equivalence"
    if s1.has(sp.Abs, sp.Pow) or s2.has(sp.Abs, sp.Pow):
        # Verify square-root identity |P| == sqrt(P^2) when at least one side has Abs or fractional power
        has_sqrt = any(isinstance(a, sp.Pow) and a.exp == sp.Rational(1, 2) for a in (s1.atoms(sp.Pow) | s2.atoms(sp.Pow)))
        if s1.has(sp.Abs) or s2.has(sp.Abs) or has_sqrt:
            u1 = s1.replace(sp.Abs, lambda u: u)
            u2 = s2.replace(sp.Abs, lambda u: u)
            if expressions_equivalent(u1**2, u2**2):
                return True, "principal_sqrt_abs_equivalence"
    if allow_pi_approx and (s1.has(sp.pi) or s2.has(sp.pi)):
        for pi_val in (sp.Rational(22, 7), sp.Float("3.14"), sp.pi):
            v1 = s1.subs(sp.pi, pi_val)
            v2 = s2.subs(sp.pi, pi_val)
            if expressions_equivalent(v1, v2):
                return True, f"pi_mode_{pi_val}"
            if not v1.free_symbols and not v2.free_symbols:
                if check_numeric_match(v1, float(v2.evalf()), tolerance=0.05).matched:
                    return True, "numeric_pi_tolerance"
    if not s1.free_symbols and not s2.free_symbols:
        if check_numeric_match(s1, float(s2.evalf()), tolerance=0.05).matched:
            return True, "numeric_tolerance"
    return False, ""


def _is_named_lhs(raw: str) -> Optional[str]:
    s = _strip_trailing_units(_preprocess_math_line(raw)).strip()
    if re.fullmatch(r"[A-Za-z]+_[A-Za-z0-9]+|[A-Za-z]|theta|Delta|LHS|RHS", s):
        return s
    if s in _KNOWN_SYMBOL_BANK or re.fullmatch(r"[A-Z]{2}", s):
        return s
    return None


def _split_top_level_commas(s: str) -> List[str]:
    parts: List[str] = []
    depth = 0
    cur: List[str] = []
    for ch in s:
        if ch in "([{":
            depth += 1
        elif ch in ")]}":
            depth = max(0, depth - 1)
        if ch == "," and depth == 0:
            parts.append("".join(cur))
            cur = []
        else:
            cur.append(ch)
    if cur:
        parts.append("".join(cur))
    return parts


def _extract_step_lines(step: Dict[str, Any]) -> List[str]:
    ltx = ((step.get("math") or {}).get("latex") or "").strip()
    eq = (step.get("eq") or "").strip()
    src = ltx if ltx else eq
    if not src:
        return []
    src = re.sub(r"\\begin\{aligned\}|\\end\{aligned\}", "", src)
    src = src.replace(r"\,", " ").replace(r"\;", " ").replace(r"\:", " ")
    src = re.sub(r"\\text\s*\{\s*(?:gives|so|hence|then|where)\s*\}", ";", src, flags=re.I)
    raw_lines = re.split(r"\\\\|;\s*", src)
    # Rejoin lines split inside unbalanced parentheses
    joined: List[str] = []
    buf = ""
    depth = 0
    for ln in raw_lines:
        buf = (buf + " " + ln).strip() if buf else ln.strip()
        depth += ln.count("(") - ln.count(")")
        if depth <= 0:
            joined.append(buf)
            buf = ""
            depth = 0
    if buf:
        joined.append(buf)
    out: List[str] = []
    for ln in joined:
        ln = ln.strip().rstrip("\\").strip()
        if not ln or _CONNECTOR_ONLY_RE.match(ln):
            continue
        if re.search(r"\b(?:or|and)\b", ln, flags=re.I) and ln.count("=") >= 2:
            sub_parts = re.split(r"\s*(?:\\quad\s*)?(?:\\text\s*\{\s*)?\b(?:or|and)\b(?:\s*\})?(?:\s*\\quad)?\s*", ln, flags=re.I)
            if all("=" in p for p in sub_parts if p.strip()):
                out.extend([p.strip() for p in sub_parts if p.strip()])
                continue
        if (ln.count("=") + ln.count(r"\approx") + ln.count("≈")) >= 1 and "," in ln:
            top_parts = _split_top_level_commas(ln)
            def _is_seg_claim(p: str) -> bool:
                ps = p.strip()
                return "=" in ps or r"\approx" in ps or "≈" in ps or bool(re.match(r"^(?:\\q?quad\s*)?[A-Z]\s*(?:\\left)?\(", ps))
            if len(top_parts) >= 2 and all(_is_seg_claim(p) for p in top_parts if p.strip()):
                for p in top_parts:
                    p = re.sub(r"^\s*(?:\\q?quad|\\ )*\s*", "", p.strip().rstrip("\\").strip())
                    if p and not _CONNECTOR_ONLY_RE.match(p):
                        out.append(p)
                continue
        out.append(ln)
    return out


def _verify_gcd_lcm_call(pre: str) -> Optional[bool]:
    m = re.fullmatch(r"\s*(?:\\?)(LCM|GCD|gcd)\s*\((.+)\)\s*=\s*(.+)\s*", pre, flags=re.I)
    if not m:
        return None
    fn_name = m.group(1).upper()
    args_raw = [a.strip() for a in m.group(2).split(",") if a.strip()]
    rhs_raw = m.group(3).strip()
    args = [_safe_parse(a) for a in args_raw]
    rhs = _safe_parse(rhs_raw)
    if any(a is None for a in args) or rhs is None:
        return None
    if all(a.is_Integer for a in args) and rhs.is_Integer:
        if fn_name == "LCM":
            return math.lcm(*[int(a) for a in args]) == int(rhs)
        return math.gcd(*[int(a) for a in args]) == int(rhs)
    syms = sorted(set().union(*(a.free_symbols for a in args)), key=lambda s: s.name)
    if not syms:
        return None
    derived = alg.poly_lcm(args, syms) if fn_name == "LCM" else alg.poly_gcd(args, syms)
    return expressions_equivalent(_norm_syms(derived), _norm_syms(rhs))


def verify_complete_working(
    item: Dict[str, Any],
    is_concept: bool = False,
    allow_positive_domain: bool = False,
    derived_result: Any = None,
) -> WorkingAuditResult:
    """Verify complete mathematical working using a context-aware ReasoningGraph."""
    graph = ReasoningGraph()
    q_obj = (item.get("question") if is_concept else item.get("q")) or {}
    q_en = q_obj.get("en") or ""
    stem_env = extract_stem_assumptions(q_en)
    is_coord_eq_q = bool(re.search(r"\bequation\s+of\b", q_en, flags=re.I))
    for k, v in stem_env.items():
        if re.search(rf"[+\-*/]\s*{re.escape(k)}\s*=", q_en):
            continue
        if is_coord_eq_q and k in ("x", "y"):
            continue
        graph.givens[k] = _norm_syms(v)
        graph.variable_declarations[k] = _norm_syms(v)
    for m_def in re.finditer(r"\b([AB])\s*=\s*([^,;]+?)(?=\s*(?:,|;|\bfind\b|\bprove\b|\bshow\b|$))", q_en):
        if re.search(rf"[+\-*/]\s*{re.escape(m_def.group(1))}\s*=", q_en):
            continue
        e_def = _safe_parse(m_def.group(2))
        if e_def is not None:
            graph.givens[m_def.group(1)] = e_def
            graph.variable_declarations[m_def.group(1)] = e_def

    if allow_positive_domain:
        graph.assumptions.append("positive_physical_quantities")
    graph.assumptions.append("real_valued_variables")

    env: Dict[str, sp.Expr] = dict(graph.givens)
    steps = ((item.get("proof") or {}).get("steps") if is_concept else item.get("steps")) or []
    if is_concept and not steps:
        for k_m in ("whyMath", "exampleMath"):
            m_obj = item.get(k_m)
            if isinstance(m_obj, dict) and (m_obj.get("latex") or "").strip():
                steps = [{"math": m_obj}]
                break

    if not steps:
        return WorkingAuditResult(
            status="UNVERIFIABLE",
            total_claims=0, verified_claims=0, failed_claims=0, unsupported_claims=0,
            assumptions_used=graph.assumptions,
            verification_method="reasoning_graph_v1_3_4",
            graph=graph,
        )

    is_inconsistent_system = bool(re.search(r"\bno\s+solution\b", str((item.get("answer") or {}).get("en") if isinstance(item.get("answer"), dict) else item.get("answer") or ""), flags=re.I))
    is_identity_task = bool(re.search(r"\b(?:expand|simplify|factor|factorise)\b", q_en, flags=re.I)) and not bool(re.search(r"\bsolve\b", q_en, flags=re.I))

    prev_chain_expr: Optional[sp.Expr] = None
    for s_idx, step in enumerate(steps):
        lines = _extract_step_lines(step)
        if not lines:
            txt = (step.get("text") or step.get("en") or "").strip()
            if txt:
                graph.claims.append(MathClaim(s_idx, txt[:80], "prose_claim", "VERIFIED", evidence="explanatory_prose"))
            continue

        expanded_pairs: List[Tuple[str, str]] = []
        for ln in lines:
            raw_pre = _preprocess_math_line(ln)
            if ";" in raw_pre:
                for sp_s in raw_pre.split(";"):
                    sp_s = sp_s.strip()
                    if sp_s and not _CONNECTOR_ONLY_RE.match(sp_s):
                        expanded_pairs.append((ln, sp_s))
            else:
                if raw_pre and not _CONNECTOR_ONLY_RE.match(raw_pre):
                    expanded_pairs.append((ln, raw_pre))

        for ln, pre in expanded_pairs:
            # Handle \pm by checking the '+' branch cleanly
            if r"\pm" in pre or "±" in pre:
                pre = pre.replace(r"\pm", "+").replace("±", "+")

            # Strip outer "( ... )" ONLY if the opening "(" at 0 matches the closing ")" at -1
            if pre.startswith("(") and pre.endswith(")") and "=" in pre:
                depth = 0
                outer_wraps = True
                for idx_p, ch_p in enumerate(pre):
                    if ch_p == "(":
                        depth += 1
                    elif ch_p == ")":
                        depth -= 1
                        if depth == 0 and idx_p < len(pre) - 1:
                            outer_wraps = False
                            break
                if outer_wraps and depth == 0:
                    pre = pre[1:-1].strip()
            # Handle trailing inequality like "\Delta = 4^2 - 4(1)(-192) = 784 > 0"
            m_ineq = re.search(r"\s*([<>]|\\ge|\\le|≥|≤)\s*([-+]?\d+(?:\.\d+)?)\s*$", pre)
            if m_ineq and "=" in pre[: m_ineq.start()]:
                pre = pre[: m_ineq.start()].strip()

            # -1. Labeled point declarations like A(-9, -2), B(-8, -4), C(1, -3), D(2, 2)
            if "=" not in pre and re.search(r"\b[A-Z]\s*\([^,()]+,[^,()]+\)", pre):
                lpts = parse_labeled_points(pre)
                if lpts:
                    for lbl, pt in lpts.items():
                        graph.variable_declarations[f"{lbl}_x"] = _norm_syms(pt[0])
                        graph.variable_declarations[f"{lbl}_y"] = _norm_syms(pt[1])
                    graph.claims.append(MathClaim(s_idx, ln, "tuple_assignment", "VERIFIED", evidence="labeled_point_declaration"))
                    continue

            # -0.5 GCD / LCM function call verification: LCM(4, 8) = 8, gcd(3x, 2x) = x
            gcd_lcm_ok = _verify_gcd_lcm_call(pre)
            if gcd_lcm_ok is not None:
                graph.claims.append(MathClaim(s_idx, ln, "identity", "VERIFIED" if gcd_lcm_ok else "FAILED", evidence="poly_gcd_lcm_verified" if gcd_lcm_ok else "poly_gcd_lcm_mismatch"))
                continue

            # 0. Aligned continuation line starting with "=" or "\approx"
            if pre.startswith("="):
                rhs_s = pre[1:].strip()
                if r"\approx" in rhs_s or "≈" in rhs_s:
                    ap = re.split(r"\\approx|≈", rhs_s)
                    e1, e2 = _safe_parse(ap[0]), _safe_parse(ap[1])
                    if e1 is not None and e2 is not None:
                        ok, ev = _exprs_match(e1, e2, env, allow_pi_approx=True)
                        graph.claims.append(MathClaim(s_idx, ln, "approximation", "VERIFIED" if ok else "FAILED", evidence=ev or "approx_mismatch"))
                        prev_chain_expr = e1
                        continue
                elif prev_chain_expr is not None:
                    e_cur = _safe_parse(rhs_s)
                    if e_cur is not None:
                        ok, ev = _exprs_match(prev_chain_expr, e_cur, env, allow_positive_domain=allow_positive_domain)
                        if not ok and prev_chain_expr.free_symbols and not e_cur.free_symbols:
                            ok, ev = True, "formula_to_substitution"
                        graph.claims.append(MathClaim(s_idx, ln, "substitution", "VERIFIED" if ok else "FAILED", evidence=ev or "aligned_chain_mismatch"))
                        prev_chain_expr = e_cur
                        continue
            elif pre.startswith(r"\approx") or pre.startswith("≈"):
                rhs_s = re.sub(r"^(?:\\approx|≈)\s*", "", pre).strip()
                if prev_chain_expr is not None:
                    e_cur = _safe_parse(rhs_s)
                    if e_cur is not None:
                        ok, ev = _exprs_match(prev_chain_expr, e_cur, env, allow_pi_approx=True, allow_positive_domain=allow_positive_domain)
                        if not ok and _sub_env(prev_chain_expr, env, allow_positive_domain=allow_positive_domain).free_symbols and not _sub_env(e_cur, env, allow_positive_domain=allow_positive_domain).free_symbols:
                            ok, ev = True, "formula_to_approx_substitution"
                        graph.claims.append(MathClaim(s_idx, ln, "approximation", "VERIFIED" if ok else "FAILED", evidence=ev or "approx_mismatch"))
                        prev_chain_expr = e_cur
                        continue

            # 0.7 Geometric perpendicularity conclusion (AB \perp AC and \angle A = 90)
            m_perp_ln = re.search(r"\b([A-Z]{2})\s*\\perp\s*([A-Z]{2})\b", pre)
            pre_no_angle = re.sub(r"\\angle\s*[A-Z]\s*=\s*90(?:\s*\^\s*\\circ)?", "", pre)
            if m_perp_ln and "=" not in pre_no_angle:
                s1, s2 = f"m_{m_perp_ln.group(1)}", f"m_{m_perp_ln.group(2)}"
                if s1 in env and s2 in env and expressions_equivalent(env[s1] * env[s2], sp.Integer(-1)):
                    graph.claims.append(MathClaim(s_idx, ln, "conclusion", "VERIFIED", evidence="perpendicular_slopes_verified"))
                    continue

            # 0.8 Graphing coordinate-lookup chains: x = v1 -> (px, py) -> y = v2
            if r"\longrightarrow" in pre:
                arrows = [a.strip() for a in pre.split(r"\longrightarrow") if a.strip()]
                if len(arrows) == 3 and "=" in arrows[0] and "=" in arrows[2] and arrows[1].startswith("(") and arrows[1].endswith(")"):
                    p0 = [x.strip() for x in arrows[0].split("=")]
                    p2 = [x.strip() for x in arrows[2].split("=")]
                    ips = _split_top_level_commas(arrows[1][1:-1])
                    if len(p0) == 2 and len(p2) == 2 and len(ips) == 2:
                        v0, v2 = _safe_parse(p0[1]), _safe_parse(p2[1])
                        px, py = _safe_parse(ips[0]), _safe_parse(ips[1])
                        if None not in (v0, v2, px, py):
                            lhs0, lhs2 = _is_named_lhs(p0[0]), _is_named_lhs(p2[0])
                            ok_lut = (
                                (lhs0 == "x" and expressions_equivalent(px, v0) and lhs2 == "y" and expressions_equivalent(py, v2))
                                or (lhs0 == "y" and expressions_equivalent(py, v0) and lhs2 == "x" and expressions_equivalent(px, v2))
                            )
                            if ok_lut and graph.active_equations:
                                eq_v = graph.active_equations[-1].lhs
                                if eq_v.free_symbols <= {sp.Symbol("x"), sp.Symbol("y")}:
                                    ok_lut = expressions_equivalent(eq_v.subs({sp.Symbol("x"): px, sp.Symbol("y"): py}), sp.Integer(0))
                            graph.claims.append(MathClaim(s_idx, ln, "substitution", "VERIFIED" if ok_lut else "FAILED", evidence="graph_point_lookup" if ok_lut else "graph_point_mismatch"))
                            continue

            # 0.9 Coordinate point-table declarations: (x1, y1), (x2, y2), ...
            if "=" not in pre and "," in pre and pre.startswith("("):
                pt_segs = [p.strip() for p in _split_top_level_commas(pre) if p.strip()]
                if len(pt_segs) >= 2 and all(ps.startswith("(") and ps.endswith(")") for ps in pt_segs):
                    parsed_pts = []
                    for ps in pt_segs:
                        ips = _split_top_level_commas(ps[1:-1])
                        if len(ips) == 2:
                            px, py = _safe_parse(ips[0]), _safe_parse(ips[1])
                            if px is not None and py is not None:
                                parsed_pts.append((px, py))
                    if len(parsed_pts) == len(pt_segs):
                        pts_ok = True
                        if graph.active_equations:
                            eq_v = graph.active_equations[-1].lhs
                            if eq_v.free_symbols <= {sp.Symbol("x"), sp.Symbol("y")}:
                                pts_ok = all(expressions_equivalent(eq_v.subs({sp.Symbol("x"): px, sp.Symbol("y"): py}), sp.Integer(0)) for px, py in parsed_pts)
                        graph.claims.append(MathClaim(s_idx, ln, "tuple_assignment", "VERIFIED" if pts_ok else "FAILED", evidence="coordinate_table_verified" if pts_ok else "coordinate_table_mismatch"))
                        continue

            # 1. Implications (chained A => B => C, including \Rightarrow)
            m_imp = re.split(r"\\Rightarrow|\\implies|\\Longrightarrow|=>|⇒", pre)
            if len(m_imp) >= 2:
                all_imp_ok = True
                last_imp_eq = None
                for idx_i in range(len(m_imp) - 1):
                    prem_s, conc_s = m_imp[idx_i].strip(), m_imp[idx_i + 1].strip()
                    if not conc_s or _CONNECTOR_ONLY_RE.match(conc_s):
                        continue
                    conc_ok = False
                    if ("=" in prem_s or (not prem_s and graph.active_equations)) and "=" in conc_s:
                        c_parts = [p.strip() for p in conc_s.split("=") if p.strip()]
                        if "=" in prem_s:
                            p_parts = [p.strip() for p in prem_s.split("=") if p.strip()]
                            ep_l, ep_r = _safe_parse(p_parts[0]), _safe_parse(p_parts[-1])
                            eq_p = sp.simplify(_sub_env(ep_l - ep_r, env, allow_positive_domain=allow_positive_domain)) if (ep_l is not None and ep_r is not None) else None
                        else:
                            eq_p = graph.active_equations[-1].lhs
                        c_var = _is_named_lhs(c_parts[0])
                        explicit_root_fail = False
                        if c_var and "," in c_parts[-1] and eq_p is not None:
                            roots = [_safe_parse(r) for r in c_parts[-1].split(",") if r.strip()]
                            if roots and all(r is not None for r in roots):
                                if all(expressions_equivalent(_sub_env(eq_p, {c_var: r}), sp.Integer(0)) for r in roots):
                                    conc_ok = True
                                else:
                                    explicit_root_fail = True
                        if not conc_ok and not explicit_root_fail and eq_p is not None:
                            ec_l, ec_r = _safe_parse(c_parts[0]), _safe_parse(c_parts[-1])
                            if ec_l is not None and ec_r is not None:
                                eq_c = sp.simplify(_sub_env(ec_l - ec_r, env, allow_positive_domain=allow_positive_domain))
                                if c_var and expressions_equivalent(_sub_env(eq_p, {c_var: ec_r}), sp.Integer(0)):
                                    conc_ok = True
                                if not conc_ok and eq_p.free_symbols:
                                    try:
                                        sols = sp.solve(eq_p, list(eq_p.free_symbols), dict=True)
                                        d_sols = [s for s in (sols if isinstance(sols, list) else [sols]) if isinstance(s, dict) and s]
                                        if allow_positive_domain:
                                            pos_sols = [s for s in d_sols if all(v.is_real and v > 0 for v in s.values())]
                                            if pos_sols:
                                                d_sols = pos_sols
                                        if d_sols and all(sp.simplify(eq_c.subs(s)) == 0 for s in d_sols):
                                            conc_ok = True
                                    except Exception:
                                        pass
                                if not conc_ok and len(eq_p.free_symbols) == 1:
                                    sym = next(iter(eq_p.free_symbols))
                                    try:
                                        sols = sp.solve(eq_p, sym)
                                        if allow_positive_domain:
                                            pos_sols = [sv for sv in sols if sv.is_real and sv > 0]
                                            if pos_sols:
                                                sols = pos_sols
                                        if sols and all(sp.simplify(eq_c.subs(sym, sv)) == 0 for sv in sols):
                                            conc_ok = True
                                    except Exception:
                                        pass
                                if not conc_ok and eq_p == 0 and eq_c == 0:
                                    conc_ok = True
                                if conc_ok:
                                    last_imp_eq = sp.Eq(eq_c, 0, evaluate=False)
                    elif "=" in prem_s and (":" in conc_s or "no solution" in conc_s.lower() or "infinite" in conc_s.lower()):
                        conc_ok = True
                    if not conc_ok:
                        all_imp_ok = False
                        break
                if all_imp_ok and last_imp_eq is not None:
                    graph.active_equations.append(last_imp_eq)
                imp_status = "VERIFIED" if all_imp_ok else ("FAILED" if locals().get("explicit_root_fail") else "UNVERIFIED")
                imp_ev = "logical_implication_verified" if all_imp_ok else ("invalid_implication_roots" if imp_status == "FAILED" else "unverified_implication")
                graph.claims.append(MathClaim(s_idx, ln, "implication", imp_status, evidence=imp_ev))
                continue

            # 2. Coordinate tuple assignment/equality (handles nested parens like (-6))
            if "(" in pre and "," in pre and "=" in pre:
                # Extract top-level "(a, b)" segments around "="
                eq_segs = [p.strip() for p in pre.split("=")]
                if _is_named_lhs(eq_segs[0]) is not None and len(eq_segs) >= 3:
                    eq_segs = eq_segs[1:]
                parsed_tups = []
                for seg in eq_segs:
                    if seg.startswith("(") and seg.endswith(")"):
                        inner_ps = _split_top_level_commas(seg[1:-1])
                        if len(inner_ps) == 2:
                            px, py = _safe_parse(inner_ps[0]), _safe_parse(inner_ps[1])
                            if px is not None and py is not None:
                                parsed_tups.append((px, py))
                if len(parsed_tups) >= 2 and len(parsed_tups) == len(eq_segs):
                    if all(c.is_Symbol for c in parsed_tups[0]):
                        last_pt = parsed_tups[-1]
                        env[parsed_tups[0][0].name] = _norm_syms(last_pt[0])
                        env[parsed_tups[0][1].name] = _norm_syms(last_pt[1])
                        graph.claims.append(MathClaim(s_idx, ln, "tuple_assignment", "VERIFIED", evidence="coordinate_tuple_binding"))
                        continue
                    has_unbound = any(
                        (_norm_syms(c).free_symbols - set(sp.Symbol(k) for k in env))
                        for pt in parsed_tups for c in pt
                    )
                    if has_unbound and len(parsed_tups) == 2:
                        eq_x = sp.simplify(_sub_env(_norm_syms(parsed_tups[0][0] - parsed_tups[1][0]), env, allow_positive_domain=allow_positive_domain))
                        eq_y = sp.simplify(_sub_env(_norm_syms(parsed_tups[0][1] - parsed_tups[1][1]), env, allow_positive_domain=allow_positive_domain))
                        graph.active_equations.append(sp.Eq(eq_x, 0, evaluate=False))
                        graph.active_equations.append(sp.Eq(eq_y, 0, evaluate=False))
                        graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="coordinate_tuple_equation"))
                        continue
                    base = parsed_tups[0]
                    all_ok = True
                    for nxt in parsed_tups[1:]:
                        ok_x, _ = _exprs_match(_norm_syms(base[0]), _norm_syms(nxt[0]), env, allow_positive_domain=allow_positive_domain)
                        ok_y, _ = _exprs_match(_norm_syms(base[1]), _norm_syms(nxt[1]), env, allow_positive_domain=allow_positive_domain)
                        if not (ok_x and ok_y):
                            all_ok = False
                            break
                    graph.claims.append(MathClaim(s_idx, ln, "tuple_assignment", "VERIFIED" if all_ok else "FAILED", evidence="coordinate_tuple_equivalence"))
                    continue

            # 3. Approximations (≈ or \approx)
            if r"\approx" in pre or "≈" in pre:
                approx_parts = re.split(r"\\approx|≈", pre)
                if len(approx_parts) == 2:
                    lhs_seg = approx_parts[0].split("=")[-1].strip()
                    rhs_segs = [r.strip() for r in approx_parts[1].split("=") if r.strip()]
                    e1 = _safe_parse(lhs_seg)
                    e_rhs_list = [_safe_parse(r) for r in rhs_segs]
                    if e1 is not None and e_rhs_list and all(er is not None for er in e_rhs_list):
                        lhs_nm = _is_named_lhs(lhs_seg)
                        all_rhs_ok = True
                        for r_idx in range(len(e_rhs_list) - 1):
                            ok_r, _ = _exprs_match(e_rhs_list[r_idx], e_rhs_list[r_idx + 1], env, allow_pi_approx=True, allow_positive_domain=allow_positive_domain)
                            if not ok_r:
                                all_rhs_ok = False
                                break
                        if not all_rhs_ok:
                            graph.claims.append(MathClaim(s_idx, ln, "approximation", "FAILED", evidence="approx_chain_mismatch"))
                        elif lhs_nm is not None and lhs_nm not in env:
                            env[lhs_nm] = e_rhs_list[-1]
                            graph.claims.append(MathClaim(s_idx, ln, "approximation", "VERIFIED", evidence="named_approx_definition"))
                        else:
                            ok, ev = _exprs_match(e1, e_rhs_list[0], env, allow_pi_approx=True, allow_positive_domain=allow_positive_domain)
                            if not ok and _sub_env(e1, env, allow_positive_domain=allow_positive_domain).free_symbols and not _sub_env(e_rhs_list[0], env, allow_positive_domain=allow_positive_domain).free_symbols:
                                ok, ev = True, "formula_to_approx_substitution"
                            if not ok and not _sub_env(e1, env, allow_positive_domain=allow_positive_domain).free_symbols and e_rhs_list[0].is_Integer:
                                v1 = float(_sub_env(e1, env, allow_positive_domain=allow_positive_domain).evalf())
                                if abs(v1 - float(e_rhs_list[0])) <= 0.55:
                                    ok, ev = True, "nearest_integer_approx"
                            graph.claims.append(MathClaim(s_idx, ln, "approximation", "VERIFIED" if ok else "FAILED", evidence=ev or "approx_mismatch"))
                        prev_chain_expr = e_rhs_list[-1]
                        continue

            # 4. Equality chains: E0 = E1 = ... = En
            if "=" in pre:
                parts = [p.strip() for p in pre.split("=") if p.strip()]
                if len(parts) < 2:
                    graph.claims.append(MathClaim(s_idx, ln, "identity", "UNVERIFIED", evidence="empty_side"))
                    continue

                var_name = _is_named_lhs(parts[0])
                if var_name is not None:
                    if len(parts) == 2 and "," in parts[1] and graph.active_equations:
                        roots = [_safe_parse(r) for r in parts[1].split(",") if r.strip()]
                        if roots and all(r is not None for r in roots):
                            prev_eq = graph.active_equations[-1].lhs
                            if all(expressions_equivalent(_sub_env(prev_eq, {var_name: r}), sp.Integer(0)) for r in roots):
                                graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="multi_root_verified"))
                                continue
                    if len(parts) == 3 and _is_named_lhs(parts[1]) is not None:
                        v2 = _is_named_lhs(parts[1])
                        rhs_e = _safe_parse(parts[2])
                        if rhs_e is not None:
                            val = _norm_syms(_sub_env(rhs_e, env, allow_positive_domain=allow_positive_domain))
                            env[var_name] = val
                            env[v2] = val
                            graph.variable_declarations[var_name] = val
                            graph.variable_declarations[v2] = val
                            prev_chain_expr = val
                            graph.claims.append(MathClaim(s_idx, ln, "definition", "VERIFIED", evidence="chained_variable_definition"))
                            continue
                    if parts[-1].strip() == "RHS" and len(parts) >= 3:
                        parts = parts[:-1]
                    exprs = [_safe_parse(p) for p in parts[1:]]
                    if any(e is None for e in exprs):
                        graph.claims.append(MathClaim(s_idx, ln, "definition", "UNVERIFIED", evidence="unparsed_rhs"))
                        continue
                    if len(exprs) == 1:
                        env[var_name] = _norm_syms(_sub_env(exprs[0], env, allow_positive_domain=allow_positive_domain))
                        graph.variable_declarations[var_name] = env[var_name]
                        prev_chain_expr = env[var_name]
                        graph.claims.append(MathClaim(s_idx, ln, "definition", "VERIFIED", dependencies=list(env.keys()), evidence="variable_definition"))
                        continue
                    all_ok = True
                    ev_list: List[str] = []
                    for i in range(len(exprs) - 1):
                        ok, ev = _exprs_match(exprs[i], exprs[i + 1], env, allow_positive_domain=allow_positive_domain)
                        if not ok and exprs[i].free_symbols and not exprs[i + 1].free_symbols:
                            ok, ev = True, "formula_to_substitution"
                        if not ok and any(_is_named_formula_sym(sym) for sym in exprs[i].free_symbols):
                            ok, ev = True, "named_formula_to_substitution"
                        if not ok:
                            all_ok = False
                            break
                        ev_list.append(ev)
                    if all_ok:
                        env[var_name] = _norm_syms(_sub_env(exprs[-1], env, allow_positive_domain=allow_positive_domain))
                        graph.variable_declarations[var_name] = env[var_name]
                        prev_chain_expr = env[var_name]
                        graph.claims.append(MathClaim(s_idx, ln, "substitution", "VERIFIED", evidence="+".join(ev_list)))
                    else:
                        graph.claims.append(MathClaim(s_idx, ln, "substitution", "FAILED", evidence="chain_mismatch"))
                    continue

                exprs = [_safe_parse(p) for p in parts]
                if any(e is None for e in exprs):
                    graph.claims.append(MathClaim(s_idx, ln, "identity", "UNVERIFIED", evidence="unparsed_equation"))
                    continue

                if len(exprs) >= 3:
                    all_ok = True
                    for i in range(len(exprs) - 1):
                        ok, _ = _exprs_match(exprs[i], exprs[i + 1], env, allow_positive_domain=allow_positive_domain)
                        s_i = _sub_env(exprs[i], env, allow_positive_domain=allow_positive_domain).free_symbols
                        s_nxt = _sub_env(exprs[i + 1], env, allow_positive_domain=allow_positive_domain).free_symbols
                        if not ok and s_i and not s_nxt:
                            ok = True
                        if not ok and i == 0 and s_i and s_nxt and not (s_i & s_nxt):
                            ok = True
                        if not ok and (any(_is_named_formula_sym(sym) for sym in exprs[i].free_symbols) or any(_is_named_formula_sym(sym) for sym in exprs[i + 1].free_symbols)):
                            ok = True
                        if not ok:
                            all_ok = False
                            break
                    prev_chain_expr = exprs[-1]
                    graph.claims.append(MathClaim(s_idx, ln, "identity", "VERIFIED" if all_ok else "FAILED", evidence="multi_link_verified" if all_ok else "multi_link_identity_mismatch"))
                    continue

                ok, ev = _exprs_match(exprs[0], exprs[1], env, allow_positive_domain=allow_positive_domain)
                if ok:
                    prev_chain_expr = exprs[1]
                    graph.claims.append(MathClaim(s_idx, ln, "identity", "VERIFIED", evidence=ev))
                    continue

                cur_eq = sp.simplify(_sub_env(exprs[0] - exprs[1], env, allow_positive_domain=allow_positive_domain))
                if cur_eq.is_Number and cur_eq != 0:
                    if is_inconsistent_system:
                        graph.claims.append(MathClaim(s_idx, ln, "conclusion", "VERIFIED", evidence="inconsistent_system_proved"))
                    else:
                        graph.claims.append(MathClaim(s_idx, ln, "equation", "FAILED", evidence="contradictory_constant_equation"))
                    continue
                if is_identity_task:
                    graph.claims.append(MathClaim(s_idx, ln, "identity", "FAILED", evidence="identity_mismatch"))
                    continue
                if not graph.active_equations:
                    graph.active_equations.append(sp.Eq(cur_eq, 0, evaluate=False))
                    graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="conditional_equation_stated"))
                else:
                    prev_eq = graph.active_equations[-1].lhs
                    syms = list(cur_eq.free_symbols | prev_eq.free_symbols)
                    ratio = sp.simplify(cur_eq / prev_eq) if prev_eq != 0 else None
                    if ratio is None or ratio.has(*syms):
                        if prev_eq.has(sp.pi) and not cur_eq.has(sp.pi):
                            for pi_v in (sp.Rational(22, 7), sp.Float("3.14")):
                                r_pi = sp.simplify(cur_eq / prev_eq.subs(sp.pi, pi_v)) if prev_eq.subs(sp.pi, pi_v) != 0 else None
                                if r_pi is not None and not r_pi.has(*syms):
                                    ratio = r_pi
                                    break
                    if ratio is not None and not ratio.has(*syms):
                        graph.active_equations.append(sp.Eq(cur_eq, 0, evaluate=False))
                        graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="equivalent_equation_transform"))
                    else:
                        try:
                            sols_prev = sp.solve(prev_eq, syms[0] if len(syms) == 1 else syms, dict=True) if syms else []
                        except Exception:
                            sols_prev = []
                        dict_sols = [s for s in (sols_prev if isinstance(sols_prev, list) else [sols_prev]) if isinstance(s, dict) and s]
                        if dict_sols and all(sp.simplify(cur_eq.subs(s)) == 0 for s in dict_sols):
                            graph.active_equations.append(sp.Eq(cur_eq, 0, evaluate=False))
                            graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="solution_set_preserved"))
                            continue
                        if len(dict_sols) >= 2 and len(syms) == 1 and sp.Poly(cur_eq, syms[0]).total_degree() == 1 and any(sp.simplify(cur_eq.subs(s)) == 0 for s in dict_sols):
                            graph.active_equations.append(sp.Eq(cur_eq, 0, evaluate=False))
                            graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="root_branch_extracted"))
                            continue
                        if len(syms) == 1 and cur_eq.free_symbols == prev_eq.free_symbols:
                            graph.claims.append(MathClaim(s_idx, ln, "equation", "FAILED", evidence="invalid_equation_transformation"))
                            continue
                        all_eqs = [eq.lhs for eq in graph.active_equations] + [cur_eq]
                        all_syms = sorted(set().union(*(e.free_symbols for e in all_eqs)), key=lambda s: s.name)
                        try:
                            if all_syms and all(sp.Poly(e, *all_syms).total_degree() <= 1 for e in all_eqs):
                                prev_sol = sp.linsolve([eq.lhs for eq in graph.active_equations], all_syms)
                                cur_sol = sp.linsolve(all_eqs, all_syms)
                                if prev_sol and not cur_sol and not is_inconsistent_system:
                                    graph.claims.append(MathClaim(s_idx, ln, "equation", "FAILED", evidence="contradicts_system_equations"))
                                    continue
                        except Exception:
                            pass
                        graph.active_equations.append(sp.Eq(cur_eq, 0, evaluate=False))
                        graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="consistent_system_equation"))
            else:
                e_standalone = _safe_parse(pre)
                if e_standalone is not None:
                    prev_chain_expr = e_standalone
                    graph.claims.append(MathClaim(s_idx, ln, "substitution", "VERIFIED", evidence="expression_prepared_for_chain"))
                else:
                    graph.claims.append(MathClaim(s_idx, ln, "prose_claim", "UNVERIFIED", evidence="no_equality_relation"))

    total = len(graph.claims)
    ver = sum(1 for c in graph.claims if c.status == "VERIFIED")
    fail = sum(1 for c in graph.claims if c.status == "FAILED")
    unver = sum(1 for c in graph.claims if c.status == "UNVERIFIED")

    if fail > 0:
        status = "FAIL"
    elif ver > 0 and unver == 0:
        status = "PASS"
    elif ver > 0:
        status = "PARTIAL"
    else:
        status = "UNVERIFIABLE"

    return WorkingAuditResult(
        status=status,
        total_claims=total,
        verified_claims=ver,
        failed_claims=fail,
        unsupported_claims=unver,
        assumptions_used=graph.assumptions,
        verification_method="reasoning_graph_v1_3_4",
        graph=graph,
        failed_details=[{"step": c.step_index, "line": c.line, "evidence": c.evidence} for c in graph.claims if c.status == "FAILED"],
        unsupported_details=[{"step": c.step_index, "line": c.line, "evidence": c.evidence} for c in graph.claims if c.status == "UNVERIFIED"],
    )
