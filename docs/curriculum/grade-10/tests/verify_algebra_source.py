"""Independent exact calculations for the remaining 2025 Algebra source tasks.

Run with Python and SymPy. These checks validate the source calculations and
document edge cases. They do not assert that a runtime lesson has been authored.
"""
import itertools
import json

import sympy as s


x, y, z, a, b, c, d, k, p, q, r, t = s.symbols("x y z a b c d k p q r t", real=True)
M = s.Matrix
R = s.Rational
I = s.eye(2)
checks = {}


def equal(left, right):
    difference = left - right
    if isinstance(difference, s.MatrixBase):
        assert all(s.simplify(entry) == 0 for entry in difference), difference
    else:
        assert s.simplify(difference) == 0, difference


def record(exercise, question, result, part="whole"):
    key = f"{exercise}/{question}/{part}"
    assert key not in checks
    checks[key] = str(result)


def graphs():
    quadratics = [x**2 - 9*x + 20, x**2 - 4*x + 4, x**2 + x + 7,
                  x**2 - 9, x**2 - 6*x + 9, (2*x - 3)*(x + 2)]
    expected = [{4, 5}, {2}, set(), {-3, 3}, {3}, {-2, R(3, 2)}]
    kinds = ["i", "ii", "iii", "iv", "v", "vi"]
    for part, polynomial, roots in zip(kinds, quadratics, expected):
        assert s.solveset(polynomial, x, s.S.Reals) == s.FiniteSet(*roots)
        discriminant = s.discriminant(polynomial, x)
        assert s.sign(discriminant) == len(roots) - 1
        record("3.16", 1, sorted(roots), part)
    intersections = [
        (x*x-4, x+8, x*x-x-12, {-3, 4}),
        (x*x+x, x-1, x*x+1, set()),
        (x*x+3*x+2, x+1, x*x+2*x+1, {-1}),
        (x*x+3*x-4, 0, x*x+3*x-4, {-4, 1}),
        (x*x-5*x-6, 8, x*x-5*x-14, {-2, 7}),
        (2*x*x-3*x-5, x+1, 2*x*x-4*x-6, {-1, 3}),
        ((x-1)*(x+3), 3*x+3, x*x-x-6, {-2, 3}),
    ]
    for question, (curve, line, polynomial, roots) in enumerate(intersections, 2):
        equal(curve - line, polynomial)
        assert s.solveset(curve - line, x, s.S.Reals) == s.FiniteSet(*roots)
        points = [(root, polynomial_value(curve, root)) for root in sorted(roots)]
        record("3.16", question, points)


def polynomial_value(expression, value):
    return s.sympify(expression).subs(x, value)


