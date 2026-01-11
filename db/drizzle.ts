import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "@/env";
import * as schema from "./schema/index";
// You can specify any property from the libsql connection options
export const db = drizzle({
  schema,
  connection: {
    url: env.DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
});
