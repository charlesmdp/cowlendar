# Blog, sources et publication

## Contenu importé

Les 115 adresses d’articles existantes sont conservées, y compris celles contenant des parenthèses. Les 30 guides prioritaires ont été réécrits et illustrés. Les autres conservent leur contenu et leur date de publication ; une refonte de mise en page n’est pas présentée comme une nouvelle recherche éditoriale.

Chaque article a un fichier dans `content/articles/` et des métadonnées dans `content/posts.json`. Le build génère sa page HTML et sa version `.md`. `content/catalog.json` est généré et ne doit pas être modifié séparément.

Les images de couverture et les images internes importées sont hébergées avec le site. Les illustrations nouvelles sont identifiées comme illustrations. Les comparatifs utilisent les images officielles des applications, attribuées à leur listing Shopify.

## D1 et pages statiques

Le contenu importé constitue une archive publiée dans le dépôt. La base D1 permet de publier de nouveaux articles ou de remplacer une page existante sans redéployer.

1. Les listes publiques combinent l’archive et les articles D1 publiés à une date passée.
2. Une ligne D1 utilisant le `dbSlug` d’un article existant remplace cette page.
3. Si cette ligne est un brouillon ou une publication future, la page et son lien dans les listes/sitemap sont masqués.
4. Les articles absents de D1 sont servis depuis leur page statique, après vérification de l’absence de remplacement.
5. Si la base n’est pas disponible, le blog répond 503 plutôt que d’ignorer les états éditoriaux.

Les versions déjà publiées restent dans l’historique Git et peuvent avoir été copiées par des moteurs ou clients. Passer une ligne D1 en brouillon ne supprime pas rétroactivement ces copies ni le contenu historique du dépôt.

L’API `/api/posts` expose uniquement les lignes D1 publiques ; la page `/blog` combine D1 et l’archive. L’API est en lecture seule. Aucun éditeur ou accès d’écriture public n’est exposé.

## Ajouter un article depuis Cloudflare

Dans D1 → `cowlendar-blog` → Console, créer d’abord un brouillon. Utiliser un slug composé de lettres minuscules, chiffres et tirets. Le contenu est du Markdown. Les dates sont en secondes Unix.

```sql
INSERT INTO blog_posts
  (slug, title, excerpt, content_markdown, cover_url, category, seo_title, seo_description)
VALUES
  ('example-guide', 'Example guide', 'A useful summary.',
   '## First section

Replace this text with the finished article.',
   '/assets/blog/01-service-booking.webp', 'Booking operations',
   'Example guide | Cowlendar', 'A useful summary for search results.');
```

Pour publier après relecture :

```sql
UPDATE blog_posts
SET status = 'published', published_at = unixepoch(), updated_at = unixepoch()
WHERE slug = 'example-guide';
```

La page apparaît à `/blog/example-guide`, dans la recherche et dans le sitemap. Le cache public peut ajouter jusqu’à une minute de délai.

Pour une publication programmée, mettre une date future dans `published_at`. Pour modifier un article importé, reprendre son `dbSlug` exact dans `content/posts.json` ; son adresse publique historique reste inchangée.

## Comparatifs

Les neuf applications constituent une sélection éditoriale d’apps Shopify largement évaluées, pas un classement officiel de Shopify. Les tableaux distinguent :

- ✓ : fonctionnalité documentée, avec la formule lorsque connue.
- × : limite explicitement confirmée.
- — : information non confirmée dans les sources consultées ; cela ne signifie pas que la fonctionnalité n’existe pas.

Les prix et faits sont datés du 22 septembre 2026. Les pages expliquent que Cowlendar est le fournisseur et l’éditeur du comparatif. Ne pas ajouter de pourcentage de gain ou de résultat de test sans preuve. Actualiser `content/apps.json` et les passages concernés dans les articles lorsque les offres changent.
