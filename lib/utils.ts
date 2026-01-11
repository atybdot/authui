import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TOKEN_EXPIRY_S = 1 * 60 * 60; // 1 hour

export function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function formatTokenExpiry(expiresAt: number | Date): string {
  const date = typeof expiresAt === "number" ? new Date(expiresAt * 1000) : expiresAt;

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour12: true,
  }).format(date);
}
