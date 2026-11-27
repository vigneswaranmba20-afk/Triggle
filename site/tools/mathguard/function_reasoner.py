"""TRACE MathGuard V1.5 — FunctionReasoner & ExtendedFunctionRegistry.

Extends FunctionRegistry with exact mathematical mapping intelligence:
- Function well-definedness (distinguishing relations from functions)
- One-to-one (injective), many-to-one, onto (surjective), into, bijective,
  constant, and identity classification
- Codomain vs actual range distinction
- Domain-guarded evaluation & rational/radical domain restriction
- Domain-aware symbolic composition (f ∘ g)(x) = f(g(x)) & non-commutativity
- Bijectivity-guarded inverse functions
"""

from __future__ import annotations

from dataclasses import dataclass, field
from fractions import Fraction
from typing import Any, Dict, List, Optional, Set, Tuple, Union

import sympy as sp

from .relation_reasoner import RelationObj
from .set_types import (
    STANDARD_INFINITE_SETS,
    OrderedPair,
    SymbolicInfiniteSet,
    TypedSet,
    _normalize_element,
)
from .symbolic_reasoning import FunctionRegistry


@dataclass
class FunctionClassification:
    is_function: bool
    is_one_to_one: Optional[bool] = None
    is_many_to_one: Optional[bool] = None
    is_onto: Optional[bool] = None
    is_into: Optional[bool] = None
    is_bijective: Optional[bool] = None
    is_constant: Optional[bool] = None
    is_identity: Optional[bool] = None
    actual_range: Optional[Any] = None
    reason: str = ""


class FiniteFunction:
    """Exact finite mapping f: A -> B."""

    def __init__(self, domain: TypedSet, codomain: TypedSet, mapping: Dict[Any, Any]) -> None:
        self.domain = domain
        self.codomain = codomain
        self.mapping: Dict[Any, Any] = {
            _normalize_element(k): _normalize_element(v) for k, v in mapping.items()
        }

    @classmethod
    def from_relation(cls, rel: RelationObj) -> Tuple[Optional["FiniteFunction"], str]:
        ok, msg = rel.is_function()
        if not ok:
            return None, msg
        mp = {p.first: p.second for p in rel.pairs if isinstance(p, OrderedPair)}
        return cls(rel.domain_set, rel.codomain_set, mp), "Valid function"

    def is_valid(self) -> Tuple[bool, str]:
        for x in self.domain:
            if x not in self.mapping:
                return False, f"Domain element {x} has no image"
        for k, v in self.mapping.items():
            if k not in self.domain:
                return False, f"Mapping key {k} not in domain"
            if v not in self.codomain:
                return False, f"Image {v} not in codomain"
        return True, "Valid function"

    @property
    def actual_range(self) -> TypedSet:
        return TypedSet(self.mapping.values())

    def classify(self) -> FunctionClassification:
        ok, msg = self.is_valid()
        if not ok:
            return FunctionClassification(is_function=False, reason=msg)
        vals = list(self.mapping.values())
        one_to_one = len(set(vals)) == len(vals)
        onto = self.actual_range == self.codomain
        is_const = (len(set(vals)) == 1) if self.domain.cardinality > 0 else False
        is_ident = (self.domain == self.codomain) and all(k == v for k, v in self.mapping.items())
        return FunctionClassification(
            is_function=True,
            is_one_to_one=one_to_one,
            is_many_to_one=not one_to_one,
            is_onto=onto,
            is_into=not onto,
            is_bijective=one_to_one and onto,
            is_constant=is_const,
            is_identity=is_ident,
            actual_range=self.actual_range,
            reason="Classified finite function",
        )

    def evaluate(self, x: Any) -> Tuple[bool, Any, str]:
        nx = _normalize_element(x)
        if nx not in self.domain:
            return False, None, f"Input {x} is outside domain"
        if nx not in self.mapping:
            return False, None, f"Input {x} is unmapped"
        return True, self.mapping[nx], "OK"

    def compose(self, g: "FiniteFunction", allow_restricted: bool = False) -> Tuple[Optional["FiniteFunction"], str]:
        """Compute (self ∘ g)(x) = self(g(x)). Requires range(g) ⊆ domain(self)."""
        g_ok, g_msg = g.is_valid()
        f_ok, f_msg = self.is_valid()
        if not g_ok:
            return None, f"Inner function invalid: {g_msg}"
        if not f_ok:
            return None, f"Outer function invalid: {f_msg}"
        if not g.actual_range.is_subset(self.domain):
            if not allow_restricted:
                missing = g.actual_range.difference(self.domain)
                return None, f"Composition f ∘ g undefined: range(g) not subset of domain(f); extra={missing}"
            restricted_dom = TypedSet(x for x in g.domain if g.mapping[x] in self.domain)
            comp_map = {x: self.mapping[g.mapping[x]] for x in restricted_dom}
            return FiniteFunction(restricted_dom, self.codomain, comp_map), "Restricted domain composition"
        comp_map = {x: self.mapping[g.mapping[x]] for x in g.domain}
        return FiniteFunction(g.domain, self.codomain, comp_map), "Valid composition"

    def inverse(self) -> Tuple[Optional["FiniteFunction"], str]:
        cls = self.classify()
        if not cls.is_bijective:
            return None, "Inverse does not exist: function is not bijective"
        inv_map = {v: k for k, v in self.mapping.items()}
        return FiniteFunction(self.codomain, self.domain, inv_map), "Valid inverse"


