"""Read explicitly authored answer fields in the same localized shapes as the reader."""

from __future__ import annotations

from typing import Any


def _text(value: Any) -> str:
    return str(value).strip() if type(value) in {str, int, float} else ""


def _structured_text(value: Any, field: str) -> str:
    if isinstance(value, dict):
        return _text(value.get(field))
    if isinstance(value, list):
        return " ".join(part for segment in value if (part := _structured_text(segment, field)))
    return _text(value) if field == "fallback" else ""


def localized_answer_forms(item: dict[str, Any], language: str) -> dict[str, str]:
    """Return the localized plain answer and any explicitly localized display forms."""
    answer = item.get("answer")
    if isinstance(answer, dict):
        plain = _text(answer.get(language))
    else:
        plain = _text(answer) if language == "en" else ""
    if language == "ta":
        plain = _text(item.get("answerTa")) or plain

    display = item.get("answerMath")
    if isinstance(display, dict) and ("en" in display or "ta" in display):
        display = display.get(language)
    elif language == "ta":
        # A shared display or English fallback is not evidence of a localized answer.
        display = None

    forms = {
        "plain": plain,
        "fallback": _structured_text(display, "fallback"),
        "latex": _structured_text(display, "latex"),
    }
    return {name: value for name, value in forms.items() if value}
