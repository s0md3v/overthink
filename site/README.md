# overthink

`overthink` is a metacognition skill for agents. It helps an agent slow down only when a task actually needs it: unclear requirements, debugging, tradeoffs, verification, creative work, taste calls, or sensitive communication.

For simple tasks, the skill should stay out of the way.

## Install
```sh
npx skills add s0md3v/overthink
```

Restart your agent runtime if it does not pick up newly installed skills automatically.

## What it does

`overthink` gives the agent a lightweight routing step before it answers. It is not a domain skill, and it does not impose a response template. It asks a more basic question: what kind of thinking does this task need?

That check helps catch a few common mistakes:

- answering the wrong question because the frame was never examined
- guessing when evidence or tools could settle the point
- accepting the first plausible idea
- flattening uncertainty into a confident-sounding answer
- treating subjective work as if it were only a checklist

The skill includes focused reference modes for:

- `model`: map the problem, constraints, and hidden assumptions
- `create`: generate meaningfully different options
- `diagnose`: compare possible causes and look for distinguishing evidence
- `verify`: check load-bearing claims before relying on them
- `evaluate`: weigh an idea against explicit criteria
- `decide`: choose a path when the tradeoffs are real
- `taste`: judge fit, tone, form, and aesthetic quality
- `synthesize`: pull several lines of reasoning into one coherent answer

## Credits

- Elbert Hubbard for the Hypatia portrait
- [3dbrain](https://github.com/victors1681/3dbrain) for the brain visualization
- "How we think" by John Dewey
- "The fixation of belief" by C. S. Peirce
- "How to solve it" by George Polya
- "Strong Inference" by John R. Platt
- "Cargo cult science" speech by Richard Feynman
- "Reflections on the right use of school studies" essay by Simone Weil
- "Critique of judgment" by Immanuel Kant
- "Notes on the synthesis of form" by Christopher Alexander
- Juxtopposed youtube channel
