// Matches the JSON returned by the backend (core.Settings).
export interface Settings {
  language: string;
  background: string;
  primaryColor: string;
  secondaryColor: string;
  notificationsEnabled: boolean;
}
