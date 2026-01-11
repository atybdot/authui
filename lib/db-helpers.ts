import { db } from "@/db/drizzle";
import { users as userSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TOKEN_EXPIRY_S } from "@/lib/utils";

export type UserInsert = typeof userSchema.$inferInsert;
export type UserSelect = typeof userSchema.$inferSelect;

export async function findUserByEmail(email: string): Promise<UserSelect | null> {
  const result = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  return result ?? null;
}

export async function isUserVerified(email: string): Promise<boolean> {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
    columns: { verifiedAt: true },
  });

  return Boolean(user?.verifiedAt);
}

export async function isTokenExpired(email: string): Promise<boolean> {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
    columns: { tokenExpiresAt: true },
  });

  if (!user?.tokenExpiresAt) return true;

  return new Date(user.tokenExpiresAt).getTime() <= Date.now();
}

export async function markUserAsVerified(email: string): Promise<UserSelect | null> {
  const result = await db
    .update(userSchema)
    .set({
      verifiedAt: new Date(),
      token: "",
      tokenExpiresAt: new Date(0),
    })
    .where(eq(userSchema.email, email))
    .returning();

  return result[0] ?? null;
}

export async function updateUserToken(email: string, token: string): Promise<UserSelect | null> {
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_S * 1000);

  const result = await db
    .update(userSchema)
    .set({
      token,
      tokenExpiresAt: expiresAt,
    })
    .where(eq(userSchema.email, email))
    .returning();

  return result[0] ?? null;
}

export async function createUserWithEmail(
  email: string,
  token: string,
): Promise<UserSelect | null> {
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_S * 1000);

  const result = await db
    .insert(userSchema)
    .values({
      email,
      token,
      tokenExpiresAt: expiresAt,
    })
    .onConflictDoNothing({ target: userSchema.email })
    .returning();

  return result[0] ?? null;
}
