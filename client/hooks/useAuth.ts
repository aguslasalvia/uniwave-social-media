import { useEffect, useState } from "react";
import { applyDefaultTheme, applyThemedColors } from "@/constants/Colors";
import { storage } from "@/utils/storage";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await storage.getItem("token");
      const user = await storage.getItem("user_profile");
      const authenticated = !!token && !!user;

      // login() only applies the university theme at the moment of
      // logging in — a returning session (valid token, no fresh login)
      // otherwise stays on the default colors instead of the one that
      // was actually fetched and persisted last time.
      if (authenticated) {
        const theme = await storage.getTheme();
        if (theme?.light && theme?.dark) {
          applyThemedColors(theme.light, theme.dark);
        }
      } else {
        applyDefaultTheme();
      }

      setIsAuthenticated(authenticated);
      setLoading(false);
    };
    checkAuth();
  }, []);

  return { isAuthenticated, loading };
}
