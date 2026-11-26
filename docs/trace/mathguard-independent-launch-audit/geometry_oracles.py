"""Question-derived coordinate and solid geometry checks, with exact units."""
import re

import sympy as sp

from algebra_oracles import algebra_case, equal, normalize
from number_oracles import answer_numeric_token
from set_oracles import split_labels


POINT = re.compile(r"\(([^(),;]+),\s*([^(),;]+)\)")
MEASURE = r"(\d+(?:\.\d+)?)\s*(cm|m|mm)"
UNIT_WORDS = {
    "cm²": r"cm\s*(?:²|\^2|2)|sq\.?\s*cm|ச\.?செ\.?மீ|செ\.?மீ\s*(?:²|\^2)",
    "m²": r"(?<![cம])m\s*(?:²|\^2|2)|sq\.?\s*m|ச\.?\s*மீ|(?<!செ\.)மீ\s*(?:²|\^2)",
    "cm³": r"cm\s*(?:³|\^3|3)|cu\.?\s*cm|கன\.?செ\.?மீ|செ\.?மீ\s*(?:³|\^3)",
    "m³": r"(?<!c)m\s*(?:³|\^3|3)|cu\.?\s*m|கன\.?\s*மீ|(?<!செ\.)மீ\s*(?:³|\^3)",
    "mm³": r"mm\s*(?:³|\^3|3)|cu\.?\s*mm|மி\.?மீ\s*(?:³|\^3)",
    "cm": r"cm|செ\.?மீ",
    "m": r"m|மீ",
    "units": r"units?|அலகுகள்?",
    "sq units": r"sq\.?\s*units|square units|சதுர அலகுகள்|ச\.?\s*அலகுகள்",
    "litres": r"litres?|லிட்டர்",
    "currency": r"₹|ரூ\.?",
}


def points(text, expression):
    values = [tuple(expression(fragment.strip()) for fragment in match.groups())
              for match in POINT.finditer(text)]
    return values if all(a is not None and b is not None for a, b in values) else []


def compare_points(expected, actual):
    return len(expected) == len(actual) and all(
        equal(a, c) and equal(b, d) for (a, b), (c, d) in zip(expected, actual)
    )


def midpoint(a, b):
    return tuple((x + y) / 2 for x, y in zip(a, b))


def triangle_area(a, b, c):
    return abs(cross(a, b, c)) / 2


def cross(a, b, c):
    return sp.expand((b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]))


def heron(sides):
    if min(sides) <= 0 or 2 * max(sides) >= sum(sides):
        return None
    s = sum(sides) / 2
    return sp.sqrt(s * sp.prod(s - side for side in sides))


def value_with_unit(text, expression, unit):
    text = answer_numeric_token(text).strip(" .")
    if unit == "currency":
        token = re.search(rf"(?:{UNIT_WORDS[unit]})\s*([0-9,.]+)$", text)
        return expression(token[1].replace(",", "")) if token else None
    pattern = UNIT_WORDS[unit]
    token = re.search(rf"\s*(?:{pattern})\s*\.?$", text, re.I)
    if not token:
        return None
    cleaned = re.split(r"[:=]", text[:token.start()])[-1].strip()
    cleaned = re.sub(r"(?<=\d),(?=\d{3}(?:\D|$))", "", cleaned)
    return expression(cleaned)


def distance_answer(text, value, expression):
    observed = value_with_unit(text, expression, "units")
    # For an explicitly symbolic distance the unit word is often omitted.
    if observed is None and value.free_symbols:
        stripped = answer_numeric_token(text).strip(" .")
        if stripped.startswith("|") and stripped.endswith("|"):
            inner = expression(stripped[1:-1])
            observed = abs(inner) if inner is not None else None
    return equal(observed, value)


