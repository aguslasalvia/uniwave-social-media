import { useSyncExternalStore } from "react";

import {
  Colors,
  getColorsVersion,
  subscribeToColors,
} from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// Active palette; re-renders when the university theme is applied at runtime.
export function useColors() {
  useSyncExternalStore(subscribeToColors, getColorsVersion, getColorsVersion);
  const scheme = useColorScheme();
  return Colors[scheme ?? "light"];
}
