"use server";
import z from "zod";
import { generateToken } from "@/lib/utils";
import { sendVerificationEmail } from "./email";
import { findUserByEmail, isTokenExpired, type UserSelect } from "@/lib/db-helpers";
import type { Result } from "./types";
import { setUserCookies } from "./cookies";
import { inputSchema, UserData } from "@/lib/helpers";
import { db } from "@/db/drizzle";
import { users as userSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TOKEN_EXPIRY_S } from "@/lib/utils";

export async function createUser(data: UserData) {
  const validation = validateInput(data);
  if (validation.error) {
    return { data: null, error: validation.error, status: validation.status };
  }

  const parsedData = inputSchema.parse(data);
  const user = await findUserByEmail(parsedData.email);

  if (user) {
    if (user.verifiedAt) {
      await setUserCookies({
        email: user.email,
        status: "verified",
        sentAt: user.mailSentAt || new Date(),
        expiresAt: user.tokenExpiresAt,
      });
      return { data: null, error: "Email already verified", status: 409 };
    }
    if (!(await isTokenExpired(parsedData.email))) {
      await setUserCookies({
        email: user.email,
        status: "pending",
        sentAt: user.mailSentAt || new Date(),
        expiresAt: user.tokenExpiresAt,
      });
      return {
        data: null,
        error: "Please wait before requesting a new verification email",
        status: 429,
      };
    }
  }

  const token = generateToken();
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY_S * 1000);

  if (user) {
    const result = await db.transaction(async (tx): Promise<UserSelect | null> => {
      const updateResult = await tx
        .update(userSchema)
        .set({
          token,
          tokenExpiresAt: expiresAt,
        })
        .where(eq(userSchema.email, parsedData.email))
        .returning();

      if (updateResult.length === 0) {
        tx.rollback();
        return null;
      }

      const updatedUser = updateResult[0];

      const emailResult = await sendVerificationEmail(
        updatedUser.email,
        token,
        updatedUser.tokenExpiresAt,
      );

      if (!emailResult.success) {
        tx.rollback();
        return null;
      }

      return updatedUser;
    });

    if (!result) {
      return { data: null, error: "Failed to update user", status: 500 };
    }

    await setUserCookies({
      email: result.email,
      status: "pending",
      sentAt: result.mailSentAt || new Date(),
      expiresAt: result.tokenExpiresAt,
    });

    return { data: result, error: null, status: 200 };
  }

  const result = await db.transaction(async (tx): Promise<UserSelect | null> => {
    const insertResult = await tx
      .insert(userSchema)
      .values({
        email: parsedData.email,
        token,
        tokenExpiresAt: expiresAt,
      })
      .onConflictDoNothing({ target: userSchema.email })
      .returning();

    if (insertResult.length === 0) {
      tx.rollback();
      return null;
    }

    const newUser = insertResult[0];

    const emailResult = await sendVerificationEmail(newUser.email, token, newUser.tokenExpiresAt);

    if (!emailResult.success) {
      tx.rollback();
      return null;
    }

    return newUser;
  });

  if (!result) {
    return { data: null, error: "User already exists", status: 409 };
  }

  await setUserCookies({
    email: result.email,
    status: "pending",
    sentAt: result.mailSentAt || result.createdAt || new Date(),
    expiresAt: result.tokenExpiresAt,
  });

  return { data: result, error: null, status: 200 };
}

export async function getUser(email: string): Promise<Result<UserSelect>> {
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return { data: null, error: "User not found", status: 404 };
    }

    return { data: user, error: null, status: 200 };
  } catch (error) {
    console.error("[ERROR GETTING USER BY EMAIL]", (error as Error).message);
    return { data: null, error: (error as Error).message, status: 500 };
  }
}

function validateInput(data: UserData): Result<{ email: string }> {
  const result = inputSchema.safeParse(data);

  if (!result.success) {
    const errors = z.treeifyError(result.error).errors;
    console.error("[ERROR VALIDATING INPUT DATA]", errors);
    return { data: null, error: Object.values(errors).flat().join(", "), status: 400 };
  }

  return { data: result.data, error: null, status: 200 };
}
