import {esc, layout, schemaBreadcrumb} from './editorial.mjs';

// Partner sources: https://orka.chat/, https://orka.chat/partners and https://www.dharmasoftware.com/.
const assets = '/assets/partners/';
const featured = {name:'Orka', url:'https://orka.chat/', logo:'orka.svg'};
const makers = [
  {name:'BIG Digital Downloads', tag:'Digital delivery', logo:'big-digital-downloads.webp', url:'https://www.bigdigitaldownload.com/', accent:'peach', text:'Sell an ebook, audio file or license key on Shopify. Buyers receive their files after checkout, without anyone on your team sending downloads by hand.'},
  {name:'Adminmate', tag:'Internal tools', logo:'adminmate-icon.svg', url:'https://adminmate.io/', accent:'blue', text:'Give your team an admin panel for the database you already use. Support can find a customer record and operations can update it, with access controlled by role.'},
  {name:'GoodAPI', tag:'Giving & sustainability', logo:'goodapi-icon.svg', url:'https://www.thegoodapi.com/', accent:'mint', text:'Connect orders to tree planting, plastic removal or charitable donations. Storefront badges let shoppers see what their purchases helped fund.'},
  {name:'Dharma Software', tag:'Shopify SEO', logo:'dharma-software.webp', url:'https://www.dharmasoftware.com/', accent:'lilac',
   links:[{name:'Redirect Ninja',url:'https://apps.shopify.com/redirect-ninja-404'},{name:'Schema Ninja',url:'https://apps.shopify.com/schema-ninja-json-ld'}],
   text:'Find and redirect broken store links with Redirect Ninja, or check structured data and add product FAQs with Schema Ninja.'},
];
const domain = url => new URL(url).hostname.replace(/^www\./,'');
const arrow = '<span aria-hidden="true">↗</span>';

function makerCard(m){
  return `<article class="partner-profile hue-${m.accent}">
    <div class="partner-profile-top"><img src="${assets+m.logo}" alt="" width="56" height="56" loading="lazy"><span class="partner-tag">${esc(m.tag)}</span></div>
    <h3>${esc(m.name)}</h3><p>${m.links ? m.links.reduce((copy,app)=>copy.replace(app.name,`<a href="${esc(app.url)}">${esc(app.name)}</a>`),esc(m.text)) : esc(m.text)}</p>
    <a class="partner-link" href="${esc(m.url)}">${domain(m.url)} ${arrow}</a></article>`;
}
export function partnersPage(){
 const body = `<main id="content" class="partner-page wrap">
   <nav class="partner-crumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Partners</span></nav>
   <header class="partner-intro"><div><div class="partner-label">Cowlendar directory</div><h1>Meet our <em>partners.</em></h1>
   <p>We build Cowlendar for Shopify bookings. Meet the teams behind our live chat and the tools we recommend for running a store.</p>
   <a class="partner-jump" href="#partner-directory">Browse the directory <span aria-hidden="true">↓</span></a></div>
   <aside class="partner-feature" aria-labelledby="featured-partner"><div class="partner-feature-top"><img src="${assets+featured.logo}" alt="" width="64" height="64"><span class="partner-tag">Featured partner</span></div>
   <h2 id="featured-partner">${featured.name}</h2><p class="partner-feature-lead">The live chat we use at Cowlendar.</p><p>Have a question about taking bookings? When you open the chat on this site, you’re using Orka. It brings customer conversations from multiple stores and apps into one shared inbox.</p><a class="partner-link" href="${featured.url}">Explore Orka ${arrow}</a></aside></header>
   <section id="partner-directory" aria-labelledby="directory-heading"><div class="partner-label">The directory</div><h2 id="directory-heading">Tools for store teams.</h2>
   <div class="partner-profiles">${makers.map(makerCard).join('')}</div></section>
   <section class="partner-contact"><div><div class="partner-label">Work with Cowlendar</div><h2>Have a tool to share?</h2><p>Tell us what it helps merchants do and where they can try it.</p></div>
   <div><a class="cw-button" href="mailto:hello@cowlendar.com?subject=Cowlendar%20partnership">Talk to the team ${arrow}</a><a class="partner-link" href="https://bubbleaffiliate.com/">Affiliate program ${arrow}</a></div></section>
 </main>`;
 const directory = [featured,...makers];
 return layout({path:'/partners',title:'Cowlendar Partners | Tools for Shopify Merchants',description:'Meet Orka, the live chat Cowlendar uses, alongside BIG Digital Downloads, Adminmate, GoodAPI and Dharma Software. Explore their tools for Shopify merchants.',body,schema:[
   schemaBreadcrumb([['Home','/'],['Partners','/partners']]),
   {'@context':'https://schema.org','@type':'ItemList',name:'Cowlendar partner directory',numberOfItems:directory.length,itemListElement:directory.map((m,i)=>({'@type':'ListItem',position:i+1,name:m.name,url:m.url}))},
 ]}).replace('</head>','<link rel="stylesheet" href="/partners.css?v=orka"></head>');
}
