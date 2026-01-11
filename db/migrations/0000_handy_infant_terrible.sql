DROP TABLE IF EXISTS `users`;
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY DEFAULT (uuid7()) NOT NULL,
	`email` text NOT NULL,
	`verifiedAt` integer,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`token` text NOT NULL,
	`tokenExpiresAt` integer DEFAULT (unixepoch() + 3600) NOT NULL,
	`mailSentAt` integer DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);
