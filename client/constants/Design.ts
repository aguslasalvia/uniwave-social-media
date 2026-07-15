/**
 * UniWave design language, translated from the landing page
 * (landing-page/src — the visual source of truth).
 *
 * Colors live in Colors.ts (they can be overridden by the backend theme);
 * everything here is fixed: typography, radii and the signature shadow.
 */

// Landing: Bricolage Grotesque for display, IBM Plex Mono for labels.
// Body text stays on the system font for performance and legibility.
export const Fonts = {
  display: "BricolageGrotesque_700Bold",
  displayHeavy: "BricolageGrotesque_800ExtraBold",
  mono: "IBMPlexMono_600SemiBold",
} as const;

// Landing: 12px on buttons/inputs, ~16px on cards, 4px on stamps.
export const Radius = {
  action: 12,
  card: 16,
  stamp: 4,
  pill: 999,
} as const;

// The landing's signature: a hard offset shadow with no blur
// (box-shadow: 4px 4px 0 …) that makes primary actions look printed.
// Pressing a button translates it onto its shadow (see SolidButton).
export const SHADOW_OFFSET = 4;

export const hardShadow = (color: string, offset: number = SHADOW_OFFSET) =>
  `${offset}px ${offset}px 0px ${color}`;