def coordinate(q, answers, expression):
    ps = points(q, expression)
    wants = q.lower()
    if "find the other end" in wants and "diameter" in wants and "centre" in wants and len(ps) == 2:
        center, known = ps if wants.startswith("the centre") else ps[::-1]
        result = tuple(2*x-y for x, y in zip(center, known))
        return algebra_case("diameter_reflection", [result], answers,
                            lambda answer: compare_points([result], points(answer, expression)))
    if "find the third vertex" in wants and "centroid" in wants and len(ps) == 3:
        center, a, b = ps
        result = tuple(3*x-y-z for x, y, z in zip(center, a, b))
        return algebra_case("centroid_missing_vertex", [result], answers,
                            lambda answer: compare_points([result], points(answer, expression)))
    match = re.search(r"line segment joining the points?.*?in the ratio\s*(\d+)\s*:\s*(\d+)", q, re.I)
    if match and len(ps) == 2 and re.search(r"find the coordinates", q, re.I):
        m, n = map(int, match.groups())
        if min(m, n) > 0:
            result = tuple((n*x+m*y)/(m+n) for x, y in zip(*ps))
            return algebra_case("coordinate_section", [result], answers,
                                lambda answer: compare_points([result], points(answer, expression)))
    if wants.startswith("find the coordinates of the points of trisection") and len(ps) == 2:
        result = [tuple((x*(3-k)+y*k)/3 for x, y in zip(*ps)) for k in (1, 2)]
        return algebra_case("coordinate_trisection", result, answers,
                            lambda answer: compare_points(result, points(answer, expression)))
    if "find the area of the triangle formed by the points" in wants and len(ps) == 3:
        area = triangle_area(*ps)
        return algebra_case("coordinate_triangle_determinant", [area], answers,
                            lambda answer: equal(value_with_unit(answer, expression, "sq units"), area))
    if "determine whether the sets of points are collinear" in wants and len(ps) == 3:
        yes = cross(*ps) == 0
        def compare(answer):
            text = answer.lower()
            if re.search(r"not collinear|ஒரே நேர்க்கோட்டில் இல்லை|ஒருகோட்டில் இல்லை", text):
                return not yes
            return yes and bool(re.search(r"\bcollinear\b|ஒரே நேர்க்கோட்டில்|ஒருகோட்டில்", text))
        return algebra_case("coordinate_collinearity_determinant", [yes], answers, compare)
    if "find the value of" in wants and "for which the given points are collinear" in wants and len(ps) == 3:
        determinant = cross(*ps)
        if len(determinant.free_symbols) == 1:
            symbol = next(iter(determinant.free_symbols))
            roots = sp.solveset(determinant, symbol, domain=sp.S.Reals)
            if isinstance(roots, sp.FiniteSet):
                def compare(answer):
                    parts = re.split(r"\s+(?:or|அல்லது)\s+", answer.strip(" ."))
                    return {expression(part.rsplit("=", 1)[-1].strip()) for part in parts} == set(roots)
                return algebra_case("coordinate_collinearity_parameter", sorted(roots), answers, compare)
    return None


def coordinate_parts(question, answers, expression):
    try:
        segments = split_labels(question)
        shown = [split_labels(answer) for answer in answers]
    except ValueError:
        return {}
    if not segments or any(set(shown_parts) != set(segments) for shown_parts in shown):
        return {}
    results = {}
    for part, text in segments.items():
        ps = points(text, expression)
        answer_parts = [shown_parts[part] for shown_parts in shown]
        if question.lower().startswith("find the mid-points of the line segment") and len(ps) == 2:
            mid = midpoint(*ps)
            results[part] = algebra_case("coordinate_midpoint", [mid], answer_parts,
                                        lambda answer: compare_points([mid], points(answer, expression)))
        if question.lower().startswith("find the distance between the following pairs") and len(ps) == 2:
            value = sp.sqrt(sum((x-y)**2 for x,y in zip(*ps)))
            results[part] = algebra_case("coordinate_distance", [value], answer_parts,
                                        lambda answer: distance_answer(answer, value, expression))
        if question.lower().startswith("find the centroid of the triangle") and len(ps) == 3:
            value = tuple(sum(coords)/3 for coords in zip(*ps))
            results[part] = algebra_case("coordinate_centroid", [value], answer_parts,
                                        lambda answer: compare_points([value], points(answer, expression)))
    return results


