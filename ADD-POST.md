# Add a post or guide

Create `src/content/blog/{en|ko}/{name}.md`. Guides use `src/content/guides/`, policies use `src/content/policies/`.

Required frontmatter: `key` (translation-pair identifier), `slug` (lowercase URL slug), `lang` (`en`/`ko`), `title`, `description`, `date` (`YYYY-MM-DD`). Optional: `product` (product slug), legacy `game`, `updated`, `draft`, `source` (original URL), `art` (`label`, `sprites`, optional `tone`). Use `product` for new posts; `game` remains supported.

Match `key` across translations even when localized slugs differ. Routes are `/{product}/blog/{slug}/` or `/{product}/guides/{slug}/`, with `/ko` first for Korean. Unscoped posts use `/blog/{slug}/`. Policy URLs omit the collection segment. Public articles exclude `draft: true` and filenames beginning with `_`.

Posts use Markdown. Put image files in the product directory and provide alt text for meaningful images. Sprite figures need a descriptive caption. Tables should have column headers and a keyboard-focusable `.table-scroll` wrapper. Link directly to verified stores, never another website’s relative redirect path. Imported posts should retain their `source` and describe meaningful corrections in docs.

Policies retain a non-rendered HTML draft comment in source until approved. Do not claim public/legal completion from a local preview. Run the site checks, open both translations, and verify readable mobile layout before delivery.
