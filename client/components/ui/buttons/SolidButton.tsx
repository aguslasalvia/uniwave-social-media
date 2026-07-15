import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

import { Fonts, Radius, SHADOW_OFFSET, hardShadow } from "@/constants/Design";
import { useColors } from "@/hooks/useColors";

interface SolidButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

/**
 * Primary action, styled after the landing page's .cta-primary:
 * inverted fill (text color over background color) with a hard offset
 * shadow in the theme tint. Pressing sinks the button onto its shadow.
 */
export function SolidButton({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
}: SolidButtonProps) {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.text,
          boxShadow: hardShadow(colors.tint, pressed ? 0 : SHADOW_OFFSET),
          transform: pressed
            ? [{ translateX: SHADOW_OFFSET }, { translateY: SHADOW_OFFSET }]
            : [],
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text style={[styles.label, { color: colors.background }, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: Radius.action,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: Fonts.display,
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
