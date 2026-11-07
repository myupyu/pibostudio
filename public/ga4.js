// GA4 public-page traffic. No form values, search terms or custom user identifiers.
(() => {
  const id = 'G-8ZCXED2Z6V';
  const hosts = ["pibostudio.com", "www.pibostudio.com"];
  if (!hosts.includes(location.hostname) || location.search ||
      /\/(?:admin|login|account|contact)(?:\/|\.html|$)/.test(location.pathname) ||
      navigator.doNotTrack === '1' || window['ga-disable-' + id]) return;
  const marker = 'gatepopGA4_' + id;
  if (window[marker]) return;
  window[marker] = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  let referrer = '';
  try { referrer = new URL(document.referrer).origin + '/'; } catch {}
  const page = location.origin + location.pathname;
  window.gtag('js', new Date());
  window.gtag('config', id, {
    send_page_view: false, allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: page, page_referrer: referrer
  });
  window.gtag('event', 'page_view', {
    send_to: id, page_location: page,
    page_referrer: referrer, page_title: document.title
  });
  if (!document.querySelector('script[src^="https://www.googletagmanager.com/gtag/js"]')) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(script);
  }
})();
