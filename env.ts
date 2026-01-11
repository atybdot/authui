import { createEnv } from "@t3-oss/env-nextjs";
import "dotenv/config";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  server: {
    RESEND_API_KEY: z.string(),
    DATABASE_URL: z.string(),
    TURSO_AUTH_TOKEN: z.string(),
  },
  runtimeEnv: {
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  emptyStringAsUndefined: true,
});
