import { useSyncExternalStore } from "react";

import { UserProfile } from "@/core/User";
import { storage } from "@/utils/storage";

const USER_PROFILE_KEY = "user_profile";

let profile: UserProfile | null = null;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((listener) => listener());

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

// Hydrate once from the profile persisted at login.
storage.getItem(USER_PROFILE_KEY).then((raw) => {
  if (raw && !profile) {
    profile = JSON.parse(raw);
    notify();
  }
});

// Single write path for the logged-in user: persists to storage and
// re-renders every component using useUserProfile().
export async function setUserProfile(next: UserProfile | null) {
  profile = next;
  if (next) {
    await storage.setItem(USER_PROFILE_KEY, JSON.stringify(next));
  } else {
    await storage.removeItem(USER_PROFILE_KEY);
  }
  notify();
}

export function useUserProfile() {
  return useSyncExternalStore(
    subscribe,
    () => profile,
    () => profile,
  );
}
