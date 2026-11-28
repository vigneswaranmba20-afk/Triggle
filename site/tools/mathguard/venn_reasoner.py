"""TRACE MathGuard V1.5 — VennDiagramReasoner (2-set & 3-set Region Constraint Engine).

Models mutually exclusive Venn regions with exact rational/integer linear algebra:
- 2-set: 4 regions (A_only, AB, B_only, outside)
- 3-set: 8 regions (A_only, B_only, C_only, AB_only, AC_only, BC_only, ABC, outside)
- Rejects inconsistent givens, negative counts, and fractional population counts
- Detects underdetermined problems (never assumes outside=0 unless explicitly given)
- Verifies shaded regions via Boolean minterm truth tables
"""

from __future__ import annotations

from dataclasses import dataclass, field
from fractions import Fraction
from typing import Any, Dict, List, Optional, Sequence, Tuple

from .set_theory_reasoner import _BooleanMaskParser


TWO_SET_REGIONS = ("A_only", "AB", "B_only", "outside")
THREE_SET_REGIONS = ("A_only", "B_only", "C_only", "AB_only", "AC_only", "BC_only", "ABC", "outside")

# Bitmask -> region name for 2 sets (A=bit0, B=bit1)
_2SET_MASK_TO_NAME = {
    0b01: "A_only",
    0b11: "AB",
    0b10: "B_only",
    0b00: "outside",
}

# Bitmask -> region name for 3 sets (A=bit0, B=bit1, C=bit2)
_3SET_MASK_TO_NAME = {
    0b001: "A_only",
    0b010: "B_only",
    0b100: "C_only",
    0b011: "AB_only",
    0b101: "AC_only",
    0b110: "BC_only",
    0b111: "ABC",
    0b000: "outside",
}


@dataclass
class VennSolveResult:
    status: str  # "SOLVED" | "UNDERDETERMINED" | "INCONSISTENT" | "INVALID_POPULATION"
    num_sets: int
    regions: Dict[str, Optional[int]] = field(default_factory=dict)
    determined_quantities: Dict[str, int] = field(default_factory=dict)
    free_variables: List[str] = field(default_factory=list)
    reason: str = ""

    @property
    def resolved(self) -> Dict[str, Any]:
        out: Dict[str, Any] = {}
        for k, v in self.regions.items():
            if v is not None:
                out[k] = v
        out.update(self.determined_quantities)
        return out


def _rref(matrix: List[List[Fraction]], rhs: List[Fraction]) -> Tuple[List[List[Fraction]], List[Fraction], List[int], bool]:
    """Exact Gauss-Jordan RREF over Q. Returns (R, d, pivot_cols, inconsistent)."""
    m = len(matrix)
    n = len(matrix[0]) if m else 0
    aug = [list(matrix[i]) + [rhs[i]] for i in range(m)]
    pivots: List[int] = []
    row = 0
    for col in range(n):
        if row >= m:
            break
        piv = None
        for r in range(row, m):
            if aug[r][col] != 0:
                piv = r
                break
        if piv is None:
            continue
        aug[row], aug[piv] = aug[piv], aug[row]
        pv = aug[row][col]
        aug[row] = [v / pv for v in aug[row]]
        for r in range(m):
            if r != row and aug[r][col] != 0:
                factor = aug[r][col]
                aug[r] = [aug[r][c] - factor * aug[row][c] for c in range(n + 1)]
        pivots.append(col)
        row += 1

    inconsistent = False
    for r in range(m):
        if all(aug[r][c] == 0 for c in range(n)) and aug[r][n] != 0:
            inconsistent = True
            break
    R = [aug[r][:n] for r in range(m)]
    d = [aug[r][n] for r in range(m)]
    return R, d, pivots, inconsistent


