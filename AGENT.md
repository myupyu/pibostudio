# Pibo Studio — project rules

## Purpose and owner
- Official studio site at https://pibostudio.com.
- Pibo Studio is the game brand of GATEPOP Inc. (게이트팝 주식회사).
- Only public contact: support@pibostudio.com (centralized as contactEmail in src/lib/site.ts). Keep the routing destination inbox out of public content. Confirm live routing state before claiming it is configured.
- No games, reviews, download counts, or store links may be invented.

## Current milestone
- Build and present the English/Korean homepage design locally first.
- **Wait for the user's design confirmation before implementing the remaining pages or deploying.**
- GitHub: https://github.com/myupyu/pibostudio (public); branch: main.
- Hosting target: Cloudflare Pages with Git integration and main push deployment.

## Architecture
- Astro, static output, Content Collections, native TypeScript/CSS; no UI framework unless necessary.
- English is the default without a prefix. Korean lives at /ko/. Centralize locale configuration.
- All page routes end in a slash. Assets and feeds retain their file extensions.
- Planned routes: /, /games/, /blog/, /blog/{slug}/, /{game}/, /{game}/blog/, /{game}/blog/{slug}/, /about/, /contact/, /privacy/, /terms/, /support/; locale prefix first.
- Games belong in src/content/games/{slug}.json; assets in public/games/{slug}/.
- Games starting with _ are examples and must never be published or included in feeds/sitemaps.
- Blog posts belong in src/content/blog/{lang}/{slug}.md. Scope via optional game field.
- A game data file and image directory must generate every game surface automatically.
- Game executables are outside this site. Only verified App Store, Google Play, and web-play URLs appear.

## Design and quality
- Original Pibo mascot in SVG/CSS; warm modern design, generous spacing, light/dark themes.
- Hero canvas respects reduced motion, viewport visibility, pointer/touch, and device pixel ratio.
- Mobile first; no horizontal overflow. Keyboard-accessible navigation and controls.
- Unique metadata, canonical/hreflang, social images, structured data, feeds, sitemap and llms.txt.
- Legal source files carry a non-rendered draft comment.
- Validate build, links, desktop/mobile screenshots, dark mode and reduced motion.

## Expansion
- ADD-GAME.md and ADD-POST.md will document the final schema and procedure after design approval.
- Keep tokens, passwords, .env files, local credentials, caches and build output out of commits.
- Never modify other projects. Do not deploy the homepage preview as a completed site.
