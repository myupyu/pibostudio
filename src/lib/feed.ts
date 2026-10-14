import {getArticles,articleUrl,absolute} from './content';
import type {Locale} from './site';
const xml=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]!));
export async function journalFeed(lang:Locale){
 const posts=await getArticles('blog',lang);const feedPath=lang==='ko'?'/ko/rss.xml':'/rss.xml';
 const body=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${lang==='ko'?'PIBO Studio 저널':'Pibo Studio Journal'}</title><link>${absolute(lang==='ko'?'/ko/blog/':'/blog/')}</link><description>${lang==='ko'?'게임과 앱의 작은 이야기':'Stories from our games and apps'}</description><language>${lang}</language><atom:link href="${absolute(feedPath)}" rel="self" type="application/rss+xml"/>${posts.map(p=>`<item><title>${xml(p.data.title)}</title><description>${xml(p.data.description)}</description><link>${absolute(articleUrl(p))}</link><guid isPermaLink="true">${absolute(articleUrl(p))}</guid><pubDate>${new Date(p.data.date+'T12:00:00Z').toUTCString()}</pubDate></item>`).join('')}</channel></rss>`;
 return new Response(body,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
}
