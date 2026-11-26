"""Symbolic expression equivalence and pi-mode evaluation."""

from __future__ import annotations

from typing import Dict, Optional

import sympy as sp

PI_22_7 = sp.Rational(22, 7)
PI_3_14 = sp.Rational(314, 100)


def _normalize_symbols(expr: sp.Expr) -> sp.Expr:
    """Replace assumption-tagged symbols with plain symbols of the same name."""
    subs = {s: sp.Symbol(s.name) for s in expr.free_symbols}
    return expr.subs(subs) if subs else expr


def expressions_equivalent(
    lhs: sp.Expr,
    rhs: sp.Expr,
    subs: Optional[Dict[sp.Symbol, sp.Expr]] = None,
) -> bool:
    """Return True if lhs and rhs are symbolically equivalent."""
    a = _normalize_symbols(lhs.subs(subs) if subs else lhs)
    b = _normalize_symbols(rhs.subs(subs) if subs else rhs)
    try:
        diff = sp.simplify(a - b)
        if diff == 0:
            return True
        if sp.expand(a - b) == 0:
            return True
        if sp.radsimp(a - b) == 0:
            return True
    except Exception:
        pass
    return False


def evaluate_with_pi_mode(expr: sp.Expr, pi_mode: str = "22/7") -> Optional[float]:
    """Evaluate a SymPy expression under a specified pi approximation."""
    if pi_mode == "22/7":
        val = expr.subs(sp.pi, PI_22_7)
    elif pi_mode == "3.14":
        val = expr.subs(sp.pi, PI_3_14)
    elif pi_mode == "exact":
        val = expr
    else:
        raise ValueError(f"Unknown pi_mode: {pi_mode}")
    try:
        num = complex(val.evalf(30))
        if abs(num.imag) > 1e-12:
            return None
        return float(num.real)
    except Exception:
        return None
