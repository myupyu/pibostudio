import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://pibostudio.com',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
