import { useSyncExternalStore } from "react";

import { UserProfile } from "@/core/User";
import { storage } from "@/utils/storage";

const USER_PROFILE_KEY = "user_profile";

let profile: UserProfile | null = null;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((listener) => listener());

// Hydrate once from the profile persisted at login. Runs lazily on the
// first subscriber instead of at import time: module scope also executes
// during Expo web's static render, where there is no window/localStorage.
let hydrated = false;
const hydrate = () => {
  if (hydrated) return;
  hydrated = true;
  storage.getItem(USER_PROFILE_KEY).then((raw) => {
    if (raw && !profile) {
      profile = JSON.parse(raw);
      notify();
    }
  });
};

const subscribe = (listener: () => void) => {
  hydrate();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

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
