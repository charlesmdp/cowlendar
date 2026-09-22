# Cowlendar website

Site anglais de Cowlendar : homepage, variante `/2/`, catalogue des fonctionnalités, pricing, pages légales et convertisseur de fuseaux horaires. Préparé pour Cloudflare Pages, avec une fondation de blog sur D1 (SQLite).

## Pages

- `/` : homepage et démonstration originale.
- `/2/` : hero texte à gauche, réservation interactive à droite. Le reste de la homepage est identique.
- `/features/` : catalogue de 59 fonctionnalités avec recherche et navigation par catégorie.
- `/feature/` : redirection vers `/features/`.
- `/pricing/`.
- `/free-tools/timezone-converter/`.
- `/terms-and-conditions/`, `/privacy-policy/`, `/gdpr/`.

## Déploiement

Voir **[le guide Cloudflare Pages + D1](docs/CLOUDFLARE-PAGES.md)** : connexion GitHub, réglages exacts, création de la base, liaison `BLOG_DB`, domaine et gestion des futurs articles.

Le site d’aperçu Sites et le projet Cloudflare Pages du propriétaire sont deux hébergements distincts. `.openai/hosting.json` conserve uniquement la référence de l’aperçu Sites. Les fonctions `functions/` sont destinées à Cloudflare Pages et ne tournent pas sur l’aperçu statique Sites.

## Développement

Node 22 ou version compatible plus récente.

```sh
npm ci
npm run db:migrate:local
npm run dev
```

Pour consulter seulement le site statique, sans API :

```sh
python3 -m http.server 4187 --directory dist
```

```sh
npm test
npm run build
```

Le build prépare l’indexation des pages de production. Les aperçus Cloudflare et la variante `/2/` conservent `noindex`. Les sources HTML/CSS/JS sont dans `dist/` ; il s’agit d’un site statique directement éditable, pas d’un export à régénérer depuis un framework.

## Blog D1

Le schéma est dans `db/schema.ts`, la migration versionnée dans `cloudflare/migrations/`, les lectures préparées dans `db/blog.mjs` et l’API Cloudflare dans `functions/api/posts/[[path]].js`.

- Articles en Markdown, résumé, couverture, auteur, catégorie, champs SEO.
- Brouillons et publications programmées exclus des réponses publiques.
- API en lecture seule, pagination bornée, requêtes paramétrées.
- Gestion initiale depuis le tableau de bord Cloudflare. Aucun mot de passe, clé secrète ou formulaire d’administration public.
- Interface du blog et import des anciens articles à réaliser lors de l’étape blog. Les liens Blog actuels ouvrent le blog existant.
- D1 local vérifié. La base distante doit encore être créée et liée dans le compte Cloudflare du propriétaire.

## Contenus et sources

Les chiffres d’avis, extraits de septembre 2026 et tarifs sont documentés dans `content/proof-and-pricing.json`. Les logos authentiques et favicons vérifiés sont documentés dans `content/logo-sources.json` et `content/brand-assets-v4.json`. Trois marchands sans favicon vérifié conservent leurs initiales.

Les 13 photos de cas d’usage et la photo de promenade avec un lama ont été harmonisées. Les prompts des nouvelles images sont conservés dans `content/image-prompts-v4.json`.

La privacy policy concerne uniquement **BOOKING APPOINTMENT COWLENDAR SAS**, SIREN 989 284 062, 14 rue Charles V, 75004 Paris. Identité fournie par le propriétaire dans sa capture du 22 septembre 2026. Les mentions de l’ancienne entité et des autres apps ont été retirées des pages légales. Les anciennes durées contradictoires de conservation (60 et 75 jours) ont été remplacées par une formulation par finalité ; un délai chiffré unique pourra être ajouté lorsque la politique opérationnelle sera confirmée.

Apple Calendar est présenté comme une intégration sur instruction du propriétaire, sans promesse supplémentaire de synchronisation bidirectionnelle.

## Vérifications

14 tests automatisés passent : changements d’heure et conversions, confidentialité des brouillons, dates de publication, pagination, contraintes SQLite et routes publiques en lecture seule. Aperçus visuels et interactions vérifiés sur mobile et ordinateur. Les animations respectent la préférence de réduction du mouvement.

## Dernières retouches

Les onglets de `/2/` sont au-dessus du module de réservation. La homepage principale propose un cinquième onglet « Your Services ». Le prefooter reprend les illustrations, les proportions et les trajectoires flottantes du site original et figure sur les huit pages. Les interactions du bento sont rétablies : calendrier multijour, fuseaux horaires, cartes d’équipe, durée personnalisée, participants, rappels et interrupteurs des dates bloquées. Les rappels peuvent être ajoutés ou retirés dans la démonstration.
