// Everything on the site that is written by hand lives here.
// Anything that changes by itself (episodes, long-reads, commits) comes from live.json.

// Posts are written and kept in src/content/posts, but hidden from Writing for now.
export const SHOW_POSTS = false;

// Where I am now. The home clock reads this zone.
export const PLACE = { city: 'Tbilisi, Georgia', zone: 'Asia/Tbilisi' };

export const LINKS = {
  email: 'mailto:dasmodubash@gmail.com',
  github: 'https://github.com/dassmod',
  linkedin: 'https://www.linkedin.com/in/dastan-modubash',
  x: 'https://x.com/dassmod',
  apple: 'https://podcasts.apple.com/us/podcast/plain-strata/id6783455764',
  newsletter: 'https://buttondown.com/plainstrata',
};

export const DESCRIPTION =
  'Dastan Modubash, solution engineer. I ship AI agents in production and build the tools that make their runs verifiable.';

const external = (href, text) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;

export const STORY = [
  {
    title: 'The studio',
    when: '2018 to 2022',
    html: 'At Tentek, the animation studio I ran for four years, I went digging into web3 to find out what it actually was. What got me was not the tokens. It was verifiable, trustless, communal ownership.',
  },
  {
    title: 'The foundation in my own hands',
    when: '2022 to 2023',
    html: 'So I taught myself Solidity. I wrote small contracts until the thing stopped being abstract, and then I stopped. I wanted to think ideas through and explain them.',
  },
  {
    title: 'The second jolt',
    when: '2024',
    html: 'AI hit the same nerve. Another democratization, this time of the act of building itself. I pointed it at my own life first, then at work, and that turned into Newo.ai.',
  },
  {
    title: 'The thing I could not name',
    when: '2026 to now',
    html: `A hunch that something sat at the intersection of the two. I asked for a course on it, and that course became ${external(LINKS.apple, 'Plain Strata')}, the show I now publish twice a week.`,
  },
];

export const EXPERTISE = [
  ['AI voice agents in production', 'I design, ship and debug voice and chat agents from zero. Intent systems, scenario logic, telephony, multi-language routing.'],
  ['Production integrations', 'Python integrations with booking systems, CRMs and webhooks. The payload and encoding bugs that only appear in production.'],
  ['Incident command', 'Detection, code, deploy, testing, stakeholders and resolution, end to end, including silent failures from an upstream API change.'],
  ['AI tooling for teams', 'An AI-assisted investigation and fix workflow for my team, with one human approval gate, sandboxed test loops and enforced data-safety rules.'],
  ['Contracts and the oracle pattern', 'Solidity and Foundry on testnet. EIP-712 attestations that settle proofs on Sepolia: compute off chain, verify on chain.'],
  ['Explaining hard things', 'A show twice a week that takes one concept down to the ground and builds it back up, for people who are allergic to hype.'],
];

export const BACKGROUND = [
  { title: 'Middle East Technical University', when: '2018', text: "Bachelor of Arts in City and Regional Planning, Faculty of Architecture, Ankara." },
  { title: 'University of Manchester', when: '2014 to 2015', text: 'Erasmus exchange programme.' },
  { title: 'Languages', when: '', text: 'Kyrgyz is my native language. Russian and English at C2, and English is the language I work in. Turkish at C1.' },
  { title: 'Based in', when: 'UTC+4', text: 'Tbilisi, Georgia, at the moment. Remote, and used to working across time zones.' },
];

