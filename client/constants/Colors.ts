interface colorsPromps {
  primary: string;
  background: string;
  // Optional overrides sent by the backend theme; when absent (older themes
  // that only carried primary/background) the built-in defaults below apply.
  surface?: string;
  surfaceMuted?: string;
  border?: string;
  text?: string;
  textMuted?: string;
}

// Source of truth: landing-page/src/global.css (--primary-color,
// --primary-dark, --bg-color, --bg-secondary). The client's default/
// unauthenticated theme (login screen, logout, no backend theme yet) must
// always match the landing page's brand colors — see CLAUDE.md.
const baseColors = {
  light: {
    text: "#0f172a",
    textMuted: "#64748b",
    background: "#ffffff",
    surface: "#ffffff",
    surfaceMuted: "#f1f5f9",
    border: "#e2e8f0",
    danger: "#ef4444",
    tint: "#6366f1",
    icon: "#64748b",
    tabIconDefault: "#64748b",
    tabIconSelected: "#6366f1",
  },
  dark: {
    text: "#f1f5f9",
    textMuted: "#94a3b8",
    background: "#080c18",
    surface: "#0d1526",
    surfaceMuted: "#141f38",
    border: "#1c2740",
    danger: "#f87171",
    tint: "#818cf8",
    icon: "#94a3b8",
    tabIconDefault: "#94a3b8",
    tabIconSelected: "#818cf8",
  },
};

// Builds a full token set from the base palette plus whatever fields the
// backend theme provides. Icons follow textMuted, tab tint follows primary.
const buildTokens = (
  base: typeof baseColors.light,
  mode: colorsPromps,
): typeof baseColors.light => ({
  ...base,
  background: mode.background || base.background,
  tint: mode.primary || base.tint,
  tabIconSelected: mode.primary || base.tabIconSelected,
  surface: mode.surface || base.surface,
  surfaceMuted: mode.surfaceMuted || base.surfaceMuted,
  border: mode.border || base.border,
  text: mode.text || base.text,
  textMuted: mode.textMuted || base.textMuted,
  icon: mode.textMuted || base.icon,
  tabIconDefault: mode.textMuted || base.tabIconDefault,
});

export const Colors = {
  light: { ...baseColors.light },
  dark: { ...baseColors.dark },
};

/**
 * Derives a translucent rgba() from a #rrggbb hex. Used for soft tint
 * fills (chips, pills, icon wells) so they stay correct when the theme
 * primary is swapped at runtime via applyThemedColors.
 */
export const withAlpha = (hex: string, alpha: number): string => {
  const value = hex.replace("#", "");
  if (value.length !== 6) return hex;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// React does not repaint mounted screens when a plain object mutates, so
// applyThemedColors/applyDefaultTheme bump a version that useColors() watches.
let themeVersion = 0;
const listeners = new Set<() => void>();

const notifyThemeChange = () => {
  themeVersion++;
  listeners.forEach((listener) => listener());
};

export const subscribeToColors = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getColorsVersion = () => themeVersion;

export const applyThemedColors = (light: colorsPromps, dark: colorsPromps) => {
  Colors.light = buildTokens(baseColors.light, light);
  Colors.dark = buildTokens(baseColors.dark, dark);
  notifyThemeChange();
};

export const applyDefaultTheme = () => {
  Colors.light = { ...baseColors.light };
  Colors.dark = { ...baseColors.dark };
  notifyThemeChange();
};
