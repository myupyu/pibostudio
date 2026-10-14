# Pibo Studio

Website for Pibo Studio, the games and apps brand operated by GATEPOP Inc. English `/`, Korean `/ko/`. Astro 7.3.8, static HTML, native TypeScript/CSS. Node >=22.12; checked with Node 24.20.0. Site check uses Python 3 standard library.

## Product and blog integration · 2026-10-15

The user requested Midnight Bunsik’s site/blog and a matching StockPets section inside this repository. Both now use shared product, journal, guide and support layouts. The original homepage design/mascot remains. This request authorizes these product pages; public deployment and broader site work remain separate.

| Product | English | Korean |
|---|---|---|
| Midnight Bunsik | `/midnightbunsik/` | `/ko/midnightbunsik/` |
| StockPets | `/stockpets/` | `/ko/stockpets/` |

Append `blog/`, `guides/`, or `support/` for each section. The homepage shows both games and recent stories. `/projects/`, `/games/`, `/apps/` and `/blog/` collect real entries automatically. No non-game app is invented for the empty apps category.

Midnight Bunsik has three Korean/English introductory articles, two play/save guides and product privacy/support pages. Its status is **iPhone release in preparation**: no public download link or unannounced release/price claim. It uses original game pixel art and actual Release simulator screenshots.

StockPets’ five existing Korean/English posts and ten guides per language have been brought into PIBO’s format, retaining original-source links. Its existing standalone website is preserved and linked. The verified App Store and Google Play listings are linked directly. Copied obsolete copy was corrected for the current iPhone version: 17 languages, bottom banner ads, optional one-time permanent ad removal. The original StockPets repositories were not changed.

## Run and check

```sh
npm ci
npm run dev
npm run build
npm run check:site
npm run preview -- --host 127.0.0.1 --port 4325
```

Astro 7 preview runs in the background; `npx astro preview stop` stops it. See `docs/PRODUCT-INTEGRATION-2026-10-15.md` for actual verification and remaining publication conditions.

## Content and source map

- `src/content.config.ts`: product/blog/guide/policy schemas and excluded `_` examples.
- `src/content/products/`: product data with both languages, verified store links, gallery and FAQ.
- `src/content/blog/`, `guides/`, `policies/`: localized Markdown. Translation pairs use `key`, even when slugs differ.
- `src/lib/content.ts`: automatic routes, matching language switches, metadata.
- `src/components/ProductPage.astro`, `CollectionPage.astro`, `ArticlePage.astro`: shared screens.
- `src/components/ProductArt.astro`: food/pet illustration selectors and generic Pibo fallback.
- `src/styles/products.css`: responsive light/dark product and article styling.
- `public/products/{slug}/`: original artwork and real screenshots; no game executables.
- `src/pages/rss.xml.ts`, `ko/rss.xml.ts`, `sitemap.xml.ts`, `robots.txt.ts`, `llms.txt.ts`: generated discovery files.
- `ADD-GAME.md`, `ADD-APP.md`, `ADD-POST.md`: expansion workflow.
- `docs/ASSETS.md`, `asset-provenance.json`: source and reuse record.
- `docs/README-before-product-integration.md`: previous milestone preserved.

## Publication remains pending

The build retains `noindex, nofollow` and robots `Disallow: /` for local review. Source legal pages carry non-rendered draft comments. No Git push, Cloudflare deployment, DNS change or public publication was performed. The domain did not resolve during this task’s browser check. To publish: approve the screens and policy text, authorize deployment, connect/verify hosting and DNS, then change indexing guards and verify live links. About/contact standalone pages and a dedicated 404 can be added in a separately authorized broader site pass; homepage studio/contact sections already work.

Public contact is centralized as `support@pibostudio.com`. Mail delivery has not been newly tested; a mailto link is not proof of receiving messages. No account, newsletter, payment or analytics service was added to this website.

## Public deployment authorized · 2026-10-15

The owner approved publication of the prepared homepage, both product sections and policies, and connection of the existing pibostudio.com domain. This supersedes the earlier publication hold above. Public builds use index/follow and an open robots policy. Midnight Bunsik is free with optional banner removal (Korean base price ₩4,900); its app download remains in preparation. See docs/PUBLICATION-2026-10-15.md for deployment evidence and current external conditions.

## Live Git deployment verified · 2026-10-15

The prepared homepage, product sections, journals and policies are now public at https://pibostudio.com/ and https://www.pibostudio.com/. Both domains are Active with SSL on the Git-connected Cloudflare Pages project `pibostudio-web` (myupyu/pibostudio, main). The earlier direct-upload project and all mail DNS records are preserved. This supersedes the historical pending-publication section. Support mailbox delivery and Midnight Bunsik app release remain unverified. See docs/PUBLICATION-2026-10-15.md.
