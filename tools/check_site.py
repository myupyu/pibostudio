"""Checks the static build's routes, assets, translations, feeds and metadata."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]/'dist'
errors=[]; pages={}; reference_count=0
class Page(HTMLParser):
 def __init__(self):
  super().__init__();self.refs=[];self.ids=[];self.meta={};self.canonical=None;self.alts={};self.h1=0;self.lang=None;self.jsonld=[];self.in_json=False;self.json_text='';self.title='';self.in_title=False
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='html':self.lang=a.get('lang')
  if tag=='h1':self.h1+=1
  if tag=='title':self.in_title=True
  if tag=='script' and a.get('type')=='application/ld+json':self.in_json=True;self.json_text=''
  if tag=='meta':self.meta[a.get('name') or a.get('property')]=a.get('content')
  if tag=='link' and a.get('rel')=='canonical':self.canonical=a.get('href')
  if tag=='link' and a.get('hreflang'):self.alts[a['hreflang']]=a.get('href')
  for key in ('href','src'):
   if a.get(key):self.refs.append(a[key])
 def handle_endtag(self,tag):
  if tag=='title':self.in_title=False
  if tag=='script' and self.in_json:
   try:self.jsonld.append(json.loads(self.json_text))
   except ValueError:errors.append('Invalid JSON-LD')
   self.in_json=False
 def handle_data(self,s):
  if self.in_json:self.json_text+=s
  if self.in_title:self.title+=s
for f in ROOT.rglob('*.html'):
 path='/' + str(f.relative_to(ROOT)).removesuffix('index.html')
 page=Page();page.feed(f.read_text());pages[path]=page
for path,page in pages.items():
 if page.h1!=1:errors.append(f'{path}: expected one h1, found {page.h1}')
 if len(set(page.ids))!=len(page.ids):errors.append(f'{path}: duplicate IDs')
 if not page.title or not page.meta.get('description'):errors.append(f'{path}: missing title/description')
 if page.canonical!='https://pibostudio.com'+path:errors.append(f'{path}: wrong canonical {page.canonical}')
 if page.meta.get('robots')!='index, follow':errors.append(f'{path}: public indexing metadata absent')
 for ref in page.refs:
  parsed=urlsplit(ref)
  if parsed.scheme or parsed.netloc:continue
  reference_count+=1
  dest=unquote(parsed.path) or path
  if not dest.startswith('/'):errors.append(f'{path}: relative URL requires review {ref}');continue
  target=ROOT/dest.lstrip('/')
  if dest.endswith('/'):target=target/'index.html'
  if not target.exists():errors.append(f'{path}: broken local reference {ref}')
  if parsed.fragment and dest in pages and parsed.fragment not in pages[dest].ids:errors.append(f'{path}: missing fragment {ref}')
 for lang,ref in page.alts.items():
  dest=urlsplit(ref).path
  if dest not in pages:errors.append(f'{path}: alternate missing {dest}')
  elif lang!='x-default' and pages[dest].lang!=lang:errors.append(f'{path}: alternate has wrong language {dest}')
for path,page in pages.items():
 other=page.alts.get('en' if page.lang=='ko' else 'ko')
 if other and pages.get(urlsplit(other).path):
  partner=pages[urlsplit(other).path]
  if partner.alts.get(page.lang)!=page.canonical:errors.append(f'{path}: nonreciprocal translation')
xml=ET.parse(ROOT/'sitemap.xml'); listed=[e.text for e in xml.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
if set(listed)!={'https://pibostudio.com'+p for p in pages}:errors.append('Sitemap does not match public pages')
for file in ('rss.xml','ko/rss.xml'):
 feed=ET.parse(ROOT/file)
 for link in feed.findall('.//item/link'):
  if urlsplit(link.text).path not in pages:errors.append(f'{file}: missing post')
for path in pages:
 if '/_' in path or 'example-app' in path:errors.append(f'Published example: {path}')
for source in (ROOT.parent/'src/content/products').glob('*.json'):
 if source.stem.startswith('_'):continue
 product=json.loads(source.read_text());slug=product['slug']
 for prefix,lang in [('/','en'),('/ko/','ko')]:
  page=pages[prefix+slug+'/'];kind='VideoGame' if product['kind']=='game' else 'SoftwareApplication'
  if not any(s.get('@type')==kind for s in page.jsonld):errors.append(f'{prefix}{slug}: missing {kind} schema')
  for store in product.get('stores',[]):
   if store['url'] not in page.refs:errors.append(f'{prefix}{slug}: missing store link {store["label"]}')
  official=product.get('officialSite',{}).get(lang)
  if official and official not in page.refs:errors.append(f'{prefix}{slug}: missing official website')
  if product['kind']=='app' and prefix+slug+'/' not in pages[prefix+'apps/'].refs:errors.append(f'{slug}: missing from apps collection')
if errors:
 for e in errors:print(e)
 raise SystemExit(1)
print(f'PASS: {len(pages)} pages; internal routes/assets/fragments, reciprocal translations, JSON-LD, RSS and sitemap checked ({reference_count} references).')
