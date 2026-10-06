// Pulls the live parts of the site at build time:
//   episodes  Plain Strata, from the Apple Podcasts catalogue (with a link to each episode)
//   issues    the long-reads, from the Buttondown newsletter feed
//   commits   recent work, from the GitHub API
//
// Every source is independent. If one fails, the last good copy already in
// src/data/live.json is kept, so a build never breaks and a page never goes empty.

import { readFile, writeFile } from 'node:fs/promises';

const OUT = new URL('../src/data/live.json', import.meta.url);
const APPLE_SHOW_ID = '6783455764';
const NEWSLETTER_RSS = 'https://buttondown.com/plainstrata/rss';
const REPOS = ['dassmod/proof-of-agent-run', 'dassmod/smart-repetition-agent'];

async function get(url, headers = {}) {
  const res = await fetch(url, { headers: { 'User-Agent': 'dasmod.xyz build', ...headers }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`${res.status} from ${new URL(url).host}`);
  return res;
}

const isoDay = (d) => new Date(d).toISOString().slice(0, 10);

function decode(s = '') {
  return s
    .replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .trim();
}

function pick(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? decode(m[1]) : '';
}

// The site never shows a long dash, even if one arrives in a feed.
const noLongDash = (s) => s.replace(/\s*[\u2013\u2014]\s*/g, ', ');

// A short, clean excerpt: whole sentences when they fit, a word boundary otherwise.
function excerpt(text, max = 230) {
  const clean = noLongDash(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const sentence = clean.slice(0, max).match(/^.*[.!?](?=\s)/);
  if (sentence && sentence[0].length > 80) return sentence[0];
  return clean.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

async function episodes() {
  const res = await get(`https://itunes.apple.com/lookup?id=${APPLE_SHOW_ID}&entity=podcastEpisode&limit=40`);
  const data = await res.json();
  return data.results
    .filter((r) => r.wrapperType === 'podcastEpisode')
    .map((r) => {
      const full = noLongDash(r.trackName.replace(/^Plain Strata:\s*/i, ''));
      const cut = full.indexOf(', ');
      return {
        title: cut > 0 ? full.slice(0, cut) : full,
        subtitle: cut > 0 ? full.slice(cut + 2) : '',
        date: isoDay(r.releaseDate),
        url: r.trackViewUrl.replace(/&uo=\d+/, '').replace(/\?uo=\d+$/, ''),
        excerpt: excerpt(r.description || r.shortDescription || ''),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

async function issues() {
  const xml = await (await get(NEWSLETTER_RSS)).text();
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map(([, item]) => ({ title: pick(item, 'title'), url: pick(item, 'link'), date: isoDay(pick(item, 'pubDate')) }))
    .filter((x) => x.url)
    .sort((a, b) => b.date.localeCompare(a.date));
}

async function commits() {
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const all = [];
  for (const repo of REPOS) {
    const list = await (await get(`https://api.github.com/repos/${repo}/commits?per_page=8`, headers)).json();
    for (const c of list) {
      all.push({
        repo: repo.split('/')[1],
        message: noLongDash(c.commit.message.split('\n')[0]),
        date: isoDay(c.commit.committer.date),
        url: c.html_url,
      });
    }
  }
  return all.sort((a, b) => b.date.localeCompare(a.date));
}

// Each episode ships with a long-read on the same day. Exact dates are matched first,
// then a one-day neighbour that no other episode has claimed.
function attachLongReads(eps, iss) {
  const used = new Set();
  const dayDiff = (a, b) => Math.abs(Date.parse(a) - Date.parse(b)) / 86400000;
  for (const pass of [0, 1]) {
    for (const ep of eps) {
      if (ep.longread) continue;
      const match = iss.find((i) => !used.has(i.url) && dayDiff(i.date, ep.date) === pass);
      if (match) { ep.longread = match.url; used.add(match.url); }
    }
  }
  return eps;
}

const previous = JSON.parse(await readFile(OUT, 'utf8').catch(() => '{}'));
const out = { fetchedAt: new Date().toISOString(), sources: {} };

for (const [key, fn] of [['episodes', episodes], ['issues', issues], ['commits', commits]]) {
  try {
    const value = await fn();
    if (!value.length) throw new Error('empty response');
    out[key] = value;
    out.sources[key] = 'live';
    console.log(`fetch ${key}: ${value.length} items`);
  } catch (err) {
    out[key] = previous[key] || [];
    out.sources[key] = `kept previous copy (${err.message})`;
    console.warn(`fetch ${key}: failed, kept previous copy (${err.message})`);
  }
}

out.episodes = attachLongReads(out.episodes.map((e) => ({ ...e, longread: undefined })), out.issues);
await writeFile(OUT, JSON.stringify(out, null, 2) + '\n');
