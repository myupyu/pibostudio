# Pibo Studio

Official website project for Pibo Studio, the game brand of GATEPOP Inc.

- Repository: https://github.com/myupyu/pibostudio
- Production domain: https://pibostudio.com (not deployed by this project yet)
- Local project: `/Users/danpro/Documents/GitHub/pibostudio`
- Framework: Astro 7.3.8, static output, native CSS and TypeScript.
- Required Node: >=22.12.0; preview verified with Node 24.20.0.

## Current milestone: homepage design review

English `/` and Korean `/ko/` homepage previews are implemented. The user explicitly requested design confirmation before the remaining pages are implemented or the site is deployed. The public repository has been created; this milestone is saved locally and has not been pushed or deployed.

The homepage includes original SVG worlds and the Pibo mascot, responsive navigation, a pointer/touch particle canvas with a mobile automatic animation, theme persistence, reduced-motion handling, scroll reveals, and a small tilt effect on the empty game card. There are no published games or posts. Legal footer labels are placeholders until their pages are implemented; they are intentionally plain text in this preview. Metadata currently includes `noindex, nofollow` for the preview milestone.

```sh
npm ci
npm run dev
npm run build
npm run preview -- --host 127.0.0.1 --port 4321
```

## Source map

- `src/components/Home.astro`: homepage sections.
- `src/components/Worlds.astro`: original hero illustration.
- `src/components/Pibo.astro`: reusable original mascot.
- `src/layouts/Layout.astro`: header, footer, document metadata.
- `src/lib/site.ts`: locale configuration and English/Korean copy.
- `src/styles/global.css`: responsive layout, themes, reduced motion.
- `src/scripts/effects.ts`: particle canvas, menu, theme and subtle interactions.
- `AGENT.md`: project rules, approved scope, future routing and content conventions.

## Remaining work after design approval

1. Content Collections and automatic game routes, image folders, excluded example data, ADD-GAME.md.
2. Studio and game blog routes, frontmatter schema, ADD-POST.md.
3. English/Korean about, contact, support, privacy, terms and mascot 404 pages.
4. Full metadata, social images, JSON-LD, hreflang, sitemap.xml, robots.txt, RSS and llms.txt.
5. Full-route link checks, accessibility/performance validation, final screenshots.
6. Push main and connect Cloudflare Pages Git integration, custom domains, www redirect, production verification.

Email Routing for hello@pibostudio.com is configured separately by the owner. No newsletter provider has been selected; the CTA opens an email.
