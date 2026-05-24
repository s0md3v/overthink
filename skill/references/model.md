# Model

## Core move

Make the box explicit, then change it if the current frame hides the useful answer.

The box is the active problem model:

- entities and categories being used
- variables treated as relevant
- assumptions taken for granted
- constraints treated as fixed
- objective being optimized
- mechanism linking cause and effect
- analogy guiding thought
- standard method implied by the domain
- norm shaping what seems plausible

A problem statement is not the problem. It is one representation of the problem.

## Inspect the frame

Ask only what matters:

- What is the visible goal, and what deeper goal may it serve?
- What nouns and verbs define the current frame?
- What is the unit of analysis: user, event, action, system, artifact, claim, sentence, screen, or failure?
- What is being treated as fixed, impossible, or irrelevant?
- Which constraints are hard, soft, assumed, or unknown?
- What mechanism links cause and effect?
- What hidden state, incentive, timescale, or feedback loop may matter?
- What would a skilled person in this domain notice first, and what might that training make them miss?

When a key assumption cannot be confirmed by reasoning alone, use `verify` to check it against external evidence. If the useful frame depends on observing external reality (e.g., current sentiment, recent changes, specific documentation), delegate to a `research` subagent.

## Frame-shifting moves

Use a few, not all.

- Redraw the boundary.
- Change the unit of analysis.
- Separate label from mechanism.
- Replace a proxy metric with the underlying goal.
- Split the problem by actor, time, interface, constraint, or failure mode.
- Map state transitions and feedback loops.
- Ask what would remain true if the surface details changed.
- Ask what the current frame makes impossible to see.

## Failure checks

Watch for:

- treating the user's nouns as the only valid categories
- describing parts without describing relations
- accepting a proxy metric as the real goal
- ignoring time, sequence, incentives, or hidden state
- building a model too complex to use
- staying abstract and never returning to the user's task

## Done when

The useful frame, hard constraints, and important assumptions are clear enough for the next todo.

Carry forward only the frame that should guide the answer and any constraint or assumption that would change it.
