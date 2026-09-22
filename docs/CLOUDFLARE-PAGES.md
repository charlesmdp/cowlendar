# Déployer Cowlendar sur Cloudflare Pages + D1

Le projet utilise le dépôt `charlesmdp/cowlendar`, le projet Pages `cowlendar` et la base D1 `cowlendar-blog`. Aucun service Supabase n’est requis.

## Réglages Pages

| Réglage | Valeur |
| --- | --- |
| Branche de production | `main` |
| Commande de build | `npm run build` |
| Dossier publié | `dist` |
| Dossier racine | vide |
| Node | 22 ou plus récent compatible |
| Domaine Pages | `cowlendar.pages.dev` |

Le fichier `wrangler.jsonc` décrit la liaison `BLOG_DB` vers la base D1 existante. Son identifiant de base n’est pas un secret. Aucun jeton d’accès ne doit être ajouté au dépôt. Le fichier ancien `wrangler.local.jsonc` contient seulement une configuration de test historique ; le développement courant utilise `wrangler.jsonc` en mode local.

Cloudflare doit être autorisé à accéder à **charlesmdp/cowlendar** dans les paramètres de l’application GitHub « Cloudflare Workers and Pages ». Une autorisation limitée à un autre dépôt ne suffit pas, même si le plugin GitHub de Codex est connecté.

## Base de données

La table `blog_posts` doit exister, avec ses index. Le schéma est dans `cloudflare/migrations/0000_smiling_grey_gargoyle.sql`.

Dans la console Web D1, coller le **contenu SQL**, jamais le chemin du fichier. Ne pas recréer une table qui existe déjà. Pour une nouvelle base vide, le CLI peut appliquer les migrations :

```sh
npx wrangler d1 migrations apply cowlendar-blog --remote
```

Cette commande agit sur la base distante ; vérifier le compte et la base affichés. Pour les essais locaux, utiliser `npm run db:migrate:local`.

`/api/posts` doit renvoyer HTTP 200. Une liste vide est normale tant qu’aucun nouvel article n’est ajouté dans D1 : les 115 articles importés sont déjà publiés depuis l’archive du dépôt. Voir [BLOG-EDITORIAL.md](BLOG-EDITORIAL.md).

## Vérifier un déploiement

```sh
SITE_TEST_URL=https://cowlendar.pages.dev node checks/http-smoke.mjs
```

Contrôler le blog, un article, les comparatifs, une ancienne URL et une URL inventée. Une page inconnue doit renvoyer HTTP 404, pas une homepage en HTTP 200. `/2` doit rediriger vers `/`.

Le build de `main` retire `noindex`. Les builds de prévisualisation restent non indexables. Les canonical et le sitemap pointent vers `https://cowlendar.com`.

## Basculer le domaine

1. Vérifier le nouveau déploiement et les redirections dans `URL-MIGRATION.csv`.
2. Dans Pages → Custom domains, associer `cowlendar.com` et suivre la configuration DNS indiquée.
3. Préserver les enregistrements des sous-domaines applicatifs et de messagerie. Un changement de serveurs DNS demande de recopier toute la zone, pas seulement le site Web.
4. Attendre le statut actif et vérifier le certificat HTTPS et les pages sur le domaine final.
5. Si `www` est utilisé, le rattacher puis rediriger vers la version sans `www`.
6. Dans la propriété Search Console **sc-domain:cowlendar.com**, soumettre `https://cowlendar.com/sitemap.xml`.

Le sitemap comprend les articles D1 publiés sans nécessiter un nouveau build. Les fichiers `robots.txt`, `llms.txt`, `llms-full.txt`, `/ai` et `/ai.md` sont aussi générés. Les fichiers destinés aux outils IA facilitent la lecture ; ils ne garantissent aucun classement ou référencement.

## Revenir au déploiement précédent

Pages → Deployments → choisir un déploiement réussi précédent → Rollback. Une restauration du déploiement ne restaure pas automatiquement les données D1. Ne modifier le DNS qu’après avoir identifié précisément la destination à rétablir.
