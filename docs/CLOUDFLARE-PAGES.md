# Déployer Cowlendar sur Cloudflare Pages + D1

Le site est prêt pour Cloudflare Pages. La base du futur blog utilise **Cloudflare D1 (SQLite)**. Aucun compte Supabase ni clé Supabase n’est nécessaire.

## 1. Mettre les fichiers sur GitHub

Dépôt prévu : https://github.com/charlesmdp/cowlendar

Le dossier à envoyer est la racine de ce projet, avec `dist/`, `functions/`, `db/`, `cloudflare/migrations/`, `scripts/`, `package.json` et `package-lock.json`. Ne pas envoyer `node_modules/`, `.wrangler/`, ni des secrets.

Le site complet est disponible sur [GitHub : charlesmdp/cowlendar](https://github.com/charlesmdp/cowlendar). La connexion et l’écriture ont été vérifiées le 22 septembre 2026. Tu peux connecter directement ce dépôt à Cloudflare Pages.

Pour travailler sur le projet en local :

```sh
git clone https://github.com/charlesmdp/cowlendar.git
cd cowlendar
npm ci
```

## 2. Connecter Cloudflare Pages

1. Ouvrir le tableau de bord Cloudflare → **Workers & Pages** → **Create application** → **Pages** → connecter GitHub.
2. Sélectionner **charlesmdp/cowlendar** et la branche **main**.
3. Renseigner :

| Réglage | Valeur |
| --- | --- |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Laisser vide |
| Variable de build `NODE_VERSION` | `22` |

4. Lancer le déploiement. Cloudflare détecte automatiquement les fonctions dans `functions/`.
5. Vérifier `/`, `/2/`, `/features/`, `/pricing/`, `/privacy-policy/` et `/free-tools/timezone-converter/` sur l’adresse `pages.dev` fournie.

Chaque envoi sur `main` déclenche ensuite un nouveau déploiement. Les autres branches servent d’aperçus. La variante `/2/` reste exclue des moteurs de recherche ; le build rend les pages principales de production indexables.

[Documentation officielle : connexion Git](https://developers.cloudflare.com/pages/get-started/git-integration/) · [Site HTML sur Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)

## 3. Créer et connecter D1

Le code et la migration sont prêts et ont été testés avec une vraie base D1 locale. **Aucune base distante n’a encore été créée dans ton compte Cloudflare.**

1. Dans Cloudflare, ouvrir **Storage & databases → D1 SQL Database → Create database**.
2. Nommer la base **cowlendar-blog**. Choisir la juridiction UE si souhaitée et proposée.
3. Ouvrir la console de cette base et exécuter le contenu de `cloudflare/migrations/0000_smiling_grey_gargoyle.sql`, une seule fois. Cela crée la table et ses index. Il n’y a aucun faux article prérempli.
4. Revenir au projet Pages → **Settings → Bindings → Add → D1 database binding**.
5. Nom de la variable : **BLOG_DB**. Base sélectionnée : **cowlendar-blog**.
6. Redéployer le projet Pages pour activer la liaison.
7. Ouvrir `/api/posts` : le résultat attendu pour un blog vide est `{"posts":[],"page":1,"hasMore":false}`.

Pour les aperçus GitHub, créer une base D1 distincte et lier `BLOG_DB` dans l’environnement Preview. Cela évite de travailler sur le contenu public pendant les essais.

Le fichier `wrangler.local.jsonc` sert exclusivement aux essais locaux. Ne pas le renommer en `wrangler.jsonc` pour la production : il contient un identifiant local, pas celui de ta base distante. La configuration de production décrite ci-dessus reste dans le tableau de bord Cloudflare.

[Documentation officielle : relier D1 à Pages](https://developers.cloudflare.com/pages/functions/bindings/#d1-databases)

## 4. Ajouter des articles plus tard

La table `blog_posts` prévoit : titre, URL courte unique, résumé, contenu Markdown, image de couverture, auteur, catégorie, statut brouillon/publié, date de publication et champs SEO.

- `draft` : article privé, jamais renvoyé par l’API.
- `published` avec une date future : publication programmée, invisible avant cette date.
- `published` avec une date passée : article accessible publiquement.
- Les dates sont stockées en secondes Unix.
- La liste est paginée : `/api/posts?page=1&limit=12`.
- Un article publié est disponible sur `/api/posts/son-slug`.
- Les écritures passent pour l’instant par la console Cloudflare authentifiée. Aucune route d’administration publique n’a été ajoutée.

Exemple de brouillon à adapter dans la console D1 :

```sql
INSERT INTO blog_posts (slug, title, excerpt, content_markdown)
VALUES ('mon-premier-article', 'Mon premier article', 'Un résumé à remplacer.', '# Mon premier article');
```

Pour publier ce brouillon :

```sql
UPDATE blog_posts
SET status = 'published', published_at = unixepoch(), updated_at = unixepoch()
WHERE slug = 'mon-premier-article';
```

Les pages de lecture du nouveau blog, son éventuel éditeur et l’import des anciens articles seront la prochaine étape. Les liens Blog du site continuent donc d’ouvrir le blog existant de Cowlendar.

## 5. Connecter le domaine

Dans le projet Pages → **Custom domains → Set up a custom domain**, ajouter le domaine choisi et suivre les instructions DNS affichées par Cloudflare. On peut d’abord utiliser un sous-domaine de test. Basculer `cowlendar.com` uniquement lorsque la version et les redirections des anciennes pages sont prêtes.

## Coût et limites

Au 22 septembre 2026, l’offre D1 Free comprend **5 millions de lignes lues/jour**, **100 000 lignes écrites/jour** et **5 Go de stockage total**, avec des limites propres à chaque base. Cela convient largement à un blog courant avec des requêtes indexées et du cache. Les fonctions Pages utilisent aussi les quotas Workers. Ce n’est pas un service illimité : au-delà des limites gratuites, les requêtes peuvent être refusées.

[Tarifs et limites officiels D1](https://developers.cloudflare.com/d1/platform/pricing/) · [Limites D1](https://developers.cloudflare.com/d1/platform/limits/)