export const WORK = [
  {
    company: 'Newo.ai',
    href: 'https://newo.ai',
    dates: 'Dec 2025 - current',
    roles: ['Solution Engineer'],
    live: true,
    text: [
      'I build and run AI voice agents on an AI voice agent platform, and the booking integrations behind them. I owned the dental vertical for seven months, write code on the core platform, and run incidents end to end.',
      'I built an AI-assisted investigation and fix workflow for my team, and was acting team lead for a stretch.',
    ],
  },
  {
    company: 'Irbis HVAC',
    dates: 'May 2025 - Dec 2025',
    roles: ['AI Integration and', 'Automation Specialist'],
    text: [
      'I built one communications pipeline across eleven lead sources: intake, routing, AI attribution, automated follow-up and an after-hours voice line.',
      'I led the AI rollout across the business and migrated the website with a zero-downtime cutover.',
    ],
  },
  {
    company: 'Independent',
    dates: 'Nov 2024 - current',
    roles: ['AI Automation Consulting'],
    text: [
      'Business process automation for small and mid-sized companies. A multilingual medical booking agent on Telegram, and AI workflows in n8n and Make.',
    ],
  },
  {
    company: 'Tentek Animation Studio',
    dates: 'Sept 2018 - Dec 2022',
    roles: ['Co-founder and', 'General Director'],
    text: [
      'I founded and ran an animation studio for four years, weighted toward sales. A team of fifteen to twenty across more than forty productions.',
      'We raised funding for an original feature and produced a history course now used in schools nationwide.',
    ],
  },
];

export const PROJECTS = [
  {
    title: 'auditable-front-desk',
    repo: 'auditable-front-desk',
    href: 'https://github.com/dassmod/auditable-front-desk',
    status: 'public',
    live: true,
    text: 'A receptionist agent for a fictional clinic, where every booking leaves a record a stranger can re-check. The model proposes, plain-code guards decide, and every decision is replayed afterwards. It runs as a text agent; a voice, a phone line and a backend on Bittensor subnets are the next phases.',
  },
  {
    title: 'proof-of-agent-run',
    repo: 'proof-of-agent-run',
    href: 'https://github.com/dassmod/proof-of-agent-run',
    status: 'public',
    text: 'The replay engine under auditable-front-desk. It re-derives the steps a machine can re-derive and reports match, divergence, or could not check. The third outcome is the point: a validator that cannot tell a lie from a blind spot is not a validator.',
  },
  {
    title: 'smart-repetition-agent',
    repo: 'smart-repetition-agent',
    href: 'https://github.com/dassmod/smart-repetition-agent',
    status: 'public',
    text: 'A tutor that reads my notes, asks real questions, adapts at runtime, and settles a signed proof of what I studied on Ethereum Sepolia. Compute off chain, verify on chain.',
  },
  {
    title: 'Agent companions',
    status: 'private, daily',
    text: 'Seven agent systems that run my days, each shaped around me rather than an average user. Built on the Claude Agent SDK, with scheduled tasks and sub-agents.',
  },
];

export const LEARNING = [
  ['How a chain agrees', 'Consensus, gossip and the mempool, from the ground up. What is public before anything is ordered.'],
  ['What the machine remembers', 'State, the trie, and the root that makes agreement between thousands of machines cheap.'],
  ['Proving an inference', "Four ways to check a stranger's AI work: cryptographic proofs, trusted hardware, reproducible execution, staked validators."],
  ['Agents with an identity', 'ERC-8004 registries, and the empty slot under agent validation that my replay engine is built for.'],
  ['Why frontier training stays in one room', 'Distributed training, and the communication wall between machines that keeps it expensive.'],
  ['What one run can prove', "The trace format for proof-of-agent-run: what a machine can honestly re-derive about another machine's run."],
];

export const STACK = [
  ['Python', 'https://www.python.org', 'My default for everything that has to run in production: integrations, agents, automation and the build scripts around them.'],
  ['Claude API and Agent SDK', 'https://docs.claude.com', 'Skills, scheduled tasks and sub-agent orchestration. The layer most of my agent systems stand on.'],
  ['LangGraph', 'https://langchain-ai.github.io/langgraph/', 'For agents that have to pause for hours between turns and pick up exactly where they stopped.'],
  ['Solidity and Foundry', 'https://getfoundry.sh', 'Contracts and their tests, on testnet. Where the oracle pattern gets written down as code.'],
  ['Twilio and WebRTC', 'https://www.twilio.com', 'The telephony underneath voice agents: numbers, routing, voicemail detection and the quirks of real calls.'],
  ['web3.py', 'https://web3py.readthedocs.io', 'How my Python agents reach the chain: signing attestations, submitting them, and reading the result back.'],
];