class SymbolicFunction:
    """Symbolic function f: domain -> codomain defined by expr(var)."""

    def __init__(
        self,
        var: sp.Symbol,
        expr: sp.Expr,
        domain: Union[TypedSet, SymbolicInfiniteSet],
        codomain: Union[TypedSet, SymbolicInfiniteSet],
    ) -> None:
        self.var = var
        self.expr = sp.simplify(expr)
        self.domain = domain
        self.codomain = codomain

    def excluded_singularities(self) -> Set[sp.Expr]:
        """Find denominator zeros for rational expressions."""
        try:
            _, den = sp.fraction(sp.together(self.expr))
            if den == 1 or not den.has(self.var):
                return set()
            sols = sp.solve(sp.Eq(den, 0), self.var)
            return {sp.simplify(s) for s in sols}
        except Exception:
            return set()

    def is_input_defined(self, val: Any) -> Tuple[bool, str]:
        # Check domain membership
        if isinstance(self.domain, TypedSet):
            if _normalize_element(val) not in self.domain:
                return False, f"{val} ∉ domain"
        elif isinstance(self.domain, SymbolicInfiniteSet):
            c = self.domain.contains(val)
            if c is False:
                return False, f"{val} ∉ {self.domain.label}"

        # Check rational singularities
        sval = sp.sympify(val) if not isinstance(val, sp.Basic) else val
        for sing in self.excluded_singularities():
            if sp.simplify(sval - sing) == 0:
                return False, f"Division by zero at {self.var} = {val}"

        # Check real radical non-negativity when codomain is ℝ or subset
        for pow_expr in self.expr.atoms(sp.Pow):
            if pow_expr.exp.is_Rational and pow_expr.exp.q % 2 == 0 and pow_expr.exp > 0:
                inner_val = sp.simplify(pow_expr.base.subs(self.var, sval))
                if inner_val.is_real and inner_val < 0:
                    return False, f"Negative radicand {inner_val} under even root"
        return True, "Defined"

    def evaluate(self, val: Any) -> Tuple[bool, Optional[sp.Expr], str]:
        ok, msg = self.is_input_defined(val)
        if not ok:
            return False, None, msg
        sval = sp.sympify(val) if not isinstance(val, sp.Basic) else val
        try:
            res = sp.simplify(self.expr.subs(self.var, sval))
            if res.has(sp.zoo, sp.nan):
                return False, None, "Undefined evaluation (zoo/nan)"
            return True, res, "OK"
        except Exception as exc:
            return False, None, str(exc)

    def to_finite_function(self) -> Optional[FiniteFunction]:
        if not isinstance(self.domain, TypedSet) or not isinstance(self.codomain, TypedSet):
            return None
        mp: Dict[Any, Any] = {}
        for x in self.domain:
            sx = sp.Rational(x.numerator, x.denominator) if isinstance(x, Fraction) else sp.sympify(x)
            ok, res, _ = self.evaluate(sx)
            if not ok or res is None:
                return None
            mp[x] = _normalize_element(res)
        return FiniteFunction(self.domain, self.codomain, mp)

    def classify(self) -> FunctionClassification:
        if isinstance(self.domain, TypedSet) and isinstance(self.codomain, TypedSet):
            ff = self.to_finite_function()
            if ff is None:
                return FunctionClassification(is_function=False, reason="Undefined on some domain element")
            return ff.classify()

        # Symbolic classification over infinite sets (N, W, Z, R)
        if not isinstance(self.domain, SymbolicInfiniteSet) or not isinstance(self.codomain, SymbolicInfiniteSet):
            return FunctionClassification(is_function=True, reason="Mixed finite/infinite classification abstained")

        if self.excluded_singularities():
            # E.g. 1/x on R without 0 removed is NOT a total function on R
            for sing in self.excluded_singularities():
                if self.domain.contains(sing) is True:
                    return FunctionClassification(
                        is_function=False,
                        reason=f"Not a total function on {self.domain.label}: undefined at {self.var} = {sing}",
                    )

        # Constant check
        if not self.expr.has(self.var):
            return FunctionClassification(
                is_function=True,
                is_one_to_one=False,
                is_many_to_one=True,
                is_onto=False,
                is_into=True,
                is_bijective=False,
                is_constant=True,
                is_identity=False,
                reason="Constant function on infinite domain",
            )

        is_ident = (self.domain == self.codomain) and (sp.simplify(self.expr - self.var) == 0)

        # Injectivity check over N, W, Z, R
        a, b = sp.Dummy("a", real=True), sp.Dummy("b", real=True)
        diff_ab = sp.factor(self.expr.subs(self.var, a) - self.expr.subs(self.var, b))
        one_to_one: Optional[bool] = None
        onto: Optional[bool] = None

        # Polynomial / linear / simple algebraic checks
        try:
            poly = sp.Poly(self.expr, self.var)
            deg = poly.degree()
            if deg == 1:
                one_to_one = True
                # Surjectivity of ax + c
                coeff_a = poly.LC()
                const_c = poly.EC()
                if self.codomain.kind == "R":
                    onto = True
                elif self.domain.kind in ("N", "W", "Z") and self.codomain.kind in ("N", "W", "Z"):
                    # Test y = 1 (in N, W, Z) and y = 0 (in W, Z)
                    test_ys = [1, 2] if self.codomain.kind == "N" else [0, 1, -1] if self.codomain.kind == "Z" else [0, 1]
                    onto = True
                    for ty in test_ys:
                        pre = sp.simplify((ty - const_c) / coeff_a)
                        if self.domain.contains(pre) is not True:
                            onto = False
                            break
                    # For Z -> Z, ax + c is onto iff |a| == 1
                    if self.domain.kind == "Z" and self.codomain.kind == "Z":
                        onto = abs(coeff_a) == 1
            elif deg % 2 == 0 and deg >= 2:
                # Even degree polynomial on R or Z is not injective (or check N)
                if self.domain.kind in ("R", "Z"):
                    one_to_one = False
                elif self.domain.kind in ("N", "W"):
                    # e.g. x^2 is injective on N/W if vertex <= 0, check derivative or sample
                    vals = [self.expr.subs(self.var, k) for k in range(1 if self.domain.kind == "N" else 0, 10)]
                    if len(set(vals)) < len(vals):
                        one_to_one = False
                    elif sp.Poly(sp.diff(self.expr, self.var), self.var).degree() == 1:
                        # Quadratic: vertex at -b/(2a)
                        d_roots = sp.solve(sp.diff(self.expr, self.var), self.var)
                        if d_roots and d_roots[0] <= (1 if self.domain.kind == "N" else 0):
                            one_to_one = True
                # Even-degree polynomial on R -> R is bounded one side => not onto R
                if self.codomain.kind in ("R", "Z", "N", "W"):
                    # Test if any value in codomain is skipped (e.g. y = 1 or -1)
                    if self.codomain.kind == "R":
                        onto = False
                    else:
                        # Check y = 1, 2, 3 for N/W/Z
                        test_ys = [1, 2, 3] if self.codomain.kind in ("N", "W") else [-1, 0, 1, 2]
                        for ty in test_ys:
                            sols = sp.solve(sp.Eq(self.expr, ty), self.var)
                            if not any(self.domain.contains(s) is True for s in sols if s.is_real):
                                onto = False
                                break
            elif deg == 3 and poly.all_coeffs()[1] == 0 and poly.all_coeffs()[2] == 0:
                # Pure cubic a*x^3 + d
                one_to_one = True
                if self.codomain.kind == "R" and self.domain.kind == "R":
                    onto = True
                elif self.domain.kind in ("N", "W", "Z") and self.codomain.kind in ("N", "W", "Z"):
                    onto = False
        except Exception:
            pass

        if one_to_one is None or onto is None:
            return FunctionClassification(
                is_function=True,
                is_one_to_one=one_to_one,
                is_onto=onto,
                is_identity=is_ident,
                reason="Partial symbolic classification",
            )

        return FunctionClassification(
            is_function=True,
            is_one_to_one=one_to_one,
            is_many_to_one=not one_to_one,
            is_onto=onto,
            is_into=not onto,
            is_bijective=one_to_one and onto,
            is_constant=False,
            is_identity=is_ident,
            reason="Exact symbolic classification",
        )

    def compose(self, g: "SymbolicFunction") -> Tuple[Optional["SymbolicFunction"], str]:
        """Compute (f ∘ g)(x) = f(g(x)) symbolically with domain compatibility check."""
        composed_expr = sp.simplify(self.expr.subs(self.var, g.expr))
        # Check if g's codomain/range is compatible with f's domain
        if isinstance(g.domain, TypedSet) and isinstance(self.domain, TypedSet):
            valid_xs = []
            for x in g.domain:
                ok_g, gx, _ = g.evaluate(x)
                if not ok_g or gx is None:
                    continue
                ok_f, _, _ = self.evaluate(gx)
                if ok_f:
                    valid_xs.append(x)
            if len(valid_xs) < g.domain.cardinality:
                return (
                    SymbolicFunction(g.var, composed_expr, TypedSet(valid_xs), self.codomain),
                    f"Restricted composition domain to {TypedSet(valid_xs)}",
                )
        return SymbolicFunction(g.var, composed_expr, g.domain, self.codomain), "Valid symbolic composition"

    def inverse(self) -> Tuple[Optional[sp.Expr], str]:
        cls = self.classify()
        if cls.is_bijective is not True:
            return None, f"Inverse cannot be certified (bijective={cls.is_bijective}): {cls.reason}"
        y = sp.Symbol("y", real=True)
        try:
            sols = sp.solve(sp.Eq(self.expr, y), self.var)
            if len(sols) == 1:
                return sp.simplify(sols[0].subs(y, self.var)), "Valid symbolic inverse"
            return None, "Inverse not uniquely solvable"
        except Exception as exc:
            return None, str(exc)


