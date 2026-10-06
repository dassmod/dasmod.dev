import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dasmod.xyz',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
