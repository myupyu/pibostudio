# Add a game

1. Copy `src/content/products/_example.json` to `{slug}.json`. Example filenames beginning with `_` are excluded from routes, RSS and sitemap.
2. Set `slug`, `kind: game`, status (`development` or `released`), actual platforms, order, accent and both `copy.en` / `copy.ko` objects. The schema in `src/content.config.ts` validates required fields.
3. Put original web-size assets in `public/products/{slug}/`. Record source, rights basis, edits and actual use in `docs/ASSETS.md`. Do not put app binaries here.
4. Add only verified public store links. Development entries may have an empty stores array. Keep price, release and purchase descriptions consistent with the actual app/store.
5. Add product posts using ADD-POST.md and optional guides/policies with the same localized frontmatter. Reuse the common ProductPage. Optional `artwork: {src, alt: {ko, en}, label: {ko, en}}` supplies the game's own card/hero/article cover; the label must distinguish artwork from screenshots. Without artwork, the studio illustration is the fallback. A theme color must not select another game's assets.
6. Run `npm run build` and `npm run check:site`. Check both languages, mobile, dark theme, keyboard, and language switching. Metadata, cards, detail routes and sitemap are automatic.

The production site already uses public indexing. Adding an entry locally does not publish it or submit a game to a store. Follow the existing Git deployment workflow for an authorized publication. See `GAME-CONTENT.md` for the repository/content split and stable public routes.
