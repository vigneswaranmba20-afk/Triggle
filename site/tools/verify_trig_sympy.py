#!/usr/bin/env python3
"""
Deterministic SymPy verification for Grade 9 & Grade 10 Chapter 6 (Trigonometry)
identities, exact values, and multi-root domain checks.
"""
import sympy as sp

deg = sp.pi / 180
th, A, B, x, y, a, b, c = sp.symbols("theta A B x y a b c", real=True, positive=True)

results = []

def check(item_id, expr_diff, note=""):
    ok = False
    try:
        s = sp.trigsimp(sp.simplify(expr_diff))
        if s == 0:
            ok = True
        else:
            val = s.subs({th: 0.7, A: 0.5, B: 0.4})
            ok = abs(complex(val.evalf())) < 1e-10
    except Exception as e:
        ok = False
    results.append((item_id, ok, note))
    assert ok, f"SymPy verification failed for {item_id}: {note}"

# Grade 9 Ex 6.2 exact value checks
check("c9-exercise-6-2-q1-i", sp.sin(45*deg) + sp.cos(45*deg) - sp.sqrt(2), "sin45+cos45=sqrt(2)")
check("c9-exercise-6-2-q1-ii", sp.sin(30*deg) + sp.cos(60*deg) - 1, "sin30+cos60=1")
check("c9-exercise-6-2-q2-i", sp.cos(90*deg) + sp.sin(90*deg)*sp.tan(45*deg) - 1, "cos90+sin90*tan45=1")

# Grade 9 Ex 6.3 complementary angle checks
check("c9-exercise-6-3-q-i", sp.cos(47*deg)/sp.sin(43*deg) - 1, "cos47/sin43=1")
check("c9-exercise-6-3-q-ii", sp.sec(19*deg)/sp.csc(71*deg) - 1, "sec19/cosec71=1")

# Grade 9 Ex 6.5 (all 10 MCQs)
check("c9-exercise-6-5-q1", sp.sin(30*deg)**2 + sp.cos(60*deg)**2 - sp.Rational(1, 2), "sin^2(30)+cos^2(60)=1/2")
check("c9-exercise-6-5-q2", sp.tan(53*deg) - sp.cot(37*deg), "tan53=cot37")
check("c9-exercise-6-5-q3", sp.tan(72*deg)*sp.tan(18*deg) - 1, "tan72*tan18=1")
check("c9-exercise-6-5-q4", 2*sp.tan(30*deg)/(1 - sp.tan(30*deg)**2) - sp.tan(60*deg), "2tan30/(1-tan^2 30)=tan60")
check("c9-exercise-6-5-q5-root1", 2*sp.sin(2*30*deg) - sp.sqrt(3), "theta=30 deg (acute 2*theta)")
check("c9-exercise-6-5-q5-root2", 2*sp.sin(2*60*deg) - sp.sqrt(3), "theta=60 deg (unrestricted 2*theta=120 deg)")
check("c9-exercise-6-5-q6-intended", 3*sp.sin(70*deg)/sp.cos(20*deg) + 2*sp.sin(49*deg)/sp.cos(41*deg) - 5, "3sin70sec20+2sin49sec41=5")
assert abs(float((3*sp.sin(70*deg)/sp.cos(20*deg) + 2*sp.sin(49*deg)/sp.cos(51*deg)).evalf()) - 5.0) > 0.39, "Literal printed 49+51=100 != 90"
check("c9-exercise-6-5-q7", (1 - sp.tan(45*deg)**2)/(1 + sp.tan(45*deg)**2), "(1-tan^2 45)/(1+tan^2 45)=0")
q8_expr = (1/sp.sin((70+th)*deg) - 1/sp.cos((20-th)*deg) + sp.tan((65+th)*deg) - sp.cot((25-th)*deg)).subs(th, 7)
check("c9-exercise-6-5-q8", q8_expr, "cosec(70+th)-sec(20-th)+tan(65+th)-cot(25-th)=0")
check("c9-exercise-6-5-q9", sp.prod(sp.tan(k*deg) for k in range(1, 90)) - 1, "prod tan(1..89)=1")
check("c9-exercise-6-5-q10", sp.asin(sp.Rational(1, 2))/deg + sp.acos(sp.Rational(1, 2))/deg - 90, "alpha+beta=90")

# Grade 10 Ch 6 key identities (Ex 6.1 & Unit 6)
check("c10-6-ex6-1-q1-i", sp.cot(th) + sp.tan(th) - sp.sec(th)*sp.csc(th), "cot+tan=sec*cosec")
check("c10-6-ex6-1-q1-ii", sp.tan(th)**4 + sp.tan(th)**2 - (sp.sec(th)**4 - sp.sec(th)**2), "tan^4+tan^2=sec^4-sec^2")
check("c10-6-ex6-1-q2-i", (1 - sp.tan(th)**2)/(sp.cot(th)**2 - 1) - sp.tan(th)**2, "(1-tan^2)/(cot^2-1)=tan^2")
check("c10-6-unit-q1-i", (sp.cot(A)**2 * (sp.sec(A)-1)/(1+sp.sin(A))) + (sp.sec(A)**2 * (sp.sin(A)-1)/(1+sp.sec(A))), "Unit 6 Q1(i) = 0")
check("c10-6-unit-q1-ii", (sp.tan(th)**2 - 1)/(sp.tan(th)**2 + 1) - (1 - 2*sp.cos(th)**2), "(tan^2-1)/(tan^2+1)=1-2cos^2")
check("c10-6-unit-q2", ((1 + sp.sin(th) - sp.cos(th))/(1 + sp.sin(th) + sp.cos(th)))**2 - (1 - sp.cos(th))/(1 + sp.cos(th)), "Unit 6 Q2")

print(f"PASS: SymPy independently verified {len(results)}/{len(results)} Grade 9 & Grade 10 Chapter 6 trigonometric expressions/identities.")
