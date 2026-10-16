import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, type Locale } from './site';
export type Product = CollectionEntry<'products'>;
export type Article = CollectionEntry<'blog'> | CollectionEntry<'guides'> | CollectionEntry<'policies'>;
export const urlFor = (lang:Locale, path='') => `${locales[lang].prefix}/${path.replace(/^\/+|\/+$/g,'')}${path ? '/' : ''}`;
export const scopeOf = (post:Article) => post.data.product ?? post.data.game;
const included = (entry:{id:string,data:{draft?:boolean}}) => !entry.id.split('/').some(p=>p.startsWith('_')) && !entry.data.draft;
export const getProducts = async () => (await getCollection('products')).filter(included).sort((a,b)=>a.data.order-b.data.order);
export const getArticles = async (collection:'blog'|'guides'|'policies',lang:Locale,product?:string) => (await getCollection(collection)).filter(p=>included(p)&&p.data.lang===lang&&(!product||scopeOf(p)===product)).sort((a,b)=>b.data.date.localeCompare(a.data.date)||a.data.key.localeCompare(b.data.key));
export const articleUrl = (post:Article) => urlFor(post.data.lang,`${scopeOf(post)?scopeOf(post)+'/':''}${post.collection==='policies'?'':post.collection+'/'}${post.data.slug}`);
export const productUrl = (p:Product,lang:Locale) => urlFor(lang,p.data.slug);
export type Route = {path:string,view:'product'|'products'|'blog'|'guides'|'article',lang:Locale,product?:Product,entry?:Article,kind?:'game'|'app'};
export async function routes():Promise<Route[]> {
  const products=await getProducts();const result:Route[]=[];
  for(const lang of ['en','ko'] as Locale[]){
    const add=(route:Omit<Route,'path'|'lang'>,path:string)=>result.push({...route,lang,path:urlFor(lang,path)});
    add({view:'products'},'projects');add({view:'products',kind:'game'},'games');add({view:'products',kind:'app'},'apps');add({view:'blog'},'blog');
    for(const product of products){
      add({view:'product',product},product.data.slug);if((await getArticles('blog',lang,product.data.slug)).length)add({view:'blog',product},`${product.data.slug}/blog`);
      if((await getArticles('guides',lang,product.data.slug)).length)add({view:'guides',product},`${product.data.slug}/guides`);
    }
    for(const collection of ['blog','guides','policies'] as const){
      for(const entry of await getArticles(collection,lang)){
        const scope=scopeOf(entry);const product=products.find(p=>p.data.slug===scope);
        if(scope&&!product)throw new Error(`Unknown product ${scope} in ${entry.id}`);
        result.push({view:'article',lang,entry,product,path:articleUrl(entry)});
      }
    }
  }
  const paths=result.map(r=>r.path);if(new Set(paths).size!==paths.length)throw new Error('Duplicate public route');
  return result;
}
const key=(r:Route)=>[r.view,r.product?.id,r.entry?.collection,r.entry?.data.key,r.kind].join(':');
export const alternateRoutes=(route:Route,all:Route[])=>all.filter(r=>key(r)===key(route)).map(r=>({lang:r.lang,path:r.path}));
export const absolute=(path:string)=>new URL(path,'https://pibostudio.com').href;
export function metadata(route:Route){
 const ko=route.lang==='ko';const p=route.product?.data.copy[route.lang];
 if(route.entry)return {title:`${route.entry.data.title} · ${p?.name??'Pibo Studio'}`,description:route.entry.data.description};
 if(route.view==='product')return {title:`${p!.name} — ${p!.tagline} | Pibo Studio`,description:p!.description};
 if(route.view==='products')return {title:`${route.kind==='game'?(ko?'게임':'Games'):route.kind==='app'?(ko?'앱':'Apps'):(ko?'게임 & 앱':'Games & apps')} | Pibo Studio`,description:ko?'Pibo Studio가 만드는 게임과 앱을 만나보세요.':'Explore the games and apps made by Pibo Studio.'};
 return {title:`${p?p.name+' · ':''}${route.view==='guides'?(ko?'플레이 가이드':'Play guides'):(ko?'저널':'Journal')} | Pibo Studio`,description:ko?'게임의 작은 이야기와 직접 해 보는 방법을 모았습니다.':'Stories from our games, and guides to finding your own way.'};
}
export const dateLabel=(date:string,lang:Locale)=>new Intl.DateTimeFormat(lang==='ko'?'ko-KR':'en-US',{dateStyle:'long',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));
