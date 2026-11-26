"""Independent exact polynomial, rational-expression and system checks."""
import re

import sympy as sp

from sympy.solvers.solveset import NonlinearError

from set_oracles import split_top


def equal(left, right):
    return left is not None and right is not None and (left == right or sp.cancel(left - right) == 0)


def answer_fields(answer, expression):
    fields = re.split(r"\s*;\s*|\s*,\s*(?=[A-Za-z]\s*=)", answer.rstrip(". "))
    return [expression(re.split(r"[:=]", field)[-1].strip()) for field in fields]


def algebra_case(method, expected, answers, compare):
    return method, [str(value) for value in expected], [compare(answer) for answer in answers]


def normalize(question):
    question = re.sub(r"^\s*\d+\.\s*", "", question).strip().rstrip(" .?")
    return re.sub(r"\s+", " ", question)


def polynomial(value):
    if value is None or not value.free_symbols:
        return False
    return value.is_polynomial(*value.free_symbols)


def symbolic_identity(q, answers, expression):
    match = re.fullmatch(r"(Factorise|Expand|Simplify)(?: each of)?(?: the following(?: polynomials| expressions)?(?: using synthetic division)?)?\s*:?\s*(?:\([ivx]+\)\s*)?(.+)", q, re.I)
    if not match:
        return None
    requested, formula = match.groups()
    reference = expression(formula)
    if not polynomial(reference):
        return None
    expanded = sp.expand(reference)
    requested = requested.lower()

    def compare(answer):
        choices = re.split(r"\s+(?:or|அல்லது)\s+", answer.rstrip(". "))
        for choice in choices:
            observed = expression(choice)
            if not equal(expanded, observed):
                return False
            if requested == "expand" and sp.expand(observed) != observed:
                return False
            if requested == "factorise":
                factors = sp.Mul.make_args(observed)
                if len(factors) == 1 and not observed.is_Pow:
                    return False
                for factor in factors:
                    base = factor.base if factor.is_Pow else factor
                    if len(sp.factor_list(base, extension=True)[1]) > 1:
                        return False
        return True

    return algebra_case("exact_polynomial_" + requested, [expanded], answers, compare)


def arithmetic_polynomials(q, answers, expression):
    match = re.fullmatch(r"(Add the following polynomials|Subtract the second polynomial from the first polynomial|Multiply the following polynomials) and find the degree of the resultant polynomial[.:]?\s*\([ivx]+\)\s*\w\([a-z]\)\s*=\s*(.+?);\s*\w\([a-z]\)\s*=\s*(.+)", q, re.I)
    if match:
        operation, first, second = match.groups()
        left, right = expression(first), expression(second)
        if polynomial(left) and polynomial(right):
            operation = operation.split()[0].lower()
            result = {"add": left + right, "subtract": left - right, "multiply": left * right}[operation]
            degree = sp.Poly(result, *sorted(left.free_symbols | right.free_symbols, key=str)).total_degree()
            def compare(answer):
                formula, separator, text = answer.rstrip(". ").partition(";")
                return (bool(separator) and equal(expression(formula), result) and
                        bool(re.search(rf"(?<!\d){degree}(?!\d)", text)))
            return algebra_case("polynomial_" + operation + "_and_degree", [sp.expand(result), degree], answers, compare)
    match = re.fullmatch(r"(?:What should be added to|What must be subtracted from) (.+?) to get (.+)", q, re.I)
    if match:
        first, second = map(expression, match.groups())
        if polynomial(first) and polynomial(second):
            value = second - first if "added" in q else first - second
            return algebra_case("polynomial_missing_term", [sp.expand(value)], answers,
                                lambda answer: equal(expression(answer.rstrip(".")), value))
    match = re.fullmatch(r"Write the coefficient of x² and x in each of the following polynomials[.:]?\s*\([ivx]+\)\s*(.+)", q, re.I)
    if match and polynomial(value := expression(match[1])):
        x = sp.Symbol("x", real=True)
        expected = [sp.expand(value).coeff(x, 2), sp.expand(value).coeff(x, 1)]
        return algebra_case("polynomial_coefficients", expected, answers,
                            lambda answer: answer_fields(answer, expression) == expected)
    match = re.fullmatch(r"Find the degree of the following polynomials[.:]?\s*\([ivx]+\)\s*(.+)", q, re.I)
    if match and polynomial(value := expression(match[1])):
        degree = sp.Poly(value, *sorted(value.free_symbols, key=str)).total_degree()
        return algebra_case("polynomial_total_degree", [degree], answers,
                            lambda answer: bool(re.fullmatch(rf"(?:degree|படி)\s*=?\s*{degree}\s*\.?", answer, re.I)))
    return None


def substitutions_and_linear_roots(q, answers, expression):
    prompts = [
        r"Find the value of the polynomial \w\(([a-z])\)\s*=\s*(.+?) at\s*\([ivx]+\)\s*\1\s*=\s*(.+)",
        r"If \w\(([a-z])\)\s*=\s*(.+?),\s*find \w\((.+)\)",
    ]
    for pattern in prompts:
        if match := re.fullmatch(pattern, q, re.I):
            variable, formula, argument = match.groups()
            left, right = expression(formula), expression(argument)
            if left is not None and right is not None and not right.free_symbols:
                target = left.subs(sp.Symbol(variable, real=True), right)
                return algebra_case("polynomial_substitution", [target], answers,
                                    lambda answer: answer_fields(answer, expression) == [target])
    if match := re.fullmatch(r"Find the zeros of the polynomial in each of the following\s*:\s*\([ivx]+\)\s*\w\(([a-z])\)\s*=\s*(.+)", q, re.I):
        variable, formula = match.groups()
        value = expression(formula)
        x = sp.Symbol(variable, real=True)
        if polynomial(value) and value.free_symbols == {x} and sp.degree(value, x) == 1:
            [root] = sp.solve(value, x)
            return algebra_case("linear_polynomial_zero", [root], answers,
                                lambda answer: answer_fields(answer, expression) == [root])
    return None


