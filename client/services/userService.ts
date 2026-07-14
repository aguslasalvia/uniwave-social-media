import { UserProfile } from "@/core/User";
import { setUserProfile } from "@/hooks/useUserProfile";
import api from "@/utils/api";
import { storage } from "@/utils/storage";

const USER_PROFILE_KEY = "user_profile";

export interface UserStats {
  posts: number;
  followers: number;
  following: number;
}

export const userService = {
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const profileData = await storage.getItem(USER_PROFILE_KEY);
      if (profileData) {
        return JSON.parse(profileData);
      }
      return null;
    } catch (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
  },

  async updateUserProfile(updateForm: object): Promise<UserProfile | null> {
    try {
      const response = await api.patch("/user/update", updateForm);
      if (response.status !== 200) {
        return null;
      }
      // Prefer the server's representation of the user, falling back to the form.
      const updated = (response.data?.user ?? updateForm) as UserProfile;
      await setUserProfile(updated);
      return updated;
    } catch {
      return null;
    }
  },

  async getUserStats(): Promise<UserStats> {
    try {
      const response = await api.get("/user/stats");
      if (response.status === 200 && response.data) {
        return response.data as UserStats;
      }
    } catch (err) {
      console.error("Error getting user stats:", err);
    }
    return { posts: 0, followers: 0, following: 0 };
  },

  async uploadAvatar(uri: string): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append("avatar", {
        uri,
        type: "image/jpeg",
        name: "avatar.jpg",
      } as any);

      const response = await api.post("/user/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        if (response.data?.user) {
          await setUserProfile(response.data.user);
        }
        return response.data?.avatar ?? null;
      }
      return null;
    } catch (err) {
      console.error("Error uploading avatar:", err);
      return null;
    }
  },
};
