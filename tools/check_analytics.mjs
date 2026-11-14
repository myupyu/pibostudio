import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../public/ga4.js', import.meta.url), 'utf8');
const id = 'G-8ZCXED2Z6V';
function load(url, { dnt = '0', disabled = false, repeat = false } = {}) {
  const scripts = [];
  const window = { ['ga-disable-' + id]: disabled };
  const context = {
    window, location: new URL(url), navigator: { doNotTrack: dnt }, URL,
    document: {
      referrer: 'https://example.com/private?query=secret#fragment',
      querySelector: () => scripts[0], createElement: () => ({}),
      head: { appendChild: script => scripts.push(script) }
    }
  };
  runInNewContext(source, context);
  if (repeat) runInNewContext(source, context);
  return { calls: Array.from(window.dataLayer || [], call => Array.from(call)), scripts };
}

for (const url of ['https://pibostudio.com/stockpets/#private', 'https://www.pibostudio.com//stockpets/']) {
  const { calls, scripts } = load(url, { repeat: true });
  const configs = calls.filter(call => call[0] === 'config');
  assert.equal(configs.length, 1, 'Repeated loader execution must not configure another page view');
  assert.equal(configs[0][1], id);
  assert.equal(configs[0][2].send_page_view, true);
  assert.equal(calls.filter(call => call[0] === 'event' && call[1] === 'page_view').length, 0);
  assert.equal(configs[0][2].page_location, 'https://pibostudio.com/stockpets/');
  assert.equal(configs[0][2].page_referrer, 'https://example.com/');
  assert.equal(configs[0][2].allow_google_signals, false);
  assert.equal(configs[0][2].allow_ad_personalization_signals, false);
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=' + id);
}

const excluded = [
  ['http://localhost:4325/'], ['http://127.0.0.1:4325/'],
  ['https://pibostudio-web.pages.dev/'], ['https://preview.pibostudio-web.pages.dev/'],
  ['https://pibostudio.com/?q=private'], ['https://pibostudio.com/contact/'],
  ['https://pibostudio.com/ko/account/'], ['https://pibostudio.com/admin'],
  ['https://pibostudio.com/login.html'],
  ['https://pibostudio.com/', { dnt: '1' }],
  ['https://pibostudio.com/', { disabled: true }]
];
for (const [url, options] of excluded) {
  const result = load(url, options);
  assert.equal(result.calls.length, 0, `Excluded page must not enqueue analytics: ${url}`);
  assert.equal(result.scripts.length, 0, `Excluded page must not load Google: ${url}`);
}
// The 404 page opts out in the shared layout, before the loader can run.
assert.doesNotMatch(readFileSync(new URL('../dist/404.html', import.meta.url), 'utf8'), /(?:ga4\.js|googletagmanager\.com)/);
console.log('Analytics checks passed: single page-view configuration, URL privacy, exclusions, 404.');