class VennDiagramReasoner:
    """Deterministic region-based reasoning engine for 2-set and 3-set Venn problems."""

    def __init__(self, num_sets: Any = 2) -> None:
        if isinstance(num_sets, (list, tuple)):
            num_sets = len(num_sets)
        if num_sets not in (2, 3):
            raise ValueError("VennDiagramReasoner supports 2 or 3 sets")
        self.num_sets = num_sets
        self.region_names = TWO_SET_REGIONS if num_sets == 2 else THREE_SET_REGIONS
        self.mask_to_name = _2SET_MASK_TO_NAME if num_sets == 2 else _3SET_MASK_TO_NAME
        self.name_to_idx = {name: i for i, name in enumerate(self.region_names)}
        self.constraints: List[Tuple[List[Fraction], Fraction, str]] = []

    def _expr_weights(self, expr: str) -> List[Fraction]:
        """Convert a set expression (e.g. 'A ∪ B', 'A ∩ B', 'A \\ B', 'U', 'outside') into region weights."""
        norm = expr.strip()
        if norm in ("outside", "(A∪B)'", "(A∪B∪C)'"):
            w = [Fraction(0)] * len(self.region_names)
            w[self.name_to_idx["outside"]] = Fraction(1)
            return w
        if norm in self.name_to_idx:
            w = [Fraction(0)] * len(self.region_names)
            w[self.name_to_idx[norm]] = Fraction(1)
            return w
        var_map = {"A": 0, "B": 1} if self.num_sets == 2 else {"A": 0, "B": 1, "C": 2}
        mask = _BooleanMaskParser(norm, var_map).parse()
        w = [Fraction(0)] * len(self.region_names)
        for m, rname in self.mask_to_name.items():
            if (mask >> m) & 1:
                w[self.name_to_idx[rname]] = Fraction(1)
        return w

    def add_constraint(self, expr: str, value: Any, label: str = "") -> None:
        """Add linear cardinality constraint n(expr) = value."""
        weights = self._expr_weights(expr)
        val = Fraction(value) if not isinstance(value, Fraction) else value
        self.constraints.append((weights, val, label or f"n({expr})={val}"))

    def _bitstring_to_name(self, bits: str) -> str:
        # Leftmost bit = A, next = B, next = C -> convert to LSB=A mask
        mask = 0
        for idx, ch in enumerate(bits):
            if ch == "1":
                mask |= (1 << idx)
        return self.mask_to_name.get(mask, bits)

    def add_region_constraint(self, weights_by_region: Dict[str, Any], value: Any, label: str = "") -> None:
        """Add custom linear constraint over region names, e.g. {'A_only': 1, 'B_only': 1} = 10."""
        w = [Fraction(0)] * len(self.region_names)
        for rname, coef in weights_by_region.items():
            eff_name = rname
            if eff_name not in self.name_to_idx and all(ch in "01" for ch in eff_name) and len(eff_name) == self.num_sets:
                eff_name = self._bitstring_to_name(eff_name)
            if eff_name not in self.name_to_idx:
                raise ValueError(f"Unknown region {rname}")
            w[self.name_to_idx[eff_name]] = Fraction(coef)
        val = Fraction(value) if not isinstance(value, Fraction) else value
        self.constraints.append((w, val, label or "custom"))

    def solve(self, target_exprs: Optional[List[str]] = None) -> VennSolveResult:
        n = len(self.region_names)
        if not self.constraints:
            return VennSolveResult(
                status="UNDERDETERMINED",
                num_sets=self.num_sets,
                free_variables=list(self.region_names),
                reason="No constraints provided",
            )

        mat = [c[0] for c in self.constraints]
        rhs = [c[1] for c in self.constraints]
        R, d, pivots, inconsistent = _rref(mat, rhs)
        if inconsistent:
            return VennSolveResult(
                status="INCONSISTENT",
                num_sets=self.num_sets,
                reason="Given cardinality constraints are mathematically inconsistent",
            )

        piv_set = set(pivots)
        free_cols = [c for c in range(n) if c not in piv_set]
        regions: Dict[str, Optional[int]] = {}

        # Map each pivot row to its pivot column
        piv_row_for_col: Dict[int, int] = {}
        for r_idx, pcol in enumerate(pivots):
            piv_row_for_col[pcol] = r_idx

        # Check uniquely determined regions
        for col in range(n):
            rname = self.region_names[col]
            if col in free_cols:
                regions[rname] = None
                continue
            r_idx = piv_row_for_col[col]
            depends_on_free = any(R[r_idx][fc] != 0 for fc in free_cols)
            if not depends_on_free:
                val = d[r_idx]
                if val < 0:
                    return VennSolveResult(
                        status="INVALID_POPULATION",
                        num_sets=self.num_sets,
                        reason=f"Region {rname} has negative count {val}",
                    )
                if val.denominator != 1:
                    return VennSolveResult(
                        status="INVALID_POPULATION",
                        num_sets=self.num_sets,
                        reason=f"Region {rname} has fractional count {val}",
                    )
                regions[rname] = int(val)
            else:
                regions[rname] = None

        # Evaluate requested target expressions (uniquely determined iff orthogonal to nullspace)
        determined: Dict[str, int] = {}
        for t_expr in target_exprs or []:
            tw = self._expr_weights(t_expr)
            # Express tw in terms of free variables using RREF pivot rows
            rem = list(tw)
            const_val = Fraction(0)
            for pcol in pivots:
                coef = rem[pcol]
                if coef != 0:
                    r_idx = piv_row_for_col[pcol]
                    const_val += coef * d[r_idx]
                    for c in range(n):
                        rem[c] -= coef * R[r_idx][c]
            if all(rem[fc] == 0 for fc in free_cols):
                if const_val < 0 or const_val.denominator != 1:
                    return VennSolveResult(
                        status="INVALID_POPULATION",
                        num_sets=self.num_sets,
                        reason=f"Target {t_expr} yields invalid population count {const_val}",
                    )
                determined[t_expr] = int(const_val)

        if not free_cols:
            return VennSolveResult(
                status="SOLVED",
                num_sets=self.num_sets,
                regions=regions,
                determined_quantities=determined,
                free_variables=[],
                reason="All Venn regions uniquely solved as non-negative integers",
            )

        # If target_exprs were requested and ALL of them are uniquely determined, still report free_variables
        free_names = [self.region_names[c] for c in free_cols]
        if target_exprs and len(determined) == len(target_exprs):
            return VennSolveResult(
                status="SOLVED",
                num_sets=self.num_sets,
                regions=regions,
                determined_quantities=determined,
                free_variables=free_names,
                reason="Target expressions uniquely determined despite free region(s)",
            )

        return VennSolveResult(
            status="UNDERDETERMINED",
            num_sets=self.num_sets,
            regions=regions,
            determined_quantities=determined,
            free_variables=free_names,
            reason=f"Underdetermined Venn system; free region(s): {', '.join(free_names)}",
        )

    def verify_shaded_region(self, expr: str, expected_regions: Sequence[str]) -> Dict[str, Any]:
        """Verify shaded Venn region via Boolean truth table over minterms."""
        w = self._expr_weights(expr)
        actual = {self.region_names[i] for i, val in enumerate(w) if val == 1}
        expected = set()
        for r in expected_regions:
            if r not in self.name_to_idx and all(ch in "01" for ch in r) and len(r) == self.num_sets:
                expected.add(self._bitstring_to_name(r))
            else:
                expected.add(r)
        ok = actual == expected
        return {
            "status": "PASS" if ok else "FAIL",
            "valid": ok,
            "actual_regions": sorted(actual),
            "expected_regions": sorted(expected),
        }

    def verify_diagram_data(self, diagram: Dict[str, Any]) -> Dict[str, Any]:
        """Verify structured diagram region labels against solved constraints."""
        if not isinstance(diagram, dict):
            return {"status": "UNVERIFIABLE", "reason": "No structured diagram dict"}
        res = self.solve()
        if res.status != "SOLVED":
            return {"status": "UNVERIFIABLE", "reason": res.reason}
        mismatches = []
        for k, expected_val in res.regions.items():
            if k in diagram and diagram[k] is not None:
                try:
                    if int(diagram[k]) != expected_val:
                        mismatches.append({"region": k, "diagram": diagram[k], "solved": expected_val})
                except (TypeError, ValueError):
                    pass
        return {
            "status": "FAIL" if mismatches else "PASS",
            "mismatches": mismatches,
            "solved_regions": res.regions,
        }
