"""TRACE MathGuard V1.3.3 — Deterministic Matrix Mathematics Solver."""

from __future__ import annotations

from typing import Optional, Sequence, Tuple

import sympy as sp


def matrix_transpose_order(rows: int, cols: int) -> Tuple[int, int]:
    if rows <= 0 or cols <= 0:
        raise ValueError("Matrix dimensions must be positive")
    return (cols, rows)


def matrix_product_order(r1: int, c1: int, r2: int, c2: int) -> Optional[Tuple[int, int]]:
    if r1 <= 0 or c1 <= 0 or r2 <= 0 or c2 <= 0:
        return None
    if c1 != r2:
        return None
    return (r1, c2)


def matrix_add(A: sp.Matrix, B: sp.Matrix) -> Optional[sp.Matrix]:
    if A.shape != B.shape:
        return None
    return sp.simplify(A + B)


def matrix_sub(A: sp.Matrix, B: sp.Matrix) -> Optional[sp.Matrix]:
    if A.shape != B.shape:
        return None
    return sp.simplify(A - B)


def matrix_mul(A: sp.Matrix, B: sp.Matrix) -> Optional[sp.Matrix]:
    if A.cols != B.rows:
        return None
    return sp.simplify(A * B)


def matrices_equal(A: sp.Matrix, B: sp.Matrix) -> bool:
    if A.shape != B.shape:
        return False
    for i in range(A.rows):
        for j in range(A.cols):
            if sp.simplify(A[i, j] - B[i, j]) != 0:
                return False
    return True
