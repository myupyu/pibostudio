import { absolute, alternateRoutes, getArticles, routes, type Route } from '../lib/content';
import { homeUrl, locales, type Locale } from '../lib/site';

async function lastModified(route: Route) {
  if (route.entry) return route.entry.data.updated ?? route.entry.data.date;
  if (route.view === 'product') return route.product?.data.updated;
  if (route.view === 'blog' || route.view === 'guides') {
    const articles = await getArticles(route.view, route.lang, route.product?.data.slug);
    return articles.map(({ data }) => data.updated ?? data.date).sort().at(-1);
  }
}

export async function GET() {
  const all = await routes();
  const home = (Object.keys(locales) as Locale[]).map(lang => ({ lang, path: homeUrl(lang) }));
  const entries = [
    ...home.map(({ path }) => ({ path, alternates: home, modified: undefined })),
    ...await Promise.all(all.map(async route => ({
      path: route.path,
      alternates: alternateRoutes(route, all),
      modified: await lastModified(route),
    }))),
  ];

  const urls = entries.map(({ path, alternates, modified }) => {
    const localized = alternates.map(({ lang, path }) =>
      `<xhtml:link rel="alternate" hreflang="${lang}" href="${absolute(path)}"/>`,
    ).join('');
    return `<url><loc>${absolute(path)}</loc>${modified ? `<lastmod>${modified}</lastmod>` : ''}${localized}</url>`;
  }).join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
