"use client";

import { useEffect, useState } from "react";
import type { UserCookieData, UserStatus } from "@/lib/cookies";

interface UseUserCookiesReturn {
  data: UserCookieData | null;
  isLoading: boolean;
  isExpired: boolean;
}

export function useUserCookies(): UseUserCookiesReturn {
  const [data, setData] = useState<UserCookieData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    async function fetchCookies() {
      try {
        const response = await fetch("/api/user-cookies");
        if (response.ok) {
          const cookieData = await response.json();
          setData(cookieData);

          if (cookieData?.expiresAt) {
            const expires = new Date(cookieData.expiresAt).getTime();
            setIsExpired(expires < Date.now());
          }
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Error fetching user cookies:", error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCookies();
  }, []);

  return { data, isLoading, isExpired };
}
