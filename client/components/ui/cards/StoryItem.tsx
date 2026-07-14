import { Plus } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ui/themed";
import { withAlpha } from "@/constants/Colors";
import { useColors } from "@/hooks/useColors";

interface StoryItemProps {
  name: string;
  avatar: string;
  isAdd?: boolean;
  onPress?: () => void;
}

export function StoryItem({
  name,
  avatar,
  isAdd = false,
  onPress,
}: StoryItemProps) {
  const colors = useColors();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.avatarRing,
          { borderColor: isAdd ? colors.border : colors.tint },
        ]}
      >
        <View
          style={[
            styles.avatarContainer,
            {
              backgroundColor: isAdd
                ? withAlpha(colors.tint, 0.12)
                : colors.surfaceMuted,
            },
          ]}
        >
          {isAdd ? (
            <Plus size={22} color={colors.tint} strokeWidth={2.5} />
          ) : (
            <Text style={styles.avatarText}>{avatar}</Text>
          )}
        </View>
      </View>
      <ThemedText
        style={[styles.name, { color: colors.textMuted }]}
        numberOfLines={1}
      >
        {name}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 14,
    width: 68,
  },
  avatarRing: {
    borderWidth: 2,
    borderRadius: 33,
    padding: 3,
    marginBottom: 6,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});
