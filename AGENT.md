# Pibo Studio — project rules

## Purpose and owner
- Official studio site at https://pibostudio.com.
- Pibo Studio is the umbrella brand for ALL apps and games, operated by GATEPOP Inc. (게이트팝 주식회사).
- Product presentation belongs on pibostudio.com. The user explicitly decided that the GATEPOP corporate website will not host app-related content; do not modify it.
- Use “Games & apps” / “게임 & 앱” in navigation and present the portfolio together, with game/app categories when real entries are added. GATEPOP is the legal operator, not a separate product brand.
- Only public contact: support@pibostudio.com (centralized as contactEmail in src/lib/site.ts). Keep the routing destination inbox out of public content. Confirm live routing state before claiming it is configured.
- No apps, games, reviews, download counts, release claims, or store links may be invented. The empty state means no products have been added to this website; it does not mean the business has never released an app.

## Current milestone
- Build and present the English/Korean homepage design locally first.
- **Wait for the user's design confirmation before implementing the remaining pages or deploying.**
- GitHub: https://github.com/myupyu/pibostudio (public); branch: main.
- Hosting target: Cloudflare Pages with Git integration and main push deployment.

## Architecture
- Astro, static output, Content Collections, native TypeScript/CSS; no UI framework unless necessary.
- English is the default without a prefix. Korean lives at /ko/. Centralize locale configuration.
- All page routes end in a slash. Assets and feeds retain their file extensions.
- Planned routes: /, /projects/ (all products), /games/ (games), /apps/ (other apps), /blog/, /blog/{slug}/, /{product}/, /{product}/blog/, /{product}/blog/{slug}/, /about/, /contact/, /privacy/, /terms/, /support/; locale prefix first. Preserve the original root-level product URL structure.
- After design approval, products belong in src/content/products/{slug}.json with kind: game | app; assets in public/products/{slug}/. This supersedes the initial game-only content plan.
- Product filenames/slugs starting with _ are examples and must never be published or included in feeds/sitemaps.
- Blog posts belong in src/content/blog/{lang}/{slug}.md. Scope via optional product field; retain support for the originally requested game field when implementing game posts.
- A product data file and image directory must generate every relevant card, detail page, blog list, sitemap entry and structured data automatically.
- Use VideoGame structured data for games and SoftwareApplication for other apps.
- Game and app executables are outside this site. Only verified App Store, Google Play, and web URLs appear.

## Design and quality
- Original Pibo mascot in SVG/CSS; warm modern design, generous spacing, light/dark themes.
- Hero canvas respects reduced motion, viewport visibility, pointer/touch, and device pixel ratio.
- Mobile first; no horizontal overflow. Keyboard-accessible navigation and controls.
- Unique metadata, canonical/hreflang, social images, structured data, feeds, sitemap and llms.txt.
- Legal source files carry a non-rendered draft comment.
- Validate build, links, desktop/mobile screenshots, dark mode and reduced motion.

## Expansion
- ADD-GAME.md, ADD-APP.md and ADD-POST.md will document the final schema and procedure after design approval.
- Keep tokens, passwords, .env files, local credentials, caches and build output out of commits.
- Never modify other projects. Do not deploy the homepage preview as a completed site.

## Authorized product integration · 2026-10-15
- The user explicitly asked to put Midnight Bunsik’s website/blog inside PIBO and add StockPets in the same format. This authorized the shared product/blog/guide/support implementation despite the earlier homepage-only milestone.
- Both entries and localized content now live in Content Collections. Preserve original game repositories and StockPets standalone site.
- Preview noindex/robots guards remain. Deployment, push, DNS changes and public publication still require separate user direction/design approval. Do not treat this implementation request as standing permission to publish.
- See README and docs/PRODUCT-INTEGRATION-2026-10-15.md for current status.

## Authorized publication · 2026-10-15
- The owner explicitly approved public deployment of the prepared Pibo homepage and policies, and connection of the existing pibostudio.com domain. This supersedes the prior publication hold for these pages.
- Use the existing Cloudflare account and free static Pages hosting. Preserve other projects and mail DNS records. No domain purchase, paid plan, account security change or app store submission is authorized by this approval.

- The owner also explicitly approved committing/pushing the prepared site sources and documentation to myupyu/pibostudio main for automatic deployment, and adding www.pibostudio.com to the same site.

- The owner explicitly approved detaching only the old pibostudio.com Pages binding and immediately attaching it to the validated Git project pibostudio-web. This was completed; both apex and www are Active with SSL. Preserve the old project and all mail DNS.
