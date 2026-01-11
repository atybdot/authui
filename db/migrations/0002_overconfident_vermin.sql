DROP TABLE `token`;--> statement-breakpoint
ALTER TABLE `users` ADD `token` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `expiresAt` integer DEFAULT (unixepoch() + 3600) NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);