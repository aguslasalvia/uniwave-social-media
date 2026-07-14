import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error setting item in storage", error);
    }
  },

  async getItem(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error("Error getting item from storage", error);
      return null;
    }
  },

  async getTheme() {
    try {
      // Matches the key authService.login() actually writes to ("theme").
      const theme = await AsyncStorage.getItem("theme");
      return theme ? JSON.parse(theme) : null;
    } catch (e) {
      return null;
    }
  },

  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from storage", error);
    }
  },

  async clear() {
    await AsyncStorage.clear();
  },
};
