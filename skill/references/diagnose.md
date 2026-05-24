# Diagnose

## Core move

Turn symptoms into competing cause hypotheses and identify what evidence would distinguish them.

Use `verify` when claims, logs, tests, sources, or observations must be checked.

## Build the diagnostic frame

Clarify:

- expected behavior
- observed behavior
- difference between them
- first known bad case and last known good case, if available
- recent changes
- scope: who, where, when, how often
- dependencies, environment, inputs, state, timing, and interfaces
- what has already been tried

## Generate hypotheses

Prefer several competing mechanisms over one confident story.

Useful hypothesis families:

- state mismatch
- boundary or off-by-one case
- environment or version mismatch
- timing, race, ordering, or caching issue
- hidden dependency
- invalid assumption about input, user, system, or external service
- measurement or observation error
- interaction between individually harmless parts

## Discriminate

For each plausible cause, ask:

- What would I expect to observe if this were true?
- What would rule it out?
- What evidence separates it from the nearest alternative?
- What is the cheapest check that changes confidence?
- Would the proposed fix remove the cause or only mask the symptom?

When a hypothesis needs external evidence to confirm or rule out, use `verify` rather than reasoning about it internally.

## Failure checks

Watch for:

- explaining the symptom with a renamed symptom
- anchoring on the first plausible cause
- ignoring base rates, recent changes, or environment differences
- treating correlation as cause
- proposing a fix before naming the mechanism
- gathering evidence without knowing what it would distinguish

## Done when

The leading causes, their discriminating evidence, and the likely next check or fix are clear.

Carry forward only top hypotheses, distinguishing evidence needed, and the next check or fix.
