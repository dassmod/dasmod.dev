---
title: 'Proof-of-Agent-Run #2'
date: '2026-08-28'
excerpt: 'Today I moved one line out of a try block, and it turned into a rule. A limit gets a status, a defect gets a traceback.'
---

Today I moved one line out of a try block, and it turned into a rule.

The engine catches a failed argument check and reports `signature_mismatch`: the trace's keys did not fit the function. Two different failures were landing in that catch. One is the recording being wrong. The other is my own lookup table holding something that is not a function. Same word for both, so when my table broke, the engine blamed a stranger for my mistake.

The rule: a limit gets a status, a defect gets a traceback. The test is one question. Would this still happen if the engine were written perfectly? Yes means the report owes the reader a word for it. No means it is mine and it should crash.

Then `run-0005`, a recorded step whose path is the number 5 instead of a string. I moved it to second position in the list of five, and three healthy runs printed nothing at all. One step I cannot check erases the verdicts for every step I could have.

Next is containing that crash without letting it lie about who caused it. Still fuzzy: the agent wrote the 5, and by my own test that argues limit, not bug.
