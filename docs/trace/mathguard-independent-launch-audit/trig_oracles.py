"""Value checks for angle arithmetic and right triangles, with quadrant conditions."""
import re

import sympy as sp

from algebra_oracles import algebra_case, equal, normalize
from number_oracles import answer_numeric_token, rounded_matches


RATIOS = ("sin", "cos", "tan", "cosec", "sec", "cot")
FUNCTIONS = dict(zip(RATIOS, (sp.sin, sp.cos, sp.tan, sp.csc, sp.sec, sp.cot)))
SUP = str.maketrans("²³⁴", "234")
ATOM = re.compile(r"(cosec|sin|cos|tan|cot|sec)([²³⁴]?)\s*(\d+)\s*°(?:\s*(\d+)\s*[′'])?")
ASSIGNMENT = re.compile(r"(cosec|sin|cos|tan|cot|sec)\s*([A-Zθ])\s*=\s*(.+)")


def six_ratios(opposite, adjacent, hypotenuse):
    if opposite <= 0 or adjacent <= 0 or hypotenuse**2 != opposite**2 + adjacent**2:
        return None
    return dict(zip(RATIOS, (opposite/hypotenuse, adjacent/hypotenuse, opposite/adjacent,
                             hypotenuse/opposite, hypotenuse/adjacent, adjacent/opposite)))


def ratio_assignments(answer, expression):
    results = {}
    for field in answer.strip(" .").split(";"):
        match = ASSIGNMENT.fullmatch(field.strip())
        if not match:
            return {}
        function, angle, value = match.groups()
        results[function, angle] = expression(value.strip())
    return results


def check_ratios(expected, answer, expression):
    actual = ratio_assignments(answer, expression)
    return actual.keys() == expected.keys() and all(equal(value, actual[key]) for key, value in expected.items())


def triangle(q, answers, expression):
    printed = re.fullmatch(r"The diagram identifies AB = (\d+), AC = (\d+) and BC = (\d+), with a right angle at A\. Determine all six ratios at B", q)
    if printed:
        ab, ac, bc = map(sp.Integer, printed.groups())
        trig = six_ratios(ac, ab, bc)
        if trig:
            expected = {(name, "B"): val for name, val in trig.items()}
            return algebra_case("right_triangle_six_ratios", list(trig.values()), answers,
                                lambda answer: check_ratios(expected, answer, expression))
    acute = re.fullmatch(r"For an acute angle θ, if (\d+)cos θ = (√\d+), find all six trigonometric ratios of θ",q)
    if acute:
        cosine = expression(acute[2])/int(acute[1])
        if 0 < cosine < 1:
            trig = six_ratios(sp.sqrt(1-cosine**2), cosine, sp.Integer(1))
            expected = {(name, "θ"): val for name, val in trig.items()}
            return algebra_case("acute_six_ratios", list(trig.values()), answers,
                                lambda answer: check_ratios(expected, answer, expression))
    return None


def two_triangles(q, answers, expression):
    pattern = (r"From the given figure, find the values of:\s*\(i\) sin B\s*\(ii\) sec B\s*\(iii\) cot B"
               r"\s*\(iv\) cos C\s*\(v\) tan C\s*\(vi\) cosec C\. "
               r"Figure: AB = (\d+), BD = (\d+), DC = (\d+); AD ⟂ BC")
    match = re.fullmatch(pattern, q)
    if not match:
        return {}
    ab, bd, dc = map(sp.Integer, match.groups())
    if not (0 < bd < ab and dc > 0):
        return {}
    ad = sp.sqrt(ab**2 - bd**2)
    b_ratios = six_ratios(ad, bd, ab)
    c_ratios = six_ratios(ad, dc, sp.sqrt(ad**2+dc**2))
    values = [("i", "sin", "B"), ("ii", "sec", "B"), ("iii", "cot", "B"),
              ("iv", "cos", "C"), ("v", "tan", "C"), ("vi", "cosec", "C")]
    assignments = [ratio_assignments(answer, expression) for answer in answers]
    if any(len(answer) != len(values) for answer in assignments):
        return {}
    results = {}
    for part, function, angle in values:
        expected = (b_ratios if angle == "B" else c_ratios)[function]
        actual = [entry.get((function, angle)) for entry in assignments]
        results[part] = ("paired_right_triangle_ratio", [str(expected)], [equal(a, expected) for a in actual])
    return results


