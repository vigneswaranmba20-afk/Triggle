"""Independent Mensuration geometric formula models using exact SymPy expressions."""

from __future__ import annotations

import sympy as sp

PI = sp.pi


def cylinder_csa(r: sp.Expr, h: sp.Expr) -> sp.Expr:
    return 2 * PI * r * h


def cylinder_tsa(r: sp.Expr, h: sp.Expr) -> sp.Expr:
    return 2 * PI * r * (r + h)


def cylinder_volume(r: sp.Expr, h: sp.Expr) -> sp.Expr:
    return PI * r**2 * h


def hollow_cylinder_csa(R: sp.Expr, r: sp.Expr, h: sp.Expr) -> sp.Expr:
    return 2 * PI * (R + r) * h


def hollow_cylinder_tsa(R: sp.Expr, r: sp.Expr, h: sp.Expr) -> sp.Expr:
    return 2 * PI * (R + r) * (R - r + h)


def hollow_cylinder_volume(R: sp.Expr, r: sp.Expr, h: sp.Expr) -> sp.Expr:
    return PI * (R**2 - r**2) * h


def cone_slant_height(r: sp.Expr, h: sp.Expr) -> sp.Expr:
    return sp.sqrt(r**2 + h**2)


def cone_csa(r: sp.Expr, l: sp.Expr) -> sp.Expr:
    return PI * r * l


def cone_tsa(r: sp.Expr, l: sp.Expr) -> sp.Expr:
    return PI * r * (r + l)


def cone_volume(r: sp.Expr, h: sp.Expr) -> sp.Expr:
    return sp.Rational(1, 3) * PI * r**2 * h


def frustum_slant_height(R: sp.Expr, r: sp.Expr, h: sp.Expr) -> sp.Expr:
    return sp.sqrt(h**2 + (R - r) ** 2)


def frustum_csa(R: sp.Expr, r: sp.Expr, l: sp.Expr) -> sp.Expr:
    return PI * (R + r) * l


def frustum_tsa(R: sp.Expr, r: sp.Expr, l: sp.Expr) -> sp.Expr:
    return PI * (R + r) * l + PI * R**2 + PI * r**2


def frustum_volume(R: sp.Expr, r: sp.Expr, h: sp.Expr) -> sp.Expr:
    return sp.Rational(1, 3) * PI * h * (R**2 + R * r + r**2)


def sphere_sa(r: sp.Expr) -> sp.Expr:
    return 4 * PI * r**2


def sphere_volume(r: sp.Expr) -> sp.Expr:
    return sp.Rational(4, 3) * PI * r**3


def hollow_sphere_volume(R: sp.Expr, r: sp.Expr) -> sp.Expr:
    return sp.Rational(4, 3) * PI * (R**3 - r**3)


def hemisphere_csa(r: sp.Expr) -> sp.Expr:
    return 2 * PI * r**2


def hemisphere_tsa(r: sp.Expr) -> sp.Expr:
    return 3 * PI * r**2


def hemisphere_volume(r: sp.Expr) -> sp.Expr:
    return sp.Rational(2, 3) * PI * r**3


def hollow_hemisphere_csa(R: sp.Expr, r: sp.Expr) -> sp.Expr:
    return 2 * PI * (R**2 + r**2)


def hollow_hemisphere_tsa(R: sp.Expr, r: sp.Expr) -> sp.Expr:
    return PI * (3 * R**2 + r**2)


def hollow_hemisphere_volume(R: sp.Expr, r: sp.Expr) -> sp.Expr:
    return sp.Rational(2, 3) * PI * (R**3 - r**3)


def cuboid_volume(l: sp.Expr, b: sp.Expr, h: sp.Expr) -> sp.Expr:
    return l * b * h


def cuboid_tsa(l: sp.Expr, b: sp.Expr, h: sp.Expr) -> sp.Expr:
    return 2 * (l * b + b * h + h * l)


def cube_tsa(a: sp.Expr) -> sp.Expr:
    return 6 * a**2


def cube_volume(a: sp.Expr) -> sp.Expr:
    return a**3
