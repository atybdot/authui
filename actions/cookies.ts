"use server";

import { cookies } from "next/headers";
import { COOKIE_NAMES, COOKIE_OPTIONS, type UserStatus, type UserCookieData } from "@/lib/cookies";

export async function setUserCookies(
  data: Omit<UserCookieData, "sentAt" | "expiresAt"> & { expiresAt: Date; sentAt: Date },
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAMES.USER_EMAIL, data.email, COOKIE_OPTIONS);
  cookieStore.set(COOKIE_NAMES.USER_STATUS, data.status, COOKIE_OPTIONS);
  cookieStore.set(COOKIE_NAMES.SENT_AT, data.sentAt.toISOString(), COOKIE_OPTIONS);
  cookieStore.set(COOKIE_NAMES.EXPIRES_AT, data.expiresAt.toISOString(), COOKIE_OPTIONS);
}

export async function updateUserStatus(status: UserStatus): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAMES.USER_STATUS, status, COOKIE_OPTIONS);
}

export async function clearUserCookies(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAMES.USER_EMAIL);
  cookieStore.delete(COOKIE_NAMES.USER_STATUS);
  cookieStore.delete(COOKIE_NAMES.SENT_AT);
  cookieStore.delete(COOKIE_NAMES.EXPIRES_AT);
}

export async function getUserCookies(): Promise<UserCookieData | null> {
  const cookieStore = await cookies();

  const email = cookieStore.get(COOKIE_NAMES.USER_EMAIL)?.value;
  const status = cookieStore.get(COOKIE_NAMES.USER_STATUS)?.value as UserStatus | undefined;
  const sentAt = cookieStore.get(COOKIE_NAMES.SENT_AT)?.value;
  const expiresAt = cookieStore.get(COOKIE_NAMES.EXPIRES_AT)?.value;

  if (!email || !status || !sentAt || !expiresAt) {
    return null;
  }

  return { email, status, sentAt, expiresAt };
}

export async function isCookieExpired(): Promise<boolean> {
  const cookieStore = await cookies();
  const expiresAt = cookieStore.get(COOKIE_NAMES.EXPIRES_AT)?.value;

  if (!expiresAt) return true;

  return new Date(expiresAt).getTime() < Date.now();
}
