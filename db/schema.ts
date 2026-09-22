import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, index, check } from 'drizzle-orm/sqlite-core';
export const blogPosts = sqliteTable('blog_posts', {
 id: integer('id').primaryKey({ autoIncrement: true }),
 slug: text('slug').notNull().unique(),
 title: text('title').notNull(),
 excerpt: text('excerpt').notNull().default(''),
 contentMarkdown: text('content_markdown').notNull().default(''),
 coverUrl: text('cover_url'),
 author: text('author').notNull().default('Cowlendar team'),
 category: text('category').notNull().default('Booking tips'),
 status: text('status', { enum: ['draft','published'] }).notNull().default('draft'),
 publishedAt: integer('published_at'),
 createdAt: integer('created_at').notNull().default(sql`(unixepoch())`),
 updatedAt: integer('updated_at').notNull().default(sql`(unixepoch())`),
 seoTitle: text('seo_title'),
 seoDescription: text('seo_description')
}, t => [
 index('idx_blog_posts_status_published_at').on(t.status,t.publishedAt),
 check('blog_status_valid',sql`${t.status} IN ('draft', 'published')`),
 check('published_date_required',sql`${t.status} != 'published' OR ${t.publishedAt} IS NOT NULL`),
 check('slug_valid',sql`length(${t.slug}) BETWEEN 1 AND 160 AND ${t.slug} NOT GLOB '*[^a-z0-9-]*' AND substr(${t.slug},1,1) != '-' AND substr(${t.slug},-1,1) != '-'`),
 check('title_required',sql`length(trim(${t.title})) > 0`)
]);
