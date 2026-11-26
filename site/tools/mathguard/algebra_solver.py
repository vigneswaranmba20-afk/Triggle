"""TRACE MathGuard V1.3.3 — Deterministic Computational Algebra Solver."""

from __future__ import annotations

from typing import Any, Dict, List, Optional, Sequence, Tuple

import sympy as sp


def solve_linear_system(eqs: Sequence[sp.Eq], variables: Sequence[sp.Symbol]) -> Optional[Tuple[sp.Expr, ...]]:
    """Solve a linear system deterministically via exact Gaussian elimination."""
    sols = sp.linsolve(list(eqs), list(variables))
    if not sols:
        return None
    sol_list = list(sols)
    if len(sol_list) != 1:
        return None
    tup = tuple(sp.simplify(v) for v in sol_list[0])
    if any(v.has(*variables) for v in tup):
        return None
    return tup


def classify_linear_system(eqs: Sequence[sp.Eq], variables: Sequence[sp.Symbol]) -> str:
    """Classify system as 'unique', 'infinite', or 'no_solution' via Rouché–Capelli rank test."""
    A, b = sp.linear_eq_to_matrix(list(eqs), list(variables))
    Ab = A.row_join(b)
    r_A = A.rank()
    r_Ab = Ab.rank()
    n = len(variables)
    if r_A < r_Ab:
        return "no_solution"
    if r_A == n:
        return "unique"
    return "infinite"


def poly_gcd(polys: Sequence[sp.Expr], gens: Sequence[sp.Symbol]) -> sp.Expr:
    """Compute polynomial GCD over Q."""
    g = sp.Integer(0)
    for p in polys:
        g = sp.gcd(g, sp.expand(p), *gens) if g != 0 else sp.expand(p)
    return sp.factor(g)


def poly_lcm(polys: Sequence[sp.Expr], gens: Sequence[sp.Symbol]) -> sp.Expr:
    """Compute polynomial LCM over Q."""
    l = sp.Integer(1)
    for p in polys:
        l = sp.lcm(l, sp.expand(p), *gens)
    return sp.factor(l)


def unknown_poly_from_gcd_lcm(known_poly: sp.Expr, gcd_poly: sp.Expr, lcm_poly: sp.Expr) -> sp.Expr:
    """Use f(x) * g(x) = GCD * LCM to recover the unknown polynomial."""
    return sp.factor(sp.cancel((gcd_poly * lcm_poly) / known_poly))


def simplify_rational(expr: sp.Expr) -> sp.Expr:
    """Simplify rational expression to lowest terms."""
    return sp.factor(sp.cancel(expr))


def excluded_values(expr: sp.Expr, var: sp.Symbol, reduce_first: bool = True) -> List[sp.Expr]:
    """Find excluded values where denominator vanishes."""
    target = sp.cancel(expr) if reduce_first else sp.together(expr)
    den = sp.denom(target)
    if not den.has(var):
        return []
    return list(sp.solve(sp.Eq(den, 0), var))


