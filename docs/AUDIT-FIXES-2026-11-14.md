# Audit fixes · 2026-11-14

Reviewed from commits `4ea9ac8` and `9032b36`. The owner authorized fixes, commit and push after the read-only review.

## Code changes

- GA4 uses the config-generated page view only. Removed the separate explicit `page_view` event after Chrome showed two page views for one production navigation. Page locations use the canonical HTTPS apex host with repeated slashes collapsed; query and fragment values remain excluded. Existing DNT, local/preview and sensitive-route guards remain in place.
- Opening the mobile menu with the keyboard focuses the first navigation link; Escape returns focus to the toggle when focus was in the menu.
- Both StockPets introductory guides distinguish local progress storage from the network required by iPhone ads and store purchases/restoration, and link the product privacy policy. The Korean guide's modification date is updated; its publication date and URL remain unchanged.

## Cloudflare configuration outside Git

These are dashboard rules, not Pages `_redirects` entries. Cloudflare Pages does not support hostname matching in `_redirects` source paths.

Single Redirect: **PIBO canonical hostname and path**, enabled, rule ID `76b69f9a6f0142288bf19310af099b28`.

```text
Match:
(http.host eq "www.pibostudio.com") or (http.host eq "pibostudio.com" and raw.http.request.uri.path contains "//" and raw.http.request.uri.path ne http.request.uri.path)
Target expression:
concat("https://pibostudio.com", http.request.uri.path)
Status: 301
Preserve query string: true
```

Bulk Redirect rule: **PIBO production Pages canonical domain**, enabled, rule ID `1e0a12638b744a3ba19a1bc9e8ef29ef`; list `pibo_pages_canonical`.

```text
Source: pibostudio-web.pages.dev/
Target: https://pibostudio.com/
Status: 301
Preserve query string: true
Subpath matching: true
Preserve path suffix: true
Include subdomains: false
```

Preview deployment subdomains deliberately remain accessible with `X-Robots-Tag: noindex` and the GA4 hostname exclusion. No DNS records or mail settings were changed. To roll back the external changes, disable these two rules; a Git revert alone does not change them.

## Validation before push

- `npm run build`: 123 HTML pages built.
- `npm run check:site`: 3,505 internal references, routes/assets/fragments, reciprocal translations, JSON-LD, RSS and sitemap passed.
- `npm run check:analytics`: one config-generated page view, duplicate execution guard, canonical page location, origin-only referrer, DNT/disable/local/preview/query/sensitive-route exclusions and generated 404 opt-out passed in an isolated Node VM. This does not execute Google's remote library.
- Local 390 px browser: Enter on the menu toggle focuses “게임 & 앱”; Escape closes the menu and restores toggle focus.
- `curl --path-as-is -I 'https://www.pibostudio.com//stockpets/?audit=1'` and apex equivalent: 301 to `https://pibostudio.com/stockpets/?audit=1`.
- Base Pages hostname `/ko/stockpets/?audit=1`: 301 to the matching apex path and query. Existing hash preview: 200 with `X-Robots-Tag: noindex`.

## Production verification after push

Code commit `b05336f` was pushed to `main`; Cloudflare deployment `27df07cd-3e47-4e51-b197-ecf7079d5228` completed successfully. Production `ga4.js` SHA-256 matched the local file (`d77fc620b0ebe7195df50b4ce7e3e86881e14218d6cfbccb125ac5c93ab53e9a`).

- Chrome Network, Keep log off and cache disabled: `/stockpets/` and `/#audit-fragment` each produced exactly one `en=page_view`, HTTP 204, including observation past the previous delayed duplicate interval. Reported `dl` was respectively `https://pibostudio.com/stockpets/` and `https://pibostudio.com/`, without the fragment.
- `/stockpets/?audit=1`: zero `collect` requests after load.
- Both updated StockPets guides returned 200 and displayed the corrected network requirements.
- A nonexistent production path returned 404 with no `ga4.js` loader.
- Production Korean StockPets page at 390 px: keyboard Enter focused the first menu link; Escape restored toggle focus and closed the menu.
- DNT and non-production hostname exclusions were tested in the isolated loader checks, not by changing the user's actual browser DNT preference. GA4 reporting aggregation latency and search indexing are separate from successful request collection and deployment.
