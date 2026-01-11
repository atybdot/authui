ALTER TABLE `users` RENAME COLUMN "expiresAt" TO "tokenExpiresAt";--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN "sentAt" TO "mailSentAt";