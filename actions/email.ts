"use server";
import { env } from "@/env";
import { VerifyEmail } from "@/emails/verify";
import { findUserByEmail, isTokenExpired, markUserAsVerified } from "@/lib/db-helpers";
import { setUserCookies } from "./cookies";
import { TOKEN_EXPIRY_S } from "@/lib/utils";
import { resend } from "@/lib/resend-client";

export async function sendVerificationEmail(
  email: string,
  token: string,
  expiresAt: number | Date,
): Promise<{ success: boolean; error: string | null }> {
  const verifyUrl = `${env.NEXT_PUBLIC_APP_URL}/verify?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;

  const { error } = await resend.emails.send({
    from: "AuthUI <waitlist@authui.atyb.me>",
    to: email,
    subject: "Verify your AuthUI waitlist signup",
    react: VerifyEmail({ href: verifyUrl, expiresAt }),
  });

  if (error) {
    console.error("[ERROR SENDING EMAIL]", error);
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function verifyEmail(email: string, token: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    return { data: null, error: "User not found", status: 404 };
  }

  if (user.token !== token) {
    return { data: null, error: "Invalid token", status: 401 };
  }

  if (await isTokenExpired(email)) {
    return { data: null, error: "Token expired", status: 401 };
  }

  const verifiedUser = await markUserAsVerified(email);
  if (!verifiedUser) {
    return { data: null, error: "Failed to verify email", status: 500 };
  }

  await setUserCookies({
    email: verifiedUser.email,
    status: "verified",
    sentAt: verifiedUser.createdAt,
    expiresAt: new Date(Date.now() + TOKEN_EXPIRY_S * 1000),
  });

  return { data: verifiedUser, error: null, status: 200 };
}
export type VerifyEmailResult = ReturnType<typeof verifyEmail>;
