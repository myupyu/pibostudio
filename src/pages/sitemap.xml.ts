import {routes,alternateRoutes,absolute} from '../lib/content';
export async function GET(){
 const all=await routes();const home=[{path:'/',alternates:[{lang:'en',path:'/'},{lang:'ko',path:'/ko/'}]},{path:'/ko/',alternates:[{lang:'en',path:'/'},{lang:'ko',path:'/ko/'}]}];
 const entries=[...home,...all.map(r=>({path:r.path,alternates:alternateRoutes(r,all)}))];
 const body=`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.map(r=>`<url><loc>${absolute(r.path)}</loc>${r.alternates.map(a=>`<xhtml:link rel="alternate" hreflang="${a.lang}" href="${absolute(a.path)}"/>`).join('')}</url>`).join('')}</urlset>`;
 return new Response(body,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
