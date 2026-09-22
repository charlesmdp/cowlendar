# Cowlendar website

Site anglais de Cowlendar, conçu pour **Cloudflare Pages + D1**, avec un blog rendu côté serveur et des pages statiques rapides.

- Homepage, catalogue des fonctionnalités, pricing, FAQ, partenaires et pages légales.
- 115 articles conservés à leur URL d’origine, dont 30 guides réécrits en septembre 2026.
- 9 comparatifs et 9 guides d’alternatives, avec sources officielles et limites par formule.
- Convertisseur de fuseaux horaires, calculateur de prix et vraie page 404.
- Sitemap dynamique, canonical, JSON-LD, robots.txt, llms.txt, llms-full.txt et versions Markdown.
- `/2` supprimé et redirigé vers la homepage.

## Développement

Node 22 ou plus récent compatible.

```sh
npm ci
npm run db:migrate:local
npm run build
npm run dev
```

`npm test` vérifie la confidentialité des brouillons, les publications programmées, le rendu et les cas de fuseaux horaires. Avec le serveur local ouvert :

```sh
SITE_TEST_URL=http://localhost:8788 node checks/http-smoke.mjs
```

## Modifier le contenu

- Articles : fichiers Markdown dans `content/articles/`, métadonnées dans `content/posts.json`.
- Comparatifs : faits et sources dans `content/apps.json`, présentation dans `lib/editorial.mjs`.
- Navigation commune : `lib/header.html`, `lib/footer.html` et `lib/prefooter.html`, repris par `lib/chrome.generated.mjs`.
- Pages marketing : HTML/CSS/JS dans `dist/`. Le build met à jour leurs métadonnées et leur navigation.
- Nouveaux articles ou mises à jour sans déploiement : table D1 `blog_posts`, via le tableau de bord Cloudflare authentifié.

Le build régénère le blog, les comparatifs, les pages de ressources et les fichiers d’indexation. Il rend la branche Cloudflare `main` indexable ; les autres builds sont en `noindex`. Pour simuler la production localement : `BUILD_PRODUCTION=1 npm run build`.

Les données privées Search Console ne figurent pas dans ce dépôt. Les illustrations et captures disposent de fichiers de provenance dans `content/`.

Voir [le guide de déploiement](docs/CLOUDFLARE-PAGES.md), [le fonctionnement éditorial](docs/BLOG-EDITORIAL.md) et [les redirections](docs/URL-MIGRATION.csv).
