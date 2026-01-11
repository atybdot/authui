import { sqliteTable, int, text, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { TOKEN_EXPIRY_S } from "@/lib/utils";

export const users = sqliteTable(
  "users",
  {
    id: text().primaryKey().default(sql`(uuid7())`),
    email: text().notNull().unique(),
    verifiedAt: int({ mode: "timestamp" }),
    createdAt: int({ mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    token: text().notNull(),
    tokenExpiresAt: int({ mode: "timestamp" })
      .notNull()
      .default(sql.raw(`(unixepoch() + ${TOKEN_EXPIRY_S})`)),
    mailSentAt: int({ mode: "timestamp" }).default(sql`(unixepoch())`),
  },
  (table) => [index("email_idx").on(table.email)],
);