class ExtendedFunctionRegistry(FunctionRegistry):
    """Extends FunctionRegistry with domain-aware mapping and composition checks."""

    def __init__(self) -> None:
        super().__init__()
        self.mappings: Dict[str, Union[FiniteFunction, SymbolicFunction]] = {}

    def register_mapping(self, name: str, fn: Union[FiniteFunction, SymbolicFunction]) -> None:
        self.mappings[name] = fn
        if isinstance(fn, SymbolicFunction):
            self.define(name, (str(fn.var),), fn.expr, source="mapping")

    def compose_by_name(self, outer_name: str, inner_name: str) -> Tuple[Optional[Union[FiniteFunction, SymbolicFunction]], str]:
        f = self.mappings.get(outer_name)
        g = self.mappings.get(inner_name)
        if f is None or g is None:
            return None, "Missing mapping definition"
        if isinstance(f, FiniteFunction) and isinstance(g, FiniteFunction):
            return f.compose(g)
        if isinstance(f, SymbolicFunction) and isinstance(g, SymbolicFunction):
            return f.compose(g)
        return None, "Incompatible mapping types for composition"

    def verify_commutativity(self, f_name: str, g_name: str) -> Optional[bool]:
        """Return True iff f ∘ g == g ∘ f, False if non-commutative, None if unverifiable."""
        fg, _ = self.compose_by_name(f_name, g_name)
        gf, _ = self.compose_by_name(g_name, f_name)
        if fg is None or gf is None:
            return None
        if isinstance(fg, FiniteFunction) and isinstance(gf, FiniteFunction):
            return fg.domain == gf.domain and fg.mapping == gf.mapping
        if isinstance(fg, SymbolicFunction) and isinstance(gf, SymbolicFunction):
            return sp.simplify(fg.expr - gf.expr.subs(gf.var, fg.var)) == 0
        return None
