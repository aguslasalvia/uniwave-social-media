const DEFAULT_API_URL = "http://localhost:8080";

// EXPO_PUBLIC_* vars are inlined into the JS bundle at build/start time by
// Metro, read straight from .env — no need to round-trip through app.json's
// "extra" field (which used to hold a second, easily-stale copy of these).
export const config = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL,
  environment: process.env.EXPO_PUBLIC_ENV || "development",
};

// Shortcuts
export const getApiUrl = (): string => config.apiUrl;
export const getEnvironment = (): string => config.environment;
