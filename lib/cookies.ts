export const COOKIE_NAMES = {
  USER_EMAIL: "authui_user_email",
  USER_STATUS: "authui_user_status",
  SENT_AT: "authui_sent_at",
  EXPIRES_AT: "authui_expires_at",
} as const;

export type UserStatus = "idle" | "pending" | "verified";

export interface UserCookieData {
  email: string;
  status: UserStatus;
  sentAt: string;
  expiresAt: string;
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};
