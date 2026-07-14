import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ui/themed";
import { useColors } from "@/hooks/useColors";

interface SolidButtonProps {
  title: string;
  onPress: () => void;
  colors?: string[]; // Only the first color is used as the background
  style?: any;
  textStyle?: any;
  activeOpacity?: number;
}

export function SolidButton({
  title,
  onPress,
  colors,
  style,
  textStyle,
  activeOpacity = 0.85,
}: SolidButtonProps) {
  const colorsTheme = useColors();

  const backgroundColor = colors?.[0] || colorsTheme.tint;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <ThemedText style={[styles.buttonText, textStyle]}>{title}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
