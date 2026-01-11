"use server";
import { cookies } from "next/headers";
import { findUserByEmail, type UserSelect } from "@/lib/db-helpers";
import { COOKIE_NAME, COOKIE_OPTIONS } from "@/lib/cookies";

export async function getUserEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function setUserEmail(email: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, email, COOKIE_OPTIONS);
}

export async function clearUserEmail(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getUserFromDb(): Promise<UserSelect | null> {
  const email = await getUserEmail();
  if (!email) return null;
  return findUserByEmail(email);
}
