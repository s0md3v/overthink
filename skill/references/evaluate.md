# Evaluate

## Core move

Turn impressions into a weighted, criteria-based judgment.

Break impressions down into distinct criteria, assign importance to each, and measure the subject against them before synthesizing a final judgment.

## 1. Establish criteria

Derive all the dimensions that matter for the given goal, context, and constraints. Do not import a generic rubric. If you cannot establish meaningful criteria because the subject is not well understood, step back and run `model` first.

Ask:
- What is the primary goal?
- Who will use, read, see, maintain, attack, trust, or rely on it?
- What are the hard constraints (e.g., budget, time, physics)?
- What are the soft constraints (e.g., preference, style, ethics)?

Useful criteria families:
- truth and grounding
- goal contribution
- clarity
- usefulness
- feasibility
- originality
- coherence
- compression
- robustness
- reversibility
- maintainability
- accessibility
- emotional, aesthetic, or conceptual force
- cost and risk

## 2. Weight criteria

Not all criteria matter equally. Determine the relative importance of each before evaluating.

- **Critical / Pass-Fail**: Hard constraints or dealbreakers. Failure here means the artifact is unviable.
- **High Weight**: Primary drivers for why the artifact exists.
- **Low / Medium Weight**: Secondary benefits, nice-to-haves, or tie-breakers.

*Rule*: Explicitly state *why* certain criteria matter more than others in the current context.

## 3. Assess the subject

Measure the idea or artifact specifically against the weighted criteria.

- **Score**: Evaluate performance on each individual criterion (qualitatively or quantitatively).
- **Provide Evidence**: Cite specific aspects of the subject to justify the score.
- **Identify Weaknesses**: Name the strongest objection or missing piece.
- **Acknowledge Assumptions**: Note what assumptions, if wrong, would alter the assessment.

## 4. Synthesize judgment

Combine the individual assessments into a holistic, defensible judgment that respects the assigned weights.

- A high score on a low-weight criterion does not make up for a poor score on a critical one.
- If evaluating options, the winner is the one that best satisfies the *heavily weighted* criteria, not necessarily the one that checks the most boxes overall.
- Preserve unconventional elements when they reveal a useful direction or possible mitigation.

## Failure checks

Watch for:
- assigning equal weight to all criteria
- letting a high score on a secondary metric override a critical failure
- criticizing without naming the violated criterion
- treating taste as fact
- using polish as a proxy for quality
- scoring everything when one dominant criterion is all that matters

## Done when

The criteria and their relative weights are explicitly defined, the subject is rigorously assessed against them with evidence, and a clear synthesis or judgment is reached based on those weights.

Carry forward only the core judgment, the most critical strengths or objections, and any uncertainty affecting the judgment.
