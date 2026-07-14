import React from "react";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ui/themed";
import { useColors } from "@/hooks/useColors";

interface DividerProps {
  text?: string;
  style?: any;
}

export function Divider({ text = "o continúa con", style }: DividerProps) {
  const colors = useColors();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.line, { backgroundColor: colors.border }]} />
      <ThemedText style={[styles.text, { color: colors.textMuted }]}>
        {text}
      </ThemedText>
      <View style={[styles.line, { backgroundColor: colors.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
  },
  text: {
    marginHorizontal: 16,
    fontSize: 13,
    fontWeight: "500",
  },
});
