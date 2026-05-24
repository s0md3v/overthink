---
name: overthink
description: "Use when the response requires complex reasoning, creativity, nuance, evaluation, decision-making, subjectivity, or communication-sensitive work. If the task is simple and the user has not manually invoked this skill, do not use it."
---

Follow this structured process to think through complex tasks.

## Orient yourself

Identify the key elements of the task:

- Goal: what the user is trying to accomplish.
- Failure: what would likely go wrong if answering without thinking it through.
- Constraints: hard requirements, soft preferences, unknowns.
- Evidence: whether facts, files, tools, examples, tests, or measurements can change the answer.
- Output: what the final answer needs to be: artifact, diagnosis, recommendation, explanation, critique, plan, or direct answer.

If a missing detail would materially change the goal, hard constraints, domain, acceptable risk, or output, answer with reasonable assumptions and flag what you assumed.

Do not confuse satisfying the user's expected framing with serving the user's goal.

## Build a thinking process
Pick and chain the thinking modes below for the task.

Do not read the files upfront, just decide the modes you will require and in what order:

- `references/model.md`: expose hidden assumptions and map out system boundaries before trying to solve the problem.
- `references/create.md`: expand the option space by generating structurally different branches and lateral approaches, not just surface variants.
- `references/diagnose.md`: turn symptoms into competing hypotheses to find the root cause of a failure using distinguishing evidence.
- `references/verify.md`: check load-bearing claims against external evidence to prevent hallucination or trusting unsupported answers.
- `references/evaluate.md`: systematically weigh criteria to rigorously assess an idea, artifact, or set of options.
- `references/decide.md`: cut through ambiguity to commit to a single recommendation, choice, or next step under constraints.
- `references/taste.md`: transform vague aesthetic opinions into disciplined taste judgments about form, feeling, medium, and constraint-fit.
- `references/synthesize.md`: combine perspectives from multiple modes to reconcile tensions, find new insights, and form a coherent final answer.

### Some examples
- **Fixing a tricky bug:** `diagnose` -> `verify`
- **Designing a new feature:** `model` -> `create` -> `evaluate` -> `taste` -> `synthesize`
- **Reviewing complex code:** `model` -> `evaluate` -> `verify`
- **Solving an open-ended problem:** `model` -> `create` -> `evaluate` -> `decide`
- **Critiquing an idea or artifact:** `model` -> `evaluate`
- **Making a tough call under uncertainty:** `model` -> `evaluate` -> `decide`

## Use a todo ledger

Create a private todo list containing just the names of the selected modes.

Example:
```
[ ] model
[ ] decide
[ ] verify
```

Read the first mode's reference file. Based on the reference, update the todo list to add sub-items for each question you need to answer, each step you need to perform, or information to gather.

Example:
```
[ ] model
[ ] model: What is being treated as fixed, impossible, or irrelevant?
[ ] model: Replace a proxy metric with the underlying goal.
[ ] decide
[ ] verify
```

Mark a mode as done only when all its sub-items are complete or you could not complete them reliably. Then move to the next mode.

When moving to the next mode, use the former's insights, open questions, and remaining uncertainties to decide your approach.

If a mode's reference directs you to another mode you have already completed, use the insights from that prior run rather than re-running it, unless the situation has materially changed (e.g., a creative operator redefined the problem).

### Subagents

If subagents are available, use them when:
- The task requires external observation (current events, human sentiment, specific documentation, or extensive reading). This delegates information-gathering and protects your context for reasoning.
- There are materially distinct angles that can be explored independently.

If explicit user permission is required to spawn subagents, pause and ask: "Do you want me to use subagents to explore separate directions in parallel before I decide?"

Whenever appropriate, continue the local critical-path work while subagents run.

## Output

- Surface evidence, criteria, assumptions, and uncertainty that affect the user's action or understanding. Omit everything else.
- Put caveats near the claims they limit.
- Preserve nuance where flattening would mislead.
- Do not make the final answer look more certain than the evidence permits. A polished explanation can make weak support feel stronger than it is.
- When constraints conflict, surface the conflict or choose according to hierarchy and task goal. Do not silently pretend all constraints can be satisfied.
- Ignore generic praise, motivational filler, or inflated significance.

## IMPORTANT

Do:
- Follow the todo process faithfully, even if it seems slow or verbose.
- Self-evaluation is a filter, not proof. Prefer external signals when available: tests, logs, calculations, code execution, sources, quotes, examples, measurements, observed behavior, constraints from the prompt, or user-provided evidence.

Don't:
- Do NOT read multiple mode files at once.
- Do NOT optimize for delivering a final answer faster.
- Do NOT ignore the explicit instructions in this skill file unless user or system instructions say otherwise.
