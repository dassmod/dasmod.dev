import live from '../data/live.json';

export const today = new Date().toISOString().slice(0, 10);

export const episodes = live.episodes ?? [];
export const commits = live.commits ?? [];
export const latestEpisode = episodes[0];

const days = (from, to) => Math.round((Date.parse(to) - Date.parse(from)) / 86400000);

// The menu only says "new episode" when that is true this week.
export const hasNewEpisode = latestEpisode ? days(latestEpisode.date, today) <= 7 : false;

export const lastCommit = (repo) => commits.find((c) => c.repo === repo);
