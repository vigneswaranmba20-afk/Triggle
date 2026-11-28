"""Rounding and pi-approximation reconciliation checks."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional

import sympy as sp

from .symbolic import evaluate_with_pi_mode


@dataclass(frozen=True)
class ApproximationMatch:
    matched: bool
    mode: str  # "exact", "22/7", "3.14", "true_pi", "none"
    derived_value: Optional[float]
    abs_diff: Optional[float]


def check_numeric_match(
    derived_expr: sp.Expr,
    observed_value: float,
    tolerance: float = 0.02,
    preferred_pi: Optional[str] = None,
) -> ApproximationMatch:
    """Check whether observed_value matches derived_expr under exact or standard pi modes."""
    modes = ["22/7", "exact", "3.14"]
    if preferred_pi and preferred_pi in modes:
        modes = [preferred_pi] + [m for m in modes if m != preferred_pi]

    best_diff: Optional[float] = None
    best_mode = "none"
    best_val: Optional[float] = None

    for mode in modes:
        val = evaluate_with_pi_mode(derived_expr, mode)
        if val is None:
            continue
        diff = abs(val - observed_value)
        if best_diff is None or diff < best_diff:
            best_diff = diff
            best_mode = mode
            best_val = val
        if diff <= tolerance:
            return ApproximationMatch(
                matched=True,
                mode=mode,
                derived_value=val,
                abs_diff=diff,
            )

    return ApproximationMatch(
        matched=False,
        mode=best_mode,
        derived_value=best_val,
        abs_diff=best_diff,
    )
