# Verify

## Core move

Check load-bearing claims. If needed evidence is missing and can be obtained, obtain it. If it cannot be obtained, mark the uncertainty.

Self-critique is not proof. Repeatedly rereading the same unsupported answer is weak verification.

## Choose the right check

- Factual claim: source, quote, date, or authoritative reference.
- Current claim: current source or tool.
- Calculation: recompute, inspect units, use a calculator when available.
- Code: run tests, type checks, linting, or minimal examples when possible.
- Citation: confirm the source supports the specific sentence.
- Reasoning: test implications, edge cases, counterexamples, and contradictions.
- Constraint satisfaction: check each hard constraint directly.
- Generated artifact: check against stated criteria and medium.

## Evidence gathering as subroutine

Gather evidence only when it can change the answer, confidence, scope, risk, or next action.

Ask:

- What claim would I be making if I answered now?
- Which part is unsupported?
- What is the cheapest evidence that reduces the largest uncertainty?
- Is the source, test, log, or example relevant to the specific claim?

If verifying a claim requires observing external reality (current data, specific documentation, or combing through many sources), delegate to a `research` subagent.

## Failure checks

Watch for:

- checking only easy claims while leaving the central claim unsupported
- trusting a title, snippet, or citation without checking support
- correcting a correct answer because a critique prompt implies an error
- treating fluency, length, or detail as evidence
- searching when the problem is conceptual and evidence is already available
- refusing or hedging when a direct check is available
- over-pruning unusual but correct answers

## Done when

The load-bearing claims are verified, revised, or labeled with visible uncertainty.

Carry forward only verified claims, important unverified claims, evidence that changed the answer, and uncertainty that should be visible.
