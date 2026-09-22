# Commercial SEO pages

Published content is English. Product and competitor sources were checked on September 22, 2026.

## Editing the content

- `content/solutions.json`: eight business-specific landing pages. Each has its own workflow, illustrative booking setup, feature explanations, fit/boundary, FAQs, related guides and primary sources.
- `content/integrations.json`: six integration guides. The Klaviyo guide uses the current `connecting-cowlendar-to-klaviyo` documentation, including its beta status and ten named events. The older “not available yet” help article is superseded.
- `content/alternatives-editorial.json`: ten individual alternative analyses, with competitor-specific criteria, two cost scenarios, feature selections, migration checks and FAQs.
- `content/apps.json`: sourced app plans and supported cost-model features. Update both public plan descriptions and `pricingTiers` when a price or allowance changes. Do not interpret missing documentation as an unsupported feature.

`lib/commercial.mjs` renders the business and integration pages and their two hubs. `lib/alternatives.mjs` renders the alternatives. Their styles are in `ui/commercial.css` and `ui/growth.css`.

## Structured data and internal links

`lib/product-seo.mjs` generates Features and Pricing schema from their visible content. Features has a SoftwareApplication, an ItemList with stable unique feature anchors, and breadcrumbs. Pricing has a SoftwareApplication with four verified public Offer entries, its visible FAQ questions/answers, and breadcrumbs. Advanced plans displayed on Pricing are not copied into structured data unless they are added to the verified pricing source.

The homepage's thirteen use case links now point to the relevant business landing pages. Six integration tiles and their Features cards point to the corresponding integration pages. Apple Calendar and Microsoft Teams remain linked to their existing feature section. Shared navigation and footer link to the two hubs and the new pages.

The production build adds all sixteen new routes to the sitemap and the fourteen detailed pages to `llms.txt`. Existing blog URLs and redirects are unchanged. No database migration is needed.

## Verification

Run `BUILD_PRODUCTION=1 npm run build`, then `npm test`. The commercial SEO tests check crawlable destinations and assets, canonical URLs, sitemap inclusion, homepage links, schema-to-visible-content parity, repeated-build safety, and price examples that include competitors being cheaper.

Run `SITE_TEST_URL=http://localhost:8788 node checks/http-smoke.mjs` against the local Pages preview. Repeat against production after the GitHub-triggered Cloudflare deployment succeeds. Verify desktop and mobile layouts, particularly scrollable comparison tables and integration event tables.

Structured data does not guarantee search enhancements or rankings. Product examples illustrate configured workflows; they are not screenshots of a merchant's actual bookings.
