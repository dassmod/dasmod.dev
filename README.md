# dasmod.dev

The personal site of Dastan Modubash. Astro, static, light and dark modes.

## Run it

```bash
npm install
npm run dev
```

## What updates by itself

`npm run build` runs `scripts/fetch-live.mjs` first. The script writes `src/data/live.json`:

- **Plain Strata episodes** come from the Apple Podcasts catalogue, with a link to each episode.
- **Long-reads** come from the Buttondown feed. Each one attaches to the episode from the same day.
- **Latest commits** come from the GitHub API for the two public repositories.

If a source fails, the script keeps the last good copy. The build does not break.

GitHub Actions rebuilds the site every 6 hours, on every push to `main`, and on demand.

## What you edit by hand

- **Page copy** is in `src/data/site.js`.
- **A new post** is one markdown file in `src/content/posts/`, with `title`, `date` and `excerpt` at the top.
- **A portrait** is `public/portrait.jpg`. It appears on About when the file exists.