def solid_or_land(q, answers, expression):
    match = re.fullmatch(rf"Find the area of an equilateral triangle whose perimeter is {MEASURE}", q, re.I)
    if match:
        side = sp.Rational(match[1])/3
        area, unit = sp.sqrt(3)*side**2/4, match[2]+"²"
        return algebra_case("equilateral_area", [area, unit], answers,
                            lambda ans: equal(value_with_unit(ans.split("≈")[0], expression, unit), area))
    match = re.fullmatch(r"If the total surface area of a cube is (\d+(?:\.\d+)?)\s*(cm|m)²\s*then,? find its lateral surface area", q, re.I)
    if match:
        area, unit = sp.Rational(match[1])*sp.Rational(2, 3), match[2]+"²"
        return algebra_case("cube_lateral_surface", [area, unit], answers,
                            lambda answer: equal(value_with_unit(answer, expression, unit), area))
    match = re.fullmatch(r"The volume of a container is (\d+) m(?:³|3)\. The length and breadth of the container are (\d+) m and (\d+) m respectively\. Find its height", q, re.I)
    if match:
        volume, length, width = map(sp.Rational, match.groups())
        height = volume/(length*width)
        return algebra_case("cuboid_height", [height, "m"], answers,
                            lambda answer: equal(value_with_unit(answer, expression, "m"), height))
    match = re.fullmatch(r"A cubical milk tank can hold (\d+) litres of milk\. Find the length of its side in metres", q, re.I)
    if match:
        side = sp.real_root(sp.Rational(match[1], 1000), 3)
        return algebra_case("cube_capacity_litres", [side, "m"], answers,
                            lambda answer: equal(value_with_unit(answer, expression, "m"), side))
    match = re.fullmatch(r"The length, breadth and depth of a pond are (\d+(?:\.\d+)?) m, (\d+) m and (\d+) m respectively\. Find the capacity of the pond in litres", q, re.I)
    if match:
        volume = 1000 * sp.prod(map(sp.Rational, match.groups()))
        return algebra_case("cuboid_capacity_litres", [volume, "litres"], answers,
                            lambda answer: equal(value_with_unit(answer, expression, "litres"), volume))
    match = re.fullmatch(r"Find the area of a quadrilateral ABCD whose sides are AB\s*=\s*(\d+) cm, BC\s*=\s*(\d+) cm, CD\s*=\s*(\d+) cm, AD\s*=\s*(\d+) cm and diagonal BD\s*=\s*(\d+) cm", q, re.I)
    if match:
        ab, bc, cd, ad, bd = map(sp.Rational, match.groups())
        first, second = heron((ab, ad, bd)), heron((bc, cd, bd))
        if first is not None and second is not None:
            return algebra_case("quadrilateral_two_triangle_areas", [first+second, "cm²"], answers,
                                lambda answer: equal(value_with_unit(answer, expression, "cm²"), first+second))
    return None


def solid_parts(question, answers, expression):
    if not re.match(r"Using Heron’s formula, find the area of a triangle whose sides are", question, re.I):
        return {}
    try:
        segments = split_labels(question)
        shown = [split_labels(answer) for answer in answers]
    except ValueError:
        return {}
    if any(set(shown_parts) != set(segments) for shown_parts in shown):
        return {}
    results = {}
    for part, text in segments.items():
        pairs = re.findall(MEASURE, text, re.I)
        if len(pairs) == 3 and len({unit for _, unit in pairs}) == 1:
            unit = pairs[0][1] + "²"
            area = heron(tuple(sp.Rational(value) for value, _ in pairs))
            if area is not None:
                results[part] = algebra_case("heron_exact_area", [area, unit],
                                            [shown_parts[part] for shown_parts in shown],
                                            lambda ans: equal(value_with_unit(ans, expression, unit), area))
    return results


def check_geometry(question, answers, expression, chapter):
    q = normalize(question)
    if chapter == 5:
        return coordinate(q, answers, expression), coordinate_parts(q, answers, expression)
    if chapter == 7:
        return solid_or_land(q, answers, expression), solid_parts(q, answers, expression)
    return None, {}