def division(q, answers, expression):
    match = re.fullmatch(r"Find the quotient and remainder (?:of|for) the following(?: using synthetic division)?[.:]?\s*\([ivx]+\)\s*(.+?)\s*÷\s*(.+)", q, re.I)
    method = "polynomial_quotient_and_remainder"
    if not match:
        method = "polynomial_remainder"
        match = re.fullmatch(
            r"(?:Find the remainder when (.+?) is divided by (.+)|By remainder theorem, find the remainder when \w\(x\) is divided by \w\(x\) where\s*\([ivx]+\)\s*\w\(x\)\s*=\s*(.+?);\s*\w\(x\)\s*=\s*(.+))",
            q, re.I,
        )
    if not match:
        return None
    numerator, denominator = (expression(piece) for piece in match.groups() if piece)
    if not (polynomial(numerator) and polynomial(denominator) and len(numerator.free_symbols | denominator.free_symbols) == 1):
        return None
    symbol = next(iter(numerator.free_symbols | denominator.free_symbols))
    quotient, remainder = sp.div(numerator, denominator, symbol)
    values = [remainder] if method == "polynomial_remainder" else [quotient, remainder]
    def compare(answer):
        actual = answer_fields(answer, expression)
        return len(actual) == len(values) and all(equal(a, b) for a, b in zip(values, actual))
    return algebra_case(method, values, answers, compare)


def excluded_values(q, answers, expression):
    match = re.fullmatch(r"Find the excluded values, if any of the following expressions\.\s*\([ivx]+\)\s*(.+)", q, re.I)
    if not match:
        return None
    sides, operators = split_top(match[1], "/")
    if len(operators) != 1:
        return None
    numerator, denominator = map(expression, sides)
    if numerator is None or not polynomial(denominator) or len(denominator.free_symbols) != 1:
        return None
    symbol = next(iter(denominator.free_symbols))
    roots = sp.solveset(denominator, symbol, domain=sp.S.Reals)
    if not isinstance(roots, sp.FiniteSet):
        return None
    def compare(answer):
        values = {expression(part) for part in re.split(r"\s*,\s*", answer.rstrip(". "))}
        return values == set(roots)
    return algebra_case("original_denominator_real_zeros", sorted(roots), answers, compare)


def linear_system(q, answers, expression):
    match = re.fullmatch(r"(?:Solve the following system of linear equations in three variables\.?"
                         r"|Discuss the nature of solutions of the following system of equations"
                         r"|Solve graphically|Solve, using the method of substitution|Solve by the method of elimination"
                         r"|Solve by cross-multiplication method)\s*\([ivx]+\)\s*(.+)", q, re.I)
    if not match:
        return None
    lines = []
    for chain in match[1].split(";"):
        if "=" not in chain:
            return None
        chain_parts = [expression(fragment.strip()) for fragment in chain.split("=")]
        if any(value is None for value in chain_parts):
            return None
        lines.extend(a - b for a, b in zip(chain_parts, chain_parts[1:]))
    symbols = sorted(set().union(*(line.free_symbols for line in lines)), key=str)
    if len(symbols) < 2:
        return None
    try:
        matrix, vector = sp.linear_eq_to_matrix(lines, symbols)
    except NonlinearError:
        return None
    rank = matrix.rank()
    if matrix.row_join(vector).rank() > rank:
        kind = "none"
    elif rank < len(symbols):
        kind = "infinite"
    else:
        kind = "unique"
    if "nature of solutions" in q or kind != "unique":
        phrases = {
            "none": r"\bno solution\b|தீர்வு இல்லை|தீர்வில்லை",
            "infinite": r"\binfinitely many solutions\b|எண்ணற்ற தீர்வுகள்",
            "unique": r"\bunique solution\b|ஒரே(?: ஒரு)? தீர்வு|ஒரேயொரு தீர்வு",
        }
        return algebra_case("exact_linear_system_rank", [kind], answers,
                            lambda answer: bool(re.search(phrases[kind], answer, re.I)))
    [solution] = sp.linsolve((matrix, vector), symbols)
    def compare(answer):
        answer = answer.rstrip(". ").replace("−", "-")
        assignments = re.findall(r"\b([a-z])\s*=\s*([^,;]+)", answer)
        if assignments:
            observed = {name: expression(value) for name, value in assignments}
            return set(observed) == set(map(str, symbols)) and all(
                equal(observed[str(symbol)], value) for symbol, value in zip(symbols, solution)
            )
        tuple_match = re.search(r"(?:=\s*)?\(([^()]+,[^()]+)\)\s*$", answer)
        if not tuple_match:
            return False
        fields = tuple(expression(field.strip()) for field in tuple_match[1].split(","))
        return len(fields) == len(solution) and all(equal(a, b) for a, b in zip(fields, solution))
    return algebra_case("exact_linear_system_solution", list(solution), answers, compare)


def check_algebra(question, answers, expression):
    question = normalize(question)
    try:
        for solve in (symbolic_identity, arithmetic_polynomials, substitutions_and_linear_roots,
                      division, excluded_values, linear_system):
            result = solve(question, answers, expression)
            if result:
                return result
    except (ValueError, TypeError, sp.PolynomialError, NotImplementedError):
        return None
    return None
