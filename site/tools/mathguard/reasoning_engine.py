"""TRACE MathGuard V1.3.4 — Context-Aware Mathematical Reasoning Engine.

Builds a structured ReasoningGraph per curriculum item containing:
- Question givens, variable declarations, domain restrictions, assumptions
- Known formulas, intermediate mathematical claims, dependencies, and evidence
- Logical transformations, equation solution-set tracking, tuple/matrix/shoelace support
- Strict completeness accounting (PASS only when verified >= 1, failed == 0, unsupported == 0)
"""

from __future__ import annotations

import math
from fractions import Fraction
import re
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Set, Tuple

import sympy as sp

from . import algebra_solver as alg
from .context_extractor import extract_mathematical_context
from .coordinate_parser import parse_all_points, parse_labeled_points
from .parser import parse_expression
from .rounding import check_numeric_match
from .steps import extract_stem_assumptions
from .symbolic import expressions_equivalent
from .symbolic_reasoning import FunctionRegistry, PolynomialReasoner, ScopedMathState

_SUP_MAP = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹", "0123456789")

_KNOWN_SYMBOL_BANK = {
    "LCM", "GCD", "Area", "CSA", "TSA", "LSA", "Volume", "Vcuboid", "A_base",
    "LHS", "RHS", "Slope",
    "V_earth", "A_sphere", "m_perp", "Time", "Midpoint", "Distance", "named_qty",
    "opposite", "adjacent", "hypotenuse",
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
    formula_or_theorem: str = ""
    transformation: str = ""
    uncertainty: str = ""


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
    context_provenance: List[Dict[str, Any]] = field(default_factory=list)


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
        or sym.name.startswith("named_")
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


_CONV_UNITS = {
    "mm": ("L", Fraction(1, 10)), "cm": ("L", Fraction(1)), "m": ("L", Fraction(100)), "km": ("L", Fraction(100000)),
    "mm2": ("A", Fraction(1, 100)), "cm2": ("A", Fraction(1)), "m2": ("A", Fraction(10000)),
    "mm3": ("V", Fraction(1, 1000)), "cm3": ("V", Fraction(1)), "m3": ("V", Fraction(1000000)),
    "ml": ("V", Fraction(1)), "l": ("V", Fraction(1000)), "litre": ("V", Fraction(1000)), "litres": ("V", Fraction(1000)),
    "liter": ("V", Fraction(1000)), "liters": ("V", Fraction(1000)),
}
_CONV_RE = re.compile(
    r"^\s*\$?\s*(-?[\d,]*\.?\d+)\s*(?:\\,|\\text\{)?\s*([A-Za-z]+)\s*(?:\^?\{?([23])\}?|([²³]))?\}?\s*=\s*"
    r"(-?[\d,]*\.?\d+)\s*(?:\\,|\\text\{)?\s*([A-Za-z]+)\s*(?:\^?\{?([23])\}?|([²³]))?\}?\s*\$?\s*$")


def _verify_unit_conversion_statement(ln: str):
    """Pure unit-conversion fact 'a U1 = b U2'. Returns True/False, or None if not such a statement."""
    m = _CONV_RE.match(ln.replace("\\mathrm", "").replace("\\;", " "))
    if not m:
        return None
    def side(num, unit, e1, e2):
        u = unit.lower()
        e = e1 or {"²": "2", "³": "3"}.get(e2 or "", "")
        key = u + e
        if key not in _CONV_UNITS:
            return None
        return Fraction(num.replace(",", "")) * _CONV_UNITS[key][1], _CONV_UNITS[key][0]
    a = side(m.group(1), m.group(2), m.group(3), m.group(4))
    b = side(m.group(5), m.group(6), m.group(7), m.group(8))
    if a is None or b is None:
        return None
    if a[1] != b[1]:
        return False
    return a[0] == b[0]


def _preprocess_math_line(raw: str) -> str:
    s = (raw or "").strip().rstrip("\\").strip()
    # Triggle custom stacked-fraction notation [[num|den]] -> (num)/(den)
    for _ in range(4):
        s2 = re.sub(r"\[\[\s*([^\[\]|]+?)\s*\|\s*([^\[\]|]+?)\s*\]\]", r"((\1)/(\2))", s)
        if s2 == s:
            break
        s = s2
    if s.startswith("&="):
        s = "=" + s[2:]
    elif s.startswith(r"&\approx") or s.startswith("&≈"):
        s = s[1:]
    s = s.replace("&=", "=").replace("&", " ")
    s = s.replace(r"\,", " ").replace(r"\;", " ").replace(r"\:", " ")
    s = re.sub(r"\\qq?uad\b", " ", s)
    # Collapse LaTeX thousands separators like 1{,}000{,}000 -> 1000000 and plain 125,000 -> 125000
    while re.search(r"(\d)\{,\}(\d{3})", s):
        s = re.sub(r"(\d)\{,\}(\d{3})", r"\1\2", s)
    while re.search(r"(\d),(\d{3})(?!\d)", s):
        s = re.sub(r"(\d),(\d{3})(?!\d)", r"\1\2", s)
    # Normalize single-digit LaTeX fraction shorthand like \dfrac12, \dfrac52, \dfrac9{17}
    s = re.sub(r"\\(?:d|t)?frac\s*([0-9])\s*([0-9])", r"\\frac{\1}{\2}", s)
    s = re.sub(r"\\(?:d|t)?frac\s*([0-9])\s*\{", r"\\frac{\1}{", s)
    s = re.sub(r"\\(?:d|t)?frac\s*\{([^{}]+)\}\s*([0-9])", r"\\frac{\1}{\2}", s)
    # Strip leading roman numeral list markers like (i), (ii), (iii), (iv), (v)
    s = re.sub(r"^\s*\((?:i|ii|iii|iv|v|vi|vii|viii|ix|x)\)\s+", "", s, flags=re.I)
    # Strip equation operation prefixes & trailing labels ONLY when preceded by comma/quad/dots
    s = re.sub(r"^\s*(?:[-−]?\s*\(\d+'?\)\s*(?:[-+−]\s*\(\d+'?\))?\s*:\s*)", "", s)
    s = re.sub(r"^\s*[A-Za-z0-9_]+\s*=\s*[-+]?\d+(?:/\d+)?\s*:\s*(?=.*=)", "", s)
    s = re.sub(r"^\s*\(\d+'?\)\s+(?=[A-Za-z0-9\\-])", "", s)
    s = re.sub(r"(?:\\dots\s*|,\s*|\s+)\(\d+'?\)\s*$", "", s)
    s = re.sub(r"\\text\s*\{\s*[-—]+\s*\(\d+'?\)\s*\}\s*$", "", s)
    s = re.sub(r"\(\s*[^)]*(?:\\ne|≠|perpendicular|parallel|collinear|approx|real and (?:un)?equal|reject|Option|check:|since\b)[^)]*\)\s*$", "", s, flags=re.I)
    s = re.sub(r"\(\s*\\text\s*\{\s*reject\b.*$", "", s, flags=re.I)
    s = re.sub(r"(?:,\s*[A-Za-z]\s*(?:\\ge|\\le|≥|≤|>|<)\s*0)+\s*$", "", s)
    s = re.sub(r"\(\s*[A-Za-z](?:\s*,\s*[A-Za-z])*\s*[><]\s*0(?:\s*,\s*[A-Za-z]\s*[><]\s*0)*\s*\)\s*$", "", s)
    s = re.sub(r"\(\s*[A-Za-z]\s*=\s*[^)]+\)\s*$", "", s)
    s = re.sub(r"\(\s*\\text\s*\{\s*(?:Option[^}]*|since\s+[^}]*|real\s+and\s+unequal\s+roots)\s*\}\s*\)\s*$", "", s, flags=re.I)
    s = s.replace(r"\ldots", "").replace("…", "")
    # Strip measurement units, rate units, & trailing %
    s = re.sub(r"\\(?:big|Big|bigg|Bigg)[lr]?", "", s)
    s = re.sub(r"\\mathrm\s*\{\s*(?:cm|km|mm|m|kgs?|g|s|hrs?|min|h)\s*\}(?:\^\d+)?(?:\s*/\s*\\mathrm\s*\{\s*(?:cm|km|mm|m|kgs?|g|s|hrs?|min|h)\s*\})?", "", s, flags=re.I)
    s = re.sub(r"(\d+)\s*\\text\s*\{\s*hrs?\s*\}\s*(\d+)\s*\\text\s*\{\s*minutes?\s*\}", r"(\1 + (\2)/60)", s, flags=re.I)
    s = re.sub(r"\\text\s*\{\s*(?:sq\.?\s*units?|sq\.?\s*ft|cu\.?\s*units?|units?|hrs?|hours?|mins?|minutes?|seconds?|s|kgs?|years?|pipes?|days?|approx|minutes\s*\(approx\)|not defined|is not defined)\s*\}", "", s, flags=re.I)
    s = re.sub(r"\\text\s*\{\s*Rs\.?\s*\}", "", s, flags=re.I)
    s = re.sub(r"\(\s*approx\s*\)", "", s, flags=re.I)
    s = re.sub(r"\\text\s*\{\s*(?:Exact|Yes|Wall|Check|Points)\s*:\s*\}", "", s, flags=re.I)
    s = re.sub(r"\\text\s*\{\s*passes\s+through\s*\}.*$", "", s, flags=re.I)
    s = re.sub(r"\\text\s*\{\s*At\s*\}\s*([A-Za-z_0-9]+\s*=\s*[^:]+?)\s*:\s*", r"\1 ; ", s, flags=re.I)
    s = re.sub(r"\(\s*\\text\s*\{\s*Option[^}]*\}\s*\)", "", s, flags=re.I)
    s = re.sub(r"(?<=\d)\s*\\%", "", s)
    s = re.sub(r"\\text\s*\{[^}]*\b(?:so|gives)\b[^}]*\}\s*=", "; named_rhs =", s, flags=re.I)
    s = re.sub(r"\\text\s*\{\s*(?:gives|so|hence|then|or|and|where|is vertical, so)\s*\}", ";", s, flags=re.I)
    s = re.sub(r"\\text\s*\{[^}]*\b(?:so|gives)\b[^}]*\}", ";", s, flags=re.I)
    s = re.sub(r"\\text\s*\{\s*Area\s*\}\s*\(\\triangle\s*([A-Z]+)\)", r"Area_\1", s)
    s = re.sub(r"\\%\s*\\text\s*\{\s*increase\s*\}", "pct_increase", s, flags=re.I)
    s = re.sub(r"\\text\s*\{([^}]+)\}(?=\s*(?:=|\\approx|≈))", lambda m: "named_" + re.sub(r"[^A-Za-z0-9]+", "_", m.group(1).strip()).strip("_").lower()[:24], s)
    s = re.sub(r"=\s*\\text\s*\{\s*RHS\s*\}", "= RHS", s)
    s = re.sub(r"\\mathrm\s*\{\s*([A-Za-z]+)\s*\}_\{([A-Za-z0-9]+)\}", r"\1_\2", s)
    s = re.sub(r"(\\[A-Za-z]+)\\(?:text|mathrm)\s*\{\s*([A-Za-z0-9_]+)\s*\}", r"\1 \2", s)
    s = re.sub(r"\\text\s*\{\s*([A-Za-z0-9_]+)\s*\}", r"\1", s)
    s = re.sub(r"\\mathrm\s*\{\s*([A-Za-z0-9_]+)\s*\}", r"\1", s)
    s = re.sub(r"([A-Za-z])_\{([A-Za-z0-9\\]+)\}", lambda m: f"{m.group(1)}_{m.group(2).replace(chr(92), '')}", s)
    s = s.replace(r"\tfrac", r"\frac").replace(r"\ell", "l").replace(r"\cdot", "*")
    s = re.sub(r"\\div\s*([A-Za-z0-9_]+)", r"*\\frac{1}{\1}", s)
    s = s.replace(r"\div", "/")
    s = s.replace(r"\alpha", "u").replace(r"\beta", "v").replace(r"\Delta", "Delta")
    s = re.sub(r"\b4AC\b", "4*A*C", s)
    s = re.sub(r"\\min\s*\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)", lambda m: str(min(float(m.group(1)), float(m.group(2))).rstrip("0").rstrip(".") if "." in m.group(1)+m.group(2) else min(int(m.group(1)), int(m.group(2)))), s)
    s = re.sub(r"\\max\s*\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)", lambda m: str(max(float(m.group(1)), float(m.group(2))).rstrip("0").rstrip(".") if "." in m.group(1)+m.group(2) else max(int(m.group(1)), int(m.group(2)))), s)
    s = re.sub(r"∛\s*\(([^)]+)\)", r"(\1)^{\\frac{1}{3}}", s)
    s = re.sub(r"∛\s*([0-9A-Za-z]+)", r"(\1)^{\\frac{1}{3}}", s)
    s = re.sub(r"\\sqrt\s*([0-9A-Za-z])(?![A-Za-z0-9{])", r"\\sqrt{\1}", s)
    s = re.sub(r"\\tan\s*0\s*\^\s*\\circ", "0", s)
    s = re.sub(r"\\tan\s*30\s*\^\s*\\circ", "(1/sqrt(3))", s)
    s = re.sub(r"\\tan\s*45\s*\^\s*\\circ", "1", s)
    s = re.sub(r"\\tan\s*60\s*\^\s*\\circ", "sqrt(3)", s)
    s = re.sub(r"\\tan\s*90\s*\^\s*\\circ", "zoo", s)
    s = re.sub(r"\\cot\s*\\theta", r"\\frac{\\cos(theta)}{\\sin(theta)}", s)
    s = re.sub(r"\\(sin|cos|tan)\^(\d+)\s*(?:\\theta|theta)", r"(\\\1(theta))^\2", s)
    s = re.sub(r"\\(sin|cos|tan)\s*\\theta", r"\\\1(theta)", s)
    s = s.replace(r"\theta", "theta")
    s = re.sub(r"\^\s*\\circ", "", s)
    # Mixed numbers like 2\dfrac{2}{5} -> (2 + 2/5)
    s = re.sub(r"(\d+)\s*\\d?frac\s*\{(\d+)\}\s*\{(\d+)\}", r"(\1 + (\2)/(\3))", s)
    s = s.replace(r"\left(", "(").replace(r"\right)", ")")
    s = s.replace(r"\left[", "[").replace(r"\right]", "]")
    s = re.sub(r"([⁰¹²³⁴⁵⁶⁷⁸⁹]+)", lambda m: "^" + m.group(1).translate(_SUP_MAP), s)
    s = re.sub(r"(?<!_)([₀₁₂₃₄₅₆₇₈₉]+)", lambda m: "_" + m.group(1).translate(str.maketrans("₀₁₂₃₄₅₆₇₈₉", "0123456789")), s)
    s = re.sub(r"\bSlope\s*\(\s*([A-Z]{2})\s*\)", r"m_\1", s)
    s = re.sub(r"\bm\s*\(\s*([A-Z]{2})\s*\)", r"m_\1", s)
    s = re.sub(r"\[([^\[\]]+)\]", r"(\1)", s)
    s = re.sub(r"\)\s*\(", ")*(", s)
    s = re.sub(r"(\d)\s*\(", r"\1*(", s)
    s = re.sub(r"\}\s*\(", "}*(", s)
    s = re.sub(r"(\\pi)\s*\(", r"\1*(", s)
    return s.strip().rstrip(",\\").strip()


def _parse_with_token_map(
    raw: str,
    func_registry: Optional[FunctionRegistry] = None,
    scalar_env_names: Optional[Set[str]] = None,
) -> sp.Expr:
    s = _strip_trailing_units(_preprocess_math_line(raw))
    rev_map: Dict[str, sp.Expr] = {}
    char_idx = 0
    if func_registry is not None or re.search(r"\b[fghpqPQR]\s*\(", s):
        reg = func_registry if func_registry is not None else FunctionRegistry()
        s, fn_map, _unbound, char_idx = reg.resolve_calls_in_preprocessed(
            s,
            lambda arg_s: _safe_parse(arg_s, func_registry=reg, scalar_env_names=scalar_env_names),
            scalar_env_names or set(),
            _PROTECT_CHARS,
        )
        rev_map.update(fn_map)
    if "|" in s:
        def _repl_abs(m: re.Match[str]) -> str:
            nonlocal char_idx
            inner_s = m.group(1)
            try:
                inner_e = _parse_with_token_map(inner_s, func_registry=func_registry, scalar_env_names=scalar_env_names)
                abs_e = abs(inner_e) if not inner_e.free_symbols else sp.Abs(inner_e)
                if char_idx < len(_PROTECT_CHARS):
                    ch = _PROTECT_CHARS[char_idx]
                    char_idx += 1
                    rev_map[ch] = abs_e
                    return f"({ch})"
            except Exception:
                pass
            return f"({inner_s})"
        s = re.sub(r"\\left\|([^|]+)\\right\|", _repl_abs, s)
        s = re.sub(r"\|([^|]+)\|", _repl_abs, s)
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


def _safe_parse(
    raw: str,
    func_registry: Optional[FunctionRegistry] = None,
    scalar_env_names: Optional[Set[str]] = None,
) -> Optional[sp.Expr]:
    try:
        return _norm_syms(_parse_with_token_map(raw, func_registry=func_registry, scalar_env_names=scalar_env_names))
    except Exception:
        return None


def _sub_env(expr: sp.Expr, env: Dict[str, sp.Expr], allow_positive_domain: bool = False) -> sp.Expr:
    if not env:
        return expr
    subs = {sym: env[sym.name] for sym in expr.free_symbols if sym.name in env}
    out = expr.subs(subs) if subs else expr
    if ("alpha_plus_beta" in env or "alpha_beta" in env) and (
        sp.Symbol("u") in out.free_symbols or sp.Symbol("v") in out.free_symbols
    ):
        u, v = sp.Symbol("u"), sp.Symbol("v")
        def _sym_poly(p_expr: sp.Expr) -> sp.Expr:
            try:
                sym_res = sp.symmetrize(p_expr, u, v, formal=True)
                if isinstance(sym_res, tuple) and len(sym_res) == 3 and sym_res[1] == 0:
                    s1, s2 = sp.Symbol("s_1"), sp.Symbol("s_2")
                    rep = sym_res[0]
                    if "alpha_plus_beta" in env:
                        rep = rep.subs(s1, env["alpha_plus_beta"])
                    if "alpha_beta" in env:
                        rep = rep.subs(s2, env["alpha_beta"])
                    return rep
            except Exception:
                pass
            return p_expr
        num, den = sp.fraction(sp.together(out))
        num_s, den_s = _sym_poly(num), _sym_poly(den)
        if not (sp.Symbol("u") in num_s.free_symbols or sp.Symbol("v") in num_s.free_symbols or sp.Symbol("u") in den_s.free_symbols or sp.Symbol("v") in den_s.free_symbols):
            out = num_s / den_s
        else:
            if "alpha_plus_beta" in env:
                out = out.subs(u + v, env["alpha_plus_beta"])
            if "alpha_beta" in env:
                out = out.subs(u * v, env["alpha_beta"])
    return out


_PHYSICAL_POS_SYMS = {"r", "h", "l", "b", "a", "s", "R", "H", "d", "k", "r_1", "r_2", "h_1", "h_2", "l_1", "l_2"}


def _exprs_match(
    e1: sp.Expr,
    e2: sp.Expr,
    env: Dict[str, sp.Expr],
    allow_pi_approx: bool = False,
    allow_positive_domain: bool = False,
    allow_numeric_tolerance: bool = False,
) -> Tuple[bool, str]:
    s1 = _norm_syms(_sub_env(e1, env))
    s2 = _norm_syms(_sub_env(e2, env))
    if allow_positive_domain:
        extra_pos = set(_PHYSICAL_POS_SYMS)
        for k_e, v_e in env.items():
            if k_e in _PHYSICAL_POS_SYMS and len(v_e.free_symbols) == 1:
                sym_v = next(iter(v_e.free_symbols))
                try:
                    if sp.ask(sp.Q.positive(v_e.subs(sym_v, sp.Integer(1)))) is True:
                        extra_pos.add(sym_v.name)
                except Exception:
                    pass
        pos1 = {
            sym: sp.Symbol(sym.name, positive=True) if sym.name in extra_pos else sp.Symbol(sym.name, real=True)
            for sym in s1.free_symbols
        }
        pos2 = {
            sym: sp.Symbol(sym.name, positive=True) if sym.name in extra_pos else sp.Symbol(sym.name, real=True)
            for sym in s2.free_symbols
        }
        s1 = s1.subs(pos1)
        s2 = s2.subs(pos2)
    else:
        real1 = {sym: sp.Symbol(sym.name, real=True) for sym in s1.free_symbols}
        real2 = {sym: sp.Symbol(sym.name, real=True) for sym in s2.free_symbols}
        s1 = s1.subs(real1)
        s2 = s2.subs(real2)

    if expressions_equivalent(s1, s2):
        return True, "symbolic_equivalence"
    try:
        f1 = s1.replace(lambda p: isinstance(p, sp.Pow) and p.exp == sp.Rational(1, 2), lambda p: sp.sqrt(sp.factor(p.base)))
        f2 = s2.replace(lambda p: isinstance(p, sp.Pow) and p.exp == sp.Rational(1, 2), lambda p: sp.sqrt(sp.factor(p.base)))
        if sp.simplify(f1 - f2) == 0:
            return True, "principal_sqrt_abs_equivalence" if (f1.has(sp.Abs) or f2.has(sp.Abs)) else "symbolic_equivalence"
    except Exception:
        pass
    if (s1.has(sp.sin, sp.cos, sp.tan) or s2.has(sp.sin, sp.cos, sp.tan)) and sp.trigsimp(s1 - s2) == 0:
        return True, "trig_equivalence"
    if allow_pi_approx and (s1.has(sp.pi) or s2.has(sp.pi)):
        for pi_val in (sp.Rational(22, 7), sp.Float("3.14"), sp.pi):
            v1 = s1.subs(sp.pi, pi_val)
            v2 = s2.subs(sp.pi, pi_val)
            if expressions_equivalent(v1, v2):
                return True, f"pi_mode_{pi_val}"
            if allow_numeric_tolerance and not v1.free_symbols and not v2.free_symbols:
                if check_numeric_match(v1, float(v2.evalf()), tolerance=0.05).matched:
                    return True, "numeric_pi_tolerance"
    if allow_numeric_tolerance and not s1.free_symbols and not s2.free_symbols:
        if check_numeric_match(s1, float(s2.evalf()), tolerance=0.05).matched:
            return True, "numeric_tolerance"
        try:
            v1_f = float(s1.evalf())
            if s2.is_Integer and abs(v1_f - float(s2)) <= 0.5 and round(v1_f) == int(s2):
                return True, "numeric_integer_rounding"
        except Exception:
            pass
    return False, ""


def _is_named_lhs(raw: str) -> Optional[str]:
    s = _strip_trailing_units(_preprocess_math_line(raw)).strip()
    compact = re.sub(r"\s+", "", s)
    if compact in ("u+v", "v+u"):
        return "alpha_plus_beta"
    if compact in ("u*v", "v*u", "uv", "vu"):
        return "alpha_beta"
    if re.fullmatch(r"[A-Za-z]+_[A-Za-z0-9_]+|[A-Za-z]|theta|Delta|LHS|RHS", s):
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
    # Protect \\ inside matrix environments before splitting aligned rows
    src = re.sub(
        r"(\\begin\{[pbv]?matrix\}.*?\\end\{[pbv]?matrix\})",
        lambda m: m.group(1).replace("\\\\", "@@MATROW@@"),
        src,
        flags=re.S,
    )
    raw_lines = [r.replace("@@MATROW@@", "\\\\") for r in re.split(r"\\\\|;\s*", src)]
    # Rejoin lines split inside unbalanced parentheses OR aligned expression continuations (& \quad + / -)
    joined: List[str] = []
    buf = ""
    depth = 0
    for ln in raw_lines:
        ln_s = ln.strip()
        if not buf and joined and re.match(r"^&\s*(?:\\q?quad\s*)?[+\-−]", ln_s):
            joined[-1] = joined[-1] + " " + re.sub(r"^&\s*(?:\\q?quad\s*)?", "", ln_s)
            continue
        if (
            not buf
            and joined
            and "=" not in joined[-1]
            and re.match(r"^(?:&\s*)?=", ln_s)
        ):
            joined[-1] = joined[-1] + " " + ln_s
            continue
        if (
            not buf
            and joined
            and re.match(r"^(?:\\iff|\\Rightarrow|\\implies)\s*&", joined[-1])
            and "=" not in joined[-1]
            and re.match(r"^&\s*=", ln_s)
        ):
            joined[-1] = re.sub(r"^(?:\\iff|\\Rightarrow|\\implies)\s*&\s*", "", joined[-1]) + " " + ln_s
            continue
        buf = (buf + " " + ln_s).strip() if buf else ln_s
        depth += ln_s.count("(") - ln_s.count(")")
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
        if re.search(r"&?\s*\\q?quad\b", ln) and ln.count("=") >= 2:
            q_parts = [p.strip() for p in re.split(r"\s*&?\s*\\q?quad\s*", ln) if p.strip()]
            if len(q_parts) >= 2 and all("=" in p for p in q_parts):
                out.extend(q_parts)
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


def _check_named_formula_validity(var_name: str, rhs: sp.Expr, allow_positive_domain: bool = False, q_en: str = "") -> bool:
    """Validate dimensional consistency AND solid-specific / algebraic formula applicability."""
    if var_name == "alpha_plus_beta" and {s.name for s in rhs.free_symbols} == {"a", "b"}:
        if sp.simplify(rhs - sp.Symbol("b") / sp.Symbol("a")) == 0:
            return False
    if var_name == "alpha_beta" and {s.name for s in rhs.free_symbols} == {"a", "c"}:
        if sp.simplify(rhs + sp.Symbol("c") / sp.Symbol("a")) == 0:
            return False
    if not allow_positive_domain or not rhs.free_symbols:
        return True
    length_syms = {
        s for s in rhs.free_symbols
        if s.name in _PHYSICAL_POS_SYMS or bool(re.fullmatch(r"[rhlbaRHd]_[A-Za-z0-9]+", s.name))
    }
    area_syms = {s for s in rhs.free_symbols if s.name in ("A", "Area") or s.name.startswith("A_") or s.name.startswith("Area_")}
    if not length_syms and not area_syms:
        return True
    v_norm = var_name.split("_")[0]
    if var_name.lower() in ("named_tsa", "named_csa", "named_lsa", "named_volume", "named_area"):
        v_norm = var_name.split("_", 1)[1].upper()
        if v_norm == "VOLUME":
            v_norm = "Volume"
        elif v_norm == "AREA":
            v_norm = "Area"
    if var_name.startswith("V") and var_name not in ("V_1", "V_2"):
        v_norm = "Volume"
    expected_deg = 3 if v_norm in ("V", "Volume") else (2 if v_norm in ("CSA", "TSA", "LSA", "Area", "A") else None)
    if expected_deg is None:
        return True
    # Only check symbolic dimensional scaling on pure formulas (not partially substituted numbers like 25 * b * 9)
    num_atoms = [a for a in rhs.atoms(sp.Number) if abs(float(a)) >= 5]
    if num_atoms:
        return True
    try:
        t = sp.Symbol("_dim_t", positive=True)
        subs = {s: s * t for s in length_syms}
        for s in area_syms:
            subs[s] = s * (t**2)
        scaled = sp.simplify(rhs.subs(subs) / rhs)
        if scaled.free_symbols == {t} and sp.simplify(scaled - t**expected_deg) != 0:
            return False
    except Exception:
        pass
    # Solid-specific formula applicability (e.g., single-solid cone volume cannot be pi*r^2*h)
    if q_en:
        rhs_n = _norm_syms(rhs)
        solids = {s.lower() for s in re.findall(r"\b(?:cylinder|cone|sphere|hemisphere|frustum)\b", q_en, flags=re.I)}
        if v_norm in ("V", "Volume"):
            if solids == {"cone"} and {s.name for s in rhs_n.free_symbols} == {"r", "h"}:
                r_s, h_s = sp.Symbol("r"), sp.Symbol("h")
                if sp.simplify(rhs_n - sp.pi * r_s**2 * h_s) == 0:
                    return False
            if solids == {"hemisphere"} and {s.name for s in rhs_n.free_symbols} == {"r"}:
                r_s = sp.Symbol("r")
                if sp.simplify(rhs_n - sp.Rational(4, 3) * sp.pi * r_s**3) == 0:
                    return False
        if v_norm == "CSA" and solids == {"cylinder"} and {s.name for s in rhs_n.free_symbols} == {"r", "h"}:
            r_s, h_s = sp.Symbol("r"), sp.Symbol("h")
            if sp.simplify(rhs_n - sp.pi * r_s * h_s) == 0:
                return False
        if v_norm == "TSA" and solids == {"sphere"} and {s.name for s in rhs_n.free_symbols} == {"r"}:
            r_s = sp.Symbol("r")
            if sp.simplify(rhs_n - 2 * sp.pi * r_s**2) == 0:
                return False
    return True


def _is_active_system_inconsistent(active_equations: List[sp.Eq]) -> bool:
    """Determine inconsistency strictly from active_equations (never from item['answer'])."""
    if len(active_equations) < 2:
        return False
    eqs = [eq.lhs for eq in active_equations]
    syms = sorted(set().union(*(e.free_symbols for e in eqs)), key=lambda s: s.name)
    if not syms:
        return any(e.is_Number and e != 0 for e in eqs)
    try:
        if all(sp.Poly(e, *syms).total_degree() <= 1 for e in eqs):
            sol = sp.linsolve(eqs, syms)
            return len(sol) == 0
    except Exception:
        pass
    return False


def _has_zero_div(expr: Optional[sp.Expr], env: Dict[str, sp.Expr]) -> bool:
    """Detect literal or substituted division by zero (e.g., 5/0 or 1/(x-2) when x=2)."""
    if expr is None:
        return False
    if expr.has(sp.zoo, sp.nan, sp.oo, -sp.oo):
        return True
    try:
        sub = _sub_env(expr, env)
        if sub.has(sp.zoo, sp.nan, sp.oo, -sp.oo):
            return True
        for node in sp.preorder_traversal(expr):
            if isinstance(node, sp.Pow) and node.exp.is_Number and node.exp < 0:
                base_sub = sp.simplify(_sub_env(node.base, env))
                if base_sub == 0:
                    return True
    except Exception:
        pass
    return False


def _parse_latex_matrix(mat_str: str) -> Optional[sp.Matrix]:
    m = re.fullmatch(r"\s*\\begin\{[pbv]?matrix\}(.*?)\\end\{[pbv]?matrix\}\s*", mat_str, flags=re.S)
    if not m:
        return None
    rows_raw = [r.strip() for r in m.group(1).split(r"\\") if r.strip()]
    if not rows_raw:
        return None
    rows = []
    for rr in rows_raw:
        cols_raw = [c.strip() for c in rr.split("&")]
        parsed_cols = [_safe_parse(c) for c in cols_raw]
        if any(pc is None for pc in parsed_cols):
            return None
        rows.append(parsed_cols)
    if len({len(r) for r in rows}) != 1:
        return None
    return sp.Matrix(rows)


def _eval_matrix_side(side: str, mat_env: Dict[str, sp.Matrix], scalar_env: Dict[str, sp.Expr]) -> Optional[sp.Matrix]:
    s = side.strip()
    direct = _parse_latex_matrix(s)
    if direct is not None:
        return direct
    local_mats = dict(mat_env)
    idx = 0

    def _repl_mat(mm: re.Match[str]) -> str:
        nonlocal idx
        mat = _parse_latex_matrix(mm.group(0))
        if mat is None:
            raise ValueError("bad matrix")
        name = f"__MAT_{idx}__"
        idx += 1
        local_mats[name] = mat
        return name

    try:
        s_tok = re.sub(r"\\begin\{[pbv]?matrix\}.*?\\end\{[pbv]?matrix\}", _repl_mat, s, flags=re.S)
    except ValueError:
        return None
    s_tok = s_tok.replace(r"\cdot", "*").replace(r"\times", "*").replace("×", "*")
    s_tok = re.sub(r"\b([A-Za-z0-9_]+)\s*\^\s*(?:\{T\}|T)\b", r"(\1).T", s_tok)
    s_tok = re.sub(r"\)\s*\^\s*(?:\{T\}|T)\b", ").T", s_tok)
    s_tok = re.sub(r"\b([A-Z])([A-Z])\b", lambda m: f"{m.group(1)}*{m.group(2)}" if (m.group(1) in local_mats and m.group(2) in local_mats) else m.group(0), s_tok)
    s_tok = re.sub(r"(?<=[A-Za-z0-9_\)])\s+(?=[A-Za-z_])", "*", s_tok)
    s_tok = re.sub(r"(\d)\s*(__MAT_\d+__|[A-Z])", r"\1*\2", s_tok)
    if not local_mats or not any(k in s_tok for k in local_mats):
        return None
    ns: Dict[str, Any] = {k: v for k, v in local_mats.items()}
    for k, v in scalar_env.items():
        if k not in ns:
            ns[k] = v
    try:
        val = eval(s_tok, {"__builtins__": {}}, ns)
        if isinstance(val, sp.MatrixBase):
            return sp.Matrix(val)
    except Exception:
        return None
    return None


def _try_verify_matrix_line(pre: str, mat_env: Dict[str, sp.Matrix], scalar_env: Dict[str, sp.Expr]) -> Optional[Tuple[str, str]]:
    if "=" not in pre:
        return None
    if not (r"\begin{" in pre or (mat_env and any(re.search(rf"\b{re.escape(k)}\b", pre) for k in mat_env))):
        return None
    parts = [p.strip() for p in pre.split("=") if p.strip()]
    if len(parts) < 2:
        return None
    if (
        len(parts) == 2
        and re.fullmatch(r"[A-Za-z][A-Za-z0-9_]*", parts[0])
        and not (len(parts[0]) == 2 and parts[0][0] in mat_env and parts[0][1] in mat_env)
    ):
        m_rhs = _eval_matrix_side(parts[1], mat_env, scalar_env)
        if m_rhs is not None:
            mat_env[parts[0]] = m_rhs
            return ("VERIFIED", "matrix_definition")
    mats = [_eval_matrix_side(p, mat_env, scalar_env) for p in parts]
    if any(m is None for m in mats):
        return None
    for i in range(len(mats) - 1):
        if mats[i].shape != mats[i + 1].shape:
            return ("FAILED", "matrix_dimension_mismatch")
        diff = sp.simplify(mats[i] - mats[i + 1])
        if not diff.is_zero_matrix:
            return ("FAILED", "matrix_operation_mismatch")
    return ("VERIFIED", "matrix_operation_verified")


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
    q_ta = q_obj.get("ta") or ""
    ctx = extract_mathematical_context(q_en, q_ta, allow_positive_domain=allow_positive_domain)
    from .context_extractor import _strip_mcq_options
    q_stem = _strip_mcq_options(q_en)
    is_coord_eq_q = bool(re.search(r"\bequation\s+of\b", q_stem, flags=re.I))
    for prov in ctx.provenance:
        if is_coord_eq_q and prov.symbol in ("x", "y"):
            continue
        graph.givens[prov.symbol] = _norm_syms(prov.expr)
        graph.variable_declarations[prov.symbol] = _norm_syms(prov.expr)
        graph.context_provenance.append({
            "symbol": prov.symbol,
            "value": str(prov.expr),
            "source_span": prov.source_span,
            "role": prov.role,
            "unit": prov.unit,
            "domain": prov.domain_constraint,
            "object_id": prov.object_id,
            "language": prov.language,
        })
    graph.domain_restrictions.extend(ctx.domain_constraints)

    # Extract explicit algebraic definitions A = ..., B = ... BEFORE extract_stem_assumptions so B = 1/(x+1) isn't truncated to 1
    for m_def in re.finditer(r"\b([AB])\s*=\s*([^,;]+?)(?=\s*(?:,|;|\bfind\b|\bprove\b|\bshow\b|$))", q_stem):
        if re.search(rf"[+\-−–*/]\s*{re.escape(m_def.group(1))}\s*=", q_stem):
            continue
        e_def = _safe_parse(m_def.group(2))
        if e_def is not None and m_def.group(1) not in graph.givens:
            graph.givens[m_def.group(1)] = e_def
            graph.variable_declarations[m_def.group(1)] = e_def

    is_solve_q = bool(re.search(r"\b(?:solve|method\s+of\s+substitution|simultaneous|cross\s*multiplication)\b", q_stem, flags=re.I))
    if not allow_positive_domain:
        stem_env = extract_stem_assumptions(q_stem)
        for k, v in stem_env.items():
            if re.search(rf"[+\-−–*/]\s*{re.escape(k)}\s*=", q_stem):
                continue
            if is_coord_eq_q and k in ("x", "y"):
                continue
            if is_solve_q and k in ("x", "y", "u", "v", "z"):
                continue
            if k not in graph.givens:
                graph.givens[k] = _norm_syms(v)
                graph.variable_declarations[k] = _norm_syms(v)

    func_registry = FunctionRegistry()
    func_registry.extract_from_stem(q_stem, lambda x: _safe_parse(x, func_registry=func_registry, scalar_env_names=set(graph.givens.keys())))
    if "p" in func_registry.functions and "P" not in graph.givens:
        graph.givens["P"] = func_registry.functions["p"].body
        graph.variable_declarations["P"] = graph.givens["P"]

    # Extract ratio givens like h_2 : h_1 = 1 : 2 or h₂ : h₁ = 1 : 2
    q_ratio_norm = q_stem.translate(str.maketrans("₀₁₂₃₄₅₆₇₈₉", "0123456789"))
    for m_rat in re.finditer(r"\b([A-Za-z])_?(\d+)\s*:\s*([A-Za-z])_?(\d+)\s*=\s*(\d+)\s*:\s*(\d+)\b", q_ratio_norm):
        s_a = f"{m_rat.group(1)}_{m_rat.group(2)}"
        s_b = f"{m_rat.group(3)}_{m_rat.group(4)}"
        p_val, q_val = int(m_rat.group(5)), int(m_rat.group(6))
        if q_val != 0 and s_a not in graph.givens:
            graph.givens[s_a] = sp.Rational(p_val, q_val) * sp.Symbol(s_b)
            graph.variable_declarations[s_a] = graph.givens[s_a]

    # Extract named polynomial/quantity givens like LCM = ..., GCD = ..., HCF = ... from stem
    for m_named in re.finditer(r"\b(LCM|GCD|HCF)\s*=\s*([^,\n;]+)", q_stem):
        n_key = m_named.group(1)
        n_rhs = re.split(r"\b(?:find|and|where|if|when|p\(|q\()\b", m_named.group(2), maxsplit=1, flags=re.I)[0].strip().rstrip(".,:")
        if n_key not in graph.givens and n_rhs:
            n_expr = _safe_parse(n_rhs, func_registry=func_registry, scalar_env_names=set(graph.givens.keys()))
            if n_expr is not None:
                graph.givens[n_key] = _norm_syms(n_expr)
                graph.variable_declarations[n_key] = graph.givens[n_key]

    if allow_positive_domain:
        graph.assumptions.append("positive_physical_quantities")
    graph.assumptions.append("real_valued_variables")

    if ctx.conflicts:
        graph.claims.append(
            MathClaim(
                0,
                q_stem[:100],
                "context_check",
                "FAILED",
                evidence="conflicting_or_invalid_context",
                details="; ".join(ctx.conflicts),
            )
        )

    env: Dict[str, sp.Expr] = dict(graph.givens)
    var_units: Dict[str, str] = {
        p["symbol"]: p["unit"].lower()
        for p in graph.context_provenance
        if p.get("symbol") and p.get("unit")
    }
    steps = ((item.get("proof") or {}).get("steps") if is_concept else item.get("steps")) or []
    if is_concept and not steps:
        for k_m in ("whyMath", "exampleMath"):
            m_obj = item.get(k_m)
            if isinstance(m_obj, dict) and (m_obj.get("latex") or "").strip():
                steps = [{"math": m_obj}]
                break

    all_steps_text = " ".join(
        f"{st.get('en', '')} {st.get('eq', '')} {(st.get('math') or {}).get('latex', '') if isinstance(st.get('math'), dict) else ''}"
        for st in steps
        if isinstance(st, dict)
    ).lower()

    if not steps:
        return WorkingAuditResult(
            status="UNVERIFIABLE" if not ctx.conflicts else "FAIL",
            total_claims=len(graph.claims),
            verified_claims=0,
            failed_claims=sum(1 for c in graph.claims if c.status == "FAILED"),
            unsupported_claims=0,
            assumptions_used=graph.assumptions,
            verification_method="reasoning_graph_v1_3_5a",
            graph=graph,
            failed_details=[{"step": c.step_index, "line": c.line, "evidence": c.evidence} for c in graph.claims if c.status == "FAILED"],
        )

    is_identity_task = (
        bool(re.search(r"\b(?:expand|simplify|factorise|verify)\b", q_stem, flags=re.I))
        or (bool(re.search(r"\bfactor\b", q_stem, flags=re.I)) and not bool(re.search(r"\bfactor\s+of\b|\bvalue\s+of\b", q_stem, flags=re.I)))
    ) and not bool(re.search(r"\bsolve\b|\bdetermine\s+the\s+value\b|\bfind\s+the\s+value\b", q_stem, flags=re.I))

    def _p(raw_s: str) -> Optional[sp.Expr]:
        return _safe_parse(raw_s, func_registry=func_registry, scalar_env_names=set(env.keys()))

    def _has_unbound_fn(e: Optional[sp.Expr]) -> bool:
        return e is not None and any(sym.name.startswith("__unbound_") for sym in e.free_symbols)

    prev_chain_expr: Optional[sp.Expr] = None
    prev_pm_pair: Optional[Tuple[sp.Expr, sp.Expr]] = None
    prev_eq_sides: List[Tuple[sp.Expr, sp.Expr]] = []
    mat_env: Dict[str, sp.Matrix] = {}
    current_subpart: Optional[str] = None
    for s_idx, step in enumerate(steps):
        step_en_txt = str(step.get("en") or "").strip()
        m_step_sub = re.match(r"^\s*\((i|ii|iii|iv|v|vi)\)\b", step_en_txt, flags=re.I)
        if m_step_sub:
            tag = m_step_sub.group(1).lower()
            if current_subpart is not None and tag != current_subpart:
                env.clear()
                env.update(graph.givens)
                prev_chain_expr = None
                prev_pm_pair = None
                graph.active_equations.clear()
                prev_eq_sides.clear()
            current_subpart = tag
        lines = _extract_step_lines(step)
        if not lines:
            txt = (step.get("text") or step.get("en") or "").strip()
            if txt:
                graph.claims.append(MathClaim(s_idx, txt[:80], "prose_claim", "UNVERIFIED", evidence="prose_only_unverified"))
            continue

        step_raw_math = f"{step.get('eq', '')} {(step.get('math') or {}).get('latex', '') if isinstance(step.get('math'), dict) else ''}"
        step_has_or = bool(re.search(r"\\text\s*\{\s*or\s*\}|\\lor|\bor\b", step_raw_math, flags=re.I))
        expanded_pairs: List[Tuple[str, str, bool]] = []
        for ln in lines:
            has_or_disj = step_has_or or bool(re.search(r"\\text\s*\{\s*or\s*\}|\\lor|\bor\b", ln, flags=re.I))
            raw_pre = _preprocess_math_line(ln)
            or_parts = re.split(r"\\text\s*\{\s*or\s*\}|\\lor|\bor\b", raw_pre, flags=re.I)
            if len(or_parts) >= 2 and all("=" in op for op in or_parts):
                for op in or_parts:
                    op_s = op.strip()
                    if op_s and not _CONNECTOR_ONLY_RE.match(op_s):
                        expanded_pairs.append((ln, op_s, True))
            elif ";" in raw_pre:
                for sp_s in raw_pre.split(";"):
                    sp_s = sp_s.strip()
                    if sp_s and not _CONNECTOR_ONLY_RE.match(sp_s):
                        expanded_pairs.append((ln, sp_s, has_or_disj))
            else:
                if raw_pre and not _CONNECTOR_ONLY_RE.match(raw_pre):
                    expanded_pairs.append((ln, raw_pre, has_or_disj))

        for ln, pre, is_disjunctive_branch in expanded_pairs:
            m_subp = re.match(r"^\s*\((i|ii|iii|iv|v|vi)\)\s+", ln, flags=re.I)
            if m_subp:
                tag = m_subp.group(1).lower()
                if current_subpart is not None and tag != current_subpart:
                    env.clear()
                    env.update(graph.givens)
                    prev_chain_expr = None
                    prev_pm_pair = None
                    graph.active_equations.clear()
                    prev_eq_sides.clear()
                current_subpart = tag
            _conv = _verify_unit_conversion_statement(ln)
            if _conv is not None:
                graph.claims.append(MathClaim(s_idx, ln, "unit_conversion", "VERIFIED" if _conv else "FAILED",
                                              evidence="unit_conversion_verified" if _conv else "unit_conversion_mismatch"))
                continue
            # Matrix operations (definition, addition, scalar/matrix multiplication, transpose)
            mat_src = ln.lstrip()
            if mat_src.startswith("&="):
                mat_src = "=" + mat_src[2:]
            mat_res = _try_verify_matrix_line(mat_src if r"\begin{" in mat_src else pre, mat_env, env)
            if mat_res is not None:
                graph.claims.append(MathClaim(s_idx, ln, "matrix", mat_res[0], evidence=mat_res[1]))
                continue

            # Strip trailing domain restriction like "\neq 0" (e.g. A = a - b \neq 0) and record it
            m_neq = re.search(r"\s*(?:\\ne(?:q)?|≠)\s*([^=]+)$", pre)
            if m_neq and "=" in pre[: m_neq.start()]:
                lhs_neq = pre[: m_neq.start()].strip()
                rhs_neq = m_neq.group(1).strip()
                last_seg = lhs_neq.split("=")[-1].strip()
                if last_seg:
                    graph.domain_restrictions.append(f"{last_seg} != {rhs_neq}")
                pre = lhs_neq

            # Verify both branches of \pm / ± instead of silently dropping '-'
            if r"\pm" in pre or "±" in pre:
                pm_parts = [p.strip() for p in pre.split("=") if p.strip()]
                if pre.lstrip().startswith("=") and prev_pm_pair is not None and len(pm_parts) == 1:
                    c_plus = _safe_parse(pm_parts[0].replace(r"\pm", "+").replace("±", "+"))
                    c_minus = _safe_parse(pm_parts[0].replace(r"\pm", "-").replace("±", "-"))
                    if c_plus is not None and c_minus is not None:
                        ok_pm_chain = (
                            (_exprs_match(prev_pm_pair[0], c_plus, env)[0] and _exprs_match(prev_pm_pair[1], c_minus, env)[0])
                            or (_exprs_match(prev_pm_pair[0], c_minus, env)[0] and _exprs_match(prev_pm_pair[1], c_plus, env)[0])
                            or (
                                _exprs_match(prev_pm_pair[0] + prev_pm_pair[1], c_plus + c_minus, env)[0]
                                and _exprs_match((prev_pm_pair[0] - prev_pm_pair[1]) ** 2, (c_plus - c_minus) ** 2, env)[0]
                            )
                        )
                        prev_pm_pair = (c_plus, c_minus)
                        prev_chain_expr = c_plus
                        graph.claims.append(MathClaim(s_idx, ln, "substitution", "VERIFIED" if ok_pm_chain else "FAILED", evidence="pm_both_branches_verified" if ok_pm_chain else "pm_branch_mismatch"))
                        continue
                if len(pm_parts) >= 2 and "," in pm_parts[-1]:
                    rhs_branches = [r.strip() for r in pm_parts[-1].split(",") if r.strip()]
                    lhs_template = pm_parts[-2]
                    e_plus = _safe_parse(lhs_template.replace(r"\pm", "+").replace("±", "+"))
                    e_minus = _safe_parse(lhs_template.replace(r"\pm", "-").replace("±", "-"))
                    r_parsed = [_safe_parse(r) for r in rhs_branches]
                    if e_plus is not None and e_minus is not None and len(r_parsed) == 2 and all(rp is not None for rp in r_parsed):
                        ok_pair = (
                            (_exprs_match(e_plus, r_parsed[0], env)[0] and _exprs_match(e_minus, r_parsed[1], env)[0])
                            or (_exprs_match(e_plus, r_parsed[1], env)[0] and _exprs_match(e_minus, r_parsed[0], env)[0])
                        )
                        graph.claims.append(MathClaim(s_idx, ln, "substitution", "VERIFIED" if ok_pair else "FAILED", evidence="pm_both_branches_verified" if ok_pair else "pm_branch_mismatch"))
                        continue
                # Fallback: verify '+' branch AND '-' branch if both are identities, or record conditional \pm equation
                pre_plus = pre.replace(r"\pm", "+").replace("±", "+")
                pre_minus = pre.replace(r"\pm", "-").replace("±", "-")
                if "=" in pre_plus:
                    p_p = [p.strip() for p in pre_plus.split("=") if p.strip()]
                    p_m = [p.strip() for p in pre_minus.split("=") if p.strip()]
                    if len(p_p) >= 2 and len(p_m) >= 2:
                        ep0, ep1 = _safe_parse(p_p[0]), _safe_parse(p_p[-1])
                        em0, em1 = _safe_parse(p_m[0]), _safe_parse(p_m[-1])
                        if None not in (ep0, ep1, em0, em1) and not _is_named_lhs(p_p[0]):
                            if not (_sub_env(ep0, env).free_symbols | _sub_env(ep1, env).free_symbols) or is_identity_task:
                                ok_pm = _exprs_match(ep0, ep1, env)[0] and _exprs_match(em0, em1, env)[0]
                                graph.claims.append(MathClaim(s_idx, ln, "identity", "VERIFIED" if ok_pm else "FAILED", evidence="pm_both_branches_verified" if ok_pm else "pm_branch_mismatch"))
                            else:
                                eq_pm = sp.expand(_sub_env(ep0 - ep1, env) * _sub_env(em0 - em1, env))
                                graph.active_equations.append(sp.Eq(eq_pm, 0, evaluate=False))
                                graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="pm_conditional_equation"))
                            continue
                        elif len(p_p) == 2 and len(p_m) == 2 and _is_named_lhs(p_p[0]) is not None:
                            ep1, em1 = _safe_parse(p_p[1]), _safe_parse(p_m[1])
                            if ep1 is not None and em1 is not None:
                                prev_pm_pair = (ep1, em1)
                pre = pre_plus

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
            # Evaluate trailing inequality like "\Delta = 4^2 - 4(1)(-192) = 784 > 0" instead of silently stripping
            m_ineq = re.search(r"\s*([<>]|\\ge|\\le|≥|≤)\s*([-+]?\d+(?:\.\d+)?)\s*$", pre)
            if m_ineq and "=" in pre[: m_ineq.start()]:
                ineq_op = m_ineq.group(1)
                ineq_bound = float(m_ineq.group(2))
                eq_part = pre[: m_ineq.start()].strip()
                rhs_val_expr = _safe_parse(eq_part.split("=")[-1].strip())
                if rhs_val_expr is not None:
                    rhs_sub = _sub_env(rhs_val_expr, env, allow_positive_domain=allow_positive_domain)
                    if not rhs_sub.free_symbols:
                        rv = float(rhs_sub.evalf())
                        ineq_ok = (
                            (ineq_op == ">" and rv > ineq_bound)
                            or (ineq_op == "<" and rv < ineq_bound)
                            or (ineq_op in (r"\ge", "≥") and rv >= ineq_bound)
                            or (ineq_op in (r"\le", "≤") and rv <= ineq_bound)
                        )
                        if not ineq_ok:
                            graph.claims.append(MathClaim(s_idx, ln, "inequality", "FAILED", evidence="false_inequality"))
                            continue
                pre = eq_part

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
                    e1, e2 = _p(ap[0]), _p(ap[1])
                    if e1 is not None and e2 is not None:
                        ok, ev = _exprs_match(e1, e2, env, allow_pi_approx=True, allow_positive_domain=allow_positive_domain, allow_numeric_tolerance=True)
                        graph.claims.append(MathClaim(s_idx, ln, "approximation", "VERIFIED" if ok else "FAILED", evidence=ev or "approx_mismatch"))
                        prev_chain_expr = e1
                        continue
                elif prev_chain_expr is not None:
                    e_cur = _p(rhs_s)
                    if e_cur is not None:
                        if _has_unbound_fn(prev_chain_expr) or _has_unbound_fn(e_cur):
                            graph.claims.append(MathClaim(s_idx, ln, "substitution", "UNVERIFIED", evidence="missing_variable_bindings"))
                            prev_chain_expr = e_cur
                            continue
                        has_trunc = (r"\ldots" in ln or "…" in ln)
                        ok, ev = _exprs_match(prev_chain_expr, e_cur, env, allow_pi_approx=allow_positive_domain, allow_positive_domain=allow_positive_domain, allow_numeric_tolerance=has_trunc)
                        if not ok and _sub_env(prev_chain_expr, env).free_symbols and not _sub_env(e_cur, env).free_symbols:
                            graph.claims.append(MathClaim(s_idx, ln, "substitution", "UNVERIFIED", evidence="missing_variable_bindings"))
                        else:
                            graph.claims.append(MathClaim(s_idx, ln, "substitution", "VERIFIED" if ok else "FAILED", evidence=ev or "aligned_chain_mismatch"))
                        prev_chain_expr = e_cur
                        continue
            elif pre.startswith(r"\approx") or pre.startswith("≈"):
                rhs_s = re.sub(r"^(?:\\approx|≈)\s*", "", pre).strip()
                if prev_chain_expr is not None:
                    e_cur = _p(rhs_s)
                    if e_cur is not None:
                        ok, ev = _exprs_match(prev_chain_expr, e_cur, env, allow_pi_approx=True, allow_positive_domain=allow_positive_domain, allow_numeric_tolerance=True)
                        if not ok and _sub_env(prev_chain_expr, env).free_symbols and not _sub_env(e_cur, env).free_symbols:
                            graph.claims.append(MathClaim(s_idx, ln, "approximation", "UNVERIFIED", evidence="missing_variable_bindings"))
                        else:
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
                        ep_l = ep_r = None
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
                                        elif (
                                            not allow_positive_domain
                                            and len(sols) >= 2
                                            and len(eq_c.free_symbols) == 1
                                            and any(sp.simplify(eq_c.subs(sym, sv)) == 0 for sv in sols)
                                            and not re.search(r"\b(?:or|reject)\b", str(step), flags=re.I)
                                            and not re.search(r"\b(?:m|km|cm|hours?|mins?|age|speed|width|length|sides?)\b", q_stem, flags=re.I)
                                        ):
                                            explicit_root_fail = True
                                    except Exception:
                                        pass
                                if not conc_ok and eq_p == 0 and eq_c == 0:
                                    conc_ok = True
                                if (
                                    not conc_ok
                                    and eq_p == 0
                                    and c_var in ("GCD", "named_gcd")
                                    and ep_l is not None
                                    and ep_r is not None
                                    and ec_r is not None
                                    and ec_r != 0
                                ):
                                    try:
                                        _syms_g = list((ep_l.free_symbols | ec_r.free_symbols))
                                        if _syms_g and sp.rem(ep_l, ec_r, *_syms_g) == 0:
                                            conc_ok = True
                                        elif _syms_g and sp.rem(ec_r, sp.gcd(ep_l, ep_r)) == 0:
                                            conc_ok = True
                                    except Exception:
                                        pass
                                if (
                                    not conc_ok
                                    and ep_l is not None
                                    and ep_r is not None
                                    and expressions_equivalent(_sub_env(ep_l, env), _sub_env(ec_l, env))
                                    and expressions_equivalent(_sub_env(ep_r, env), _sub_env(ec_r, env))
                                ):
                                    conc_ok = True
                                if conc_ok:
                                    last_imp_eq = sp.Eq(eq_c, 0, evaluate=False)
                    elif "=" in prem_s and (":" in conc_s or "no solution" in conc_s.lower() or "infinite" in conc_s.lower()):
                        conc_ok = True
                    else:
                        m_dim = re.match(
                            r"^\(\s*(\d+)\s*(?:\\times|×|\*)\s*(\d+)\s*\)\s*(?:\*|\\cdot|·)?\s*\(\s*(\d+)\s*(?:\\times|×|\*)\s*(\d+)\s*\)$",
                            re.sub(r"\\mathbf\s*\{([^}]+)\}", r"\1", prem_s).strip(),
                        )
                        m_dim_c = re.match(
                            r"^(\d+)\s*(?:\\times|×|\*)\s*(\d+)$",
                            re.sub(r"\\mathbf\s*\{([^}]+)\}", r"\1", conc_s).strip(),
                        )
                        if m_dim and m_dim_c:
                            if m_dim.group(2) == m_dim.group(3) and m_dim.group(1) == m_dim_c.group(1) and m_dim.group(4) == m_dim_c.group(2):
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
                            ok_r, _ = _exprs_match(e_rhs_list[r_idx], e_rhs_list[r_idx + 1], env, allow_pi_approx=True, allow_positive_domain=allow_positive_domain, allow_numeric_tolerance=True)
                            if not ok_r:
                                all_rhs_ok = False
                                break
                        if not all_rhs_ok:
                            graph.claims.append(MathClaim(s_idx, ln, "approximation", "FAILED", evidence="approx_chain_mismatch"))
                        elif lhs_nm is not None and lhs_nm not in env:
                            # Only accept a new approximate definition if justified by a multi-link RHS or non-atomic arithmetic expression
                            rhs0_sub = _sub_env(e_rhs_list[0], env, allow_positive_domain=allow_positive_domain)
                            is_computed_expr = (not e_rhs_list[0].is_Number) and (not rhs0_sub.free_symbols)
                            if len(e_rhs_list) >= 2 or (is_computed_expr and lhs_nm in ("V", "N", "t", "Area", "CSA", "TSA", "Volume", "Time")):
                                env[lhs_nm] = e_rhs_list[-1]
                                graph.claims.append(MathClaim(s_idx, ln, "approximation", "VERIFIED", evidence="verified_approx_chain_definition"))
                            else:
                                graph.claims.append(MathClaim(s_idx, ln, "approximation", "UNVERIFIED", evidence="unjustified_approximation"))
                        elif (
                            allow_positive_domain
                            and isinstance(e1, sp.Pow)
                            and e1.exp == 2
                            and isinstance(e1.base, sp.Symbol)
                            and e1.base.name in _PHYSICAL_POS_SYMS
                            and e1.base.name not in env
                            and len(e_rhs_list) >= 2
                        ):
                            env[e1.base.name] = sp.sqrt(e_rhs_list[-1])
                            graph.claims.append(MathClaim(s_idx, ln, "approximation", "VERIFIED", evidence="verified_approx_chain_definition"))
                        else:
                            ok, ev = _exprs_match(e1, e_rhs_list[0], env, allow_pi_approx=True, allow_positive_domain=allow_positive_domain, allow_numeric_tolerance=True)
                            if (
                                not ok
                                and lhs_nm is not None
                                and lhs_nm in env
                                and re.search(r"\b(?:min|hr|h|s|sec|cm|mm|km|m|l|ml|litre|litres)\b", ln, flags=re.I)
                            ):
                                try:
                                    prev_v = float(sp.N(env[lhs_nm]))
                                    new_v = float(sp.N(_sub_env(e_rhs_list[0], env, allow_positive_domain=allow_positive_domain)))
                                    if new_v != 0:
                                        ratio_u = prev_v / new_v
                                        if any(abs(ratio_u - f) / f < 1e-4 for f in (60.0, 3600.0, 10.0, 100.0, 1000.0, 10000.0, 100000.0, 1000000.0)) or any(abs(new_v / prev_v - f) / f < 1e-4 for f in (60.0, 3600.0, 10.0, 100.0, 1000.0)):
                                            env[lhs_nm] = e_rhs_list[-1]
                                            ok, ev = True, "unit_converted_approx_reassignment"
                                except Exception:
                                    pass
                            graph.claims.append(MathClaim(s_idx, ln, "approximation", "VERIFIED" if ok else "FAILED", evidence=ev or "approx_mismatch"))
                        prev_chain_expr = e_rhs_list[-1]
                        continue

            # 4. Equality chains: E0 = E1 = ... = En
            if "=" in pre:
                # Handle trailing "\ne" / "≠" assertion like "p(1) = 2 \ne 0"
                ne_rhs_str: Optional[str] = None
                m_ne_tail = re.search(r"^(.*)\s*(?:\\ne|≠)\s*([^=]+)$", pre)
                if m_ne_tail and "=" in m_ne_tail.group(1):
                    pre = m_ne_tail.group(1).strip()
                    ne_rhs_str = m_ne_tail.group(2).strip()

                parts = [p.strip() for p in pre.split("=") if p.strip()]
                if len(parts) < 2:
                    graph.claims.append(MathClaim(s_idx, ln, "identity", "UNVERIFIED", evidence="empty_side"))
                    continue

                # 4a. Function definition: f(x) = expr1 [= expr2 ...]
                m_fdef = re.fullmatch(r"([fghpqPQR])\s*\(\s*([a-zA-Z])\s*\)", parts[0].strip())
                if m_fdef and m_fdef.group(1) not in env:
                    fname, fvar = m_fdef.group(1), m_fdef.group(2)
                    is_new_fn = fname not in func_registry.functions
                    rhs_cand = _p(parts[1])
                    is_redef_in_var = (
                        not is_new_fn
                        and func_registry.functions[fname].params == (fvar,)
                        and rhs_cand is not None
                        and sp.Symbol(fvar) in rhs_cand.free_symbols
                    )
                    if is_new_fn or is_redef_in_var:
                        rhs_exprs = [_p(p) for p in parts[1:]]
                        if all(e is not None for e in rhs_exprs):
                            if any(_has_unbound_fn(e) for e in rhs_exprs):
                                graph.claims.append(MathClaim(s_idx, ln, "definition", "UNVERIFIED", evidence="missing_variable_bindings"))
                                continue
                            chain_ok = True
                            for i in range(len(rhs_exprs) - 1):
                                ok_r, _ = _exprs_match(rhs_exprs[i], rhs_exprs[i + 1], env, allow_pi_approx=allow_positive_domain, allow_positive_domain=allow_positive_domain)
                                if not ok_r:
                                    chain_ok = False
                                    break
                            if chain_ok:
                                func_registry.define(fname, (fvar,), rhs_exprs[-1], source="step")
                                prev_chain_expr = rhs_exprs[-1]
                                graph.claims.append(MathClaim(s_idx, ln, "definition", "VERIFIED", evidence="function_definition"))
                                continue
                            else:
                                # Check if failure was due to unbound named symbols (e.g. LCM/GCD) not in env
                                rhs0_sub = _sub_env(rhs_exprs[0], env, allow_positive_domain=allow_positive_domain)
                                rhs_last_sub = _sub_env(rhs_exprs[-1], env, allow_positive_domain=allow_positive_domain)
                                extra_syms = rhs0_sub.free_symbols - rhs_last_sub.free_symbols - {sp.Symbol(fvar)}
                                if extra_syms:
                                    graph.claims.append(MathClaim(s_idx, ln, "definition", "UNVERIFIED", evidence="missing_variable_bindings"))
                                else:
                                    graph.claims.append(MathClaim(s_idx, ln, "definition", "FAILED", evidence="function_definition_chain_mismatch"))
                                continue

                # 4b. Multi-link unit conversion chain: e.g. "125,000 litres = [[125,000|1000]] = 125 m^3"
                if len(parts) >= 3:
                    uv_ok = _verify_unit_conversion_statement(f"{parts[0]} = {parts[-1]}")
                    if uv_ok is True:
                        e_last = _p(parts[-1])
                        mid_ok = True
                        if e_last is not None:
                            for mid_p in parts[1:-1]:
                                em = _p(mid_p)
                                if em is not None and not em.free_symbols and not _exprs_match(em, e_last, env, allow_pi_approx=True, allow_positive_domain=allow_positive_domain)[0]:
                                    mid_ok = False
                                    break
                        if mid_ok:
                            prev_chain_expr = e_last
                            graph.claims.append(MathClaim(s_idx, ln, "unit_conversion", "VERIFIED", evidence="unit_conversion_chain"))
                            continue

                # 4c. Named squared-length chain: e.g. "AB^2 = CD^2 = 12^2 + 13^2 = 313"
                _sq_lhs_pat = re.compile(r"^([A-Z]{2}|[a-z]_?\d+)\s*(?:\^\s*2|²)$")
                if _sq_lhs_pat.match(_strip_trailing_units(_preprocess_math_line(parts[0])).strip()):
                    sq_names = []
                    idx_sq = 0
                    while idx_sq < len(parts) - 1:
                        norm_p = _strip_trailing_units(_preprocess_math_line(parts[idx_sq])).strip()
                        m_sq = _sq_lhs_pat.match(norm_p)
                        if m_sq:
                            sq_names.append(m_sq.group(1))
                            idx_sq += 1
                        else:
                            break
                    if sq_names and idx_sq < len(parts):
                        rhs_exprs = [_p(p) for p in parts[idx_sq:]]
                        if all(e is not None for e in rhs_exprs):
                            all_r_ok = all(_exprs_match(rhs_exprs[i], rhs_exprs[i + 1], env, allow_pi_approx=allow_positive_domain, allow_positive_domain=allow_positive_domain)[0] for i in range(len(rhs_exprs) - 1))
                            if all_r_ok:
                                val_sq = _norm_syms(_sub_env(rhs_exprs[-1], env, allow_positive_domain=allow_positive_domain))
                                consistent = True
                                for nm in sq_names:
                                    if nm in graph.givens and not graph.givens[nm].free_symbols and not val_sq.free_symbols:
                                        if not expressions_equivalent(graph.givens[nm] ** 2, val_sq):
                                            consistent = False
                                            break
                                if consistent:
                                    for nm in sq_names:
                                        if not val_sq.free_symbols:
                                            env[nm] = sp.sqrt(val_sq)
                                            graph.variable_declarations[nm] = env[nm]
                                    prev_chain_expr = val_sq
                                    graph.claims.append(MathClaim(s_idx, ln, "substitution", "VERIFIED", evidence="squared_length_chain_verified"))
                                    continue

                var_name = _is_named_lhs(parts[0])
                if var_name is not None:
                    if len(parts) == 2 and "," in parts[1] and graph.active_equations:
                        roots = [_p(r) for r in parts[1].split(",") if r.strip()]
                        if roots and all(r is not None for r in roots):
                            target_eq = None
                            v_sym = sp.Symbol(var_name)
                            for ae in reversed(graph.active_equations):
                                if v_sym in ae.lhs.free_symbols:
                                    target_eq = ae.lhs
                                    break
                            if target_eq is None:
                                target_eq = graph.active_equations[-1].lhs
                            if all(expressions_equivalent(_sub_env(target_eq, {var_name: r}), sp.Integer(0)) for r in roots):
                                graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="multi_root_verified"))
                                continue
                            else:
                                graph.claims.append(MathClaim(s_idx, ln, "equation", "FAILED", evidence="invalid_root_set"))
                                continue
                    named_lhs_list = [var_name]
                    idx_lhs = 1
                    while idx_lhs < len(parts) - 1 and _is_named_lhs(parts[idx_lhs]) is not None:
                        named_lhs_list.append(_is_named_lhs(parts[idx_lhs]))
                        idx_lhs += 1
                    if len(named_lhs_list) >= 2:
                        parts = [named_lhs_list[-1]] + parts[idx_lhs:]
                        var_name = named_lhs_list[-1]
                    if parts[-1].strip() == "RHS" and len(parts) >= 3:
                        parts = parts[:-1]
                    exprs = [_p(p) for p in parts[1:]]
                    if any(e is None for e in exprs):
                        graph.claims.append(MathClaim(s_idx, ln, "definition", "UNVERIFIED", evidence="unparsed_rhs"))
                        continue
                    if any(_has_unbound_fn(e) for e in exprs):
                        graph.claims.append(MathClaim(s_idx, ln, "definition", "UNVERIFIED", evidence="missing_variable_bindings"))
                        continue
                    if not re.search(r"\b(?:not\s+defined|undefined)\b", ln, flags=re.I) and any(_has_zero_div(e, env) for e in exprs):
                        graph.claims.append(MathClaim(s_idx, ln, "definition", "FAILED", evidence="division_by_zero"))
                        continue
                    if len(exprs) == 1:
                        if (
                            not allow_positive_domain
                            and var_name in ("x", "y")
                            and re.search(r"\b(?:wall|line|axis|parallel|perpendicular|path)\b", ln, flags=re.I)
                        ):
                            line_eq = sp.Eq(sp.Symbol(var_name) - exprs[0], 0, evaluate=False)
                            graph.active_equations.append(line_eq)
                            prev_eq_sides.append((sp.Symbol(var_name), exprs[0]))
                            graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="coordinate_line_equation"))
                            continue
                        new_val = _norm_syms(_sub_env(exprs[0], env, allow_positive_domain=allow_positive_domain))
                        if not _check_named_formula_validity(var_name, exprs[0], allow_positive_domain=allow_positive_domain, q_en=q_en):
                            graph.claims.append(MathClaim(s_idx, ln, "definition", "FAILED", evidence="invalid_formula_dimension"))
                            continue
                        if var_name == "alpha_plus_beta" and "a" in graph.givens and "b" in graph.givens and not new_val.free_symbols:
                            if not expressions_equivalent(new_val, -graph.givens["b"] / graph.givens["a"]):
                                graph.claims.append(MathClaim(s_idx, ln, "definition", "FAILED", evidence="invalid_vieta_sum"))
                                continue
                        if var_name == "alpha_beta" and "a" in graph.givens and "c" in graph.givens and not new_val.free_symbols:
                            if not expressions_equivalent(new_val, graph.givens["c"] / graph.givens["a"]):
                                graph.claims.append(MathClaim(s_idx, ln, "definition", "FAILED", evidence="invalid_vieta_product"))
                                continue
                        if var_name in graph.givens and not new_val.free_symbols and not graph.givens[var_name].free_symbols and not expressions_equivalent(graph.givens[var_name], new_val):
                            graph.claims.append(MathClaim(s_idx, ln, "definition", "FAILED", evidence="overwrites_established_given"))
                            continue
                        if var_name in ("CSA", "TSA", "LSA", "V", "Volume", "Area", "m", "Slope", "Midpoint", "Distance") and var_name in env and not new_val.free_symbols:
                            prev_sub = _sub_env(env[var_name], env, allow_positive_domain=allow_positive_domain)
                            if not prev_sub.free_symbols and not _exprs_match(prev_sub, new_val, env, allow_pi_approx=allow_positive_domain, allow_positive_domain=allow_positive_domain)[0]:
                                graph.claims.append(MathClaim(s_idx, ln, "definition", "FAILED", evidence="overwrites_established_formula"))
                                continue
                        if allow_positive_domain and not new_val.free_symbols:
                            m_u = re.search(r"(?:\\text\s*\{\s*|\\mathrm\s*\{\s*|\s)(cm|m|mm|km)\b", ln, flags=re.I)
                            if m_u:
                                cur_u = m_u.group(1).lower()
                                prev_u = var_units.get(var_name)
                                if prev_u and prev_u != cur_u and var_name in env and not env[var_name].free_symbols and expressions_equivalent(env[var_name], new_val):
                                    graph.claims.append(MathClaim(s_idx, ln, "definition", "FAILED", evidence="unit_mismatch_without_conversion"))
                                    continue
                                var_units[var_name] = cur_u
                        if not allow_positive_domain and not new_val.free_symbols:
                            m_seq = re.search(r"\b(?:if|solve)\s+([A-Za-z0-9_+\-*/^()\s]+)=([^,\.\n;]+)", q_stem, flags=re.I)
                            if m_seq:
                                se_l, se_r = _p(m_seq.group(1)), _p(m_seq.group(2))
                                if se_l is not None and se_r is not None and (se_l - se_r).free_symbols == {sp.Symbol(var_name)}:
                                    if sp.simplify((se_l - se_r).subs(sp.Symbol(var_name), new_val)) != 0:
                                        graph.claims.append(MathClaim(s_idx, ln, "definition", "FAILED", evidence="contradicts_stem_equation"))
                                        continue
                        for n_nm in named_lhs_list:
                            env[n_nm] = new_val
                            graph.variable_declarations[n_nm] = new_val
                        prev_chain_expr = new_val
                        graph.claims.append(MathClaim(s_idx, ln, "definition", "VERIFIED", dependencies=list(env.keys()), evidence="chained_variable_definition" if len(named_lhs_list) > 1 else "variable_definition"))
                        continue
                    if not _check_named_formula_validity(var_name, exprs[0], allow_positive_domain=allow_positive_domain, q_en=q_en):
                        graph.claims.append(MathClaim(s_idx, ln, "substitution", "FAILED", evidence="invalid_formula_dimension"))
                        continue
                    all_ok = True
                    has_unverified_binding = False
                    ev_list: List[str] = []
                    for i in range(len(exprs) - 1):
                        prose_pair = (exprs[i].free_symbols | exprs[i + 1].free_symbols) & {sp.Symbol("opposite"), sp.Symbol("adjacent"), sp.Symbol("hypotenuse")}
                        if prose_pair:
                            has_unverified_binding = True
                            all_ok = False
                            break
                        ok, ev = _exprs_match(exprs[i], exprs[i + 1], env, allow_pi_approx=allow_positive_domain, allow_positive_domain=allow_positive_domain)
                        if not ok:
                            s_i_rem = _sub_env(exprs[i], env).free_symbols
                            s_nxt_rem = _sub_env(exprs[i + 1], env).free_symbols
                            if (s_i_rem and not s_nxt_rem) or (s_i_rem and any(_is_named_formula_sym(sym) for sym in exprs[i].free_symbols)):
                                has_unverified_binding = True
                            all_ok = False
                            break
                        ev_list.append(ev)
                    if all_ok:
                        new_val = _norm_syms(_sub_env(exprs[-1], env, allow_positive_domain=allow_positive_domain))
                        if var_name in graph.givens and not new_val.free_symbols and not graph.givens[var_name].free_symbols and not expressions_equivalent(graph.givens[var_name], new_val):
                            # Check valid cm <-> m unit conversion (factor 100 or 1/100)
                            is_unit_conv = (
                                (r"\mathrm{m}" in ln or re.search(r"\bm\b", ln))
                                and any(p.get("symbol") == var_name and p.get("unit") == "cm" for p in graph.context_provenance)
                                and expressions_equivalent(graph.givens[var_name], new_val * 100)
                            )
                            if not is_unit_conv:
                                graph.claims.append(MathClaim(s_idx, ln, "substitution", "FAILED", evidence="overwrites_established_given"))
                                continue
                        for n_nm in named_lhs_list:
                            env[n_nm] = new_val
                            graph.variable_declarations[n_nm] = new_val
                        prev_chain_expr = new_val
                        graph.claims.append(MathClaim(s_idx, ln, "substitution", "VERIFIED", evidence="+".join(ev_list)))
                    elif has_unverified_binding:
                        graph.claims.append(MathClaim(s_idx, ln, "substitution", "UNVERIFIED", evidence="missing_variable_bindings"))
                    else:
                        graph.claims.append(MathClaim(s_idx, ln, "substitution", "FAILED", evidence="chain_mismatch"))
                    continue

                exprs = [_p(p) for p in parts]
                if any(e is None for e in exprs):
                    graph.claims.append(MathClaim(s_idx, ln, "identity", "UNVERIFIED", evidence="unparsed_equation"))
                    continue
                if any(_has_unbound_fn(e) for e in exprs):
                    graph.claims.append(MathClaim(s_idx, ln, "identity", "UNVERIFIED", evidence="missing_variable_bindings"))
                    continue
                if any(_has_zero_div(e, env) for e in exprs):
                    graph.claims.append(MathClaim(s_idx, ln, "identity", "FAILED", evidence="division_by_zero"))
                    continue

                if len(exprs) >= 3:
                    # Handle equations like "3(x-3)(x-9) = 3x^2 - 36x + 81 = 0"
                    trailing_zero_eq = (exprs[-1] == 0 and bool(exprs[0].free_symbols))
                    check_exprs = exprs[:-1] if trailing_zero_eq else exprs
                    all_ok = True
                    has_unverified_binding = False
                    for i in range(len(check_exprs) - 1):
                        ok, _ = _exprs_match(check_exprs[i], check_exprs[i + 1], env, allow_pi_approx=allow_positive_domain, allow_positive_domain=allow_positive_domain)
                        if not ok:
                            s_i = _sub_env(check_exprs[i], env, allow_positive_domain=allow_positive_domain).free_symbols
                            s_nxt = _sub_env(check_exprs[i + 1], env, allow_positive_domain=allow_positive_domain).free_symbols
                            if i == 0 and s_i and s_nxt and not (s_i & s_nxt):
                                if any(_is_named_formula_sym(sym) for sym in check_exprs[0].free_symbols):
                                    ok = True
                            if not ok and i == len(check_exprs) - 2 and s_i and s_nxt and any(_is_named_formula_sym(sym) for sym in check_exprs[-1].free_symbols):
                                ok = True
                            if not ok and s_i and (not s_nxt or (s_i - s_nxt) & {sp.Symbol("P"), sp.Symbol("Q"), sp.Symbol("R")}):
                                has_unverified_binding = True
                            if not ok:
                                all_ok = False
                                break
                    prev_chain_expr = check_exprs[-1]
                    if all_ok:
                        if trailing_zero_eq:
                            eq_zero = sp.Eq(check_exprs[-1], 0, evaluate=False)
                            graph.active_equations.append(eq_zero)
                            prev_eq_sides.append((check_exprs[-1], sp.Integer(0)))
                        graph.claims.append(MathClaim(s_idx, ln, "identity", "VERIFIED", evidence="multi_link_verified"))
                    else:
                        # Check for conditional proportion/system chains like x/-3 = y/-4 = 1/-1 or a_1/a_2 = b_1/b_2 = c_1/c_2 = 1/3
                        sub_links = [_sub_env(ce, env, allow_positive_domain=allow_positive_domain) for ce in check_exprs]
                        link_syms = [e.free_symbols for e in sub_links]
                        disjoint_vars = (
                            not trailing_zero_eq
                            and len(sub_links) >= 3
                            and any(ls for ls in link_syms[:-1])
                            and all(not (link_syms[i] & link_syms[j]) for i in range(len(link_syms) - 1) for j in range(i + 1, len(link_syms)) if link_syms[i] and link_syms[j])
                        )
                        if disjoint_vars:
                            sys_eqs = [sp.Eq(sub_links[i] - sub_links[-1], 0, evaluate=False) for i in range(len(sub_links) - 1)]
                            all_vars = sorted({s for eq_s in sys_eqs for s in eq_s.free_symbols}, key=lambda s: s.name)
                            try:
                                sols_sys = sp.solve(sys_eqs, all_vars, dict=True) if all_vars else []
                            except Exception:
                                sols_sys = []
                            if sols_sys or (not link_syms[-1] and all(len(ls) >= 1 for ls in link_syms[:-1])):
                                for eq_s in sys_eqs:
                                    graph.active_equations.append(eq_s)
                                    prev_eq_sides.append((eq_s.lhs, sp.Integer(0)))
                                graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="conditional_proportion_chain"))
                                continue
                        # Also handle conditional function-eval chains like p(-2) = -8 + 24 - 2k + 6 = 0
                        if trailing_zero_eq and len(check_exprs) >= 2:
                            sub_links = [_sub_env(ce, env, allow_positive_domain=allow_positive_domain) for ce in check_exprs]
                            if all(_exprs_match(sub_links[i], sub_links[i + 1], env, allow_pi_approx=allow_positive_domain, allow_positive_domain=allow_positive_domain)[0] for i in range(len(sub_links) - 1)):
                                graph.active_equations.append(sp.Eq(sub_links[-1], 0, evaluate=False))
                                prev_eq_sides.append((sub_links[-1], sp.Integer(0)))
                                graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="conditional_equation_chain"))
                                continue
                        if has_unverified_binding:
                            graph.claims.append(MathClaim(s_idx, ln, "identity", "UNVERIFIED", evidence="missing_variable_bindings"))
                        else:
                            graph.claims.append(MathClaim(s_idx, ln, "identity", "FAILED", evidence="multi_link_identity_mismatch"))
                    continue

                ok, ev = _exprs_match(exprs[0], exprs[1], env, allow_pi_approx=allow_positive_domain, allow_positive_domain=allow_positive_domain)
                if ok:
                    if ne_rhs_str is not None:
                        ne_e = _p(ne_rhs_str)
                        if ne_e is not None and _exprs_match(exprs[1], ne_e, env)[0]:
                            graph.claims.append(MathClaim(s_idx, ln, "inequality", "FAILED", evidence="contradicted_non_equality"))
                            continue
                    prev_chain_expr = exprs[1]
                    graph.claims.append(MathClaim(s_idx, ln, "identity", "VERIFIED", evidence=ev))
                    continue

                cur_eq = sp.simplify(_sub_env(exprs[0] - exprs[1], env, allow_positive_domain=allow_positive_domain))
                if cur_eq.is_Number and cur_eq != 0:
                    if _is_active_system_inconsistent(graph.active_equations):
                        graph.claims.append(MathClaim(s_idx, ln, "conclusion", "VERIFIED", evidence="inconsistent_system_proved"))
                    else:
                        graph.claims.append(MathClaim(s_idx, ln, "equation", "FAILED", evidence="contradictory_constant_equation"))
                    continue
                if is_identity_task:
                    graph.claims.append(MathClaim(s_idx, ln, "identity", "FAILED", evidence="identity_mismatch"))
                    continue
                if not graph.active_equations:
                    graph.active_equations.append(sp.Eq(cur_eq, 0, evaluate=False))
                    prev_eq_sides.append((_sub_env(exprs[0], env, allow_positive_domain=allow_positive_domain), _sub_env(exprs[1], env, allow_positive_domain=allow_positive_domain)))
                    graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="conditional_equation_stated"))
                else:
                    matched_ev: Optional[str] = None
                    # Search active equations for matching variable scope (supports simultaneous equations & branches)
                    cand_indices = [
                        idx_ae for idx_ae in range(len(graph.active_equations) - 1, -1, -1)
                        if cur_eq.free_symbols & graph.active_equations[idx_ae].lhs.free_symbols
                    ]
                    if not cand_indices:
                        cand_indices = [len(graph.active_equations) - 1]
                    for idx_ae in cand_indices:
                        prev_eq = graph.active_equations[idx_ae].lhs
                        syms = list(cur_eq.free_symbols | prev_eq.free_symbols)
                        ratio = sp.simplify(cur_eq / prev_eq) if prev_eq != 0 else None
                        if ratio is None or ratio.has(*syms):
                            if allow_positive_domain and prev_eq.has(sp.pi) and not cur_eq.has(sp.pi):
                                for pi_v in (sp.Rational(22, 7), sp.Float("3.14")):
                                    r_pi = sp.simplify(cur_eq / prev_eq.subs(sp.pi, pi_v)) if prev_eq.subs(sp.pi, pi_v) != 0 else None
                                    if r_pi is not None and not r_pi.has(*syms):
                                        ratio = r_pi
                                        break
                        if ratio is not None and ratio != 0 and not ratio.has(*syms):
                            matched_ev = "equivalent_equation_transform"
                            break
                        # Check squared consequence: (L_prev^2 - R_prev^2) == k * cur_eq
                        if idx_ae < len(prev_eq_sides):
                            lp, rp = prev_eq_sides[idx_ae]
                            sq_diff = sp.simplify(lp ** 2 - rp ** 2)
                            sq_ratio = sp.simplify(sq_diff / cur_eq) if cur_eq != 0 else None
                            if sq_ratio is not None and sq_ratio != 0 and not sq_ratio.has(*syms):
                                matched_ev = "squared_consequence_transform"
                                if "squaring_may_introduce_extraneous_roots" not in graph.domain_restrictions:
                                    graph.domain_restrictions.append("squaring_may_introduce_extraneous_roots")
                                break
                        try:
                            sols_prev = sp.solve(prev_eq, syms[0] if len(syms) == 1 else syms, dict=True) if syms else []
                            sols_cur = sp.solve(cur_eq, syms[0] if len(syms) == 1 else syms, dict=True) if syms else []
                        except Exception:
                            sols_prev, sols_cur = [], []
                        dict_sols = [s for s in (sols_prev if isinstance(sols_prev, list) else [sols_prev]) if isinstance(s, dict) and s]
                        cur_sols = [s for s in (sols_cur if isinstance(sols_cur, list) else [sols_cur]) if isinstance(s, dict) and s]
                        if dict_sols and cur_sols and len(dict_sols) == len(cur_sols) and all(sp.simplify(cur_eq.subs(s)) == 0 for s in dict_sols) and all(sp.simplify(prev_eq.subs(s)) == 0 for s in cur_sols):
                            matched_ev = "solution_set_preserved"
                            break
                        if len(dict_sols) >= 2 and len(syms) == 1 and sp.Poly(cur_eq, syms[0]).total_degree() == 1 and any(sp.simplify(cur_eq.subs(s)) == 0 for s in dict_sols):
                            matched_ev = "root_branch_extracted"
                            break

                    if matched_ev is not None:
                        graph.active_equations.append(sp.Eq(cur_eq, 0, evaluate=False))
                        prev_eq_sides.append((_sub_env(exprs[0], env, allow_positive_domain=allow_positive_domain), _sub_env(exprs[1], env, allow_positive_domain=allow_positive_domain)))
                        graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence=matched_ev))
                        continue
                    if is_disjunctive_branch:
                        graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="disjunctive_branch_equation"))
                        continue
                    prev_eq = graph.active_equations[cand_indices[0]].lhs
                    syms = list(cur_eq.free_symbols | prev_eq.free_symbols)
                    if len(syms) == 1 and cur_eq.free_symbols <= prev_eq.free_symbols:
                        graph.claims.append(MathClaim(s_idx, ln, "equation", "FAILED", evidence="invalid_equation_transformation"))
                        continue
                    if cur_eq.free_symbols <= prev_eq.free_symbols and len(syms) >= 2:
                        diff_c = sp.simplify(cur_eq - prev_eq)
                        if diff_c.is_Number and diff_c != 0:
                            if any(kw in all_steps_text for kw in ("no solution", "parallel", "inconsistent")):
                                graph.active_equations.append(sp.Eq(cur_eq, 0, evaluate=False))
                                prev_eq_sides.append((_sub_env(exprs[0], env, allow_positive_domain=allow_positive_domain), _sub_env(exprs[1], env, allow_positive_domain=allow_positive_domain)))
                                graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="multi_variable_system_equation"))
                                continue
                            graph.claims.append(MathClaim(s_idx, ln, "equation", "FAILED", evidence="inconsistent_system_equation"))
                            continue
                    graph.active_equations.append(sp.Eq(cur_eq, 0, evaluate=False))
                    prev_eq_sides.append((_sub_env(exprs[0], env, allow_positive_domain=allow_positive_domain), _sub_env(exprs[1], env, allow_positive_domain=allow_positive_domain)))
                    graph.claims.append(MathClaim(s_idx, ln, "equation", "VERIFIED", evidence="multi_variable_system_equation"))
            else:
                # Standalone inequalities: e.g., (a+b)^2 >= 0, (a-b)^2 > 0, \Delta > 0
                m_st_ineq = re.match(r"^(.+?)\s*(\\ge|\\le|≥|≤|>|<)\s*(.+)$", pre)
                if m_st_ineq:
                    lhs_i = _safe_parse(m_st_ineq.group(1))
                    rhs_i = _safe_parse(m_st_ineq.group(3))
                    op_i = m_st_ineq.group(2)
                    if lhs_i is not None and rhs_i is not None:
                        diff_i = sp.simplify(_sub_env(lhs_i - rhs_i, env, allow_positive_domain=allow_positive_domain))
                        real_subs = {s: sp.Symbol(s.name, real=True) for s in diff_i.free_symbols}
                        diff_real = diff_i.subs(real_subs)
                        is_nonneg = sp.ask(sp.Q.nonnegative(diff_real))
                        is_pos = sp.ask(sp.Q.positive(diff_real))
                        is_neg = sp.ask(sp.Q.negative(diff_real))
                        if op_i in (r"\ge", "≥") and is_nonneg is True:
                            graph.claims.append(MathClaim(s_idx, ln, "inequality", "VERIFIED", evidence="provable_nonnegative_inequality"))
                            continue
                        if op_i in (r"\le", "≤") and sp.ask(sp.Q.nonpositive(diff_real)) is True:
                            graph.claims.append(MathClaim(s_idx, ln, "inequality", "VERIFIED", evidence="provable_nonpositive_inequality"))
                            continue
                        if op_i == ">" and is_pos is True:
                            graph.claims.append(MathClaim(s_idx, ln, "inequality", "VERIFIED", evidence="provable_positive_inequality"))
                            continue
                        if op_i == "<" and is_neg is True:
                            graph.claims.append(MathClaim(s_idx, ln, "inequality", "VERIFIED", evidence="provable_negative_inequality"))
                            continue
                        if (op_i in (">", r"\ge", "≥") and is_neg is True) or (op_i in ("<", r"\le", "≤") and is_pos is True):
                            graph.claims.append(MathClaim(s_idx, ln, "inequality", "FAILED", evidence="false_inequality"))
                            continue
                        if op_i == ">" and is_nonneg is True and graph.domain_restrictions:
                            graph.claims.append(MathClaim(s_idx, ln, "inequality", "VERIFIED", evidence="conditional_positive_inequality"))
                            continue
                        graph.claims.append(MathClaim(s_idx, ln, "inequality", "UNVERIFIED", evidence="unverified_inequality"))
                        continue
                e_standalone = _safe_parse(pre)
                if e_standalone is not None:
                    prev_chain_expr = e_standalone
                    m_task_stem = re.match(r"^(?:Simplify|Factorise|Factorize|Factor|Expand)\s+(?:\([ivx]+\)\s*)?(.+)$", q_stem, flags=re.I)
                    if s_idx == 0 and m_task_stem:
                        raw_stem_expr = m_task_stem.group(1).strip().rstrip(".")
                        raw_stem_expr = raw_stem_expr.replace("−", "-").replace("×", "*").replace("÷", "/")
                        raw_stem_expr = re.sub(r"([⁰¹²³⁴⁵⁶⁷⁸⁹]+)", lambda m: "^" + m.group(1).translate(_SUP_MAP), raw_stem_expr)
                        e_stem = _safe_parse(raw_stem_expr)
                        if e_stem is not None and expressions_equivalent(e_stem, e_standalone):
                            graph.claims.append(MathClaim(s_idx, ln, "identity", "VERIFIED", evidence="stem_expression_equivalence"))
                            continue
                    graph.claims.append(MathClaim(s_idx, ln, "prose_claim", "UNVERIFIED", evidence="standalone_expression_no_relation"))
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
