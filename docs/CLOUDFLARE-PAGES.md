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

La base distante **cowlendar-blog** existe déjà. Si tu configures un autre compte, crée d'abord cette base dans **Storage & databases → D1 SQL Database → Create database**.

### Initialiser la table dans la console Cloudflare

Ouvrir **cowlendar-blog → Console**. Copier le **code SQL** ci-dessous, un bloc à la fois, puis cliquer sur **Execute** après chaque bloc. Ne pas coller le chemin `cloudflare/migrations/0000_smiling_grey_gargoyle.sql` : c'est le nom du fichier dans GitHub, pas une commande SQL. Cette confusion provoque l'erreur `near "cloudflare": syntax error`.

Ces trois commandes reprennent le schéma du fichier de migration. `IF NOT EXISTS` permet de les relancer sans recréer les objets déjà présents. Aucun article n'est ajouté et aucune donnée n'est supprimée. Si une table existe déjà avec une structure différente, ces commandes ne la mettent pas à jour : il faut une migration adaptée.

**1. Créer la table :**

```sql
CREATE TABLE IF NOT EXISTS `blog_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`excerpt` text DEFAULT '' NOT NULL,
	`content_markdown` text DEFAULT '' NOT NULL,
	`cover_url` text,
	`author` text DEFAULT 'Cowlendar team' NOT NULL,
	`category` text DEFAULT 'Booking tips' NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`published_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`seo_title` text,
	`seo_description` text,
	CONSTRAINT "blog_status_valid" CHECK("blog_posts"."status" IN ('draft', 'published')),
	CONSTRAINT "published_date_required" CHECK("blog_posts"."status" != 'published' OR "blog_posts"."published_at" IS NOT NULL),
	CONSTRAINT "slug_valid" CHECK(length("blog_posts"."slug") BETWEEN 1 AND 160 AND "blog_posts"."slug" NOT GLOB '*[^a-z0-9-]*' AND substr("blog_posts"."slug",1,1) != '-' AND substr("blog_posts"."slug",-1,1) != '-'),
	CONSTRAINT "title_required" CHECK(length(trim("blog_posts"."title")) > 0)
);
```

**2. Garantir une URL unique par article :**

```sql
CREATE UNIQUE INDEX IF NOT EXISTS `blog_posts_slug_unique` ON `blog_posts` (`slug`);
```

**3. Ajouter l’index des publications :**

```sql
CREATE INDEX IF NOT EXISTS `idx_blog_posts_status_published_at` ON `blog_posts` (`status`,`published_at`);
```

Vérifier ensuite la table :

```sql
SELECT COUNT(*) AS nombre_articles FROM blog_posts;
```

Le résultat doit être `0` pour un blog neuf. Un message `table already exists` lors d'une exécution de la migration originale ne demande pas de supprimer la table : utiliser les commandes ci-dessus pour terminer les index manquants.

### Relier la base au site Pages

1. Revenir au projet Pages → **Settings → Bindings → Add → D1 database binding** et sélectionner l'environnement **Production**.
2. Nom de la variable : **BLOG_DB**. Base sélectionnée : **cowlendar-blog**. Si cette liaison existe déjà, vérifier ses valeurs.
3. Enregistrer, puis redéployer le projet Pages pour activer la liaison.
4. Ouvrir **l'adresse de ton site Cloudflare suivie de `/api/posts`**. Pour un blog vide, le résultat attendu est `{"posts":[],"page":1,"hasMore":false}`.

En cas de réponse `Blog temporarily unavailable`, vérifier la liaison `BLOG_DB`, les trois commandes SQL et le redéploiement après l'enregistrement de la liaison. Si `/api/posts` affiche une page HTML ou une erreur 404, vérifier que le déploiement contient bien le dossier `functions/` à la racine du dépôt.

Pour les aperçus GitHub, créer une base D1 distincte et lier `BLOG_DB` dans l'environnement Preview. Cela évite de travailler sur le contenu public pendant les essais.

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
