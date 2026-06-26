import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://jstudioia.com',
  build: {
    assets: '_assets',
  },
});
