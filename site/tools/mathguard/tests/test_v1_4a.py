import pytest
from mathguard.reasoning_engine import _verify_unit_conversion_statement as conv, _preprocess_math_line as pre

GOOD = ["400 cm = 4 m", "1 m³ = 1000 litres", "2 km = 2000 m", "5 l = 5000 ml", "1 m² = 10000 cm²"]
BAD = ["400 cm = 5 m", "1 m³ = 100 litres", "2 km = 200 m", "1 m = 100 cm²", "5 l = 500 ml"]


@pytest.mark.parametrize("t", GOOD)
def test_conversion_correct(t):
    assert conv(t) is True


@pytest.mark.parametrize("t", BAD)
def test_conversion_incorrect(t):
    assert conv(t) is False


def test_not_a_conversion():
    assert conv("x = 4") is None


def test_custom_fraction_notation():
    assert "[[" not in pre("5([[6|5]])−6=0")
    assert pre("x=[[6|5]]").replace(" ", "") == "x=((6)/(5))"
