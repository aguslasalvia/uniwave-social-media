import { LucideIcon } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ui/themed";
import { useColors } from "@/hooks/useColors";

interface SocialButtonProps {
  title: string;
  onPress: () => void;
  icon: LucideIcon;
  iconColor?: string;
  style?: any;
  activeOpacity?: number;
}

export function SocialButton({
  title,
  onPress,
  icon: Icon,
  iconColor,
  style,
  activeOpacity = 0.85,
}: SocialButtonProps) {
  const colors = useColors();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors.surface, borderColor: colors.border },
        style,
      ]}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <Icon size={20} color={iconColor || colors.text} strokeWidth={2} />
      <ThemedText style={[styles.text, { color: colors.text }]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 24,
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
