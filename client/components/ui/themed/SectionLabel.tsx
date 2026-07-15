import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

import { Fonts } from "@/constants/Design";
import { useColors } from "@/hooks/useColors";

interface SectionLabelProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

/** Mono uppercase section eyebrow, matching the landing's utility labels. */
export function SectionLabel({ children, style }: SectionLabelProps) {
  const colors = useColors();

  return (
    <Text style={[styles.label, { color: colors.textMuted }, style]}>
      {children.toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 1.4,
  },
});
