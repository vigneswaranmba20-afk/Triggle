# TRACE Dual Intelligence — low-cost pilot (17 November 2026)

## Scope and deployment

This pilot adds optional server-side adapters for OpenAI and Gemini independent mathematical reviews, and extends the existing TRACE broker with an optional calendar-month reserved-cost cap.

**Safe default: all examples and CI tests are offline.** No API keys, paid usage, subscription login, Google quota changes, Cloudflare upload, or live website modification are needed for this pilot. No student-facing AI endpoint is exposed. Provider output cannot mark textbook exercises source-verified, mathematically certified, or publish-ready.

Files:
- site/tools/bulk/trace_dual_ai.cjs — dual-model adapters and orchestration
- site/tools/bulk/trace_dual_cli.cjs — local command-line entry point
- site/tools/bulk/test_trace_dual_ai.cjs — offline contract tests
- site/tools/bulk/trace_broker.cjs — existing budget broker with month cap

## Design

1. **Source first.** Never submit textbook content unless it has an independently verified source record for the actual textbook edition and page images. The caller flag sourceVerified=true is not proof of source verification. This pilot does not fetch or certify books. Keep private student data out of model requests.
2. **Local-first.** Easy and medium items are skipped. Only explicitly flagged difficult items can go to the dual-model review.
3. **Independent candidates.** OpenAI Responses API uses gpt-6-luna and Gemini generateContent uses gemini-3.8-flash. Both return strict JSON with issues and a review verdict. Disagreement or provider failure requires review; agreement alone never certifies content.
4. **Spending control.** Each provider attempt reserves $0.025. The pilot reserves at most $0.05 per run, $0.25 per UTC day and $5 per UTC month. These are **internal worst-case reservations** rather than provider billing limits or guarantees. Input size and output tokens are bounded. No provider retry occurs automatically.
5. **Rate limits.** HTTP 429 leaves the review incomplete instead of launching repeated requests. Do not rotate keys to evade provider limits.
6. **Never auto-release.** Every output has releaseApproved=false. Existing lessons, website and media publishing workflows are untouched.

## Android Termux demo — no paid calls

From an existing repository clone in Termux:

~~~sh
cd ~/Triggle
git fetch origin
git switch feature/trace-dual-intelligence-pilot-20261117
node site/tools/bulk/test_trace_dual_ai.cjs
node site/tools/bulk/trace_dual_cli.cjs --demo
~~~

The demo uses a synthetic 1+2+4+8 fixture, not a textbook question. Expected result: SYNTHETIC_REVIEW_ONLY and $0 reserved. Node.js 22 is suitable.

## Optional live pilot — requires explicit owner setup

1. Check API credits benefit under ChatGPT Settings → Billing. Eligible Pro subscriptions may provide API credits, but the subscription itself does not grant unlimited API usage; API billing remains separate.
2. Check project-level API quotas in Google AI Studio, independent from the consumer Google AI Pro subscription.
3. Set provider-side spending controls independently. TRACE's ledger is not a substitute for platform billing caps.
4. Create a small PRIVATE input JSON file with id, sourceRef, sourceVerified, difficulty, problem and solution. Verify the official EN/TA textbook images before marking sourceVerified=true. Never include student names or personal data.
5. Set OPENAI_API_KEY and GEMINI_API_KEY securely in environment variables (never in chats, commits, public Pages or screenshots).
6. Use a persistent private accounting directory across attempts. Ephemeral GitHub runners need a durable external ledger before any paid schedule.

The following is deliberately opt-in, not automatically executed:

~~~sh
export TRACE_DUAL_AI_SPEND_APPROVED=YES
mkdir -p "$HOME/.local/share/trace-dual"
chmod 700 "$HOME/.local/share/trace-dual"
node site/tools/bulk/trace_dual_cli.cjs \
  --live --authorize-spend \
  --input "$HOME/trace-reviewed-item.json" \
  --state-dir "$HOME/.local/share/trace-dual"
~~~

The live API contract is tested with mocked HTTP responses only. Verify model availability and billing rules before sending real work.

## Rollout sequence

- **A. Foundation** (this branch): schema, dual adapters, monthly reservation cap, mock tests, zero-spend demo.
- **B. Pilot**: independently review ten real, already source-verified difficult items, quantify disagreements, true billing cost and time saved. Requires explicit API authorization and provider quotas.
- **C. Video Factory**: keep Fola narration in its separate review branch. Bring its persistent per-attempt audio cache and quota-aware dispatch through its own quality-gated PR. No automatic media publishing.

## Validation

~~~sh
node site/tools/bulk/test_trace_broker.cjs
node site/tools/bulk/test_trace_dual_ai.cjs
node site/tools/bulk/trace_dual_cli.cjs --demo
npm run test:trace
npm test
~~~

Passing offline tests does not mean real Gemini quotas, API credit eligibility, Fola narration completion or actual production cost is verified.
