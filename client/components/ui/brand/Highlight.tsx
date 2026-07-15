import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";

import { withAlpha } from "@/constants/Colors";
import { useColors } from "@/hooks/useColors";

interface HighlightProps {
  children: string;
  textStyle?: StyleProp<TextStyle>;
}

/**
 * Highlighter swipe behind a word, like marking class notes — the
 * landing page's .mark. Place inside a row next to sibling <Text>.
 */
export function Highlight({ children, textStyle }: HighlightProps) {
  const colors = useColors();

  return (
    <View>
      <View
        style={[styles.band, { backgroundColor: withAlpha(colors.tint, 0.4) }]}
      />
      <Text style={textStyle}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Covers the lower half of the word, slightly skewed like a hand swipe.
  band: {
    position: "absolute",
    left: -3,
    right: -5,
    top: "48%",
    bottom: 2,
    borderRadius: 4,
    transform: [{ skewX: "-10deg" }, { rotate: "-0.8deg" }],
  },
});