def evaluate_angle_expression(text, expression):
    values = {}

    def replace(match):
        function, exponent, degree, minute = match.groups()
        symbol = "a" + str(len(values))
        angle = (sp.Integer(degree) + sp.Rational(minute or "0", 60))*sp.pi/180
        value = FUNCTIONS[function](angle)
        if exponent:
            value **= int(exponent.translate(SUP))
        values[symbol] = value
        return f"#{symbol}#"
    rewritten = ATOM.sub(replace, text)
    if not values or len(values) > 12 or any(val.is_finite is not True or val.is_real is not True for val in values.values()):
        return None
    if re.search(r"[A-Za-z]", re.sub(r"#a\d+#", "", rewritten)):
        return None
    constants = []
    for index, (name, value) in enumerate(values.items()):
        variable = "abcdefghijkl"[index]
        rewritten = re.sub(rf"(?<=[\d)])\s*#{name}#", f"*{variable}", rewritten)
        rewritten = re.sub(rf"#{name}#(?=\s*(?:#|\())", variable+"*", rewritten)
        rewritten = rewritten.replace(f"#{name}#", variable)
        constants.append((variable, value))
    computed = expression(rewritten, tuple(constants))
    if computed is None or computed.free_symbols:
        return None
    return sp.trigsimp(computed)


def exact_angle_prompts(q, answers, expression):
    q = q.split("Select one:")[0].rstrip(" .")
    if match := re.fullmatch(r"Evaluate\s*:?\s*(.+?)(?:,\s*when ([A-Zx])=(\d+)°)?", q, re.I):
        formula, angle, degrees = match.groups()
        if angle:
            formula = re.sub(rf"(cosec|sin|cos|tan|cot|sec)\s*(\d*){angle}\b",
                             lambda m: m[1]+str(int(m[2] or "1")*int(degrees))+"°", formula)
        value = evaluate_angle_expression(formula, expression)
        if value is not None:
            return algebra_case("exact_degree_trig", [value], answers,
                                lambda answer: equal(expression(answer_numeric_token(answer)), value))
    if match := re.fullmatch(r"Verify:\s*(.+)", q):
        sides = [evaluate_angle_expression(clause, expression)
                 if ATOM.search(clause) else expression(clause)
                 for clause in match[1].split("=")]
        if len(sides) >= 2 and all(value is not None and equal(value, sides[0]) for value in sides):
            def compare(text):
                parts = [part.strip() for part in text.split("=")]
                values = [expression(part) for part in parts if part not in {"LHS", "RHS"}]
                return bool(values) and parts[-1] not in {"LHS", "RHS"} and all(
                    equal(value, sides[0]) for value in values
                )
            return algebra_case("exact_degree_trig_identity_values", [sides[0]], answers, compare)
    match = re.fullmatch(r"(?:Look up or calculate|Evaluate|Find)\s+(cosec|sin|cos|tan|cot|sec)\s*(\d+)°\s*(?:(\d+)[′'])?(?:\s+to|, reporting) four decimal places",q,re.I)
    if match:
        fn, degree, minute = match.groups()
        angle = (int(degree) + sp.Rational(minute or "0",60)) * sp.pi / 180
        expected = FUNCTIONS[fn](angle)
        return algebra_case("calculator_at_four_places", [sp.N(expected, 14)], answers,
                            lambda answer: bool(re.fullmatch(r"\d+\.\d{4}", answer)) and
                            rounded_matches(expected, sp.Rational(answer), sp.Rational(1,10_000)))
    return None


def check_trigonometry(question, answers, expression):
    q = normalize(question)
    return triangle(q, answers, expression) or exact_angle_prompts(q, answers, expression), two_triangles(q, answers, expression)
