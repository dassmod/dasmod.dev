import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dasmod.dev',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
