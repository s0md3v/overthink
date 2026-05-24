# overthink

Force the agents to think things through.

No more:
- short sightedness
- "you are absolutely right!"
- being generic when it should be creative
- missing the point and/or details
- failing to assess consequences, tradeoffs, hidden assumptions etc.
- relying on old info when it should search online

This skill addresses this by defining 8 "modes" of thinking and then creating a thinking process by combining the modes that matter for the prompt. The agent then follows that process to be thorough.

## Install

```sh
npx skills add s0md3v/overthink
```

Works with Codex, Claude Code, Cursor, Copilot, OpenCode, and other agents that support skills. Restart your agent harness if it does not pick up newly installed skills automatically.

You can also directly download `overthink.zip` from [releases](https://github.com/s0md3v/overthink/releases/) and extract it in the skills directory of your choice.

## Use

Put `/overthink` before your prompt:

```text
/overthink suggest some concepts for the landing. it needs to stand out but also be usable and professional.
/overthink make the plugin archtecture more secure
/overthink look at the state of the project, read the docs+notes and tell me what should we do next
/overthink how do we make this interface simpler to use without hiding the functionality?
/overthink should we port it to rust?
```

Agents can also trigger `overthink` automatically when a task looks risky or ambiguous. Automatic runs are lighter so normal work does not turn into a seminar. Use `/overthink` when you want the full process.

## Modes

The skill has eight modes: `model`, `create`, `diagnose`, `verify`, `evaluate`, `decide`, `taste`, and `synthesize`.

Use it for debugging, research, reviews, tradeoffs, planning, design, naming, writing, and any prompt where the first obvious answer is probably not good enough. Skip it for simple facts, mechanical edits, and one-step tasks.

## Credits

- Hypatia's Potrait, drawn by Jules Maurice Gaspard
- "How we think" by John Dewey
- "The fixation of belief" by C. S. Peirce
- "How to solve it" by George Polya
- "Strong Inference" by John R. Platt
- "Cargo cult science" speec by Richard Feynman
- "Reflections on the right use of school studies" essay by Simone Weil
- "Critique of judgment" by Immanuel Kant
- "Notes on the synthesis of form" by Christopher Alexander
- Juxtopposed youtube channel
- victors1681/3dbrain for the brain visualization
- works with component adopted from pbakaus/impeccable
