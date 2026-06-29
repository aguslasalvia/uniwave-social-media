import { storage } from "@/utils/storage";
import { Settings } from "@/core/Settings";
import api from "@/utils/api";

export const settingsService = {
  async getSettings(): Promise<Settings | null> {
    const response = await api.get("/settings/");
    if (response.status !== 200 || !response.data) {
      throw new Error("No settings found");
    }
    storage.setItem("settings", JSON.stringify(response.data));
    return response.data as Settings;
  },

  async updateSettings(settings: Settings): Promise<boolean> {
    const response = await api.patch("/settings/update", settings);
    if (response.status !== 200) {
      throw new Error("Failed to update settings");
    }
    storage.setItem("settings", JSON.stringify(settings));
    return true;
  },

  async getTheme(): Promise<string | null> {
    const primary = await storage.getItem("primaryColor");
    return primary;
  },
};
