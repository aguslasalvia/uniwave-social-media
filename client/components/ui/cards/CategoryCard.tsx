import { LucideIcon } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ui/themed";
import { withAlpha } from "@/constants/Colors";
import { useColors } from "@/hooks/useColors";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  color: string;
  count: number;
  onPress?: () => void;
}

export function CategoryCard({
  name,
  icon: Icon,
  color,
  count,
  onPress,
}: CategoryCardProps) {
  const colors = useColors();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[styles.iconWell, { backgroundColor: withAlpha(color, 0.12) }]}
      >
        <Icon size={22} color={color} strokeWidth={1.8} />
      </View>
      <ThemedText
        style={[styles.name, { color: colors.text }]}
        numberOfLines={1}
      >
        {name}
      </ThemedText>
      <ThemedText style={[styles.count, { color: colors.textMuted }]}>
        {count} actividades
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 18,
    width: 96,
  },
  iconWell: {
    width: 52,
    height: 52,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 2,
    textAlign: "center",
  },
  count: {
    fontSize: 11.5,
    textAlign: "center",
  },
});
