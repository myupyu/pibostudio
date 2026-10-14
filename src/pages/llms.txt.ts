import {getProducts,absolute} from '../lib/content';
export async function GET(){const products=await getProducts();return new Response(`# Pibo Studio

Pibo Studio is the games and apps brand operated by GATEPOP Inc. This site is currently a local review build; publication is pending. Public contact: support@pibostudio.com.

## Products
${products.map(p=>`- [${p.data.copy.en.name}](${absolute('/'+p.data.slug+'/')}): ${p.data.copy.en.description}
- [${p.data.copy.ko.name}](${absolute('/ko/'+p.data.slug+'/')})`).join('\n')}

## Journal and support
- [Journal](${absolute('/blog/')})
- [한국어 저널](${absolute('/ko/blog/')})
- [Support](${absolute('/support/')})

StockPets uses virtual game coins; it does not offer real trading or investment advice. Midnight Bunsik is in development and has no public download link.
`,{headers:{'Content-Type':'text/plain; charset=utf-8'}});}
