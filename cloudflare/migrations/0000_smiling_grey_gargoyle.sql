CREATE TABLE `blog_posts` (
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
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_blog_posts_status_published_at` ON `blog_posts` (`status`,`published_at`);