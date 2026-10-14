import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const localized = z.object({
  name: z.string(), tagline: z.string(), description: z.string(), intro: z.string(), genre: z.string(), status: z.string(), purchase: z.string(),
  features: z.array(z.object({title: z.string(), body: z.string()})),
  facts: z.array(z.object({label: z.string(), value: z.string()})),
  gallery: z.array(z.object({src: z.string(), caption: z.string()})),
  faq: z.array(z.object({q: z.string(), a: z.string()})),
});
const products = defineCollection({
  loader: glob({pattern: ['*.json', '!_*.json'], base: './src/content/products', generateId: ({entry}) => entry.replace(/\.json$/, '')}),
  schema: z.object({slug: z.string().regex(/^[a-z0-9-]+$/), kind: z.enum(['game','app']), status: z.enum(['development','released']), icon: z.string(), socialImage: z.string(), platforms: z.array(z.string()), accent: z.enum(['night','garden','studio']).default('studio'), order: z.number().default(10), copy: z.object({en: localized, ko: localized}), stores: z.array(z.object({label: z.string(),url: z.string().url()})).default([]), officialSite: z.object({en:z.string().url(),ko:z.string().url()}).optional(), privacy: z.object({en:z.string().url(),ko:z.string().url()}).optional()}),
});
const articleSchema = z.object({key: z.string(), slug: z.string().regex(/^[a-z0-9-]+$/), lang: z.enum(['en','ko']), product: z.string().optional(), game: z.string().optional(), title: z.string(), description: z.string(), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), draft: z.boolean().default(false), art: z.object({label:z.string(),sprites:z.array(z.string()),tone:z.string().optional()}).optional(),source:z.string().url().optional()});
const articleLoader = (base:string) => glob({pattern:['**/*.md','!**/_*.md'],base,generateId:({entry})=>entry.replace(/\.md$/,'')});
const blog = defineCollection({loader: articleLoader('./src/content/blog'),schema:articleSchema});
const guides = defineCollection({loader: articleLoader('./src/content/guides'),schema:articleSchema});
const policies = defineCollection({loader: articleLoader('./src/content/policies'),schema:articleSchema});
export const collections = {products,blog,guides,policies};
