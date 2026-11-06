import {esc, layout, schemaBreadcrumb} from './editorial.mjs';

// Directory and product destinations verified against https://orka.chat/partners
// on 2026-11-06. Screenshots are supplied by Dharma Software.
const assets = '/assets/partners/';
const makers = [
  {name:'BIG Digital Downloads', tag:'Digital delivery', logo:'big-digital-downloads.webp', url:'https://www.bigdigitaldownload.com/', accent:'peach', text:'Sell an ebook, audio file or license key on Shopify. Buyers receive their files after checkout, without anyone on your team sending downloads by hand.'},
  {name:'Adminmate', tag:'Internal tools', logo:'adminmate-icon.svg', url:'https://adminmate.io/', accent:'blue', text:'Give your team an admin panel for the database you already use. Support can find a customer record and operations can update it, with access controlled by role.'},
  {name:'GoodAPI', tag:'Giving & sustainability', logo:'goodapi-icon.svg', url:'https://www.thegoodapi.com/', accent:'mint', text:'Connect orders to tree planting, plastic removal or charitable donations. Storefront badges let shoppers see what their purchases helped fund.'},
];
const studio = {name:'Dharma Software', url:'https://www.dharmasoftware.com/'};
const apps = [
  {name:'Redirect Ninja', tag:'Broken links & redirects', logo:'redirect-ninja.webp', screenshot:'redirect-ninja-dashboard.webp', width:1680, height:2100, alt:'Redirect Ninja showing broken URLs and suggested destination pages in a sample report', text:'Find broken links after a store migration and review suggested destinations based on Google Search Console history. Apply redirects in batches when several URLs move at once.', url:'https://www.dharmasoftware.com/apps/redirect-ninja', listing:'https://apps.shopify.com/redirect-ninja-404'},
  {name:'Schema Ninja', tag:'FAQs & structured data', logo:'schema-ninja.webp', screenshot:'schema-ninja-dashboard.webp', width:1027, height:771, alt:'Schema Ninja showing structured-data settings for a store, its blog, breadcrumbs and return policy', text:'Build product FAQs from store data and add structured data to Shopify pages. The schema scanner helps you spot errors, duplicates and conflicts with a theme.', url:'https://www.dharmasoftware.com/apps/schema-ninja-json-ld-seo', listing:'https://apps.shopify.com/schema-ninja-json-ld'},
];
const domain = url => new URL(url).hostname.replace(/^www\./,'');
const arrow = '<span aria-hidden="true">↗</span>';

function makerCard(m){
  return `<article class="partner-profile hue-${m.accent}">
    <div class="partner-profile-top"><img src="${assets+m.logo}" alt="" width="56" height="56" loading="lazy"><span class="partner-tag">${esc(m.tag)}</span></div>
    <h3>${esc(m.name)}</h3><p>${esc(m.text)}</p>
    <a class="partner-link" href="${esc(m.url)}">${domain(m.url)} ${arrow}</a></article>`;
}
function appCard(a){
  return `<article class="partner-app">
    <figure><a class="partner-shot" href="${assets+a.screenshot}" aria-label="Open full screenshot of ${esc(a.name)}"><img src="${assets+a.screenshot}" alt="${esc(a.alt)}" width="${a.width}" height="${a.height}" loading="lazy" decoding="async"></a>
    <figcaption>Product screenshot · Dharma Software</figcaption></figure>
    <div class="partner-app-copy"><div class="partner-profile-top"><img src="${assets+a.logo}" alt="" width="44" height="44" loading="lazy"><span class="partner-tag">${esc(a.tag)}</span></div>
    <h3>${esc(a.name)}</h3><p>${esc(a.text)}</p><div class="partner-app-links"><a class="partner-link" href="${esc(a.url)}">Explore ${esc(a.name)} ${arrow}</a>
    <a class="partner-store" href="${esc(a.listing)}" aria-label="${esc(a.name)} on the Shopify App Store">Shopify App Store ${arrow}</a></div></div></article>`;
}
export function partnersPage(){
 const body = `<main id="content" class="partner-page wrap">
   <nav class="partner-crumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Partners</span></nav>
   <header class="partner-intro"><div><div class="partner-label">Cowlendar directory</div><h1>Meet our <em>partners.</em></h1>
   <p>Bookings are one part of running a store. Meet the teams behind tools for digital delivery, back-office work, giving and search.</p>
   <a class="partner-jump" href="#partner-directory">Browse the directory <span aria-hidden="true">↓</span></a></div>
   <aside class="partner-host" aria-labelledby="partner-host-name"><div class="partner-host-top"><img src="/assets/apps/cowlendar-icon.webp" alt="" width="60" height="60"><span class="partner-tag">Your host</span></div>
   <h2 id="partner-host-name">Cowlendar</h2><p>Let customers choose a class time, reserve rental dates or book an appointment right on your Shopify store.</p><a class="partner-link" href="/">Explore Cowlendar ${arrow}</a></aside></header>
   <section id="partner-directory" aria-labelledby="directory-heading"><div class="partner-label">The directory</div><h2 id="directory-heading">Tools for store teams.</h2>
   <div class="partner-profiles">${makers.map(makerCard).join('')}</div></section>
   <section class="partner-spotlight" aria-labelledby="studio-heading"><div class="partner-label">Partner spotlight</div><div class="partner-studio"><div><h2 id="studio-heading">Dharma Software</h2><a class="partner-link" href="${studio.url}">dharmasoftware.com ${arrow}</a></div>
   <p>When a collection moves or search engines need clearer product information, these two Shopify apps tackle different parts of the job.</p></div>
   <div class="partner-apps">${apps.map(appCard).join('')}</div></section>
   <section class="partner-contact"><div><div class="partner-label">Work with Cowlendar</div><h2>Have a tool to share?</h2><p>Tell us what it helps merchants do and where they can try it.</p></div>
   <div><a class="cw-button" href="mailto:hello@cowlendar.com?subject=Cowlendar%20partnership">Talk to the team ${arrow}</a><a class="partner-link" href="https://bubbleaffiliate.com/">Affiliate program ${arrow}</a></div></section>
 </main>`;
 const directory = [...makers,studio];
 return layout({path:'/partners',title:'Cowlendar Partners | Tools for Shopify Merchants',description:'Meet BIG Digital Downloads, Adminmate, GoodAPI and Dharma Software. Explore partner tools for digital delivery, operations, giving and Shopify SEO.',body,schema:[
   schemaBreadcrumb([['Home','/'],['Partners','/partners']]),
   {'@context':'https://schema.org','@type':'ItemList',name:'Cowlendar partner directory',numberOfItems:directory.length,itemListElement:directory.map((m,i)=>({'@type':'ListItem',position:i+1,name:m.name,url:m.url}))},
 ]}).replace('</head>','<link rel="stylesheet" href="/partners.css"></head>');
}