def poly_sqrt_root(expr: sp.Expr) -> sp.Expr:
    """Compute exact principal algebraic square root P such that P^2 == expr."""
    factored = sp.factor(sp.together(expr))
    root = sp.sqrt(factored)
    # Try symbolic simplification for positive-coefficient polynomial squares
    num, den = sp.fraction(sp.together(expr))
    num_f = sp.factor(num)
    den_f = sp.factor(den)
    def _sqrt_factor(f: sp.Expr) -> sp.Expr:
        if f.is_Mul:
            return sp.Mul(*[_sqrt_factor(a) for a in f.args])
        if f.is_Pow and f.exp.is_even:
            return f.base ** (f.exp // 2)
        if f.is_Number and f >= 0:
            return sp.sqrt(f)
        return sp.sqrt(f)
    cand = _sqrt_factor(num_f) / _sqrt_factor(den_f)
    return sp.simplify(cand)


def solve_perfect_square_poly(poly_expr: sp.Expr, x: sp.Symbol, params: Sequence[sp.Symbol]) -> List[Dict[sp.Symbol, sp.Expr]]:
    """Find parameter values making degree-4 polynomial (A x^2 + B x + C)^2 a perfect square."""
    p_exp = sp.Poly(sp.expand(poly_expr), x)
    c4, c3, c2, c1, c0 = [p_exp.nth(d) for d in (4, 3, 2, 1, 0)]
    p_set = set(params)
    out: List[Dict[sp.Symbol, sp.Expr]] = []
    seen = set()

    def _add_sol(sub: Dict[sp.Symbol, sp.Expr]):
        if len(sub) != len(params):
            return
        key = tuple((pr.name, str(sp.simplify(sub[pr]))) for pr in params)
        if key not in seen:
            seen.add(key)
            out.append({pr: sp.simplify(sub[pr]) for pr in params})

    if not c4.has(*p_set):
        A_val = sp.sqrt(c4)
        if not c3.has(*p_set):
            B_val = sp.simplify(c3 / (2 * A_val))
            if not c2.has(*p_set):
                C_val = sp.simplify((c2 - B_val**2) / (2 * A_val))
                sol = sp.solve([sp.Eq(2 * B_val * C_val, c1), sp.Eq(C_val**2, c0)], list(params), dict=True)
                for s in sol:
                    _add_sol(s)
            elif not c0.has(*p_set):
                for C_val in (sp.sqrt(c0), -sp.sqrt(c0)):
                    sol = sp.solve([sp.Eq(B_val**2 + 2 * A_val * C_val, c2), sp.Eq(2 * B_val * C_val, c1)], list(params), dict=True)
                    for s in sol:
                        _add_sol(s)
    elif not c0.has(*p_set) and not c1.has(*p_set) and not c2.has(*p_set):
        C_val = sp.sqrt(c0)
        B_val = sp.simplify(c1 / (2 * C_val))
        A_val = sp.simplify((c2 - B_val**2) / (2 * C_val))
        sol = sp.solve([sp.Eq(A_val**2, c4), sp.Eq(2 * A_val * B_val, c3)], list(params), dict=True)
        for s in sol:
            _add_sol(s)
    return out


def solve_quadratic_verified(eq_expr: sp.Expr, var: sp.Symbol) -> List[sp.Expr]:
    """Solve equation and back-substitute to reject extraneous roots."""
    eq = sp.Eq(eq_expr, 0) if not isinstance(eq_expr, sp.Equality) else eq_expr
    raw_sols = sp.solve(eq, var)
    valid: List[sp.Expr] = []
    diff = sp.simplify(eq.lhs - eq.rhs)
    for r in raw_sols:
        try:
            chk = sp.simplify(diff.subs(var, r))
            if chk == 0:
                valid.append(sp.simplify(r))
        except Exception:
            continue
    # Preserve multiplicity for repeated quadratic roots if polynomial degree 2 has 1 distinct root
    if len(valid) == 1:
        num = sp.numer(sp.together(diff))
        if sp.Poly(sp.expand(num), var).degree() == 2:
            valid.append(valid[0])
    return valid


def quadratic_from_sum_product(S: sp.Expr, P: sp.Expr, x: sp.Symbol) -> Tuple[sp.Expr, sp.Expr, sp.Expr]:
    """Return integer/cleared coefficients (a, b, c) of ax^2 + bx + c = 0 from sum S and product P."""
    expr = sp.together(x**2 - S * x + P)
    num = sp.expand(sp.numer(expr))
    poly = sp.Poly(num, x)
    coeffs = poly.all_coeffs()
    if len(coeffs) != 3:
        raise ValueError("Not a quadratic polynomial")
    a, b, c = coeffs
    # Clear common numeric gcd if all integers
    if all(v.is_Integer for v in (a, b, c)):
        g = sp.igcd(abs(int(a)), abs(int(b)), abs(int(c)))
        if g > 1:
            a, b, c = a // g, b // g, c // g
    if a.is_Number and a < 0:
        a, b, c = -a, -b, -c
    return (sp.simplify(a), sp.simplify(b), sp.simplify(c))


def sum_product_of_roots(eq_expr: sp.Expr, var: sp.Symbol) -> Tuple[sp.Expr, sp.Expr]:
    """Return (sum_of_roots, product_of_roots) for quadratic equation."""
    num = sp.expand(sp.numer(sp.together(eq_expr)))
    poly = sp.Poly(num, var)
    a, b, c = poly.all_coeffs()
    return (sp.simplify(-b / a), sp.simplify(c / a))


def discriminant_and_nature(a: sp.Expr, b: sp.Expr, c: sp.Expr) -> Tuple[sp.Expr, str]:
    """Compute discriminant Δ = b^2 - 4ac and classify real root nature."""
    disc = sp.simplify(b**2 - 4 * a * c)
    if disc.free_symbols:
        return disc, "symbolic"
    val = float(disc.evalf())
    if abs(val) < 1e-12:
        return disc, "real_equal"
    if val > 0:
        return disc, "real_unequal"
    return disc, "not_real"


def variation_from_table(xs: Sequence[sp.Expr], ys: Sequence[sp.Expr]) -> Tuple[str, sp.Expr]:
    """Detect direct (y = kx) or inverse (xy = k) variation from tabular data."""
    ratios = [sp.simplify(y / x) for x, y in zip(xs, ys)]
    if all(r == ratios[0] for r in ratios):
        return ("direct", ratios[0])
    prods = [sp.simplify(x * y) for x, y in zip(xs, ys)]
    if all(p == prods[0] for p in prods):
        return ("inverse", prods[0])
    raise ValueError("Table is neither direct nor inverse variation")
