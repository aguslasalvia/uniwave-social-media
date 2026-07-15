import { LucideIcon } from "lucide-react-native";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

import { withAlpha } from "@/constants/Colors";
import { Radius } from "@/constants/Design";
import { useColors } from "@/hooks/useColors";

interface GhostButtonProps {
  title: string;
  onPress: () => void;
  icon?: LucideIcon;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Secondary action, styled after the landing page's .cta-ghost:
 * transparent fill with a soft tinted border that strengthens on press.
 */
export function GhostButton({
  title,
  onPress,
  icon: Icon,
  disabled = false,
  style,
}: GhostButtonProps) {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        {
          borderColor: withAlpha(colors.tint, pressed ? 0.5 : 0.25),
          backgroundColor: pressed ? withAlpha(colors.tint, 0.08) : "transparent",
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {Icon && <Icon size={18} color={colors.text} strokeWidth={2} />}
      <Text style={[styles.label, { color: colors.text }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 46,
    paddingHorizontal: 20,
    borderRadius: Radius.action,
    borderWidth: 1.5,
  },
  label: {
    fontSize: 14.5,
    fontWeight: "600",
  },
});
