"""Safe, deterministic recursive-descent parser for math and LaTeX expressions.

Converts math/LaTeX strings into SymPy expressions without using eval(), exec(),
or arbitrary code execution.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import List, Optional, Tuple

import sympy as sp


class ParseError(ValueError):
    """Raised when an expression cannot be parsed safely."""


@dataclass(frozen=True)
class Token:
    kind: str  # NUM, ID, OP, LPAREN, RPAREN, LBRACE, RBRACE, CMD, COMMA, EOF
    value: str


_SUPERSCRIPTS = {
    "⁰": "0",
    "¹": "1",
    "²": "2",
    "³": "3",
    "⁴": "4",
    "⁵": "5",
    "⁶": "6",
    "⁷": "7",
    "⁸": "8",
    "⁹": "9",
}

_UNIT_WORDS = {
    "cm",
    "m",
    "mm",
    "km",
    "sq",
    "cu",
    "cubic",
    "square",
    "units",
    "unit",
    "litres",
    "litre",
    "l",
    "ml",
    "rs",
    "minutes",
    "minute",
    "min",
    "hours",
    "hour",
    "hr",
    "hrs",
    "s",
    "sec",
    "words",
    "coins",
    "caps",
    "approx",
}


def preprocess_math_text(text: str) -> str:
    """Normalize Unicode math symbols and strip benign formatting wrappers."""
    s = str(text or "").strip()
    # Replace Unicode operators & constants
    s = s.replace("−", "-").replace("–", "-").replace("—", "-")
    s = s.replace("×", "*").replace("·", "*").replace("÷", "/")
    s = s.replace("π", r"\pi ").replace("ℓ", "l")
    s = s.replace("√", r"\sqrt ")
    s = s.replace("≈", "=")
    s = s.replace("⇒", ";").replace("=>", ";").replace(r"\Rightarrow", ";").replace(r"\implies", ";")
    # Expand LaTeX shorthand fractions like \dfrac43 or \frac13 -> \dfrac{4}{3}
    s = re.sub(r"\\(d?frac|tfrac)\s*([0-9A-Za-z])\s*([0-9A-Za-z])", r"\\\1{\2}{\3}", s)
    # Strip thousands commas inside numbers like 1,812,000
    s = re.sub(r"(?<=\d),(?=\d{3}\b)", "", s)
    # Convert Unicode superscripts like r² or cm³ -> ^2, ^3
    def _sup_repl(m: re.Match[str]) -> str:
        digits = "".join(_SUPERSCRIPTS[ch] for ch in m.group(0))
        return f"^{{{digits}}}"

    s = re.sub(r"[⁰¹²³⁴⁵⁶⁷⁸⁹]+", _sup_repl, s)
    # Collapse subscripted identifiers like A_{ cap } or CSA _{QR} -> A_cap, CSA_QR
    s = re.sub(
        r"([A-Za-z]+)\s*_\{\s*([^}]+?)\s*\}",
        lambda m: f"{m.group(1)}_{re.sub(r'[^A-Za-z0-9]', '', m.group(2))}",
        s,
    )
    # Strip LaTeX spacing/sizing/text commands
    s = re.sub(r"\\(left|right|big|Big|bigg|Bigg)\b", "", s)
    s = re.sub(r"\\[,;:! ]", " ", s)
    s = re.sub(r"\\quad\b|\\qquad\b", " ", s)
    # Strip \boxed{...} wrapper
    s = re.sub(r"\\boxed\s*\{", "{", s)
    # Strip \text{...}, \mathrm{...}, \operatorname{...} when they hold units/labels
    s = re.sub(r"\\(?:text|mathrm|mathbf|operatorname)\s*\{([^}]*)\}", r" \1 ", s)
    # Strip compound rate units like m^3/h or m³/h or km/h
    s = re.sub(r"\b(?:m\^\{?3\}?|cm\^\{?3\}?|km|m|l|litres?)\s*/\s*(?:h|hr|min|s|sec)\b", " ", s, flags=re.I)
    # Strip trailing standalone 'h' (hours) or 'L' (litres) only when preceded by a space+number NOT after '^'
    s = re.sub(r"(?:^|(?<=[\s=;(]))(\d+(?:\.\d+)?)\s+(?:h|L)(?=\s|$|[;=\)])", r"\1", s)
    # Strip trailing period after unit abbreviations like "sq. units."
    s = re.sub(r"\b(sq|cu)\.\s*", r"\1 ", s, flags=re.IGNORECASE)
    # Strip [ and ] used as grouping brackets in plain-text eqs like √[8²+(12-6)²]
    s = s.replace("[", "(").replace("]", ")")
    # Normalize mixed numbers like "1005 5/7" -> "(1005 + 5/7)"
    s = re.sub(r"\b(\d+)\s+(\d+)\s*/\s*(\d+)\b", r"(\1+\2/\3)", s)
    return s


def tokenize(text: str) -> List[Token]:
    s = preprocess_math_text(text)
    tokens: List[Token] = []
    i = 0
    n = len(s)
    while i < n:
        ch = s[i]
        if ch.isspace():
            i += 1
            continue
        if ch in ("'", '"', "`", "$"):
            raise ParseError(f"Disallowed character {ch!r} in math expression")
        if ch == "\\":
            j = i + 1
            while j < n and s[j].isalpha():
                j += 1
            cmd = s[i + 1 : j]
            if cmd in ("times", "cdot"):
                tokens.append(Token("OP", "*"))
            elif cmd == "div":
                tokens.append(Token("OP", "/"))
            elif cmd in ("dfrac", "frac", "tfrac"):
                tokens.append(Token("CMD", "frac"))
            elif cmd == "sqrt":
                tokens.append(Token("CMD", "sqrt"))
            elif cmd == "pi":
                tokens.append(Token("ID", "pi"))
            elif cmd == "ell":
                tokens.append(Token("ID", "l"))
            elif cmd == "approx":
                tokens.append(Token("OP", "="))
            elif cmd == "percentage" or cmd == "%":
                tokens.append(Token("OP", "%"))
            elif cmd in ("begin", "end"):
                if j < n and s[j] == "{":
                    end_b = s.find("}", j)
                    if end_b != -1:
                        j = end_b + 1
            elif cmd == "":
                if j < n and s[j] == "\\":
                    j += 1
                elif j < n and s[j] == "%":
                    tokens.append(Token("OP", "%"))
                    j += 1
            i = j
            continue
        if ch.isdigit() or (ch == "." and i + 1 < n and s[i + 1].isdigit()):
            j = i
            has_dot = False
            while j < n and (s[j].isdigit() or (s[j] == "." and not has_dot)):
                if s[j] == ".":
                    has_dot = True
                j += 1
            tokens.append(Token("NUM", s[i:j]))
            i = j
            continue
        if ch.isalpha() or ch == "_":
            j = i
            while j < n and (s[j].isalnum() or s[j] == "_"):
                j += 1
            word = s[i:j]
            if word.startswith("__"):
                raise ParseError(f"Disallowed identifier {word!r}")
            if word.lower() in _UNIT_WORDS:
                k = j
                while k < n and s[k].isspace():
                    k += 1
                if k < n and s[k] == "^":
                    k += 1
                    while k < n and s[k].isspace():
                        k += 1
                    if k < n and s[k] == "{":
                        end_b = s.find("}", k)
                        if end_b != -1:
                            j = end_b + 1
                    elif k < n and s[k].isdigit():
                        while k < n and s[k].isdigit():
                            k += 1
                        j = k
                i = j
                continue
            tokens.append(Token("ID", word))
            i = j
            continue
        if ch in "+-*/^=:":
            tokens.append(Token("OP", ch))
            i += 1
            continue
        if ch == "%":
            tokens.append(Token("OP", "%"))
            i += 1
            continue
        if ch == "(":
            tokens.append(Token("LPAREN", "("))
            i += 1
            continue
        if ch == ")":
            tokens.append(Token("RPAREN", ")"))
            i += 1
            continue
        if ch == "{":
            tokens.append(Token("LBRACE", "{"))
            i += 1
            continue
        if ch == "}":
            tokens.append(Token("RBRACE", "}"))
            i += 1
            continue
        if ch == ",":
            tokens.append(Token("COMMA", ","))
            i += 1
            continue
        if ch == "₹" or ch in "&;…":
            i += 1
            continue
        i += 1
    tokens.append(Token("EOF", ""))
    return tokens


class _Parser:
    def __init__(self, tokens: List[Token]):
        self.tokens = tokens
        self.pos = 0

    def peek(self) -> Token:
        return self.tokens[self.pos]

    def consume(self, kind: Optional[str] = None, value: Optional[str] = None) -> Token:
        tok = self.peek()
        if kind is not None and tok.kind != kind:
            raise ParseError(f"Expected {kind}, got {tok.kind} ({tok.value!r})")
        if value is not None and tok.value != value:
            raise ParseError(f"Expected {value!r}, got {tok.value!r}")
        self.pos += 1
        return tok

    def parse_expr(self) -> sp.Expr:
        return self.parse_add()

    def parse_add(self) -> sp.Expr:
        left = self.parse_mul()
        while self.peek().kind == "OP" and self.peek().value in ("+", "-"):
            op = self.consume().value
            right = self.parse_mul()
            left = left + right if op == "+" else left - right
        return left

    def _starts_primary(self) -> bool:
        tok = self.peek()
        return tok.kind in ("NUM", "ID", "LPAREN", "LBRACE", "CMD")

    def parse_mul(self) -> sp.Expr:
        left = self.parse_unary()
        while True:
            tok = self.peek()
            if tok.kind == "OP" and tok.value in ("*", "/"):
                op = self.consume().value
                right = self.parse_unary()
                left = left * right if op == "*" else left / right
            elif self._starts_primary():
                # Implicit multiplication: 2\pi r, 3(x+1), (a)(b)
                right = self.parse_unary()
                left = left * right
            else:
                break
        return left

    def parse_unary(self) -> sp.Expr:
        tok = self.peek()
        if tok.kind == "OP" and tok.value in ("+", "-"):
            op = self.consume().value
            val = self.parse_unary()
            return val if op == "+" else -val
        return self.parse_power()

    def parse_power(self) -> sp.Expr:
        base = self.parse_postfix()
        if self.peek().kind == "OP" and self.peek().value == "^":
            self.consume()
            exp = self.parse_unary()
            return base ** exp
        return base

    def parse_postfix(self) -> sp.Expr:
        expr = self.parse_primary()
        while self.peek().kind == "OP" and self.peek().value == "%":
            self.consume()
            expr = expr / sp.Integer(100)
        return expr

    def parse_primary(self) -> sp.Expr:
        tok = self.peek()
        if tok.kind == "NUM":
            self.consume()
            if "." in tok.value:
                return sp.Rational(tok.value)
            return sp.Integer(int(tok.value))
        if tok.kind == "ID":
            self.consume()
            if tok.value == "pi":
                return sp.pi
            # Keep subscripted names (r_1, V_rem) and 2-letter uppercase line segments (PQ, QR, PR) as single symbols
            if "_" in tok.value or len(tok.value) == 1 or (len(tok.value) == 2 and tok.value.isupper()):
                return sp.Symbol(tok.value, real=True)
            # If it's e.g. "rh" or "rR", treat as product of single-letter symbols
            expr = sp.Integer(1)
            for ch in tok.value:
                expr = expr * sp.Symbol(ch, real=True)
            return expr
        if tok.kind == "LPAREN":
            self.consume("LPAREN")
            expr = self.parse_expr()
            self.consume("RPAREN")
            return expr
        if tok.kind == "LBRACE":
            self.consume("LBRACE")
            expr = self.parse_expr()
            self.consume("RBRACE")
            return expr
        if tok.kind == "CMD":
            cmd = self.consume("CMD").value
            if cmd == "frac":
                num = self._parse_arg()
                den = self._parse_arg()
                return num / den
            if cmd == "sqrt":
                arg = self._parse_arg()
                return sp.sqrt(arg)
        raise ParseError(f"Unexpected token {tok.kind} ({tok.value!r}) at pos {self.pos}")

    def _parse_arg(self) -> sp.Expr:
        tok = self.peek()
        if tok.kind == "LBRACE":
            self.consume("LBRACE")
            expr = self.parse_expr()
            self.consume("RBRACE")
            return expr
        if tok.kind == "LPAREN":
            self.consume("LPAREN")
            expr = self.parse_expr()
            self.consume("RPAREN")
            return expr
        return self.parse_primary()


def parse_expression(text: str) -> sp.Expr:
    """Safely parse a single mathematical or LaTeX expression into SymPy."""
    tokens = tokenize(text)
    if len(tokens) <= 1:
        raise ParseError(f"Empty expression: {text!r}")
    p = _Parser(tokens)
    expr = p.parse_expr()
    if p.peek().kind != "EOF":
        raise ParseError(f"Trailing tokens starting at {p.peek()!r} in {text!r}")
    return expr


def split_equation_chain(text: str) -> List[str]:
    """Split an aligned or chained equation into individual equality parts."""
    s = preprocess_math_text(text)
    # Split on LaTeX line breaks \\ or semicolons
    lines = re.split(r"\\\\|;", s)
    parts: List[str] = []
    for line in lines:
        line = line.replace("&", "").strip()
        if not line:
            continue
        parts.append(line)
    return parts


def parse_equality_chain(text: str) -> List[Tuple[str, List[sp.Expr]]]:
    """Parse each line of an equation block into its '='-separated SymPy expressions."""
    chains: List[Tuple[str, List[sp.Expr]]] = []
    for line in split_equation_chain(text):
        segs = [seg.strip() for seg in line.split("=") if seg.strip()]
        if not segs:
            continue
        exprs = [parse_expression(seg) for seg in segs]
        chains.append((line, exprs))
    return chains
