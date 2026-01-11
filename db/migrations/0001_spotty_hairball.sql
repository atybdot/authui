ALTER TABLE `users` ADD `sentAt` integer DEFAULT (unixepoch());--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `updatedAt`;