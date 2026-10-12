# Pibo Studio

Official website for Pibo Studio, the umbrella brand for all our apps and games, operated by GATEPOP Inc. Product presentation belongs on Pibo Studio; the GATEPOP corporate website will not host an app catalogue.

- Repository: https://github.com/myupyu/pibostudio
- Production domain: https://pibostudio.com (not deployed by this project yet)
- Local project: `/Users/danpro/Documents/GitHub/pibostudio`
- Framework: Astro 7.3.8, static output, native CSS and TypeScript.
- Required Node: >=22.12.0; preview verified with Node 24.20.0.

## Current milestone: homepage design review

English `/` and Korean `/ko/` homepage previews are implemented. The user explicitly requested design confirmation before the remaining pages are implemented or the site is deployed. The homepage design preview is versioned in Git. Production deployment remains pending design approval and the remaining site implementation.

The homepage includes original SVG worlds and the Pibo mascot, responsive navigation, a pointer/touch particle canvas with a mobile automatic animation, theme persistence, reduced-motion handling, scroll reveals, and a small tilt effect on the empty product card. No product entries or blog posts have been added to this website yet. Legal footer labels are placeholders until their pages are implemented; they are intentionally plain text in this preview. Metadata currently includes `noindex, nofollow` for the preview milestone.

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

1. A shared product Content Collection with kind `game` or `app`, automatic detail routes, image folders, excluded example data, ADD-GAME.md and ADD-APP.md. A combined /projects/ list with category filters, plus /games/ and /apps/ lists.
2. Studio and per-product blog routes, frontmatter schema, ADD-POST.md. Use VideoGame structured data for games and SoftwareApplication for other apps.
3. English/Korean about, contact, support, privacy, terms and mascot 404 pages.
4. Full metadata, social images, JSON-LD, hreflang, sitemap.xml, robots.txt, RSS and llms.txt.
5. Full-route link checks, accessibility/performance validation, final screenshots.
6. Connect Cloudflare Pages Git integration for automatic main-branch deployments, custom domains, www redirect, and production verification.

The only public contact address is support@pibostudio.com. Cloudflare Email Routing has an active forwarding rule for this address. Keep its destination inbox out of public site content. End-to-end delivery has not yet been tested. No newsletter provider has been selected; the CTA opens an email.