def matrix_elements():
    A = M([[8, 9, 4, 3], [-1, s.sqrt(7), s.sqrt(3)/2, 5], [1, 4, 3, 0], [6, 8, -11, 1]])
    assert len(A) == 16 and A.shape == (4, 4)
    entries = [A[i-1, j-1] for i, j in [(2, 2), (2, 3), (2, 4), (3, 4), (4, 3), (4, 4)]]
    assert entries == [s.sqrt(7), s.sqrt(3)/2, 5, 0, -11, 1]
    for part, result in zip(["i", "ii", "iii"], [16, A.shape, entries]):
        record("3.17", 1, result, part)
    orders = [[(i, n//i) for i in s.divisors(n)] for n in (18, 6)]
    assert orders == [[(1, 18), (2, 9), (3, 6), (6, 3), (9, 2), (18, 1)],
                      [(1, 6), (2, 3), (3, 2), (6, 1)]]
    record("3.17", 2, orders)
    left = M(3, 3, lambda i, j: abs(i+1 - 2*(j+1)))
    right = M(3, 3, lambda i, j: R((i+j+2)**3, 3))
    equal(left, M([[1, 3, 5], [0, 2, 4], [1, 1, 3]]))
    equal(right, M([[R(8, 3), 9, R(64, 3)], [9, R(64, 3), R(125, 3)], [R(64, 3), R(125, 3), 72]]))
    record("3.17", 3, left.tolist(), "i")
    record("3.17", 3, right.tolist(), "ii")
    A = M([[5, 4, 3], [1, -7, 9], [3, 8, 2]])
    equal(A.T, M([[5, 1, 3], [4, -7, 8], [3, 9, 2]]))
    record("3.17", 4, A.T.tolist())
    A = M([[s.sqrt(7), -3], [-s.sqrt(5), 2], [s.sqrt(3), -5]])
    equal((-A).T, M([[-s.sqrt(7), s.sqrt(5), -s.sqrt(3)], [3, -2, 5]]))
    record("3.17", 5, (-A).T.tolist())
    A = M([[5, 2, 2], [-s.sqrt(17), R(7, 10), R(5, 2)], [8, 3, 1]])
    equal(A.T.T, A)
    record("3.17", 6, A.tolist())
    for part, equations, expected in [
        ("i", [12-y, 3-z, x-3], [(3, 12, 3)]),
        ("ii", [x+y-6, z, x*y-8], [(2, 4, 0), (4, 2, 0)]),
        ("iii", [x+y+z-9, x+z-5, y+z-7], [(2, 4, 3)]),
    ]:
        assert s.solve(equations, (x, y, z)) == expected or s.solve(equations, (x, y, z)) == dict(zip((x, y, z), expected[0]))
        record("3.17", 7, expected, part)


def matrix_sums():
    A, B = M([[1, 9], [3, 4], [8, -3]]), M([[5, 7], [3, 3], [1, 0]])
    equal(A+B, B+A)
    record("3.18", 1, (A+B).tolist(), "i")
    equal(A+(-A), s.zeros(3, 2))
    equal((-A)+A, s.zeros(3, 2))
    record("3.18", 1, s.zeros(3, 2).tolist(), "ii")
    A = M([[4, 3, 1], [2, 3, -8], [1, 0, -4]])
    B = M([[2, 3, 4], [1, 9, 2], [-7, 1, -1]])
    C = M([[8, 3, 4], [1, -2, 3], [2, 4, -1]])
    equal(A+(B+C), (A+B)+C)
    record("3.18", 2, (A+B+C).tolist())
    U, V = M([[7, 0], [3, 5]]), M([[3, 0], [0, 4]])
    X, Y = (U+V)/2, (U-V)/2
    equal(X+Y, U)
    equal(X-Y, V)
    record("3.18", 3, [X.tolist(), Y.tolist()])
    A, B = M([[0, 4, 9], [8, 3, 7]]), M([[7, 3, 8], [1, 4, 9]])
    equal(B-5*A, M([[7, -17, -37], [-39, -11, -26]]))
    equal(3*A-9*B, M([[-63, -15, -45], [15, -27, -60]]))
    record("3.18", 4, (B-5*A).tolist(), "i")
    record("3.18", 4, (3*A-9*B).tolist(), "ii")
    eq1 = M([[x-3, 3*x-z], [x+y+7, x+y+z]]) - M([[1, 0], [1, 6]])
    eq2 = M([[x, y-z, z+3]]) + M([[y, 4, 3]]) - M([[4, 8, 16]])
    for part, equations, expected in [("i", eq1, (4, -10, 12)), ("ii", eq2, (-10, 14, 10))]:
        assert s.linsolve(list(equations), (x, y, z)) == s.FiniteSet(expected)
        record("3.18", 5, expected, part)
    assert s.linsolve([4*x-2*y-4, -3*x+3*y-6], (x, y)) == s.FiniteSet((4, 6))
    record("3.18", 6, (4, 6))
    equation = x*M([[2*x, 2], [3, x]]) + 2*M([[8, 5*x], [4, 4*x]]) - 2*M([[x*x+8, 24], [10, 6*x]])
    assert s.solve(list(equation), x) == [(4,)]
    record("3.18", 7, 4)
    eq = M([x*x, y*y]) + 2*M([-2*x, -y]) - M([5, 8])
    pairs = set(itertools.product((-1, 5), (-2, 4)))
    assert set(s.solve(list(eq), (x, y))) == pairs
    record("3.18", 8, sorted(pairs))


def matrix_products():
    sizes = [(3, 3, 3), (4, 3, 2), (4, 2, 2), (4, 5, 1), (1, 1, 3)]
    for part, (m, n, size) in zip(["i", "ii", "iii", "iv", "v"], sizes):
        assert (s.zeros(m, n)*s.zeros(n, size)).shape == (m, size)
        record("3.19", 1, (m, size), part)
    assert (s.zeros(2, 3)*s.zeros(3, 4)).shape == (2, 4)
    assert (s.zeros(3, 2)*s.zeros(2, 3)).shape == (3, 3)
    try:
        s.zeros(3, 4)*s.zeros(2, 3)
    except s.ShapeError:
        record("3.19", 2, "AB: p×r. BA: q×q if r=p, otherwise undefined.")
    else:
        raise AssertionError("Incompatible dimensions accepted")
    assert s.linsolve([a+3-b, 17-b-a], (a, b)) == s.FiniteSet((7, 10))
    record("3.19", 3, (7, 10))
    A, B = M([[2, 5], [4, 3]]), M([[1, -3], [2, 5]])
    equal(A*B, M([[12, 19], [10, 3]]))
    equal(B*A, M([[-10, -4], [24, 25]]))
    assert A*B != B*A
    record("3.19", 4, [(A*B).tolist(), (B*A).tolist()])
    A, B, C = M([[1, 3], [5, -1]]), M([[1, -1, 2], [3, 5, 2]]), M([[1, 3, 2], [-4, 1, 3]])
    equal(A*(B+C), A*B+A*C)
    record("3.19", 5, (A*(B+C)).tolist())
    A, B = M([[1, 2], [3, 1]]), M([[1, -2], [-3, 1]])
    equal(A*B, B*A)
    record("3.19", 6, (A*B).tolist())
    A, B, C = M([[1, 2], [1, 3]]), M([[4, 0], [1, 5]]), M([[2, 0], [1, 2]])
    for part, left, right in [("i", A*(B*C), (A*B)*C), ("ii", (A-B)*C, A*C-B*C),
                              ("iii", (A-B).T, A.T-B.T)]:
        equal(left, right)
        record("3.19", 7, left.tolist(), part)
    A, B = s.cos(t)*I, s.sin(t)*I
    equal(A*A+B*B, I)
    record("3.19", 8, I.tolist())
    A = M([[s.cos(t), s.sin(t)], [-s.sin(t), s.cos(t)]])
    equal(A*A.T, I)
    record("3.19", 9, I.tolist())
    A = M([[5, -4], [6, -5]])
    equal(A*A, I)
    record("3.19", 10, I.tolist())
    A = M([[a, b], [c, d]])
    equal(A*A-(a+d)*A, (b*c-a*d)*I)
    record("3.19", 11, "symbolic identity")
    A, B = M([[5, 2, 9], [1, 2, 8]]), M([[1, 7], [1, 2], [5, -1]])
    equal((A*B).T, B.T*A.T)
    record("3.19", 12, ((A*B).T).tolist())
    A = M([[3, 1], [-1, 2]])
    equal(A*A-5*A+7*I, s.zeros(2))
    record("3.19", 13, s.zeros(2).tolist())


def multiple_choice():
    def select(question, options, letter):
        assert [option for option, valid in zip("ABCD", options) if valid] == [letter]
        record("3.20", question, letter)

    # Ranks of one representative for each stated intersection geometry.
    for option, rows in zip("ABCD", [
        [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0]],
        [[1, 0, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0]],
        [[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]],
        [[1, 0, 0, 0], [0, 1, 0, 0], [1, 1, 0, 1]],
    ]):
        augmented = M(rows)
        if augmented[:, :3].rank() != augmented.rank():
            assert option == "D"
    select(1, [False, False, False, True], "D")
    eqs = [x+y-3*z+6, -7*y+7*z-7, 3*z-9]
    select(2, [all(eq.subs(dict(zip((x, y, z), candidate))) == 0 for eq in eqs)
               for candidate in [(1, 2, 3), (-1, 2, 3), (-1, -2, 3), (1, -2, 3)]], "A")
    select(3, [s.gcd(x*x-2*x-24, x*x-option*x-6) == x-6 for option in [3, 5, 6, 8]], "B")
    value = (3*y-3)/y / ((7*y-7)/(3*y*y))
    select(4, [s.cancel(value-option) == 0 for option in
               [9*y/7, 9*y**3/(21*y-21), (21*y*y-42*y+21)/(3*y**3), 7*(y*y-2*y+1)/y**2]], "A")
    value = y*y+1/y**2
    select(5, [s.cancel(value-option) != 0 for option in [(y**4+1)/y**2, (y+1/y)**2, (y-1/y)**2+2, (y+1/y)**2-2]], "B")
    value = x/(x*x-25)-8/(x*x+6*x+5)
    den = (x*x-25)*(x+1)
    select(6, [s.cancel(value-option) == 0 for option in [(x*x-7*x+40)/(x*x-25), (x*x+7*x+40)/den,
                                                        (x*x-7*x+40)/den, (x*x+10)/den]], "C")
    negative, nonzero_y, nonzero_z = s.symbols("u v w", nonzero=True, real=True)
    value = 256*negative**8*nonzero_y**4*nonzero_z**10/(25*negative**6*nonzero_y**6*nonzero_z**6)
    options = [R(16, 5)*abs(negative**2*nonzero_z**4/nonzero_y**2),
               16*abs(nonzero_y**2/(negative**2*nonzero_z**4)),
               R(16, 5)*abs(nonzero_y/(negative*nonzero_z**2)),
               R(16, 5)*abs(negative*nonzero_z**2/nonzero_y)]
    select(7, [s.cancel(value-option**2) == 0 for option in options], "D")
    select(8, [s.factor(x**4+64+option*x*x) == (x*x+8)**2 for option in [4, 16, 8, -8]], "B")
    roots = set(s.solve((2*x-1)**2-9, x))
    select(9, [roots == option for option in [{-1}, {2}, {-1, 2}, set()]], "C")
    select(10, [s.expand((2*x*x-6*x+10)**2-(4*x**4-24*x**3+76*x*x+u*x+v)) == 0
                for u, v in [(100, 120), (10, 12), (-120, 100), (12, 10)]], "C")
    equal((p*p-2*q*r)/q**2 - (-p*p/q**2), 2*(p*p-q*r)/q**2)
    reversed_premise = s.solve(x*x+x, x)
    assert {root**2 for root in reversed_premise} == set(s.solve(x*x-x, x))
    assert (-1)**2 != 1*0 and 2*(-1) != 1+0
    record("3.20", 11, "Blocked: English B follows. Tamil counterexample (q,p,r)=(1,-1,0).")
    select(12, [True, False, False, False], "A")
    select(13, [choice == len(s.solveset(x*x+4*x+4, x, s.S.Reals)) for choice in [0, 1, (0, 1), 2]], "B")
    A = M([[1, 3, 5, 7], [2, 4, 6, 8], [9, 11, 13, 15]])
    select(14, [A.T.shape == option for option in [(2, 3), (3, 2), (3, 4), (4, 3)]], "D")
    select(15, [(s.zeros(2, 3)*s.zeros(3, 4)).cols == option for option in [3, 4, 2, 5]], "B")
    select(16, [False, True, False, False], "B")
    assert M([1, 2, 3]).T.shape == (1, 3)
    select(17, [False, False, False, True], "D")
    P, Q = M([[1, 3], [5, 7]]), M([[5, 7], [9, 5]])
    select(18, [2*M(option)+P == Q for option in [[[-2, -2], [2, -1]], [[2, 2], [2, -1]],
                                                    [[1, 2], [2, 2]], [[2, 1], [2, 2]]]], "B")
    A, B = s.zeros(3, 2), s.zeros(3, 3)
    allowed = {index for index, (left, right) in enumerate([(A, A), (B, B), (A, B), (B, A)], 1)
               if left.cols == right.rows}
    select(19, [allowed == option for option in [{1, 2}, {2, 3}, {2, 4}, {1, 2, 3, 4}]], "C")
    A, B, C = M([[1, 2, 3], [3, 2, 1]]), M([[1, 0], [2, -1], [0, 2]]), M([[0, 1], [-2, 5]])
    assert (B*A).shape == (3, 3) and C.shape == (2, 2)
    correct = {index for index, valid in [(1, A*B+C == M([[5, 5], [5, 5]])),
                                          (2, B*C == M([[0, 1], [2, -3], [-4, 10]])),
                                          (4, A*B*C == M([[-8, 20], [-8, 13]]))] if valid}
    select(20, [correct == option for option in [{1, 2}, {2, 3}, {3, 4}, {1, 2, 3, 4}]], "A")


def unit():
    terms = [(x+y-5)/3, y-z, 2*x-11, 9-(x+2*z)]
    assert s.linsolve([left-right for left, right in zip(terms, terms[1:])], (x, y, z)) == s.FiniteSet((6, 2, 1))
    record("3.unit", 1, (6, 2, 1))
    assert s.linsolve([a+b+c-150, a-6-(c+6), 4*c-a-b], (a,b,c)) == s.FiniteSet((42, 78, 30))
    assert s.linsolve([a+b+c-150, a-6-(c+6), 4*c-a-b, b-a+6], (a,b,c)) == s.EmptySet
    record("3.unit", 2, (42, 78, 30))
    numbers = []
    for h, tens, u in itertools.product(range(1, 10), range(10), range(10)):
        value = 100*h+10*tens+u
        if 100*tens+10*h+u == 3*value+54 and 100*u+10*tens+h == value+198 and tens-h == 2*(tens-u):
            numbers.append(value)
    assert numbers == [153]
    record("3.unit", 3, 153)
    f, g = x*y*(k*k+1)+k*(x*x+y*y), x*y*(k*k-1)+k*(x*x-y*y)
    equal(f, (x+k*y)*(k*x+y))
    equal(g, (x+k*y)*(k*x-y))
    equal(s.lcm(f, g), (x+k*y)*(k*k*x*x-y*y))
    record("3.unit", 4, s.factor(s.lcm(f, g)))
    f, g, h = 2*x**4+13*x**3+27*x*x+23*x+7, (x+1)**3, (x+1)**2
    assert s.rem(f, g) == 0 and s.rem(g, h) == 0
    record("3.unit", 5, s.expand(s.gcd(s.gcd(f, g), h)))
    u = s.symbols("u", real=True)
    equal((u**3-8)/(u*u+2*u+4), u-2)
    assert s.discriminant(u*u+2*u+4, u) == -12
    record("3.unit", 6, "x^a - 2 on the domain of x^a", "i")
    equal((10*x**3-25*x*x+4*x-10)/(-4-10*x*x), -x+R(5, 2))
    record("3.unit", 6, -x+R(5, 2), "ii")
    f = (1/p+1/(q+r))/(1/p-1/(q+r))*(1+(q*q+r*r-p*p)/(2*q*r))
    equal(f, (p+q+r)**2/(2*q*r))
    record("3.unit", 7, "(p+q+r)^2/(2qr), pqr(q+r)(q+r-p) ≠ 0")
    assert s.solve(1/x+1/(2*x)+1/(3*x)-R(1, 6), x) == [11]
    record("3.unit", 8, (11, 22, 33))
    root = 17*x*x-18*x+19
    equal(root**2, 289*x**4-612*x**3+970*x*x-684*x+361)
    assert s.discriminant(root, x) < 0 and root.coeff(x, 2) > 0
    record("3.unit", 9, root)
    assert s.solve(s.sqrt(y+1)+s.sqrt(2*y-5)-3, y) == [3]
    record("3.unit", 10, 3)
    assert [speed for speed in s.solve(36/(x-4)-36/(x+4)-R(8, 5), x) if speed > 4] == [14]
    record("3.unit", 11, 14)
    assert set(s.solve(x*(160-x)-4800, x)) == {40, 120}
    record("3.unit", 12, (120, 40))
    assert [value for value in s.solve(60-t-(t*t/4-3), t) if 0 <= value <= 60] == [14]
    record("3.unit", 13, 14)
    assert [value for value in s.solve(2*x*(x-5)-x*x-375, x) if value > 5] == [25]
    record("3.unit", 14, 25)
    roots = s.solveset(x*x-2*x+3, x, s.S.Complexes)
    for part, transformed, expected in [
        ("i", [root+2 for root in roots], x*x-6*x+11),
        ("ii", [(root-1)/(root+1) for root in roots], (3*x*x-2*x+1)/3),
    ]:
        equal(s.prod(x-root for root in transformed), expected)
        record("3.unit", 15, expected, part)
    assert s.solve([(x*x+p*x-4).subs(x, -4), p*p-4*q], (p,q)) == [(3, R(9, 4))]
    record("3.unit", 16, (3, R(9, 4)))
    april = M([[500, 1000, 1500], [2500, 1500, 500]])
    equal((april+2*april)/2, M([[750, 1500, 2250], [3750, 2250, 750]]))
    equal(2**4*april, M([[8000, 16000, 24000], [40000, 24000, 8000]]))
    record("3.unit", 17, ((april+2*april)/2).tolist(), "i")
    record("3.unit", 17, (2**4*april).tolist(), "ii")
    cs, sn = s.cos(t), s.sin(t)
    lhs = cs*M([[cs, sn], [-sn, cs]]) + sn*M([[x, -cs], [cs, x]])
    equal(lhs-I, sn*(x-sn)*I)
    equal(lhs.subs(t, 0), I)
    record("3.unit", 18, "sin θ if sin θ ≠ 0; all real x otherwise")
    A, B, C = M([[p, 0], [0, 2]]), M([[0, -q], [1, 0]]), M([[2, -2], [2, 2]])
    assert s.linsolve(list(B*A-C*C), (p, q)) == s.FiniteSet((8, 4))
    record("3.unit", 19, (8, 4))
    A, B, C = M([[3, 0], [4, 5]]), M([[6, 3], [8, 5]]), M([[3, 6], [1, 1]])
    D = M([[122, 71], [-58, -34]])
    assert C.det() != 0
    equal(C*D, A*B)
    record("3.unit", 20, D.tolist())


if __name__ == "__main__":
    for verify in (graphs, matrix_elements, matrix_sums, matrix_products, multiple_choice, unit):
        verify()
    assert len(checks) == 98
    print(json.dumps(checks, ensure_ascii=False, indent=2))
