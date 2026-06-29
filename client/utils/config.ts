import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? {};

const DEFAULT_API_URL = "http://localhost:8080";

// Acceder a las variables de entorno definidas en app.json (campo "extra").
export const config = {
  apiUrl: extra.apiUrl || DEFAULT_API_URL,
  environment: extra.environment || "development",
};

// Accesos directos
export const getApiUrl = (): string => extra.apiUrl || DEFAULT_API_URL;
export const getEnvironment = (): string => extra.environment || "development";
