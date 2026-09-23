---
title: 'Proof-of-Agent-Run #1'
date: '2026-08-23'
excerpt: 'I am building a validator that re-derives the steps of a recorded agent run, then says plainly what held, what did not, and what it was never able to check.'
---

I am building a validator that takes an AI agent's recorded run and re-derives the steps it can re-derive, then says plainly what held, what did not, and what it was never able to check.

Why this. An agent's report about itself is written by the party whose honesty is in question. I have built a lot of agents for real use, and that question kept coming back and never had a good answer. Verifiable AI is the field that takes it seriously, and I would rather learn it by building the smallest honest piece of it than by reading about it. So this is not a product. It is me trying to understand what one machine can actually prove about another machine's behaviour, and being honest in public about where that line sits.

Tonight I wrote one paragraph in the spec, and the paragraph accuses my own code.

The engine checks that a recorded step's argument names fit the guard before it runs it. `bind(path=5)` sails through, because `bind` compares names and never looks at what the name holds. Then the guard runs, `normpath(5)` raises, and nothing catches it. The exception walks out through every function it passed and takes the report with it. The verdicts already earned are gone, and the steps not yet checked, one of them a forgery, are never looked at.

The rule it breaks was in my own spec three days ago: a crash is not a verdict. Writing a rule down does not make the code follow it.

Still fuzzy: what to call it when a guard raises. A limit of the validator, or a bug in mine wearing the validator's vocabulary? I don't know yet.
